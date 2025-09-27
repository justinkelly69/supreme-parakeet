'use client'

import React, { useState, createContext, useContext } from "react";
import { useRouter } from 'next/navigation';
import {
    Continent, Country, filterSelectedCountries, selectCountry,
    setContinentData, updateSelectedCountries, StyleContextType
} from "@/lib/countries";
import { StyleContext } from "@/app/protected/countries/page";
import { Button } from "../ui/xbutton";
import Select from "../ui/xselect";
import { Checkbox, CheckBoxData, CheckboxGroup } from "../ui/xcheckboxes";
import { GridContainer, GridItem, em } from "../ui/xgrid";
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
    const [selectedContinents, setSelectedContinents] = useState([])
    const [showEnabled, setShowEnabled] = useState('BOTH')

    const style = useContext(StyleContext)

    return (
        <>
            <CountriesHeader
                countries={props.countries}
                setShowEnabled={setShowEnabled}
                showEnabled={showEnabled}
                continentData={setContinentData(props.continents)}
                selectedContinents={selectedContinents}
                setSelectedContinents={setSelectedContinents}
            />
            <CountriesTable
                countries={props.countries}
                setCountries={props.setCountries}
                setShowEnabled={setShowEnabled}
                showEnabled={showEnabled}
                selectedContinents={selectedContinents}
                children={[]} />
        </>
    )
}

const CountriesHeader = (props: {
    countries: Country[],
    setShowEnabled: Function,
    showEnabled: string,
    continentData: CheckBoxData[],
    selectedContinents: string[],
    setSelectedContinents: Function,
}) => {
    const style = useContext(StyleContext)

    return (
        <header className={style["top-panel"]}>
            <div className={style["top-panel-items"]}>
                <div className={`${style["top-panel-item"]} ${style["top-panel-1"]}`}>
                    {props.showEnabled === 'BOTH' && (
                        <Button
                            className={`${style["save-countries-button"]}`}
                            onClick={() => updateSelectedCountries(props.countries)}
                            ref={null}
                        >
                            Save
                        </Button>
                    )}
                </div>
                <div className={`${style["top-panel-item"]} ${style["top-panel-2"]}`}>
                    <Select className={`${style["show-enabled-dropdown"]}`}
                        value={props.showEnabled}
                        onChange={(e) => props.setShowEnabled(e.target.value)}
                        options={[
                            { value: "BOTH", label: "Both" },
                            { value: "ENABLED", label: "Enabled" },
                            { value: "DISABLED", label: "Disabled" },
                        ]}
                        ref={null}
                    />
                </div>
                <div className={`${style["top-panel-item"]} ${style["top-panel-3"]}`}>
                    <CheckboxGroup
                        label="Select Continents"
                        className="continent-list"
                        labelClass="continent-list-item"
                        boxClass="continent-list-box"
                        checkedValues={props.selectedContinents}
                        setCheckedValues={props.setSelectedContinents}
                        checkboxData={props.continentData}
                        ref={null}
                    />
                </div>
            </div>
        </header>
    )
}

const CountriesTable = (props: {
    children: any[];
    countries: Country[],
    setCountries: Function,
    setShowEnabled: Function,
    showEnabled: string,
    selectedContinents: string[],
}) => {

    const style = useContext(StyleContext)

    const colWidths = props.showEnabled === 'BOTH' ?
        em([2, 8, 18, 2, 2, 2, 3]) :
        em([2, 8, 18, 2, 2, 3])

    const selectedCountries = filterSelectedCountries(
        props.selectedContinents,
        props.countries,
        props.showEnabled,
    )

    return (
        <main className="main">
            <GridContainer
                cols={colWidths}
                rows={`repeat(${selectedCountries.length}, 1fr)`}
                justifyContent="center"
                gap="1px"
                className="countries"
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
                            selectedContinents={props.selectedContinents}
                        />
                    )
                })}
            </GridContainer>
        </main >
    );
}

