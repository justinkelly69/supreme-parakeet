"use client"

import { DetailsTemplate, ListTemplate, PageTemplate } from "./template"
import { useRouter } from "next/navigation"
import { Attraction, City } from "@/lib/types"
import React, { useContext, useEffect } from "react"
import { StyleContext } from "@/components/countries/template";
import { getMap } from "./map"
import { CityControls } from "./controls"
import { TextArea } from "../ui/xtexts"
import Link from "next/link"
import { fetchAttractions } from "@/lib/fetch-api"

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
                        selectCity={(e: any) => e}
                        scrapeData={async (e: any) => {
                            await fetchAttractions({
                                locationQuery: 'dublin, ie',
                                searchStringArray: ['theaters', 'museums']
                            })
                        }}
                        handleCancel={router.back}
                    />
                }
                leftArea={
                    <SideMenu
                        items={props.city.attractions || []}
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

const SideMenu = (props: {
    items: Attraction[] | [],
    //selectedItems: string[],
    //setSelectedItems: Function,
    //substring: string,
    //selectionURL: string,
    //selectionPath: string[],
}) => {
    const style = useContext(StyleContext)
    const columnWidths = [16]
    const rowHeight = 1.6
    const totalRows = 33

    const cityList = props.items.map(
            (item, index) =>
                <div key={index}>
                    {/* <Link key={index}
                        href={`/protected/geo/${props.selectionURL}`}
                        as={`/protected/geo/${getSelectionValues(props.selectionPath, item.id)}`}
                        className={'list-item'}
                    > */}
                    <span className={style['list-item-name']}>
                        {item.title}
                    </span>

                    {/* </Link> */}

                </div>
        )
    return (
        <ListTemplate
            columnWidths={columnWidths}
            rowHeight={rowHeight}
            totalRows={totalRows}
            listItems={cityList}
            listItemClass={style['props.listItemClass']}
        />
    )
}

