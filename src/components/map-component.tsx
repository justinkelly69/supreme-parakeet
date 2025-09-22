import React, { useEffect, useRef } from "react";
import mapboxgl, { GeoJSONSource } from "mapbox-gl";

interface MovingObject {
	path: { type: string; geometry: { type: string; coordinates: number[]; }; properties: { name: string; }; }[];
	id: number;
	name: string;
	coordinates: number[];
}

const MapComponent: React.FC = () => {
	const mapContainer = useRef<HTMLDivElement>(null);

	const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoianVzdGlua2VsbHk2OSIsImEiOiJjbWZ1NjRxd20wcWMwMmpxemd2NDhnaWhsIn0.lxbyz7IFID7MAHADJ1k2yg'

	const movingObjects: MovingObject[] = [
		// Define your moving objects here
	];

	useEffect(() => {
		mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

		if (mapContainer.current) {
			const map = new mapboxgl.Map({
				container: mapContainer.current,
				style: "mapbox://styles/mapbox/dark-v11",
				center: [-74.0060152, 40.7127281],
				zoom: 5,
				maxZoom: 15,
			});

			// Add zoom controls
			map.addControl(new mapboxgl.NavigationControl(), "top-left");

			// Add your custom markers and lines here
			movingObjects.forEach((object) => {
				// Add object point source and layer
				map.addSource(`object-source-${object.id}`, {
					type: "geojson",
					data: {
						type: "FeatureCollection",
						features: [],
					},
				});

				map.addLayer({
					id: `object-layer-${object.id}`,
					type: "symbol",
					source: `object-source-${object.id}`,
					layout: {
						"icon-image": "custom-marker",
						"icon-size": 0.09,
						"icon-allow-overlap": true,
					},
				});

				// Add object line source and layer
				map.addSource(`object-line-source-${object.id}`, {
					type: "geojson",
					data: {
						type: "FeatureCollection",
						features: [],
					},
				});

				map.addLayer({
					id: `object-line-layer-${object.id}`,
					type: "line",
					source: `object-line-source-${object.id}`,
					paint: {
						"line-color": "#00ff00", // Change line color to green
						"line-width": 2,
					},
				});

				// Initialize object path
				object.path = [
					{
						type: "Feature",
						geometry: {
							type: "Point",
							coordinates: object.coordinates,
						},
						properties: {
							name: object.name,
						},
					},
				];
			});

			// Clean up on unmount
			return () => map.remove();
		}
	}, []);

	return (
		<div
			ref={mapContainer}
			style={{ position: "absolute", top: 0, bottom: 0, width: "100%" }}
		/>
	);
};

export default MapComponent;