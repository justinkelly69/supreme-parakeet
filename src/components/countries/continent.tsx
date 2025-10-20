"use client";

import { ContinentCountry, ContinentWithCountries } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState, ChangeEventHandler } from "react";
import { getMap } from "./map";
import { DetailsTemplate, ListTemplate, PageTemplate } from "./template";
import { TextArea } from "../ui/xtexts";
import Link from "next/link";
import { StyleContext } from "@/components/countries/template";
import { ContinentControls } from "./controls";

export const ContinentDetail = (props: {
    continent: ContinentWithCountries,
}) => {
    const mapContainer = useRef<any>(null);
    const map = useRef<mapboxgl.Map | null>(null);

    const style = useContext(StyleContext)
    const router = useRouter()

    const [showEnabled, setShowEnabled] = useState<string[]>([])
    const [substring, setSubstring] = useState("")
    const [sortBy, setSortBy] = useState<"name" | "population">("name")
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

    useEffect(() => {
        if (map.current) return;

        map.current = getMap(
            mapContainer,
            map,
            props.continent.longitude,
            props.continent.latitude,
            props.continent.zoom,
        ) || null
    }, []);

    return (
        <main className="main">
            <PageTemplate
                className="country"
                title={
                    <h1 className={style['page-title']}>
                        {props.continent.name}
                    </h1>
                }
                flag={
                    <div className={style["country-flag-position"]}>
                        🇺🇳
                    </div>
                }
                controls={
                    <ContinentControls
                        sortBy={sortBy}
                        setSortBy={e => setSortBy(e.target.value as "name" | "population")}
                        sortOrder={sortOrder}
                        setSortOrder={e => setSortOrder(e.target.value as "asc" | "desc")}
                        showEnabled={showEnabled}
                        setShowEnabled={setShowEnabled}
                        substring={substring}
                        setSubstring={e => setSubstring(e.target.value)}
                        handleSave={(e: any) => e}
                        handleCancel={router.back}
                    />
                }
                leftArea={
                    <CountryMenu
                        title="Continents"
                        continent_id={props.continent.id}
                        countries={props.continent.countries}
                        headerClass={style["cities-header"]}
                        itemClass={style["cities-item"]}
                        substring={substring}
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
    substring: string,
}) => {
    const style = useContext(StyleContext)
    const countryList = props.countries?.filter(
        e => e.name.toLowerCase()
            .includes(props.substring.toLowerCase()))
        .map(
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



