"use client";

import { ContinentCountryCity, Country, CountryCities, SortBy, SortOrder } from "@/lib/types";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, useContext, useEffect, useRef, useState } from "react";
import { DetailsTemplate, getListItemUrl, ListTemplate, PageTemplate, StyleContext } from "./template";
import { getMap } from "./map";
import { TextArea } from "../ui/xtexts";
import Link from "next/link";
import { getSelectedItems, sortEnabledDisabled } from "@/lib/utils";
import { Checkbox } from "../ui/xcheckboxes";
import { setEnabledCities } from "@/lib/fetch-data";
import { TopBarControls } from "./controls";

export const CountryDetail = (props: {
    path: string[],
    country: Country,
}) => {

    const router = useRouter()

    const mapContainer = useRef(null);
    const map = useRef<mapboxgl.Map | null>(null);

    const [longitude, setLongitude] = useState(props.country.longitude);
    const [latitude, setLatitude] = useState(props.country.latitude);
    const [zoom, setZoom] = useState(props.country.zoom);

    const [substring, setSubstring] = useState("")
    const [showEnabled, setShowEnabled] = useState<string[]>(["ENABLED", "DISABLED"])
    const [sortBy, setSortBy] = useState<"name" | "population">("name")
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
    const [selectedCities, setSelectedCities] = useState<string[]>(
        getSelectedItems(props.country.cities)
    )

    const style = useContext(StyleContext)

    useEffect(() => {
        if (map.current) return;

        map.current = getMap(
            mapContainer,
            map,
            longitude,
            latitude,
            5,
        ) || null
    }, []);

    return (
        <main className="main">
            <PageTemplate
                className="country"
                title={
                    <h1 className={style['page-title']}>
                        {props.country.name}
                    </h1>
                }
                flag={
                    <div className={style["country-flag-position"]}>
                        {props.country.flag}
                    </div>
                }
                controls={
                    <TopBarControls
                        sortBy={sortBy}
                        sortOrder={sortOrder}
                        showEnabled={showEnabled}
                        substring={substring}
                        selectedItems={selectedCities}
                        setSortBy={e => setSortBy(e.target.value as SortBy)}
                        setSortOrder={e => setSortOrder(e.target.value as SortOrder)}
                        setShowEnabled={setShowEnabled}
                        setSubstring={e => setSubstring(e.target.value)}
                        setSelectedItems={setEnabledCities}
                        handleCancel={router.back}
                    />
                }
                leftArea={
                    <SideMenu
                        showCheckboxes={showEnabled.includes("ENABLED") && showEnabled.includes("DISABLED")}
                        child_id={props.country.id}
                        flag={props.country.flag}
                        items={sortEnabledDisabled({
                            items: props.country.cities,
                            sortBy: sortBy,
                            sortOrder: sortOrder,
                            showEnabled: showEnabled
                        })}
                        selectedItems={selectedCities}
                        setSelectedItems={setSelectedCities as unknown as () => void}
                        substring={substring}
                        selectionURL={props.path}
                        selectionPath={[props.country.continent_id, props.country.id]}
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
                    <>
                        <DetailsTemplate rows={[
                            ["TLD", props.country.tld],
                            ["Prefix", props.country.prefix],
                            ["EU Member", props.country.is_eu ? 'Yes' : 'No'],
                            ["UN Member", props.country.un_member ? 'Yes' : 'No'],
                            ["Demonyn", props.country.demonym],
                            ["Population", props.country.population],
                            ["Density", props.country.density],
                            ["Area", props.country.area],
                            ["GDP", props.country.gdp],
                            ["Median Age", props.country.median_age],
                            ["Website", props.country.website],
                            ["Driving Side", props.country.driving_side],
                            ["Religion", props.country.religion],
                            ["Latitude", props.country.latitude],
                            ["Longitude", props.country.longitude],
                        ]} />
                    </>
                }
            />
        </main>
    );
}

const SideMenu = (props: {
    showCheckboxes: boolean,
    child_id: string,
    flag?: string,
    items: ContinentCountryCity[],
    selectedItems: string[],
    setSelectedItems: () => void,
    substring: string,
    selectionURL: string[],
    selectionPath: string[],
}) => {
    const style = useContext(StyleContext)
    const columnWidths = [16]
    const rowHeight = 1.6
    const totalRows = 33

    //console.log('props.selectionURL', props.selectionURL);

    const list = props.items?.filter(
        e => e.name.toLowerCase()
            .includes(props.substring.toLowerCase()))
        .map(
            (item, index) =>
                <div key={index} className={style['list-item-row']}>
                    <span className={style['list-item-flag-spacing']}>
                        {props.flag ? props.flag : item.flag}
                    </span>
                    <span className={style['list-item-checkbox-spacing']}>
                        {props.showCheckboxes ?
                            <Checkbox
                                key={item.id}
                                name={item.id}
                                checkedValues={props.selectedItems}
                                setCheckedValues={props.setSelectedItems}
                                className={'continent-list'}
                                ref={null}
                            /> : null
                        }
                    </span>
                    <span className={style['list-item-title-spacing']}>
                        <Link key={index}
                            href={`/protected/geo/${props.selectionURL}`}
                            as={`/protected/geo/${getListItemUrl(props.selectionPath, item.id)}`}
                            className={'list-item'}
                        >
                            <span className={style['list-item-name']}>
                                {item.name}
                            </span>
                            {item.population ?
                                <span className={style['list-item-population']}>
                                    {`(${item.population})`}
                                </span> :
                                null
                            }
                        </Link>
                    </span>
                </div>
        )
    return (
        <ListTemplate
            columnWidths={columnWidths}
            rowHeight={rowHeight}
            totalRows={totalRows}
            listItems={list}
            listItemClass={style['props.listItemClass']}
        />
    )
}