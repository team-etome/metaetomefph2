import React, { useState } from "react";
import { IoArrowBack, IoClose } from "react-icons/io5";
import { AiOutlineSearch } from "react-icons/ai";
import "./adminclassstudentlist.css";
import AdminClassStudentView from "./AdminClassStudentView";
import avtar from "../../../assets/avatar.jpg"

const AdminClassStudentList = ({ onBack, onClose }) => {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [search, setSearch] = useState("");
    // Dummy data to mimic your screenshot
    const allStudents = [
        { name: "Ananthu", className: "Class 1 A", rollNo: 1, avatarUrl: "https://randomuser.me/api/portraits/men/65.jpg" },
        { name: "Arjun", className: "Class 1 A", rollNo: 2, avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg" },
        { name: "Priya", className: "Class 1 A", rollNo: 3, avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg" },
        { name: "Vikram", className: "Class 1 A", rollNo: 4, avatarUrl: "https://randomuser.me/api/portraits/men/12.jpg" },
        { name: "Sneha", className: "Class 1 A", rollNo: 5, avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg" },
        { name: "Ravi", className: "Class 1 A", rollNo: 6, avatarUrl: "https://randomuser.me/api/portraits/men/24.jpg" },
        { name: "Neha", className: "Class 1 A", rollNo: 7, avatarUrl: "https://randomuser.me/api/portraits/women/50.jpg" },
        { name: "Karan", className: "Class 1 A", rollNo: 8, avatarUrl: "https://randomuser.me/api/portraits/men/77.jpg" },
        { name: "Aditi", className: "Class 1 A", rollNo: 9, avatarUrl: "https://randomuser.me/api/portraits/men/16.jpg" },
        { name: "Siddharth", className: "Class 1 A", rollNo: 10, avatarUrl: "https://randomuser.me/api/portraits/men/58.jpg" },
        { name: "Meera", className: "Class 1 A", rollNo: 11, avatarUrl: "https://randomuser.me/api/portraits/women/28.jpg" },
        { name: "Rahul", className: "Class 1 A", rollNo: 12, avatarUrl: "https://randomuser.me/api/portraits/men/73.jpg" },
        { name: "Ananthu", className: "Class 1 A", rollNo: 1, avatarUrl: "https://randomuser.me/api/portraits/men/65.jpg" },
        { name: "Arjun", className: "Class 1 A", rollNo: 2, avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg" },
        { name: "Priya", className: "Class 1 A", rollNo: 3, avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg" },
        { name: "Vikram", className: "Class 1 A", rollNo: 4, avatarUrl: "https://randomuser.me/api/portraits/men/12.jpg" },
        { name: "Sneha", className: "Class 1 A", rollNo: 5, avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg" },
        { name: "Ravi", className: "Class 1 A", rollNo: 6, avatarUrl: "https://randomuser.me/api/portraits/men/24.jpg" },
        { name: "Neha", className: "Class 1 A", rollNo: 7, avatarUrl: "https://randomuser.me/api/portraits/women/50.jpg" },
        { name: "Karan", className: "Class 1 A", rollNo: 8, avatarUrl: "https://randomuser.me/api/portraits/men/77.jpg" },
        { name: "Aditi", className: "Class 1 A", rollNo: 9, avatarUrl: "https://randomuser.me/api/portraits/men/16.jpg" },
        { name: "Siddharth", className: "Class 1 A", rollNo: 10, avatarUrl: "https://randomuser.me/api/portraits/men/58.jpg" },
        { name: "Meera", className: "Class 1 A", rollNo: 11, avatarUrl: "https://randomuser.me/api/portraits/women/28.jpg" },
        { name: "Rahul", className: "Class 1 A", rollNo: 12, avatarUrl: "https://randomuser.me/api/portraits/men/73.jpg" },
        { name: "Ananthu", className: "Class 1 A", rollNo: 1, avatarUrl: "https://randomuser.me/api/portraits/men/65.jpg" },
        { name: "Arjun", className: "Class 1 A", rollNo: 2, avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg" },
        { name: "Priya", className: "Class 1 A", rollNo: 3, avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg" },
        { name: "Vikram", className: "Class 1 A", rollNo: 4, avatarUrl: "https://randomuser.me/api/portraits/men/12.jpg" },
        { name: "Sneha", className: "Class 1 A", rollNo: 5, avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg" },
        { name: "Ravi", className: "Class 1 A", rollNo: 6, avatarUrl: "https://randomuser.me/api/portraits/men/24.jpg" },
        { name: "Neha", className: "Class 1 A", rollNo: 7, avatarUrl: "https://randomuser.me/api/portraits/women/50.jpg" },
        { name: "Karan", className: "Class 1 A", rollNo: 8, avatarUrl: "https://randomuser.me/api/portraits/men/77.jpg" },
        { name: "Aditi", className: "Class 1 A", rollNo: 9, avatarUrl: "https://randomuser.me/api/portraits/men/16.jpg" },
        { name: "Siddharth", className: "Class 1 A", rollNo: 10, avatarUrl: "https://randomuser.me/api/portraits/men/58.jpg" },
        { name: "Meera", className: "Class 1 A", rollNo: 11, avatarUrl: "https://randomuser.me/api/portraits/women/28.jpg" },
        { name: "Rahul", className: "Class 1 A", rollNo: 12, avatarUrl: "https://randomuser.me/api/portraits/men/73.jpg" },
    ];
    const filtered = allStudents.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase())
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
                        placeholder="Search Student"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                {/* Grid of student cards */}
                <div className="adminclassstudentlist-grid-container">
                    {filtered.map(student => (
                        <div key={student.rollNo} className="adminclassstudentlist-card"
                            onClick={() => setSelectedStudent(student)}
                            style={{ cursor: "pointer" }}>
                            <img
                                src={student.avatarUrl}
                                alt={avtar}
                                className="adminclassstudentlist-avatar"
                            />
                            <div className="adminclassstudentlist-info">
                                <div className="adminclassstudentlist-name">
                                    {student.name}
                                </div>
                                <div className="adminclassstudentlist-info-classrollno">
                                    <span className="adminclassstudentlist-class">
                                        {student.className}
                                    </span>
                                    <span className="adminclassstudentlist-roll">
                                        Roll no: {student.rollNo}
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