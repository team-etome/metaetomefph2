import React, { useState, useEffect, useRef } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import Layout_01_S from "../../../assets/Layout_01_S.png";
import '../aarnaseatview/seatview.css'

function SeatView() {
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
    <Container className="seat_view_container">
      <form className="seat_view_form">
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <Link to="/aarnanavbar">
              <IoChevronBackSharp className="seat_view_back" />
            </Link>
            <h1 className="seat_view_title">Seat List</h1>
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
                <button className="seat_block">Block</button>
              </div>
            ) : (
              <div style={{ position: "relative" }} ref={dropdownRef}>
                <button
                  className="seat_verticaldot"
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
                    <button className="seat_block">Block</button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div style={{ border: "0.5px solid #526D82" }}></div>
        </div>
        <Row style={{ paddingTop: "20px" }}>
          <Col md={6}>
            <div className="seat_view_group">
              <label htmlFor="hall_no">Hall No</label>
              <input type="text" id="hall_no" name="hall_no" readOnly />
            </div>
            <div className="seat_view_group">
              <label htmlFor="column_no">No. of Columns</label>
              <input type="text" id="column_no" name="column_no" readOnly />
            </div>
            <div className="seat_view_group">
              <label htmlFor="table_no">No. of Tables</label>
              <input type="email" id="table_no" name="table_no" readOnly />
            </div>
          </Col>
          <Col md={6}>
          <div className="seat_view_group">
              <label htmlFor="students_bench">Students per Bench</label>
              <input
                type="text"
                id="students_bench"
                name="students_bench"
                readOnly
              />
            </div>
            <div className="seat_view_group">
              <label htmlFor="exam_date">Exam Date</label>
              <input type="text" id="exam_date" name="exam_date" readOnly />
            </div>
            <Row className="tighter-column-gap">
                <Col>
                    <div className="seat_view_group full-width-group">
                        <label htmlFor="start_time">Start Time</label>
                        <input type="text" id="start_time" name="start_time" readOnly />
                    </div>
                </Col>
                <Col>
                    <div className="seat_view_group full-width-group">
                        <label htmlFor="end_time">End Time</label>
                        <input type="text" id="end_time" name="end_time" readOnly />
                    </div>
                </Col>
            </Row>
          </Col>
        </Row>
        <Row>
            <Col>
            <div className='align_section'>
                <p>Selected Faculties</p>
                <div className='assign_layout'>
                    <div className='selected_items'>
                        facultyname
                    </div>
                    <div className='selected_items'>
                        facultyname
                    </div>
                    <div className='selected_items'>
                        facultyname
                    </div>
                </div>
            </div>
            <div className='chosen_layout'>
                <p>Selected Layout</p>
                <img src={Layout_01_S} alt="Selected layout" className='selected_img'/>
            </div>
            </Col>
            <Col>
            <div className='align_section'>
                <p>Selected Classes</p>
                <div className='assign_layout'>
                <div className='selected_items'>
                        class
                    </div>
                    <div className='selected_items'>
                        class
                    </div>
                    <div className='selected_items'>
                        class
                    </div>
                </div>
            </div>
            </Col>
        </Row>
      </form>
    </Container>
  </div>
  )
}

export default SeatView