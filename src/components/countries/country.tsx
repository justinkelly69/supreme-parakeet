"use client";

import { Country, CountryCities } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { DetailsTemplate, ListTemplate, PageTemplate, StyleContext } from "./template";
import { getMap } from "./map";
import { CountryControls } from "./controls";
import { TextArea } from "../ui/xtexts";
import Link from "next/link";

export const CountryDetail = (props: {
    country: Country,
}) => {

    const router = useRouter()

    const mapContainer = useRef<any>(null);
    const map = useRef<mapboxgl.Map | null>(null);

    const [longitude, setLongitude] = useState(props.country.longitude);
    const [latitude, setLatitude] = useState(props.country.latitude);
    const [zoom, setZoom] = useState(props.country.zoom);

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
                        continent_id={props.country.continent_id}
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
                        value={props.country.description}
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

const CityNamesTable = (props: {
    title: string,
    continent_id: string,
    country_id: string,
    cities: CountryCities[],
    headerClass: string,
    itemClass: string,
}) => {
    const style = useContext(StyleContext)

    const cityList = props.cities?.map(
        (city, index) =>
            <Link key={index}
                href={`/protected/geo/[continent]/[country]/[city]`}
                as={`/protected/geo/${props.continent_id}/${props.country_id}/${city.id}`}
                className={style[props.itemClass]}
            >
                {city.name}
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
            listItems={cityList}
            className={props.itemClass} />
    )
}