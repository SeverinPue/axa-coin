'use client'

import React, { useEffect, useState } from "react"

export default function EditUser (){
    const [username, setUsername] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [trainer, setTrainer] = useState<string>();
    const [trainers, setTrainers] = useState<Array<any>>();

    useEffect(() => {

    }, [])


    return(
        <div>
            <div>
                <label htmlFor="username">Benutzername</label>
                <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} />
                <label htmlFor="email">Email</label>
                <input type="text" id="email" value={email} onChange={e => setEmail(e.target.value)} />

                <label htmlFor="dropdown">Berufsbildner*in</label>
                <select id="dropdown" value={trainer} onChange={e => setTrainer(e.target.value)}>
                    <option value={""}>Bitte wählen</option>
                    {
                        trainers?.map(trainerprov => <option value={trainerprov.id}>{trainerprov.username}</option>)
                    }
                </select>
            </div>
            <div>

            </div>
        
        
        </div>
    )
}