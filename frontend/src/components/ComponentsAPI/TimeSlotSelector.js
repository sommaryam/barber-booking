import React, { useState, useEffect } from 'react';

const TimeSlotSelector = ({ barberId, date, onSelect }) => {
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    if (barberId && date) {
      fetch(`/api/timeslots/${barberId}/${date}`)
        .then((res) => res.json())
        .then((data) => setTimeSlots(data));
    }
  }, [barberId, date]);

  return (
    <div className="w-full max-w-md mt-6">
      <label className="font-semibold text-lg text-yellow-500 mb-1">Select Time Slot:</label>
      <select
        className="w-full border-2 border-yellow-500 bg-neutral-900 text-yellow-400 p-3 rounded-lg shadow-md focus:ring-2 focus:ring-yellow-500 outline-none"
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">-- Choose a time --</option>
        {timeSlots.map((slot) => (
          <option key={slot} value={slot}>
            {slot}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimeSlotSelector;