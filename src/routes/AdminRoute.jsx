import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ component: Component, requireAuth = true }) => {
  const isAdminAuthenticated = !!window.sessionStorage.getItem('adminToken');

  if (requireAuth && !isAdminAuthenticated) {
    return <Navigate to="/adminlogin" replace />;
  }

  if (!requireAuth && isAdminAuthenticated  === '/adminlogin') {
    return <Navigate to="/admindashboard" replace />;
  }

  return <Component />;
};

export default AdminRoute;