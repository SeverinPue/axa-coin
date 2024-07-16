// src/App.js
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/home.tsx';
import Start from './pages/start.tsx';
import './App.css';
import Navbar from './components/navbar.tsx';
import Footer from './components/footer.tsx'
import Login from './pages/login.tsx'

function App() {
  return (
    <div class="app">
      <Navbar></Navbar>
      <div className='main'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/start" element={<Start />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer></Footer>
    </div>


  );
}

export default App;
