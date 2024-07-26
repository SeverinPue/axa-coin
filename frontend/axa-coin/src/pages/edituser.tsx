'use client'

import React, { useEffect, useRef, useState } from "react"
import User from "../components/user.tsx";
import "./stylesheets/edituser.css"
import ConfirmDialog from '../components/confirmDialog.jsx';
import { API_URL } from "../App.js";

export default function EditUser() {
  const dialogRef = useRef(null);
  const newUserRef = useRef(null);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [trainer, setTrainer] = useState<string>("");
  const [trainers, setTrainers] = useState<Array<any>>();
  const [role, setRole] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [filter, setFilter] = useState<string>("trainees");
  const [year, setYear] = useState<string>("0");
  const [years, setYears] = useState<Array<string>>([])
  const [yearFilter, setYearFilter] = useState<string>("")
  const [traineesFilter, setTraineesFilter] = useState<Array<any>>([])
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState<(() => void) | null>(null);



  const reset = () => {
    setUsername("");
    setPassword("");
    setTrainer("");
    setRole("");
    setYear("0")
  }

  const openNewUser = () => {
    newUserRef.current.showModal();
    fetchTrainers();
  }

  const closeNewUser = () => {
    reset()
    newUserRef.current.close();
  }

  const openDialog = () => {
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    reset()
    dialogRef.current.close();
  };

  useEffect(() => {
    fetchTrainees();
    fetchTrainers();

  }, [])

  useEffect(() => {
    fetchTrainees();
    fetchTrainers();

  }, [yearFilter])


  function filterTrainees(unfilteredTrainees) {
    let newYears = [];
    unfilteredTrainees?.forEach(traineeprov => {
      if (!newYears.includes(traineeprov.year)) {
        newYears.push(traineeprov.year);
      }
    });
    setYears(newYears)

    let newTrainees: Array<any> = []
    unfilteredTrainees?.forEach(traineeprov => {
      if (traineeprov.year === yearFilter || yearFilter === "") {
        newTrainees.push(traineeprov)
      }
    })
    setTraineesFilter(newTrainees);
  }


  const fetchTrainees = () => {

    fetch(API_URL + "/api/trainees", {
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    })
      .then(r => r.json())
      .then((data) => { filterTrainees(data);})
      .catch((error) => {
        console.error("Fehler beim Fetchen: " + error);
      });
  }

  const fetchTrainers = () => {

    fetch(API_URL + "/api/trainers", {
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    })
      .then(response => response.json())
      .then((data) => setTrainers(data))
      .catch((error) => {
        console.error("Fehler beim Fetchen: " + error);
      });
  }

  function loadTrainee(trainee: any) {
    openDialog();
    setRole("ROLE_USER")
    setUsername(trainee.user.username);
    if (trainee.trainer !== null) {
      setTrainer(trainee.trainer.id);
    }
    setId(trainee.id);
  }

  function loadTrainer(trainer: any) {
    openDialog();
    setRole("ROLE_ADMIN")
    setUsername(trainer.user.username);
    setId(trainer.id);
  }

  function updateUser() {
    closeDialog();

    let url: string;
    let updatedUser;

    if (filter === "trainers") {
      url = API_URL + "/api/trainers/" + id
      updatedUser = { username: username }
    } else {
      url = API_URL + "/api/trainees/" + id
      updatedUser = { username: username, trainer: trainer }
    }

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`
      }, body: JSON.stringify(updatedUser)
    })
      .then(res => { fetchTrainees(); fetchTrainers(); })
      .catch((error) => {
        console.error("Fehler beim Fetchen: " + error);
      });
  }

  function deleteUser(userId: string) {
    setIsConfirmationVisible(true);
    setConfirmationAction(() => () => {
      let url: string;

      if (filter === "trainers") {
        url = API_URL + "/api/trainers/" + userId;
      } else {
        url = API_URL + "/api/trainees/" + userId;
      }

      fetch(url, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`
        }
      })
        .then(() => {
          fetchTrainees();
          fetchTrainers();
          reset();
        })
        .catch((error) => {
          console.error("Fehler beim Fetchen: " + error);
          fetchTrainees();
          fetchTrainers();
        });
    });
  }
  function handleConfirm() {
    if (confirmationAction) {
      confirmationAction();
    }
    setIsConfirmationVisible(false);
    setConfirmationAction(null);
  }
  
  function handleCancel() {
    setIsConfirmationVisible(false);
    setConfirmationAction(null);
  }
  

  function createUser() {
    closeNewUser();
    let newUser: any;
    if (filter === "trainees") {
      newUser = { username: username, role: role, password: password, trainer: trainer, year: year }
    } else {
      newUser = { username: username, role: role, password: password }
    }

    fetch(API_URL + "/api/users", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`,
        "Content-Type": "application/json"
      }, body: JSON.stringify(newUser)
    })
      .then(() => { fetchTrainees(); fetchTrainers(); })
      .catch((error) => {
        alert("Ungültige Angaben: " + error);
        fetchTrainees();
        fetchTrainers();
      });
  }

  return (
    <div className="flexboxultramaxpro">
      <h2>Benutzerverwaltung</h2>
      <div className="users">
        <div className="menu">
          <button onClick={openNewUser} className="newButton">Neuen Benutzer erfassen</button>
          <div>
            <select value={filter} onChange={e => setFilter(e.target.value)}>
              <option value={"trainees"}>Lernende</option>
              <option value={"trainers"}>Berufsbildner</option>
            </select>
            {filter === "trainees"
              ? <select value={yearFilter} onChange={e => setYearFilter(e.target.value)}>
                <option value={""}>Jahr des Lehrbeginngs</option>
                {
                  years.map(yearprov => <option value={yearprov} key={yearprov}>{yearprov}</option>)
                }
              </select>
              : <div></div>
            }
          </div>

        </div>


        <dialog ref={dialogRef}>
          <div className="attribute">
            <label htmlFor="username">Benutzername</label>
            <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          {role === "ROLE_USER"
            ? <div className="attribute">
              <label htmlFor="dropdown">Berufsbildner*in</label>
              <select id="dropdown" value={trainer} onChange={e => setTrainer(e.target.value)}>
                <option>Bitte wählen</option>
                {
                  trainers?.map(trainerprov => <option key={trainerprov.id} value={trainerprov.id}>{trainerprov.user.username}</option>)
                }
              </select>
            </div>
            : <p></p>
          }



          <div className="buttons">
            <button onClick={() => updateUser()}>speichern</button>
            <button onClick={closeDialog}>abbrechen</button>
          </div>
        </dialog>

        <dialog ref={newUserRef}>
          <div className="attribute">
            <label htmlFor="username">Benutzername</label>
            <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div className="attribute">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="attribute">
            <label htmlFor="dropdown">Rolle</label>
            <select id="dropdown" value={role} onChange={e => setRole(e.target.value)}>
              <option>Bitte wählen</option>
              <option value={"ROLE_ADMIN"}>Berufsbildner</option>
              <option value={"ROLE_USER"}>Lernende/r</option>
            </select>
          </div>
          {role === "ROLE_USER"
            ? <div>
              <div className="attribute">
                <label htmlFor="dropdown">Berufsbildner*in</label>
                <select id="dropdown" value={trainer} onChange={e => setTrainer(e.target.value)}>
                  <option>Bitte wählen</option>
                  {
                    trainers?.map(trainerprov => <option key={trainerprov.id} value={trainerprov.id}>{trainerprov.user.username}</option>)
                  }
                </select>
              </div>
              <div className="attribute">
                <label htmlFor="year">Jahr des Lehrbeginns</label>
                <input type="number" id="year" value={year} onChange={e => setYear(e.target.value)} />
              </div>
            </div>

            : <p></p>
          }

          <div className="buttons">
            <button onClick={() => createUser()}>speichern</button>
            <button onClick={closeNewUser}>abbrechen</button>
          </div>
        </dialog>

        <div>
          {filter === "trainees"
            ? traineesFilter?.map(trainee => <User key={trainee.id} loadUser={trainee => loadTrainee(trainee)} deleteUser={traineeId => { setRole("ROLE_USER"); deleteUser(traineeId) }} user={trainee}></User>)
            : trainers?.map(trainer => <User key={trainer.id} loadUser={trainer => loadTrainer(trainer)} deleteUser={trainerId => { setRole("ROLE_ADMIN"); deleteUser(trainerId) }} user={trainer}></User>)

          }

        </div>
      </div>
      <ConfirmDialog
      text="Willst du diesen Benutzer wirklich Löschen?"
      onConfirm={handleConfirm}
      visible={isConfirmationVisible}
      onCancel={handleCancel}
    />
    </div>

  )
}