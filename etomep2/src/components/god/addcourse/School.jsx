import React from 'react'
import {Container, Row, Nav, Navbar, Form,Card , Col, Pagination, Button} from "react-bootstrap";
import "../addcourse/school.css"

function School() {
  return (
    <div style={{ backgroundColor: "#fff", border: "2px solid white " }}>
    <Container>
        <Row>
        <div
          style={{
            display: "flex",
            paddingTop: "33px",
            paddingBottom: "16px",
            borderBottom: "1px solid #DDE6ED",
            marginBottom: "20px",
          }}
        >
          <div style={{ marginLeft: "30px", color: "#526D82" }}>
            <h3>Add Courses</h3>
          </div>
          <div style={{ color: "2px solid black" }}></div>
        </div>
        </Row>
    </Container>
    </div>
  )
}

export default School