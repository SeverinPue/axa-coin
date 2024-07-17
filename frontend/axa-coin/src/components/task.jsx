import React, { useState } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import "./stylesheets/task.css";

export default function Task({ title, description, endDate, earningPoints, submitted, handleSubmitRoot }) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [localSubmit, setLocalSubmit] = useState(submitted);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };
  const handleSubmit = () => {
    setLocalSubmit(!localSubmit);
    handleSubmitRoot();
  }

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
          <button className="submitButton" onClick={handleSubmit}>
            {localSubmit ? <>Zurückziehen</> : <>Einreichen</>}
          </button>
        </div>
      ) : (
        <div className="toggle-menu"/>
      )}
    </div>
  );
}
