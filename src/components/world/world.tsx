"use client"

import { ContinentWithCountries } from "@/lib/types"
import { useState } from "react";
import { FlexBox, FlexCell } from "../ui/xflex";
import style from '@/app/world/page.module.css';
import { Button } from "../ui/xbutton";

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
        <FlexBox
            flexDirection={"column"}
            flexWrap="nowrap"
            alignItems={"stretch"}
            justifyContent={"flex-start"}
            className={style["container"]}
            height={"100%"}
        >
            <FlexCell
                flex="1 0 1em"
                overflowX="hidden"
                overflowY="hidden"
                className={style["container-controls"]}
            >
                <WorldMenu
                    continents={props.continentsWithCountries}
                    selectedContinent={selectedContinent}
                    setSelectedContinent={setSelectedContinent}
                />
            </FlexCell>
            <FlexCell
                flex="20 0 1em"
                overflowX="hidden"
                overflowY="scroll"
                className={style["container-map"]}
            >
                <WorldBody
                    continents={props.continentsWithCountries}
                    selectedContinent={selectedContinent}
                />
            </FlexCell>
        </FlexBox>

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

    const countries = props.continents.filter(c => c.id === props.selectedContinent)

    return (
        <div>
            <ul className={style['country-buttons']}>
                {props.continents.filter(c => c.id === props.selectedContinent).flatMap(c => c.countries).map((country) => (
                    <li key={country.id}>
                        <CountryButton
                            flag={country.flag}
                            name={country.name}
                        />
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
            <span className={style['country-button-flag']}>{props.flag}</span>
            <span className={style['country-button-name']}>{props.name}</span>
        </span>
    )
}
