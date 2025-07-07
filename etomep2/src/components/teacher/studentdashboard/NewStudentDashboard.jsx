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
import image from "../../../assets/messi-ronaldo-1593920966.jpg"
import exportimage from "../../../assets/export.png"
import NewStudentViewTimeTable from "./NewStudentViewTimeTable";
import axios from "axios";


const NewStudentDashboard = () => {
    const APIURL = useSelector((state) => state.APIURL.url);
    const teacher = useSelector((state) => state.teacherinfo);
    const teacher_id = teacher.teacherinfo?.teacher_id;
    const teacherInfo = useSelector((state) => state.teacherinfo.teacherinfo);
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [showPopupexcel, setShowPopupExcel] = useState(false); // For Excel Upload
    const [showMenu, setShowMenu] = useState(false); // Dropdown menu toggle
    const [showMenuexcel, setShowMenuExcel] = useState(false); // Not used visibly but safe to keep
    const [showPromote, setShowPromote] = useState(false);
    const [showAddTT, setShowAddTT] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [error, setError] = useState(false); // Track API failure
    const [studentlist, setStudentList] = useState([]);
    const [loading, setLoading] = useState(false); // Loading state for data refresh
    const [studentToEdit, setStudentToEdit] = useState(null);
    console.log(studentlist, "studentliststudentliststudentliststudentlist")

    const handlenavigate = () => {
        navigate("/teacherprofile");
    };

    // Wrapper function for refreshing student data with delay
    const refreshStudentData = () => {
        setTimeout(() => {
            fetchFacultyData();
        }, 500); // Small delay to show the success message first
    };

    const [allStudents, setAllStudents] = useState([]);
    const [showViewTT, setShowViewTT] = useState(false);


    console.log(allStudents, 'all students')
    // const dashboardcustomStyles = {
    //     control: (base, state) => ({
    //         ...base,
    //         width: '300px',
    //         height: '40px',
    //         borderRadius: '8px',
    //         borderColor: state.isFocused ? '#86b7fe' : '#757575',
    //         boxShadow: state.isFocused ? '0 0 0 .25rem rgb(194, 218, 255)' : 0,
    //     }),

    //     dropdownIndicator: (base) => ({
    //         ...base,
    //         color: '#292D32',
    //         padding: '0 8px',
    //         alignItems: 'center',
    //         svg: {
    //             width: '24px',
    //             height: '24px',
    //         }
    //     }),

    //     indicatorSeparator: () => ({
    //         display: 'none'
    //     }),

    //     placeholder: (base) => ({
    //         ...base,
    //         color: '#526D82',
    //         fontSize: '16px'
    //     }),

    //     singleValue: (base) => ({
    //         ...base,
    //         color: '#526D82',
    //         fontSize: '16px'
    //     }),

    //     menu: (base) => ({
    //         ...base,
    //         zIndex: 1000,
    //         maxHeight: '200px',
    //         overflowY: 'auto',
    //         fontSize: '14px',
    //     }),

    //     option: (base, state) => ({
    //         ...base,
    //         backgroundColor: state.isFocused ? '#2162B2' : '#fff',
    //         color: state.isFocused ? '#fff' : '#222222',
    //         '&:active': {
    //             backgroundColor: '#e6e6e6',
    //         }
    //     }),
    // };

    const fetchFacultyData = async () => {
        setError(false); // Reset error before fetching
        setLoading(true); // Start loading
        try {
            const response = await axios.get(`${APIURL}/api/addstudent/${teacher_id}`);
            if (response.data.length === 0) {
                setError(true);
            } else {
                setStudentList(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch faculty data:", error);
            setError(true); // Mark API failure
        } finally {
            setLoading(false); // End loading
        }
    };
    useEffect(() => {
        fetchFacultyData();
    }, [APIURL, teacher_id]);
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
    
    // Filter students based on promoted status and search
    const filteredStudents = studentlist.filter(student =>
        student.student_name?.toLowerCase().includes(search.toLowerCase()) &&
        !student.blocked && 
        !student.promoted // Only show students who are not promoted
    );

    // Get students for promotion (not promoted and not blocked)
    const studentsForPromotion = studentlist.filter(student => 
        !student.blocked && 
        !student.promoted
    );

    return (
        <div className="newStudent_dashboard">
            <Container className="newStudent_main_container" >
                <div className="newStudent_row_main">
                    <Row className="newStudent_row_header">
                        <Col md={6} className="newStudent_header_left_heading">
                            <div className="newStudent_title">
                                <p>Class 10 A</p>
                            </div>
                        </Col>
                        <Col md={6} className="newStudent_header_right_profilepic">
                            {/* <div className="newStudent_header_institution"> */}
                                <div className="newStudent-userinfo">
                                    <span className="newStudent-email">{teacherInfo?.email || " "}</span>
                                    <span className="newStudent-avatar-profile">
                                        <img
                                            onClick={handlenavigate}
                                            src={teacherInfo?.image || " "}
                                            alt="Profile"
                                            style={{
                                                width: "42px",
                                                height: "42px",
                                                borderRadius: "50%",
                                                marginRight: "24px",
                                                cursor: "pointer",
                                            }}
                                        />
                                    </span>
                                </div>
                            {/* </div> */}
                        </Col>
                    </Row>
                </div>
                <div className="newStudent_dashboard_container">
                    <div className="newStudent_main_bodycontainer">
                        <div
                            className="newStudent_main_header_container"
                        // style={{ border: "2px solid green" }}
                        >
                            {/*** First Row: "Total Students (40)" on the left — Search + View Time Table + +Add on the right ***/}
                            <div className="newStudent-header-row d-flex justify-content-between align-items-center">
                                {/* ── Left: Total Students + count bubble */}
                                <div className="newStudent-header-left d-flex align-items-center">
                                    <p className="newStudent-title">
                                        Total Students
                                        <span className="newStudent-count">{filteredStudents.length}</span>
                                    </p>
                                </div>

                                <div className="newStudent-header-right d-flex align-items-center">
                                    <div className="newStudent-search-wrapper">
                                        <RiSearchLine className={`newStudent_search-icon ${search ? 'hidden' : ''}`} />
                                        <input
                                            type="text"
                                            className="form-control form-control-sm newStudent_search-input"
                                            placeholder=" Search Student"
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
                                    <div className="newStudentdashboard_dropdown-menu">
                                        <div className="newStudentdashboard_dropdown-item" onClick={handleAddStudent}>
                                            <span style={{ fontSize: "24px" }}>+</span>  &nbsp;&nbsp;Add Student
                                        </div>
                                        <div className="newStudentdashboard_dropdown-item" onClick={handleUploadExcel}>
                                            <img src={exportimage}
                                                alt="exportimage"
                                                className="newStudentdashboard-dropdown-item-icon"
                                            />Upload Through Excel
                                        </div>
                                        <div className="newStudentdashboard_dropdown-item"
                                            onClick={() => { setShowAddTT(true); setShowMenu(false); }}>
                                            <span style={{ fontSize: "24px" }}>+</span>  &nbsp;&nbsp;Add Time Table
                                        </div>
                                    </div>
                                )}
                                {showPopup && (
                                    <NewStudentAdd
                                        isOpen={showPopup}
                                        onClose={() => { setShowPopup(false); setStudentToEdit(null); }}
                                        onStudentAdded={refreshStudentData}
                                        studentToEdit={studentToEdit}
                                    />
                                )}
                                {showPopupexcel && <NewStudentAddThroughExcel isOpen={showPopupexcel} onClose={() => setShowPopupExcel(false)} onStudentAdded={refreshStudentData} />}
                                {showAddTT && (
                                    <NewStudentAddTimeTable
                                        isOpen={showAddTT}
                                        onClose={() => setShowAddTT(false)}
                                    />
                                )}
                            </div>

                            {/*** Second Row: "Promote Options" button aligned left ***/}
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
                                    studentList={studentlist}
                                />
                            )}
                        </div>

                        <div className="newStudent_classes_box">
                            <div className="newStudent_container">
                                {loading ? (
                                    <div className="newStudent-loading">
                                        <div className="newStudent-loading-spinner"></div>
                                        <p>Refreshing student list...</p>
                                    </div>
                                ) : (
                                    <>
                                    <div className="newStudent-grid-container">
                                        {filteredStudents.length > 0 ? (
                                            filteredStudents.map(student => (
                                                <div key={student.roll_no} className="newStudent-card"
                                                    onClick={() => setSelectedStudent(student)}
                                                    style={{ cursor: "pointer" }}>
                                                    <img
                                                        src={student.image ? student.image : image}
                                                        className="newStudent-avatar"
                                                    />
                                                    <div className="newStudent-info">
                                                        <div className="newStudent-name">
                                                            {student.student_name}
                                                        </div>
                                                        <div className="newStudent-info-classrollno">
                                                            <span className="newStudent-class">
                                                                {student.standard} {student.division}
                                                            </span>
                                                            <span className="newStudent-roll">
                                                                Roll no: {student.roll_no}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="no-students-found">
                                                <p>No students found</p>
                                            </div>
                                        )}

                                        {selectedStudent && (
                                            <NewMyClassStudentView
                                                student={selectedStudent}
                                                onClose={() => setSelectedStudent(null)}
                                                onEdit={(student) => {
                                                    setStudentToEdit(student);
                                                    setShowPopup(true);
                                                    setSelectedStudent(null);
                                                }}
                                                onStatusChange={fetchFacultyData}
                                            />
                                        )}
                                    </div>

                                    {/* Blocked Students Section */}
                                    <div className="blocked-students-section">
                                        <div className="blocked-students-header d-flex align-items-center">
                                            <p className="newStudent-title">
                                                Blocked Students
                                                <span className="newStudent-count">{studentlist.filter(student => student.blocked).length}</span>
                                            </p>
                                        </div>
                                        <div className="newStudent-grid-container">
                                            {studentlist.filter(student => student.blocked).length > 0 ? (
                                                studentlist.filter(student => student.blocked).map(student => (
                                                    <div key={student.roll_no} className="newStudent-card"
                                                        onClick={() => setSelectedStudent(student)}
                                                        style={{ cursor: "pointer" }}>
                                                        <img
                                                            src={student.image ? student.image : image}
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
                                                ))
                                            ) : (
                                                <div className="no-students-found">
                                                    <p>No blocked students</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div >
                </div>
            </Container>
        </div>
    );
}

export default NewStudentDashboard;
