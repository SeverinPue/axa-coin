import React, { useState } from "react";
import "./stylesheets/login.css";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { useNavigate } from "react-router-dom"; 

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Incorrect username or password!");
      }

      const data = await response.json();
      sessionStorage.setItem("jwt", data.token);
      sessionStorage.setItem("id", data.id);

      navigate("/start", { state: { key: "value" } }); 
    } catch (error) {
      setError(error.message);
    } finally {
      setPassword('');
      setUsername('');
    }
  };


  return (
    <>
      <header>
          <ThemeSwitcher></ThemeSwitcher>
          <h1>Willkommen Bei AXA-Coin</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Einloggen</button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </>
  );
}
