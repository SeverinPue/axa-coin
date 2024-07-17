import React, { useEffect, useState } from "react";
import Task from "../components/task";
import './stylesheets/start.css'

export default function Start() {

  const [tasks, setTasks] = useState([])

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
      .then(data => console.log(data));
  };


  useEffect(() => {
    fetch("http://localhost:8080/api/tasktrainee", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`
      },
    }).then(r => r.json())
      .then(data => setTasks(data))
  }, [])

  return <>
    
    <div className="mainTasks">
    {tasks.map((task: any, index) => (
        <Task
          key={index}
          title={task.task_id.title}
          endDate={task.task_id.endDate}
          description={task.task_id.description}
          earningPoints={task.task_id.earningPoints}
          submitted={task.dateOfSubmission != null ? true : false}
          handleSubmitRoot={() => handleSubmit(task.id, task)}
        />
      ))}

    </div>
  </>;
}
