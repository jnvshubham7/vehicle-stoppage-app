import React, { useState, useEffect } from 'react';
import './App.css';
import MapView from './components/MapView';
import StoppageForm from './components/StoppageForm';
import processData from './utils/processData';
import Papa from 'papaparse';
import dataFile from './data/data.csv';

function App() {
  const [gpsData, setGpsData] = useState([]);
  const [stoppageThreshold, setStoppageThreshold] = useState(5); // Default 5 minutes
  const [stoppages, setStoppages] = useState([]);

  useEffect(() => {
    fetch(dataFile)
      .then(response => response.text())
      .then(csvData => {
        Papa.parse(csvData, {
          header: true,
          complete: (results) => {
            const parsedData = results.data.map(row => ({
              timestamp: parseInt(row.eventGeneratedTime),
              latitude: parseFloat(row.latitude),
              longitude: parseFloat(row.longitude)
            }));
            setGpsData(parsedData);
          }
        });
      });
  }, []);

  useEffect(() => {
    if (gpsData.length > 0) {
      const stoppageData = processData(gpsData, stoppageThreshold);
      setStoppages(stoppageData);
    }
  }, [gpsData, stoppageThreshold]);

  const handleThresholdChange = (threshold) => {
    setStoppageThreshold(threshold);
  };

  return (
    <div className="App">
      <div className="form-container">
        <StoppageForm onThresholdChange={handleThresholdChange} />
      </div>
      <div className="map-container">
        <MapView gpsData={gpsData} stoppages={stoppages} />
      </div>
    </div>
  );
}

export default App;
