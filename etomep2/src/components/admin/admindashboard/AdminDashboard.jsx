import React from 'react'
import { Col, Container, Row, Tabs, Tab, Nav } from "react-bootstrap";
import '../admindashboard/admindashboard.css';


function AdminDashboard() {
  
  return (
    <div className="admin_dashboard" style={{backgroundColor:'#F8FEFF', height:'100vh',zIndex:"50px"}}>

      <Container>
        <Row>
          <Col md={12} style={{}}>
            <Nav
              variant="underline"
              // activeKey={activeTab}
              // onSelect={(k) => setActiveTab(k)}
              className="admin_dashboard_tab"
            >
              <Nav.Item>
                <Nav.Link eventKey="Class" style={{textDecoration:'none', color:'#526D82', fontSize:'15px'}}>Class</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Faculty"style={{textDecoration:'none', color:'#526D82', fontSize:'15px'}}>Faculty</Nav.Link>
              </Nav.Item>
            </Nav>
            {/* <div className="admin_dashboard_container">
              {activeTab === "Institution" && <Customerdashboard />}
              {activeTab === "Textbook" && <BookdashBoard />}
              {activeTab === "Course" && <Coursedashboard />}
            </div> */}
          </Col>
        </Row>
      </Container>
      {/* card in admidashboard.css page */}
    </div>
  )
}

export default AdminDashboard