import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const ISStracker = () => {
    const [position, setPosition] = useState({latitude: 0, longitude: 0});

    const issIcon = new L.Icon({
        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/International_Space_Station.svg',
        iconSize: [50, 32],
        iconAnchor: [25, 16],
    });
    const fetchISSLocation = async () => {
        try {
            const response = await fetch('http://api.open-notify.org/iss-now.json');
            const data = await response.json();
            console.log("going to set positions")
            setPosition({
                latitude: data.iss_position.latitude,
                longitude: data.iss_position.longitude,
            });
            console.log("successfully retrieved: ", position.latitude, position.longitude)
        } catch (error) {
            console.error('Error fetching ISS location because of this error: ', error)
        }
    }

    useEffect(() => {
        fetchISSLocation();
        const interval = setInterval(fetchISSLocation, 2000); // updates every 2 seconds
        return () => clearInterval(interval);
    }, [])

    // live tracking of the international space station
    // im also going to implement leaflet to show it in an actual space
  return (
    <div className="map">
        <MapContainer
        center={[position.latitude, position.longitude]}
        zoom={2}
        style={{ height: '500px', width: '100%'}}
        scrollWheelZoom={true}>
            <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        <Marker position={[position.latitude, position.longitude]} icon={issIcon}>
            <Popup>
                Iss is here vro <br />
                Latitude: {position.latitude} <br/>
                Longitude: {position.longitude} 
            </Popup>
        </Marker>
        </MapContainer>
        
    </div>
  );
}

export default ISStracker;
