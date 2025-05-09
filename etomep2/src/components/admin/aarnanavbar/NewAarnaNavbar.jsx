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
import "./newaarnanavbar.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Examtimetable from "../aarnatimetable/ExamTimetable";
import AdminQuestionAssigning from "../aarnaquestionpaper/AdminQuestionAssigning";
import NewResultFilter from "../aarnaresult/NewResultFilter";
import NewSeatingDashboard from "../aarnaseating/NewSeatingDashboard";
import NewEvaluationDashboard from "../aarnaevaluation/NewEvaluationDashboard";

function NewAarnaNavbar() {
    const admininfo = useSelector((state) => state.admininfo);

    const [activeTab, setActiveTab] = useState(
        localStorage.getItem("activeTab") || "Textbook"
    );

    console.log(activeTab, "current tab..................")


    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();
    // console.log(activeTab, "activa tab");

    useEffect(() => {
        const storedTab = localStorage.getItem("activeTab");
        if (storedTab) {

            setActiveTab(storedTab);


        }
    }, []);

    useEffect(() => {
        localStorage.setItem("activeTab", activeTab);
    }, [activeTab]);

    const handlenavigate = () => {
        navigate('/adminprofile', { state: { admininfo: admininfo.admininfo } });
    };

    return (
        <div className="newlokanav_dashboard">
            <Container className="newlokanav_main_container">
                <div className="newlokanav_row_main">
                    <Row className="newlokanav_row_header">
                        <Col md={6} className="newlokanav_header_left_heading">
                            <div className="newlokanav_title">
                                <p>Loka</p>
                            </div>
                        </Col>
                        <Col md={6} className="newlokanav_header_right_profilepic">
                            <div className="newlokanav_header_institution">
                                <div className="newlokanav_hd_title">
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
                    <Row className="newlokanav_navbar_row">
                        <Col md={12} className="newlokanav_header_bottom">
                            <Nav
                                variant="underline"
                                activeKey={activeTab}

                                onSelect={(k) => setActiveTab(k)}

                                className="newlokanav_dashboard_tab"
                                style={{ width: "100%" }}
                            >
                                <Nav.Item>
                                    <Nav.Link
                                        eventKey="Time Table"

                                        className={`newlokanav_mob_subhead_one ${activeTab === 'Time Table' ? 'newlokanav_active-tab' : 'newlokanav_inactive-tab'}`}

                                        style={{
                                            textDecoration: "none",
                                        }}
                                    >
                                        Time Table
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link
                                        eventKey="Question Paper"
                                        className={`newlokanav_mob_subhead_one ${activeTab === 'Question Paper' ? 'newlokanav_active-tab' : 'newlokanav_inactive-tab'}`}
                                        style={{
                                            textDecoration: "none",
                                        }}
                                    >
                                        Question Paper
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link
                                        eventKey="Seating"
                                        className={`newlokanav_mob_subhead_one ${activeTab === 'Seating' ? 'newlokanav_active-tab' : 'newlokanav_inactive-tab'}`}
                                        style={{
                                            textDecoration: "none",
                                        }}
                                    >
                                        Seating
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link
                                        eventKey="Evaluation"
                                        className={`newlokanav_mob_subhead_one ${activeTab === 'Evaluation' ? 'newlokanav_active-tab' : 'newlokanav_inactive-tab'}`}
                                        style={{
                                            textDecoration: "none",
                                        }}
                                    >
                                        Evaluation
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link
                                        eventKey="Question Bank"
                                        className={`newlokanav_mob_subhead_one ${activeTab === 'Question Bank' ? 'newlokanav_active-tab' : 'newlokanav_inactive-tab'}`}
                                        style={{
                                            textDecoration: "none",
                                        }}
                                    >
                                        Question Bank
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link
                                        eventKey="Result"
                                        className={`newlokanav_mob_subhead_one ${activeTab === 'Result' ? 'newlokanav_active-tab' : 'newlokanav_inactive-tab'}`}
                                        style={{
                                            textDecoration: "none",
                                        }}
                                    >
                                        Result
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                    </Row>
                </div>
                <div className="newlokanav_dashboard_container">
                    {/* {activeTab === "Progress" && <AarnaProgress />} */}
                    {activeTab === "Time Table" && <Examtimetable />}
                    {/* {activeTab === "Question Paper" && <AarnaQuestionPaper />} */}
                    {activeTab === "Question Paper" && <AdminQuestionAssigning />}
                    {/* {activeTab === "Seating" && <SeatingDashboard />} */}
                    {activeTab === "Seating" && <NewSeatingDashboard />}
                    {/* {activeTab === "Seating" && <NewSeatingDashboardView />} */}
                    {/* {activeTab === "Evaluation" && <EvaluationDashboard />} */}
                    {activeTab === "Evaluation" && <NewEvaluationDashboard />}
                    {/* {activeTab === "Result" && <ResultFilter />} */}
                    {activeTab === "Result" && <NewResultFilter />}
                    {/* {activeTab === "Result" && <Students/>} */}
                </div>
            </Container>
        </div>
    );
}

export default NewAarnaNavbar;
