"use client"

import { City, Country, CountryCities, SortBy, SortOrder } from "@/lib/types";
import { ChangeEventHandler, Dispatch, SetStateAction, useState } from "react";
import { FlexBox, FlexCell } from "../ui/xflex";
import style from '@/app/world/page.module.css';
import { Button } from "../ui/xbutton";
import Link from "next/link";
import Body from "./body";
import Select from "../ui/xselect";
import { Checkbox } from "../ui/xcheckboxes";
import { Input } from "../ui/xtexts";
import { em, sortNamePopulation } from "@/lib/utils";
import { GridArea, GridContainer } from "../ui/xgrid";

const CountryDetail = (props: { country: Country }) => {
    const [showEnabled, setShowEnabled] = useState<string[]>(["ENABLED", "DISABLED"])
    const [substring, setSubstring] = useState("")
    const [sortBy, setSortBy] = useState<"name" | "population">("name")
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

    return (
        <Body
            menu={
                <CountryControls
                    country={props.country}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    showEnabled={showEnabled}
                    substring={substring}
                    setSortBy={e => setSortBy(e.target.value as SortBy)}
                    setSortOrder={e => setSortOrder(e.target.value as SortOrder)}
                    setShowEnabled={setShowEnabled}
                    setSubstring={e => setSubstring(e.target.value)}
                />
            }
            body={
                <CountryBody
                    country={props.country}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    showEnabled={showEnabled}
                    substring={substring}
                />
            }
        />
    )
}
export default CountryDetail;

const CountryControls = (props: {
    country: Country,
    sortBy: SortBy,
    sortOrder: SortOrder,
    showEnabled: string[],
    substring: string,
    setSortBy: ChangeEventHandler<HTMLSelectElement>,
    setSortOrder: ChangeEventHandler<HTMLSelectElement>,
    setShowEnabled: Dispatch<SetStateAction<string[]>>,
    setSubstring: ChangeEventHandler<HTMLInputElement>,
}) => {

    const euFlag = props.country.is_eu ? '🇪🇺' : ''

    return (
        <ul className={style['world-menu']}>
            <li>
                <h1>{`${props.country.flag} ${euFlag} ${props.country.name}`}</h1>
            </li>
            {props.country.cities?.length > 0 &&
                <>
                    <li>
                        <Select
                            value={props.sortBy}
                            onChange={props.setSortBy}
                            options={[
                                { value: "name", label: "Name" },
                                { value: "population", label: "Population" },
                            ]}
                            className={style["continent-sort-select"]}
                            ref={null}
                        />
                    </li>
                    <li>
                        <Select
                            value={props.sortOrder}
                            onChange={props.setSortOrder}
                            options={[
                                { value: "asc", label: "Ascending" },
                                { value: "desc", label: "Descending" },
                            ]}
                            className={style["continent-sort-select"]}
                            ref={null}
                        />
                    </li>
                    <li>
                        <Checkbox
                            name="ENABLED"
                            checkedValues={props.showEnabled}
                            setCheckedValues={props.setShowEnabled}
                            className={style["continent-list"]}
                            ref={null}
                        />
                        <label htmlFor="ENABLED" className={style["continent-list-label"]}>Enabled</label>
                        <Checkbox
                            name="DISABLED"
                            checkedValues={props.showEnabled}
                            setCheckedValues={props.setShowEnabled}
                            className={style["continent-list"]}
                            ref={null}
                        />
                        <label htmlFor="DISABLED" className={style["continent-list-label"]}>Disabled</label>
                    </li>
                    <li>
                        <Input
                            type="text"
                            id="substring"
                            name="substring"
                            placeholder="Filter cities"
                            value={props.substring}
                            onChange={props.setSubstring}
                        />
                    </li>
                    <li>
                        <span className={style['text-label']}>Lat:</span>
                        <span className={style['text-value']}>{props.country.latitude}</span>
                    </li>
                    <li>
                        <span className={style['text-label']}>Long:</span>
                        <span className={style['text-value']}>{props.country.longitude}</span>
                    </li>
                    <li>
                        <span className={style['text-label']}>Zoom:</span>
                        <span className={style['text-value']}>{props.country.zoom}</span>
                    </li>
                    <li>
                        <Button
                            className="xx"
                            onClick={f => f}
                        >
                            Save Location
                        </Button>
                    </li>
                </>
            }
        </ul>
    )
}

