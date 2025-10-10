import React from 'react'
import mapboxgl from 'mapbox-gl'

export default function getMap(
    mapContainer: React.RefObject<any>,
    map: React.RefObject<mapboxgl.Map | null>,
    setMap: Function,
    latitude: number,
    longitude: number,
    zoom: number,
    pathToGeoJson?: string,
) {
    //const mapContainer = React.useRef<any>(null);
    //const map = React.useRef<mapboxgl.Map | null>(null);
    // const [lng, setLng] = React.useState(-74.0632);
    // const [lat, setLat] = React.useState(40.7346);
    // const [zoom, setZoom] = React.useState(12);

    React.useEffect(() => {
        if (map.current) return; // initialize map only once
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
        setMap(map)
    });
}