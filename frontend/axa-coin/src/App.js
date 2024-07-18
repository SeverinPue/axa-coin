import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Layout from "./Layout.js";
import Start from "./pages/start.jsx";
import Login from "./pages/login.tsx";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute.js";
import NotFound from "./pages/notFound.tsx"; 
import Tasks from "./pages/tasks.tsx";
import Shop from "./pages/shop.tsx";

function App() {
  return (
    <div>
      <BrowserRouter className="main">
        <Routes>
          <Route path="/" element={<Navigate replace to="/start" />} />
          <Route path="" element={<Layout />}>
            <Route path="/start" element={<ProtectedRoute component={<Start/>} />} />
            <Route path="/tasks" element={<ProtectedRoute component={<Tasks/>}/>}></Route>
            <Route path="/shop" element={<ProtectedRoute component={<Shop/>}/>}></Route>
            <Route path="/login" element={<Login />} /> 
            <Route path="*" element={<NotFound />} /> 
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;