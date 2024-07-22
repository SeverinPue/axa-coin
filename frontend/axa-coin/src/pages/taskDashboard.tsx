import React, { useEffect, useRef, useState } from 'react'
import TaskEdit from "../components/taskEdit.tsx";
import "./stylesheets/taskboard.css"

export default function Taskboard() {
  const dialogRef = useRef(null);
  const newTaskRef = useRef(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [trainers, setTrainers] = useState<Array<any>>([]);
  const [trainees, setTrainees] = useState<Array<any>>([]);
  const [tasks, setTasks] = useState<Array<any>>([]);
  const [points, setPoints] = useState<number>(0);
  const [id, setId] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [task, setTask] = useState<any>({});
  const [traineeUpdate, setTraineeUpdate] = useState<Array<string>>([])
  const [important, setImportant] = useState<boolean>(false);

  const reset = () => {
    setTitle("");
    setDescription("");
    setDate("");
    setPoints(0);
    setTraineeUpdate([]);
    setImportant(false);
  }

  const handleCheckboxChange = (e, traineeId) => {
    if (e.target.checked) {
      setTraineeUpdate((prevUpdate) => [...prevUpdate, traineeId]);
    } else {
      setTraineeUpdate((prevUpdate) =>
        prevUpdate.filter((id) => id !== traineeId)
      );
    }
  };

  const openNewTask = () => {
    newTaskRef.current.showModal();
    fetchTrainers();
  }

  const closeNewTask = () => {
    reset();
    newTaskRef.current.close();
  }

  const openDialog = () => {
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    reset();
    dialogRef.current.close();
  };
  useEffect(() => {
    fetchTrainees();
    fetchTrainers();
    fetchTasks();
  }, []);

  const fetchTrainees = () => {
    fetch("http://localhost:8080/api/trainees", {
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    })
      .then(r => r.json())
      .then((data) => { setTrainees(data) })
      .catch((error) => {
        console.error("Fehler beim Fetchen: " + error);
      });
  }

  const fetchTrainers = () => {
    fetch("http://localhost:8080/api/trainers", {
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    })
      .then(response => response.json())
      .then((data) => { setTrainers(data)})
      .catch((error) => {
        console.error("Fehler beim Fetchen: " + error);
      });
  }

  const fetchTasks = () => {
    fetch("http://localhost:8080/api/tasks", {
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    })
      .then(response => response.json())
      .then((data) => { setTasks(data) })
      .catch((error) => {
        console.error("Fehler beim Fetchen: " + error);
      });
  }

  function loadTask(task) {
    openDialog();
    setTitle(task.title);
    setImportant(task.important)
    setDescription(task.description);
    setDate(task.endDate);
    setId(task.id);
    setPoints(task.earningPoints);
    const traineeIds = task.taskTrainees.map((trainee) => trainee.trainee.id);
    setTraineeUpdate(traineeIds);
  }

  function updateTask(task) {
    closeDialog();
    let url = `http://localhost:8080/api/tasks/${id}`;
    const updatedTask = {
      title: title,
      description: description,
      earningPoints: points,
      endDate: date,
      trainees: traineeUpdate,
    };

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`
      },
      body: JSON.stringify(updatedTask)
    })
      .then(res => { fetchTasks(); })
      .catch((error) => {
        console.error("Fehler beim Fetchen: " + error);
      });
  }

  function deleteTask(idL: any) {
    let url = `http://localhost:8080/api/tasks/${idL}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`
      }
    })
      .then(() => { fetchTasks(); })
      .catch((error) => {
        console.error("Fehler beim Fetchen: " + error);
      });
  }

  function createTask() {
    closeNewTask();
    let url = `http://localhost:8080/api/tasks`;
    const newTask = {
      title: title,
      description: description,
      earningPoints: points,
      endDate: date,
      important: important,
      creator: sessionStorage.getItem("id"),
      trainees: traineeUpdate,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`
      },
      body: JSON.stringify(newTask)
    })
      .then(res => { fetchTasks(); })
      .catch((error) => {
        console.error("Fehler beim Fetchen: " + error);
      });
  }

  return (
    <div className="body">
      <button onClick={openNewTask}>Neuen Task erstellen</button>
      <select value={filter} onChange={e => setFilter(e.target.value)}>
        <option value={"all"}>Alle Tasks</option>
        <option value={"mine"}>Meine Tasks</option>
      </select>

      <dialog ref={dialogRef}>
        <div className="attributes">
          <label htmlFor="title">Titel</label>
          <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} />
          <label htmlFor="description">Beschreibung</label>
          <input type="text" id="description" value={description} onChange={e => setDescription(e.target.value)} />
          <label htmlFor="points">Punkte</label>
          <input type="number" id="points" value={points.toString()} onChange={e => setPoints(parseInt(e.target.value))} />
          <label htmlFor="date">Datum</label>
          <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} />
          <label htmlFor="important">Important</label>
          <input type="checkbox" id="important" checked={important} onChange={e => setImportant(e.target.checked)} />
        </div>
        <div className="traineeSelect">
          {trainees?.map((trainee) => (
            <div key={trainee.id}>
              <input
                type="checkbox"
                id={`trainee-${trainee.id}`}
                checked={traineeUpdate.includes(trainee.id)}
                onChange={(e) => handleCheckboxChange(e, trainee.id)}
              />
              <label htmlFor={`trainee-${trainee.id}`}>{trainee.user.username}</label>
            </div>
          ))}
        </div>

        <div className="buttons">
          <button onClick={() => updateTask(task)}>Speichern</button>
          <button onClick={closeDialog}>Abbrechen</button>
        </div>
      </dialog>

      <dialog ref={newTaskRef}>
        <div className="attributes">
          <label htmlFor="title">Titel</label>
          <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} />
          <label htmlFor="description">Beschreibung</label>
          <input type="text" id="description" value={description} onChange={e => setDescription(e.target.value)} />
          <label htmlFor="points">Punkte</label>
          <input type="number" id="points" value={points.toString()} onChange={e => setPoints(parseInt(e.target.value))} />
          <label htmlFor="date">Datum</label>
          <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} />
          <label htmlFor="important">Important</label>
          <input type="checkbox" id="important" checked={important} onChange={e => setImportant(e.target.checked)} />
        </div>
        <div className="traineeSelect">
          {trainees?.map((trainee) => (
            <div key={trainee.id}>
              <input
                type="checkbox"
                id={`trainee-${trainee.id}`}
                onChange={(e) => handleCheckboxChange(e, trainee.id)}
              />
              <label htmlFor={`trainee-${trainee.id}`}>{trainee.user.username}</label>
            </div>
          ))}
        </div>
        <div className="buttons">
          <button onClick={createTask}>Speichern</button>
          <button onClick={closeNewTask}>Abbrechen</button>
        </div>
      </dialog>

      <div>
        {
           tasks?.map(task => <TaskEdit key={task.id} loadTask={trainee => loadTask(trainee)} deleteTask={taskId => {deleteTask(taskId)}} task={task}></TaskEdit>)
        }
        
      </div>
    </div>
  )
}
