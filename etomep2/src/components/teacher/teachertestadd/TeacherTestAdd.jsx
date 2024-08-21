import React, { useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { IoIosArrowDown, IoIosArrowUp, IoIosAdd } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import "../teachertestadd/teachertestadd.css";

function TeacherTestAdd() {
  const [showUploadArea, setShowUploadArea] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [examName, setExamName] = useState("");
  const [examDate, setExamDate] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState("");
  const [outOfMarks, setOutOfMarks] = useState("");
  const [teacherCode, setTeacherCode] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const navigate = useNavigate();

  // const handleSubmit = () => {
  //   navigate('');
  // }
  const handleBackClick = () => {
    navigate("/teachertestlist");
  };
  const handlenavigate = () => {
    navigate("/teachermocktest");
  };

  return (
    <div className="teacher_test_adding">
      <Container className="teacher_testadd_form">
        <div className="teacher_test_add_header">
          {/* <Link to="/teachertestlist"> */}
         
          {/* </Link> */}
          <h1 className="teacher_testadd_title">Test</h1>
        </div>
        <hr style={{ border: " 1px solid #526D82" }} />
        <div className="teacher_test_adding_scroll">
          <Row>
            <Col md={6}>
              <div className="teacher_testadd_group">
                <label htmlFor="examname">
                  Exam Name
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input type="text" id="examname" name="examname" />
              </div>
              <div className="teacher_testadd_group">
                <label htmlFor="examdate">
                  Exam Date
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input type="date" id="examdate" name="examdate" />
              </div>
              <div className="teacher_testadd_group">
                <label htmlFor="testsub">
                  Subject
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input type="text" id="testsub" name="testsub" />
              </div>
              <div className="teacher_testadd_group">
                <label htmlFor="testtopic">
                  Topic
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input type="text" id="testtopic" name="testtopic" />
              </div>
            </Col>
            <Col md={6}>
              <div className="teacher_testadd_group">
                <label htmlFor="testduration">
                  Duration
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input  type="number" id="testduration" name="testduration" />
              </div>
              <div className="teacher_testadd_group">
                <label htmlFor="testoutofmarks">
                  Out Of Marks
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input type="text" id="testoutofmarks" name="testoutofmarks" />
              </div>
              <div className="teacher_testadd_group">
                <label htmlFor="teachercode">
                  Teacher Code
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input type="text" id="teachercode" name="teachercode" />
              </div>
            </Col>
            <div className="teacher_testadd_submit">
              <button type="submit" onClick={handlenavigate}>
                Create Question
              </button>
            </div>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default TeacherTestAdd;
