import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Services from './pages/Services';
import Nav from './components/Nav';
import NotFound from './pages/Notfound';
import Contact from './pages/Contact';
import About from './pages/About';
import Team from './pages/Team';
import Reservations from './pages/Reservations';
import Footer from './components/Footer';
import AdminDashboard from './admin/Dashboard';
import AddService from './admin/AddService';
import AddBarber from './admin/AddBarber';
import Login from './Login';
import PrivateRoute from './utils/PrivateRouter';

const root = ReactDOM.createRoot(document.getElementById('root'));



reportWebVitals();
root.render(
  <BrowserRouter>
    <Nav />
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/services' element={<Services />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/about' element={<About />} />
      <Route path='/team' element={<Team />} />
      <Route path='/reservations' element={<Reservations />} />
      <Route path='*' element={<NotFound />} />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={<PrivateRoute element={<AdminDashboard />} />}
      />
      <Route
        path="/admin/services"
        element={<PrivateRoute element={<AddService />} />}
      />
      <Route
        path="/admin/barbers"
        element={<PrivateRoute element={<AddBarber />} />}
      />
      {/* <Route
        path="/admin/appointments"
        element={<PrivateRoute element={<Appointments />} />}
      /> */}

      {/* Login */}
      <Route path="/login" element={<Login />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);
