import React, { useState, useEffect } from "react";
import { Col, Container, Row, Form, Nav } from "react-bootstrap";
import { BsSearch, BsFilterRight } from "react-icons/bs";
import '../aarnanavbar/aarnanavbar.css';
import AarnaProgress from "../aarnaprogress/AarnaProgress";
import AarnaQuestionPaper from "../aarnaquestionpaper/AarnaQuestionPaper";
import SeatingDashboard from "../aarnaseating/SeatingDashboard";
import EvaluationDashboard from "../aarnaevaluation/EvaluationDashboard";
import ResultFilter from "../aarnaresult/ResultFilter";

function AarnaNavbar() {

  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("aarnaActiveTab") || "Progress";
  });

  useEffect(() => {
    localStorage.setItem("aarnaActiveTab", activeTab);
  }, [activeTab]);

console.log(activeTab, "active tabbbbb");

// Update local storage when activeTab changes
useEffect(() => {
localStorage.setItem("activeTab", activeTab);
}, [activeTab]);

    return (
        <div className="aarna_navbar">
            <Container className="aarna_container">
                <Row className="aarna_row">
                    <Col md={12}>
                        {/* Change: Use flex-wrap to allow wrapping on smaller screens */}
                        <div className="d-flex justify-content-between align-items-center flex-wrap">
                            <Nav
                                variant="underline"
                                activeKey={activeTab}
                                onSelect={(k) => setActiveTab(k)}
                                className="ad_aarna_navbar_tab"
                                // style={{border:'1px solid green', width:'100%' }}
                            >
                                <Nav.Item>
                                    <Nav.Link eventKey="Progress" className="ad_aarna_mob_subhead_one"style={{textDecoration:'none'}}>
                                        Progress
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="Question Paper" className="ad_aarna_mob_subhead_one"style={{textDecoration:'none'}}>
                                        Question Paper
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="Seating" className="ad_aarna_mob_subhead_one"style={{textDecoration:'none'}}>
                                        Seating
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="Evaluation" className="ad_aarna_mob_subhead_one"style={{textDecoration:'none'}}>
                                        Evaluation
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="Question Bank" className="ad_aarna_mob_subhead_one"style={{textDecoration:'none'}}>
                                        Question Bank
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="Result" className="ad_aarna_mob_subhead_one"style={{textDecoration:'none'}}>
                                        Result
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                            {/* Change: Group search bar and filter icon into a flex container */}
                            <div className="ad_search_filter_main d-flex" >
                                <Form className="d-flex">
                                    {/* Change: Use position-relative to correctly position the search icon */}
                                    <div className="position-relative">
                                        <Form.Control
                                            type="search"
                                            placeholder="Search"
                                            className="ps-3 ad_search_bar"
                                            aria-label="Search"
                                        />
                                        <BsSearch className="position-absolute top-50 translate-middle-y nav_book_searchbar_icon" />
                                    </div>
                                </Form>
                                {/* Change: Adjust filter icon alignment */}
                                <div className="ad_search_filter_icon d-flex align-items-center">
                                    <BsFilterRight className="bs-filter-right" />
                                </div>
                            </div>
                        </div>

                        <div className="ad_institution_dashboard_container">
                            {activeTab === "Progress" && <AarnaProgress />}
                            {activeTab === "Question Paper" && <AarnaQuestionPaper />}
                            {activeTab === "Seating" && <SeatingDashboard />}
                            {activeTab === "Evaluation" && <EvaluationDashboard />}
                            {activeTab === "Result" && <ResultFilter />}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default AarnaNavbar;