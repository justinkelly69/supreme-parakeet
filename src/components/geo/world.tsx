"use client"

import { Continent, ContinentCountryCity } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef } from "react";
import { getListItemUrl, ListTemplate, StyleContext } from "@/components/geo/template";
import { getMap } from "./map";
import { DetailsTemplate, PageTemplate } from "./template";
import { TextArea } from "../ui/xtexts";
import { Checkbox } from "../ui/xcheckboxes";
import Link from "next/link";

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
                        selectionURL={[]}
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
                    <></>
                }
                rightArea={
                    <DetailsTemplate rows={[
                    ]} />
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