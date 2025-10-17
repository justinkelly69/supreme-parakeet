import { Continent, Country } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { em } from "../ui/xgrid";
import { StyleContext } from "@/app/protected/geo/page";
import { filterSelectedCountries } from "@/lib/countries";
import { OptionArgs } from "../ui/xselect";
import { ContinentCountries, setContinentData } from "@/lib/continents";
import { getMap } from "./map";
import { DetailsTemplate, ListTemplate, PageTemplate } from "./template";
import { ContinentControls } from "./controls";
import { TextArea } from "../ui/xtexts";
import Link from "next/link";

export const CountriesPage = (props: {
    countries: Country[],
    setCountries: Function,
    continents: Continent[],
    setContinents: Function,
}) => {
    const [selectedContinent, setSelectedContinent] = useState("EU")
    const [showEnabled, setShowEnabled] = useState(["ENABLED", "DISABLED"])

    const mapContainer = useRef<any>(null);
    const map = useRef<mapboxgl.Map | null>(null);

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
                        🇺🇳
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
                    <ContinentNamesTable
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

const ContinentNamesTable = (props: {
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



