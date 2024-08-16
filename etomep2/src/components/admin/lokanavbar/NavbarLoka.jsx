import React, { useState, useEffect } from "react";
import {
  Col,
  Container,
  Row,
  Nav,
  InputGroup,
  FormControl,
  Dropdown, 
} from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import "../lokanavbar/lokanavbar.css";
import LokaBookDashboard from "../adminlokatextbookdashboard/LokaBookDashboard";
import LokaLibraryListing from "../adminlokalibrarylist/LokaLibraryListing";



function NavbarLoka() {
  const [currentTab, setCurrentTab] = useState(
    localStorage.getItem("currentTab") || "Textbook"
  );
  const [searchTerm, setSearchTerm] = useState("");

 

  console.log(currentTab, "activa tab");

  // Update local storage when activeTab changes
  useEffect(() => {
    localStorage.setItem("currentTab", currentTab);
  }, [currentTab]);

  return (
    <div className="loka_dashboard">
      <Container>
        <Row className="loka_navbar_row">
          <Col md={6}>
            <Nav
              variant="underline"
              activeKey={currentTab}
              onSelect={(k) => setCurrentTab(k)}
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
            {currentTab === "Textbook" && (
              <div className="textbook_search">
                <Row className="search_dropdwon_textbook">
                  <div className="book_search_col" >
                    <Dropdown className="dropdown_tb">
                      <Dropdown.Toggle
                        variant="outline-secondary"
                        id="dropdown-basic"
                        className="dropdown_tb_toggle"
                      >
                        NCERT
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>NCERT</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <div className="separator"></div>
                    <InputGroup className="inputgroup_search">
                      <BsSearch className="position-absolute top-50 translate-middle-y ms-2 book_searchbar_icon" />
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
            {currentTab === "Library" && (
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
          {currentTab === "Textbook" && <LokaBookDashboard />}
          {currentTab === "Library" && <LokaLibraryListing />}
        </div>
      </Container>
    </div>
  );
}

export default NavbarLoka;
