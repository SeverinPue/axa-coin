import React from "react"
import "./stylesheets/taskEdit.css"

type Props = {
    loadTask: Function,
    deleteTask: Function,
    task: any
}

export default function Task (props: Props){
    return(
        <div className="task">
            <p className="taskTitle">{props.task.title}</p>
            <div className="buttons">
                <button onClick={e => props.loadTask(props.task)} className="button">bearbeiten</button>
                <button onClick={e => props.deleteTask(props.task.id)} className="button">löschen</button>
            </div>
            
            

        </div>
    )
}