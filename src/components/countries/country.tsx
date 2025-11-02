"use client";

import { Country, CountryCities, SortBy, SortOrder } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { DetailsTemplate, ListTemplate, PageTemplate, SideMenu, StyleContext } from "./template";
import { getMap } from "./map";
import { TextArea } from "../ui/xtexts";
import Link from "next/link";
import { getSelectedItems, sortCountries } from "@/lib/utils";
import { Checkbox } from "../ui/xcheckboxes";
import { setEnabledCities } from "@/lib/countries";
import { TopBarControls } from "./controls";

type CityStub = {
    iso: string,
    country: string,
    id: string,
    name: string,
}

const getCities = ({
    countryId,
    countryName,
    prefixList,
    cityList
}: {
    countryId: string,
    countryName: string,
    prefixList: string[],
    cityList: CountryCities[]
}): CityStub[] => {
    const cities = cityList.filter(e => prefixList.includes(e.id))
    const out = []
    for (const city of cities) {
        out.push({
            iso: countryId,
            country: countryName,
            id: city.id,
            name: city.name,
        })
    }
    return out
}

export const CountryDetail = (props: {
    country: Country,
}) => {

    const router = useRouter()

    const mapContainer = useRef<any>(null);
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
                        handleSave={(e: any) => e}
                        handleCancel={router.back}
                    />
                }
                leftArea={
                    <SideMenu
                        showCheckboxes={showEnabled.includes("ENABLED") && showEnabled.includes("DISABLED")}
                        child_id={props.country.id}
                        flag={props.country.flag}
                        items={sortCountries({
                            items: props.country.cities,
                            sortBy: sortBy,
                            sortOrder: sortOrder,
                            showEnabled: showEnabled
                        })}
                        selectedItems={selectedCities}
                        setSelectedItems={setSelectedCities}
                        substring={substring}
                        selectionURL='[continent]/[country]/[city]'
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
                    <>
                        <button onClick={e => console.log(JSON.stringify(getCities({
                            countryId: props.country.id,
                            countryName: props.country.name,
                            prefixList: selectedCities,
                            cityList: props.country.cities
                        }), null, 4))}>
                            Get Countries
                        </button>
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

const CityNamesTable = (props: {
    showCheckboxes: boolean,
    continent_id: string,
    country_id: string,
    country_flag: string,
    cities: CountryCities[],
    selectedCities: string[],
    setSelectedCities: Function,
    substring: string,
}) => {
    const style = useContext(StyleContext)

    const cityList = props.cities?.filter(
        e => e.name.toLowerCase()
            .includes(props.substring.toLowerCase()))
        .map(
            (city, index) =>
                <div key={index}>
                    <span>{props.country_flag}</span>
                    <Checkbox
                        name={city.id}
                        checkedValues={props.selectedCities}
                        setCheckedValues={props.setSelectedCities}
                        showCheckbox={props.showCheckboxes}
                        className={'continent-list'}
                        ref={null}
                    />
                    <Link key={index}
                        href={`/protected/geo/[continent]/[country]/[city]`}
                        as={`/protected/geo/${props.continent_id}/${props.country_id}/${city.id}`}
                        className={'list-item'}
                    >
                        {city.name}
                    </Link>

                </div>
        )
    return (
        <ListTemplate
            columnWidths={[16]}
            rowHeight={1.6}
            totalRows={33}
            listItems={cityList}
            listItemClass={style['props.listItemClass']}
        />
    )
}
