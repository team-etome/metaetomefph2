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
import "./newteachersubject.css";
import { useSelector } from "react-redux";
import NewTeacherSubjectSelect from "./NewTeacherSubjectSelect";
import { IoArrowBack } from "react-icons/io5";

const NewTeacherSubject= () => {
    const admininfo = useSelector((state) => state.admininfo);
    console.log(admininfo, "admin info");
    const dummySubjects = [
        { classSection: "1A", subject: "Science", strength: 56 },
        { classSection: "2A", subject: "Science", strength: 66 },
        { classSection: "3A", subject: "Science", strength: 50 },
        { classSection: "4A", subject: "Science", strength: 48 },
        { classSection: "5A", subject: "Science", strength: 72 },
        { classSection: "6A", subject: "Science", strength: 61 },
        { classSection: "7A", subject: "Science", strength: 59 },
        { classSection: "8A", subject: "Science", strength: 63 },
    ];
    const [activeSubject, setActiveSubject] = useState(null);

    // handler to leave detail view
    const handleBack = () => setActiveSubject(null);



    return (
        <div className="newteachersubject_dashboard">
            <Container className="newteachersubject_main_container">
                {activeSubject === null ? (
                    <>
                <div className="newteachersubject_row_main">
                    <Row className="newteachersubject_row_header">
                        <Col md={6} className="newteachersubject_header_left_heading">
                            <div className="newteachersubject_title">
                                <p>{activeSubject ? `${activeSubject.classSection} ${activeSubject.subject}` : "Subjects"}</p>
                            </div>
                        </Col>
                        <Col md={6} className="newteachersubject_header_right_profilepic">
                            <div className="newteachersubject_header_institution">
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
                <div className="newteachersubject_dashboard_container">
                    <div className="newteachersubject-card-grid">
                        {dummySubjects.map((s, i) => (
                            <div key={i} className="newteachersubject-card"
                            onClick={() => setActiveSubject(s)}>
                                <div className="newteachersubject-card-header" >
                                    <div className="newteachersubject-card-circle">
                                        {s.classSection}
                                    </div>
                                    <div className="newteachersubject-card-title">
                                        {s.subject}
                                    </div>
                                </div>
                                <div className="newteachersubject-card-strength">
                                    Strength: {s.strength}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                </>
                ) : (
                    // pass your subject into the detail component
                    <NewTeacherSubjectSelect
                        subject={activeSubject}
                        onBack={handleBack}
                    />
                )}
            </Container>
        </div>
    );
}

export default NewTeacherSubject;
