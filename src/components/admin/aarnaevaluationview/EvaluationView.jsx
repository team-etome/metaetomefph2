import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { MdDelete, MdEdit } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import "../aarnaevaluationview/evaluationview.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

function EvaluationView() {
  const [className, setClassName] = useState("");
  const [division, setDivision] = useState("");
  const [subject, setSubject] = useState("");
  const [term, setTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showEditBlockButtons, setShowEditBlockButtons] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dropdownRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [ids,setIds] = useState(null);

  const location = useLocation();
  const evaluationData = location.state?.evaluation;
  const APIURL = useSelector((state) => state.APIURL.url);

  const navigate = useNavigate();

  console.log(evaluationData, "evaluation dataaaa");

  // Initialize controlled state variables from evaluationData
  useEffect(() => {
    if (evaluationData) {
      setClassName(evaluationData.class_name || "");
      setDivision(evaluationData.division || "");
      setSubject(evaluationData.subject_name || "");
      setTerm(evaluationData.term || "");
      setStartDate(evaluationData.start_date || "");
      setEndDate(evaluationData.end_date || "");
      setIds(evaluationData.id || "")
    }
  }, [evaluationData]);

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
          await axios.delete(
            `${APIURL}/api/evaluationadding/${evaluationData.id}`
          );
          Swal.fire("Deleted!", "Evaluation has been deleted.", "success");
          navigate("/aarnanavbar");
        } catch (error) {
          console.error("There was an error deleting the evaluation!", error);
          Swal.fire(
            "Failed!",
            "There was a problem deleting the evaluation.",
            "error"
          );
        }
      }
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        class_name: className,
        division: division,
        subject_name: subject,
        term: term,
        start_date: startDate,
        end_date: endDate,
        id: ids
      };
      await axios.put(`${APIURL}/api/evaluationadding/${evaluationData.id}`, updatedData);
      Swal.fire("Updated!", "Evaluation has been updated.", "success");
      setIsEditing(false); // Exit editing mode after update
    } catch (error) {
      console.error("Error updating evaluation:", error);
      Swal.fire("Failed!", "There was a problem updating the evaluation.", "error");
    }
  };

  const handleBackClick = () => {
    navigate("/aarnanavbar");
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
                justifyContent: "space-between",
              }}
            >
              {/* <Link to="/aarnanavbar"> */}
              {/* <IoChevronBackSharp onClick={handleBackClick} className="evaluation_view_back" /> */}
              {/* </Link> */}
              <h1 className="evaluation_view_title">
                Class : {evaluationData?.class_name || ""} {evaluationData?.division}
              </h1>
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
                  {/* <button className="evaluation_edit">Delete</button> */}
                  {/* <button type="button" onClick={handleDelete} className="evaluation_edit">Delete</button> */}
                  {/* <MdEdit
                    onClick={handleEdit}
                    className="evaluation_edit"
                    style={{ cursor: "pointer", fontSize: "24px" }}
                    title="Edit Evaluation"
                  /> */}
                  <MdDelete
                    onClick={handleDelete}
                    className="evaluation_edit"
                  />
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
                      {/* <button className="evaluation_block">Block</button> */}
                      {/* <button type="button" onClick={handleDelete} className="evaluation_edit">Delete</button> */}
                      {/* <MdEdit
                        onClick={handleEdit}
                        className="evaluation_edit"
                        style={{ cursor: "pointer", fontSize: "24px", color: "blue" }}
                        title="Edit Evaluation"
                      /> */}
                      <MdDelete
                        onClick={handleDelete}
                        className="evaluation_edit"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            <div style={{ border: "0.5px solid #526D82" }}></div>
            <div className="evaluation_view_scrollable">
              <Row style={{ paddingTop: "20px" }}>
                <Col md={6}>
                  <div className="evaluation_view_group">
                    <label htmlFor="class_no">Class</label>
                    <input
                      value={`${className}${division}`}
                      type="text"
                      id="class_no"
                      name="class_no"
                      readOnly={!isEditing}
                      onChange={(e) => {
                        const parts = e.target.value.split(" ");
                        setClassName(parts[0] || "");
                        setDivision(parts.slice(1).join(" ") || "");
                      }}
                    />
                  </div>
                  {/* <div className="evaluation_view_group">
                    <label htmlFor="category">Category</label>
                    <input type="text" id="category" name="category" readOnly />
                  </div> */}
                  <div className="evaluation_view_group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      value={subject}
                      type="text"
                      id="subject"
                      name="subject"
                      readOnly={!isEditing}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="evaluation_view_group">
                    <label htmlFor="term">Term</label>
                    <input
                      value={term}
                      type="text"
                      id="term"
                      name="term"
                      readOnly={!isEditing}
                      onChange={(e) => setTerm(e.target.value)}
                    />
                  </div>
                  {/* <div className="evaluation_view_group">
                    <label htmlFor="faculty_no">No. of Faculties</label>
                    <input
                      type="text"
                      id="faculty_no"
                      name="faculty_no"
                      readOnly
                    />
                  </div> */}
                  <Row className="tighter-column-gap">
                    <Col>
                      <div className="evaluation_view_group full-width-group">
                        <label htmlFor="start_time">Start Date</label>
                        <input
                          value={startDate}
                          type="text"
                          id="start_time"
                          name="start_time"
                          readOnly={!isEditing}
                        />
                      </div>
                    </Col>
                    <Col>
                      <div className="evaluation_view_group full-width-group">
                        <label htmlFor="end_time">End Date</label>
                        <input
                          value={endDate}
                          type="date"
                          id="end_time"
                          name="end_time"
                          readOnly={!isEditing}
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <div className="evaluation_align_section">
                    <p className="slt_fc">Selected Faculties</p>
                    <div className="evaluation_assign_layout">
                      <div className="evaluation_selected_items">
                        {evaluationData?.teacher_name || ""}
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            {isEditing && (
              <div className="submit">
                <button type="submit" className="submit_button" onClick={handleUpdate} >
                  Submit
                </button>
              </div>
            )}
          </div>
        </form>
      </Container>
    </div>
  );
}

export default EvaluationView;
