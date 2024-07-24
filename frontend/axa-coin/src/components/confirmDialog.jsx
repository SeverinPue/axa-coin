import React from "react";
import "./stylesheets/confirmDialog.css";


export default function ConfirmDialog(props) {
    if (!props.visible) {
        return null;
      }
  return (
    <div className="confirmation-dialog">
      <div className="confirmation-dialog-content">
        <p>{props.text}</p>
        <button className="newButton" onClick={props.onConfirm}>Ja</button>
        <button className="deleteButton" onClick={props.onCancel}>Nein</button>
      </div>
    </div>
  );
}
