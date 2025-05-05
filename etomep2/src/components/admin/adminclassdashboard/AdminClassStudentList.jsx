import React, { useState } from "react";
import { IoArrowBack, IoClose } from "react-icons/io5";
import { AiOutlineSearch } from "react-icons/ai";
import "./adminclassstudentlist.css";
import AdminClassStudentView from "./AdminClassStudentView";
import studentDefault from "../../../assets/student.jpg"

const AdminClassStudentList = ({ onBack, onClose, students }) => {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [search, setSearch] = useState("");
    const allStudents = students || [];
    // Dummy data to mimic your screenshot

    const filtered = allStudents.filter(s =>
        s.student_name?.toLowerCase().includes(search.toLowerCase())
    );

    if (selectedStudent) {
        return (
            <AdminClassStudentView
                student={selectedStudent}
                onClose={() => setSelectedStudent(null)}
            />
        );
    }
    // <hr className="adminclassstudentlist-divider" />



    return (
        <div className="adminclassstudentlist-backdrop">
            {/* Header */}
            <div className="adminclassstudentlist-header">
                <div className="adminclassstudentlist-header-left">
                    <button
                        className="adminclassstudentlist-back-btn"
                        onClick={onBack}
                        aria-label="Back"
                    >
                        <IoArrowBack size={20} />
                    </button>
                    <h2 className="adminclassstudentlist-title">
                        Student List
                        <span className="adminclassstudentlist-count">{filtered.length}</span>
                    </h2>
                </div>

                {/* right side: close button */}
                <div className="adminclassstudentlist-header-right">
                    <button
                        className="adminclassstudentlist-close-btn"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <IoClose size={24} />
                    </button>
                </div>
            </div>
            <hr className="adminclassstudentlist-divider" />
            <div className="adminclassstudentlist-body">
                {/* Search */}
                <div className="adminclassstudentlist-search-container">
                    <AiOutlineSearch className="adminclassstudentlist-search-icon" />
                    <input
                        type="text"
                        className="adminclassstudentlist-search-input"
                        placeholder="Search by Student Name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        autoComplete="off"
                    />
                </div>
                {/* Grid of student cards */}
                <div className="adminclassstudentlist-grid-container">
                    {filtered.map(student => (
                        <div key={student.roll_no} className="adminclassstudentlist-card"
                            onClick={() => setSelectedStudent(student)}
                            style={{ cursor: "pointer" }}>
                            <img
                                src={student.image_url ? student.image_url : studentDefault}
                                alt={student.student_name}
                                className="adminclassstudentlist-avatar"
                            />
                            <div className="adminclassstudentlist-info">
                                <div className="adminclassstudentlist-name">
                                    {student.name}
                                </div>
                                <div className="adminclassstudentlist-info-classrollno">
                                    <span className="adminclassstudentlist-class">
                                        {student.student_name}
                                    </span>
                                    <span className="adminclassstudentlist-roll">
                                        Roll no: {student.roll_no}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminClassStudentList;