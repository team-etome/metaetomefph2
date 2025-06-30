import React, { useState, useEffect } from "react";
import "./newstudentpromoteselect.css";
import { RiSearchLine } from "react-icons/ri";
import image from "../../../assets/messi-ronaldo-1593920966.jpg"

export default function NewStudentPromoteSelect({ studentList = [] }) {
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    console.log(studentList,"studentListstudentList")
    

    useEffect(() => {
        if (selectAll) {
            setSelected(studentList.map((s) => s.student_id || s.roll_no));
        } else {
            setSelected([]);
        }
    }, [selectAll, studentList]);

    const toggleStudent = (id) => {
        setSelected(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const filtered = studentList.filter((s) =>
        s.student_name?.toLowerCase().includes(search.toLowerCase())
    );

    return (
            <div>
                {/* Action Bar */}
                <div className="newstudentpromoteselect-actions">
                    <label>
                        <p className="newstudentpromoteselect-actions-para">Select All</p>
                        <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={(e) => setSelectAll(e.target.checked)}
                        />
                        
                    </label>
                    <button
                        className="newstudentpromoteselect-promote-btn"
                        disabled={!selected.length}
                    >
                        Promote
                    </button>

                    {/* Search at right */}
                    <div className="newstudentpromoteselect-search-wrapper">
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
                <div className="newstudentpromoteselect-grid">
                    {filtered.map((s) => (
                        <div
                            key={s.student_id || s.roll_no}
                            className={
                                "newstudentpromoteselect-grid-card" +
                                (selected.includes(s.student_id || s.roll_no) ? " selected" : "")
                            }
                            onClick={() => toggleStudent(s.student_id || s.roll_no)}
                        >
                            <label>
                                {/* <input
                  type="checkbox"
                  checked={selected.includes(s.student_id || s.roll_no)}
                  onChange={() => toggleStudent(s.student_id || s.roll_no)}
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

                {/* Close */}
                {/* <button className="newstudentpromoteselect-close" onClick={onClose}>
                    &times;
                </button> */}
            </div>
    );
}
