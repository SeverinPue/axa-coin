import React, { useEffect, useState } from "react";
import Task from "../components/task.jsx";
import './stylesheets/tasks.css';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('important');

  const isLaterThanToday = (dateStr) => new Date(dateStr) > new Date();

  const handleSubmit = (id, task) => {
    const updatedDateOfSubmission = task.dateOfSubmission ? null : new Date().toISOString().slice(0, 10);

    const updatedTask = {
      dateOfSubmission: updatedDateOfSubmission,
    };

    fetch(`http://localhost:8080/api/tasktrainees/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(updatedTask),
    })
      .then((r) => r.json())
      .then(updateTasks);
  };

  useEffect(() => {
    updateTasks();
  }, []);

  const updateTasks = () => {
    fetch(`http://localhost:8080/api/tasktrainees/trainee/${sessionStorage.getItem("traineeId")}`, {
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
    return tasks
      .filter(filterFunc)
      .map((task: any, index) => (
        <Task
          key={index}
          title={task.task.title}
          endDate={task.task.endDate}
          description={task.task.description}
          earningPoints={task.task.earningPoints}
          submitted={task.dateOfSubmission !== null}
          handleSubmitRoot={() => handleSubmit(task.id, task)}
        />
      ));
  };

  const getFilteredTasks = () => {
    switch (selectedCategory) {
      case 'important':
        return renderTasks((task) => task.task.important && task.dateOfSubmission == null && !task.approved);
      case 'unimportant':
        return renderTasks((task) => !task.task.important && task.dateOfSubmission == null  && !task.approved);
      case 'done':
        return renderTasks((task) => task.dateOfSubmission !== null && isLaterThanToday(task.task.endDate)  && !task.approved);
      default:
        return null;
    }
  };

  return (
    <div className="mainTasks">
      <div className="taskSelect">
        <label htmlFor="taskCategory">Art von Task:</label>
        <select
          id="taskCategory"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="important">Wichtig</option>
          <option value="unimportant">Sonstig</option>
          <option value="done">Erledigt</option>
        </select>
      </div>
      <div className="tasksContainer">
        {getFilteredTasks()}
      </div>
    </div>
  );
}
