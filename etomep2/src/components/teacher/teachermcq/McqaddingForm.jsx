import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
// import Swal from 'sweetalert2';
import "./teachermcq.css"

function McqaddingForm() {
  const [examName, setExamName] = useState("");
  const [examDate, setExamDate] = useState("");
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState("");
  const [outOfMarks, setOutOfMarks] = useState("");
  const [teacherCode, setTeacherCode] = useState("");

  // const handleCreateQuestion = () => {
  //   const missingFields = [];

  //   if (!examName) missingFields.push('Exam Name');
  //   if (!examDate) missingFields.push('Exam Date');
  //   if (!topic) missingFields.push('Topic');
  //   if (!duration) missingFields.push('Duration');
  //   if (!outOfMarks) missingFields.push('Out of Marks');
  //   if (!teacherCode) missingFields.push('Teacher Code');

  //   if (missingFields.length > 0) {
  //     Swal.fire({
  //       icon: 'warning',
  //       title: 'Missing Information',
  //       text: `Please fill in the following fields before proceeding: ${missingFields.join(', ')}`,
  //     });
  //   } else {
  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Success',
  //       text: 'Question created successfully!',
  //     });
  //   }
  // };

  return (
    <div className="mcqform_teacher_test_adding">
      <Container className="mcqform_teacher_testadd_form">
        <div className="mcqform_teacher_test_add_header">
          <h1 className="mcqform_teacher_testadd_title">Multiple Choices Question</h1>
        </div>
        <hr style={{ border: "1px solid #526D82" }} />
        <div className="mcqform_teacher_test_adding_scroll">
          <Row >
            <Col md={6}>
              <div className="mcqform_teacher_testadd_group">
                <label htmlFor="examname">
                  Exam Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="examname"
                  name="examname"
                  // value={examName}
                  // onChange={(e) => setExamName(e.target.value)}
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
                  // value={topic}
                  // onChange={(e) => setTopic(e.target.value)}
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
                  // value={outOfMarks}
                  // onChange={(e) => setOutOfMarks(e.target.value)}
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
                  // value={duration}
                  // onChange={(e) => setDuration(e.target.value)}
                  placeholder="Duration in minutes"
                />
              </div>
              <div className="mcqform_teacher_testadd_group">
                <label htmlFor="examdate">
                Negative Mark <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="number"
                  id=""
                  name="examdate"
                 
                 
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
                  // value={teacherCode}
                  // onChange={(e) => setTeacherCode(e.target.value)}
                />
              </div>
            </Col>
            <div className="mcqform_teacher_testadd_submit">
              <button type="button" >
                Create Question
              </button>
            </div>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default  McqaddingForm;