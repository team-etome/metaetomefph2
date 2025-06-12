// NewStudentPromote.js
import React, { useState } from "react";
// import PromoteStudents from "./PromoteStudents";
// import AcceptPromotions from "./AcceptPromotions";
import "./newstudentpromote.css";
import NewStudentPromoteSelect from "./NewStudentPromoteSelect";
import NewStudentPromoteAccept from "./NewStudentPromoteAccept";

export default function NewStudentPromote({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("promote");

  if (!isOpen) return null;

  return (
    <div className="newstudentpromote-overlay">
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
          {activeTab === "promote" && <NewStudentPromoteSelect />}
          {activeTab === "accept" && <NewStudentPromoteAccept />}
        </div>

        {/* ─── Close Button ─── */}
        <button className="newstudentpromote-close" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
}
