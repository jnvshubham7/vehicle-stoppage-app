import React, { useState } from 'react';

function StoppageForm({ onThresholdChange }) {
  const [threshold, setThreshold] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    onThresholdChange(threshold);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Stoppage Threshold (minutes):
        <input
          type="number"
          value={threshold}
          onChange={(e) => setThreshold(e.target.value)}
        />
      </label>
      <button type="submit">Apply</button>
    </form>
  );
}

export default StoppageForm;
