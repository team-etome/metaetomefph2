import React, { useState, useEffect } from "react";
import { Col, Container, Row, Tabs, Form, Nav } from "react-bootstrap";
import "../institutionadding/institutiondashboard.css";
import AdminClassdashboard from "../adminclassdashboard/AdminClassdashboard";
import FacultyDashboard from "../adminfacultydashboard/FacultyDashboard";
import { BsSearch, BsFilterRight } from "react-icons/bs";

function InstitutionDashboard() {

  const [activeTab, setActiveTab] = useState(
  sessionStorage.getItem("activeTab") || "Faculty"
);
  // Update local storage when activeTab changes
  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  return (
    <div
      className="institution_dashboard"
      style={{
        backgroundColor: "#F8FEFF",
        height: "100vh",
        paddingTop: "12vh",
      }}
    >
      <Container>
        <Row style={{ paddingLeft: "2vw", paddingTop: "1vw" }}>
          <Col md={12}>
            <Nav
              variant="underline"
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className="institution_dashboard_tab"
              style={{ width: "100%" }}
            >
              <Nav.Item>
                <Nav.Link
                  eventKey="Faculty"
                  className="mob_subhead_one"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  Faculty
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="Class"
                  className="mob_subhead_one"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  Class
                </Nav.Link>
              </Nav.Item>
              {activeTab === "Faculty" && (
                <div className="search_filter_main">
                  <div  className="search_filter d-flex align-items-center">
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
                          className="ps-3 search_bar"
                          aria-label="Search"
                        />
                      </div>
                    </Form>
                  </div>

                  <div className="search_filter_icon">
                    <BsFilterRight style={{ height: "40px", width: "40px" }} />
                  </div>
                </div>
              )}
            </Nav>

            <div className="institution_dashboard_container">
              {activeTab === "Faculty" && <FacultyDashboard />}
              {activeTab === "Class" && <AdminClassdashboard />}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default InstitutionDashboard;
