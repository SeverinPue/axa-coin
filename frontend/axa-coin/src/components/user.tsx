'use client'

import React from "react"

type Props = {
    loadUser: Function,
    deleteUser: Function,
    user: any
}

export default function User (props: Props){
    return(
        <div>
            <button onClick={e => props.loadUser(props.user)}>bearbeiten</button>
            <button onClick={e => props.deleteUser(props.user.id)}>löschen</button>
            <p>{props.user.user.username}</p>

        </div>
    )
}