import React, { useState } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import "./stylesheets/task.css";

export default function Task({ title, description, endDate, earningPoints }) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <div className="card">
      <div className="toplevel">
        <p className="title">{title}</p>
        <p className="date">{endDate}</p>
        {isMenuVisible ? (
          <SlArrowUp className="toggle-button" onClick={toggleMenu} />
        ) : (
          <SlArrowDown className="toggle-button" onClick={toggleMenu} />
        )}
      </div>
      {isMenuVisible ? (
        <div className="toggle-menu">
          <p className="description">{description}</p>
          <p className="earningPoints">{earningPoints} Points</p>
        </div>
      ) : (
        <div className="toggle-menu"/>
      )}
    </div>
  );
}
