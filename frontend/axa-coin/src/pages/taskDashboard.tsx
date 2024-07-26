import React, { useEffect, useRef, useState } from 'react';
import TaskEdit from "../components/taskEdit.tsx";
import ConfirmDialog from '../components/confirmDialog.jsx';
import "./stylesheets/taskboard.css";
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../App.js';

export default function Taskboard() {
  const dialogRef = useRef(null);
  const newTaskRef = useRef(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [trainees, setTrainees] = useState<Array<any>>([]);
  const [tasks, setTasks] = useState<Array<any>>([]);
  const [points, setPoints] = useState<number>(0);
  const [id, setId] = useState<string>("");
  const [task, setTask] = useState<any>({});
  const [traineeUpdate, setTraineeUpdate] = useState<Array<string>>([]);
  const [important, setImportant] = useState<boolean>(false);
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [yearSelection, setYearSelection] = useState({});
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState(() => () => { });

  useEffect(() => {
    const yearSelectionState = {};
    years.forEach(year => {
      const yearTrainees = trainees.filter(trainee => trainee.year === year).map(trainee => trainee.id);
      yearSelectionState[year] = yearTrainees.every(id => traineeUpdate.includes(id));
    });
    setYearSelection(yearSelectionState);
  }, [traineeUpdate]);

  const handleCheckboxChange = (e, traineeId) => {
    if (e.target.checked) {
      setTraineeUpdate((prevUpdate) => [...prevUpdate, traineeId]);
    } else {
      setTraineeUpdate((prevUpdate) =>
        prevUpdate.filter((id) => id !== traineeId)
      );
    }
  };

  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      const allTraineeIds = trainees.map((trainee) => trainee.id);
      setTraineeUpdate(allTraineeIds);
    } else {
      setTraineeUpdate([]);
    }
  };

  const handleYearChange = (e, year) => {
    if (e.target.checked) {
      const yearTraineeIds = trainees
        .filter((trainee) => trainee.year === year)
        .map((trainee) => trainee.id);
      setTraineeUpdate((prevUpdate) => [...new Set([...prevUpdate, ...yearTraineeIds])]);
    } else {
      setTraineeUpdate((prevUpdate) =>
        prevUpdate.filter((id) => !trainees.some((trainee) => trainee.id === id && trainee.year === year))
      );
    }
  };


  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const reset = () => {
    setTitle("");
    setDescription("");
    setDate("");
    setPoints(0);
    setTraineeUpdate([]);
    setImportant(false);
  };

  let years = [];
  trainees?.forEach(traineeprov => {
    if (!years.includes(traineeprov.year)) {
      years.push(traineeprov.year);
    }
  });
  const openNewTask = () => {
    newTaskRef.current.showModal();
  };

  const closeNewTask = () => {
    reset();
    newTaskRef.current.close();
  };

  const openDialog = () => {
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    reset();
    dialogRef.current.close();
  };

  useEffect(() => {
    fetchTrainees();
    fetchTasks();
  }, []);

  const fetchTrainees = () => {
    fetch(API_URL + "/api/trainees", {
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    })
      .then(r => r.json())
      .then((data) => { setTrainees(data) })
      .catch((error) => {
        console.error("Fehler beim Fetchen: " + error);
      });
  };

  const fetchTasks = () => {
    fetch(API_URL + "/api/tasks", {
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    })
      .then(response => response.json())
      .then((data) => { setTasks(data) })
      .catch((error) => {
        console.error("Fehler beim Fetchen: " + error);
      });
  };

  function validateInput() {
    if (title.trim() === "") {
      return false;
    }
    if (description.trim() === "") {
      return false;
    }
    if (date.trim() === "") {
      return false;
    }
    if (!Array.isArray(traineeUpdate) || traineeUpdate.length === 0) {
      return false;
    }
    return true;
  }

  function loadTask(task) {
    openDialog();
    setTitle(task.title);
    setImportant(task.important);
    setDescription(task.description);
    setDate(task.endDate);
    setId(task.id);
    setPoints(task.earningPoints);
    const traineeIds = task.taskTrainees.map((trainee) => trainee.trainee.id);
    setTraineeUpdate(traineeIds);
  }

  function updateTask(task) {
    closeDialog();
    let url = API_URL + `/api/tasks/${id}`;
    const updatedTask = {
      title: title,
      description: description,
      earningPoints: points,
      endDate: date,
      important: important,
      trainees: traineeUpdate,
    };
    if (validateInput()) {
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
    else{
      alert("Bitte alle Felder korrekt ausfüllen")
    }
  }

  function deleteTask(idL) {
    setConfirmationAction(() => () => {
      let url = API_URL + `/api/tasks/${idL}`;
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
    });
    setIsConfirmationVisible(true);
  }

  function createTask() {
    closeNewTask();
    let url = API_URL + `/api/tasks`;
    const newTask = {
      title: title,
      description: description,
      earningPoints: points,
      endDate: date,
      important: important,
      creator: sessionStorage.getItem("id"),
      trainees: traineeUpdate,
    };
    if (validateInput()) {
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
    else {
      alert("Bitte alle Felder ausfüllen")
    }
  }

  const handleConfirm = () => {
    confirmationAction();
    setIsConfirmationVisible(false);
  };

  const handleCancel = () => {
    setIsConfirmationVisible(false);
  };

  return (
    <div className="body">
      <h2>Task Verwaltung</h2>
      <div className="taskBar">
        <button className='buttonBack' onClick={() => navigate("/a/submissions")}>Aufgaben auswerten</button>
        <button className='newButton' onClick={openNewTask}>Neue Aufgabe erstellen</button>
      </div>
      <dialog ref={dialogRef} className='taskDialog'>
        <div className="attributes">
          <div className="attribute-pair">
            <label htmlFor="title">Titel:</label>
            <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div className="attribute-pair">
            <label htmlFor="description">Beschreibung:</label>
            <input type="text" id="description" value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          <div className="attribute-pair">
            <label htmlFor="points">Punkte:</label>
            <input type="number" id="points" value={points.toString()} onChange={e => setPoints(parseInt(e.target.value))} />
          </div>
          <div className="attribute-pair">
            <label htmlFor="date">Datum:</label>
            <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} />
          </div>
          <div className="attribute-pair">
            <label htmlFor="important">Priorisieren</label>
            <input type="checkbox" id="important" checked={important} onChange={e => setImportant(e.target.checked)} />
          </div>
        </div>
        <div className="traineeSelect">
          <p className="lernendeAuswahl">Lernende Auswählen:</p>
          <div className="controlCheckboxes">
            <label className="allLabel">
              {traineeUpdate.length === trainees.length ? 'Alle Abwählen' : 'Alle Auswählen'}
              <input
                className='allBoxes'
                type="checkbox"
                checked={traineeUpdate.length === trainees.length}
                onChange={handleSelectAllChange}
              />
            </label>
            {years.map((year) => (
              <div className="years">
                <label key={year} className='yearsLabel'>
                  {year}
                  <input
                    type="checkbox"
                    checked={yearSelection[year] || false}
                    onChange={(e) => handleYearChange(e, year)}
                    className='yearBoxes'
                  />
                </label>
              </div>
            ))}
          </div>
          <div className="buttonContainer">
            <button onClick={toggleDropdown}>
              {dropdownVisible ? 'Lernende Einklappen' : 'Lernende Ausklappen'}
            </button>
          </div>
          {dropdownVisible && (
            <div className="dropdownMenu">
              {trainees?.map((trainee) => (
                <div key={trainee.id} className='traineeContainer'>
                  <label htmlFor={`trainee-${trainee.id}`}>{trainee.user.username}</label>
                  <input
                    type="checkbox"
                    id={`trainee-${trainee.id}`}
                    checked={traineeUpdate.includes(trainee.id)}
                    onChange={(e) => handleCheckboxChange(e, trainee.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="buttons">
          <button className='newButton' onClick={() => createTask()}>Speichern</button>
          <button className='deleteButton' onClick={closeDialog}>Abbrechen</button>
        </div>
      </dialog>

      <dialog ref={newTaskRef} className='taskDialog'>
        <div className="attributes">
          <div className="attribute-pair">
            <label htmlFor="title">Titel:</label>
            <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div className="attribute-pair">
            <label htmlFor="description">Beschreibung:</label>
            <input type="text" id="description" value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          <div className="attribute-pair">
            <label htmlFor="points">Punkte:</label>
            <input type="number" id="points" value={points.toString()} onChange={e => setPoints(parseInt(e.target.value))} />
          </div>
          <div className="attribute-pair">
            <label htmlFor="date">Datum:</label>
            <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} />
          </div>
          <div className="attribute-pair">
            <label htmlFor="important">Priorisieren</label>
            <input type="checkbox" id="important" checked={important} onChange={e => setImportant(e.target.checked)} />
          </div>
        </div>
        <div className="traineeSelect">
          <p className="lernendeAuswahl">Lernende Auswählen:</p>
          <div className="controlCheckboxes">
            <label className="allLabel">
              {traineeUpdate.length === trainees.length ? 'Alle Abwählen' : 'Alle Auswählen'}
              <input
                className='allBoxes'
                type="checkbox"
                checked={traineeUpdate.length === trainees.length}
                onChange={handleSelectAllChange}
              />
            </label>
            {years.map((year) => (
              <div className="years">
                <label key={year} className='yearsLabel'>
                  {year}
                  <input
                    type="checkbox"
                    checked={yearSelection[year] || false}
                    onChange={(e) => handleYearChange(e, year)}
                    className='yearBoxes'
                  />
                </label>
              </div>
            ))}
          </div>
          <div className="buttonContainer">
            <button onClick={toggleDropdown}>
              {dropdownVisible ? 'Lernende Einklappen' : 'Lernende Ausklappen'}
            </button>
          </div>
          {dropdownVisible && (
            <div className="dropdownMenu">
              {trainees?.map((trainee) => (
                <div key={trainee.id} className='traineeContainer'>
                  <label htmlFor={`trainee-${trainee.id}`}>{trainee.user.username}</label>
                  <input
                    type="checkbox"
                    id={`trainee-${trainee.id}`}
                    checked={traineeUpdate.includes(trainee.id)}
                    onChange={(e) => handleCheckboxChange(e, trainee.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="buttons">
          <button className='newButton' onClick={() => updateTask(task)}>Speichern</button>
          <button className='deleteButton' onClick={closeNewTask}>Abbrechen</button>
        </div>
      </dialog>
      <div className='taskSelection'>
        {
          tasks?.map(task => <TaskEdit key={task.id} loadTask={trainee => loadTask(trainee)} deleteTask={taskId => { deleteTask(taskId) }} task={task}></TaskEdit>)
        }
      </div>
      <ConfirmDialog
        text="Möchten sie diesen Task wirklich löschen?"
        onConfirm={handleConfirm}
        visible={isConfirmationVisible}
        onCancel={handleCancel}
      />
    </div>
  );
}
