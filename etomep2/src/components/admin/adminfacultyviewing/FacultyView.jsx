import React, { useState, useEffect, useRef } from "react";
import "../adminfacultyviewing/facultyview.css";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";

function FacultyView() {
  const [showEditBlockButtons, setShowEditBlockButtons] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dropdownRef = useRef(null);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowEditBlockButtons(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleEditBlockButtons = (e) => {
    e.preventDefault();
    setShowEditBlockButtons((prevState) => !prevState);
  };

  return (
    <div>
      <Container className="faculty_view_container">
        <form className="faculty_view_form">
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <Link to="/institutionadding">
                <IoChevronBackSharp className="faculty_view_back" />
              </Link>
              <h1 className="faculty_view_title">Sneha</h1>
              <div style={{ flex: "1" }}></div>
              {windowWidth > 800 ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "20px",
                    paddingRight: "30px",
                  }}
                >
                  <button className="faculty_edit">Edit</button>
                  <button className="faculty_block">Block</button>
                </div>
              ) : (
                <div style={{ position: "relative" }} ref={dropdownRef}>
                  <button
                    className="verticaldot"
                    onClick={toggleEditBlockButtons}
                  >
                    <BsThreeDotsVertical />
                  </button>
                  {showEditBlockButtons && (
                    <div
                      style={{
                        position: "absolute",
                        right: "0",
                        backgroundColor: "white",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                        borderRadius: "5px",
                        padding: "10px",
                        zIndex: "1000",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <button className="faculty_edit">Edit</button>
                      <button className="faculty_block">Block</button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div style={{ border: "0.5px solid #526D82" }}></div>
          </div>
          <Row style={{ paddingTop: "20px" }}>
            <Col md={6}>
              <div className="faculty_view_group">
                <label htmlFor="first_name">First Name</label>
                <input type="text" id="first_name" name="first_name" readOnly />
              </div>
              <div className="faculty_view_group">
                <label htmlFor="last_name">Last Name</label>
                <input type="text" id="last_name" name="last_name" readOnly />
              </div>
              <div className="faculty_view_group">
                <label htmlFor="email_id">Email ID</label>
                <input type="email" id="email_id" name="email_id" readOnly />
              </div>
              <div className="faculty_view_group">
                <label htmlFor="employee_id">Employee Id</label>
                <input
                  type="text"
                  id="employee_id"
                  name="employee_id"
                  readOnly
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="faculty_view_group">
                <label htmlFor="phone_no">Phone No:</label>
                <input type="text" id="phone_no" name="phone_no" readOnly />
              </div>
              <div className="faculty_view_group">
                <label htmlFor="gender">Gender</label>
                <input type="text" id="gender" name="gender" readOnly />
              </div>
              <div className="faculty_view_group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" readOnly />
              </div>
            </Col>
          </Row>
        </form>
      </Container>
    </div>
  );
}

export default FacultyView;
