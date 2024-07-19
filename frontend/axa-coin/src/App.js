import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Layout from "./Layout.js";
import Start from "./pages/start.jsx";
import Login from "./pages/login.tsx";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute.js";
import AdminProtectedRoute from "./components/adminProtectedRoute.js"
import NotFound from "./pages/notFound.tsx"; 
import Tasks from "./pages/tasks.tsx";
import Shop from "./pages/shop.tsx";
import EditUser from "./pages/edituser.tsx";
import Home from "./pages/home.tsx";
import Submission from "./pages/submissions.jsx";
import DashboardStart from "./pages/dashboardStart.jsx"

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
            <Route path="/a/submissions" element={<AdminProtectedRoute component={<Submission/>}/>}></Route>
            <Route path="/a/start" element={<AdminProtectedRoute component={<DashboardStart/>}/>}></Route>

            <Route path="/login" element={<Login />} /> 
            <Route path="/edituser" element={<EditUser />} />
            <Route path="*" element={<NotFound />} /> 
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;