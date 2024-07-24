import React, { useState } from "react";
import "./stylesheets/start.css";

export default function Start() {
  const [showDialog, setShowDialog] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordBest, setNewPasswordBest] = useState("");

  function handleCreate() {
    setShowDialog(true);
  }

  function handleCloseDialog() {
    setShowDialog(false);
    setCurrentPassword("");
    setNewPassword("");
  }

  function handleSavePassword() {
    


    handleCloseDialog();
  }

  return (
    <>
      <div className="main-discription">
        <h2 className="startTitle">Willkommen bei AXA-Coin</h2>
        <h3>So funktioniert's</h3>
        <span>
          <ol className="list">
            <li>
              <strong>Aufgaben erhalten:</strong>
              <br />
              Dein Berufsbildner stellt dir regelmäßig Aufgaben in AxA-Coin.
              Jede Aufgabe hat eine Beschreibung und eine Deadline, bis zu
              dieser Deadline sollst du die Aufgabe abgeben.
            </li>
            <li>
              <strong>Erarbeiten und Abgeben:</strong>
              <br />
              Du kannst dir selber aufteilen bis wann du welche aufgabe du machen
              sollst aber spätistens bis zur Deadline abgeben. Sobald du eine
              Aufgabe fertig erarbeitet hast, reichst du sie mit einem Klick auf
              "Einreichen" ein.
            </li>
            <li>
              <strong>Punkte erhalten:</strong>
              <br />
              Dein Berufsbildner prüft deine eingereichten Aufgaben. Die
              Berufbildner könenn anschliessend die Aufgabe bestätigen oder
              Zurückgeben wenn sie bestätigt wird bekommst du deine Punkte.
            </li>
            <li>
              <strong>Shoppen:</strong>
              <br />
              Deine gesammelten AxA-Coins sind deine persönliche Währung! Im
              Shop findest du eine große Auswahl an coolen Produkten.
            </li>
          </ol>
        </span>
      </div>
      <div className="div-passwortChange">
        <button onClick={handleCreate}>Passwort ändern</button>
      </div>

      {showDialog && (

        <div className="dialog-overlay" onClick={handleCloseDialog}>
          <div
            className="edit-dialog"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
          >
            <h3 id="dialog-title">Passwort ändern</h3>
            <input
              type="password"
              placeholder="Aktuelles Passwort"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Neues Passwort"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Neues Passwort bestätigen"
              value={newPasswordBest}
              onChange={(e) => setNewPasswordBest(e.target.value)}
            />
            <div className="dialog-buttons">
              <button onClick={handleCloseDialog}>Abbrechen</button>
              <button onClick={handleSavePassword}>Speichern</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
