import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { IoIosArrowDown, IoIosArrowUp, IoIosAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../teacherassignment/assignmentlist.css";
import { useSelector } from "react-redux";

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

  const handleAssignmentClick = (assignment) => {
    setSelectedAssignment(assignment);
    setShowModal(true);
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
      console.log(assignedDate,"assigned date fff")
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

  return (
    <Container className="assignment_container">
      <Row>
        <Col className="assignment_list">
          <div className="assignment_header">
            <h2>Assignment</h2>
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
                  <h5>{assignment.title}</h5>
                  <p>
                    Posted On:{" "}
                    {new Date(assignment.assigned_date).toLocaleDateString()}
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
                  <h4>{assignment.title}</h4>
                  <p>
                    Posted On:{" "}
                    {new Date(assignment.assigned_date).toLocaleDateString()}
                  </p>
                </div>
              ))}
          </div>
          <div className="assignment_teacher_button">
            <Button
              className={`teacher_assignment teacher_assignment_my_button ${
                showModal ? "active" : ""
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
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="assignment-modal">Assignments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="modal_body">
            <strong>{selectedAssignment?.title}</strong>
          </p>
          <p className="modal_date">
            <strong>Due Date :</strong>{" "}
            {selectedAssignment
              ? new Date(selectedAssignment.due_date).toLocaleDateString()
              : ""}
          </p>{" "}
          {/* Add other assignment details here */}
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default AssignmentList;
