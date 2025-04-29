import React from 'react'
const DatePicker = ({ onSelect }) => {
    const today = new Date().toISOString().split('T')[0];
    return (
        <div>
            <label className=" font-semibold text-lg text-yellow-500 mb-1">Select Date:</label>
            <input
                type="date"
                min="{today}"
                className="w-full border-2 border-yellow-500 bg-neutral-900 text-yellow-400 p-2 rounded-lg shadow-md focus:ring-2 focus:ring-yellow-500 outline-none" 
                onChange={(e) => onSelect(e.target.value)}
            />
        </div>
    )
}
export default DatePicker