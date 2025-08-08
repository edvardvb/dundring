'use client';

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
const iconDefault = L.Icon.Default.prototype as unknown as {
  _getIconUrl?: () => void;
};
delete iconDefault._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

export interface MapProps {
  route: [number, number][];
  bounds: [number, number][];
  id: string;
  className?: string;
}

export default function Map({
  route,
  bounds,
  id,
  className = 'h-96',
}: MapProps) {
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
      <Polyline pathOptions={lineOptions} positions={route} />

      <Marker position={route[0]} icon={startIcon}></Marker>
      <Marker position={route[route.length - 1]} icon={endIcon}></Marker>
    </MapContainer>
  );
}