const CountryRow = (props: {
    country: Country,
    className: string,
    selectedCountries: Country[],
    setCountries: Function,
    showEnabled: string,
    selectedContinents: string[]
}) => {
    const style = useContext(StyleContext)
    const enabled = props.country.is_enabled ? "is-enabled" : ""

    return (
        <>
            <GridItem
                className={props.className}
                selected={props.country.is_enabled}
            >
                {props.country.id}
            </GridItem>

            <GridItem
                className={props.className}
                selected={props.country.is_enabled}
            >
                {props.country.continent_name}
            </GridItem>

            <GridItem
                className={props.className}
                selected={props.country.is_enabled}
            >
                {props.country.name}
            </GridItem>

            <GridItem
                className={props.className}
                selected={props.country.is_enabled}
            >
                {props.country.flag}
            </GridItem>

            <GridItem
                className={props.className}
                selected={props.country.is_enabled}
            >
                {props.country.is_eu ? 'Yes' : 'No'}
            </GridItem>

            {props.showEnabled === 'BOTH' && (
                <GridItem
                    className={props.className}
                    selected={props.country.is_enabled}
                >
                    <Checkbox
                        label=""
                        name={props.country.id}
                        checked={props.country.is_enabled}
                        boxClass="checkbox"
                        labelClass="checkbox_label"
                        onChange={(e) => {
                            props.setCountries(
                                selectCountry(
                                    props.selectedCountries,
                                    props.country,
                                    e.target.checked
                                )
                            )
                        }}
                        ref={null}
                    />
                </GridItem>
            )}

            <GridItem
                className={props.className}
                selected={props.country.is_enabled}
            >
                <Link
                    href="/protected/countries/[id]"
                    as={`/protected/countries/${props.country.id}`}
                >
                    {props.country.name}
                </Link>

            </GridItem>
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

        console.log('country', JSON.stringify(props.country, null, 4))

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

    const colWidths: string = em([30, 10])
    const rowWidths: string = em([2, 4, 20, 20])

    return (
        <main className="main">
            <GridContainer
                cols={colWidths}
                rows={rowWidths}
                justifyContent="center"
                alignItems="center"
                gap="1px"
                className="country"
            >
                <GridItem className="country-back">
                    <div></div>
                </GridItem>

                <GridItem className="country-save">
                    <>
                        <Button
                            onClick={e => e}
                            className={""}
                            children={"Save"}
                            ref={null}
                        />
                        <Button
                            onClick={e => router.back()}
                            className={""}
                            children={"Cancel"}
                            ref={null}
                        />
                    </>
                </GridItem>

                <GridItem className="country-heading">
                    {` ${props.country.continent_name} > ${props.country.name}`}
                </GridItem>

                <GridItem className="country-flag">
                    {`${props.country.flag}`}
                </GridItem>

                <GridItem className="country-map">
                    <div
                        style={{ height: '100%', backgroundColor: 'red', borderWidth: '2px', borderColor: 'black' }}
                        ref={mapContainer}
                        className="map-container"
                    />
                </GridItem>

                <GridItem className="country-details">
                    <table className="country-detils-table">
                        <tbody>
                            <tr>
                                <th>Longitude:</th>
                                <td>{props.country.longitude}</td>
                            </tr>
                            <tr>
                                <th>Latitude:</th>
                                <td>{props.country.latitude}</td>
                            </tr>
                            <tr>
                                <th>Zoom: </th>
                                <td>{props.country.zoom}</td>
                            </tr>
                        </tbody>
                    </table>
                </GridItem>

                <GridItem className="country-description">
                    <TextArea
                        id="country_description"
                        name="country_description"
                        value="Description"
                        placeholder="Description"
                        rows={10}
                        cols={30}
                        className="country-description"
                        ref={null}
                    />
                </GridItem>

                <GridItem className="country-details">
                    <table className="country-detils-table">
                        <tbody>
                            <tr>
                                <th>TLD:</th>
                                <td>{props.country.tld}</td>
                            </tr>
                            <tr>
                                <th>Dialling Code:</th>
                                <td>{props.country.prefix}</td>
                            </tr>
                            <tr>
                                <th>EU Member: </th>
                                <td>{props.country.is_eu ? 'Yes' : 'No'}</td>
                            </tr>
                            <tr>
                                <th>Enabled:</th>
                                <td>{props.country.is_enabled ? 'Yes' : 'No'}</td>
                            </tr>
                        </tbody>
                    </table>
                </GridItem>

            </GridContainer>
        </main>
    );
}
