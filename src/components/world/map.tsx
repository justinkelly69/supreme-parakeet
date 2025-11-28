import { useEffect, useRef } from "react";
import { getMap } from "../geo/map";

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
            props.longitude,
            props.latitude,
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

export default Map;