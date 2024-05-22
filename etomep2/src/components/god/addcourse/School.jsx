import React, { useState } from "react";
import { Container, Row, Form, Col, Button } from "react-bootstrap";
import Select from "react-select";
import "../addcourse/school.css";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

function School() {
  const APIURL = useSelector((state) => state.APIURL.url);

  const [eboard, setEboard] = useState(null);
  const [subjectNames, setSubjectNames] = useState([]);
  const [numOfSubjects, setNumOfSubjects] = useState(0);

  const handleBoardofEducation = (selectedOption) => {
    setEboard(selectedOption);
  };

  const handleSubjectCountChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setNumOfSubjects(Math.max(0, count));
    setSubjectNames(Array(Math.max(0, count)).fill(""));
  };

  const handleSubjectNameChange = (index, value) => {
    const newSubjectNames = [...subjectNames];
    newSubjectNames[index] = value;
    setSubjectNames(newSubjectNames);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!eboard || subjectNames.some((name) => !name)) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Data',
        text: 'Please fill out all fields.',
      });
      return;
    }

    const data = {
      educational_body: {
        name: eboard.value,
      },
      subjects: subjectNames.map((name) => ({ subject: name })),
    };

    try {
      const response = await axios.post(`${APIURL}/api/addsubject`, data);
      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Data saved successfully',
        }).then(() => {
          setEboard(null);
          setSubjectNames([]);
          setNumOfSubjects(0);
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to save data',
        });
      }
    } catch (error) {
      console.error("There was an error saving the data!", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an error saving the data!',
      });
    }
  };

  const eeducationboard = [
    "CENTRAL BOARD OF SECONDARY EDUCATION (CBSE)",
    "KERALA BOARD OF PUBLIC EXAMINATION, KERALA(KPE)",
    "KERALA BOARD OF HIGHER SECONDARY EDUCATION (KHSE)",
    "BOARD OF VOCATIONAL HIGHER SECONDARY EDUCATION, KERALA(KVHSE)",
    "BOARD OF SECONDARY EDUCATION, MADHYA PRADESH(MPBSE)",
    " Indian Certificate of Secondary Education (ICSE)",
  ];

  const eboardOptions = eeducationboard.map((eboard) => ({
    value: eboard,
    label: eboard,
  }));

  return (
    <div
      style={{
        backgroundColor: "#fff",
        border: "2px solid white",
        borderRadius: "20px",
        marginTop: "30px",
      }}
    >
      <Container>
        <Form onSubmit={handleSubmit}>
          <Row>
            <div
              style={{
                display: "flex",
                paddingTop: "33px",
                paddingBottom: "16px",
                borderBottom: "3px solid #DDE6ED",
                marginBottom: "20px",
              }}
            >
              <div style={{ marginLeft: "30px", color: "#526D82" }}>
                <h4>Add Courses</h4>
              </div>
            </div>
          </Row>
          <Row style={{ marginTop: "20px" }}>
            <Col md={6}>
              <div
                className="school_input_select"
                style={{
                  border: "1px solid #526D82",
                  marginLeft: "15px",
                  borderRadius: "4px",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              >
                <label htmlFor="eeducationBoard" style={{ fontWeight: "600" }}>
                  Board Of Education
                </label>
                <Select
                  type="text"
                  id="eeducationBoard"
                  name="eeducationBoard"
                  options={eboardOptions}
                  value={eboard}
                  onChange={handleBoardofEducation}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      border: "none",
                      bottom: "1px",
                      boxShadow: state.isFocused ? "none" : "none",
                    }),
                    dropdownIndicator: (provided, state) => ({
                      ...provided,
                      color: "black",
                    }),
                    indicatorSeparator: (provided, state) => ({
                      ...provided,
                      backgroundColor: "none",
                    }),
                  }}
                />
              </div>
            </Col>
            <Col md={6}>
              <div
                className="school_input_select"
                style={{
                  border: "1px solid #526D82",
                  marginLeft: "15px",
                  borderRadius: "4px",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              >
                <label htmlFor="subjectsno" style={{ fontWeight: "600" }}>
                  No. of Subjects
                </label>
                <input
                  type="number"
                  id="subjectsno"
                  name="subjectsno"
                  value={numOfSubjects}
                  onChange={handleSubjectCountChange}
                  style={{
                    border: "none",
                    borderBottom: "0.5px solid #B5B5B5",
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    outline: "none",
                  }}
                />
              </div>
            </Col>
          </Row>
          <Row style={{ marginBottom: "50px" }}>
            <Col md={12}>
              <div
                style={{
                  border: "none",
                  marginLeft: "15px",
                  maxHeight: "300px",
                  overflowY: "auto",
                }}
              >
                {numOfSubjects > 0 &&
                  Array.from({ length: Math.ceil(numOfSubjects / 2) }).map(
                    (_, rowIndex) => (
                      <Row key={rowIndex} className="mb-3">
                        <Col md={6}>
                          <input
                            type="text"
                            placeholder={` ${rowIndex * 2 + 1}.`}
                            value={subjectNames[rowIndex * 2] || ""}
                            onChange={(e) =>
                              handleSubjectNameChange(rowIndex * 2, e.target.value)
                            }
                            style={{
                              border: "none",
                              borderBottom: "0.5px solid #B5B5B5",
                              width: "100%",
                              padding: "8px",
                              borderRadius: "4px",
                              outline: "none",
                            }}
                          />
                        </Col>
                        <Col md={6}>
                          {rowIndex * 2 + 1 < numOfSubjects && (
                            <input
                              type="text"
                              placeholder={` ${rowIndex * 2 + 2}.`}
                              value={subjectNames[rowIndex * 2 + 1] || ""}
                              onChange={(e) =>
                                handleSubjectNameChange(
                                  rowIndex * 2 + 1,
                                  e.target.value
                                )
                              }
                              style={{
                                border: "none",
                                borderBottom: "0.5px solid #B5B5B5",
                                width: "100%",
                                padding: "8px",
                                borderRadius: "4px",
                                outline: "none",
                              }}
                            />
                          )}
                        </Col>
                      </Row>
                    )
                  )}
              </div>
              <div
                className="school_button"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  type="submit"
                  value="submit"
                  style={{ backgroundColor: "#526D82", color: "white" }}
                >
                  Submit
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}

export default School;
