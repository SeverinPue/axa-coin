'use client'

import React, { useEffect, useRef, useState } from "react"
import User from "../components/user.tsx";

export default function EditUser (){
    const dialogRef = useRef(null);
    const [username, setUsername] = useState<string>("");
    const [trainer, setTrainer] = useState<string>("");
    const [trainers, setTrainers] = useState<Array<any>>();
    const [trainees, setTrainees] = useState<Array<any>>();
    const [trainee, setTrainee] = useState<any>();

    const openDialog = () => {
      dialogRef.current.showModal();
    };
  
    const closeDialog = () => {
      dialogRef.current.close();
    };

    useEffect(() => {
        fetchTrainees();

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
      setUsername(trainee.user.username);
      setTrainer(trainee.trainer.id);
      setTrainee(trainee)
      fetchTrainers();
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

    return(
        <div>
            <dialog ref={dialogRef}>
              <label htmlFor="username">Benutzername</label>
              <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} />

              <label htmlFor="dropdown">Berufsbildner*in</label>
              <select id="dropdown" value={trainer} onChange={e => setTrainer(e.target.value)}>
                  <option>Bitte wählen</option>
                  {
                      trainers?.map(trainerprov => <option key={trainerprov.id} value={trainerprov.id}>{trainerprov.user.username}</option>)
                  }
              </select>
              <button onClick={() => saveTrainee()}>speichern</button>
              <button onClick={closeDialog}>abbrechen</button>
            </dialog>
            <div>
                {trainees &&
                  trainees.map(trainee => <User key={trainee.id} loadUser={trainee => loadTrainee(trainee)} deleteUser={traineeId => deleteTrainee(traineeId)} user={trainee}></User>)
                }
                    
            </div>
        </div>

    )
}

function setError(arg0: string) {
  throw new Error("Function not implemented.");
}
