'use client'

import React, { useState, createContext, useContext } from "react";
import { useRouter } from 'next/navigation';
import {
    Continent, Country, filterSelectedCountries, selectCountry,
    setContinentData, updateSelectedCountries, StyleContextType
} from "@/lib/countries";
import { StyleContext } from "@/app/protected/countries/page";
import { Button } from "../ui/xbutton";
import Select, { OptionArgs } from "../ui/xselect";
import { Checkbox, CheckBoxData, CheckboxGroup } from "../ui/xcheckboxes";
import { GridContainer, GridItem, em, emTotal } from "../ui/xgrid";
import Link from "next/link";
import { TextArea } from "../ui/xtexts";

import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

export const CountriesPage = (props: {
    countries: Country[],
    setCountries: Function,
    continents: Continent[],
    setContinents: Function,
}) => {
    const [selectedContinent, setSelectedContinent] = useState("EU")
    const [showEnabled, setShowEnabled] = useState(["ENABLED", "DISABLED"])

    const style = useContext(StyleContext)

    return (
        <CountriesTable
            countries={props.countries}
            setCountries={props.setCountries}
            setShowEnabled={setShowEnabled}
            showEnabled={showEnabled}
            continentData={setContinentData(props.continents)}
            selectedContinent={selectedContinent}
            setSelectedContinent={setSelectedContinent}
            children={[]} />
    )
}

const CountriesTable = (props: {
    children: any[];
    countries: Country[],
    setCountries: Function,
    setShowEnabled: Function,
    showEnabled: string[],
    continentData: CheckBoxData[],
    selectedContinent: string,
    setSelectedContinent: Function,
}) => {

    const style = useContext(StyleContext)

    const selectedCountries = filterSelectedCountries(
        props.selectedContinent,
        props.countries,
        props.showEnabled,
    )

    const widths = [2.6, 18, 2, 2, 3]
    const colWidths = em(widths)
    const totalWidth = emTotal(widths)

    const klassName = style["country-cell-header"]

    const continentArgs: OptionArgs[] = []
    for (let cd of props.continentData) {
        continentArgs.push({
            value: cd.name,
            label: cd.label,
        })
    }

    const enabledArgs: CheckBoxData[] = [
        { name: "ENABLED", label: "Enabled", checked: true },
        { name: "DISABLED", label: "Disabled", checked: true },
    ]

    return (
        <main className={style["countries-main"]}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                justifyContent: 'flex-start',
                height: '40em',
                width: totalWidth,
            }}>
                <div className={style['country-cell-header']}
                    style={{
                        flex: ' 0 0 auto',
                        overflowX: 'hidden',
                        overflowY: 'scroll',
                        display: 'block',

                    }}>
                    <CheckboxGroup
                        label="Select Countries"
                        className={style["continent-list"]}
                        labelClass={style["continent-list-label"]}
                        boxClass={style["continent-list-box"]}
                        listItemClass={style["continent-list-item"]}
                        checkedValues={props.showEnabled}
                        setCheckedValues={(e: string[]) => {
                            props.setShowEnabled(e)
                        }}
                        checkboxData={enabledArgs}
                        ref={null}
                    />
                    <Select className={`${style["select-continents-dropdown"]}`}
                        value={props.selectedContinent}
                        onChange={(e) => props.setSelectedContinent(e.target.value)}
                        options={continentArgs}
                        ref={null}
                    />
                </div>
                <div style={{
                    flex: ' 0 0 auto',
                    overflowX: 'hidden',
                    overflowY: 'scroll',
                    display: 'block',
                }}>
                    <GridContainer
                        cols={colWidths}
                        rows={"1fr"}
                        justifyContent='center'
                        gap="0"
                        flex="0 1 auto"
                    >
                        <div className={klassName}>
                            ID
                        </div>
                        <div className={klassName}>
                            Country
                        </div>
                        <div className={klassName}>
                            eu
                        </div>
                        <div className={klassName}>
                            flg
                        </div>
                        <div className={klassName}>
                            edit
                        </div>
                    </GridContainer>
                </div>

                <div style={{
                    flex: ' 0 1 auto',
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    display: 'block',
                }}>
                    <GridContainer
                        cols={colWidths}
                        rows={`repeat(${selectedCountries.length}, 1fr)`}
                        justifyContent='center'
                        gap="0"
                    >
                        {selectedCountries.map((country) => {
                            return (
                                <CountryRow
                                    key={country.id}
                                    className="country-cell"
                                    country={country}
                                    selectedCountries={selectedCountries}
                                    setCountries={props.setCountries}
                                    showEnabled={props.showEnabled}
                                    selectedContinent={props.selectedContinent}
                                />
                            )
                        })}
                    </GridContainer>
                </div>
            </div>
        </main >
    );
}

const CountryRow = (props: {
    country: Country,
    className: string,
    selectedCountries: Country[],
    setCountries: Function,
    showEnabled: string[],
    selectedContinent: string,
}) => {
    const style = useContext(StyleContext)

    const klassName = props.country.is_enabled ?
        style[`${props.className}`] + " " + style[`${props.className}-enabled`] :
        style[`${props.className}`]

    return (
        <>
            <div className={klassName}>
                {props.country.id}
            </div>

            <div className={klassName}>
                {props.country.name}
            </div>

            <div className={klassName}>
                {props.country.flag}
            </div>

            <div className={klassName}>
                <span className={style["is-eu"]}>
                    {props.country.is_eu ? 'EU' : ''}
                </span>
            </div>

            <div className={klassName}>
                <Link
                    href="/protected/countries/[id]"
                    as={`/protected/countries/${props.country.id}`}
                    className={style["country-edit-button"]}
                >
                    {"Edit"}
                </Link>
            </div>
        </>
    )
}

