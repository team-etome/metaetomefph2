import React, { useState, useEffect } from 'react'
import { Col, Container, Row, Tabs, Tab, Nav } from "react-bootstrap";
import '../institutionadding/institutiondashboard.css';
import AdminClassdashboard from '../adminclassdashboard/AdminClassdashboard';
import FacultyDashboard from '../adminfacultydashboard/FacultyDashboard';

function InstitutionDashboard() {

    const [activeTab, setActiveTab] = useState(
        localStorage.getItem("activeTab") || "Faculty"
      );
    
      // Update local storage when activeTab changes
      useEffect(() => {
        localStorage.setItem("activeTab", activeTab);
      }, [activeTab]);

  return (
 <div className="institution_dashboard" style={{backgroundColor:'#F8FEFF', height:'100vh',paddingTop:"12vh",paddingLeft:"10px",}}>
      <Container>
        <Row style={{paddingLeft:"2vw",paddingTop:"1vw"}}>
          <Col md={12} >
            <Nav
              variant="underline"
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className="institution_dashboard_tab"
            >
              <Nav.Item>
                <Nav.Link eventKey="Faculty"style={{textDecoration:'none', color:'#526D82', fontSize:'15px',marginRight:"20px"}}>Faculty</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Class" style={{textDecoration:'none', color:'#526D82', fontSize:'15px'}}>Class</Nav.Link>
              </Nav.Item>

            </Nav>
            <div className="institution_dashboard_container">
              {activeTab === "Faculty" && <FacultyDashboard />}
              {activeTab === "Class" && <AdminClassdashboard />}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default InstitutionDashboard