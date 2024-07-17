import React from "react";
import "./stylesheets/task2.css";

export default function Task({ title, description, endDate, earningPoints, submitted, handleSubmitRoot }) {
  const handleSubmit = () => {
    handleSubmitRoot();
  };


  return (
    <div className="bar">
      <div className="toplevel">
          <h3 className="title">{title}</h3>
          <button className="submitButton" onClick={handleSubmit}>
          {submitted ? <>Zurückziehen</> : <>Einreichen</>}
        </button>
      </div>
      <div className="toggle-menu">
        <p className="date">{endDate}</p>
        <p className="description">{description}</p>
        <p className="earningPoints">{earningPoints} Points</p>
      </div>
    </div>
  );
}

