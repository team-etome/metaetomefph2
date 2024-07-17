import React, { useState } from "react";
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import Select from "react-select";
import { BsSearch } from "react-icons/bs";
import "../aarnaevaluationschedule/evaluationscheduling.css";
import { useSelector } from "react-redux";

function EvaluationScheduling() {
  const [showModal, setShowModal] = useState(false);
  const [classNumber, setClassNumber] = useState(false);
  const [division, setDivision] = useState(false);
  const [subject, setSubject] = useState(false);
  const [term, setTerm] = useState(false);
  const [startTime, setStartTime] = useState(false);
  const [endTime, setEndTime] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);

  const classinfo = useSelector((state) => state.adminallclassinfo);

  const classnumberOptions = classinfo.adminallclassinfo.map((classItem) => ({
    value: `${classItem.class_name} ${classItem.division}`,
    label: `${classItem.class_name} ${classItem.division}`,
  }));

  const classdivision = classinfo.adminallclassinfo.map((classItem) => ({
    value: classItem.division,
    label: classItem.division,
  }));

  const class_name = classinfo.adminallclassinfo[0]?.class_name;
  console.log(class_name, "classssss");
  console.log(classinfo, "class infooo");

  const termOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
  ];
  const classnumberptions = [
    { value: "10", label: "10" },
    { value: "11", label: "11" },
    { value: "12", label: "12" },
  ];
  const divisionOptions = [
    { value: "a", label: "a" },
    { value: "b", label: "b" },
    { value: "c", label: "c" },
  ];
  const subjectOptions = [
    { value: "hindi", label: "hindi" },
    { value: " malayalam", label: "malayalam" },
    { value: "english", label: "english" },
  ];
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
    }),
  };
  const facultyList = ["Rrrrrrrrrr", "Jjjjjjjjj", "Mmmmmmm", "Eeeeeee"];

  const handleCheckboxChange = (e, item) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setCheckedItems([...checkedItems, item]);
    } else {
      setCheckedItems(checkedItems.filter((i) => i !== item));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
            <Link to="/aarnanavbar">
              <IoChevronBackSharp className="evaluation_back" />
            </Link>
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
                    options={classnumberOptions}
                    styles={customStyles}
                    value={classNumber} // this should be an object with the same structure as items in options or null
                    onChange={setClassNumber} // ensure this handler updates the state appropriately
                    placeholder="Select Class..."
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
                    Term<span style={{ color: "red" }}>*</span>
                  </label>
                  <input type="text" />
                  {/* <Select
                    options={termOptions}
                    styles={customStyles}
                    value={term}
                    onChange={setTerm}
                    placeholder=""
                  /> */}
                </div>
              </Col>
              <Col md={6}>
                <div className="evaluation_group">
                  <label htmlFor="subject">
                    Subjects<span style={{ color: "red" }}>*</span>
                  </label>
                  {/* <input type="text" id='students_bench' name='students_bench' /> */}
                  <Select
                    options={subjectOptions}
                    styles={customStyles}
                    value={subject}
                    onChange={setSubject}
                    placeholder=""
                  />
                </div>
                <div className="evaluation_group">
                  <label htmlFor="end_date">
                    End Date<span style={{ color: "red" }}>*</span>
                  </label>
                  <input type="date" id="end_date" name="end_date" />
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
            <Col md={6}>
              <div className="modal_div_assign">
                <Form className="d-flex">
                  <div className="position-relative">
                    <BsSearch className="position-absolute top-50 translate-middle-y ms-2 modal_searchbar_icon" />
                    <Form.Control
                      type="search"
                      placeholder="Search by Name or Id"
                      className="ps-3 modal_searchbar_input"
                      aria-label="Search"
                    />
                  </div>
                </Form>
                <div className="modal_faculty_list">
                  {facultyList.map((faculty, index) => (
                    <div key={index} className="d-flex align-items-center mb-2">
                      <input
                        type="checkbox"
                        checked={checkedItems.includes(faculty)}
                        onChange={(e) => handleCheckboxChange(e, faculty)}
                        style={{ marginRight: "10px" }}
                      />
                      <span>{faculty}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer style={{ border: "none" }}>
          <Link to="/aarnanavbar" style={{ textDecoration: "none" }}>
          <button onClick={handleCloseModal} className="modal_evaluation_submit">
            Submit
          </button>
            {/* <Button
              variant="primary"
              onClick={handleCloseModal}
              className="modal_evaluation_submit"
            >
              Submit
            </Button> */}

          </Link>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EvaluationScheduling;
