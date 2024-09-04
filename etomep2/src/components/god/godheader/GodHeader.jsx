import React, { useState, useEffect } from "react";
import { Col, Container, Row, Nav } from "react-bootstrap";
import Customerdashboard from "../customerdashboard/Customerdashboard";
import BookdashBoard from "../textbookdashboard/BookdashBoard";
import Coursedashboard from "../coursedashboard/Coursedashboard";
import "../godheader/header.css";

function GodHeader() {
  const validTabs = ["Institution", "Textbook", "Course"];
  const storedTab = localStorage.getItem("activeTab");

  const [activeTab, setActiveTab] = useState(
    validTabs.includes(storedTab) ? storedTab : "Institution"
  );

  // Update local storage when activeTab changes
  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  return (
    <div className="header-container" style={{ minHeight: "100vh" }}>
      <Container>
        <Row>
          <Col md={12} style={{ marginTop: "30px" }}>
            <Nav
              variant="underline"
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className="navbar_text d-flex justify-content-between"
            >
              {/* <Nav.Item>
                <Nav.Link eventKey="Institution" className="no-underline">
                  Institution
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Textbook" className="no-underline">
                  Textbook
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Course" className="no-underline">
                  Course
                </Nav.Link>
              </Nav.Item>
              <div>
                <h6>Logout</h6>
              </div>
            </Nav> */}
            <div className="d-flex gd_tb">
                <Nav.Item>
                  <Nav.Link eventKey="Institution" className="no-underline">
                    Institution
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="Textbook" className="no-underline">
                    Textbook
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="Course" className="no-underline">
                    Course
                  </Nav.Link>
                </Nav.Item>
              </div>
              <Nav.Item>
                <Nav.Link className="no-underline">Logout</Nav.Link>
              </Nav.Item>
            </Nav>
            <div className="dashboard-container">
              {activeTab === "Institution" && <Customerdashboard />}
              {activeTab === "Textbook" && <BookdashBoard />}
              {activeTab === "Course" && <Coursedashboard />}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default GodHeader;