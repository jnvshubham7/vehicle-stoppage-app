import React, { useState } from 'react';
import debounce from 'lodash.debounce';

function StoppageForm({ onThresholdChange }) {
  const [threshold, setThreshold] = useState(5);

  const handleThresholdChange = debounce((value) => {
    const thresholdValue = parseInt(value, 10);
    if (thresholdValue > 0) {
      onThresholdChange(thresholdValue);
    }
  }, 300);

  const handleChange = (e) => {
    setThreshold(e.target.value);
    handleThresholdChange(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleThresholdChange(threshold);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Stoppage Threshold (minutes):
        <input
          type="number"
          value={threshold}
          onChange={handleChange}
          min="1"
        />
      </label>
      <button type="submit">Apply</button>
    </form>
  );
}

export default StoppageForm;
