import React, { useState } from "react";
import "./newstudentviewtimetable.css";
import NewStudentSetTime from "./NewStudentSetTime";

export default function NewStudentViewTimeTable({ isOpen, onClose }) {
    const [days, setDays] = useState("");
    const [periods, setPeriods] = useState("");
    const [timeModal, setTimeModal] = useState(false);

    if (!isOpen) return null;

    const D = Math.min(Math.max(+days, 0), 6);
    const P = Math.max(+periods, 0);

    const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const colors = [
        "#FFDFDF", // Mon
        "#DFFFEF", // Tue
        "#DFE1FF", // Wed
        "#FDDFFF", // Thu
        "#EBFFDF", 
        "#DFFCFF",
    ];

    return (
        <div className="newstudentviewtimetable-overlay">
            <div
                className="newstudentviewtimetable-modal"
                style={{ "--cols": D, "--rows": P, }}
            >
                {/* Header */}
                <div className="nsttview-header">
                    <h3>Add Time Table</h3>
                    <button className="nsttview-close" onClick={onClose}>×</button>
                </div>

                {/* Inputs */}
                <div className="nsttview-inputs">
                    <input
                        type="number" min="1" max="7"
                        placeholder="Number of Days"
                        value={days}
                        onChange={e => setDays(e.target.value)}
                    />
                    <input
                        type="number" min="1"
                        placeholder="Number of Periods"
                        value={periods}
                        onChange={e => setPeriods(e.target.value)}
                    />
                </div>
                {D > 0  && (
                    <>
                        <div className="nsttview-grid-header">
                            <div className="nsttview-cell nsttview-cell-header nsttview-col-periods" >Periods</div>
                            {dayNames.slice(0, D).map((day, i) => (
                                <div
                                    key={day}
                                    className="nsttview-cell nsttview-cell-header"
                                    style={{ background: colors[i] }}
                                >
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* ── Scrollable body ── */}
                        <div className="nsttview-body">
                            {Array.from({ length: P }).map((_, pi) => (
                                <React.Fragment key={pi}>
                                    <div className="nsttview-cell nsttview-row-header">{pi + 1}</div>
                                    {Array.from({ length: D }).map((_, di) => (
                                        <div
                                            key={di}
                                            className="nsttview-cell"
                                            style={{ background: colors[di] }}
                                        >
                                            <button className="nsttview-btn" onClick={() => setTimeModal(true)}>Set Time</button>
                                            <button className="nsttview-btn">Select Subject</button>
                                        </div>
                                    ))}
                                </React.Fragment>
                            ))}
                            {timeModal && (
                                <NewStudentSetTime
                                    isOpen={timeModal}
                                    onClose={() => setTimeModal(false)}
                                    onSave={({ start, end }) => {
                                        console.log("Saved times:", start, end);
                                        setTimeModal(false);
                                    }}
                                />
                            )}
                        </div>
                    </>)}

                {/* Footer */}
                <div className="nsttview-footer">
                    <button className="nsttview-delete" onClick={() => { setDays(""); setPeriods(""); }}>
                        Delete
                    </button>
                    <button className="nsttview-edit" disabled={!(D && P)}>
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
}
