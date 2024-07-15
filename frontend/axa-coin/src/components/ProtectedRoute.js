// src/components/ProtectedRoute.js
import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthService from '../services/authService';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    AuthService.validateToken().then(
      () => {
        setIsAuthenticated(true);
      },
      () => {
        setIsAuthenticated(false);
      }
    );
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; 
  }

  return (
    <Route
      {...rest}
      render={props => {
        if (!isAuthenticated) {
          return <Redirect to="/login" />;
        }
        else{
            return <Component {...props} />;
        }
      }}
    />
  );
};

export default ProtectedRoute;

