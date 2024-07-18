import React from "react";
import "./stylesheets/task.css";

export default function Task({ title, description, endDate, earningPoints, submitted, handleSubmitRoot }) {
  const handleSubmit = () => {
    handleSubmitRoot();
  };

  return (
    <div className="card">
      <div className="toplevel">
        <p className="taskTitle">{title}</p>
      </div>
      <div className="toggle-menu">
        <p className="date">{endDate}</p>
        <p className="description">{description}</p>
        <p className="earningPoints">{earningPoints} Points</p>
        <button className="submitButton" onClick={handleSubmit}>
          {submitted ? <>Zurückziehen</> : <>Einreichen</>}
        </button>
      </div>
    </div>
  );
}

