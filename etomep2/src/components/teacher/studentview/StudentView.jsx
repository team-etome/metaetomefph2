import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { PiGraduationCap } from "react-icons/pi";
import amritha from "../../../assets/amritha.png";
import { FaSave } from "react-icons/fa";
import { MdBlockFlipped } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";
import "../studentview/studentview.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useLocation } from "react-router-dom";

function StudentView() {
  const [showEditBlockButtons, setShowEditBlockButtons] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isBlocked, setIsBlocked] = useState(false);


  const navigate = useNavigate();

  const dropdownRef = useRef(null);

  const location = useLocation();
  const { student } = location.state || {};
  // const classDetails = location.state?.student;


  console.log(student, "studetn");

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowEditBlockButtons(false);
    }
  };

  const handleBackClick = () => {
    navigate("/teacherstudentdashboard");
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
      <Container className="teacher_student_view_container">
        <form className="teacher_student_view_form">
          <div className="teacher_student_header">
            {/* <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            > */}
            {/* <Link to="/teacherstudentdashboard"> */}
            {/* <IoChevronBackSharp onClick={handleBackClick} className="teacher_student_view_back" /> */}
            {/* </Link> */}
            <h1 className="teaher_student_view_title">{student.student_name} </h1>
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
                {/* <MdDelete className='teacher_student_edit'/> */}
                <button className="teacher_student_edit">Edit</button>
              </div>
            ) : (
              <div style={{ position: "relative" }} ref={dropdownRef}>
                <button
                  className="teacher_student_verticaldot"
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
                    <FiEdit className='teacher_student_edit' />

                  </div>
                )}
              </div>
            )}
            {/* </div> */}

            {/* </div> */}
            {/* <div style={{ border: "0.5px solid #526D82" }}></div> */}
          </div>
          <div className="teacher_student_scrollable">
            <Row
              style={{ paddingTop: "20px" }}
              className="teacher_personal_info"
            >
              <div className="teacher_student_title">
                <h4>Personal Information</h4>
              </div>

              <Col md={4}>
                <div className="teacher_personal_info_field">
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
                <div className="teacher_personal_info_field">
                  <label htmlFor="dob">DOB</label>
                  <input
                    type="text"
                    id="dob"
                    name="dob"
                    value={student.dob}
                    readOnly
                  />
                </div>
                <div className="teacher_personal_info_field">
                  <label htmlFor="email">Email Id</label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={student.email}
                    readOnly
                  />
                </div>
                <div className="teacher_personal_info_field">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={student.address}
                    readOnly
                  />
                </div>
              </Col>
              <Col md={4}>
                <div className="teacher_personal_info_field">
                  <label htmlFor="gender">Gender</label>
                  <input
                    type="text"
                    id="gender"
                    name="gender"
                    value={student.gender}
                    readOnly
                  />
                </div>
                <div className="teacher_personal_info_field">
                  <label htmlFor="f_name">Father Name</label>
                  <input
                    type="text"
                    id="f_name"
                    name="f_name"
                    value={student.fathers_name}
                    readOnly
                  />
                </div>
                <div className="teacher_personal_info_field">
                  <label htmlFor="m_name">Mother Name</label>
                  <input
                    type="text"
                    id="m_name"
                    name="m_name"
                    value={student.mothers_name}
                    readOnly
                  />
                </div>
                <div className="teacher_personal_info_field">
                  <label htmlFor="g_name">Guardian</label>
                  <input
                    type="text"
                    id="g_name"
                    name="g_name"
                    value={student.guardian}
                    readOnly
                  />
                </div>
                <div className="teacher_personal_info_field">
                  <label htmlFor="phone">Phone No</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={student.number}
                    readOnly
                  />
                </div>
              </Col>
              <Col md={4}>
                <div>
                  <img src={amritha} alt="" className='teacher_profile_picture' />
                </div>
              </Col>
            </Row>
            <Row style={{ paddingTop: "20px" }}>
              <div className="teacher_student_heading">
                <div className="teacher_student_title">
                  <h4>School Information</h4>
                </div>
              </div>
              <Col md={4}>
                <div className="teacher_school_info">
                  <label htmlFor="standard">Standard</label>
                  <input
                    type="text"
                    id="standard"
                    name="standard"
                    value={student.class_name}
                    readOnly
                  />
                </div>
                <div className="teacher_school_info">
                  <label htmlFor="admin_no">Admission Number</label>
                  <input
                    type="text"
                    id="admin_no"
                    name="admin_no"
                    value={student.admission_no}
                    readOnly
                  />
                </div>
              </Col>
              <Col md={4}>
                <div className="teacher_school_info">
                  <label htmlFor="roll_no">Roll No</label>
                  <input
                    type="text"
                    id="roll_no"
                    name="roll_no"
                    value={student.roll_no}
                    readOnly
                  />
                </div>
                {/* <div className="teacher_school_info">
                  <label htmlFor="category">Category</label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value="Science"
                    readOnly
                  />
                </div> */}
              </Col>

              <Col md={3}>
                <div className="teacher_school_info" >
                  <label htmlFor="join_date">Joining Date</label>
                  <input
                    type="text"
                    id="join_date"
                    name="join_date"
                    value={student.start_date}
                    style={{ paddingBottom: '10px', marginTop: '0vh' }}
                    readOnly
                  />
                </div>
                {/* <div className="teacher_school_info">
                  <label htmlFor="academic_year">Academic Year</label>
                  <input
                    type="text"
                    id="academic_year"
                    name="academic_year"
                    value="2024-2025"
                    readOnly
                  />
                </div> */}
              </Col>
            </Row>

            <Row className="mt-4">
              <div className="teacher_result_heading">
                <div className="teacher_student_title">
                  <Button onClick={handleSubmit}>
                    <PiGraduationCap />
                    &nbsp; Results
                  </Button>
                </div>
              </div>
            </Row>
          </div>
        </form>
      </Container>
      <Modal show={showModal} onHide={handleCloseModal} centered size="xl">
        <Modal.Header
          closeButton
          style={{ border: "none", paddingBottom: "0px" }}
        >
          {/* <Modal.Title >Student Results</Modal.Title> */}
        </Modal.Header>
        <Modal.Body style={{ paddingTop: "0px" }}>
          <div className="teacher_result_view_scrollable">
            <table className="table">
              <thead>
                <tr>
                  <th>Terms</th>
                  <th className="vertical-text">English</th>
                  <th className="vertical-text">Malayalam</th>
                  <th className="vertical-text">Social Science</th>
                  <th className="vertical-text">Physics</th>
                  <th className="vertical-text">Chemistry</th>
                  <th className="vertical-text">Biology</th>
                  <th className="vertical-text">IT</th>
                  <th className="vertical-text">Maths</th>
                  <th>Total Mark</th>
                  <th>Obtained Mark</th>
                  <th>Progress</th>
                </tr>
              </thead>
              {/* <tbody>
                {student.map(student => (
                  <tr >
                    <td>{student.term}</td>
                    <td className="no-border-right">{student.scores.English}</td>
                    <td className="no-border-right">{student.scores.Malayalam}</td>
                    <td className="no-border-right">{student.scores.SocialScience}</td>
                    <td className="no-border-right">{student.scores.Physics}</td>
                    <td className="no-border-right">{student.scores.Chemistry}</td>
                    <td className="no-border-right">{student.scores.Biology}</td>
                    <td className="no-border-right">{student.scores.IT}</td>
                    <td className="no-border-right">{student.scores.Maths}</td>
                    <td>{student.totalMark}</td>
                    <td>{student.obtainedMark}</td>
                    <td>{student.progress}</td>
                  </tr>
                ))}
              </tbody> */}
            </table>
          </div>
        </Modal.Body>
        {/* <Modal.Footer style={{ border: 'none' }}>
  <Link to="/aarnanavbar" style={{ textDecoration: 'none' }}>
    <Button variant="primary" onClick={handleCloseModal} className='modal_submit'>
      Submit
    </Button>
  </Link>
</Modal.Footer> */}
      </Modal>
    </div>
  );
}

export default StudentView;
