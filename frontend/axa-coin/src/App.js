import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from './Layout.js';
import Home from './pages/home.tsx';
import Start from './pages/start.tsx';
import Login from './pages/login.tsx';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}> {/* Verwende Layout in den Routen */}
          <Route index element={<Home />} />
          <Route path="start" element={<Start />} />
        </Route> {/* Schließe die Layout-Route */}
        <Route path="/login" element={<Login />} /> {/* Login-Route ohne Layout */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
