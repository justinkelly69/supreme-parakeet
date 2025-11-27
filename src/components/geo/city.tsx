"use client"
import React, { useContext, useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { DetailsTemplate, ListTemplate, PageTemplate, StyleContext } from "@/components/geo/template"
import { Attraction, City } from "@/lib/types"
import { getMap } from "@/components/geo/map"
import { CityControls } from "@/components/geo/controls"
import { fetchAttractions } from "@/lib/fetch-api"
import { getCategoriesFromAttractions } from "@/lib/utils"

export const CityDetail = (props: {
    city: City,
    path: string[],
}) => {
    const router = useRouter()

    const mapContainer = React.useRef(null);
    const map = React.useRef<mapboxgl.Map | null>(null);

    const [longitude, setLongitude] = React.useState(props.city.longitude);
    const [latitude, setLatitude] = React.useState(props.city.latitude);
    const [zoom, setZoom] = React.useState(12);

    const [substring, setSubstring] = useState("")
    const [showEnabled, setShowEnabled] = useState<string[]>(["ENABLED", "DISABLED"])
    const [sortBy, setSortBy] = useState<"name" | "population">("name")
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
    const categories = getCategoriesFromAttractions(props.city.attractions || [])

    const style = useContext(StyleContext)

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

    //console.log('CityDetail', JSON.stringify(props.city, null, 4))

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
                        selectCity={() => null}
                        scrapeData={async () => {
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
                        //showCheckboxes={showEnabled.includes("ENABLED") && showEnabled.includes("DISABLED")}
                        //child_id={props.city.id}
                        //flag={''}
                        items={props.city.attractions || []}
                        //selectedItems={selectedAttractions}
                        //setSelectedItems={setSelectedAttractions as unknown as () => void}
                        //substring={substring}
                        selectionURL={props.path}
                        selectionPath={[props.path[0], props.path[1], props.city.id]}
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
                    <></>
                }
                rightArea={
                    <ul>
                        {categories.map((category, index) => (
                            <li key={index}>{category}</li>
                        ))} 
                    </ul>
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
    selectionURL: string[],
    selectionPath: string[],
}) => {
    const style = useContext(StyleContext)
    const columnWidths = [16]
    const rowHeight = 1.6
    const totalRows = 33

    const cityList = props.items.map(
        (item, index) =>
            <div key={index}>
                <Link key={index}
                    href={`/protected/geo/${[...props.selectionPath, item.id].join('/')}`}
                    //href={`/protected/geo/[continent]/[country]/[city]/[attraction]`}
                    className={'list-item'}
                >
                    <span className={style['list-item-name']}>
                        {item.title}
                    </span>

                </Link>

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

