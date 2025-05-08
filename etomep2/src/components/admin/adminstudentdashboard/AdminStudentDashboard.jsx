import React, { useEffect, useState, } from 'react';
import './adminstudentdashboard.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import AdminStudentDashboardView from "./AdminStudentDashboardView";
import { RiSearchLine } from "react-icons/ri";
import studentDefault from '../../../assets/student.jpg'
import Select from 'react-select';


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
    const dashboardcustomStyles = {
        control: (base, state) => ({
            ...base,
            width: '300px',
            height: '40px',
            borderRadius: '8px',
            borderColor: state.isFocused ? '#86b7fe' : '#757575',
            boxShadow: state.isFocused ? '0 0 0 .25rem rgb(194, 218, 255)' : 0,
        }),

        dropdownIndicator: (base) => ({
            ...base,
            color: '#292D32',
            padding: '0 8px',
            alignItems: 'center',
            svg: {
                width: '24px',
                height: '24px',
            }
        }),

        indicatorSeparator: () => ({
            display: 'none'
        }),

        placeholder: (base) => ({
            ...base,
            color: '#526D82',
            fontSize: '16px'
        }),

        singleValue: (base) => ({
            ...base,
            color: '#526D82',
            fontSize: '16px'
        }),

        menu: (base) => ({
            ...base,
            zIndex: 1000,
            maxHeight: '200px',
            overflowY: 'auto',
            fontSize: '14px',
        }),

        option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? '#2162B2' : '#fff',
            color: state.isFocused ? '#fff' : '#222222',
            '&:active': {
                backgroundColor: '#e6e6e6',
            }
        }),
    };

    const handleChange = (selectedOption) => {
        setSelectedClass(selectedOption ? selectedOption.value : '');
    };

    return (
        <div className="adminstudentdashboard_main_container">
            <div className="adminstudentdashboard_main_header_container">
                <div>
                    <p className="adminstudentdashboard-title">
                        Total Student
                        <span className="adminstudentdashboard-count">{filteredStudents.length}</span>
                    </p>
                </div>
                <div className="adminstudentdashboard-header-controls d-flex justify-content-between align-items-center">
                    <div className="adminstudentdashboard-left-controls" >
                        <Select
                            value={classList.find((className) => className === selectedClass) ? { label: selectedClass, value: selectedClass } : null}
                            onChange={handleChange}
                            options={classList.map((className) => ({ label: className, value: className }))}
                            styles={dashboardcustomStyles}
                            placeholder="Select Class"
                        />
                    </div>
                    <div className="adminstudentdashboard-right-controls" >
                        {/* Search Student */}
                        <div className="adminstudentdashboard_search-input-container" >
                            <RiSearchLine className={`adminstudentdashboard_search-icon ${search ? 'hidden' : ''}`} />
                            <input
                                type="text"
                                className="form-control form-control-sm adminstudentdashboard_search-input"
                                placeholder="      Search Student"
                                value={search}

                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="adminstudentdashboard_classes_box">
                <div className="adminstudentdashboard_container">
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
