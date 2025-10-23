// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { currentUser } = useAuth();

  // If there's no logged-in user, redirect to /login
  if (!currentUser) {
    return <Navigate to="/login" replace />; 
    // 'replace' stops them from hitting the back button to get back here
  }

  // If logged in, render the child route component using <Outlet />
  // We pass the context down just like App.jsx does
  return <Outlet context={useOutletContext()} />; 
};

export default ProtectedRoute;