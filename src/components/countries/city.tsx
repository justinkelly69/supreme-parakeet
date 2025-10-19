"use client"

import { DetailsTemplate, PageTemplate } from "./template"
import { useRouter } from "next/navigation"
import { City } from "@/lib/types"
import React, { useContext, useEffect } from "react"
import { StyleContext } from "@/components/countries/template";
import { getMap } from "./map"
import { CityControls } from "./controls"
import { TextArea } from "../ui/xtexts"

export const CityDetail = (props: {
    city: City,
}) => {
    const router = useRouter()

    const mapContainer = React.useRef<any>(null);
    const map = React.useRef<mapboxgl.Map | null>(null);

    const [longitude, setLongitude] = React.useState(props.city.longitude);
    const [latitude, setLatitude] = React.useState(props.city.latitude);
    const [zoom, setZoom] = React.useState(props.city.zoom);

    const style = useContext(StyleContext)

    useEffect(() => {
        if (map.current) return;

        map.current = getMap(
            mapContainer,
            map,
            longitude,
            latitude,
            10,
        ) || null
    }, []);

    return (
        <main className="main">
            <PageTemplate
                className="country"
                title={
                    <h1 className={style['page-title']}>
                        {props.city.name}
                    </h1>
                }
                flag={
                    <div className={style["country-flag-position"]}>

                    </div>
                }
                controls={
                    <CityControls
                        handleEdit={(e: any) => e}
                        handleSave={(e: any) => e}
                        handleCancel={router.back}
                    />
                }
                leftArea={
                    <div></div>
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
                        id="city_description"
                        name="city_description"
                        value={props.city.description}
                        placeholder="Description"
                        rows={10}
                        cols={30}
                        className={style["country-description"]}
                        ref={null}
                    />
                }
                rightArea={
                    <DetailsTemplate rows={[
                        ["Country", props.city.country],
                        ["Name", props.city.name],
                        ["Name (ascii)", props.city.name_ascii],
                        ["ISO", props.city.iso3],
                        ["Population", props.city.population],
                        ["Latitude", props.city.latitude],
                        ["Longitude", props.city.longitude],
                    ]} />
                }
            />
        </main>
    );
}

