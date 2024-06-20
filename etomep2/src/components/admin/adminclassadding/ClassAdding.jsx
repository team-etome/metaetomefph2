import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../adminclassadding/classadding.css";
import { IoChevronBackSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { useSelector , useDispatch } from "react-redux";
import { adminclassinfo } from "../../../Redux/Actions/AdminclassAddingInfo";

function ClassAdding() {
  const [medium, setMedium] = useState("");
  const [teacher, setTeacher] = useState("");
  const [className, setClassName] = useState("");
  const [stream, setStream] = useState("");
  const [division, setDivision] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate()

  console.log(medium);



  const admininfo = useSelector((state) => state.admininfo);

  const teacherinfo = useSelector((state) => state.adminteacherinfo);

  const m = admininfo ? admininfo.admininfo?.medium : null;

  const mediumOption = m ? [{ value: m, label: m }] : [];

  const handleClassNameChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0 && value <= 12) {
      setClassName(value);
    } else if (value <= 0) {
      setClassName("");
    }
  };

  const teacherOptions = teacherinfo.adminteacherinfo?.map((teacher) => ({
    value: `${teacher.first_name} ${teacher.last_name}`, // Assuming you want to use names as value; could be `teacher.id` or similar if needed
    label: `${teacher.first_name} ${teacher.last_name}`, // Display format in the dropdown
  }));

  const handleSubmit = (e) => {

    console.log('enterrrrrr')
    e.preventDefault();

    const classData = {
      medium,
      teacher,
      className,
      stream,
      division
    };

    dispatch(adminclassinfo(classData)); 
    navigate('/curriculumadding')
   
         
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      width: "90%",
      minHeight: "50px",
      border: "1px solid #526D82",
      borderRadius: "8px",
      boxShadow: state.isFocused ? "0 0 0 1px #526D82" : "none",
      "&:hover": {
        borderColor: "none",
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
  };
  return (
    <div className="page_container">
      <Container className="class_add">
        <form
          className="class_form"
          style={{ backgroundColor: "#ffff", borderRadius: "16px" }}
        >
          <Row>
            <Col>
              <div className="header-container">
                <Link to="/institutionadding">
                  <IoChevronBackSharp
                    style={{
                      color: "#526D82",
                      height: "32px",
                      width: "32px",
                      marginLeft: "20px",
                    }}
                  />
                </Link>
                <h1
                  style={{
                    color: "#526D82",
                    fontSize: "25px",
                    marginLeft: "10px",
                  }}
                >
                  Class Adding
                </h1>
              </div>
              <div style={{ border: "0.5px solid #526D82" }}></div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div className="form_group">
                <input
                  type="number"
                  id="class_number"
                  name="class_number"
                  placeholder="Enter class number"
                  value={className}
                  onChange={handleClassNameChange}
                />
                <label htmlFor="class_number">
                  Class Name<span style={{ color: "red" }}>*</span>
                </label>
              </div>

              <div className="form_group">
                <input
                  type="text"
                  id="class_category"
                  name="class_category"
                  placeholder="Enter stream"
                  value={stream}
                  onChange={(e) => setStream(e.target.value)}
                  readOnly={parseInt(className, 10) < 11}
                />
                <label htmlFor="class_category">Stream</label>
              </div>

              <div className="class_select">
                <Select
                  options={teacherOptions}
                  styles={customStyles}
                  placeholder="Select teacher"
                  value={teacher}
                  onChange={setTeacher}
                />
                <label htmlFor="class_teacher">
                  Class Teacher<span style={{ color: "red" }}>*</span>
                </label>
              </div>
            </Col>

            <Col md={6}>
              <div className="form_group">
                <input
                  type="text"
                  id="class_division"
                  name="class_division"
                  placeholder="Enter division"
                  value={division}
                  onChange={(e) => setDivision(e.target.value)}
                />
                <label htmlFor="class_division">
                  Division<span style={{ color: "red" }}>*</span>
                </label>
              </div>

              <div className="class_select">
                <Select
                  options={mediumOption}
                  styles={customStyles}
                  placeholder="Select medium"
                  value={medium}
                  onChange={setMedium}
                />
                <label htmlFor="class_medium">Medium</label>
              </div>

              <div
                className=" class_next_button"
                style={{ textAlign: "right", marginRight: "80px" }}
              >
              
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    value="submit"
                    className="class_next"
                  >
                    Next
                  </button>
               
              </div>
            </Col>
          </Row>
        </form>
      </Container>
    </div>
  );
}

export default ClassAdding;


