import React, { useEffect, useState } from "react";
import Task from "../components/task";
import './stylesheets/tasks.css'

export default function Tasks() {

  const [tasks, setTasks] = useState([])
  const isLaterThanToday = dateStr => new Date(dateStr) > new Date();

  const handleSubmit = (id: string, task: any) => {
    const updatedDateOfSubmission = task.dateOfSubmission ? null : new Date().toISOString().slice(0, 10);

    const updatedTask = {
      dateOfSubmission: updatedDateOfSubmission
    };

    fetch(`http://localhost:8080/api/tasktrainee/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`
      },
      body: JSON.stringify(updatedTask)
    })
      .then(r => r.json())
      .then(updateTasks);
  };


  useEffect(() => {
    updateTasks();
  }, [])
  const updateTasks = () => {
    fetch("http://localhost:8080/api/tasktrainee", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`
      },
    }).then(r => r.json())
      .then(data => setTasks(data))
  }

  return <>
    
    <div className="mainTasks">

    <div className="important">
      <div className="title">
        <h1>important </h1>
      </div>
      <div className="tasks">
        {tasks.map((task: any, index) => (
            task.task_id.important && task.dateOfSubmission == null ?
            <Task
              key={index}
              title={task.task_id.title}
              endDate={task.task_id.endDate}
              description={task.task_id.description}
              earningPoints={task.task_id.earningPoints}
              submitted={task.dateOfSubmission != null ? true : false}
              handleSubmitRoot={() => handleSubmit(task.id, task)}
            /> : <></>
          ))}
      </div>
    </div>
    <div className="unimportant">
    <div className="title">
      <h1>Other tasks</h1>
    </div>
    <div className="tasks">
      {tasks.map((task: any, index) => (
            !task.task_id.important && task.dateOfSubmission == null ?
            <Task
              key={index}
              title={task.task_id.title}
              endDate={task.task_id.endDate}
              description={task.task_id.description}
              earningPoints={task.task_id.earningPoints}
              submitted={task.dateOfSubmission != null ? true : false}
              handleSubmitRoot={() => handleSubmit(task.id, task)}
            /> : <></>
          ))}
    </div>
    </div>
    <div className="done">
      <div className="title">
        <h1>done</h1>
      </div>
    <div className="tasks">
      {tasks.map((task: any, index) => (
              task.dateOfSubmission !== null && isLaterThanToday(task.task_id.endDate) ?
              <Task
                key={index}
                title={task.task_id.title}
                endDate={task.task_id.endDate}
                description={task.task_id.description}
                earningPoints={task.task_id.earningPoints}
                submitted={task.dateOfSubmission != null ? true : false}
                handleSubmitRoot={() => handleSubmit(task.id, task)}
              /> : <></>
            ))}
    </div>
    </div>
    </div>
  </>;
}
