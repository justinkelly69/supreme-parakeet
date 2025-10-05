import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

//const accessToken = process.env.MAPBOX_ACCESS_TOKEN;
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoianVzdGlua2VsbHk2OSIsImEiOiJjbWZ1NjRxd20wcWMwMmpxemd2NDhnaWhsIn0.lxbyz7IFID7MAHADJ1k2yg'


const MapboxExample = () => {
  const mapContainerRef = useRef();
  const mapRef = useRef();

  //console.log('accessToken', MAPBOX_ACCESS_TOKEN)

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9 // starting zoom
    });
  });

  return (
    <div
      style={{ height: '100%' }}
      ref={mapContainerRef}
      className="map-container"
    />
  );
};

export default MapboxExample;