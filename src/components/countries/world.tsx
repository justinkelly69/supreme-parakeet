"use client"

import { Continent } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef } from "react";
import { SideMenu, StyleContext } from "@/components/countries/template";
import { getMap } from "./map";
import { DetailsTemplate, PageTemplate } from "./template";
import { TextArea } from "../ui/xtexts";

export const WorldDetail = (props: {
    continents: Continent[],
}) => {
    const mapContainer = useRef<HTMLDivElement | null>(null)
    const map = useRef<mapboxgl.Map | null>(null)

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
                        Pick a Continent
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
                    <SideMenu
                        showCheckboxes={false}
                        child_id={''}
                        items={props.continents}
                        selectedItems={[]}
                        setSelectedItems={(...f: string[]) => {}}
                        substring={''}
                        selectionURL='[continent]'
                        selectionPath={[]}
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

