"use client"

import { Continent } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef } from "react";
import { StyleContext } from "@/components/countries/template";

import { getMap } from "./map";
import { DetailsTemplate, ListTemplate, PageTemplate } from "./template";
import { TextArea } from "../ui/xtexts";
import Link from "next/link";

export const WorldDetail = (props: {
    continents: Continent[],
}) => {
    const mapContainer = useRef<any>(null);
    const map = useRef<mapboxgl.Map | null>(null);

    const style = useContext(StyleContext)
    const router = useRouter()

    useEffect(() => {
        if (map.current) return;

        map.current = getMap(
            mapContainer,
            map,
            -74.0632,
            40.7346,
            2,
        ) || null
    }, []);

    return (
        <main className="main">
            <PageTemplate
                className="country"
                title={
                    <h1 className={style['page-title']}>
                        "Pick a Continent"
                    </h1>
                }
                flag={
                    <div className={style["country-flag-position"]}>
                        🇺🇳
                    </div>
                }
                controls={
                    <>
                    </>
                }
                leftArea={
                    <ContinentsMenu
                        title="Continents"
                        continents={props.continents}
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

const ContinentsMenu = (props: {
    title: string,
    continents: Continent[],
    headerClass: string,
    itemClass: string,
}) => {
    const style = useContext(StyleContext)
    const continentList = props.continents?.map(
        (continent, index) =>
            <Link key={index}
                href={`/protected/geo/[continent]`}
                as={`/protected/geo/${continent.id}`}
                className={style[props.itemClass]}
            >
                {continent.name}
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
            listItems={continentList}
            className={props.itemClass} />
    )
}



