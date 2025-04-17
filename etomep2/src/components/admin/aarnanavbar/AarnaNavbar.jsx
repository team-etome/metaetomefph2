import React, { useState, useEffect } from "react";
import { Col, Container, Row, Form, Nav } from "react-bootstrap";
import { BsSearch, BsFilterRight } from "react-icons/bs";
import '../aarnanavbar/aarnanavbar.css';
import AarnaProgress from "../aarnaprogress/AarnaProgress";
import AarnaQuestionPaper from "../aarnaquestionpaper/AarnaQuestionPaper";
import SeatingDashboard from "../aarnaseating/SeatingDashboard";
import EvaluationDashboard from "../aarnaevaluation/EvaluationDashboard";
import ResultFilter from "../aarnaresult/ResultFilter";
import Examtimetable from "../aarnatimetable/ExamTimetable";
import AdminQuestionAssigning from "../aarnaquestionpaper/AdminQuestionAssigning";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NewResultFilter from "../aarnaresult/NewResultFilter";
import NewSeatingDashboard from "../aarnaseating/NewSeatingDashboard";
import NewSeatingDashboardView from "../aarnaseating/NewSeatingDashboardView";
import NewEvaluationDashboard from "../aarnaevaluation/NewEvaluationDashboard";

function AarnaNavbar() {
    const admininfo = useSelector((state) => state.admininfo);
    console.log(admininfo, "admin info");


    const navigate = useNavigate();
    
    const [activeTab, setActiveTab] = useState(() => {
        return localStorage.getItem("aarnaActiveTab") || "Question Paper";
    });

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
        <div  className="aarna_navbar">
            <Container className="aarna_container">

                <div className="aarna_row_main">
                    <Row className="aarna_row_header">
                        <Col md={6}>
                            <div className="aarna_title">
                                <p>Aarna</p>
                            </div>
                        </Col>
                        <Col md={6} className="aarna_header_right_profilepic">
                            <div className="aarna_header_institution">
                                <div className="aarna_hd_title">
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
                    <Row className="aarna_row">
                        <Col md={12}>
                            {/* Change: Use flex-wrap to allow wrapping on smaller screens */}
                            <div className="d-flex justify-content-between align-items-center flex-wrap">

                                <Nav
                                    variant="underline"
                                    activeKey={activeTab}
                                    onSelect={(k) => setActiveTab(k)}
                                    // className="ad_aarna_navbar_tab"
                                    className="ad_aarna_navbar_tab d-flex flex-row overflow-auto"

                                // style={{border:'1px solid green', width:'100%' }}
                                >
                                    {/* <Nav.Item>
                                    <Nav.Link eventKey="Progress" className="ad_aarna_mob_subhead_one"style={{textDecoration:'none'}}>
                                        Progress
                                    </Nav.Link>
                                </Nav.Item> */}
                                    <Nav.Item>
                                        <Nav.Link eventKey="Time Table" className="ad_aarna_mob_subhead_one" style={{ textDecoration: 'none' }}>

                                            Time Table
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="Question Paper" className="ad_aarna_mob_subhead_one" style={{ textDecoration: 'none' }}>
                                            Question Paper
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="Seating" className="ad_aarna_mob_subhead_one" style={{ textDecoration: 'none' }}>
                                            Seating
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="Evaluation" className="ad_aarna_mob_subhead_one" style={{ textDecoration: 'none' }}>
                                            Evaluation
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="Question Bank" className="ad_aarna_mob_subhead_one" style={{ textDecoration: 'none' }}>
                                            Question Bank
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="Result" className="ad_aarna_mob_subhead_one" style={{ textDecoration: 'none' }}>
                                            Result
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                {/* Change: Group search bar and filter icon into a flex container */}


                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="ads_institution_dashboard_container">
                    {/* {activeTab === "Progress" && <AarnaProgress />} */}
                    {activeTab === "Time Table" && <Examtimetable />}
                    {/* {activeTab === "Question Paper" && <AarnaQuestionPaper />} */}
                    {activeTab === "Question Paper" && <AdminQuestionAssigning />}
                    {/* {activeTab === "Seating" && <SeatingDashboard />} */}
                    {activeTab === "Seating" && <NewSeatingDashboard/>}
                    {/* {activeTab === "Seating" && <NewSeatingDashboardView />} */}
                    {/* {activeTab === "Evaluation" && <EvaluationDashboard />} */}
                    {activeTab === "Evaluation" && <NewEvaluationDashboard />}
                    {/* {activeTab === "Result" && <ResultFilter />} */}
                    {activeTab === "Result" && <NewResultFilter/>}
                </div>

            </Container>
        </div>
    );
}

export default AarnaNavbar;