'use client'

import React, { useEffect, useRef, useState } from "react"
import User from "../components/user.tsx";
import "./stylesheets/edituser.css"

export default function EditUser (){
    const dialogRef = useRef(null);
    const newUserRef = useRef(null);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [trainer, setTrainer] = useState<string>("");
    const [trainers, setTrainers] = useState<Array<any>>();
    const [trainees, setTrainees] = useState<Array<any>>();
    const [trainee, setTrainee] = useState<any>();
    const [role, setRole] = useState<string>("");
    const [showTrainees, setShowTrainees] = useState<boolean>(false);

    const reset = () => {
      setUsername("");
      setPassword("");
      setTrainer("");
      setRole("");
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

    const fetchTrainees = () => {

        fetch("http://localhost:8080/api/trainees", {
            headers: {
              "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`,
            },
          })
            .then(r => r.json())
            .then((data) => {setTrainees(data); console.log(data)})
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
            .then((response) => {
              return response.json();
            })
            .then((data) => {setTrainers(data); console.log(data)})
            .catch((error) => {
              console.error("Fehler beim Fetchen: " + error);
            });
    }

    function loadTrainee(trainee: any){
      openDialog();
      setRole("USER_ROLE")
      setUsername(trainee.user.username);
      setTrainer(trainee.trainer.id);
      setTrainee(trainee)
    }

    function loadTrainer(trainer: any){
      openDialog();
      setRole("ADMIN_ROLE")
      setUsername(trainer.user.username);
    }

    function saveTrainee(){
      closeDialog();
      console.log("Trainee gespeichert")
      const updatedTrainee = {username: username, trainer: trainer}

      fetch("http://localhost:8080/api/trainees/"+trainee.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`
        },body: JSON.stringify(updatedTrainee)
      })
        .then(res => fetchTrainees())
        .catch((error) => {
          console.error("Fehler beim Fetchen: " + error);
        });
    }

    function deleteTrainee(traineeId: string){
      console.log("Trainee wird gelöscht: " + traineeId)
        
        fetch("http://localhost:8080/api/trainees/"+traineeId, {
            method: "DELETE",
            headers: {
              "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`
            }
          })
          .then(()=> fetchTrainees())
            .catch((error) => {
              console.error("Fehler beim Fetchen: " + error);
            });
      
    }

    function createUser(){
      closeNewUser()
    }

    return(
        <div className="body">
          <button onClick={openNewUser}>Neuen Benutzer erfassen</button>

            <dialog ref={dialogRef}>
              <div className="attribute">
                <label htmlFor="username">Benutzername</label>
                <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} />
              </div>
              
                <div className="attribute">
                    <label htmlFor="dropdown">Berufsbildner*in</label>
                    <select id="dropdown" value={trainer} onChange={e => setTrainer(e.target.value)}>
                      <option>Bitte wählen</option>
                      {
                      trainers?.map(trainerprov => <option key={trainerprov.id} value={trainerprov.id}>{trainerprov.user.username}</option>)
                      }
                    </select>
                  </div>
                <p></p>
              
              <div className="buttons">
                <button onClick={() => saveTrainee()}>speichern</button>
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
                  <option value={"ADMIN_ROLE"}>Berufsbildner</option>
                  <option value={"USER_ROLE"}>Lernende/r</option>
                </select>
              </div>
              {role === "USER_ROLE"
                ? <div className="attribute">
                    <label htmlFor="dropdown">Berufsbildner*in</label>
                    <select id="dropdown" value={trainer} onChange={e => setTrainer(e.target.value)}>
                      <option>Bitte wählen</option>
                      {
                      trainers?.map(trainerprov => <option key={trainerprov.id} value={trainerprov.id}>{trainerprov.user.username}</option>)
                      }
                    </select>
                  </div>
                :<p></p>
              }
              
                <div className="buttons">
                <button onClick={() => createUser()}>speichern</button>
                <button onClick={closeNewUser}>abbrechen</button>
              </div>
            </dialog>

            <div>
                {showTrainees
                  ?trainees?.map(trainee => <User key={trainee.id} loadUser={trainee => loadTrainee(trainee)} deleteUser={traineeId => deleteTrainee(traineeId)} user={trainee}></User>)
                  :trainers?.map(trainer => <User key={trainer.id} loadUser={trainer => loadTrainer(trainer)} deleteUser={trainerId => deleteTrainee(trainerId)} user={trainer}></User>)
                  
                }
                    
            </div>
        </div>

    )
}