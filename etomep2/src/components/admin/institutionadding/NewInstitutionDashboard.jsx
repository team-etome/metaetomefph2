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
import "./newinstitutiondashboard.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminClassdashboard from "../adminclassdashboard/AdminClassdashboard";
import FacultyDashboard from "../adminfacultydashboard/FacultyDashboard";
import NewFacultyDashboard from "../adminfacultydashboard/NewFacultyDashboard";
import NewAdminClassDashboard from "../adminclassdashboard/NewAdminClassDashboard";
import AdminStudentDashboard from "../adminstudentdashboard/AdminStudentDashboard";

function NewInstitutionDashboard() {
  const admininfo = useSelector((state) => state.admininfo);
  const [currentTab, setCurrentTab] = useState(
    localStorage.getItem("currentTab") || "Faculty"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  console.log(currentTab, "activa tab");
  useEffect(() => {
    localStorage.setItem("currentTab", currentTab);
  }, [currentTab]);
const handlenavigate = () => {
  navigate('/adminprofile', { state: { admininfo: admininfo.admininfo } });
};

  return (
    <div className="Institution_dashboard">
      <Container className="Institution_main_container"> 
        <div className="Institution_row_main">
          <Row className="Institution_row_header">
            <Col md={6}  className="Institution_header_left_heading">
              <div className="Institution_title">
                <p>Institution</p>
              </div>
            </Col>
            <Col md={6} className="Institution_header_right_profilepic">
              <div className="Institution_header_institution">
                <div className="Institution_hd_title">
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
          <Row className="Institution_navbar_row">
            <Col md={12} className="Institution_header_bottom">
              <Nav
                variant="underline"
                activeKey={currentTab}
                onSelect={(k) => setCurrentTab(k)}
                className="new_Institution_dashboard_tab"
                style={{ width: "100%"}}
              >
                <Nav.Item>
                  <Nav.Link
                    eventKey="Faculty"
                    className={`new_Institution_mob_subhead_one ${currentTab === 'Faculty' ? 'active-tab' : 'inactive-tab'}`}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    Faculty
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="Class"
                    className={`new_Institution_mob_subhead_one ${currentTab === 'Class' ? 'active-tab' : 'inactive-tab'}`}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    Class
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="Student"
                    className={`new_Institution_mob_subhead_one ${currentTab === 'Student' ? 'active-tab' : 'inactive-tab'}`}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    Student
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>
        </div>
        <div className="institution_dashboard_container">
              {/* {activeTab === "Faculty" && <FacultyDashboard />} */}
              {currentTab === "Faculty" && <NewFacultyDashboard />}
              {/* {currentTab === "Class" && <AdminClassdashboard />} */}
              {currentTab === "Class" && <NewAdminClassDashboard />}
              {currentTab === "Student" && <AdminStudentDashboard/>}
            </div>
      </Container>
    </div>
  );
}

export default NewInstitutionDashboard;
