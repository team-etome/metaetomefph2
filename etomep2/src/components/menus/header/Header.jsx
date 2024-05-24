import React from 'react';
import etomelogo from "../../../assets/etomelogo.png";
import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import { BsSearch, BsFilterRight } from "react-icons/bs";
import '../header/header.css'; 
import { GiHamburgerMenu } from "react-icons/gi";
import amritha from "../../../assets/amritha.png";

function Header({ onBurgerClick }) {
    return (
        <Navbar expand="lg" style={{ backgroundColor: '#ffff',height:"12vh",width:"100%" ,zIndex:"1000",position:"fixed",top:"0",left:"0" }}>
            <Container fluid>
                {/* <div className='header_menu'>
                <GiHamburgerMenu />
                </div> */}

                <Navbar.Brand href="#" className='header' >
                <div className='header_menu' onClick={onBurgerClick}>
                    <GiHamburgerMenu />
                </div>
                    <div className='header_logo'>
                    <img
                        src={etomelogo}
                        alt="etome logo"
                        style={{
                            width: "162px",
                            height: "63px",
                            display:'flex',
                            justifyContent:'center',
                            alignContent:'center',
                            alignItems:'center'
                        }}
                    />
                    </div>

                </Navbar.Brand>
                <div className='header_institution' style={{display:'flex', gap:'10px', justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                <div>
                    <h6 style={{color:'#9DB2BF', fontSize:'17px'}}>Institute Name</h6>
                    <p style={{color:'#727272', fontSize:'12px'}}>Institutemail@gmail.com</p>
                </div>
                <img
                        src={amritha }
                        alt="Profile"
                        style={{
                            width: "52px",
                            height: "52px",
                            borderRadius: "50%",
                            marginRight: "30px",
                        }}
                    />
                </div>
                {/* <Nav className=" nav-links me-auto my-2 my-lg-0" style={{ maxHeight: '100px', display: 'flex', flexWrap: 'nowrap' }} variant="underline" >
                    <Nav.Item>
                        <Nav.Link eventKey="Class">Class</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="Faculty">Faculty</Nav.Link>
                    </Nav.Item>
                </Nav> */}
                {/* <div className=" search_filter d-flex align-items-center"  style={{marginTop:'10px',marginBottom:'10px' }}>
                    <Form className="d-flex">
                        <div className="position-relative">
                            <BsSearch
                                className="position-absolute top-50 translate-middle-y ms-2"
                                style={{ zIndex: 2, height: "20px", width: "20px", color: "#D8D4D4", right: "15px"}}
                            />
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="ps-3"
                                aria-label="Search"
                                style={{
                                    width: "250px",
                                    borderRadius: "17px",
                                    color: "#767676",
                                }}
                            />
                        </div>
                    </Form>
                    <BsFilterRight style={{ height: '40px', width: '40px', marginLeft: '20px', marginRight:'1px' }}/>
                </div> */}
                {/* <div className="responsive-buttons">
                    <button>class</button>
                    <button>Faculty</button>
                </div> */}
            </Container>
        </Navbar>
    );
}
export default Header;


