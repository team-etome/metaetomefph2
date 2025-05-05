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
import "./newlokanavbar.css";
import LokaBookDashboard from "../adminlokatextbookdashboard/LokaBookDashboard";
import LokaLibraryListing from "../adminlokalibrarylist/LokaLibraryListing";
import { useSelector } from "react-redux";
import NewLokaBookDashboard from "../adminlokatextbookdashboard/NewLokaBookDashboard";
import NewLokaLibraryDashboard from "../adminlokatextbookdashboard/NewLokaLibraryDashboard";
import { useNavigate } from "react-router-dom";

function NewNavbarLoka() {
  const admininfo = useSelector((state) => state.admininfo);

  const [currentTab, setCurrentTab] = useState(
    localStorage.getItem("currentTab") || "Textbook"
  );

  console.log(currentTab,"current tab..................")


  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  // console.log(currentTab, "activa tab");

  useEffect(() => {
    const storedTab = localStorage.getItem("currentTab");
    if (storedTab) {
      setCurrentTab(storedTab);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("currentTab", currentTab);
  }, [currentTab]);

const handlenavigate = () => {
  navigate('/adminprofile', { state: { admininfo: admininfo.admininfo } });
};

  return (
    <div className="loka_dashboard">
      <Container className="loka_main_container"> 
        <div className="loka_row_main">
          <Row className="loka_row_header">
            <Col md={6}  className="loka_header_left_heading">
              <div className="loka_title">
                <p>Loka</p>
              </div>
            </Col>
            <Col md={6} className="loka_header_right_profilepic">
              <div className="loka_header_institution">
                <div className="loka_hd_title">
                  <p style={{ color: "#222222", }}>
                    {admininfo.admininfo?.email}
                  </p>
                </div>
                <img
                  onClick={handlenavigate}
                  src={admininfo.admininfo?.logo}
                  alt="Profile"
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    marginRight: "24px",
                    cursor: "pointer",
                  }}
                />
              </div>
            </Col>
          </Row>
          <Row className="loka_navbar_row">
            <Col md={12} className="loka_header_bottom">
              <Nav
                variant="underline"
                activeKey={currentTab}
                onSelect={(k) => setCurrentTab(k)}
                className="new_loka_dashboard_tab"
                style={{ width: "100%"}}
              >
                <Nav.Item>
                  <Nav.Link
                    eventKey="Textbook"
                    className={`new_loka_mob_subhead_one ${currentTab === 'Textbook' ? 'active-tab' : 'inactive-tab'}`}
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
                    className={`new_loka_mob_subhead_one ${currentTab === 'Library' ? 'active-tab' : 'inactive-tab'}`}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    Library
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>
        </div>
        <div className="loka_dashboard_container">
          {currentTab === "Textbook" && <NewLokaBookDashboard />}
          {/* {currentTab === "Library" && <LokaLibraryListing />} */}
           {currentTab === "Library" && <NewLokaLibraryDashboard />}
        </div>
      </Container>
    </div>
  );
}

export default NewNavbarLoka;
