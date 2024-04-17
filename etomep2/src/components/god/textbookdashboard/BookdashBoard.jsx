import React from "react";
import { BsFilterRight, BsSearch } from "react-icons/bs";
import {
  Col,
  Container,
  Row,
  Nav,
  Navbar,
  NavDropdown,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import chemistryImage from "../../../assets/chemistry.png";

function BookdashBoard() {
  return (
    <div
      style={{ backgroundColor: "#DDE6ED", height: "100vh", overflowY: "auto" }}
    >
      <Container
        style={{
          backgroundColor: "#fff",
          marginTop: "80px",
          borderRadius: "17px",
          marginBottom: "70px",
        }}
      >
        <Container>
          <h6
            style={{
              color: "#526D82",
              fontSize: "20px",
              marginTop: "50px",
              padding: "10px",
            }}
          >
            Library
          </h6>
          <Navbar expand="lg" className="bg-body-tertiary">
            <Container
              style={{
                backgroundColor: "#DAE2E9",
                borderRadius: "10px",
                height: "70px",
                border: "none",
              }}
            >
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto" style={{ padding: "10px" }}>
                  <NavDropdown
                    title="Class"
                    id="basic-nav-dropdown"
                    menuVariant="dark"
                    align="end"
                    style={{
                      backgroundColor: "#ffff",
                      borderRadius: "8px",
                      marginLeft: "20px",
                      width: "100px",
                      height: "40px",
                    }}
                  >
                    <div style={{ backgroundColor: "#ffff" }}>
                      <NavDropdown.Item
                        href="#action/3.1"
                        style={{ color: "#000000" }}
                      >
                        XII
                      </NavDropdown.Item>
                    </div>
                  </NavDropdown>
                  <NavDropdown
                    title="Subject"
                    id="basic-nav-dropdown"
                    menuVariant="dark"
                    align="end"
                    style={{
                      backgroundColor: "#ffff",
                      borderRadius: "8px",
                      marginLeft: "20px",
                      width: "100px",
                      height: "40px",
                    }}
                  >
                    <NavDropdown.Item href="#action/3.1">
                      Science
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    title="Board"
                    id="basic-nav-dropdown"
                    menuVariant="dark"
                    align="end"
                    style={{
                      backgroundColor: "#ffff",
                      borderRadius: "8px",
                      marginLeft: "20px",
                      width: "100px",
                      height: "40px",
                    }}
                  >
                    <NavDropdown.Item href="#action/3.1">CBSE</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Form className="d-flex">
                  <div className="position-relative">
                    <BsSearch
                      className="position-absolute top-50 translate-middle-y ms-3"
                      style={{
                        height: "20px",
                        width: "20px",
                        color: "#D8D4D4",
                      }}
                    />
                    <Form.Control
                      type="search"
                      placeholder="Search by name"
                      className="me-5 ps-5"
                      aria-label="Search"
                      style={{
                        width: "500px",
                        borderRadius: "12px",
                        fontWeight: "400px",
                      }}
                    />
                  </div>
                </Form>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Container>
        <Container>
          <Row >
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} style={{ display:"flex", flexDirection:"column",backgroundColor:"black" ,justifyContent:"center"}}>
                <Card
                  style={{
                    width: "15rem",
                    marginTop: "20px",
                    marginBottom: "30px",
                    marginRight: "20px",

                    // Add some space between cards
                  }}
                >
                  <Card.Img variant="top" src={chemistryImage} />
                  <Card.Body>
                    <Card.Text>Chemistry</Card.Text>
                    <Card.Subtitle className="mb-1 text-muted">
                      David Fernandace
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </Row>
        </Container>
      </Container>
    </div>
  );
}

export default BookdashBoard;
