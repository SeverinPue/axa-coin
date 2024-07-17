import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./Layout.js";
import Home from "./pages/home.tsx";
import Start from "./pages/start.tsx";
import Login from "./pages/login.tsx";
import Footer from "./components/footer.tsx";
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter class="main">
        <Routes>

          <Route path="/" element={<Layout />}>

            <Route index element={<Home />} />
            <Route path="start" element={<Start />} />
            <Route path="test" element={<Start />} />

          </Route>
          <Route path="/login" element={<Login />} />

        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
