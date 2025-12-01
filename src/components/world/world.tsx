"use client"

import { ContinentWithCountries } from "@/lib/types"
import { useState } from "react";
import { FlexBox, FlexCell } from "../ui/xflex";
import style from '@/app/world/page.module.css';
import { Button } from "../ui/xbutton";
import Link from "next/link";
import Body from "./body";

const continents = ['AF', 'AN', 'EU', 'OC', 'NA', 'SA', 'AS']

const WorldDetail = (props: {
    continentsWithCountries: ContinentWithCountries[],
    selectedContinent?: string,
}) => {
    const [selectedContinent, setSelectedContinent] = useState<string>(
        props.selectedContinent && continents.includes(props.selectedContinent) ?
            props.selectedContinent :
            'AF'
    );

    return (
        <Body
            menu={
                <WorldMenu
                    continents={props.continentsWithCountries}
                    selectedContinent={selectedContinent}
                    setSelectedContinent={setSelectedContinent}
                />
            }
            body={
                <WorldBody
                    continents={props.continentsWithCountries}
                    selectedContinent={selectedContinent}
                />
            }
        />
    )
}
export default WorldDetail

const WorldMenu = (props: {
    continents: ContinentWithCountries[],
    selectedContinent: string,
    setSelectedContinent: (continent: string) => void
}) => {
    console.log(props.selectedContinent)
    return (
        <ul className={style["world-menu"]}>
            {props.continents.map((continent) => (
                <li key={continent.id}>
                    <Button onClick={() => props.setSelectedContinent(continent.id)}
                        className="selected">
                        {continent.name}
                    </Button>
                </li>
            ))}
        </ul>
    )
}

const WorldBody = (props: {
    continents: ContinentWithCountries[],
    selectedContinent: string,
}) => {
    const countries = props.continents.filter(
        c => c.id === props.selectedContinent
    )[0].countries

    return (
        <div>
            <ul className={style['country-buttons']}>
                {countries.map((country) => (
                    <li key={country.id}>
                        <Link
                            href={`/world/${country.id}`}
                        >
                            <CountryButton
                                flag={country.flag}
                                name={country.name}
                            />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const CountryButton = (props: {
    name: string,
    flag: string,
}) => {
    return (
        <span className={style['country-button']}>
            <span className={style['country-button-flag']}>
                {props.flag}
            </span>
            <span className={style['country-button-name']}>
                {props.name}
            </span>
        </span>
    )
}
