'use client'

import React, { useState, useContext, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Continent, ContinentCountries, setContinentData } from "@/lib/continents";
import { Country, CountryCities, filterSelectedCountries } from "@/lib/countries";
import { StyleContext } from "@/app/protected/geo/page";
import Select, { OptionArgs } from "../ui/xselect";
import { CheckBoxData, CheckboxGroup } from "../ui/xcheckboxes";
import { em } from "../ui/xgrid";
import { TextArea } from "../ui/xtexts";

import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { ListTemplate, PageTemplate, DetailsTemplate } from "./template";
import { ContinentControls, CountryControls } from "./controls";
import Link from "next/link";
import { CityNamesTable } from "./cities";
import { getMap } from "./map";

export const CountriesPage = (props: {
    countries: Country[],
    setCountries: Function,
    continents: Continent[],
    setContinents: Function,
}) => {
    const [selectedContinent, setSelectedContinent] = useState("EU")
    const [showEnabled, setShowEnabled] = useState(["ENABLED", "DISABLED"])

    const mapContainer = React.useRef<any>(null);
    const map = React.useRef<mapboxgl.Map | null>(null);

    const style = useContext(StyleContext)
    const router = useRouter()

    const colWidths: string = em([20, 50, 20])
    const rowHeights: string = em([4, 1.6, 30, 20])

    const selectedCountries = filterSelectedCountries(
        selectedContinent,
        props.countries,
        showEnabled,
    )

    const continentArgs: OptionArgs[] = []
    for (let cd of setContinentData(props.continents)) {
        continentArgs.push({
            value: cd.name,
            label: cd.label,
        })
    }

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
                colWidths={colWidths}
                rowHeights={rowHeights}
                justifyContent="center"
                alignItems="center"
                gap={0}
                className="country"
                title={
                    <h1 className={style['page-title']}>
                        "Pick a Continent"
                    </h1>
                }
                flag={
                    <div className={style["country-flag-position"]}>
                        "Flag"
                    </div>
                }
                controls={
                    <>
                        <ContinentControls
                            showEnabled={showEnabled}
                            setShowEnabled={setShowEnabled}
                            selectedContinent={selectedContinent}
                            setSelectedContinent={setSelectedContinent}
                            continentArgs={continentArgs}
                        />
                    </>
                }
                leftArea={
                    <CountryNamesTable
                        title="Countries"
                        countries={selectedCountries}
                        headerClass={style["cities-header"]}
                        itemClass={style["cities-item"]}
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

export const CountryDetail = (props: {
    country: Country,
    setCountry: Function,
    cities: CountryCities[],
}) => {

    const router = useRouter()

    const mapContainer = React.useRef<any>(null);
    const map = React.useRef<mapboxgl.Map | null>(null);

    const [longitude, setLongitude] = React.useState(props.country.longitude);
    const [latitude, setLatitude] = React.useState(props.country.latitude);
    const [zoom, setZoom] = React.useState(props.country.zoom);

    const style = useContext(StyleContext)

    useEffect(() => {
        if (map.current) return;

        map.current = getMap(
            mapContainer,
            map,
            longitude,
            latitude,
            2,
        ) || null
    }, []);

    const colWidths: string = em([20, 50, 20])
    const rowHeights: string = em([4, 1.6, 30, 20])

    return (
        <main className="main">
            <PageTemplate
                colWidths={colWidths}
                rowHeights={rowHeights}
                justifyContent="center"
                alignItems="center"
                gap={0}
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
                    <CountryControls
                        handleEdit={(e: any) => e}
                        handleSave={(e: any) => e}
                        handleCancel={router.back}
                    />
                }
                leftArea={
                    <CityNamesTable
                        cities={props.country.cities}
                        country_id={props.country.id}
                        title="Cities"
                        headerClass={style["cities-header"]}
                        itemClass={style["cities-item"]}
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
                }
            />
        </main>
    );
}

const CountryNamesTable = (props: {
    title: string,
    countries: ContinentCountries[],
    headerClass: string,
    itemClass: string,
}) => {
    const style = useContext(StyleContext)
    const countryList = props.countries?.map(
        (country, index) =>
            <Link key={index}
                href={`/protected/geo/[country]`}
                as={`/protected/geo/${country.id}`}
                className={style[props.itemClass]}
            >
                {country.name}
            </Link>
    )
    return (
        <ListTemplate
            columnWidths={[16]}
            rowHeight={1.6}
            totalRows={33}
            listHeaders={
                <div className={props.headerClass}>
                    {props.title}
                </div>
            }
            listItems={countryList}
            className={props.itemClass} />
    )
}



