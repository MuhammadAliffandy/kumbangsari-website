import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function AppMap(props) {

    const customIcon = L.icon({
        iconUrl: '/images/icon/pin-location.svg', 
        iconSize: [32, 32],
        iconAnchor: [16, 32], 
        popupAnchor: [0, -32],
    });

    return (
        <MapContainer center={[-7.7238995, 114.186546,15]} zoom={13}  className={`${props.height  ? props.height : 'h-[80vh]'} ${props.width ? props.width : 'w-[100%]' } `}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[-7.7238995, 114.186546,15]} icon={customIcon}>
                <Popup>
                    Desa KumbangSari, Kecamatan Jangkar, Kabupaten Situbondo
                </Popup>
            </Marker>
        </MapContainer>
    );
}

export default AppMap;
