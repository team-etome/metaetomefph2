import React, { useEffect, useState } from "react";
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import { IoChevronBackSharp } from "react-icons/io5";
import "../aarnaseatassigning/seatassigning.css";
import Layout_01_S from "../../../assets/Layout_01_S.png";
import Layout_01_NS from "../../../assets/Layout_01_NS.png";
import Layout_02_S from "../../../assets/Layout_02_S.png";
import Layout_02_NS from "../../../assets/Layout_02_NS.png";
import { BsSearch } from "react-icons/bs";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SeatAssigning() {
  const [selectedLayout, setSelectedLayout] = useState(null);
  const [showModal, setShowModal] = useState(false);

  console.log(showModal, "show modal");
  const navigate = useNavigate();

  const [hallNo, setHallNo] = useState("");
  const [studentperbench, setStudentperbench] = useState("");
  const [columnNo, setColumnNo] = useState("");
  const [examdate, setExamdate] = useState("");
  const [numberoftables, setNumberoftables] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState([]);
  const [selectedClass, setSelectedClass] = useState([]);
  const [teacherOptions, setTeacherOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [studentCount, setStudentsCount] = useState([]);

  console.log(studentCount, "student count");

  console.log(classOptions, "class option");

  const APIURL = useSelector((state) => state.APIURL.url);
  const teacherinfo = useSelector((state) => state.adminteacherinfo);
  const classinfo = useSelector((state) => state.adminallclassinfo);
  const admininfo = useSelector((state) => state.admininfo);

  const admin_id = admininfo.admininfo?.admin_id;

  console.log(teacherinfo, "teacher info");
  console.log(classinfo, "class info");

  useEffect(() => {
    const fetchTeacherInfo = async () => {
      try {
        const response = await axios.get(
          `${APIURL}/api/teacherdetails/${admin_id}`
        );
        const teacherOptions = response.data.map((teacher) => ({
          value: `${teacher.first_name} ${teacher.last_name}`,
          label: `${teacher.first_name} ${teacher.last_name}`,
        }));
        setTeacherOptions(teacherOptions);
      } catch (error) {
        console.error("Failed to fetch teacher data", error);
      }
    };
    fetchTeacherInfo();
  }, [APIURL, admin_id]);

  // Fetch class information
  useEffect(() => {
    const fetchClassInfo = async () => {
      try {
        const response = await axios.get(
          `${APIURL}/api/addClassname/${admin_id}`
        );

        const updatedClassOptions = response.data.map((classItem) => {
          // Find the specific count for the class and division
          const matchedCount = studentCount.student_counts.find(
            (countItem) =>
              countItem.class_name === classItem.class_name &&
              countItem.division === classItem.division
          );

          // If student count is found, use the remaining_count; otherwise, use the total count from overall_student_counts
          const totalStudentCount = matchedCount
            ? matchedCount.remaining_count
            : studentCount.overall_student_counts.find(
                (overallCount) =>
                  overallCount.class_name === classItem.class_name &&
                  overallCount.division === classItem.division
              )?.total_student_count || 0;

          return {
            value: `${classItem.class_name} ${classItem.division}`,
            label: `${classItem.class_name} ${classItem.division} (${totalStudentCount})`,
          };
        });
        setClassOptions(updatedClassOptions);
      } catch (error) {
        console.error("Failed to fetch class data", error);
      }
    };

    fetchClassInfo();
  }, [APIURL, admin_id, studentCount]);

  const handleLayoutSelect = (layout) => {
    setSelectedLayout(layout);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      examdate,
      admin_id,
    };

    try {
      // Fetch student counts from the backend
      const response = await axios.post(
        `${APIURL}/api/getStudentCounts`,
        formData
      );
      const studentCounts = response.data;

      // Set the student counts in state
      setStudentsCount(studentCounts);

      // Show the modal after setting the student counts
      setShowModal(true);
    } catch (error) {
      console.error("Failed to fetch student counts", error);
      Swal.fire("Error", "Could not fetch student data.", "error");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTeacher([]);
    setSelectedClass([]);
  };
  const handleTeacherSelect = (teacher) => {
    setSelectedTeacher((prevSelectedTeachers) => {
      if (prevSelectedTeachers.includes(teacher.value)) {
        return prevSelectedTeachers.filter((item) => item !== teacher.value);
      } else {
        return [...prevSelectedTeachers, teacher.value];
      }
    });
  };

  const handleClassSelect = (classItem) => {
    console.log(classItem, "classs item");
    setSelectedClass((prevSelectedClasses) => {
      if (prevSelectedClasses.includes(classItem.value)) {
        return prevSelectedClasses.filter((item) => item !== classItem.value);
      } else {
        return [...prevSelectedClasses, classItem.value];
      }
    });
  };

  const handleFormSubmit = async () => {
    if (!startTime || !endTime) {
      Swal.fire(
        "Validation Error",
        "Please set both start time and end time.",
        "error"
      );
      return;
    }

    if (endTime <= startTime) {
      Swal.fire(
        "Validation Error",
        "End time must be after start time.",
        "error"
      );
      return;
    }

    const formData = {
      hallNo,
      studentperbench,
      columnNo,
      examdate,
      numberoftables,
      startTime,
      endTime,
      selectedTeacher,
      selectedClass,
      selectedLayout,
      admin_id,
    };

    try {
      const response = await axios.post(`${APIURL}/api/seating`, formData);

      if (response.status === 200) {
        // Success case
        Swal.fire(
          "Success",
          "Seating arrangement submitted successfully",
          "success"
        );
        navigate("/aarnanavbar");
      }
    } catch (error) {
      const statusCode = error.response?.status;
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "There was an error submitting the form";

      // Display error message based on status code
      switch (statusCode) {
        case 400:
          Swal.fire("Error", errorMessage, "error");
          break;
        case 404:
          Swal.fire("Error", "Student or class not found.", "error");
          break;
        case 409:
          Swal.fire("Conflict", errorMessage, "warning");
          break;
        case 500:
          Swal.fire("Error", "An internal server error occurred.", "error");
          break;
        default:
          Swal.fire("Error", "Unexpected error occurred.", "error");
          break;
      }
    }
  };

  // const handleBackClick = () => {
  //   navigate ('/aarnanavbar')
  // }

  return (
    <div>
      <Container className="seat_assign_container">
        <form className="seat_form">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            {/* <Link to="/aarnanavbar"> */}
            {/* <IoChevronBackSharp onClick={handleBackClick} className="seat_back" /> */}
            {/* </Link> */}
            <h1 className="seat_title">Seat Assigning</h1>
          </div>
          <div style={{ border: "0.5px solid #526D82" }}></div>
          <div className="seat_form_scrollable">
            <Row style={{ paddingTop: "20px" }}>
              <Col md={6}>
                <div className="seat_group">
                  <label htmlFor="hall_no">
                    Hall No:<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="hall_no"
                    name="hall_no"
                    value={hallNo}
                    onChange={(e) => setHallNo(e.target.value)}
                    style={{ textTransform: "capitalize" }}
                    maxLength="50"
                  />
                </div>
                <div className="seat_group">
                  <label htmlFor="column_no">
                    No. of Columns<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="number"
                    id="column_no"
                    name="column_no"
                    value={columnNo}
                    onChange={(e) => setColumnNo(e.target.value)}
                    style={{ textTransform: "capitalize" }}
                    maxLength="50"
                  />
                </div>
                <div className="seat_group">
                  <label htmlFor="table_no">
                    No. of Tables<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="number"
                    id="table_no"
                    name="table_no"
                    value={numberoftables}
                    onChange={(e) => setNumberoftables(e.target.value)}
                    style={{ textTransform: "capitalize" }}
                    maxLength="50"
                  />
                </div>
              </Col>
              <Col md={6}>
                <div className="seat_group">
                  <label htmlFor="students_bench">
                    Students per Bench<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="number"
                    id="students_bench"
                    name="students_bench"
                    value={studentperbench}
                    onChange={(e) => setStudentperbench(e.target.value)}
                    style={{ textTransform: "capitalize" }}
                    maxLength="50"
                  />
                </div>
                <div className="seat_group">
                  <label htmlFor="exam_date">
                    Exam Date<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="date"
                    id="exam_date"
                    name="exam_date"
                    value={examdate}
                    onChange={(e) => setExamdate(e.target.value)}
                  />
                </div>
                <Row>
                  <Col md={6} className="time_col">
                    <div className="seat_group" style={{}}>
                      <label htmlFor="start_time">
                        Start Time<span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="time"
                        id="start_time"
                        name="start_time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        style={{ width: "100%" }}
                      />
                    </div>
                  </Col>
                  <Col md={6} className="time_col">
                    <div className="seat_group">
                      <label htmlFor="end_time">
                        End Time<span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="time"
                        id="end_time"
                        name="end_time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        style={{ width: "100%" }}
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <div
                  className="seat_group"
                  style={{ paddingTop: "20px", color: "#526D82" }}
                >
                  Choose Layout
                </div>
                <div className="layout">
                  <img
                    src={
                      selectedLayout === "layout1" ? Layout_01_S : Layout_01_NS
                    }
                    alt="layout 1"
                    className="layout_image"
                    onClick={() => handleLayoutSelect("layout1")}
                    style={{ cursor: "pointer" }}
                  />
                  <img
                    src={
                      selectedLayout === "layout2" ? Layout_02_S : Layout_02_NS
                    }
                    alt="layout 2"
                    className="layout_image"
                    onClick={() => handleLayoutSelect("layout2")}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </Col>
            </Row>
            <div className="submit_seat">
              <button
                type="submit"
                className="seat_button"
                onClick={handleSubmit}
              >
                Assign
              </button>
            </div>
          </div>
        </form>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal} centered size="xl">
        <Modal.Header closeButton className="modal_header">
          <Modal.Title className="modal_title">Assigning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row style={{ paddingLeft: "40px", paddingRight: "40px" }}>
            <Col md={6}>
              <p className="modal_div_title">Select Faculty</p>

              <div className="modal_search">
                <Form className="d-flex">
                  <div className="position-relative">
                    <BsSearch className="position-absolute top-50 translate-middle-y ms-2 modal_search_icon" />
                    <Form.Control
                      type="search"
                      placeholder="Search by Name or Id"
                      className="ps-3 modal_search_input"
                      aria-label="Search"
                    />
                  </div>
                </Form>

                <div className="class_seat_modal_content">
                  {teacherOptions?.map((teacher, index) => (
                    <div
                      key={`teacher-${index}`}
                      className={`d-flex align-items-center seat_modal_item ${
                        index >= 10 ? "right-column" : "left-column"
                      }`}
                    >
                      <Form.Check
                        type="checkbox"
                        id={`teacher-checkbox-${index}`}
                        className="seat_modal_checkbox"
                        onChange={() => handleTeacherSelect(teacher)}
                        checked={selectedTeacher.includes(teacher.value)}
                      />
                      <label
                        htmlFor={`teacher-checkbox-${index}`}
                        className="ms-2 seat_modal_label"
                      >
                        {teacher.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </Col>

            <Col md={6}>
              <p className="modal_div_title">Select Class</p>
              <div className="modal_search">
                <Form className="d-flex">
                  <div className="position-relative">
                    <BsSearch className="position-absolute top-50 translate-middle-y ms-2 modal_search_icon" />
                    <Form.Control
                      type="search"
                      placeholder="Search by Classname"
                      className="ps-3 modal_search_input"
                      aria-label="Search"
                    />
                  </div>
                </Form>

                <div className="class_seat_modal_content">
                  {classOptions?.map((classItem, index) => (
                    <div
                      key={`class-${index}`}
                      className={`d-flex align-items-center seat_modal_item ${
                        index >= 10 ? "right-column" : "left-column"
                      }`}
                    >
                      <Form.Check
                        type="checkbox"
                        id={`class-checkbox-${index}`}
                        className="seat_modal_checkbox"
                        onChange={() => handleClassSelect(classItem)}
                        checked={selectedClass.includes(classItem.value)}
                      />
                      <label
                        htmlFor={`class-checkbox-${index}`}
                        className="ms-2 seat_modal_label"
                      >
                        {classItem.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer style={{ border: "none" }}>
          <button onClick={handleFormSubmit} className="modal_submit">
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SeatAssigning;
