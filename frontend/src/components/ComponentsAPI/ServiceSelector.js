import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ServiceSelector = ({ onSelect }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost/api/services')
      .then((response) => {
        setServices(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('There was an error fetching services.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full max-w-md">
      <label className="font-semibold text-lg text-yellow-500 mb-1">Select Service:</label>
      {loading && <p className="text-yellow-500">Loading services...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      <select
        className="w-full border-2 border-yellow-500 bg-neutral-900 text-yellow-400 p-3 rounded-lg shadow-md focus:ring-2 focus:ring-yellow-500 outline-none"
        onChange={(e) => onSelect(e.target.value)}
        disabled={loading} 
      >
        <option value="">-- Select a Service --</option>
        {services.map((service) => (
          <option key={service.id} value={service.id}>
            {service.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ServiceSelector;