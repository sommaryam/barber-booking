import React, { useEffect, useState } from 'react';
import axios from '../axios'; // تأكد من مسار axios
import DashboardHeader from './DashboardHeader';
import Sidebar from './Sidebar';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, Filler } from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    activeBookings: 0,
    totalBarbers: 0,
    totalServices: 0,
  });

  const [barbers, setBarbers] = useState([]);
  const [services, setServices] = useState([]);
  const [chartData, setChartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Active Bookings',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get Stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.get('http://127.0.0.1:8000/api/admin/stats', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(response.data);
        setChartData({
          ...chartData,
          datasets: [
            {
              label: 'Active Bookings',
              data: [response.data.activeBookings, 50, 60, 70, 80, 90],
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,
            },
          ],
        });
      } catch (error) {
        setError('Failed to fetch stats');
        console.error('Failed to fetch stats', error);
      }
    };

    fetchStats();
    setLoading(false);
  }, []);

  // Get Services
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/services')
      .then((res) => {
        setServices(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching services: ' + error.message);
        setLoading(false);
      });
  }, []);

  // Get Barbers
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/barbers')
      .then((res) => {
        setBarbers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching barbers: ' + err.message);
        setLoading(false);
      });
  }, []);

  // Delete Service
  const handleDeleteService = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this service?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`http://127.0.0.1:8000/api/admin/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices((prev) => prev.filter((service) => service.id !== id));
    } catch (error) {
      console.error('Failed to delete service:', error);
      alert('Failed to delete service.');
    }
  };

  // Delete Barber
  const handleDeleteBarber = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this barber?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`http://127.0.0.1:8000/api/admin/barbers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBarbers((prev) => prev.filter((barber) => barber.id !== id));
    } catch (error) {
      console.error('Failed to delete barber:', error);
      alert('Failed to delete barber.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <DashboardHeader />

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-6 mt-4">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2">Active Bookings</h3>
            <p className="text-3xl font-semibold">{stats.activeBookings}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2">Total Barbers</h3>
            <p className="text-3xl font-semibold">{stats.totalBarbers}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2">Services Offered</h3>
            <p className="text-3xl font-semibold">{stats.totalServices}</p>
          </div>
        </div>


        <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
          <h3 className="text-xl font-bold mb-2">Bookings Over Time</h3>
          <Line data={chartData} />
        </div>


        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Barbers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {barbers.length === 0 ? (
              <p>No barbers available</p>
            ) : (
              barbers.map((barber) => (
                <div key={barber.id} className="bg-white p-2 rounded-lg shadow-lg relative">
                  <img
                    src={barber.profile_picture || '/default-barber.jpg'}
                    alt={barber.name}
                    className="w-full h-40 object-cover rounded-t-lg mb-4"
                    loading="lazy"
                  />
                  <h4 className="text-xl font-semibold">{barber.name}</h4>


                  <button
                    onClick={() => handleDeleteBarber(barber.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>


        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.length === 0 ? (
              <p>No services available</p>
            ) : (
              services.map((service) => (
                <div key={service.id} className="bg-white p-2 rounded-lg shadow-lg relative">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-40 object-cover rounded-t-lg mb-4"
                    loading="lazy"
                  />
                  <h3 className="text-xl font-semibold mb-2">{service.name}</h3>


                  <button
                    onClick={() => handleDeleteService(service.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
