import React, { useState, useEffect } from 'react';

const BarberSelector = ({ serviceId, onSelect }) => {
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (serviceId) {
      setLoading(true); 
      fetch(`/api/barbers/${serviceId}`)
        .then((res) => res.json())
        .then((data) => {
          setBarbers(data);
          setLoading(false);
        })
        .catch((err) => {
          setError('Error fetching barbers.');
          setLoading(false);
        });
    }
  }, [serviceId]);

  return (
    <div className="w-full max-w-md mt-6">
      <label className="font-semibold text-lg text-yellow-500 mb-1">Select Barber:</label>
      {loading && <p className="text-yellow-500">Loading barbers...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <select
        className="w-full border-2 border-yellow-500 bg-neutral-900 text-yellow-400 p-3 rounded-lg shadow-md focus:ring-2 focus:ring-yellow-500 outline-none"
        onChange={(e) => onSelect(e.target.value)}
        disabled={loading} 
      >
        <option value="">-- Choose a barber --</option>
        {barbers.map((barber) => (
          <option key={barber.id} value={barber.id}>
            {barber.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BarberSelector;