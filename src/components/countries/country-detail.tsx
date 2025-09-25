
import React, { useContext } from "react";
import { Country } from "@/lib/countries";
import { Button } from "../ui/xbutton";
import { TextArea } from "../ui/xtexts";
import { GridContainer, GridItem, em } from "../ui/xgrid";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { StyleContext } from "@/app/protected/countries/page";



export const CountryDetail = (props: {
    selectedCountry: Country,
    setSelectedCountry: Function,
}) => {
    const mapContainer = React.useRef<any>(null);
    const map = React.useRef<mapboxgl.Map | null>(null);
    const [longitude, setLongitude] = React.useState(props.selectedCountry.longitude);
    const [latitude, setLatitude] = React.useState(props.selectedCountry.latitude);
    const [zoom, setZoom] = React.useState(props.selectedCountry.zoom);

    const style = useContext(StyleContext)

    const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoianVzdGlua2VsbHk2OSIsImEiOiJjbWZ1NjRxd20wcWMwMmpxemd2NDhnaWhsIn0.lxbyz7IFID7MAHADJ1k2yg'

    React.useEffect(() => {
        if (map.current) return; // initialize map only once

        console.log(JSON.stringify(props.selectedCountry, null, 4))

        mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [longitude, latitude],
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
                    <Button
                        onClick={e => props.setSelectedCountry(null)}
                        className={""}
                        children={"Back to List"}
                        ref={null}
                    />
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
                            onClick={e => e}
                            className={""}
                            children={"Cancel"}
                            ref={null}
                        />
                    </>
                </GridItem>

                <GridItem className="country-heading">
                    {` ${props.selectedCountry?.continent_name} > ${props.selectedCountry?.name}`}
                </GridItem>

                <GridItem className="country-flag">
                    {`${props.selectedCountry?.flag}`}
                </GridItem>

                <GridItem className="country-map">
                    <div
                        style={{ height: '100%' }}
                        ref={mapContainer}
                        className="map-container"
                    />
                </GridItem>

                <GridItem className="country-details">
                    <table className="country-detils-table">
                        <tbody>
                            <tr>
                                <th>Longitude:</th>
                                <td>{longitude}</td>
                            </tr>
                            <tr>
                                <th>Latitude:</th>
                                <td>{latitude}</td>
                            </tr>
                            <tr>
                                <th>Zoom: </th>
                                <td>{zoom}</td>
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
                                <td>{props.selectedCountry?.tld}</td>
                            </tr>
                            <tr>
                                <th>Dialling Code:</th>
                                <td>{props.selectedCountry?.prefix}</td>
                            </tr>
                            <tr>
                                <th>EU Member: </th>
                                <td>{props.selectedCountry?.is_eu ? 'Yes' : 'No'}</td>
                            </tr>
                            <tr>
                                <th>Enabled:</th>
                                <td>{props.selectedCountry?.is_enabled ? 'Yes' : 'No'}</td>
                            </tr>
                        </tbody>
                    </table>
                </GridItem>

            </GridContainer>
        </main>
    );
}

