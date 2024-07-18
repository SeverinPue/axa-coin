'use client'

import React, { useEffect, useState } from "react"
import User from "../components/user.tsx";

export default function EditUser (){
    const [username, setUsername] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [trainer, setTrainer] = useState<string>();
    const [trainers, setTrainers] = useState<Array<any>>();
    const [trainees, setTrainees] = useState<Array<any>>();

    useEffect(() => {
        fetchTrainees();

    }, [])

    const fetchTrainees = () => {

        fetch("http://localhost:8080/api/trainee", {
            headers: {
              "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`,
            },
          })
            .then((response) => {
              return response.json();
            })
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

    function loadTrainee(user: any){
        setUsername(user.username);
        setEmail(user.setEmail);
        setTrainer(user.trainer);
        fetchTrainers();
    }

    function deleteTrainee(traineeId: string){
        /*
        fetch("http://localhost:8080/api/auth/authenticate/", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            }
          })
            .then((response) => {
              if (!response.ok) {
                setError("Falsches Password oder Benuzername!");
              }
              return response.json();
            })
            .then((data) => {
              sessionStorage.setItem("jwt", data.token);
              sessionStorage.setItem("id", data.id);
            })
            .catch((error) => {
              console.error("Fehler beim Fetchen: " + error);
            });*/
    }

    return(
        <div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" value={email} onChange={e => setEmail(e.target.value)} />

                <label htmlFor="dropdown">Berufsbildner*in</label>
                <select id="dropdown" value={trainer} onChange={e => setTrainer(e.target.value)}>
                    <option>Bitte wählen</option>
                    {
                        trainers?.map(trainerprov => <option value={trainerprov.id}>{trainerprov.user.username}</option>)
                    }
                </select>
            </div>
            <div>
                {
                    trainees?.map(trainee => <User key={trainee.id} loadUser={loadTrainee} deleteUser={deleteTrainee} user={trainee.user}></User>)
                }
            </div>
        </div>
    )
}