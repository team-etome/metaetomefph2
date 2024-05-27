import React from 'react'
import { Col, Container, Row, Tabs, Tab, Nav } from "react-bootstrap";
import '../admindashboard/admindashboard.css';


function AdminDashboard() {

  return (
 <div className="admin_dashboard" style={{backgroundColor:'#F8FEFF', height:'100vh',paddingTop:"12vh",paddingLeft:"10px",}}>
      <Container >
        <Row style={{paddingLeft:"2vw",paddingTop:"1vw", height:'80vh'}}>
          <Col >
            <div >
              Dashboard
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default AdminDashboard