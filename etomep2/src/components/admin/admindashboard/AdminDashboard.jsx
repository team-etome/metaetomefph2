import React from 'react'
import { Col, Container, Row, Tabs, Tab, Nav } from "react-bootstrap";
import '../admindashboard/admindashboard.css';


function AdminDashboard() {

  return (
 <div className="admin_dashboard" style={{backgroundColor:'#F8FEFF', height:'100vh',paddingTop:"12vh",paddingLeft:"10px",}}>
      <Container>
        <Row style={{paddingLeft:"2vw",paddingTop:"1vw"}}>
          <Col md={12} >
            Dashboard
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default AdminDashboard