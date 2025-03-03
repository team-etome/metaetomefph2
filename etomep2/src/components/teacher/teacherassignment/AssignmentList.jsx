import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { IoIosArrowDown, IoIosArrowUp, IoIosAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import "../teacherassignment/assignmentlist.css";
import { IoChevronBackSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";

function AssignmentList() {
  const [showThisMonth, setShowThisMonth] = useState(true);
  const [showPreviousMonth, setShowPreviousMonth] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();

  console.log(assignments, "assignmentssss");

  const teacher = useSelector((state) => state.teacherinfo);
  const teacher_subject = useSelector((state) => state.teachersubjectinfo);
  const APIURL = useSelector((state) => state.APIURL.url);

  const handleAddClick = () => {
    navigate("/teacherassignmentadding");
  };

  // const handleAssignmentClick = (assignment) => {
  //   setSelectedAssignment(assignment);
  //   setShowModal(true);
  // };

  const handleAssignmentClick = (assignment) => {
    // Check if a PDF is provided
    if (assignment.pdf && assignment.pdf.trim() !== "") {
      setSelectedAssignment(assignment);
      setShowModal(true);
    }
    // Otherwise, if an image is provided, open the modal as well
    else if (assignment.image && assignment.image.trim() !== "") {
      setSelectedAssignment(assignment);
      setShowModal(true);
    }
    // Otherwise, alert that no document is available
    else {
      alert("No document available for this assignment.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const standard = teacher_subject.teachersubjectinfo?.class;
      const division = teacher_subject.teachersubjectinfo?.division;
      const subject = teacher_subject.teachersubjectinfo?.subject;
      const teacher_id = teacher.teacherinfo?.teacher_id;

      try {
        const response = await axios.get(`${APIURL}/api/assignment`, {
          params: {
            teacher_id,
            standard,
            division,
            subject,
          },
        });
        setAssignments(response.data.assignments);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    fetchData();
  }, [APIURL, teacher, teacher_subject]);

  const groupByMonth = (assignments) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const thisMonth = [];
    const previousMonth = [];

    assignments.forEach((assignment) => {
      const assignedDate = new Date(assignment.assigned_date);
      console.log(assignedDate, "assigned date fff")
      if (
        assignedDate.getMonth() === currentMonth &&
        assignedDate.getFullYear() === currentYear
      ) {
        thisMonth.push(assignment);
      } else {
        previousMonth.push(assignment);
      }
    });

    return { thisMonth, previousMonth };
  };

  const { thisMonth, previousMonth } = groupByMonth(assignments);

  const handleBackClick = () => {
    navigate("/teacherclassview");
  };
  // const handleDeleteAssignment = async (id) => {
  //   if (window.confirm("Are you sure you want to delete this assignment?")) {
  //     try {
  //       await axios.delete(`${APIURL}/api/testdelete/${id}/`, {
  //         params: { type: "assignment" }
  //       });
  //       Remove the deleted assignment from the state
  //       setAssignments(prevAssignments =>
  //         prevAssignments.filter(assignment => assignment.id !== id)
  //       );
  //     } catch (error) {
  //       console.error("Error deleting assignment:", error);
  //       alert("Failed to delete assignment.");
  //     }
  //   }
  // };
  const handleDeleteAssignment = async (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this assignment?",
      text: "You won't be able to revert this deletion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${APIURL}/api/testdelete/${id}/`, {
            params: { type: "assignment" }
          });
          // Remove the deleted assignment from the state
          setAssignments(prevAssignments =>
            prevAssignments.filter(assignment => assignment.id !== id)
          );
          Swal.fire("Deleted!", "Your assignment has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting assignment:", error);
          Swal.fire("Error!", "Failed to delete assignment.", "error");
        }
      }
    });
  };



  return (
    <Container className="assignment_container">
      <Row>
        <Col className="assignment_list">
          <div className="assignment_header">
            <h2 className="teaher_assignment_view_title">Assignment</h2>
          </div>
          <hr />
          <div className="assignment_body">
            <div
              className="week"
              onClick={() => setShowThisMonth(!showThisMonth)}
            >
              <span>This Month</span>
              {showThisMonth ? (
                <IoIosArrowUp className="week_icon" />
              ) : (
                <IoIosArrowDown className="week_icon" />
              )}
            </div>
            {showThisMonth &&
              thisMonth.map((assignment) => (
                <div
                  key={assignment.id}
                  className="assignment_item mb-3 p-2"
                  onClick={() => handleAssignmentClick(assignment)}
                >
                  <div className="assignment-item-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h5>{assignment.title}</h5>
                    <MdDelete
                      className="delete-icon"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent opening the modal
                        handleDeleteAssignment(assignment.id);
                      }}
                    />
                  </div>
                  <p>
                    Posted On: {new Date(assignment.assigned_date).toLocaleDateString()}
                  </p>
                </div>
              ))}


            <div
              className="week"
              onClick={() => setShowPreviousMonth(!showPreviousMonth)}
            >
              <span>Previous Month</span>
              {showPreviousMonth ? (
                <IoIosArrowUp className="week_icon" />
              ) : (
                <IoIosArrowDown className="week_icon" />
              )}
            </div>
            {showPreviousMonth &&
              previousMonth.map((assignment) => (
                <div
                  key={assignment.id}
                  className="assignment_item mb-3 p-2"
                  onClick={() => handleAssignmentClick(assignment)}
                >
                  <div className="assignment-item-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4>{assignment.title}</h4>
                    <MdDelete
                      className="delete-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteAssignment(assignment.id);
                      }}
                    />
                  </div>
                  <p>
                    Posted On: {new Date(assignment.assigned_date).toLocaleDateString()}
                  </p>
                </div>
              ))}

          </div>
          <div className="assignment_teacher_button">
            <Button
              className={`teacher_assignment teacher_assignment_my_button ${showModal ? "active" : ""
                }`}
              onClick={handleAddClick}
            >
              <IoIosAdd
                style={{ height: "40px", width: "40px", color: "#ffff" }}
              />
            </Button>
          </div>
        </Col>
      </Row>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="xl"
        centered
      >
        <Modal.Header closeButton>
          <div>
            <Modal.Title className="assignment-modal">Assignments</Modal.Title>
            {selectedAssignment && (
              <p className="custom-due-date">Due_Date: {selectedAssignment.due_date}</p>
            )}
          </div>
        </Modal.Header>
        {/* <Modal.Body>
          <p className="modal_body">
            <strong>{selectedAssignment?.title}</strong>
          </p>
          <p className="modal_date">
            <strong>Due Date :</strong>{" "}
            {selectedAssignment
              ? new Date(selectedAssignment.due_date).toLocaleDateString()
              : ""}
          </p>{" "}
          Add other assignment details here
        </Modal.Body> */}
        <Modal.Body style={{ padding: 0 }}>
          {selectedAssignment && selectedAssignment.pdf && selectedAssignment.pdf.trim() !== "" ? (
            // If PDF exists, show it in an iframe:
            <iframe
              src={selectedAssignment.pdf}
              title="PDF Viewer"
              style={{ width: "100%", height: "80vh", border: "none" }}
            ></iframe>
          ) : selectedAssignment && selectedAssignment.image && selectedAssignment.image.trim() !== "" ? (
            // If image exists, show it:
            <img
              src={selectedAssignment.image}
              alt="Assignment Document"
              style={{ width: "100%", height: "80vh", objectFit: "contain" }}
            />
          ) : (
            <p style={{ padding: "20px" }}>No document available for this assignment.</p>
          )}
        </Modal.Body>

      </Modal>
    </Container>
  );
}

export default AssignmentList;
