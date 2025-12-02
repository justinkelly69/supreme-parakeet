"use client";

import React, { ReactElement } from "react";
import style from './map.module.css'
import mapboxgl from 'mapbox-gl'

import { useEffect, useRef } from "react";
//import { getMap } from "../geo/map";

const Map = (props: {
    longitude: number,
    latitude: number,
    zoom: number,
    setLongitude: Function
    setLatitude: Function
    setZoom: Function
}) => {
    const mapContainer = useRef(null);
    const map = useRef<mapboxgl.Map | null>(null);

    useEffect(() => {
        if (map.current) return;

        map.current = getMap(
            mapContainer,
            map,
            props.longitude || 0, // 40.77278437530158,
            props.latitude || 0, // -73.9722936097462,
            props.zoom,
        ) || null
    }, []);

    return (
        <div
            ref={mapContainer}
            style={{ height: '100%', width: '100%' }}
        />
    )
}

const getMap = (
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


export default Map;