const CountryBody = (props: {
    country: Country,
    sortBy: SortBy,
    sortOrder: SortOrder,
    showEnabled: string[],
    substring: string,
}) => {
    return (
        <FlexBox
            flexDirection={"row"}
            flexWrap="nowrap"
            alignItems={"stretch"}
            justifyContent={"flex-start"}
            className={style["city-container"]}
            height={"100vh"}
        >
            <FlexCell
                flex="2 0 1em"
                overflowX="hidden"
                overflowY="hidden"
                className={style["container-map"]}
            >
                {props.country.cities?.length > 0 ?
                    <CityButtons
                        cities={props.country.cities}
                        sortBy={props.sortBy}
                        sortOrder={props.sortOrder}
                        showEnabled={props.showEnabled}
                        substring={props.substring}
                    /> :
                    <div>No cities in {props.country.name}</div>
                }
            </FlexCell>
            <FlexCell
                flex="1 0 1em"
                overflowX="hidden"
                overflowY="hidden"
                className={style["country-details"]}
            >
                <CountryDetails
                    country={props.country}
                />
            </FlexCell>
        </FlexBox>
    )
}

const CityButtons = (props: {
    cities: CountryCities[],
    sortBy: SortBy,
    sortOrder: SortOrder,
    showEnabled: string[],
    substring: string,
}) => {
    return (
        <div className={style['city-button-box']}>
            <ul className={style['city-buttons']}>
                {props.cities && props.cities.filter(e =>
                    e.name.toLowerCase().includes(props.substring.toLowerCase()) ||
                    e.name_ascii.toLowerCase().includes(props.substring.toLowerCase())
                ).sort(sortNamePopulation({
                    sortBy: props.sortBy,
                    sortOrder: props.sortOrder
                }))
                    .map((city) => (
                        <li key={city.id}>
                            <Link
                                href={`/world/${city.id}`}
                            >
                                <CityButton
                                    city={city}
                                />
                            </Link>
                        </li>
                    ))}
            </ul>
        </div>
    )
}

const CityButton = (props: {
    city: CountryCities,
}) => {
    return (
        <span className={style['city-button']}>
            <span className={style['city-button-name']}>{props.city.name}</span>
            <span className={style['city-button-population']}>({props.city.population})</span>
        </span>
    )
}

const CountryDetails = (props: {
    country: Country
}) => {
    //const colWidths = em([20,20])
    //const rowHeights= em([])
    return (
        <table>
            <tbody>
                <tr><th>iso2:</th><td>{props.country.iso2}</td></tr>
                <tr><th>tld:</th><td>{props.country.tld}</td></tr>
                <tr><th>prefix:</th><td>{props.country.prefix}</td></tr>
                <tr><th>density:</th><td>{props.country.density}</td></tr>
                <tr><th>area:</th><td>{props.country.area}</td></tr>
                <tr><th>gdp:</th><td>{props.country.gdp}</td></tr>
                <tr><th>median_age:</th><td>{props.country.median_age}</td></tr>
                <tr><th>website:</th><td>{props.country.website}</td></tr>
                <tr><th>driving_side:</th><td>{props.country.driving_side}</td></tr>
                <tr><th>religion:</th><td>{props.country.religion}</td></tr>
            </tbody>
        </table>
    )
}
/*
id: string,
continent_id: string,
continent_name: string,
name: string,
flag: string,
tld: string,
prefix: string,
is_eu: boolean,
is_enabled: boolean,
was_enabled: boolean,
description: string,
latitude: number,
longitude: number,
zoom: number,
iso2: string,
demonym: string,
population: number,
density: number,
area: number,
gdp: number,
median_age: number,
website: string,
driving_side: string,
un_member: boolean,
religion: string, */