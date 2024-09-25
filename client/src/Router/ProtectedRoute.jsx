import React, { useContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const ProtectedRoute = ({ children }) => {
  const { userAuth } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userAuth !== undefined) {
      setLoading(false);
    }
  }, [userAuth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userAuth || !userAuth.access_token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
