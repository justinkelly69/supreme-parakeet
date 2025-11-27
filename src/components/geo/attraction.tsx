"use client"
import React, { useContext, useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { DetailsTemplate, ListTemplate, PageTemplate, StyleContext } from "@/components/geo/template"
import { Attraction, City } from "@/lib/types"
import { getMap } from "@/components/geo/map"
import { CityControls } from "@/components/geo/controls"
import { fetchAttractions } from "@/lib/fetch-api"
import style from "styled-jsx/style"

export const AttractionDetail = (props: {
    attraction: Attraction,
    path: string[],
}) => {
    const style = useContext(StyleContext)
    const router = useRouter()
    const [longitude, setLongitude] = React.useState(props.attraction.longitude);
    const [latitude, setLatitude] = React.useState(props.attraction.latitude);
    const [zoom, setZoom] = React.useState(16);
    const mapContainer = React.useRef(null);
    const map = React.useRef<mapboxgl.Map | null>(null);

    useEffect(() => {
        if (map.current) return;

        map.current = getMap(
            mapContainer,
            map,
            longitude,
            latitude,
            zoom,
        ) || null
    }, []);

        console.log(JSON.stringify(props.attraction, null, 4));





    return (
        <main className="main">
            <PageTemplate
                className="country"
                title={
                    <h1 className={style['page-title']}>
                        {props.attraction.title}
                    </h1>
                }
                flag={
                    <div className={style["country-flag-position"]}>

                    </div>
                }
                controls={
                    <></>
                }
                leftArea={
                    <></>
                }
                mapArea={
                    <div
                        style={{ height: '100%', width: '100%' }}
                        ref={mapContainer}
                        className={style["map-container"]}
                    />
                }
                descriptionArea={
                    <></>
                }
                rightArea={
                    <div>
                            <Image
                                src={props.attraction.image_url}
                                alt={props.attraction.title}
                                width={400}
                                height={300}
                            />
                    </div>

                }
            />
        </main>
    )
}

