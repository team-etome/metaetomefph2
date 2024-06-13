import React, { useState } from "react";
import "../adminclassview/classview.css";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiShareBoxFill } from "react-icons/ri";

function ClassView() {
  const [showEditBlockButtons, setShowEditBlockButtons] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  console.log(selectedRowIndex, "aaaa");

  const location = useLocation();

  const classDetails = location.state?.class;

  console.log(classDetails, "sssssss");

  const toggleEditBlockButtons = (e) => {
    e.preventDefault();
    console.log("edit block buttons");
    setShowEditBlockButtons(true);
  };

  const handleRowClick = (index) => {
   
    if (index === selectedRowIndex) {
        setSelectedRowIndex(null);
    } else {
        setSelectedRowIndex(index);
    }

};
  return (
    <div>
      <Container className="class_view_container">
        <form className="class_view_form">
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <Link to="/institutionadding">
                <IoChevronBackSharp className="class_view_back" />
              </Link>
              <h1 className="class_view_title">Class List</h1>
              <div style={{ flex: "1" }}></div>
              {window.innerWidth > 800 ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "20px",
                    paddingRight: "30px",
                  }}
                >
                  <button className="class_edit">Edit</button>
                  {/* <button className="class_block">Block</button> */}
                </div>
              ) : (
                <button
                  className="verticaldot"
                  onClick={toggleEditBlockButtons}
                >
                  <BsThreeDotsVertical />
                </button>
              )}
            </div>
            <div style={{ border: "0.5px solid #526D82" }}></div>
          </div>
          <Row style={{ paddingTop: "20px" }}>
            <Col md={6}>
              <div className="class_view_group">
                <label htmlFor="class_no">Class No:</label>
                <input
                  type="text"
                  id="class_no"
                  name="class_no"
                  value={classDetails ? classDetails.class_name : ""}
                  readOnly
                />
              </div>
              <div className="class_view_group">
                <label htmlFor="division">Division</label>
                <input
                  type="text"
                  id="division"
                  name="division"
                  value={classDetails ? classDetails.division : ""}
                  readOnly
                />
              </div>
              <div className="class_view_group">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={classDetails ? classDetails.category : "null"}
                  readOnly
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="class_view_group">
                <label htmlFor="class_teacher">Class Teacher</label>
                <input
                  type="text"
                  id="class_teacher"
                  name="class_teacher"
                  value={classDetails ? classDetails.class_teacher : ""}
                  readOnly
                />
              </div>
              <div className="class_view_group">
                <label htmlFor="medium">Medium</label>
                <input
                  type="text"
                  id="medium"
                  name="medium"
                  value={classDetails ? classDetails.medium : ""}
                  readOnly
                />
              </div>
              <div className="class_view_group">
                <label htmlFor="subject_no">No. of Subjects</label>
                <input
                  type="text"
                  id="subject_no"
                  name="subject_no"
                  value={classDetails ? classDetails.subject_count : ""}
                  readOnly
                />
              </div>
            </Col>
          </Row>
          <Row>

            <Link to='/studentlist'>
          <div className="student_list_button">
              <button type="submit">
                    View Student List
                    <RiShareBoxFill style={{ marginLeft: "10px" }}/>
                  </button>
              </div>
              </Link>

          </Row>
          <Row className="class_curriculum_view">
            <div className="curriculum_view">
              {classDetails?.curriculum?.map((item, index) => (
                <Row
                  key={index}
                  className={`curriculum_row_highlight ${
                    index === selectedRowIndex ? "selected-row" : ""
                  }`}
                  onClick={() => handleRowClick(index)} // Handle row click to toggle selection
                >
                  <Col md={4}>
                    <p>{item.subject}</p>
                  </Col>
                  <Col md={4}>
                    <p>{item.publisher_name}</p>
                  </Col>
                  <Col md={4}>
                    <p>{item.teacher}</p>
                  </Col>
                </Row>
              ))}
            </div>
          </Row>
        </form>
      </Container>
      {showEditBlockButtons && (
        <div className="editBlockButtons">
          <button className="faculty_edit">Edit</button>
          {/* <button className="faculty_block">Block</button> */}
        </div>
      )}
    </div>
  );
}

export default ClassView;
