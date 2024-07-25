import React, { useEffect, useState } from "react";
import "./stylesheets/navbar.css";
import ThemeSwitcher from "./ThemeSwitcher";

interface Trainee {
  points: number;
}

export default function Navbar() {
  const [trainee, setTrainee] = useState<Trainee>();
  const [points, setPoints] = useState(0);
  const [isAdmin, setAdmin] = useState(false);

  function handleLogout() { 

    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("traineeid");
    sessionStorage.removeItem("points");
    sessionStorage.removeItem("id");
    window.location.reload();
  }

  useEffect(() => {
    if (trainee?.points) {
      setPoints(trainee.points);
      sessionStorage.setItem("points", "" + trainee.points);
    }
  }, [trainee]);

  useEffect(() => {
    fetch(
      `http://localhost:8080/api/trainees/${sessionStorage.getItem(
        "traineeId"
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      }
    )
      .then((r) => {
        if (!r.ok) {
          throw new Error(
            `Fehler beim Abrufen der Daten: ${r.status} ${r.statusText}`
          );
        }
        return r.json();
      })
      .then((data) => {
        setTrainee(data);
      })
      .catch((error) => {
        console.error("Fehler beim Fetch:", error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/auth/admin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setAdmin(true);
        } else {
          setAdmin(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <>
      {!isAdmin ? (
        <div className="navBar">
          <div className="logo">
            <ThemeSwitcher></ThemeSwitcher>
          </div>
          <p className="points"> Punkte: {points}</p>
          <ul className="navList">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/tasks">Tasks</a>
            </li>
            <li>
              <a href="/shop">Shop</a>
            </li>
            <li>
            <button className="deleteButton" onClick={handleLogout}>Abmelden</button>
            </li>
          </ul>
        </div>
      ) : (
        <div className="navBar">
          <div>
            <ThemeSwitcher></ThemeSwitcher>
          </div>
          <ul className="navList">
            <li>
              <a href="/a/tasks">Tasks</a>
            </li>
            <li>
              <a href="/a/product">Produkte</a>
            </li>
            <li>
              <a href="/a/users">User</a>
            </li>
            <li>
            <button className="deleteButton" onClick={handleLogout}>Abmelden</button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
