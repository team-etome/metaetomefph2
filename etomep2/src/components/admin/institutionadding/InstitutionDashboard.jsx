import React, { useState, useEffect } from "react";
import { Col, Container, Row, Tabs, Form, Nav } from "react-bootstrap";
import "../institutionadding/institutiondashboard.css";
import AdminClassdashboard from "../adminclassdashboard/AdminClassdashboard";
import FacultyDashboard from "../adminfacultydashboard/FacultyDashboard";
// import { BsSearch, BsFilterRight } from "react-icons/bs";

function InstitutionDashboard() {

  const [activeTab, setActiveTab] = useState(
  sessionStorage.getItem("activeTab") || "Faculty"
);
  // Update local storage when activeTab changes
  useEffect(() => {
    // localStorage.setItem("activeTab", activeTab);
    sessionStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  return (
    <div className="institution_dashboard">
      <Container>
        <Row style={{ paddingLeft: "2vw", paddingTop: "1vw" }} className="inst_row">
          <Col md={12}>
            <Nav
              variant="underline"
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className="institution_dashboard_tab"
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
              {/* {activeTab === "Faculty" && (
                <div className="search_filter_main">
                    <Form className="d-flex inst_search">
                      <div className="position-relative">
                        <BsSearch
                          className="position-absolute top-50 translate-middle-y ms-2 inst_search_icon"
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
              )} */}
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
