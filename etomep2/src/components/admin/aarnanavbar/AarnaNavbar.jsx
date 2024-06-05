import React, { useState, useEffect } from "react";
import { Col, Container, Row, Form, Nav } from "react-bootstrap";
import { BsSearch, BsFilterRight } from "react-icons/bs";
import AdminClassdashboard from "../adminclassdashboard/AdminClassdashboard";
import AarnaProgress from "../aarnaprogress/AarnaProgress";
import AarnaQuestionPaper from "../aarnaquestionpaper/AarnaQuestionPaper";

function AarnaNavbar() {
    const [activeTab, setActiveTab] = useState(
        localStorage.getItem("activeTab") || "Progress"
    );

    // Update local storage when activeTab changes
    useEffect(() => {
        localStorage.setItem("activeTab", activeTab);
    }, [activeTab]);

    return (
        <div
            className="aarna_navbar"
            style={{
                backgroundColor: "#F8FEFF",
                height: "100vh",
                paddingTop: "12vh",
            }}
        >
            <Container>
                <Row style={{ paddingLeft: "2vw", paddingTop: "1vw" }}>
                    <Col md={12}>
                        <div className="d-flex justify-content-between align-items-center">
                            <Nav
                                variant="underline"
                                activeKey={activeTab}
                                onSelect={(k) => setActiveTab(k)}
                                className="aarna_navbar_tab"
                            >
                                <Nav.Item>
                                    <Nav.Link
                                        eventKey="Progress"
                                        className="aarna_mob_subhead_one"
                                        style={{
                                            textDecoration: "none",
                                            color: "#526D82",
                                            fontSize: "15px",
                                            marginRight: "20px",
                                        }}
                                    >
                                        Progress
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link
                                        eventKey="Question Paper"
                                        className="aarna_mob_subhead_one"
                                        style={{
                                            textDecoration: "none",
                                            color: "#526D82",
                                            fontSize: "15px",
                                        }}
                                    >
                                        Question Paper
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link
                                        eventKey="Seating"
                                        className="aarna_mob_subhead_one"
                                        style={{
                                            textDecoration: "none",
                                            color: "#526D82",
                                            fontSize: "15px",
                                        }}
                                    >
                                        Seating
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link
                                        eventKey="Evaluation"
                                        className="aarna_mob_subhead_one"
                                        style={{
                                            textDecoration: "none",
                                            color: "#526D82",
                                            fontSize: "15px",
                                        }}
                                    >
                                        Evaluation
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link
                                        eventKey="Result"
                                        className="aarna_mob_subhead_one"
                                        style={{
                                            textDecoration: "none",
                                            color: "#526D82",
                                            fontSize: "15px",
                                        }}
                                    >
                                        Result
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link
                                        eventKey="Question Bank"
                                        className="aarna_mob_subhead_one"
                                        style={{
                                            textDecoration: "none",
                                            color: "#526D82",
                                            fontSize: "15px",
                                        }}
                                    >
                                        Question Bank
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>

                            <div className="search_filter_wrapper d-flex align-items-center">
                                <Form className="d-flex">
                                    <div className="position-relative">
                                        <BsSearch
                                            className="position-absolute top-50 translate-middle-y ms-2"
                                            style={{
                                                zIndex: 2,
                                                height: "20px",
                                                width: "20px",
                                                color: "#D8D4D4",
                                                right: "15px",
                                            }}
                                        />
                                        <Form.Control
                                            type="search"
                                            placeholder="Search"
                                            className="ps-3"
                                            aria-label="Search"
                                            style={{
                                                width: "300px",
                                                height: "35px",
                                                borderRadius: "17px",
                                                color: "#767676",
                                            }}
                                        />
                                    </div>
                                </Form>

                                <BsFilterRight
                                    style={{
                                        height: "40px",
                                        width: "40px",
                                        marginLeft: "15px",
                                        color:'#526D82'
                                    }}
                                />
                            </div>
                        </div>

                        <div className="institution_dashboard_container">
                            {activeTab === "Progress" && <AarnaProgress />}
                            {activeTab === "Question Paper" && <AarnaQuestionPaper />}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default AarnaNavbar;
