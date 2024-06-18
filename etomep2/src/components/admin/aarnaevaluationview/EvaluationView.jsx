import React, { useState, useEffect, useRef } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import Layout_01_S from "../../../assets/Layout_01_S.png";
import '../aarnaevaluationview/evaluationview.css';

function EvaluationView() {
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
    <Container className="evaluation_view_container">
      <form className="evaluation_view_form">
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <Link to="/aarnanavbar">
              <IoChevronBackSharp className="evaluation_view_back" />
            </Link>
            <h1 className="evaluation_view_title">Evaluation List</h1>
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
                <button className="evaluation_edit">Edit</button>
                <button className="evaluation_block">Block</button>
              </div>
            ) : (
              <div style={{ position: "relative" }} ref={dropdownRef}>
                <button
                  className="evaluation_verticaldot"
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
                    <button className="evaluation_edit">Edit</button>
                    <button className="evaluation_block">Block</button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div style={{ border: "0.5px solid #526D82" }}>
        </div>
        <div className="evaluation_view_scrollable">
        <Row style={{ paddingTop: "20px" }}>
          <Col md={6}>
            <div className="evaluation_view_group">
              <label htmlFor="class_no">Class</label>
              <input type="text" id="class_no" name="class_no" readOnly />
            </div>
            <div className="evaluation_view_group">
              <label htmlFor="category">Category</label>
              <input type="text" id="category" name="category" readOnly />
            </div>
            <div className="evaluation_view_group">
              <label htmlFor="subject">Subject</label>
              <input type="email" id="subject" name="subject" readOnly />
            </div>
          </Col>
          <Col md={6}>
          <div className="evaluation_view_group">
              <label htmlFor="term">Term</label>
              <input
                type="text"
                id="term"
                name="term"
                readOnly
              />
            </div>
            <div className="evaluation_view_group">
              <label htmlFor="faculty_no">No. of Faculties</label>
              <input type="text" id="faculty_no" name="faculty_no" readOnly />
            </div>
            <Row className="tighter-column-gap">
                <Col>
                    <div className="evaluation_view_group full-width-group">
                        <label htmlFor="start_time">Start Time</label>
                        <input type="text" id="start_time" name="start_time" readOnly />
                    </div>
                </Col>
                <Col>
                    <div className="evaluation_view_group full-width-group">
                        <label htmlFor="end_time">End Time</label>
                        <input type="text" id="end_time" name="end_time" readOnly />
                    </div>
                </Col>
            </Row>
          </Col>
        </Row>
        <Row>
            <Col md={12}>
            <div className='evaluation_align_section'>
                <p>Selected Faculties</p>
                <div className='evaluation_assign_layout'>
                    <div className='evaluation_selected_items'>
                        facultyname
                    </div>
                    <div className='evaluation_selected_items'>
                        facultyname
                    </div>
                    <div className='evaluation_selected_items'>
                        facultyname
                    </div>
                </div>
            </div>
            </Col>
        </Row>
        </div>
        </div>
      </form>
    </Container>
  </div>
  )
}

export default EvaluationView