import React, { useState, useEffect } from "react";
import "./newstudentpromoteaccept.css";
import { RiSearchLine } from "react-icons/ri";
import image from "../../../assets/messi-ronaldo-1593920966.jpg"

export default function NewStudentPromoteAccept({ studentList = [] }) {
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [showSendBackModal, setShowSendBackModal] = useState(false);

    // Filter out blocked students
    const unblockedStudents = studentList.filter(student => !student.blocked);

    useEffect(() => {
        if (selectAll) {
            setSelected(unblockedStudents.map((s) => s.id || s.roll_no));
        } else {
            setSelected([]);
        }
    }, [selectAll, unblockedStudents]);

    const toggleStudent = (id) => {
        setSelected(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const filtered = unblockedStudents.filter((s) =>
        s.student_name?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            {/* Action Bar */}
            <div className="newstudentpromoteaccept-actions">
                {/* LEFT SIDE */}
                <div className="newstudentpromoteaccept-left">
                    <label>
                        <p className="newstudentpromoteaccept-actions-para">Accept All</p>
                        <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={(e) => setSelectAll(e.target.checked)}
                        />
                    </label>

                    <button
                        className="newstudentpromoteaccept-promote-btn"
                        disabled={!selected.length}
                    >
                        Accept
                    </button>

                    <button
                        className="newstudentpromoteaccept-sendback-btn"
                        disabled={!selected.length}
                        onClick={() => setShowSendBackModal(true)}
                    >
                        Send Back
                    </button>
                </div>

                {/* RIGHT SIDE */}
                <div className="newstudentpromoteaccept-search-wrapper">
                    <RiSearchLine className="icon" size={16} />
                    <input
                        type="text"
                        placeholder="Search Student"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>


            {/* Student Grid */}
            <div className="newstudentpromoteaccept-grid">
                {filtered.map((s) => (
                    <div
                        key={s.id || s.roll_no}
                        className={
                            "newstudentpromoteaccept-grid-card" +
                            (selected.includes(s.id || s.roll_no) ? " selected" : "")
                        }
                        onClick={() => toggleStudent(s.id || s.roll_no)}
                    >
                        <label>
                            {/* <input
                  type="checkbox"
                  checked={selected.includes(s.id || s.roll_no)}
                  onChange={() => toggleStudent(s.id || s.roll_no)}
                /> */}
                        </label>
                        <img src={s.image || image} alt={s.student_name} />
                        <div className="info">
                            <h4>{s.student_name}</h4>
                            <p>{s.class_name} {s.division}</p>
                        </div>
                        <span className="roll">Roll no : {s.roll_no}</span>
                    </div>
                ))}
            </div>

            {showSendBackModal && (
                <div className="promote-popup-overlay">
                    <div className="promote-popup-modal">
                        <div className="promote-popup-header">
                            <p className="promote-popup-title">Confirm Send Back</p>
                        </div>
                        <div className="promote-popup-body">
                            <p>
                                Are you sure you want to move the selected students back to their previously promoted class?
                            </p>
                        </div>
                        <div className="promote-popup-footer">
                            <button className="promote-popup-cancel" onClick={() => setShowSendBackModal(false)}>Cancel</button>
                            <button
                                className="promote-popup-save"
                                onClick={() => {
                                    setShowSendBackModal(false);
                                    // Ask user for confirmation before proceeding
                                    // No API call or success modal yet
                                }}
                            >Confirm</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Close */}
            {/* <button className="newstudentpromoteaccept-close" onClick={onClose}>
                    &times;
                </button> */}
        </div>
    );
}
