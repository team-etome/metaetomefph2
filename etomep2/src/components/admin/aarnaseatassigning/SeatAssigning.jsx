import React, { useState } from "react";
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import Select from "react-select";
import "../aarnaseatassigning/seatassigning.css";
import Layout_01_S from "../../../assets/Layout_01_S.png";
import Layout_01_NS from "../../../assets/Layout_01_NS.png";
import Layout_02_S from "../../../assets/Layout_02_S.png";
import Layout_02_NS from "../../../assets/Layout_02_NS.png";
import { BsSearch } from "react-icons/bs";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

function SeatAssigning() {
  const [selectedLayout, setSelectedLayout] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [hallNo, setHallNo] = useState("");
  const [studentperbench, setStudentperbench] = useState("");
  const [columnNo, setColumnNo] = useState("");
  const [examdate, setExamdate] = useState("");
  const [numberoftables, setNumberoftables] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);

  const teacherinfo = useSelector((state) => state.adminteacherinfo);
  const classinfo = useSelector((state) => state.adminallclassinfo);
  console.log(teacherinfo, "teacher info");
  console.log(classinfo, "class info");

  const handleLayoutSelect = (layout) => {
    setSelectedLayout(layout);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleTeacherSelect = (selectedOption) => {
    setSelectedTeacher(selectedOption);
  };

  const handleClassSelect = (selectedOption) => {
    setSelectedClass(selectedOption);
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      width: "100%",
      minHeight: "40px",
      border: "1px solid #526D82",
      borderRadius: "8px",
      boxShadow: state.isFocused ? "0 0 0 1px #526D82" : "none",
      "&:hover": {
        borderColor: "none", // Darker border on hover
      },
      "&:focus": {
        borderColor: "#526D82", // Ensures the border color when the element is focused
        outline: "none", // Removes the default outline when focused
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
    }),
    indicatorsContainer: (base) => ({
      ...base,
      alignItems: "center",
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
      position: "absolute",
    }),
  };

  const teacherOptions = teacherinfo.teacherinfo?.map((teacher) => ({
    value: teacher.id,
    label: teacher.name,
  }));

  const classOptions = classinfo.teacherinfo?.map((classItem) => ({
    value: classItem.id,
    label: classItem.classname,
  }));

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
            <Link to="/aarnanavbar">
              <IoChevronBackSharp className="seat_back" />
            </Link>
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
                    type="text"
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
                    type="text"
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
                    type="text"
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
                    type="text"
                    id="exam_date"
                    name="exam_date"
                    value={examdate}
                    onChange={(e) => setExamdate(e.target.value)}
                  />
                </div>
                <Row>
                  <Col md={6}>
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
                      />
                      {/* <Select options={termOptions} styles={customStyles} value={term} onChange={setTerm} placeholder=''/> */}
                    </div>
                  </Col>
                  <Col md={6}>
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
                      />
                      {/* <Select options={termOptions} styles={customStyles} value={term} onChange={setTerm} placeholder=''/> */}
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

              <div
                style={{
                  border: "2px solid black",
                }}
                className="modal_search"
              >
                <Form className="d-flex">
                  <div className="position-relative">
                    <BsSearch className="position-absolute top-50 translate-middle-y ms-2 modal_search_icon" />
                    <Form.Control
                      type="search"
                      placeholder="Search by Name or Id"
                      className="ps-1 modal_search_input"
                      aria-label="Search"
                    />
                  </div>
                </Form>
              </div>
            </Col>
            <Col md={6}>
              <p className="modal_div_title">Select Class</p>
              <div
                style={{
                  border: "2px solid black",
                }}
                className="modal_search"
              >
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
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer style={{ border: "none" }}>
          <Link to="/aarnanavbar" style={{ textDecoration: "none" }}>
            <Button
              variant="primary"
              onClick={handleCloseModal}
              className="modal_submit"
            >
              Submit
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SeatAssigning;
