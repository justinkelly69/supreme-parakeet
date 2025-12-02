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
import FlexTable from "./flextable"

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
            overflowX="hidden"
            overflowY="auto"
            height={"100vh"}
        >
            <FlexCell
                flex="1 0 1em"
                overflowX="hidden"
                overflowY="hidden"
                className={style["city-container"]}
            >
                <CountryDetailsTable
                    country={props.country}
                />
            </FlexCell>
            <FlexCell
                flex="1 0 1em"
                overflowX="hidden"
                overflowY="hidden"
                className={style["container-map"]}
            >
                {props.country.cities?.length > 0 ?
                    <CityButtons
                        continent_id={props.country.continent_id}
                        cities={props.country.cities}
                        sortBy={props.sortBy}
                        sortOrder={props.sortOrder}
                        showEnabled={props.showEnabled}
                        substring={props.substring}
                    /> :
                    <div>No cities in {props.country.name}</div>
                }
            </FlexCell>
        </FlexBox>
    )
}

const CityButtons = (props: {
    continent_id: string,
    cities: CountryCities[],
    sortBy: SortBy,
    sortOrder: SortOrder,
    showEnabled: string[],
    substring: string,
}) => {

    const buttons = props.cities && props.cities.filter(e =>
        e.name.toLowerCase().includes(props.substring.toLowerCase()) ||
        e.name_ascii.toLowerCase().includes(props.substring.toLowerCase())
    ).sort(sortNamePopulation({
        sortBy: props.sortBy,
        sortOrder: props.sortOrder
    }))


    return (
        <div className={style['city-button-box']}>
            <FlexBox
                flexDirection={"column"}
                flexWrap="nowrap"
                alignItems={"stretch"}
                justifyContent={"flex-start"}
                className={style["city-container"]}
                overflowX="hidden"
                overflowY="auto"
                height={"100%"}
            >
                {buttons.map((city) => (
                    <FlexCell
                        key={city.id}
                        flex="4 0 1em"
                        overflowX="hidden"
                        overflowY="hidden"
                        className={"x"}
                    >
                        <Link
                            href={`/world/${props.continent_id}/${city.id}`}
                        >
                            <CityButton
                                city={city}
                            />
                        </Link>
                    </FlexCell>
                ))}
            </FlexBox>
        </div>
    )
}

const CityButton = (props: {
    city: CountryCities,
}) => {
    return (
        <FlexBox
            flexDirection={"row"}
            flexWrap="nowrap"
            alignItems={"stretch"}
            justifyContent={"flex-start"}
            className={style["city-container"]}
            height={"1.2em"}
        >
            <FlexCell
                flex="4 0 1em"
                overflowX="hidden"
                overflowY="hidden"
                className={style["table-value-cell"]}
            >
                <span>{props.city.name}</span>
            </FlexCell>
            <FlexCell
                flex="1 0 1em"
                overflowX="hidden"
                overflowY="hidden"
                className={style["table-value-cell"]}
            >
                <span>({props.city.population})</span>
            </FlexCell>
        </FlexBox>
    )
}

const CountryDetailsTable = (props: {
    country: Country
}) => {

    const fields: string[][] = [
        ['Population', `${props.country.population ? props.country.population : ''}`],
        ['iso2', `${props.country.iso2 ? props.country.iso2 : ''}`],
        ['tld', `${props.country.tld ? props.country.tld : ''}`],
        ['prefix', `${props.country.prefix ? props.country.prefix : ''}`],
        ['density', `${props.country.density ? props.country.density : ''}`],
        ['area', `${props.country.area ? props.country.area : ''}`],
        ['gdp', `${props.country.gdp ? props.country.gdp : ''}`],
        ['median_age', `${props.country.median_age ? props.country.median_age : ''}`],
        ['website', `${props.country.website ? props.country.website : ''}`],
        ['driving_side', `${props.country.driving_side ? props.country.driving_side : ''}`],
        ['religion', `${props.country.religion ? props.country.religion : ''}`],
    ]

    return (
        <div className={style['city-button-box']}>
            <FlexTable fields={fields} widths={[1, 4]} />
        </div>
    )
}
