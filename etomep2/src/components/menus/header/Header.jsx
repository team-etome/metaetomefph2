import React from 'react';
import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import etomelogo from "../../../assets/etomelogo.png";
import { BsSearch, BsFilterRight } from "react-icons/bs";
import '../header/header.css'; 

function Header() {
    return (
        <Navbar expand="lg" style={{ backgroundColor: '#fff' }}>
            <Container fluid>
                <Navbar.Brand href="#">
                    <img
                        src={etomelogo}
                        alt="etome logo"
                        style={{
                            width: "200px",
                            height: "90px",
                            marginBottom: "15px",
                        }}
                    />
                </Navbar.Brand>
                <Nav className=" nav-links me-auto my-2 my-lg-0" style={{ maxHeight: '100px', display: 'flex', flexWrap: 'nowrap' }} variant="underline" >
                    <Nav.Item>
                        <Nav.Link eventKey="Class">Class</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="Faculty">Faculty</Nav.Link>
                    </Nav.Item>
                </Nav>
                <div className="d-flex align-items-center">
                    <Form className="d-flex">
                        <div className="position-relative">
                            <BsSearch
                                className="position-absolute top-50 translate-middle-y ms-2"
                                style={{ zIndex: 2, height: "20px", width: "20px", color: "#D8D4D4" }}
                            />
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="ps-5"
                                aria-label="Search"
                                style={{
                                    width: "302px",
                                    borderRadius: "17px",
                                    color: "#767676",
                                }}
                            />
                        </div>
                    </Form>
                    <BsFilterRight style={{ height: '40px', width: '40px', marginLeft: '20px', marginRight:'30px' }}/>
                </div>
            </Container>
        </Navbar>
    );
}

export default Header;
