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

  const startIcon = L.divIcon({
    html: `<svg width="30" height="30">
    <circle
      fill="#33DD33"
      r="10"
      cx="11"
      cy="11"
      stroke="#666633" stroke-width="1" 
    />
  </svg>`,
    className: 'svg-icon',
    iconSize: [14, 14], // size of the icon
    iconAnchor: [7, 7], // point of the icon which will correspond to marker's location
  });

  const w = 12;
  const r = 6;

  const endIcon = L.divIcon({
    html: `<svg width="30" height="30">
    <defs>
      <pattern id="checkerboard" x="2" y="2" width="${w}" height="${w}" patternUnits="userSpaceOnUse">
        <rect x="0" y="0" width="${r}" height="${r}" fill="black"/>
        <rect x="${r}" y="${r}" width="${r}" height="${r}" fill="black"/>
        <rect x="${r}" y="0" width="${r}" height="${r}" fill="white"/>
        <rect x="0" y="${r}" width="${r}" height="${r}" fill="white"/>
      </pattern>
    </defs>
    <circle fill="url(#checkerboard)" stroke="black" stroke-width="1" r="10" cx="11" cy="11" />
  </svg>`,
    className: 'svg-icon',
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
