"use client";

import { Continent, ContinentCountry, ContinentWithCountries, Country } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { getMap } from "./map";
import { DetailsTemplate, ListTemplate, PageTemplate } from "./template";
import { TextArea } from "../ui/xtexts";
import Link from "next/link";
import { StyleContext } from "@/components/countries/template";
import { ContinentControls, CountryControls } from "./controls";

export const ContinentDetail = (props: {
    continentWithCountries: ContinentWithCountries,
}) => {
    const mapContainer = useRef<any>(null);
    const map = useRef<mapboxgl.Map | null>(null);

    const style = useContext(StyleContext)
    const router = useRouter()

    const [showEnabled,setShowEnabled] = useState(["ENABLED", "DISABLED"])

    console.log("continentWithCountries:", JSON.stringify(props.continentWithCountries, null, 4));
    useEffect(() => {
        if (map.current) return;

        map.current = getMap(
            mapContainer,
            map,
            props.continentWithCountries.longitude,
            props.continentWithCountries.latitude,
            props.continentWithCountries.zoom,
        ) || null
    }, []);

    return (
        <main className="main">
            <PageTemplate
                justifyContent="center"
                alignItems="center"
                gap={0}
                className="country"
                title={
                    <h1 className={style['page-title']}>
                        {props.continentWithCountries.name}
                    </h1>
                }
                flag={
                    <div className={style["country-flag-position"]}>
                        🇺🇳
                    </div>
                }
                controls={
                    <>
                    <CountryControls
                        handleEdit={(e: any) => e}
                        handleSave={(e: any) => e}
                        handleCancel={router.back}
                    />
                    </>
                }
                leftArea={
                    <CountryMenu
                        title="Continents"
                        continent_id={props.continentWithCountries.id}
                        countries={props.continentWithCountries.countries}
                        headerClass={style["cities-header"]}
                        itemClass={style["cities-item"]}
                    />
                }
                mapArea={
                    <div
                        style={{ height: '100%', width: '100%' }}
                        ref={mapContainer}
                        className={style["map-container"]}
                    />
                }
                descriptionArea={
                    <TextArea
                        id="country_description"
                        name="country_description"
                        value=""
                        placeholder="Description"
                        rows={10}
                        cols={30}
                        className={style["country-description"]}
                        ref={null}
                    />
                }
                rightArea={
                    <DetailsTemplate rows={[
                    ]} />
                }
            />
        </main>
    )
}

const CountryMenu = (props: {
    title: string,
    continent_id: string,
    countries: ContinentCountry[],
    headerClass: string,
    itemClass: string,
}) => {
    const style = useContext(StyleContext)
    const countryList = props.countries?.map(
        (country, index) =>
            <Link key={index}
                href={`/protected/geo/[continent]/[country]`}
                as={`/protected/geo/${props.continent_id}/${country.id}`}
                className={style[props.itemClass]}
            >
                {country.name}
            </Link>
    )
    return (
        <ListTemplate
            columnWidths={[16]}
            rowHeight={1.6}
            totalRows={33}
            listHeaders={
                <div className={props.headerClass}>
                    {props.title}
                </div>
            }
            listItems={countryList}
            className={props.itemClass} />
    )
}



