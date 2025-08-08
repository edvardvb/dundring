'use client';

import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

import L from 'leaflet';

export interface ActivityMapProps {
  route: [number, number][];
  bounds: [number, number][];
  id: string;
  className?: string;
}

export function ActivityMap({
  route,
  bounds,
  id,
  className = 'h-96',
}: ActivityMapProps) {
  const lineOptions = { color: 'red' };

  const startIcon = L.icon({
    iconUrl: '/start.png',

    iconSize: [14, 14], // size of the icon
    iconAnchor: [7, 7], // point of the icon which will correspond to marker's location
  });

  const endIcon = L.icon({
    iconUrl: '/flagg.png',

    iconSize: [14, 14], // size of the icon
    iconAnchor: [7, 7], // point of the icon which will correspond to marker's location
  });

  const filteredRoute = route.filter((point) => {
    if (point && point[0] && point[1]) {
      return true;
    }
    //console.warn('Invalid point in route:', point);
  });

  return (
    <MapContainer
      id={id}
      bounds={bounds}
      scrollWheelZoom={false}
      className={className}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline pathOptions={lineOptions} positions={filteredRoute} />

      <Marker position={filteredRoute[0]} icon={startIcon}></Marker>
      <Marker
        position={filteredRoute[filteredRoute.length - 1]}
        icon={endIcon}
      ></Marker>
    </MapContainer>
  );
}
