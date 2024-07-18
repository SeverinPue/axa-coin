import React from "react";
import "./stylesheets/submission.css";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { MdOutlineDoDisturbAlt } from "react-icons/md";


export default function CustomSubmission({title, trainee, handleApprove, handleReject }) {
  const handleApproveLocal = () => {
    handleApprove();
  }
  const handleRejectLocal = () => {
    handleReject();
  }


  return (
    <div className="bar">
      <div className="toplevel">
          <div className="desc">
            <h3 className="submissionTitle">{title}</h3>
            <h4 className="username">{trainee}</h4>
          </div>
          <div className="actions">
          <IoCheckmarkCircleOutline onClick={handleApproveLocal} className="approve" size={"50px"}/>
          <MdOutlineDoDisturbAlt onClick={handleRejectLocal} className="reject" size={"50px"}/>
          </div>
      </div>
      
    </div>
  );
}
