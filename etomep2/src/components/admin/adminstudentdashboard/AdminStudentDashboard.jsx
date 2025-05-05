import React, { useEffect, useState, } from 'react';
import './adminstudentdashboard.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import AdminStudentDashboardView from "./AdminStudentDashboardView";
import { RiSearchLine } from "react-icons/ri";
import studentDefault from '../../../assets/student.jpg'


const AdminStudentDashboard = () => {
    const APIURL = useSelector((state) => state.APIURL.url);
    const admin_id = useSelector((state) => state.admininfo.admininfo?.admin_id);
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [allStudents, setAllStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedClass, setSelectedClass] = useState('');
    const [classList, setClassList] = useState([]);


    console.log(allStudents, 'all students')


    // Filtered students based on search input
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get(`${APIURL}/api/studentlist/${admin_id}`);
                console.log(response.data, "Fetched student list");

                const students = response.data.students;
                setAllStudents(students);

                // 🎯 Extract unique Class + Division combinations
                const classes = [...new Set(
                    students.map(s => `${s.class_name} ${s.division}`)
                )].sort((a, b) => {
                    const numA = parseInt(a.match(/\d+/)) || 0;
                    const numB = parseInt(b.match(/\d+/)) || 0;
                    return numA - numB;
                });

                setClassList(classes);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };

        if (admin_id) {
            fetchStudents();
        }
    }, [admin_id, APIURL]);

    // 🎯 Filter students based on Search and Class selection
    const filteredStudents = allStudents.filter(student => {
        const matchName = student.student_name?.toLowerCase().includes(search.toLowerCase());
        const matchClass = selectedClass ? `${student.class_name} ${student.division}` === selectedClass : true;
        return matchName && matchClass;
    });

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
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                        >
                            <option value="">Select Class</option>
                            {classList.map((className, index) => (
                                <option key={index} value={className}>
                                    {className}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="adminstudentdashboard-right-controls" >
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
                                    src={student.image_url ? student.image_url : studentDefault}  // ✅ Check if image_url exists
                                    className="adminstudentdashboard-avatar"
                                />
                                <div className="adminstudentdashboard-info">
                                    <div className="adminstudentdashboard-name">
                                        {student.student_name}
                                    </div>
                                    <div className="adminstudentdashboard-info-classrollno">
                                        <span className="adminstudentdashboard-class">
                                            {student.class_name} {student.division}
                                        </span>
                                        <span className="adminstudentdashboard-roll">
                                            Roll no: {student.roll_no}
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
