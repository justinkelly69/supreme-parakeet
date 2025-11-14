import React from 'react'
import mapboxgl from 'mapbox-gl'

export const getMap = (
    mapContainer: React.RefObject<HTMLElement | null>,
    map: React.RefObject<mapboxgl.Map | null>,
    longitude: number,
    latitude: number,
    zoom: number,
    pathToGeoJson?: string,
) => {
    if (map.current) return;

    const container = mapContainer.current;
    if (!container) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

    map.current = new mapboxgl.Map({
        container: container,
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
