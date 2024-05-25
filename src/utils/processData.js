function processData(gpsData, threshold) {
    const stoppages = [];
    let stopStart = null;
  
    for (let i = 1; i < gpsData.length; i++) {
      const prev = gpsData[i - 1];
      const current = gpsData[i];
  
      const distance = getDistance(prev.latitude, prev.longitude, current.latitude, current.longitude);
  
      if (distance < 0.0001) { // Vehicle is stationary
        if (!stopStart) {
          stopStart = prev.timestamp;
        }
      } else {
        if (stopStart) {
          const duration = (current.timestamp - stopStart) / 60000; // Convert ms to minutes
          if (duration >= threshold) {
            stoppages.push({
              latitude: prev.latitude,
              longitude: prev.longitude,
              reachTime: stopStart,
              endTime: current.timestamp,
              duration,
            });
          }
          stopStart = null;
        }
      }
    }
  
    return stoppages;
  }
  
  function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2 - lat1) * Math.PI/180;
    const Δλ = (lon2 - lon1) * Math.PI/180;
  
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  
    const d = R * c;
  
    return d;
  }
  
  export default processData;
  