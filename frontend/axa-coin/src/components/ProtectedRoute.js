// src/components/ProtectedRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate, Route, redirect } from 'react-router-dom';

const ProtectedRoute = ({ component }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    console.log(sessionStorage.getItem("jwt"));
    fetch("http://localhost:8080/api/auth", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`
      }
    })
    .then(response => {
      if (response.status === 200) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setIsAuthenticated(false);
    });
}, []);


  if (isAuthenticated === null) {
    return <div>Loading...</div>; 
  }

  return isAuthenticated ? component : <Navigate to="/login" />;
};

export default ProtectedRoute;

