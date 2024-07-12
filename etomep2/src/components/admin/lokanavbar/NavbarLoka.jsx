import React, { useState, useEffect } from "react";
import { Col, Container, Row, Tabs, Form, Nav, InputGroup, FormControl, Dropdown } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import '../lokanavbar/lokanavbar.css';
import LokaTextbook from "../adminloka/LokaTextbook";
import LokaBookDashboard from "../adminlokatextbookdashboard/LokaBookDashboard";
import LokaLibraryListing from "../adminlokalibrarylist/LokaLibraryListing";

function NavbarLoka() {
    const [activeTab, setActiveTab] = useState(
        localStorage.getItem("activeTab") || "Textbook"
    );
    const [searchTerm, setSearchTerm] = useState('');

    // Update local storage when activeTab changes
    useEffect(() => {
        localStorage.setItem("activeTab", activeTab);
    }, [activeTab]);

    return (
        <div className="loka_dashboard">
            <Container>
                <Row className="loka_navbar_row">
                    <Col md={6}>
                        <Nav
                            variant="underline"
                            activeKey={activeTab}
                            onSelect={(k) => setActiveTab(k)}
                            className="loka_dashboard_tab"
                            style={{ width: "100%" }}
                        >
                            <Nav.Item>
                                <Nav.Link
                                    eventKey="Textbook"
                                    className="loka_mob_subhead_one"
                                    style={{
                                        textDecoration: "none",
                                    }}
                                >
                                    Textbook
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    eventKey="Library"
                                    className="loka_mob_subhead_one"
                                    style={{
                                        textDecoration: "none",
                                    }}
                                >
                                    Library
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col md={6}>
                    {activeTab === "Textbook" && (
                  <div className="textbook_search">
                    <Row className="justify-content-between align-items-center search_dropdwon_textbook">

                        <div className="book_search_col" style={{ display: 'flex' }}>
                            <Dropdown className="dropdown_tb">
                                <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic" className="dropdown_tb_toggle">
                                    NCERT
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item>NCERT</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <InputGroup className="inputgroup_search">
                                <BsSearch className="position-absolute top-50 translate-middle-y ms-4 book_searchbar_icon" />
                                <FormControl
                                    className="ps-5 book_search_input"
                                    placeholder="Search..."
                                    aria-label="Search"
                                    // value={searchTerm}
                                    // onChange={e => setSearchTerm(e.target.value)}
                                />
                            </InputGroup>
                        </div>
                    </Row>
                    </div>
                )}
               {activeTab === "Library" && (
                <div className="lib_search_nav">
                  <Col md={6} className="search_col">
                    <InputGroup className="lib_inputgroup_search">
                      <BsSearch className="position-absolute top-50 translate-middle-y ms-3 library_searchbar_icon" />
                      <FormControl
                        className="ps-5 library_search_input"
                        placeholder="Search..."
                        aria-label="Search"
                        // value={searchTerm}
                        // onChange={e => setSearchTerm(e.target.value)}
                      />
                    </InputGroup>
                  </Col>
                  </div>
                )}
                </Col>
                </Row>

                <div className="institution_dashboard_container">
                    {activeTab === "Textbook" && <LokaBookDashboard />}
                    {activeTab === "Library" && <LokaLibraryListing />}
                </div>
            </Container>
        </div>
    );
}

export default NavbarLoka;
