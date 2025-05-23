import React, { useState, useEffect } from "react";
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import Select from "react-select";
import { BsSearch } from "react-icons/bs";
import "../aarnaevaluationschedule/evaluationscheduling.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

function EvaluationScheduling() {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [classNumber, setClassNumber] = useState(null);
  const [subject, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [checkedItems, setCheckedItems] = useState([]);
  const [term, setTerm] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedClass, setSelectedClass] = useState(null);
  const [examDates, setExamDates] = useState([]);
  const [selectedExamDate, setSelectedExamDate] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const APIURL = useSelector((state) => state.APIURL.url || "");

  const today = new Date().toISOString().split("T")[0]; 

  const admininfo = useSelector((state) => state.admininfo);
  const admin_id = admininfo.admininfo?.admin_id;

  console.log(term, "term");

  console.log(selectedExamDate, "exam dates");

  useEffect(() => {
    const fetchclass = async () => {
      try {
        const response = await axios.get(
          `${APIURL}/api/addClassname/${admin_id}`
        );
        const classOptions = response.data.map((classItem) => ({
          value: `${classItem.class_name} ${classItem.division}`,
          label: `${classItem.class_name} ${classItem.division}`,
        }));
        setClassNumber(classOptions);
      } catch (error) {
        console.error("Failed to fetch class data", error);
      }
    };
    fetchclass();
  }, [APIURL, admin_id]);

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
        setTeachers(teacherOptions);
      } catch (error) {
        console.error("Failed to fetch teacher data", error);
      }
    };
    fetchTeacherInfo();
  }, [APIURL, admin_id]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(`${APIURL}/api/curriculam`);
        const mappedSubjects = response.data.subject_names?.map((sub) => ({
          value: sub.subject_name,
          label: sub.subject_name,
        }));
        setSubjects(mappedSubjects);
      } catch (error) {
        console.error("Failed to fetch subjects:", error);
      }
    };

    fetchSubjects();
  }, [APIURL]);

  const customStyles = {
    control: (base, state) => ({
      ...base,
      width: "100%",
      minHeight: "40px",
      height: "50px",
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
      maxHeight: "150px", // Set the max height for the dropdown list
      overflowY: "auto", // Add vertical scrolling
    }),
    menuList: (base) => ({
      ...base,
      maxHeight: "250px", // Set the max height for the list items
      padding: "0",
    }),
  };

  const handleCheckboxChange = (e, item) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setCheckedItems((prevItems) => {
        if (!prevItems.includes(item)) {
          return [...prevItems, item];
        }
        return prevItems;
      });
    } else {
      setCheckedItems((prevItems) => prevItems.filter((i) => i !== item));
    }
  };

  useEffect(() => {
    if (selectedClass && selectedSubject) {
      const fetchExamDates = async () => {
        try {
          const response = await axios.get(
            `${APIURL}/api/getexamdate/${admin_id}`,
            {
              params: {
                class: selectedClass.label,
                subject: selectedSubject.label,
              },
            }
          );

          setExamDates(response.data);
        } catch (error) {
          console.error("Failed to fetch exam dates", error);
        }
      };
      fetchExamDates();
    }
  }, [APIURL, admin_id, selectedClass, selectedSubject]);

  const examDateOptions =
    examDates.length > 0
      ? examDates.map((item) => ({
          value: item.date,
          label: item.date,
          term: item.term,
        }))
      : [{ value: null, label: "No exams scheduled" }];

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCheckedItems("");
  };

  const sendData = async (event) => {
    console.log("enterddddddd");
    event.preventDefault();
    const data = {
      classNumber: selectedClass ? selectedClass.value : null,
      term: term,
      subjects: selectedSubject.label,
      end_date: endDate,
      teacher: checkedItems.map((teacher) => teacher.label),
      admin: admin_id,
      exam_date: selectedExamDate,
    };

    console.log(data, "''ssssssss");

    try {
      const response = await axios.post(`${APIURL}/api/evaluationadding`, data);
      console.log(response, "response");
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Evaluation schedule added successfully!",
        });
        navigate("/aarnanavbar");
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to submit evaluation schedule:", error);

      // Extract the error message from the response
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Failed to add evaluation schedule. Please try again.";

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage, // Display the specific error message
      });
    } finally {
      setShowModal(false);
    }
  };

  return (
    <div>
      <Container className="evaluation_assign_container">
        <form className="evaluation_form">
          {/* <div className="evaluation_form_scrollable"> */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            {/* <Link to="/aarnanavbar"> */}
            {/* <IoChevronBackSharp onClick={handleBackClick} className="evaluation_back" /> */}
            {/* </Link> */}
            <h1 className="evaluation_title">Evaluation Scheduling</h1>
          </div>
          <div style={{ border: "0.5px solid #526D82" }}></div>
          <div className="evaluation_form_scrollable">
            <Row style={{ paddingTop: "20px" }}>
              <Col md={6}>
                <div className="evaluation_group">
                  <label htmlFor="class_no">
                    Class Number<span style={{ color: "red" }}>*</span>
                  </label>

                  <Select
                    options={classNumber}
                    styles={{
                      ...customStyles,
                      menu: (base) => ({
                        ...base,
                        maxHeight: "200px", // Maximum height of the dropdown menu
                        overflowY: "auto",
                        zIndex: 9999, // Enable vertical scroll
                      }),
                      menuList: (base) => ({
                        ...base,
                        maxHeight: "200px", // Maximum height of individual items
                        overflowY: "auto",
                      }),
                    }}
                    value={selectedClass}
                    onChange={setSelectedClass}
                    placeholder="Select Class..."
                    isSearchable={false}
                  />
                </div>
                {/* <div className="evaluation_group">
                  <label htmlFor="division">
                    Division<span style={{ color: "red" }}>*</span>
                  </label>
                  <Select
                    options={classdivision}
                    styles={customStyles}
                    value={division}
                    onChange={setDivision}
                    placeholder=""
                  />
                </div> */}

                <div className="evaluation_group">
                  <label htmlFor="term">
                    Exam Date<span style={{ color: "red" }}>*</span>
                  </label>

                  <Select
                    options={examDateOptions}
                    styles={{
                      ...customStyles,
                      menu: (base) => ({
                        ...base,
                        maxHeight: "200px", // Maximum height of the dropdown menu
                        overflowY: "auto",
                        zIndex: 9999, // Enable vertical scroll
                      }),
                      menuList: (base) => ({
                        ...base,
                        maxHeight: "200px", // Maximum height of individual items
                        overflowY: "auto",
                      }),
                    }}
                    value={
                      examDateOptions.find(
                        (option) => option.value === selectedExamDate
                      ) || null
                    }
                    onChange={(option) => {
                      setSelectedExamDate(option.value);
                      setTerm(option.term);
                    }}
                    placeholder="Select Exam Date..."
                    isDisabled={examDates.length === 0}
                    isSearchable={false}
                    maxMenuHeight={150}
                    
                  />
                </div>

                <div className="evaluation_group">
                  <label htmlFor="term">
                    Term<span style={{ color: "red" }}>*</span>
                  </label>

                  <input
                    value={term}
                    // onChange={(e) => setTerm(e.target.value)}
                    type="text"
                    style={{ textTransform: "capitalize" }}
                  />
                  {/* <Select
                    options={term}
                    styles={customStyles}
                    value={selectedSubject}
                    onChange={setTerm}
                    placeholder="Select Term..." */}
                  {/* /> */}
                </div>
              </Col>
              <Col md={6}>
                <div className="evaluation_group">
                  <label htmlFor="subject">
                    Subjects<span style={{ color: "red" }}>*</span>
                  </label>
                  {/* <input type="text" id='students_bench' name='students_bench' /> */}
                  <Select
                    options={subject}
                    styles={{
                      ...customStyles,
                      menu: (base) => ({
                        ...base,
                        maxHeight: "200px", // Maximum height of the dropdown menu
                        overflowY: "auto",
                        zIndex: 9999, // Enable vertical scroll
                      }),
                      menuList: (base) => ({
                        ...base,
                        maxHeight: "200px", // Maximum height of individual items
                        overflowY: "auto",
                      }),
                    }}
                    value={selectedSubject}
                    onChange={setSelectedSubject}
                    placeholder="Select Subject..."
                    isSearchable={false}
                  />
                </div>
                <div className="evaluation_group">
                  <label htmlFor="end_date">
                    End Date<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    onChange={(e) => setEndDate(e.target.value)}
                    type="date"
                    id="end_date"
                    name="end_date"
                    min={today}
                  />
                  {/* <Select options={termOptions} styles={customStyles} value={term} onChange={setTerm} placeholder=''/> */}
                </div>
              </Col>
            </Row>
            <div className="submit_evaluation">
              <button
                type="submit"
                className="evaluation_button"
                onClick={handleSubmit}
              >
                Assign
              </button>
            </div>
          </div>
          {/* </div>   */}
        </form>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="modal_heading">
          <Modal.Title className="modal_assign">Faculty Assign</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row style={{}}>
            <Col md={6} style={{}}>
              <div className="modal_div_assign">
                <Form className="d-flex">
                  <div className="position-relative">
                    {/* <BsSearch className="position-absolute top-50 translate-middle-y ms-2 modal_searchbar_icon" /> */}
                    {/* <BsSearch className={`position-absolute top-50 translate-middle-y ms-2 modal_searchbar_icon ${searchQuery ? 'hidden' : ''}`} /> */}
                    <BsSearch
                      className={`position-absolute top-50 translate-middle-y ms-2 modal_searchbar_icon ${
                        searchQuery ? "hidden" : ""
                      }`}
                    />

                    <Form.Control
                      type="search"
                      placeholder="Search by Name or Id"
                      className="ps-3 modal_searchbar_input"
                      aria-label="Search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </Form>
                <div className="modal_faculty_list">
                  {teachers?.map((faculty, index) => (
                    <div key={index} className="d-flex align-items-center mb-2">
                      <input
                        type="checkbox"
                        checked={checkedItems.includes(faculty)}
                        onChange={(e) => handleCheckboxChange(e, faculty)}
                        style={{ marginRight: "10px" }}
                      />
                      <span>{faculty.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer style={{ border: "none" }}>
          <button onClick={sendData} className="modal_evaluation_submit">
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EvaluationScheduling;
