import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapView({ gpsData, stoppages }) {
  const polyline = gpsData.map(point => [point.latitude, point.longitude]);

  return (
    <MapContainer center={[37.7749, -122.4194]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Polyline positions={polyline} color="blue" />
      {stoppages.map((stoppage, index) => (
        <Marker key={index} position={[stoppage.latitude, stoppage.longitude]}>
          <Popup>
            <div>
              <p><strong>Reach Time:</strong> {new Date(stoppage.reachTime).toLocaleString()}</p>
              <p><strong>End Time:</strong> {new Date(stoppage.endTime).toLocaleString()}</p>
              <p><strong>Duration:</strong> {stoppage.duration} minutes</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapView;
