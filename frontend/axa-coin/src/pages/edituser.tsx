'use client'

import React, { useEffect, useRef, useState } from "react"
import User from "../components/user.tsx";

export default function EditUser (){
    const dialogRef = useRef(null);
    const [username, setUsername] = useState<string>("");
    const [trainer, setTrainer] = useState<string>("");
    const [trainers, setTrainers] = useState<Array<any>>();
    const [trainees, setTrainees] = useState<Array<any>>();

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
      fetchTrainers();
    }

    function saveTrainee(trainee){
      closeDialog();
      console.log("Trainee gespeichert")
      const updatedTrainee = {id: trainee.id, username: username, trainerId: trainer, userId: trainee.user.id}

      fetch("http://localhost:8080/api/trainees", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`
        },body: JSON.stringify(updatedTrainee)
      })
        .then((response) => {
          if (!response.ok) {
            setError("Fehler");
          }
          return response.json();
        })
        .then((data) => {
          sessionStorage.setItem("jwt", data.token);
          sessionStorage.setItem("id", data.id);
        })
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
