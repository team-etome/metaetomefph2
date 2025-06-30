import React, { useState } from "react";
import "../adminclassview/classview.css";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiShareBoxFill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

function ClassView() {
  const [showEditBlockButtons, setShowEditBlockButtons] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);


  const APIURL = useSelector((state) => state.APIURL.url);

  // console.log(selectedRowIndex, "aaaa");

  const location = useLocation();
  const navigate = useNavigate();

  const classDetails = location.state?.class;

  console.log(classDetails,"classssssss")

  // console.log(classDetails,4)

  // const handleDelete = async () => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         await axios.delete(`${APIURL}/api/addClassname/${classDetails.class}`);
  //         Swal.fire("Deleted!", "Class has been deleted.", "success");
  //         navigate("/institutionadding"); 
  //       } catch (error) {
  //         console.error(
  //           "There was an error deleting the class!",
  //           error
  //         );
  //         Swal.fire(
  //           "Failed!",
  //           "There was a problem deleting the class.",
  //           "error"
  //         );
  //       }
  //     }
  //   });
  // };



  const handleEdit = () => {
    if (classDetails) {
      navigate("/classadding", { state: { classData: { ...classDetails } } });
      // console.log(classDetails)
    }
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
          
          const classId = classDetails?.id || classDetails?.class; 
          await axios.delete(`${APIURL}/api/addClassname/${classId}`);
          Swal.fire("Deleted!", "Class has been deleted.", "success");
          navigate("/institutionadding");
        } catch (error) {
          console.error("There was an error deleting the class!", error.response);
          Swal.fire(
            "Failed!",
            "There was a problem deleting the class.",
            "error"
          );
        }
      }
    });
  };
  

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
  const handleBackClick = () => {
    navigate("/institutionadding");
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
            
                {/* <IoChevronBackSharp
                  onClick={handleBackClick}
                  className="class_view_back"
                /> */}
           
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
                  <FiEdit className="class_edit" onClick={handleEdit}/>

               
                  <MdDelete className="evaluation_edit" onClick={handleDelete} />

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
          <div className="class_view_form_scroll">
            <Row style={{ paddingTop: "20px" }}>
              <Col md={6}>
                <div className="class_view_group">
                  <label htmlFor="class_no">Class No:</label>
                  <input
                    type="text"
                    id="class_no"
                    name="class_no"
                    value={classDetails ? classDetails.class_name : ""}
                    style={{ textTransform: "capitalize" }}
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
                    style={{ textTransform: "capitalize" }}
                    readOnly
                  />
                </div>
                <div className="class_view_group">
                  <label htmlFor="category">Category</label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    style={{ textTransform: "capitalize" }}
                    className={(!classDetails?.category || classDetails.category === "null") ? "input-empty" : ""}
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
                    style={{ textTransform: "capitalize" }}
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
                    style={{ textTransform: "capitalize" }}
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
                    style={{ textTransform: "capitalize" }}
                    value={classDetails ? classDetails.subject_count : ""}
                    readOnly
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Link
                to={`/studentlist/${classDetails ? classDetails.class : ""}`}
              >
                <div className="student_list_button">
                  <button type="submit">
                    View Student List
                    <RiShareBoxFill style={{ marginLeft: "10px" }} />
                  </button>
                </div>
              </Link>
            </Row>
            {/* <Row className="class_curriculum_view">
              <div className="curriculum_view" style={{border:"2px solid black"}}>
                {classDetails?.curriculum?.map((item, index) => (
                  <Row
                    key={index}
                    className={`curriculum_row_highlight ${
                      index === selectedRowIndex ? "selected-row" : ""
                    }`}
                    onClick={() => handleRowClick(index)}
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
            </Row> */}
            <Row className="class_curriculum_view">
              <label htmlFor="subject_list" className="subject_list_label">Subject List</label>
              <div className="class_view_group">
                  <div className="curriculum_view">
                      {classDetails?.curriculum?.map((item, index) => (
                          <Row
                              key={index}
                              className={`curriculum_row_highlight ${
                                  index === selectedRowIndex ? "selected-row" : ""
                              }`}
                              onClick={() => handleRowClick(index)}
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
              </div>
            </Row>
          </div>
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
