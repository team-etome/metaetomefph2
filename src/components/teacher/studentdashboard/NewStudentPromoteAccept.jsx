import React, { useState, useEffect } from "react";
import "./newstudentpromoteaccept.css";
import { RiSearchLine } from "react-icons/ri";
import image from "../../../assets/messi-ronaldo-1593920966.jpg"

const dummyStudents = [
    { id: 1, name: "Ananthu", class: "Class 1 A", roll: 1, avatar: "https://via.placeholder.com/70?text=A" },
    { id: 2, name: "Arjun", class: "Class 1 A", roll: 2, avatar: "https://via.placeholder.com/70?text=Ar" },
    { id: 3, name: "Priya", class: "Class 1 A", roll: 3, avatar: "https://via.placeholder.com/70?text=P" },
    { id: 4, name: "Vikram", class: "Class 1 A", roll: 4, avatar: "https://via.placeholder.com/70?text=V" },
    { id: 5, name: "Sneha", class: "Class 1 A", roll: 5, avatar: "https://via.placeholder.com/70?text=S" },
      { id: 6, name: "Ravi",    class: "Class 1 A", roll: 6, avatar: "https://via.placeholder.com/70?text=R" },
      { id: 7, name: "Ananthu", class: "Class 1 A", roll: 1, avatar: "https://via.placeholder.com/70?text=A" },
      { id: 8, name: "Arjun",   class: "Class 1 A", roll: 2, avatar: "https://via.placeholder.com/70?text=Ar" },
      { id: 9, name: "Priya",   class: "Class 1 A", roll: 3, avatar: "https://via.placeholder.com/70?text=P" },
      { id: 10, name: "Vikram",  class: "Class 1 A", roll: 4, avatar: "https://via.placeholder.com/70?text=V" },
      { id: 11, name: "Sneha",   class: "Class 1 A", roll: 5, avatar: "https://via.placeholder.com/70?text=S" },
      { id: 12, name: "Ravi",    class: "Class 1 A", roll: 6, avatar: "https://via.placeholder.com/70?text=R" },

];

export default function NewStudentPromoteAccept({ isOpen, onClose }) {
    const [activeTab, setActiveTab] = useState("promote");
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        if (selectAll) {
            setSelected(dummyStudents.map((s) => s.id));
        } else {
            setSelected([]);
        }
    }, [selectAll]);


    const toggleStudent = (id) => {
        setSelected(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };


    const filtered = dummyStudents.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
            <div>
                {/* Action Bar */}
                <div className="newstudentpromoteaccept-actions">
                    <label>
                        <p className="newstudentpromoteaccept-actions-para">Ankit All</p>
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
                        Promote
                    </button>

                    {/* Search at right */}
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
                            className={
                                "newstudentpromoteaccept-grid-card" +
                                (selected.includes(s.id) ? " selected" : "")
                            }
                            onClick={() => toggleStudent(s.id)}
                        >
                            <label>
                                {/* <input
                  type="checkbox"
                  checked={selected.includes(s.id)}
                  onChange={() => toggleStudent(s.id)}
                /> */}
                            </label>
                            <img src={image} alt={s.name} />
                            <div className="info">
                                <h4>{s.name}</h4>
                                <p>{s.class}</p>
                            </div>
                            <span className="roll">Roll no : {s.roll}</span>
                        </div>
                    ))}
                </div>

                {/* Close */}
                {/* <button className="newstudentpromoteaccept-close" onClick={onClose}>
                    &times;
                </button> */}
            </div>
    );
}
