import React, { useState, useRef, useEffect } from "react";
import { Col, Container, Row, Button, Form, Spinner, Modal } from "react-bootstrap";
import { IoIosAdd, IoMdDownload, IoMdAdd } from "react-icons/io";
import { MdUpload, MdOutlineCalendarMonth } from "react-icons/md";
import studentexcel from "../../utils/studentexcel";
import { BsSearch } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../studentdashboard/studentdashboard.css";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import axios from "axios";


function StudentDashboard() {
  const [isActive, setIsActive] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [file, setFile] = useState(null);
  const [studentlist, setStudentList] = useState([]);
  const [standard, setStandard] = useState("");
  const [division, setDivision] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const APIURL = useSelector((state) => state.APIURL.url);
  const teacher = useSelector((state) => state.teacherinfo);
  const teacher_id = teacher.teacherinfo?.teacher_id;

  const [selectAll, setSelectAll] = useState(false); // State for "Select All"

  const [search, setSearch] = useState("");
  const [filteredStudentList, setFilteredStudentList] = useState([]);
  const [showModal, setShowModal] = useState(false); // Modal state
  const [selectedDivision, setSelectedDivision] = useState("Division A");


  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const toggleSelectAll = () => {
    setSelectAll(!selectAll); // Toggle "Select All" state
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const openFileSelector = () => {
    fileInputRef.current.click();
  };

  const handleAddClick = () => {
    setShowOptions(!showOptions);
  };

  const handleClick = (item) => {
    navigate("/teacherstudentview", { state: { student: item } });
  };

  // const handleFileUpload = async () => {
  //   if (!file) return;
  //   setIsLoading(true);
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("teacher", teacher_id);

  //   try {
  //     await axios.post(`${APIURL}/api/studentexcel`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     // Handle success (e.g., show a success message, refresh student list)
  //   } catch (error) {
  //     console.error("Failed to upload file:", error);
  //     // Handle error (e.g., show an error message)
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  // Fetch student list data
  const fetchFacultyData = async () => {
    try {
      const response = await axios.get(`${APIURL}/api/addstudent/${teacher_id}`);
      setStudentList(response.data);
      setStandard(response.data[0].standard);
      setDivision(response.data[0].division);
    } catch (error) {
      console.error("Failed to fetch faculty data:", error);
    }
  };

  // File upload with error handling and success message
  const handleFileUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("teacher", teacher_id);

    try {
      Swal.fire({
        title: "Uploading...",
        text: "Please wait while the file is being uploaded.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      console.log("Starting file upload...");
      const response = await axios.post(`${APIURL}/api/studentexcel`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("File uploaded successfully:", response);

      Swal.fire({
        icon: "success",
        title: "Upload Successful",
        text: "File has been uploaded successfully.",
      });

      // Refresh the student list
      await fetchFacultyData();
      setShowOptions(false);
      setFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);

      let errorMessage = "An error occurred during file upload.";
      if (error.response) {
        if (typeof error.response.data === "string") {
          errorMessage = error.response.data;
        } else if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      }

      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };


  // useEffect(() => {
  //   const fetchFacultyData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${APIURL}/api/addstudent/${teacher_id}`
  //       );
  //       setStudentList(response.data);
  //       setStandard(response.data[0].standard);
  //       setDivision(response.data[0].division);
  //     } catch (error) {
  //       console.error("Failed to fetch faculty data:", error);
  //     }
  //   };
  //   fetchFacultyData();
  // }, [APIURL, teacher_id]);

  useEffect(() => {
    fetchFacultyData();
  }, [APIURL, teacher_id]);


  useEffect(() => {
    setFilteredStudentList(
      studentlist.filter((student) =>
        student.student_name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, studentlist]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    // Fetch student data
    const exampleData = [
      { id: 1, student_name: "Dilna Marry Jhone", roll_no: "316587" },
      { id: 2, student_name: "Student Two", roll_no: "316588" },
      { id: 3, student_name: "Student Three", roll_no: "316589" },
    ];
    setStudentList(exampleData);
    setFilteredStudentList(exampleData);
  }, []);

  const handlePromoteClick = () => {
    setShowModal(true); // Open modal
  };

  const handleModalClose = () => {
    setShowModal(false); // Close modal
  };

  const handleDivisionChange = (event) => {
    setSelectedDivision(event.target.value); // Update division
  };

  const handleSubmit = () => {
    console.log("Promoting students to:", selectedDivision);
    setShowModal(false); // Close modal on submit
  };
  // style={{border:"2px solid red"}}
  return (
    <div className="teacher_student_dashboard">
      <Container fluid>
        <Row
          style={{ paddingLeft: "2vw", paddingBottom: "1vw" }}
          className="std_list"
        >
          <Col md={4} className="class_number">
            <h4>
              Class: {standard} {division}
            </h4>
          </Col>
          <Col md={8} className="student_search_and_actions_col">
            <div className="student_search_and_actions_wrapper">
              <Form className="d-flex student_search_form">
                <div className="position-relative">
                  <BsSearch
                    className={`position-absolute top-50 translate-middle-y ms-2 student_search_icon ${searchQuery ? "hidden" : ""
                      }`}
                  />
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="teacher_student_search_input"
                    aria-label="Search"
                    value={search}
                    onChange={handleSearchChange}
                  />
                </div>
              </Form>
              <div className="action_buttons_wrapper">
                <button className="action_button_1" onClick={handlePromoteClick}>Promote</button>
                <div className="action_button_2_wrapper">
                  <div className="select_all_text">Select All</div>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="teacher_studentdashboard_container" >
          {filteredStudentList.map((item, index) => (
            <Col lg={3} md={6} sm={6} xs={12} key={index}>
              <div
                onClick={() => handleClick(item)}
                className="student_rectangle"
              >
                <div className="student_name1">{item.student_name}</div>
                <div className="student_date_id">
                  <div className="student_id">Admission No.{item.roll_no}</div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      {/* Promote Modal */}
      <Modal show={showModal} onHide={handleModalClose} centered className="custom-modal">
        <Modal.Header closeButton>
        </Modal.Header>
        <div>
        <Modal.Title className="modal-title">Promote to Class 8</Modal.Title>
          <p className="modal-description">
            Select division in which student has to be promoted
          </p>
          <Form.Select className="division-dropdown" value={selectedDivision} onChange={handleDivisionChange}>
            <option>Division A</option>
            <option>Division B</option>
            <option>Division C</option>
          </Form.Select>
        </div>
        <div className="footer-submit-btn">
          <button variant="primary" className="submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </Modal>
      <div className="student_adding_button">
        <Button
          className={`student_adding student_adding_my_button ${isActive ? "active" : ""
            }`}
          onClick={handleAddClick}
        >
          <IoIosAdd style={{ height: "40px", width: "40px", color: "#ffff" }} />
        </Button>
        {showOptions && (
          <>
            <div className="student_overlay" onClick={handleAddClick}></div>
            <div className="student_fab-options">
              <Link to="/teachertimetable" className="student_fab_option_link">
                <div className="student_fab_text">Add Timetable</div>
                <Button
                  className="student_fab_option"
                  style={{ marginTop: "12px" }}
                >
                  <MdOutlineCalendarMonth className="student_fab_icon" />
                </Button>
              </Link>
              <Link
                to="/teacherstudentadd"
                // style={{
                //   display: "flex",
                //   justifyContent: "center",
                //   alignContent: "center",
                //   gap: "20px",
                // }}
                className="student_fab_option_link"
              >
                <div className="student_fab_text">Add Student</div>
                <Button
                  className="student_fab_option"
                  style={{ marginTop: "72px" }}
                >
                  <IoMdAdd className="student_fab_icon" />
                </Button>
              </Link>
              <div
                onClick={studentexcel}
                // style={{
                //   display: "flex",
                //   justifyContent: "center",
                //   alignContent: "center",
                //   gap: "20px",
                //   cursor: "pointer",
                // }}
                className="student_fab_option_link"
              >
                <div className="student_fab_text">Download Excel Template</div>
                <Button
                  className="student_fab_option"
                  style={{ marginTop: "132px" }}
                >
                  <IoMdDownload className="student_fab_icon" />
                </Button>
              </div>
              <div
                onClick={openFileSelector}
                // style={{
                //   display: "flex",
                //   justifyContent: "center",
                //   alignContent: "center",
                //   gap: "20px",
                //   cursor: "pointer",
                // }}
                className="student_fab_option_link"
              >
                <div className="student_fab_text">Upload Through Excel</div>
                <Button
                  className="student_fab_option"
                  style={{ marginTop: "190px" }}
                >
                  <MdUpload className="student_fab_icon" />
                </Button>
              </div>
              <input
                type="file"
                onChange={handleFileChange}
                style={{ display: "none" }}
                ref={fileInputRef}
              />
              {file && (
                <Button
                  onClick={handleFileUpload}
                  disabled={isLoading}
                  // style={{
                  //   backgroundColor: "#526D82",
                  //   border: "none",
                  //   marginTop: "20px"
                  // }}
                  className="student_upload_button"
                >
                  {isLoading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />{" "}
                      Uploading...
                    </>
                  ) : (
                    "Upload File"
                  )}
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
