import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { IoChevronBackSharp } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import studentPlaceholder from "../../../assets/Avatar.png"; // or your own image
import "./teacherclassstudentview.css";
import { RiGraduationCapLine } from "react-icons/ri";

function TeacherClassStudentView() {
    const [showEditBlockButtons, setShowEditBlockButtons] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const navigate = useNavigate();
    const location = useLocation();
    const dropdownRef = useRef(null);

    // Student data from route state
    const { student } = location.state || {};
    console.log(student, "studentdartttt")

    // Fallback if no student is provided
    const studentData = student || {
        student_name: "No Name",
        // dob: "",
        gender: "",
        // email: "",
        // address: "",
        // fathers_name: "",
        // mothers_name: "",
        // guardian: "",
        // number: "",
        standard: "",
        admission_no: "",
        roll_no: "",
        category: "",
        joining_date: "",
    };

    // Handle “Back” button
    const handleBackClick = () => {
        navigate(-1);
    };

    // Show or hide the vertical dot dropdown (on small screens)
    const toggleEditBlockButtons = (e) => {
        e.preventDefault();
        setShowEditBlockButtons((prev) => !prev);
    };

    // Close modal
    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Open “View Progress” modal (or navigate to another page)
    const handleViewProgress = () => {
        setShowModal(true);
    };

    // Track window resize to show/hide Edit button or vertical dots
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);

        // Close the dropdown if clicked outside
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowEditBlockButtons(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("resize", handleResize);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div>
            <Container className="teacher_student_view_container">
                <form className="teacher_student_view_form" style={{ border: '1px solid #526D82' }}>
                    {/* Header with shadow */}
                    <div className="teacher_student_header">
                        {/* Back Arrow */}
                        <IoChevronBackSharp
                            onClick={handleBackClick}
                            className="teacher_student_view_back"
                        />
                        {/* Student Name in the Center */}
                        <h1 className="teaher_student_view_title">
                            {studentData.student_name}
                        </h1>

                        {/* Spacer */}
                        <div style={{ flex: "1" }}></div>

                        {/* Edit button on larger screens, vertical dot on small screens */}
                        {/* {windowWidth > 800 ? (
                            <div style={{ display: "flex", gap: "20px", paddingRight: "30px" }}>
                                <button className="teacher_student_edit">Edit</button>
                            </div>
                        ) : (
                            <div style={{ position: "relative" }} ref={dropdownRef}>
                                <button
                                    className="teacher_student_verticaldot"
                                    onClick={toggleEditBlockButtons}
                                >
                                    <BsThreeDotsVertical />
                                </button>
                                {showEditBlockButtons && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            right: 0,
                                            backgroundColor: "white",
                                            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                                            borderRadius: "5px",
                                            padding: "10px",
                                            zIndex: 1000,
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "10px",
                                        }}
                                    >
                                        <FiEdit className="teacher_student_edit" />
                                    </div>
                                )}
                            </div>
                        )} */}
                    </div>

                    {/* Scrollable content */}
                    <div className="teacher_student_scrollable">
                        <Row>
                            <Col md={8}>
                                {/* Personal Information */}
                                <Row className="teacher_personal_info">
                                    <div className="teacher_student_title">
                                        <h4>Personal Information</h4>
                                    </div>

                                    {/* Left Column */}
                                    <Col md={6}>
                                        <div className="teacher_personal_info_field">
                                            <label>Name</label>
                                            <input
                                                type="text"
                                                value={studentData.student_name}
                                                readOnly
                                                style={{ color: "#68B670", fontWeight: "600" }}
                                            />
                                        </div>
                                    </Col>

                                    {/* Middle Column */}
                                    <Col md={6}>
                                        <div className="teacher_personal_info_field">
                                            <label>Gender</label>
                                            <input type="text" value={studentData.gender} readOnly />
                                        </div>
                                    </Col>
                                </Row>
                                {/* School Information */}
                                <Row className="teacher_student_heading">
                                    <div className="teacher_student_title">
                                        <h4>School Information</h4>
                                    </div>

                                    <Col md={6}>
                                        <div className="teacher_school_info">
                                            <label>Standard</label>
                                            <input type="text" value={studentData.standard} readOnly />
                                        </div>

                                        <div className="teacher_school_info">
                                            <label>Roll No</label>
                                            <input type="text" value={studentData.roll_no} readOnly />
                                        </div>
                                        <div className="teacher_school_info">
                                            <label>Joining Date</label>
                                            <input type="text" value={studentData.joining_date} readOnly />
                                        </div>
                                    </Col>
                                    <Col md={6}>

                                        <div className="teacher_school_info">
                                            <label>Admission Number</label>
                                            <input type="text" value={studentData.admission_no} readOnly />
                                        </div>
                                        {/* Only show Category if data is present */}
                                        {studentData.category && studentData.category.trim() !== "" && (
                                            <div className="teacher_school_info">
                                                <label>Category</label>
                                                <input type="text" value={studentData.category} readOnly />
                                            </div>
                                        )}
                                    </Col>
                                </Row>
                                {/* “View Progress” (or “Results”) Button */}
                                <Row>
                                    <Col md={12}>
                                        <button className="view-progress-btn" onClick={handleViewProgress}>
                                            <RiGraduationCapLine />    View Progress
                                        </button>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={4} >
                                <div className="teacher_personal_info_image">
                                    <img
                                        src={studentData.image || studentPlaceholder}
                                        alt="Student"
                                        className="teacher_profile_picture"
                                    />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </form>
            </Container>

            {/* Example Modal for “View Progress” */}
            <Modal show={showModal} onHide={handleCloseModal} centered size="xl">
                <Modal.Header closeButton style={{ border: "none", paddingBottom: "0px" }}>
                    {/* Could have a title if desired */}
                </Modal.Header>
                <Modal.Body style={{ paddingTop: "0px" }}>
                    <div className="teacher_result_view_scrollable">
                        <h4>Student Progress / Results Here</h4>
                        {/* Example Table or other content */}
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Term</th>
                                    <th>Subject 1</th>
                                    <th>Subject 2</th>
                                    <th>Subject 3</th>
                                    <th>...</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Term 1</td>
                                    <td>90</td>
                                    <td>85</td>
                                    <td>88</td>
                                    <td>...</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default TeacherClassStudentView;
