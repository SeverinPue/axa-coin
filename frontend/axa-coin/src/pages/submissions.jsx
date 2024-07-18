import React, { useEffect, useState } from "react";
import CustomSubmission from '../components/Submission.jsx'
import './stylesheets/submissions.css';

export default function Submission() {
  const [tasks, setTasks] = useState([]);

  const isLaterThanToday = (dateStr) => new Date(dateStr) > new Date();

  const handleApproveLocal = (task) => {
    const updatedTask = {
      points: (task.task_id.earningPoints + task.trainee.points),
      approved: true
    };

    fetch(`http://localhost:8080/api/trainees/${task.trainee.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(updatedTask),
    })
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
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
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
      .then((r) => r.json())
      .then((data) => setTasks(data));
  };

  const renderTasks = (filterFunc) => {
    console.log(tasks)
    return tasks
      .filter(filterFunc)
      .map((task, index) => (
        <CustomSubmission title={task.task_id.title} trainee={task.trainee.user.username} handleApprove={() => handleApproveLocal(task)} handleReject={() => handleRejectLocal(task)}></CustomSubmission>
      ));
  };

  const getFilteredTasks = () => {
    return renderTasks((task) => task.dateOfSubmission !== null && task.task_id.approved == false);

  };

  return (
    <div className="mainTasks">
      <div className="tasksContainer">
        {getFilteredTasks()}
      </div>
    </div>
  );
}
