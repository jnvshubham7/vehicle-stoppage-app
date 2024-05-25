import React, { useState, useEffect } from 'react';
import './App.css';
import MapView from './components/MapView';
import StoppageForm from './components/StoppageForm';
import processData from './utils/processData';
import Papa from 'papaparse';

function App() {
  const [gpsData, setGpsData] = useState([]);
  const [stoppageThreshold, setStoppageThreshold] = useState(5); // Default 5 minutes
  const [stoppages, setStoppages] = useState([]);

  useEffect(() => {
    if (gpsData.length > 0) {
      const stoppageData = processData(gpsData, stoppageThreshold);
      setStoppages(stoppageData);
    }
  }, [gpsData, stoppageThreshold]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
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
  };

  const handleThresholdChange = (threshold) => {
    setStoppageThreshold(threshold);
  };

  return (
    <div className="App">
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <StoppageForm onThresholdChange={handleThresholdChange} />
      <MapView gpsData={gpsData} stoppages={stoppages} />
    </div>
  );
}

export default App;
