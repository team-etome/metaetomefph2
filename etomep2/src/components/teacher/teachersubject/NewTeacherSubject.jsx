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
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewTeacherSubject = () => {
    const admininfo = useSelector((state) => state.admininfo);
    console.log(admininfo, "admin info");
    const [subjects, setSubjects] = useState([]);
    // const APIURL = useSelector(state => state.APIURL.url);
    const teacherinfo = useSelector((state) => state.teacherinfo);
    // const teacher_id = teacherinfo.teacherinfo?.teacher_id
    console.log(subjects, "subjectssubjects")
    const [activeSubject, setActiveSubject] = useState(null);

    // handler to leave detail view
    const handleBack = () => setActiveSubject(null);

    const APIURL = useSelector((state) => state.APIURL.url);
    const teacher = useSelector((state) => state.teacherinfo);
    const teacher_id = teacher.teacherinfo?.teacher_id;
    const teacherInfo = useSelector((state) => state.teacherinfo.teacherinfo);


    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await axios.get(`${APIURL}/api/subject_list/${teacher_id}`);
                setSubjects(response.data);
            } catch (error) {
                console.error('Failed to fetch subjects:', error);
            }
        };

        if (teacher_id) {
            fetchSubjects();
        }
    }, [APIURL, teacher_id]);


    const navigate = useNavigate();
    const handlenavigate = () => {
        navigate("/teacherprofile");
    };


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
                        </div>
                        <div className="newteachersubject_dashboard_container">
                            <div className="newteachersubject-card-grid">
                                {subjects.map((s, i) => (
                                    <div key={i} className="newteachersubject-card"
                                        onClick={() => setActiveSubject(s)}>
                                        <div className="newteachersubject-card-header" >
                                            <div className="newteachersubject-card-circle">
                                                {s.class} {s.division}
                                            </div>
                                            <div className="newteachersubject-card-title">
                                                {s.subject}
                                            </div>
                                        </div>
                                        <div className="newteachersubject-card-strength">
                                            Strength: {s.student_count}
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
