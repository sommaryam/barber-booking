import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.post('http://127.0.0.1:8000/api/admin/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem('adminToken');
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div className="w-64 bg-gray-900 text-white p-6 h-full shadow-lg transform transition-all ease-in-out duration-300 hover:scale-105">
      <h2 className="text-3xl font-semibold mb-8 text-center text-yellow-500">Admin Dashboard</h2>
      <ul className="space-y-6">
        <li className="mb-4">
          <Link to="/admin/dashboard" className="flex items-center hover:text-yellow-400 text-lg font-medium transition duration-300 ease-in-out hover:pl-2">
            <i className="fas fa-tachometer-alt mr-3"></i> Dashboard
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/admin/services" className="flex items-center hover:text-yellow-400 text-lg font-medium transition duration-300 ease-in-out hover:pl-2">
            <i className="fas fa-cogs mr-3"></i> Services
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/admin/barbers" className="flex items-center hover:text-yellow-400 text-lg font-medium transition duration-300 ease-in-out hover:pl-2">
            <i className="fas fa-cut mr-3"></i> Barbers
          </Link>
        </li>
       
        <li>
          <button
            onClick={handleLogout}
            className="flex items-center text-lg font-medium hover:text-yellow-400 transition duration-300 ease-in-out hover:pl-2"
          >
            <i className="fas fa-sign-out-alt mr-3"></i> Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;