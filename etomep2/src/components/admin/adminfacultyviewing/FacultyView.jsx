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
import { Tooltip as ReactTooltip } from "react-tooltip";
import Select from "react-select";

function FacultyView() {
  const [showEditBlockButtons, setShowEditBlockButtons] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dropdownRef = useRef(null);
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

  const location = useLocation();

  const faculty = location.state?.faculty;

  console.log(action, "ssssss");

  console.log(isEditing, "editiongggggg");

  // const faculty = location.state?.faculty;

  console.log(faculty, "facultyyyy");

  const customStyles = {
    control: (base, state) => ({
      ...base,
      width: "95%",
      minHeight: "40px",
      height: "50px",
      border: "1px solid #526D82",
      borderRadius: "8px",
      boxShadow: state.isFocused ? "0 0 0 1px #526D82" : "none",
      "&:hover": {
        borderColor: "none",
      },
      "&:focus": {
        borderColor: "#526D82",
        outline: "none",
      },
    }),
    placeholder: (base) => ({
      ...base,
      color: "#526D82",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#000",
    }),
    option: (base) => ({
      ...base,
      color: "#000",
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "0 10px",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "#526D82",
      paddingTop: "0px",
    }),
    indicatorSeparator: (base) => ({
      display: "none",
    }),
    indicatorsContainer: (base) => ({
      ...base,
      alignItems: "center",
    }),

    menu: (base) => ({
      ...base,
      zIndex: 9999,
      position: "absolute",
      width: "89%",
      maxHeight: "150px",
      overflowY: "auto",
    }),
    menuList: (base) => ({
      ...base,
      maxHeight: "150px",
      overflowY: "auto",
      paddingRight: "10px",
    }),
  };

  const genderOptions = [
    { value: "Female", label: "Female" },
    { value: "Male", label: "Male" },
    { value: "Other", label: "Other" },
  ];

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
      title: "Are you sure?",
      text: "Do you want to save these changes?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, save it!",
      cancelButtonText: "No, cancel!",
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
    console.log(currentAction, "current action");
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
          title: `Faculty ${currentAction === "block" ? "blocked" : "unblocked"
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
  console.log(faculty.curriculam, "egffffffr")

  return (
    <div>
      <Container className="faculty_view_container">
        <form className="faculty_view_form">
          <div>
            <div className="faculty_view_header"
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              {/* <Link to="/institutionadding"> */}
              {/* <IoChevronBackSharp onClick={handleBackClick} className="faculty_view_back" /> */}
              {/* </Link> */}
              <h1 className="faculty_view_title">
                {faculty
                  ? `${faculty.first_name} ${faculty.last_name}`
                  : "Faculty Name"}
              </h1>
              <div style={{ flex: "1", }}></div>
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
                    // <FiEdit
                    //   className="faculty_edit"
                    //   onClick={handleEditClick}
                    //   title="Edit"
                    // />
                    <div
                      style={{
                        width: "70px",
                        height: "40px",
                        color: "#526D82",
                        cursor: "pointer",
                        padding: "10px",
                        border: "1px solid #526D82",
                        borderRadius: "10px"
                      }}
                      onClick={handleEditClick}
                    ><p
                      style={{
                        paddingLeft: "10px",
                      }}>Edit</p></div>
                  ) : (
                    // <button className="faculty_save" onClick={handleSaveClick}>Save</button>
                    // <FaSave
                    //   className="faculty_save"
                    //   onClick={handleSaveClick}
                    //   title="Save"
                    // />
                    <div
                      style={{
                        width: "70px",
                        height: "40px",
                        color: "#526D82",
                        cursor: "pointer",
                        padding: "10px",
                        border: "1px solid #526D82",
                        borderRadius: "10px"
                      }}
                      onClick={handleSaveClick}
                    ><p
                      style={{
                        paddingLeft: "10px",
                      }}>Save</p></div>
                  )}

                  {/* <button className="faculty_block">Block</button> */}
                  {/* <MdBlockFlipped  onClick={handleBlockClick}/> */}
                  {isBlocked ? (
                    // <CgUnblock
                    //   // className="faculty_block"
                    //   style={{
                    //     width: "40px",
                    //     height: "50px",
                    //     color: "green",
                    //     cursor: "pointer",
                    //   }}
                    //   title="Unblock"
                    //   onClick={handleUnBlockClick}
                    // />
                    <div
                      style={{
                        width: "80px",
                        height: "40px",
                        color: "green",
                        cursor: "pointer",
                        background: "#FDE9E6",
                        padding: "10px",
                        borderRadius: "10px"
                      }}
                      onClick={handleUnBlockClick}
                    ><p>Unblock</p></div>
                  ) : (
                    // <MdBlockFlipped
                    //   style={{
                    //     width: "40px",
                    //     height: "50px",
                    //     color: "red",
                    //     cursor: "pointer",
                    //   }}
                    //   onClick={handleBlockClick}
                    //   title="Block"
                    // />
                    <div style={{
                      width: "80px",
                      height: "40px",
                      color: "red",
                      cursor: "pointer",
                      background: "#FDE9E6",
                      padding: "10px",
                      borderRadius: "10px"
                    }}
                      onClick={handleBlockClick}
                    ><p style={{
                      paddingLeft: "10px",
                    }}>Block</p></div>
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
                          style={{
                            width: "50px",
                            height: "50px",
                            color: "red",
                            cursor: "pointer",
                          }}
                          onClick={handleBlockClick}
                          title="Block"
                        />
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* <div style={{ border: "0.5px solid #526D82" }}></div> */}
          </div>
          <div className="faculty_scroll" >
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
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Allow only alphabets and spaces
                      setFirstName(value);
                    }}
                    style={{ textTransform: "capitalize" }}
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
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Allow only alphabets and spaces
                      setLastName(value);
                    }}
                    style={{ textTransform: "capitalize" }}
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
                    maxLength="10"
                    inputMode="numeric"  // shows numeric keyboard on mobile devices
                    onChange={(e) => {
                      // Remove non-digits and update state
                      const onlyDigits = e.target.value.replace(/\D/g, "");
                      setPhoneNumber(onlyDigits);
                    }}
                  />
                </div>

                {/* <div className="faculty_view_group">
                  <label htmlFor="phone_no">Phone No</label>
                  <input
                    type="number"
                    id="phone_no"
                    name="phone_no"
                    value={phoneNumber}
                    readOnly={!isEditing}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div> */}

                {/* <div className="faculty_view_group">
                  <label htmlFor="gender">Gender</label>
                  <input
                    type="text"
                    id="gender"
                    name="gender"
                    value={gender}
                    readOnly={!isEditing}
                    style={{ textTransform: "capitalize" }}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div> */}

                <div className="faculty_view_group">
                  <label htmlFor="gender">Gender</label>
                  {isEditing ? (
                    <Select
                      options={genderOptions}
                      styles={customStyles}
                      value={genderOptions.find(
                        (option) => option.value === gender
                      )}
                      onChange={setGender}
                      placeholder=""
                      style={{ textTransform: "capitalize" }}
                      maxLength={10}
                    />
                  ) : (
                    <input
                      type="text"
                      id="gender"
                      name="gender"
                      value={gender}
                      readOnly
                      style={{ textTransform: "capitalize" }}
                    />
                  )}
                </div>

                <div className="faculty_view_group">
                  <label htmlFor="employee_id">Employee Id</label>
                  <input
                    type="text"
                    id="employee_id"
                    name="employee_id"
                    value={employeeId}
                    readOnly={!isEditing}
                    style={{ textTransform: "capitalize" }}
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
                {/* {faculty.curriculam && faculty.curriculam.length > 0 ? (
              faculty.curriculam.map((subject, index) => (
                    <div key={index} className="subject_class_body">
                      <h6>{subject.subject_name}</h6>
                      <div className="class_card">
                        <p>Class:</p>
                        <div className="card_class_number">
                          {subject.class_name}
                        </div>
                      </div>
                    </div>
                      ))
                    ) : (
                      <p>No subjects assigned</p>
                    )} */}
                {/* {faculty?.curriculam?.length > 0 ? (
                  faculty.curriculam.map((subject, index) => (
                    <div key={index} className="subject_class_body">
                      <h6>{subject.subject_name}</h6>
                      <div className="class_card">
                        <div className="card_class_number">
                          {subject.class_name}
                          {subject.division}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No subjects assigned</p>
                )} */}

                {faculty?.curriculam?.length > 0 ? (
                  Object.values(
                    faculty.curriculam.reduce((acc, subject) => {
                      if (!acc[subject.subject_name]) {
                        acc[subject.subject_name] = {
                          subject_name: subject.subject_name,
                          classes: [],
                        };
                      }
                      acc[subject.subject_name].classes.push(`${subject.class_name} ${subject.division}`);
                      return acc;
                    }, {})
                  ).map((subjectGroup, index) => (
                    <div key={index} className="subject_class_body" style={{ border: "2px solid black" }}>
                      <h6>{subjectGroup.subject_name}</h6>
                      <div className="class_card" >
                        {subjectGroup.classes.map((classData, idx) => (
                          <div key={idx} className="card_class_number">
                            {classData}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No subjects assigned</p>
                )}
              </div>
            </Col>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default FacultyView;
