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
import { sortNamePopulation } from "@/lib/utils";

const CountryDetail = (props: { country: Country }) => {
    const [showEnabled, setShowEnabled] = useState<string[]>(["ENABLED", "DISABLED"])
    const [substring, setSubstring] = useState("")
    const [sortBy, setSortBy] = useState<"name" | "population">("name")
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

    return (
        <Body
            menu={
                <CountryControls
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
    sortBy: SortBy,
    sortOrder: SortOrder,
    showEnabled: string[],
    substring: string,
    setSortBy: ChangeEventHandler<HTMLSelectElement>,
    setSortOrder: ChangeEventHandler<HTMLSelectElement>,
    setShowEnabled: Dispatch<SetStateAction<string[]>>,
    setSubstring: ChangeEventHandler<HTMLInputElement>,
}) => {

    return (
        <ul className={style['world-menu']}>
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
                    placeholder="Filter countries"
                    value={props.substring}
                    onChange={props.setSubstring}
                />
            </li>
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
                <CityButtons
                    cities={props.country.cities}
                    sortBy={props.sortBy}
                    sortOrder={props.sortOrder}
                    showEnabled={props.showEnabled}
                    substring={props.substring}
                />
            </FlexCell>
            <FlexCell
                flex="1 0 1em"
                overflowX="hidden"
                overflowY="hidden"
                className={style["city-details"]}
            >
                <span></span>
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
        <ul className={style['city-buttons']}>
            {props.cities && props.cities.filter(e => e.name.toLowerCase().includes(props.substring.toLowerCase())).sort(sortNamePopulation({
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