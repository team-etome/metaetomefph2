import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
// import Swal from 'sweetalert2';
import "./teachermcq.css";
import { useNavigate } from "react-router-dom";

function McqaddingForm() {
  const [examName, setExamName] = useState("");
  const [negativeMark, setNegativeMark] = useState("");
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState("");
  const [outOfMarks, setOutOfMarks] = useState("");
  const [teacherCode, setTeacherCode] = useState("");
  const [individualMark, setIndividualMark] = useState("");

  const navigate = useNavigate();

  const handlenavigate = () => {
    const formData = {
      examName,
      negativeMark,
      topic,
      duration,
      outOfMarks,
      teacherCode,
      individualMark,
    };

    navigate("/teachermcq", { state: formData });
  };

  return (
    <div className="mcqform_teacher_test_adding">
      <Container className="mcqform_teacher_testadd_form">
        <div className="mcqform_teacher_test_add_header">
          <h1 className="mcqform_teacher_testadd_title">
            Multiple Choices Question
          </h1>
        </div>
        <hr style={{ border: "1px solid #526D82" }} />
        <div className="mcqform_teacher_test_adding_scroll">
          <Row>
            <Col md={6}>
              <div className="mcqform_teacher_testadd_group">
                <label htmlFor="examname">
                  Exam Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="examname"
                  name="examname"
                  value={examName}
                  onChange={(e) => setExamName(e.target.value)}
                />
              </div>

              <div className="mcqform_teacher_testadd_group">
                <label htmlFor="testtopic">
                  Topic <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="testtopic"
                  name="testtopic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>
              <div className="mcqform_teacher_testadd_group">
                <label htmlFor="testoutofmarks">
                  Out Of Marks <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="testoutofmarks"
                  name="testoutofmarks"
                  value={outOfMarks}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow empty string or only update if value is a positive number
                    if (value === "" || (!isNaN(value) && value > 0)) {
                      setOutOfMarks(value);
                    }
                  }}
                />
              </div>
              <div className="mcqform_teacher_testadd_group">
                <label htmlFor="testoutofmarks">
                  Individual Mark <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="testoutofmarks"
                  name="testoutofmarks"
                  value={individualMark}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow empty string or only update if value is a positive number
                    if (value === "" || (!isNaN(value) && value > 0)) {
                      setIndividualMark(value);
                    }
                  }}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="mcqform_teacher_testadd_group">
                <label htmlFor="testduration">
                  Duration <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="number"
                  id="testduration"
                  name="testduration"
                  value={duration}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow empty string or value greater than zero
                    if (value === "" || value > 0) {
                      setDuration(value);
                    }
                  }}
                  placeholder="Duration in minutes"
                />
              </div>

              <div className="mcqform_teacher_testadd_group">
                <label htmlFor="examdate">
                  Negative Mark <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="number"
                  id="examdate"
                  name="examdate"
                  value={negativeMark}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Only update if value is greater than or equal to zero
                    if (value >= 0) {
                      setNegativeMark(value);
                    }
                  }}
                  placeholder=""
                />
              </div>
              <div className="mcqform_teacher_testadd_group">
                <label htmlFor="teachercode">
                  Teacher Code <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="teachercode"
                  name="teachercode"
                  value={teacherCode}
                  onChange={(e) => setTeacherCode(e.target.value)}
                />
              </div>
            </Col>
            <div className="mcqform_teacher_testadd_submit">
              <button onClick={handlenavigate} type="button">
                Create Question
              </button>
            </div>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default McqaddingForm;
