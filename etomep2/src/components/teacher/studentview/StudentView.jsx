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
import { IoMdClose } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import defaultimage from '../../../../src/assets/default.jpg'
function StudentView() {
  const [showEditBlockButtons, setShowEditBlockButtons] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isBlocked, setIsBlocked] = useState(false);
  const [image, setImage] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false); // New state for edit mode

  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const location = useLocation();
  const { student } = location.state || {};



  console.log(student , "student");

  const APIURL = useSelector((state) => state.APIURL.url || "");

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
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create an object URL for the selected file
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl); // Set the uploaded image URL
      // setIsEditMode(false)
    }
  };

  const handleEditClick = (event) => {
    event.preventDefault();

    if (isEditMode) {
      handleSave();
    } else {
      setIsEditMode(true);
    }
  };

  const handleClose = () => {
    setIsEditMode(false);
  };

  const handleSave = async () => {
    // Validate data before saving
    if (!student.id || !image) {
      alert("Missing student ID or image. Please ensure all fields are set.");
      return;
    }
  
    const data = new FormData();
    data.append("student_id", student.id);
  
    // Ensure that the image is correctly appended
    const fileInput = document.querySelector('input[name="image"]');
    const file = fileInput ? fileInput.files[0] : null;
    
    if (!file) {
      alert("No image selected!");
      return;
    }
    
    data.append("image", file);  // Append the selected file correctly
  
    try {
      const response = await axios.put(
        `${APIURL}/api/addstudent`, 
        data, 
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.status === 200) {
        alert("Student data saved successfully!");
        setIsEditMode(false); // Exit edit mode after saving
      } else {
        alert("Failed to save data. Please try again.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("An error occurred. Please check the console for details.");
    }
  };

  return (
    <div>
      <Container className="teacher_student_view_container">
        <form className="teacher_student_view_form">
          <div className="teacher_student_header">
            <h1 className="teaher_student_view_title">
              {student.student_name}{" "}
            </h1>
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

                <button
                  type="button"
                  className="teacher_student_edit"
                  onClick={handleEditClick}
                >
                  {isEditMode ? "Save" : "Edit"}
                </button>

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
                    <FiEdit className="teacher_student_edit" />
                  </div>
                )}
              </div>
            )}
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
                {isEditMode ? (
                  <div
                    style={{
                      width: "180px",
                      marginLeft: "2px",
                      height: "217px",
                      position: "relative",
                      border: "2px solid black",
                    }}
                  >
                    {/* Close Button */}
                    <IoMdClose
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "10px",
                        cursor: "pointer",
                        zIndex: 2,
                      }}
                      onClick={handleClose}
                    />

                    {/* Uploaded Image Preview */}
                    {image && (
                      <img
                        src={image}
                        alt="Uploaded Preview"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          position: "absolute",
                          top: 0,
                          left: 0,
                          zIndex: 1,
                        }}
                      />
                    )}

                    {/* File Input */}
                    <input
                      type="file"
                      id="image"
                      name="image"
                      onChange={handleImageChange}
                      className="student_image_upload"
                      style={{
                        position: "absolute",
                        bottom: "10px",
                        left: "10px",
                        zIndex: 3,

                        padding: "5px",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                ) : (
                  // Display current image when not in edit mode
                  <div
                    style={{
                      border: "2px solid black",
                      width: "180px",
                      marginLeft: "2px",
                      height: "217px",
                    }}
                  >
                    <img
                      src={student.image || defaultimage}
                      alt="Profile"
                      className="teacher_profile_picture"
                    />
                  </div>
                )}
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
                    value={student.standard}
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
              </Col>
              <Col md={3}>
                <div className="teacher_school_info">
                  <label htmlFor="join_date">Joining Date</label>
                  <input
                    type="text"
                    id="join_date"
                    name="join_date"
                    value={student.start_date}
                    style={{ paddingBottom: "10px", marginTop: "0vh" }}
                    readOnly
                  />
                </div>
              </Col>
            </Row>
          </div>

          {/* Block / Unblock */}
          <div className="teacher_student_button_group">
            <Button
              variant={isBlocked ? "success" : "danger"}
              className="teacher_student_button"
              onClick={() => setIsBlocked(!isBlocked)}
            >
              {isBlocked ? <CgUnblock /> : <MdBlockFlipped />}
              {isBlocked ? "Unblock" : "Block"}
            </Button>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="outline-primary" onClick={handleBackClick}>
              <IoChevronBackSharp /> Back
            </Button>
          </div>
        </form>
      </Container>

      {/* Modal for confirming action */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Do you want to save changes?</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default StudentView;
