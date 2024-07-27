import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { IoChevronBackSharp } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import "../adminfacultyviewing/facultyview.css";
import { FiEdit } from "react-icons/fi";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { FaSave } from "react-icons/fa";
import { MdBlockFlipped } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";
import { Tooltip as ReactTooltip } from 'react-tooltip';

function FacultyView() {
  const [showEditBlockButtons, setShowEditBlockButtons] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [action, setAction] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);

  const navigate = useNavigate();
  const APIURL = useSelector((state) => state.APIURL.url);

  console.log(action, "ssssss");

  console.log(isEditing, "editiongggggg");

  const faculty = location.state?.faculty;

  console.log(faculty, "facultyyyy");

  useEffect(() => {
    if (faculty) {
      // Initialize state with faculty data
      setFirstName(faculty.first_name || "");
      setLastName(faculty.last_name || "");
      setEmail(faculty.email || "");
      setPhoneNumber(faculty.phone_number || "");
      setGender(faculty.gender || "");
      setEmployeeId(faculty.employee_id || "");
      setIsBlocked(faculty.status || "");
    }
  }, [faculty]);

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

  const handleBlockClick = () => {
    console.log("entered in block");
    // setAction('block');
    handleBlock("block");
  };

  const handleUnBlockClick = () => {
    console.log("entered in unblock");
    // setAction('unblock');
    handleBlock("unblock");
  };
  const handleEditClick = () => {
    setIsEditing(true);
    setAction("edit");
    setShowEditBlockButtons(false);
  };

  const handleSaveClick = async () => {
    // Ask for confirmation before saving
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to save these changes?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, save it!',
      cancelButtonText: 'No, cancel!',
    });
  
    if (result.isConfirmed) {
      console.log("Entered handleSaveClick");
  
      const data = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone_number: phoneNumber,
        gender: gender,
        employee_id: employeeId,
        action: action,
      };
  
      try {
        const response = await axios.put(
          `${APIURL}/api/teacherdetails/${faculty.id}`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        console.log(response, "responseeee");
        Swal.fire({
          icon: "success",
          title: "Data edited successfully",
        }).then(() => {
          navigate("/institutionadding");
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        }).then(() => {
          navigate("/institutionadding");
        });
      }
    }
  };

  const handleBlock = async (currentAction) => {
    console.log("Entered handleBlock");

    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `You are about to ${currentAction} this faculty member.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, proceed!",
        cancelButtonText: "No, cancel",
      });

      if (result.isConfirmed) {
        const data = { is_block: currentAction };

        const response = await axios.put(
          `${APIURL}/api/teacherdetails/${faculty.id}`,
          data,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        console.log(response, "responseeee");
        Swal.fire({
          icon: "success",
          title: `Faculty ${
            currentAction ? "blocked" : "unblocked"
          } successfully`,
        }).then(() => {
          navigate("/institutionadding");
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      }).then(() => {
        navigate("/institutionadding");
      });
    }
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
              <h1 className="faculty_view_title">
                {faculty
                  ? `${faculty.first_name} ${faculty.last_name}`
                  : "Faculty Name"}
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
                  {!isEditing ? (
                    // <button className="faculty_edit" onClick={handleEditClick}>Edit</button>
                    <FiEdit
                      className="faculty_edit"
                      onClick={handleEditClick}
                      title="Edit"
                    />
                  ) : (
                    // <button className="faculty_save" onClick={handleSaveClick}>Save</button>
                    <FaSave
                      className="faculty_save"
                      onClick={handleSaveClick}
                      title="Save"
                    />
                  )}

                  {/* <button className="faculty_block">Block</button> */}
                  {/* <MdBlockFlipped  onClick={handleBlockClick}/> */}
                  {isBlocked ? (
                    <CgUnblock
                      style={{
                        width: "50px",
                        height: "50px",
                        color: "green",
                        cursor: "pointer",
                        
                      }}
                       title="Unblock"
                      onClick={handleUnBlockClick}
                    />
                  ) : (
                    <MdBlockFlipped
                      style={{ width: "50px", height: "50px", color: "red" ,cursor:"pointer"}}
                      onClick={handleBlockClick}
                      title="Block"
                    />
                  )}
                  
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
                      {!isEditing ? (
                        // <button className="faculty_edit" onClick={handleEditClick}>Edit</button>
                        <FiEdit
                          className="faculty_edit"
                          onClick={handleEditClick}
                          title="Edit"
                        />
                      ) : (
                        // <button className="faculty_save" onClick={handleSaveClick}>Save</button>
                        <FaSave
                          className="faculty_save"
                          onClick={handleSaveClick}
                          title="Save"
                        />
                      )}
                       {isBlocked ? (
                    <CgUnblock
                      style={{
                        width: "50px",
                        height: "50px",
                        color: "green",
                        cursor: "pointer",
                        
                      }}
                       title="Unblock"
                      onClick={handleUnBlockClick}
                    />
                  ) : (
                    <MdBlockFlipped
                      style={{ width: "50px", height: "50px", color: "red" ,cursor:"pointer"}}
                      onClick={handleBlockClick}
                      title="Block"
                    />
                  )}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div style={{ border: "0.5px solid #526D82" }}></div>
          </div>
          <div className="faculty_scroll">
            <Row style={{ paddingTop: "20px" }}>
              <Col md={6}>
                <div className="faculty_view_group">
                  <label htmlFor="first_name">First Name</label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={firstName}
                    readOnly={!isEditing}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="faculty_view_group">
                  <label htmlFor="last_name">Last Name</label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={lastName}
                    readOnly={!isEditing}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="faculty_view_group">
                  <label htmlFor="email_id">Email ID</label>
                  <input
                    type="email"
                    id="email_id"
                    name="email_id"
                    value={email}
                    readOnly={!isEditing}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </Col>
              <Col md={6}>
                <div className="faculty_view_group">
                  <label htmlFor="phone_no">Phone No</label>
                  <input
                    type="text"
                    id="phone_no"
                    name="phone_no"
                    value={phoneNumber}
                    readOnly={!isEditing}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="faculty_view_group">
                  <label htmlFor="gender">Gender</label>
                  <input
                    type="text"
                    id="gender"
                    name="gender"
                    value={gender}
                    readOnly={!isEditing}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>
                <div className="faculty_view_group">
                  <label htmlFor="employee_id">Employee Id</label>
                  <input
                    type="text"
                    id="employee_id"
                    name="employee_id"
                    value={employeeId}
                    readOnly={!isEditing}
                    onChange={(e) => setEmployeeId(e.target.value)}
                  />
                </div>
                {/* <div className="faculty_view_group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" value={faculty ? faculty.subject : ''} readOnly />
              </div> */}
              </Col>
            </Row>
          </div>
        </form>
        <Row className="subject_class_row">
          <div className="subject_class">
            <div>
              <h6>Subject Fields</h6>
            </div>
            <Col>
              <div className="subject_class_card">
                <div className="subject_class_body">
                  <h6>English</h6>
                  <div className="class_card">
                    <div className="card_class_number">1</div>
                    <div className="card_class_number">1</div>
                    <div className="card_class_number">1</div>
                  </div>
                </div>
              </div>
            </Col>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default FacultyView;
