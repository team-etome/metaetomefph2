import React, { useState, useEffect } from "react";
import { Col, Container, Row, Tabs, Form, Nav } from "react-bootstrap";
import { BsSearch, BsFilterRight } from "react-icons/bs";
import '../teachernavbar/teachernavbar.css'
import StudentDashboard from "../studentdashboard/StudentDashboard";

function TeacherNavbar() {
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "Classroom"
  );

  // Update local storage when activeTab changes
  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  return (
    <div
      className="teacher_dashboard"
      style={{
        backgroundColor: "#F8FEFF",
        height: "100vh",
        paddingTop: "12vh",
      }}
    >
      <Container>
        <Row style={{ paddingLeft: "2vw", paddingTop: "1vw" }}>
          <Col md={12}>
            <Row>
              <Col md={6}>
                <Nav
                  variant="underline"
                  activeKey={activeTab}
                  onSelect={(k) => setActiveTab(k)}
                  className="teacher_dashboard_tab"
                  style={{ width: "100%" }}
                >
                  <Nav.Item>
                    <Nav.Link
                      eventKey="Classroom"
                      className="teacher_mob_subhead_one"
                      style={{
                        textDecoration: "none",
                        color: "#526D82",
                        fontSize: "15px",
                        marginRight: "20px",
                      }}
                    >
                      Classroom
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="Subject"
                      className="teacher_mob_subhead_one"
                      style={{
                        textDecoration: "none",
                        color: "#526D82",
                        fontSize: "15px",
                      }}
                    >
                      Subject
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col md={6}>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    flexDirection: "row",
                    paddingLeft: "2vw",
                  }}
                >
                  <div
                    style={{
                      width: "80%",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                    className="search_filter d-flex align-items-center"
                  >
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
                            width: "400px",
                            height: "35px",
                            borderRadius: "17px",
                            color: "#767676",
                          }}
                        />
                      </div>
                    </Form>
                  </div>

                  <div
                    style={{
                      width: "5%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    <BsFilterRight style={{ height: "40px", width: "40px" }} />
                  </div>
                </div>
              </Col>
            </Row>

            <div className="institution_dashboard_container">
              {activeTab === "Classroom" && <StudentDashboard />}
              {/* {activeTab === "Class" && <AdminClassdashboard />} */}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default TeacherNavbar
