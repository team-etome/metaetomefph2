import React, { useState } from "react";
import "../adminfacultyviewing/facultyview.css";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";

function FacultyView() {
  const [showEditBlockButtons, setShowEditBlockButtons] = useState(false);

  console.log(showEditBlockButtons, "aaaaaaaaa");

  const toggleEditBlockButtons = (e) => {
    e.preventDefault();
    console.log("edit block buttons");
    setShowEditBlockButtons(true);
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
              {window.innerWidth > 800 ? (
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
                <button
                  className="verticaldot"
                  onClick={toggleEditBlockButtons}
                >
                  <BsThreeDotsVertical />
                </button>
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
      {showEditBlockButtons && (
        <div className="editBlockButtons">
          <button className="faculty_edit">Edit</button>
          <button className="faculty_block">Block</button>
        </div>
      )}
    </div>
  );
}

export default FacultyView;
