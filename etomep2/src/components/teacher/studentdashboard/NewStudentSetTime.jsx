// src/components/NewStudentSetTime.jsx
import React, { useState } from "react";
import "./newstudentsettime.css";
import { IoClose, IoTimeOutline } from "react-icons/io5";
import dimage from "../../../assets/Frame 1000008387.png"

export default function NewStudentSetTime({ isOpen, onClose, onSave }) {
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    if (!isOpen) return null;
    return (
        <div className="newstudentsettime-overlay">
            <div className="newstudentsettime-modal">
                {/* Header */}
                <div className="newstudentsettime-header">
                    {/* Centered icon + title */}
                    <div className="newstudentsettime-header-center">
                        <img src={dimage} alt="clock" className="newstudentsettime-icon" />
                        <p className="newstudentsettime-title">Set Time</p>
                    </div>
                </div>

                {/* Body */}
                <div className="newstudentsettime-body">
                    <label className="nststv-label">Start Time</label>
                    <div className="nststv-input-wrapper">
                        <input
                            type="time"
                            className="nststv-input"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                        />
                    </div>

                    <label className="nststv-label">End Time</label>
                    <div className="nststv-input-wrapper">
                        <input
                            type="time"
                            className="nststv-input"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="newstudentsettime-footer">
                    <button className="nststv-cancel" onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        className="nststv-save"
                        disabled={!startTime || !endTime}
                        onClick={() => onSave({ start: startTime, end: endTime })}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
