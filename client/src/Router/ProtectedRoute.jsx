import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const ProtectedRoute = ({ children }) => {
  const { userAuth } = useContext(UserContext);

  // Check if user is authenticated, otherwise redirect to login
  if (!userAuth || !userAuth.access_token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
