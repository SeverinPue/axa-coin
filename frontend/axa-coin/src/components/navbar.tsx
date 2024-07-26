import React, { useEffect, useState } from "react";
import "./stylesheets/navbar.css";
import ThemeSwitcher from "./ThemeSwitcher";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../App.js";

interface Trainee {
  points: number;
}

export default function Navbar() {
  const [trainee, setTrainee] = useState<Trainee>();
  const [points, setPoints] = useState(0);
  const [isAdmin, setAdmin] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [passwordAreSame, setPasswordAreSame] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordBest, setNewPasswordBest] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);
  const url = `https://ui-avatars.com/api/?background=489FB5&color=fff&name=${sessionStorage.getItem(
    "username"
  )}`;
  const navigate = useNavigate();

  function handleLogout() {
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("traineeid");
    sessionStorage.removeItem("points");
    sessionStorage.removeItem("id");
    navigate("/login");
  }

  function handlePasswordChange() {
    setShowDialog(true);
  }

  function handleCloseDialog() {
    setShowDialog(false);
    setNewPassword("");
    setNewPasswordBest("");
    setPasswordAreSame("");
  }

  function handleSavePassword() {
    if (newPassword == newPasswordBest) {
      const newPasswortJson = {
        newPassword: newPassword,
      };

      fetch(API_URL + "/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
        body: JSON.stringify(newPasswortJson),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to create new product.");
          } else {
            setPasswordChanged(true);
          }
          return response.json();
        })
        .catch((error) => {
          alert("Passwort konte nicht geändert werden!");
        });

      if (passwordChanged) {
        alert("Passwort konte erfolgreich geändert werden!");
      }

      handleCloseDialog();
    } else {
      setPasswordAreSame("Passwörter sind nicht gleich!");
    }
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
    fetch(API_URL + "/api/auth/admin", {
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
          <img className="userIcon" src={url} />
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
              <a href="/transactions">Kaufverlauf</a>
            </li>
            <li>
              <button className="deleteButton" onClick={handleLogout}>
                Abmelden
              </button>
            </li>
            <li>
              <button onClick={handlePasswordChange}>Passwort ändern</button>
            </li>
          </ul>
        </div>
      ) : (
        <div className="navBar">
          <div className="logo">
          <img className="userIcon" src={url} />
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
              <a href="/a/transactions">Kaufverläufe</a>
            </li>
            <li>
              <button className="deleteButton" onClick={handleLogout}>
                Abmelden
              </button>
            </li>
            <li>
              <button onClick={handlePasswordChange}>Passwort ändern</button>
            </li>
          </ul>
        </div>
      )}

      {showDialog && (
        <div className="dialog-overlay">
          <div className="edit-dialog" onClick={(e) => e.stopPropagation()}>
            <h3 id="dialog-title">Passwort ändern</h3>
            <label>
              Neues Passwort:
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>
            <label>
              Passwort Bestätigen:
              <input
                type="password"
                value={newPasswordBest}
                onChange={(e) => setNewPasswordBest(e.target.value)}
              />
            </label>

            <p className="errorMessage">{passwordAreSame}</p>

            <div className="dialog-buttons">
              <button className="deleteButton" onClick={handleCloseDialog}>
                Abbrechen
              </button>
              <button className="newButton" onClick={handleSavePassword}>
                Speichern
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
