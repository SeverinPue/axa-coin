import React, { useEffect, useState } from "react";
import "./stylesheets/navbar.css";
import ThemeSwitcher from "./ThemeSwitcher";

interface Trainee {
  points: number;
}

export default function Navbar() {
  const [trainee, setTrainee] = useState<Trainee>();
  const [points, setPoints] = useState(0);



  useEffect(() => {
    if (trainee?.points) {
      setPoints(trainee.points);
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
      .then((r) => r.json())
      .then((data) => {
        setTrainee(data);
      });
  }, []);

  return (
    <>
      <nav className="navBar">
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
        </ul>
      </nav>
    </>
  );
}
