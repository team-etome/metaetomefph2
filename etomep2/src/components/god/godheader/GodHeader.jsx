import React, { useState, useEffect } from "react";
import { Col, Container, Row, Tabs, Tab, Nav } from "react-bootstrap";
import etomelogo from "../../../assets/etomelogo.png";
import { IoIosSearch } from "react-icons/io";
import { IoAddSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import BookdashBoard from "../textbookdashboard/BookdashBoard";
import Customerdashboard from "../customerdashboard/Customerdashboard";
import Coursedashboard from "../coursedashboard/Coursedashboard";
import "../godheader/header.css";

function GodHeader() {
  // const [activeTab, setActiveTab] = useState("Institution");

  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "Institution"
  );

  // Update local storage when activeTab changes
  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  return (
    <div className="header-container">
      <Container>
        <Row>
          <Col md={12} style={{ marginTop: "30px" }}>
            <Nav
              variant="underline"
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className="navbar_text"
            >
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
