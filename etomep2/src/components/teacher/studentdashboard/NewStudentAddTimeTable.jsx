import React, { useState } from "react";
import "./newstudentaddtimetable.css";
import NewStudentSetTime from "./NewStudentSetTime";

export default function NewStudentAddTimeTable({ isOpen, onClose }) {
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
        <div className="newstudentaddtimetable-overlay">
            <div
                className="newstudentaddtimetable-modal"
                style={{ "--cols": D, "--rows": P, }}
            >
                {/* Header */}
                <div className="nstt-header">
                    <h3>Add Time Table</h3>
                    <button className="nstt-close" onClick={onClose}>×</button>
                </div>

                {/* Inputs */}
                <div className="nstt-inputs">
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
                        <div className="nstt-grid-header">
                            <div className="nstt-cell nstt-cell-header nstt-col-periods" >Periods</div>
                            {dayNames.slice(0, D).map((day, i) => (
                                <div
                                    key={day}
                                    className="nstt-cell nstt-cell-header"
                                    style={{ background: colors[i] }}
                                >
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* ── Scrollable body ── */}
                        <div className="nstt-body">
                            {Array.from({ length: P }).map((_, pi) => (
                                <React.Fragment key={pi}>
                                    <div className="nstt-cell nstt-row-header">{pi + 1}</div>
                                    {Array.from({ length: D }).map((_, di) => (
                                        <div
                                            key={di}
                                            className="nstt-cell"
                                            style={{ background: colors[di] }}
                                        >
                                            <button className="nstt-btn" onClick={() => setTimeModal(true)}>Set Time</button>
                                            <button className="nstt-btn">Select Subject</button>
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
                <div className="nstt-footer">
                    <button className="nstt-clear" onClick={() => { setDays(""); setPeriods(""); }}>
                        Clear
                    </button>
                    <button className="nstt-save" disabled={!(D && P)}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
