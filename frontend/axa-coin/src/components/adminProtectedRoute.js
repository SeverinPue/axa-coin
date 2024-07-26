import React, { useEffect, useState } from 'react';
import { Navigate, Route, redirect } from 'react-router-dom';
import {API_URL} from "../App";

const AdminProtectedRoute = ({ component }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    fetch(API_URL + "/api/auth/admin", {
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

  return isAuthenticated ? component : <Navigate to="/notfound" />;
};

export default AdminProtectedRoute;

