import React, { useState } from "react";
import "./stylesheets/navbar.css";

export default function Task({ title, description, endDate, earningPoints }) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <div className="card">
      <p className="title">{title}</p>
      <p className="date">{endDate}</p>
      <button className="toggle-button" onClick={toggleMenu}>
        {isMenuVisible ? "Hide Details" : "Show Details"}
      </button>
      {isMenuVisible && (
        <div className="toggle-menu">
          <p className="description">{description}</p>
          <p className="earningPoints">{earningPoints} Points</p>
        </div>
      )}
    </div>
  );
}
