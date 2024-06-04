import React from 'react'
import "../adminstudentview/studentview.css"
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";

function StudentView() {
  return (
    <div>
    <Container className="student_view_container">
      <form className="student_view_form">
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <Link to="/institutionadding">
              <IoChevronBackSharp className="student_view_back" />
            </Link>
            <h1 className="student_view_title">Catherine Jose</h1>
          </div>
          <div style={{ border: "0.5px solid #526D82" }}></div>
        </div>
        <Row style={{ paddingTop: "20px"}} className='personal_info'>
            <div className='student_title'>
                <h4>Personal Information</h4>
            </div>

          <Col md={4}>
            <div className='personal_info_field'>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="clasnames_no" readOnly />
            </div>
            <div className='personal_info_field'>
              <label htmlFor="dob">DOB</label>
              <input type="text" id="dob" name="dob" readOnly />
            </div>
            <div className='personal_info_field'>
              <label htmlFor="email">Email Id</label>
              <input type="text" id="email" name="email" readOnly />
            </div>
            <div className='personal_info_field'>
              <label htmlFor="address">Address</label>
              <input type="text" id="address" name="address" readOnly />
            </div>
            <div className='personal_info_field'>
              <label htmlFor="pincode">Pincode</label>
              <input type="text" id="addpincoderess" name="pincode" readOnly />
            </div>
          </Col>
          <Col md={4}>
            <div className='personal_info_field'>
              <label htmlFor="gender">Gender</label>
              <input type="text" id="gender" name="gender" readOnly />
            </div>
            <div className='personal_info_field'>
              <label htmlFor="f_name">Father Name</label>
              <input type="text" id="f_name" name="f_name" readOnly />
            </div>
            <div className='personal_info_field'>
              <label htmlFor="m_name">Mother Name</label>
              <input type="text" id="m_name" name="m_name" readOnly />
            </div>
            <div className='personal_info_field'>
              <label htmlFor="g_name">Guardian Name</label>
              <input type="text" id="g_name" name="g_name" readOnly />
            </div>
            <div className='personal_info_field'>
              <label htmlFor="phone">Phone No</label>
              <input type="text" id="phone" name="phone" readOnly />
            </div>
          </Col>
          <Col md={4}>
          </Col>
        </Row>
        <Row style={{ paddingTop: "20px" }}>
            <div className='student_title'>
                <h4>School Information</h4>
            </div>

          <Col md={2}>
            <div>
              <label htmlFor="standard">Standard</label>
              <input type="text" id="standard" name="standard" readOnly />
            </div>
          </Col>
          <Col md={2}>
            <div>
              <label htmlFor="admin_no">Admission Number</label>
              <input type="text" id="admin_no" name="admin_no" readOnly />
            </div>
          </Col>
          <Col md={2}>
            <div>
              <label htmlFor="roll_no">Roll No</label>
              <input type="text" id="roll_no" name="roll_no" readOnly />
            </div>
          </Col>
          <Col md={2}>
            <div>
              <label htmlFor="category">Category</label>
              <input type="text" id="category" name="category" readOnly />
            </div>
          </Col>
          <Col md={2}>
            <div>
              <label htmlFor="join_date">Joining Date</label>
              <input type="text" id="join_date" name="join_date" readOnly />
            </div>
          </Col>
        </Row>
        <Row style={{ paddingTop: "20px" }}>
            <div className='student_title'>
                <h4>Result</h4>
            </div>
        </Row>
      </form>
    </Container>
  </div>
  )
}

export default StudentView