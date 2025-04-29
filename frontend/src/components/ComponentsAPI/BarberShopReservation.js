import { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from './DatePicker'
const BarberShopReservation = () => {
  const [services, setServices] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [selectedBarber, setSelectedBarber] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesResponse = await axios.get('http://127.0.0.1:8000/api/services');
        const barbersResponse = await axios.get('http://127.0.0.1:8000/api/barbers');
        setServices(servicesResponse.data);
        setBarbers(barbersResponse.data);
      } catch (error) {
        setMessage('Error fetching data');
      }
    };
    fetchData();
  }, []);

  const resetForm = () => {
    setSelectedService('');
    setSelectedBarber('');
    setSelectedDate('');
    setEmail('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!selectedService || !selectedBarber || !selectedDate || !email) {
      setMessage('Please fill in all fields.');
      return;
    }

    try {
      setSubmitting(true);
      const response = await axios.post('http://127.0.0.1:8000/api/appointments', {
        user_id: 1,
        service_id: selectedService,
        barber_id: selectedBarber,
        date: selectedDate,
        email,
      });

      setMessage('Appointment booked successfully');
      resetForm();
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to book appointment.';
      setMessage(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-neutral-900 text-yellow-400 py-10 px-4 flex justify-center">
      <form onSubmit={handleSubmit} className="bg-neutral-800 rounded-2xl shadow-2xl p-8 w-full max-w-2xl space-y-6">
        <h2 className="text-3xl font-bold text-center mb-4 text-yellow-500">
          Book Your Appointment
        </h2>

    
        <div className="w-full max-w-md">
          <label className="font-semibold text-lg text-yellow-500 mb-1">Service:</label>
          <select
            className="w-full border-2 border-yellow-500 bg-neutral-900 text-yellow-400 p-3 rounded-lg shadow-md"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            required
          >
            <option value="">Select Service</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>

        
        {selectedService && (
          <div className="w-full max-w-md mt-6">
            <label className="font-semibold text-lg text-yellow-500 mb-1">Barber:</label>
            <select
              className="w-full border-2 border-yellow-500 bg-neutral-900 text-yellow-400 p-3 rounded-lg shadow-md"
              value={selectedBarber}
              onChange={(e) => setSelectedBarber(e.target.value)}
              required
            >
              <option value="">Select Barber</option>
              {barbers?.length > 0 &&
                barbers.map((barber) => (
                  <option key={barber.id} value={barber.id}>
                    {barber.name}
                  </option>
                ))}
            </select>
          </div>
        )}


        <div className="w-full max-w-md mt-6">
          <label className="font-semibold text-lg text-yellow-500 mb-1">Date:</label>
          <DatePicker onSelect={setSelectedDate}/>
        </div>

     
        <div className="w-full max-w-md mt-6">
          <label className="font-semibold text-lg text-yellow-500 mb-1">Email:</label>
          <input
            type="email"
            className="w-full border-2 border-yellow-500 bg-neutral-900 text-yellow-400 p-3 rounded-lg shadow-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

 
        {message && (
          <p className="text-center font-medium mt-4 py-3 rounded-lg bg-neutral-700 text-yellow-300">
            {message}
          </p>
        )}

      
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={submitting}
            className="bg-yellow-500 text-neutral-900 font-bold px-6 py-3 rounded-lg shadow-md hover:bg-yellow-400 disabled:opacity-50"
          >
            {submitting ? 'Booking...' : 'Book Appointment'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BarberShopReservation;