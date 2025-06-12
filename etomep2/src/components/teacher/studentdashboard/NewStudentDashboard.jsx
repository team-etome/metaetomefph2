import React, { useState, useEffect } from "react";
import {
    Col,
    Container,
    Row,
    Nav,
    InputGroup,
    FormControl,
    Dropdown,
} from "react-bootstrap";
// import "./newnewStudentdashboard.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";
import "./newstudentdashboard.css"
import NewStudentAdd from "./NewStudentAdd";
import NewStudentAddThroughExcel from "./NewStudentAddThroughExcel";
import NewStudentPromote from "./NewStudentPromote";
import NewStudentAddTimeTable from "./NewStudentAddTimeTable";
import NewMyClassStudentView from "./NewMyClassStudentView";
import image from "../../../assets/messi-ronaldo-1593920966.jpg";
import exportimage from "../../../assets/export.png"
import NewStudentViewTimeTable from "./NewStudentViewTimeTable";


const NewStudentDashboard = () => {
    const admininfo = useSelector((state) => state.admininfo);
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [showPopupexcel, setShowPopupExcel] = useState(false); // For Excel Upload
    const [showMenu, setShowMenu] = useState(false); // Dropdown menu toggle
    const [showMenuexcel, setShowMenuExcel] = useState(false); // Not used visibly but safe to keep
    const [showPromote, setShowPromote] = useState(false);
    const [showAddTT, setShowAddTT] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const handlenavigate = () => {
        navigate('/adminprofile', { state: { admininfo: admininfo.admininfo } });
    };

    const [allStudents, setAllStudents] = useState([]);
    const [showViewTT, setShowViewTT] = useState(false);


    console.log(allStudents, 'all students')
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
    const dummyStudents = [
        { student_name: "Ananthu", class_name: "Class 7 A", roll_no: 1, image_url: "https://via.placeholder.com/70?text=A" },
        { student_name: "Arjun", class_name: "Class 7 A", roll_no: 2, image_url: "https://via.placeholder.com/70?text=Ar" },
        { student_name: "Priya", class_name: "Class 7 A", roll_no: 3, image_url: "https://via.placeholder.com/70?text=P" },
        { student_name: "Vikram", class_name: "Class 7 A", roll_no: 4, image_url: "https://via.placeholder.com/70?text=V" },
        { student_name: "Sneha", class_name: "Class 7 A", roll_no: 5, image_url: "https://via.placeholder.com/70?text=S" },
        { student_name: "Ravi", class_name: "Class 7 A", roll_no: 6, image_url: "https://via.placeholder.com/70?text=R" },
        { student_name: "Neha", class_name: "Class 7 A", roll_no: 7, image_url: "https://via.placeholder.com/70?text=N" },
        { student_name: "Karan", class_name: "Class 7 A", roll_no: 8, image_url: "https://via.placeholder.com/70?text=K" },
        { student_name: "Aditi", class_name: "Class 7 A", roll_no: 9, image_url: "https://via.placeholder.com/70?text=Ad" },
        { student_name: "Siddharth", class_name: "Class 7 A", roll_no: 10, image_url: "https://via.placeholder.com/70?text=Si" },
        { student_name: "Meera", class_name: "Class 7 A", roll_no: 11, image_url: "https://via.placeholder.com/70?text=Me" },
        { student_name: "Rahul", class_name: "Class 7 A", roll_no: 12, image_url: "https://via.placeholder.com/70?text=Ra" },
        { student_name: "Ananthu", class_name: "Class 7 A", roll_no: 1, image_url: "https://via.placeholder.com/70?text=A" },
        { student_name: "Arjun", class_name: "Class 7 A", roll_no: 2, image_url: "https://via.placeholder.com/70?text=Ar" },
        { student_name: "Priya", class_name: "Class 7 A", roll_no: 3, image_url: "https://via.placeholder.com/70?text=P" },
        { student_name: "Vikram", class_name: "Class 7 A", roll_no: 4, image_url: "https://via.placeholder.com/70?text=V" },
        { student_name: "Sneha", class_name: "Class 7 A", roll_no: 5, image_url: "https://via.placeholder.com/70?text=S" },
        { student_name: "Ravi", class_name: "Class 7 A", roll_no: 6, image_url: "https://via.placeholder.com/70?text=R" },
        { student_name: "Neha", class_name: "Class 7 A", roll_no: 7, image_url: "https://via.placeholder.com/70?text=N" },
        { student_name: "Karan", class_name: "Class 7 A", roll_no: 8, image_url: "https://via.placeholder.com/70?text=K" },
        { student_name: "Aditi", class_name: "Class 7 A", roll_no: 9, image_url: "https://via.placeholder.com/70?text=Ad" },
        { student_name: "Siddharth", class_name: "Class 7 A", roll_no: 10, image_url: "https://via.placeholder.com/70?text=Si" },
        { student_name: "Meera", class_name: "Class 7 A", roll_no: 11, image_url: "https://via.placeholder.com/70?text=Me" },
        { student_name: "Rahul", class_name: "Class 7 A", roll_no: 12, image_url: "https://via.placeholder.com/70?text=Ra" },
    ];
    const toggleMenu = () => {
        setShowMenu((prev) => !prev);
    };
    const handleAddStudent = () => {
        setShowMenu(false);
        setShowPopup(true);
    };
    const handleUploadExcel = () => {
        setShowMenuExcel(false);
        setShowPopupExcel(true);
    };

    return (
        <div className="newStudent_dashboard">
            <Container className="newStudent_main_container" >
                <div className="newStudent_row_main">
                    <Row className="newStudent_row_header">
                        <Col md={6} className="newStudent_header_left_heading">
                            <div className="newStudent_title">
                                <p>Class 7 A</p>
                            </div>
                        </Col>
                        <Col md={6} className="newStudent_header_right_profilepic">
                            <div className="newStudent_header_institution">
                                <div className="newteachersubject_hd_title">
                                    <p style={{ color: "#222222", }}>
                                        {/* {admininfo.admininfo?.email} */}
                                    </p>
                                </div>
                                <img
                                    // onClick={handlenavigate}
                                    // src={admininfo.admininfo?.logo}
                                    alt="Profile"
                                    style={{
                                        width: "42px",
                                        height: "42px",
                                        borderRadius: "50%",
                                        marginRight: "24px",
                                        cursor: "pointer",
                                    }}
                                />
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="newStudent_dashboard_container">
                    <div className="newStudent_main_bodycontainer">
                        <div
                            className="newStudent_main_header_container"
                        // style={{ border: "2px solid green" }}
                        >
                            {/*** First Row: “Total Students (40)” on the left — Search + View Time Table + +Add on the right ***/}
                            <div className="newStudent-header-row d-flex justify-content-between align-items-center">
                                {/* ── Left: Total Students + count bubble */}
                                <div className="newStudent-header-left d-flex align-items-center">
                                    <p className="newStudent-title">
                                        Total Students
                                        <span className="newStudent-count">40</span>
                                    </p>
                                </div>

                                <div className="newStudent-header-right d-flex align-items-center">
                                    <div className="newStudent-search-wrapper">
                                        <RiSearchLine className={`newStudent_search-icon ${search ? 'hidden' : ''}`} />
                                        <input
                                            type="text"
                                            className="form-control form-control-sm newStudent_search-input"
                                            placeholder="      Search Student"
                                            value={search}

                                            onChange={(e) => setSearch(e.target.value)}
                                        />

                                    </div>
                                    <button type="button" className="newStudent-viewtable-button " onClick={() => setShowViewTT(true)}>
                                        View Time Table
                                    </button>
                                    <button type="button"
                                        className="newStudent-addbutton"
                                        onClick={toggleMenu}
                                    >
                                        + Add
                                    </button>

                                </div>
                                {showViewTT && (
                                    <NewStudentViewTimeTable
                                        isOpen={showViewTT}
                                        onClose={() => setShowViewTT(false)}
                                    />
                                )}
                                {showMenu && (
                                    <div className="newStudentdashboard_dropdown-menu" style={{border:"2px solid red"}}>
                                        <div className="newStudentdashboard_dropdown-item" onClick={handleAddStudent}>
                                            <span style={{fontSize:"24px"}}>+</span>  &nbsp;&nbsp;Add Student
                                        </div>
                                        <div className="newStudentdashboard_dropdown-item" onClick={handleUploadExcel}>
                                            <img src={exportimage} 
                                            alt="exportimage"
                                            className="newStudentdashboard-dropdown-item-icon"
                                            />Upload Through Excel
                                        </div>
                                        <div className="newStudentdashboard_dropdown-item"
                                            onClick={() => { setShowAddTT(true); setShowMenu(false); }}>
                                            <span style={{fontSize:"24px"}}>+</span>  &nbsp;&nbsp;Add Time Table
                                        </div>
                                    </div>
                                )}
                                {showPopup && (
                                    <NewStudentAdd
                                        isOpen={showPopup}
                                        onClose={() => setShowPopup(false)}
                                    // onStudentAdded={fetchstudent}
                                    />
                                )}
                                {showPopupexcel && <NewStudentAddThroughExcel isOpen={showPopupexcel} onClose={() => setShowPopupExcel(false)} />}
                                {showAddTT && (
                                    <NewStudentAddTimeTable
                                        isOpen={showAddTT}
                                        onClose={() => setShowAddTT(false)}
                                    />
                                )}
                            </div>

                            {/*** Second Row: “Promote Options” button aligned left ***/}
                            <div className="newStudent-promote-row">
                                <button type="button" className="newStudent-promote-button"
                                    onClick={() => setShowPromote(true)}>
                                    Promote Options
                                </button>
                            </div>
                            {showPromote && (
                                <NewStudentPromote
                                    isOpen={showPromote}
                                    onClose={() => setShowPromote(false)}
                                // you could pass selectedStudentIDs or other props here
                                />
                            )}
                        </div>

                        <div className="newStudent_classes_box">
                            <div className="newStudent_container">
                                <div className="newStudent-grid-container">
                                    {dummyStudents.map(student => (
                                        <div key={student.roll_no} className="newStudent-card"
                                            onClick={() => setSelectedStudent(student)}
                                            style={{ cursor: "pointer" }}>
                                            <img
                                                src={student.image_url ? image : student.image_url}
                                                className="newStudent-avatar"
                                            />
                                            <div className="newStudent-info">
                                                <div className="newStudent-name">
                                                    {student.student_name}
                                                </div>
                                                <div className="newStudent-info-classrollno">
                                                    <span className="newStudent-class">
                                                        {student.class_name} {student.division}
                                                    </span>
                                                    <span className="newStudent-roll">
                                                        Roll no: {student.roll_no}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}


                                    {selectedStudent && (
                                        <NewMyClassStudentView
                                            student={selectedStudent}
                                            onClose={() => setSelectedStudent(null)}
                                        />
                                    )}

                                </div>
                            </div>
                        </div>
                    </div >
                </div>
            </Container>
        </div>
    );
}

export default NewStudentDashboard;
