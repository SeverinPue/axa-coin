// src/App.js
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/home.tsx';
import Start from './pages/start.tsx';
import './global.css'; 

function App() {
  return (

    <BrowserRouter>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/start" element={<Start />} />
    </Routes>
    </BrowserRouter>
  
  );
}

export default App;
