import { DetailsTemplate, ListTemplate, PageTemplate } from "./template"
import { useRouter } from "next/navigation"
import { CountryCities, City } from "@/lib/types"
import React, { useContext, useEffect } from "react"
import { StyleContext } from "@/app/protected/geo/page";
import { getMap } from "./map"
import { em } from "../ui/xgrid"
import { CityControls } from "./controls"
import { TextArea } from "../ui/xtexts"
import Link from "next/link"

export const CityDetail = (props: {
    city: City,
}) => {
    const router = useRouter()

    const mapContainer = React.useRef<any>(null);
    const map = React.useRef<mapboxgl.Map | null>(null);

    const [longitude, setLongitude] = React.useState(props.city.longitude);
    const [latitude, setLatitude] = React.useState(props.city.latitude);
    const [zoom, setZoom] = React.useState(props.city.zoom);

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
                        {props.city.name}
                    </h1>
                }
                flag={
                    <div className={style["country-flag-position"]}>

                    </div>
                }
                controls={
                    <CityControls
                        handleEdit={(e: any) => e}
                        handleSave={(e: any) => e}
                        handleCancel={router.back}
                    />
                }
                leftArea={
                    <div></div>
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
                        id="city_description"
                        name="city_description"
                        value={props.city.description}
                        placeholder="Description"
                        rows={10}
                        cols={30}
                        className={style["country-description"]}
                        ref={null}
                    />
                }
                rightArea={
                    <DetailsTemplate rows={[
                        ["Country", props.city.country],
                        ["Name", props.city.name],
                        ["Name (ascii)", props.city.name_ascii],
                        ["ISO", props.city.iso3],
                        ["Population", props.city.population],
                        ["Latitude", props.city.latitude],
                        ["Longitude", props.city.longitude],
                    ]} />
                }
            />
        </main>
    );
}

export const CityNamesTable = (props: {
    title: string,
    country_id: string,
    cities: CountryCities[],
    headerClass: string,
    itemClass: string,
}) => {
    const style = useContext(StyleContext)

    const cityList = props.cities?.map(
        (city, index) =>
            <Link key={index}
                href={`/protected/geo/[country]/[city]`}
                as={`/protected/geo/${props.country_id}/${city.id}`}
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