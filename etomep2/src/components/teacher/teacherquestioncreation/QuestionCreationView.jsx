import React, { useState, useEffect, useRef } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import Layout_01_S from "../../../assets/Layout_01_S.png";
import '../teacherquestioncreation/questioncreationview.css'

function QuestionCreationView() {
    const [showEditBlockButtons, setShowEditBlockButtons] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const dropdownRef = useRef(null);
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
    
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setShowEditBlockButtons(false);
        }
      };
    
      useEffect(() => {
        window.addEventListener("resize", handleResize);
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          window.removeEventListener("resize", handleResize);
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);
    
      const toggleEditBlockButtons = (e) => {
        e.preventDefault();
        setShowEditBlockButtons((prevState) => !prevState);
      };

  return (
    <div>
    <Container className="teacher_question_view_container">
      <form className="teacher_question_view_form">
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <Link to="/teacheraarna">
              <IoChevronBackSharp className="teacher_view_back" />
            </Link>
            <h1 className="teacher_view_title">Question Creation</h1>
            <div style={{ flex: "1" }}></div>
            {windowWidth > 800 ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "20px",
                  paddingRight: "30px",
                }}
              >
                <button className="teacher_question_edit">Edit</button>
                <button className="teacher_question_block">Block</button>
              </div>
            ) : (
              <div style={{ position: "relative" }} ref={dropdownRef}>
                <button
                  className="teacher_question_verticaldot"
                  onClick={toggleEditBlockButtons}
                >
                  <BsThreeDotsVertical />
                </button>
                {showEditBlockButtons && (
                  <div
                    style={{
                      position: "absolute",
                      right: "0",
                      backgroundColor: "white",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                      borderRadius: "5px",
                      padding: "10px",
                      zIndex: "1000",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <button className="teacher_question_edit">Edit</button>
                    <button className="teacher_question_block">Block</button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div style={{ border: "0.5px solid #676767" }}></div>
        </div>
        <div className='teacher_question_scroll'>
        <Row style={{ paddingTop: "20px" }}>
          <Col md={6}>
            <div className="teacher_question_view_group">
              <label htmlFor="exam_name">Exam Name</label>
              <input type="text" id="exam_name" name="exam_name" readOnly />
            </div>
            <div className="teacher_question_view_group">
              <label htmlFor="exam_date">Exam Date</label>
              <input type="text" id="exam_date" name="exam_date" readOnly />
            </div>
            <div className="teacher_question_view_group">
              <label htmlFor="class_name">Class</label>
              <input type="email" id="class_name" name="class_name" readOnly />
            </div>
            <div className="teacher_question_view_group">
              <label htmlFor="division">Division</label>
              <input
                type="text"
                id="division"
                name="division"
                readOnly
              />
            </div>
            <div className="teacher_question_view_group">
              <label htmlFor="term">Term</label>
              <input type="text" id="term" name="term" readOnly />
            </div>
          </Col>
          <Col md={6}>
            <div className="teacher_question_view_group">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" readOnly />
            </div>
            <div className="teacher_question_view_group">
              <label htmlFor="out_marks">Out of Marks</label>
              <input type="text" id="out_marks" name="out_marks" readOnly />
            </div>
            <div className="teacher_question_view_group">
              <label htmlFor="start_time">Start Time</label>
              <input type="text" id="start_time" name="start_time" readOnly />
            </div>
            <div className="teacher_question_view_group">
              <label htmlFor="end_time">End Time</label>
              <input type="text" id="end_time" name="end_time" readOnly />
            </div>
            <div className='teacher_create_question'>
                <button> Create Question</button>
            </div>
          </Col>
        </Row>
        </div>
      </form>
    </Container>
  </div>
  )
}

export default QuestionCreationView