export const CountryDetail = (props: {
    country: Country,
    setCountry: Function,
}) => {
    const router = useRouter()

    const mapContainer = React.useRef<any>(null);
    const map = React.useRef<mapboxgl.Map | null>(null);
    const [longitude, setLongitude] = React.useState(props.country.longitude);
    const [latitude, setLatitude] = React.useState(props.country.latitude);
    const [zoom, setZoom] = React.useState(props.country.zoom);

    const style = useContext(StyleContext)

    const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoianVzdGlua2VsbHk2OSIsImEiOiJjbWZ1NjRxd20wcWMwMmpxemd2NDhnaWhsIn0.lxbyz7IFID7MAHADJ1k2yg'

    React.useEffect(() => {
        if (map.current) return; // initialize map only once

        //console.log('country', JSON.stringify(props.country, null, 4))

        mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [props.country.longitude, props.country.latitude],
            zoom: zoom
        });
        // map.current.addSource('property-data', {
        //     type: 'geojson',
        //     data: 'path/to/data.geojson'
        // });
    }, []);

    const colWidths: string = em([50, 20])
    const rowHeights: string = em([1.4, 4, 20, 20])

    return (
        <main className="main">
            <GridContainer
                cols={colWidths}
                rows={rowHeights}
                justifyContent="center"
                alignItems="center"
                gap="0"
                className="country"
            >
                <div className={style["top-strip-left"]}>
                    <ul className={style["top-menu-list"]}>
                        <li className={style["top-menu-item"]}><strong>TLD:</strong>{" "}{props.country.tld}</li>
                        <li className={style["top-menu-item"]}><strong>Dial Code:</strong>{" "}{props.country.prefix}</li>
                        <li className={style["top-menu-item"]}><strong>EU:</strong>{" "}{props.country.is_eu ?
                            <span className={style["is-eu"]}>YES</span> :
                            <span className={style["no-eu"]}>NO</span>
                        }</li>
                        <li className={style["top-menu-item"]}><strong>Long:</strong>{" "}{props.country.longitude}</li>
                        <li className={style["top-menu-item"]}><strong>Lat:</strong>{" "}{props.country.latitude}</li>
                        <li className={style["top-menu-item"]}><strong>Zoom:</strong>{" "}{props.country.zoom}</li>
                    </ul>
                </div>

                <div className={style["top-strip-right"]}>
                    <ul className={style["top-menu-list"]}>
                        <li className={style["top-menu-item"]}>
                            <Button
                                onClick={e => e}
                                className={style["country-edit-button"]}
                                children={"Enable"}
                                ref={null}
                            />
                        </li>
                        <li className={style["top-menu-item"]}>
                            <Button
                                onClick={e => e}
                                className={style["country-edit-button"]}
                                children="Save"
                                ref={null}
                            />
                        </li>
                        <li className={style["top-menu-item"]}>
                            <Button
                                onClick={e => router.back()}
                                className={style["country-edit-button"]}
                                children="Cancel"
                                ref={null}
                            />
                        </li>
                    </ul>
                </div>

                <div className={style["country-heading"]}>
                    <div className={style["country-heading-position"]}>
                        {props.country.name}
                    </div>
                </div>

                <div className={style["country-flag"]}>
                    <div className={style["country-flag-position"]}>
                        {`${props.country.flag}`}
                    </div>
                </div>

                <div className={style["country-map"]}>
                    <div
                        style={{ height: '100%', width: '100%' }}
                        ref={mapContainer}
                        className={style["map-container"]}
                    />
                </div>

                <div className={style["country-details"]}>
                    <div className={style["country-details-table"]}>
                        <div className={style["country-details-label"]}>Continent:</div>
                        <div className={style["country-details-data"]}>{props.country.continent_name}</div>
                        <div className={style["country-details-label"]}>Longitude:</div>
                        <div className={style["country-details-data"]}>{props.country.longitude}</div>
                        <div className={style["country-details-label"]}>Latitude:</div>
                        <div className={style["country-details-data"]}>{props.country.latitude}</div>
                        <div className={style["country-details-label"]}>Zoom:</div>
                        <div className={style["country-details-data"]}>{props.country.zoom}</div>
                        <div className={style["country-details-label"]}>Population:</div>
                        <div className={style["country-details-data"]}></div>
                        <div className={style["country-details-label"]}>Capital City:</div>
                        <div className={style["country-details-data"]}></div>
                        <div className={style["country-details-label"]}>Languages:</div>
                        <div className={style["country-details-data"]}></div>
                        <div className={style["country-details-label"]}>Currency:</div>
                        <div className={style["country-details-data"]}></div>
                        <div className={style["country-details-label"]}>EU Member:</div>
                        <div className={style["country-details-data"]}>{props.country.is_eu ?
                            <span className={style["is-eu"]}>YES</span> :
                            <span className={style["no-eu"]}>NO</span>
                        }</div>
                        <div className={style["country-details-label"]}>Domain:</div>
                        <div className={style["country-details-data"]}>{props.country.tld}</div>
                        <div className={style["country-details-label"]}>Dial Prefix:</div>
                        <div className={style["country-details-data"]}>+{props.country.prefix}</div>
                    </div>
                </div>

                <div className={style["country-description"]}>
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
                </div>

                <div className={style["country-cities"]}>
                    <div className={style["city-heading"]}>Cities</div>
                    <ul className={style["city-list"]}>
                        <li>
                            <a>London</a>
                        </li>
                        <li>
                            <a>Paris</a>
                        </li>
                        <li>
                            <a>New York</a>
                        </li>
                        <li>
                            <a>Berlin</a>
                        </li>
                        <li>
                            <a>+</a>
                        </li>
                    </ul>
                </div>

            </GridContainer>
        </main>
    );
}
