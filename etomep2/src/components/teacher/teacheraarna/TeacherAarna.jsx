import React, { useState, useEffect } from "react";
import { Col, Container, Row, Form, Nav,Dropdown } from "react-bootstrap";
import { BsSearch, BsFilterRight } from "react-icons/bs";
import ExaminationDashboard from "../teacherexamination/ExaminationDashboard";
import TeacherResult from "../teacherresult/TeacherResult";
import TeacherEvaluationList from "../teacherevaluation/TeacherEvaluationList";
import '../teacheraarna/teacheraarna.css'

function TeacherAarna() {
    const [activeTab, setActiveTab] = useState(
        localStorage.getItem("activeTab") || "Progress"
    );

    const [testPaperOption, setTestPaperOption] = useState(localStorage.getItem("testPaperOption") || "MCQ");

    // useEffect(() => {
    //     localStorage.setItem("activeTab", activeTab);
    // }, [activeTab]);

    // Update local storage when activeTab changes
    useEffect(() => {
        localStorage.setItem("activeTab", activeTab);
        if (activeTab === "Test Paper") {
            localStorage.setItem("testPaperOption", testPaperOption);
        }
    }, [activeTab, testPaperOption]);

    // Handle selection from the dropdown
    const handleTestPaperOption = (option) => {
        setTestPaperOption(option);
        setActiveTab("Test Paper"); 
        console.log("Test Paper Option Selected:", option);
    };


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
        <Row style={{ paddingLeft: "2vw", paddingTop: "1vw",  }}>
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
                                    marginRight: "0px",
                                }}
                            >
                                Progress
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                eventKey="Examination"
                                className="aarna_mob_subhead_one"
                                style={{
                                    textDecoration: "none",
                                    color: "#526D82",
                                    fontSize: "15px",
                                }}
                            >
                                Examination
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Dropdown>
                                <Dropdown.Toggle
                                    variant="link"
                                    id="dropdown-basic"
                                    className="aarna_mob_subhead_one"
                                    style={{
                                        textDecoration: activeTab === "Test Paper" ? "underline" : "none",
                                        color: "#526D82",
                                        fontSize: "15px",
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                    }}
                                >
                                 Test Paper
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                   <Dropdown.Item eventKey="MCQ" onClick={() => handleTestPaperOption("MCQ")}>
                                        MCQ
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="Mock Test" onClick={() => handleTestPaperOption("Mock Test")}>
                                         Mock Test
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav.Item>
                        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown" className="dropdown-tab-style">
                            <NavDropdown.Item className="dropdown-item-custom" href="#action/3.1">Mock Tests</NavDropdown.Item>
                            <NavDropdown.Item className="dropdown-item-custom" href="#action/3.2">MCQ</NavDropdown.Item>
                        </NavDropdown> */}
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
                        <Nav.Item>
                            <Nav.Link
                                eventKey="Assignment"
                                className="aarna_mob_subhead_one"
                                style={{
                                    textDecoration: "none",
                                    color: "#526D82",
                                    fontSize: "15px",
                                }}
                            >
                                Assignment
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
                    </Nav>

                    <div className="ms-auto search_filter_wrapper d-flex align-items-center">
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
                                        width: "200px",
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
                                width: "45px",
                                marginLeft: "10px",
                                color:'#526D82',
                                paddingLeft:'10px'
                            }}
                        />
                    </div>
                </div>

                <div className="institution_dashboard_container">
                    {/* {activeTab === "Progress" && <AarnaProgress />} */}
                    {activeTab === "Examination" && <ExaminationDashboard/>}
                    {activeTab === "Result" && <TeacherResult/>}
                    {activeTab === "Evaluation" && <TeacherEvaluationList/>}
                    {/* {activeTab === "Test Paper" && testPaperOption === "MCQ" && (
                         <div>MCQ Content Here</div>
                    )}
                    {activeTab === "Test Paper" && testPaperOption === "Mock Test" && (
                        <div>Mock Test Content Here</div>
                    )} */}

                </div>
            </Col>
        </Row>
    </Container>
</div>
  )
}

export default TeacherAarna