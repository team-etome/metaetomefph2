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


function NewTeacherSubjectSelect({ subject,onBack }) {
    // const [activeTab, setActiveTab] = useState("Assignments");
    const admininfo = useSelector((state) => state.admininfo);
    // const [activeSubject, setActiveSubject] = useState(null);
    console.log(admininfo, "admin info");
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [activeTab, setActiveTab] = useState(null);
    const handleTabSelect = (k) => {
        setActiveTab(prev => prev === k ? null : k);
    };


    const navigate = useNavigate();
    // const [activeTab, setActiveTab] = useState(() => {
    //     return localStorage.getItem("aarnaActiveTab") || " ";
    // });
    const dummyStudents = [
        {
            rollNo: 1,
            studentName: "Ananthu",
            classSection: subject.classSection,
            imageUrl: "https://i.pravatar.cc/100?img=32",
        },
        {
            rollNo: 2,
            studentName: "Arjun",
            classSection: subject.classSection,
            imageUrl: "https://i.pravatar.cc/100?img=12",
        },
        {
            rollNo: 3,
            studentName: "Priya",
            classSection: subject.classSection,
            imageUrl: "https://i.pravatar.cc/100?img=56",
        },
        {
            rollNo: 4,
            studentName: "Vikram",
            classSection: subject.classSection,
            imageUrl: "https://i.pravatar.cc/100?img=5",
        },
        {
            rollNo: 5,
            studentName: "Sneha",
            classSection: subject.classSection,
            imageUrl: "https://i.pravatar.cc/100?img=27",
        },
    ];

    useEffect(() => {
        localStorage.setItem("aarnaActiveTab", activeTab);
    }, [activeTab]);

    console.log(activeTab, "active tabbbbb");


    useEffect(() => {
        localStorage.setItem("activeTab", activeTab);
    }, [activeTab]);

    const handlenavigate = () => {
        navigate('/adminprofile', { state: { admininfo: admininfo.admininfo } });
    };

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
                                <p>science</p>
                            </div>
                        </Col>
                        <Col md={6} className="newteachersubjectselect_header_right_profilepic">
                            <div className="newteachersubjectselect_header_institution">
                                <div className="newteachersubjectselect_hd_title">
                                    <p style={{ color: "#222222", }}>
                                        {admininfo.admininfo?.email}
                                    </p>
                                </div>
                                <img
                                    onClick={handlenavigate}
                                    src={admininfo.admininfo?.logo}
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
                                    {dummyStudents.map((student) => (
                                        <div key={student.rollNo} className="newteachersubjectselect-card"
                                            onClick={() => setSelectedStudent(student)}
                                            style={{ cursor: "pointer" }}>
                                            <img
                                                // src={student.image_url ? student.image_url : studentDefault}  
                                                src={student.imageUrl}
                                                className="newteachersubjectselect-avatar"
                                            />
                                            <div className="newteachersubjectselect-info">
                                                <div className="newteachersubjectselect-name">
                                                    {student.studentName}
                                                </div>
                                                <div className="newteachersubjectselect-info-classrollno">
                                                    <span className="newteachersubjectselect-class">
                                                        {/* {student.class_name} {student.division} */}
                                                        Class {student.classSection}
                                                    </span>
                                                    <span className="newteachersubjectselect-roll">
                                                        Roll no: {student.rollNo}
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
                        {activeTab === "Assignments" && <NewTeacherAssignments />}
                        {activeTab === "Reference" && <NewTeacherReferenceList />}
                        {activeTab === "Mock Tests" && <NewTestListing />}
                        {activeTab === "MCQ" && <NewTeacherMcq/>}
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
