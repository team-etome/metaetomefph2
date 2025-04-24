import React, { useEffect, useState, } from 'react';
import './adminstudentdashboard.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import AdminStudentDashboardView from "./AdminStudentDashboardView";
import { RiSearchLine } from "react-icons/ri";


const AdminStudentDashboard = () => {
    const APIURL = useSelector((state) => state.APIURL.url);
    const admin_id = useSelector((state) => state.admininfo.admininfo?.admin_id);
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);

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
        { name: "Ananthu", className: "Class 1 A", rollNo: 13, avatarUrl: "https://randomuser.me/api/portraits/men/65.jpg" },
        { name: "Arjun", className: "Class 1 A", rollNo: 14, avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg" },
        { name: "Priya", className: "Class 1 A", rollNo: 15, avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg" },
        { name: "Vikram", className: "Class 1 A", rollNo: 16, avatarUrl: "https://randomuser.me/api/portraits/men/12.jpg" },
        { name: "Sneha", className: "Class 1 A", rollNo: 17, avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg" },
        { name: "Ravi", className: "Class 1 A", rollNo: 18, avatarUrl: "https://randomuser.me/api/portraits/men/24.jpg" },
        { name: "Neha", className: "Class 1 A", rollNo: 19, avatarUrl: "https://randomuser.me/api/portraits/women/50.jpg" },
        { name: "Karan", className: "Class 1 A", rollNo: 20, avatarUrl: "https://randomuser.me/api/portraits/men/77.jpg" },
        { name: "Aditi", className: "Class 1 A", rollNo: 21, avatarUrl: "https://randomuser.me/api/portraits/men/16.jpg" },
        { name: "Siddharth", className: "Class 1 A", rollNo: 22, avatarUrl: "https://randomuser.me/api/portraits/men/58.jpg" },
        { name: "Meera", className: "Class 1 A", rollNo: 23, avatarUrl: "https://randomuser.me/api/portraits/women/28.jpg" },
        { name: "Rahul", className: "Class 1 A", rollNo: 24, avatarUrl: "https://randomuser.me/api/portraits/men/73.jpg" },
        { name: "Ananthu", className: "Class 1 A", rollNo: 25, avatarUrl: "https://randomuser.me/api/portraits/men/65.jpg" },
        { name: "Arjun", className: "Class 1 A", rollNo: 26, avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg" },
        { name: "Priya", className: "Class 1 A", rollNo: 27, avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg" },
        { name: "Vikram", className: "Class 1 A", rollNo: 28, avatarUrl: "https://randomuser.me/api/portraits/men/12.jpg" },
        { name: "Sneha", className: "Class 1 A", rollNo: 29, avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg" },
        { name: "Ravi", className: "Class 1 A", rollNo: 30, avatarUrl: "https://randomuser.me/api/portraits/men/24.jpg" },
        { name: "Neha", className: "Class 1 A", rollNo: 31, avatarUrl: "https://randomuser.me/api/portraits/women/50.jpg" },
        { name: "Karan", className: "Class 1 A", rollNo: 32, avatarUrl: "https://randomuser.me/api/portraits/men/77.jpg" },
        { name: "Aditi", className: "Class 1 A", rollNo: 33, avatarUrl: "https://randomuser.me/api/portraits/men/16.jpg" },
        { name: "Siddharth", className: "Class 1 A", rollNo: 34, avatarUrl: "https://randomuser.me/api/portraits/men/58.jpg" },
        { name: "Meera", className: "Class 1 A", rollNo: 35, avatarUrl: "https://randomuser.me/api/portraits/women/28.jpg" },
        { name: "Rahul", className: "Class 1 A", rollNo: 36, avatarUrl: "https://randomuser.me/api/portraits/men/73.jpg" },
    ];

    // Filtered students based on search input
    const filteredStudents = allStudents.filter((student) =>
        student.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="adminstudentdashboard_main_container">
            <div className="adminstudentdashboard_main_header_container">
                <div>
                    <h2 className="adminstudentdashboard-title">
                        Total Student
                        <span className="adminstudentdashboard-count">{filteredStudents.length}</span>
                    </h2>
                </div>
                <div className="header-controls d-flex justify-content-between align-items-center px-3 py-2">
                    <div className="left-controls" >
                        <select
                            className="form-select form-select-sm adminstudentdashboard_select_class"
                        >
                            <option value="">Select Class</option>
                        </select>
                    </div>
                    <div className="right-controls">
                        {/* Search Student */}
                        <div className="adminstudentdashboard_search-input-container">
                            <RiSearchLine className={`adminstudentdashboard_search-icon ${search ? 'hidden' : ''}`} />
                            <input
                                type="text"
                                className="adminstudentdashboard_search-input"
                                placeholder="      Search Student"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="adminstudentdashboard_classes_box">
                <div className="adminstudentdashboard_container" >
                    <div className="adminstudentdashboard-grid-container">
                        {filteredStudents.map(student => (
                            <div key={student.rollNo} className="adminstudentdashboard-card"
                                onClick={() => setSelectedStudent(student)}
                                style={{ cursor: "pointer" }}>
                                <img
                                    src={student.avatarUrl}
                                    alt={student.name}
                                    className="adminstudentdashboard-avatar"
                                />
                                <div className="adminstudentdashboard-info">
                                    <div className="adminstudentdashboard-name">
                                        {student.name}
                                    </div>
                                    <div className="adminstudentdashboard-info-classrollno">
                                        <span className="adminstudentdashboard-class">
                                            {student.className}
                                        </span>
                                        <span className="adminstudentdashboard-roll">
                                            Roll no: {student.rollNo}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {selectedStudent && (
                <AdminStudentDashboardView
                    student={selectedStudent}
                    onClose={() => setSelectedStudent(null)} // Close the view modal
                />
            )}
        </div >
    );
};

export default AdminStudentDashboard;
