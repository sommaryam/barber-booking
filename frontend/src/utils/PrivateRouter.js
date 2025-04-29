import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem('adminToken');
  return token ? element : <Navigate to="/login" />;
};

export default PrivateRoute;