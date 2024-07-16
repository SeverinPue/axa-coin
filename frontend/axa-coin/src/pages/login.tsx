import React, { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Basic validation example
    if (!username || !password) {
      setError("Bitte geben Sie Benutzername und Passwort ein.");
      return;
    }

    setError("");

    const userData = {
      username: username,
      password: password,
    };

    fetch("http://localhost:8080/api/auth/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          setError("Falsches Password oder Benuzername!");
        }
        return response.json();
      })
      .then((data) => {
        sessionStorage.setItem("jwtToken", JSON.stringify(data.token));
      })
      .catch((error) => {
        console.error("Fehler beim Fetschen: ", error);
      });
  };

  return (
    <>
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
