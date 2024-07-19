'use client'

import React from "react"
import "./stylesheets/user.css"

type Props = {
    loadUser: Function,
    deleteUser: Function,
    user: any
}

export default function User (props: Props){
    return(
        <div className="user">
            <p>{props.user.user.username}</p>
            <div className="buttons">
                <button onClick={e => props.loadUser(props.user)} className="button">bearbeiten</button>
                <button onClick={e => props.deleteUser(props.user.id)} className="button">löschen</button>
            </div>
            
            

        </div>
    )
}