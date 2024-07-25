import React, { useEffect, useState } from "react";
import CustomSubmission from '../components/Submission.jsx'
import './stylesheets/submissions.css';
import { useNavigate } from 'react-router-dom';

export default function Submission() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const handleApproveLocal = (task) => {
    const updatedTask = {
      points: (task.task.earningPoints + task.trainee.points),
      approved: true
    };

    fetch(`http://localhost:8080/api/tasktrainees/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(updatedTask),
    })
      .then(r => r.json())
      .then(updateTasks);
  }
  
  const handleRejectLocal = (task) => {
    const updatedTask = {
      dateOfSubmission: null,
    };
    fetch(`http://localhost:8080/api/tasktrainees/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(updatedTask),
    })
      .then(r => r.json())
      .then(updateTasks);
  }
  useEffect(() => {
    updateTasks();
  }, []);

  const updateTasks = () => {
    fetch("http://localhost:8080/api/tasktrainees", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    })
      .then(r => r.json())
      .then((data) => {setTasks(data); console.log(data)});
  };

  const renderTasks = (filterFunc) => {
    return tasks
      .filter(filterFunc)
      .map((task, index) => (
        <CustomSubmission title={task.task.title} trainee={task.trainee.user.username} handleApprove={() => handleApproveLocal(task)} handleReject={() => handleRejectLocal(task)}></CustomSubmission>
      ));
  };

  const getFilteredTasks = () => {
    return renderTasks((task) => task.dateOfSubmission !== null && task.approved == false);
  };

  return (
    <div className="mainTasks">
      <div className="submissionBar">
        <h2 className="submissionsTitle">
          Eingereichte Tasks
        </h2>
        <button onClick={() => {navigate("/a/tasks")}} className="backToTask">
          Züruck zu den Tasks
        </button>
      </div>
      <div className="tasksContainer">
        {getFilteredTasks()}
      </div>
    </div>
  );
}
