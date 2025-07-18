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
import { BsSearch } from "react-icons/bs";
import "./newteachersubjectselect.css";
import { IoArrowBack } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NewSubjectSelectView from "./NewSubjectSelectView";
import NewTeacherAssignments from "./NewTeacherAssignments";
import NewTeacherReferenceList from "../teacherreference/NewTeacherReferenceList";
import NewTeacherResult from "../teacherresultview/NewTeacherResult";
import NewTestListing from "../teachertestlist/NewTestListing";
import NewTeacherMcq from "../teachermcq/NewTeacherMcq";


function NewTeacherSubjectSelect({ subject, onBack }) {
    // const [activeTab, setActiveTab] = useState("Assignments");
    const APIURL = useSelector((state) => state.APIURL.url);
    const teacher = useSelector((state) => state.teacherinfo);
    const teacher_id = teacher.teacherinfo?.teacher_id;
    const teacherInfo = useSelector((state) => state.teacherinfo.teacherinfo);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [activeTab, setActiveTab] = useState(null);
    const handleTabSelect = (k) => {
        setActiveTab(prev => prev === k ? null : k);
    };
    console.log(subject, "subjectsubjectsubject seleeeeee")


    const navigate = useNavigate();
    const handlenavigate = () => {
        navigate("/teacherprofile");
    };
    // const [activeTab, setActiveTab] = useState(() => {
    //     return localStorage.getItem("aarnaActiveTab") || " ";
    // });
    const students = subject.students || [];

    useEffect(() => {
        localStorage.setItem("aarnaActiveTab", activeTab);
    }, [activeTab]);

    console.log(activeTab, "active tabbbbb");


    useEffect(() => {
        localStorage.setItem("activeTab", activeTab);
    }, [activeTab]);

    return (
        <div className="newteachersubjectselect_dashboard">
            <Container className="newteachersubjectselect_main_container" >
                <div className="newteachersubjectselect_row_main">
                    <Row className="newteachersubjectselect_row_header">
                        <Col md={6} className="newteachersubjectselect_header_left_heading">
                            <div className="newteachersubjectselect_title">
                                <button className="newteachersubjectselect_back-btn" onClick={onBack}>
                                    <IoArrowBack size={24} />
                                </button>
                                <p>{subject.class}{subject.division} {subject.subject}</p>
                            </div>
                        </Col>
                        <Col md={6} className="newteachersubjectselect_header_right_profilepic">
                            <div className="newteachersubjectselect_header_institution">
                                <div className="newteachersubjectselect_hd_title">
                                    <p style={{ color: "#222222", }}>
                                        {teacherInfo?.email || " "}
                                    </p>
                                </div>
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
                            </div>
                        </Col>
                    </Row>
                    <Row className="newteachersubjectselect_navbar_row">
                        <Col md={12} className="newteachersubjectselect_header_bottom">
                            <Nav
                                variant="underline"
                                activeKey={activeTab}
                                onSelect={handleTabSelect}
                                className="newteachersubjectselect_dashboard_tab"
                            >
                                {["Assignments", "Reference", "Mock Tests", "MCQ", "Result"].map(label => (
                                    <Nav.Item key={label}>
                                        <Nav.Link
                                            href="#"
                                            eventKey={label}
                                            className="newteachersubjectselect_mob_subhead_one">
                                            {label}
                                        </Nav.Link>
                                    </Nav.Item>
                                ))}
                            </Nav>
                        </Col>
                    </Row>
                </div>
                {activeTab === null ? (
                    <div className="newteachersubjectselect_dashboard_container">
                        <div className="newteachersubjectselect_main_container">
                            <div className="newteachersubjectselect_main_header_container">
                                <div>
                                    <p className="newteachersubjectselect-title">
                                        Students List
                                    </p>
                                </div>
                            </div>
                            <div className="newteachersubjectselect_classes_box">
                                <div className="newteachersubjectselect-grid-container">
                                    {students.map((student) => (
                                        <div key={student.id || student.rollNo} className="newteachersubjectselect-card"
                                            onClick={() => setSelectedStudent(student)}
                                            style={{ cursor: "pointer" }}>
                                            <img
                                                src={student.imageUrl || student.image || "https://i.pravatar.cc/100?img=32"}
                                                className="newteachersubjectselect-avatar"
                                            />
                                            <div className="newteachersubjectselect-info">
                                                <div className="newteachersubjectselect-name">
                                                    {student.studentName || student.student_name}
                                                </div>
                                                <div className="newteachersubjectselect-info-classrollno">
                                                    <span className="newteachersubjectselect-class">
                                                        Class {student.standard || student.class}
                                                    </span>
                                                    <span className="newteachersubjectselect-roll">
                                                        Roll no: {student.rollNo || student.roll_no}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {selectedStudent && (
                                <NewSubjectSelectView
                                    student={selectedStudent}
                                    onClose={() => setSelectedStudent(null)}
                                />
                            )}
                        </div >
                    </div>

                ) : (
                    <div className="newteachersubjectselect_dashboard_container">
                        {activeTab === "Assignments" && <NewTeacherAssignments
                            class_name={subject.class}
                            division={subject.division}
                            subject={subject.subject}
                        />}
                        {activeTab === "Reference" && <NewTeacherReferenceList
                            class_name={subject.class}
                            division={subject.division}
                            subject={subject.subject}
                        />}
                        {activeTab === "Mock Tests" && <NewTestListing
                            class_name={subject.class}
                            division={subject.division}
                            subject={subject.subject}
                        />}
                        {activeTab === "MCQ" && <NewTeacherMcq
                            class_name={subject.class}
                            division={subject.division}
                            subject={subject.subject} />}
                        {activeTab === "Result" && <NewTeacherResult />}


                        {/* {activeTab === "Mock Tests" && <NewTeacherAssignments />}
                        {activeTab === "MCQ" && <NewTeacherAssignments />}
                        {activeTab === "Result" && <NewTeacherAssignments />} */}
                    </div>
                )}


            </Container>
        </div>
    );
}

export default NewTeacherSubjectSelect;
