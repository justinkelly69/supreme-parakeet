"use client";

import { ContinentCountry, ContinentCountryCity, ContinentWithCountries, SortBy, SortOrder } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { getMap } from "./map";
import { DetailsTemplate, getListItemUrl, ListTemplate, PageTemplate } from "./template";
import { TextArea } from "../ui/xtexts";
import { StyleContext } from "@/components/geo/template";
import { getSelectedItems, sortEnabledDisabled } from "@/lib/utils";
import { setEnabledCountries } from "@/lib/fetch-data";
import { TopBarControls } from "./controls";
import { Checkbox } from "../ui/xcheckboxes";
import Link from "next/link";

export const ContinentDetail = (props: {
    path: string[],
    continent: ContinentWithCountries,
}) => {
    const mapContainer = useRef(null);
    const map = useRef<mapboxgl.Map | null>(null);

    const style = useContext(StyleContext)
    const router = useRouter()

    const [showEnabled, setShowEnabled] = useState<string[]>(["ENABLED", "DISABLED"])
    const [substring, setSubstring] = useState("")
    const [sortBy, setSortBy] = useState<"name" | "population">("name")
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
    const [selectedCountries, setSelectedCountries] = useState<string[]>(
        getSelectedItems(props.continent.countries)
    )

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
                    <TopBarControls
                        sortBy={sortBy}
                        sortOrder={sortOrder}
                        showEnabled={showEnabled}
                        substring={substring}
                        selectedItems={selectedCountries}
                        setSortBy={e => setSortBy(e.target.value as SortBy)}
                        setSortOrder={e => setSortOrder(e.target.value as SortOrder)}
                        setShowEnabled={setShowEnabled}
                        setSubstring={e => setSubstring(e.target.value)}
                        setSelectedItems={setEnabledCountries}
                        handleCancel={router.back}
                    />
                }
                leftArea={
                    <SideMenu
                        showCheckboxes={showEnabled.includes("ENABLED") && showEnabled.includes("DISABLED")}
                        child_id={props.continent.id}
                        items={sortEnabledDisabled({
                            items: props.continent.countries,
                            sortBy: sortBy,
                            sortOrder: sortOrder,
                            showEnabled: showEnabled
                        })}
                        selectedItems={selectedCountries}
                        setSelectedItems={setSelectedCountries as unknown as () => void}
                        substring={substring}
                        selectionURL={props.path}
                        selectionPath={[props.continent.id]}
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
                        ]} />
                    </>
                }
            />
        </main>
    )
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

