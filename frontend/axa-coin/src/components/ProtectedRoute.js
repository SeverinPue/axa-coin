// src/components/ProtectedRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate, Route, redirect } from 'react-router-dom';

const ProtectedRoute = ({ component }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  useEffect(() => {
    console.log("loaded secure route")
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
    fetch("http://localhost:8080/api/auth/admin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`
      }
    })
    .then(response => {
      if (response.status === 200) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setIsAdmin(false);
    });  
  }, []);



  if (isAuthenticated === null || isAdmin === null) {
    return <div>Loading...</div>; 
  }

  return !isAuthenticated ? <Navigate to="/login" /> : isAdmin ? <Navigate to="/a/start" /> : component  
};

export default ProtectedRoute;

