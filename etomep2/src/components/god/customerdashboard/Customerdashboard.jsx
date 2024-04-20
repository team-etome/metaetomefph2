import React, { useState } from "react";
import { BsFilterRight, BsSearch } from "react-icons/bs";
import {Container, Row, Nav, Navbar, NavDropdown, Form,Card , Col, Pagination} from "react-bootstrap";
import chemistryImage from "../../../assets/chemistry.png";
import "../customerdashboard/customerdashboard.css";
import { Link } from "react-router-dom";
import { MdAddHomeWork } from "react-icons/md";


function Customerdashboard() {
  const handleCardClick = () => {setShowModal(true);};
  return (
    <div
      style={{
        // backgroundColor: "#DDE6ED",
        Height: "100vh",
        overflowY: "auto",
      }}
    >
      <Container>
      <Navbar
          expand="lg"
          className="bg-body-tertiary book"
          style={{ marginBottom: "20px", marginTop:'20px', backgroundColor: "#fff", borderRadius: "17px",}}
        >
          <Container>
            {/* <Navbar.Brand href="#home" style={{ color:"#526D82", fontSize:'20px'}}>Library</Navbar.Brand> */}
            {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
              </Nav>
              <Form className="d-flex">
                <div className="position-relative">
                  <BsSearch
                    className="position-absolute top-50 translate-middle-y ms-3"
                    style={{ height: "20px", width: "20px", color: "#D8D4D4" }}
                  />
                  <Form.Control
                    type="search"
                    placeholder="Search by name"
                    className="me-5 ps-5"
                    aria-label="Search"
                    style={{
                      width: "300px",
                      borderRadius: "12px",
                      fontWeight: "400px",
                    }}
                  />
                </div>
              </Form>
            </Navbar.Collapse> */}
            <Form className="ms-auto d-flex">
              <div className="position-relative">
                <BsSearch
                  className="position-absolute top-50 translate-middle-y ms-3"
                  style={{ height: "20px", width: "20px", color: "#D8D4D4" }}
                />
                <Form.Control
                  type="search"
                  placeholder="Search School here"
                  className="me-5 ps-5"
                  aria-label="Search"
                  style={{
                    width: "300px",
                    borderRadius: "12px",
                    fontWeight: "400px",
                  }}
                />
              </div>
            </Form>
          </Container>
        </Navbar>
      </Container>
      <div>
      <Container
        style={{
          backgroundColor: "#DDE6ED",
          borderRadius: "17px",
          marginBottom: "70px",
        }}
      >
        <Container>
          <Row xs={1} sm={1} md={2} lg={3}  >
            {Array.from({ length: 10}).map((_, index) => (
              <Col key={index} className="d-flex justify-content-center mb-4">
                <Link to="/viewinstitution" style={{textDecoration:'none'}}>
                <div onClick={handleCardClick}>
                  <Card
                    style={{
                      width: "300px",
                      height:'170px',
                      // alignItems: "center",
                      border: "none",
                      marginTop: "0px",
                      marginBottom: "30px",
                      paddingLeft:'10px',
                      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                      
                    }}
                  >
                  <Card.Body style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", }}>
                      <div style={{fontSize:'200px'}}>
                        <Card.Title>St. Johns Residential HSS</Card.Title>
                      </div>
                      <div style={{display:'flex', justifyContent: "space-between"}}> 
                        <Card.Text>ICSE</Card.Text>
                        <Card.Text>123456</Card.Text>
                      </div>
                  </Card.Body>
                  </Card>
                </div>
                </Link>
              </Col>
            ))}
          </Row>
        
          <Pagination>
            <Pagination.Prev />
            <Pagination.Item>{1}</Pagination.Item>
            <Pagination.Item>{2}</Pagination.Item>
            <Pagination.Item>{3}</Pagination.Item>
            <Pagination.Ellipsis />
            <Pagination.Next />
          </Pagination>
          <div style={{}}>
            <Link to='/addcustomer'>
              <MdAddHomeWork style={{ position: "fixed", top: "650px", right: "25px", color: 'black', borderRadius: "100%", backgroundColor: "white", padding: "10px",  width: "60px", height: "60px",boxShadow: "0px 0px 10px rgba(0, 0, 0, 1)" }}/>
            </Link>
          </div>
        </Container>
      </Container> 
      </div>
    </div>
  )
}

export default Customerdashboard