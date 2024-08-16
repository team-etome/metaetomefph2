import React from "react";
import "../adminstudentview/studentview.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import amritha from "../../../assets/amritha.png";
import { useLocation } from "react-router-dom";

function StudentView() {
  const location = useLocation();
  const { student } = location.state || {};

  const subjects = [
    { name: "English", score: 100 },
    { name: "Maths", score: 98 },
    { name: "Hindi", score: 98 },
    { name: "Physics", score: 98 },
    { name: "Chemistry", score: 98 },
    { name: "Biology", score: 98 },
  ];

  return (
    <div>
      <Container className="student_view_container">
        <form className="student_view_form">
          <div className="student_header">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              {/* <Link to={`/studentlist/${student.class_name}`}>
              <IoChevronBackSharp className="student_view_back" />
            </Link> */}
              <h1 className="student_view_title">{student.student_name}</h1>
            </div>
            {/* <div style={{ border: "0.5px solid #526D82" }}></div> */}
          </div>
          <div className="student_scrollable">
            <Row style={{ paddingTop: "20px" }} className="personal_info">
              <div className="student_title">
                <h4>Personal Information</h4>
              </div>

              <Col md={4}>
                <div className="personal_info_field">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="clasnames_no"
                    value={student.student_name}
                    readOnly
                    style={{ color: "#68B670", fontWeight: "600" }}
                  />
                </div>
                <div className="personal_info_field">
                  <label htmlFor="dob">DOB</label>
                  <input
                    type="text"
                    id="dob"
                    name="dob"
                    value={student.dob || ""}
                    readOnly
                  />
                </div>
                <div className="personal_info_field">
                  <label htmlFor="email">Email Id</label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={student.email || ""}
                    readOnly
                  />
                </div>
                <div className="personal_info_field">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={student.address || ""}
                    readOnly
                  />
                </div>
                {/* <div className='personal_info_field'>
              <label htmlFor="pincode">Pincode</label>
              <input type="text" id="addpincoderess" value={student.pincode || ''} name="pincode" readOnly />
            </div> */}
              </Col>
              <Col md={4}>
                <div className="personal_info_field">
                  <label htmlFor="gender">Gender</label>
                  <input
                    type="text"
                    id="gender"
                    value={student.gender || ""}
                    name="gender"
                    readOnly
                  />
                </div>
                <div className="personal_info_field">
                  <label htmlFor="f_name">Father Name</label>
                  <input
                    type="text"
                    id="f_name"
                    value={student.fathers_name || ""}
                    name="f_name"
                    readOnly
                  />
                </div>
                <div className="personal_info_field">
                  <label htmlFor="m_name">Mother Name</label>
                  <input
                    type="text"
                    id="m_name"
                    name="m_name"
                    value={student.mothers_name || ""}
                    readOnly
                  />
                </div>
                <div className="personal_info_field">
                  <label htmlFor="g_name">Guardian Name</label>
                  <input
                    type="text"
                    id="g_name"
                    name="g_name"
                    value={student.guardian || ""}
                    readOnly
                  />
                </div>
                <div className="personal_info_field">
                  <label htmlFor="phone">Phone No</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={student.number || ""}
                    readOnly
                  />
                </div>
              </Col>
              <Col md={4}>
                <div>
                  <img src={amritha} alt="" className="profile_picture" />
                </div>
              </Col>
            </Row>
            <Row style={{ paddingTop: "20px" }}>
              <div className="student_heading">
                <div className="student_title">
                  <h4>School Information</h4>
                </div>
              </div>
              <Col md={4}>
                <div className="school_info">
                  <label htmlFor="standard">Standard</label>
                  <input
                    type="text"
                    id="standard"
                    name="standard"
                    value="11 B"
                    readOnly
                  />
                </div>
                <div className="school_info">
                  <label htmlFor="admin_no">Admission Number</label>
                  <input
                    type="text"
                    id="admin_no"
                    name="admin_no"
                    value={student.admission_no || ""}
                    readOnly
                  />
                </div>
              </Col>
              <Col md={4}>
                <div className="school_info">
                  <label htmlFor="roll_no">Roll No</label>
                  <input
                    type="text"
                    id="roll_no"
                    name="roll_no"
                    value={student.roll_no || ""}
                    readOnly
                  />
                </div>
                <div className="school_info">
                  <label htmlFor="category">Category</label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value="Science"
                    readOnly
                  />
                </div>
              </Col>

              <Col md={4}>
                <div className="school_info">
                  <label htmlFor="join_date">Joining Date</label>
                  <input
                    type="text"
                    id="join_date"
                    name="join_date"
                    value={
                      student.start_date ? student.start_date.split(" ")[0] : ""
                    }
                    readOnly
                  />
                </div>
                <div className="school_info">
                  <label htmlFor="academic_year">Academic Year</label>
                  <input
                    type="text"
                    id="academic_year"
                    name="academic_year"
                    value="2024-2025"
                    readOnly
                  />
                </div>
              </Col>
            </Row>

            {/* <Row className="mt-4">
              <div className="result_heading">
                <div className="student_title">
                  <button className="student_result_view_button">
                    View Results
                  </button>
                </div>
              </div>
            </Row> */}
            {/* <Col>
          <h5 className="mb-2" style={{display:'flex', justifyContent:'center', color:'#526D82', fontSize:'20px', fontWeight:'100px'}}>First Term</h5>
          <div className="results_container">
          <div className="results-header">
            <div className="header-subject-name">Subject Name</div>
            <div className="header-subject-score">Result</div>
          </div>
            {subjects.map((subject, index) => (
              <div key={index} className="subject_container">
                <div className="subject_name">{subject.name}</div>
                <div className="subject_score">{subject.score}</div>
              </div>
            ))}
          </div>
        </Col> */}
          </div>
        </form>
      </Container>
    </div>
  );
}

export default StudentView;
