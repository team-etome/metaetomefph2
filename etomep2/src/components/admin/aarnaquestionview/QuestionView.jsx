import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import "../aarnaquestionview/questionview.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function QuestionView() {
  const [showEditBlockButtons, setShowEditBlockButtons] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dropdownRef = useRef(null);

  const location = useLocation();
  const questionPaper = location.state?.questionPaper;
  const APIURL = useSelector((state) => state.APIURL.url);

  const navigate = useNavigate();

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

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${APIURL}/api/questionpaper/${questionPaper.id}`);
          Swal.fire("Deleted!", "Question paper has been deleted.", "success");
          navigate("/aarnanavbar"); // Adjust the route as per your application's routing
        } catch (error) {
          console.error(
            "There was an error deleting the question paper!",
            error
          );
          Swal.fire(
            "Failed!",
            "There was a problem deleting the question paper.",
            "error"
          );
        }
      }
    });
  };
const handleBackClick =() =>{
  navigate('/aarnanavbar');
}
  return (
    <div style={{}}>
      <Container className="question_view_container">
        <form className="question_view_form">
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              {/* <Link to="/aarnanavbar"> */}
                {/* <IoChevronBackSharp onClick={handleBackClick} className="question_view_back" /> */}
              {/* </Link> */}
              <h1 className="question_view_title">{questionPaper?.exam_name || ""}</h1>
              <div style={{ flex: "1" }}></div>
              {windowWidth > 800 ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignContent:'center',
                    gap: "20px",
                    paddingRight: "30px",
                    paddingTop:'10px'
                  }}
                >
                  {/* <button className="question_edit">Edit</button> */}
                  {/* <button
                    onClick={handleDelete}
                    type="button"
                    className="question_block"
                  >
                    Delete
                  </button> */}
                  <MdDelete className="question_block" onClick={handleDelete}/>
                </div>
              ) : (
                <div style={{ position: "relative" }} ref={dropdownRef}>
                  <button
                    className="question_verticaldot"
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
                      {/* <button className="question_edit">Edit</button> */}
                      {/* <button
                        onClick={handleDelete}
                        type="button"
                        className="question_block"
                      >
                        Delete
                      </button> */}
                  <MdDelete className="question_block" onClick={handleDelete}/>

                    </div>
                  )}
                </div>
              )}
            </div>

            <div style={{ border: "0.5px solid #526D82" }}></div>
          </div>
          <div className="qpaper_view_scrollable">
            <Row style={{ paddingTop: "20px" }}>
              <Col md={6}>
                <div className="question_view_group">
                  <label htmlFor="exam_name">Exam Name</label>
                  <input
                    type="text"
                    id="exam_name"
                    name="exam_name"
                    value={questionPaper?.exam_name || ""}
                    readOnly
                  />
                </div>
                <div className="question_view_group">
                  <label htmlFor="exam_date">Exam Date</label>
                  <input
                    type="text"
                    id="exam_date"
                    name="exam_date"
                    value={questionPaper?.exam_date || ""}
                    readOnly
                  />
                </div>
                <div className="question_view_group">
                  <label htmlFor="class_name">Class</label>
                  <input
                    type="email"
                    id="class_name"
                    name="class_name"
                    value={questionPaper?.class_name || ""}
                    readOnly
                  />
                </div>
                <div className="question_view_group">
                  <label htmlFor="term">Term</label>
                  <input
                    type="text"
                    id="term"
                    name="term"
                    value={questionPaper?.term || ""}
                    readOnly
                  />
                </div>
                <div className="question_view_group">
                  <label htmlFor="assign_faculty">Assigned Faculty</label>
                  <input
                    type="text"
                    id="assign_faculty"
                    name="assign_faculty"
                    value={questionPaper?.teacher_name || ""}
                    readOnly
                  />
                </div>
              </Col>
              <Col md={6}>
                <div className="question_view_group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={questionPaper?.subject_name || ""}
                    readOnly
                  />
                </div>
                <div className="question_view_group">
                  <label htmlFor="out_marks">Out of Marks</label>
                  <input
                    type="text"
                    id="out_marks"
                    name="out_marks"
                    value={questionPaper?.total_marks || ""}
                    readOnly
                  />
                </div>
                <div className="question_view_group">
                  <label htmlFor="start_time">Start Time</label>
                  <input
                    type="text"
                    id="start_time"
                    name="start_time"
                    value={questionPaper?.start_time || ""}
                    readOnly
                  />
                </div>
                <div className="question_view_group">
                  <label htmlFor="end_time">End Time</label>
                  <input
                    type="text"
                    id="end_time"
                    name="end_time"
                    value={questionPaper?.end_time || ""}
                    readOnly
                  />
                </div>
              </Col>
            </Row>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default QuestionView;
