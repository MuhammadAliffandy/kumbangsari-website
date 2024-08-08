'use client'

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

function AppMap(props) {
    const [customIcon, setCustomIcon] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const L = require('leaflet');

            const icon = L.icon({
                iconUrl: '/images/icon/pin-location.svg',
                iconSize: [32, 32],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32],
            });

            setCustomIcon(icon);
        }
    }, []);

    if (!customIcon) {
        return null; // Atau Anda bisa menampilkan placeholder sementara
    }

    return (
        <MapContainer 
            center={[-7.7238995, 114.186546,15]} 
            zoom={13}  
            className={`${props.height ? props.height : 'h-[80vh]'} ${props.width ? props.width : 'w-[100%]' }`}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[-7.7238995, 114.186546,15]} icon={customIcon}>
                <Popup>
                    Desa Kumbangsari, Kecamatan Jangkar, Kabupaten Situbondo
                </Popup>
            </Marker>
        </MapContainer>
    );
}

export default AppMap;
