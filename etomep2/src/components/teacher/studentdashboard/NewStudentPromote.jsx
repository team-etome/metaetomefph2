// NewStudentPromote.js
import React, { useState } from "react";
// import PromoteStudents from "./PromoteStudents";
// import AcceptPromotions from "./AcceptPromotions";
import "./newstudentpromote.css";
import NewStudentPromoteSelect from "./NewStudentPromoteSelect";
import NewStudentPromoteAccept from "./NewStudentPromoteAccept";

export default function NewStudentPromote({ isOpen, onClose, studentList, refreshStudentList }) {
  const [activeTab, setActiveTab] = useState("promote");

  if (!isOpen) return null;
  
  // Filter students based on promoted status
  const studentsForPromotion = studentList.filter(student => 
    !student.blocked && 
    !student.promoted // Students who can be promoted
  );
  
  const studentsForAcceptance = studentList.filter(student => 
    !student.blocked && 
    student.promoted // Students who have been promoted and need acceptance
  );

  return (
    <div className="newstudentpromote-overlay" >
      <div className="newstudentpromote-modal">
        {/* ─── Tabs ─── */}
        <div className="newstudentpromote-tabs">
          <button
            className={activeTab === "promote" ? "active" : ""}
            onClick={() => setActiveTab("promote")}
          >
            Promote Students
          </button>
          <button
            className={activeTab === "accept" ? "active" : ""}
            onClick={() => setActiveTab("accept")}
          >
            Accept Promotions
          </button>
        </div>

        {/* ─── Content (swapped based on activeTab) ─── */}
        <div className="newstudentpromote-content">
          {activeTab === "promote" && <NewStudentPromoteSelect studentList={studentsForPromotion} fetchStudentList={refreshStudentList} onClose={onClose} />}
          {activeTab === "accept" && <NewStudentPromoteAccept studentList={studentsForAcceptance} fetchStudentList={refreshStudentList} onClose={onClose} />}
        </div>

        {/* ─── Close Button ─── */}
        <button className="newstudentpromote-close" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
}
