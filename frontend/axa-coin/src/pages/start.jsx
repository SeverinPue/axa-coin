import React, { useState } from "react";
import "./stylesheets/start.css"

export default function Start() {
  return <>

    <div className="main-discription">
      <h2 className="startTitle">Willkommen bei AXA-Coin</h2>
      <h3>So funktioniert's</h3>
      <span>

        <ol className="list">
          <li>
            <strong>Aufgaben erhalten:</strong>
            <br />
            Dein Berufsbildner stellt dir regelmäßig Aufgaben in AxA-Coin.
            Jede Aufgabe hat eine Beschreibung und eine Deadline, bis zu dieser Deadline sollst du die Aufgabe abgeben.
          </li>
          <li>
            <strong>Erarbeiten und Abgeben:</strong>
            <br />
            Du kannst dir selber aufteilen bis wann du welche aufgabe du machen sollst aber spätistens bis zur Deadline abgeben.
            Sobald du eine Aufgabe fertig erarbeitet hast, reichst du sie mit einem Klick auf "Einreichen" ein.
          </li>
          <li>
            <strong>Punkte erhalten:</strong>
            <br />
            Dein Berufsbildner prüft deine eingereichten Aufgaben.
            Die Berufbildner könenn anschliessend die Aufgabe bestätigen oder Zurückgeben wenn sie bestätigt wird bekommst du deine Punkte.
          </li>
          <li>
            <strong>Shoppen:</strong>
            <br />
            Deine gesammelten AxA-Coins sind deine persönliche Währung!
            Im Shop findest du eine große Auswahl an coolen Produkten.
          </li>
        </ol>
      </span>
    </div>
    <div>
      <h3>Profil</h3>

      
    </div>


  </>;
}
