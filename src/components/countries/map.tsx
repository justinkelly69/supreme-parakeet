import React from 'react'
import mapboxgl from 'mapbox-gl'

export const getMap = (
    mapContainer: React.RefObject<any>,
    map: React.RefObject<mapboxgl.Map | null>,
    longitude: number,
    latitude: number,
    zoom: number,
    pathToGeoJson?: string,
) => {
    if (map.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

    map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [longitude, latitude],
        zoom: zoom
    });

    if (pathToGeoJson) {
        map.current.addSource('property-data', {
            type: 'geojson',
            data: 'path/to/data.geojson'
        });
    }

    return map.current
}
