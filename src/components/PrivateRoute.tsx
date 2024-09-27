import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  isLoggedIn: boolean;
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isLoggedIn, children }) => {
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;