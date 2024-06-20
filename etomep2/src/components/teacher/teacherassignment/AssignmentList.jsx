import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { IoIosArrowDown, IoIosArrowUp, IoIosAdd } from 'react-icons/io';
import { useNavigate } from "react-router-dom";
import '../teacherassignment/assignmentlist.css';

function AssignmentList() {
  const [showThisMonth, setShowThisMonth] = useState(true);
  const [showPreviousMonth, setShowPreviousMonth] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showCompleted, setShowCompleted] = useState(true);
  const [showPending, setShowPending] = useState(true);

  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate('/teacherassignmentadding');
  }

  const handleAssignmentClick = (assignment) => {
    setSelectedAssignment(assignment);
    setShowModal(true);
  }

  const assignments = {
    thisMonth: [
      { id: 1, title: 'Environmental impacts', description: 'Details about environmental impacts' },
      { id: 3, title: 'Today\'s Model Examination is Vector Graphics', description: 'Details about the model examination' },
    ],
    previousMonth: [
      { id: 2, title: 'Deforestation and Its Effects on Biodiversity', description: 'Details about deforestation' },
      { id: 4, title: 'Soil Erosion', description: 'Details about soil erosion' },
      { id: 5, title: 'Water Conservation', description: 'Details about water conservation' },
    ]
  };

  const completedAssignments = [
    { name: 'Valayar paramashivam', status: 'Completed', date: '02-12-2024' },
    { name: 'Valayar paramashivam', status: 'Completed', date: '02-12-2024' },
    { name: 'Valayar paramashivam', status: 'Completed', date: '02-12-2024' },
    { name: 'Valayar paramashivam', status: 'Completed', date: '02-12-2024' },
    { name: 'Valayar paramashivam', status: 'Completed', date: '02-12-2024' },
    { name: 'Valayar paramashivam', status: 'Completed', date: '02-12-2024' },
    { name: 'Valayar paramashivam', status: 'Completed', date: '02-12-2024' },
    { name: 'Valayar paramashivam', status: 'Completed', date: '02-12-2024' },
    { name: 'Valayar paramashivam', status: 'Completed', date: '02-12-2024' },
    { name: 'Valayar paramashivam', status: 'Completed', date: '02-12-2024' },
    { name: 'Valayar paramashivam', status: 'Completed', date: '02-12-2024' },

  ];

  const pendingAssignments = [
    { name: 'Meesha Madhavan', status: 'Pending', date: '02-12-2024' },
    { name: 'Meesha Madhavan', status: 'Pending', date: '02-12-2024' },
    { name: 'Meesha Madhavan', status: 'Pending', date: '02-12-2024' },
    { name: 'Meesha Madhavan', status: 'Pending', date: '02-12-2024' },
    { name: 'Meesha Madhavan', status: 'Pending', date: '02-12-2024' },
    { name: 'Meesha Madhavan', status: 'Pending', date: '02-12-2024' },
  ];

  return (
    <Container className='assignment_container'>
      <Row>
        <Col className='assignment_list'>
          <h2>Assignment</h2>
          <hr />
          <div className='assignment_body'>
            <div className="week" onClick={() => setShowThisMonth(!showThisMonth)}>
              <span>June</span>
              {showThisMonth ? <IoIosArrowUp className="week_icon" /> : <IoIosArrowDown className="week_icon" />}
            </div>
            {showThisMonth && assignments.thisMonth.map((assignment) => (
              <div key={assignment.id} className="assignment_item mb-3 p-2" onClick={() => handleAssignmentClick(assignment)}>
                <h5>{assignment.title}</h5>
                <p>Posted On: 02-12-2024</p>
              </div>
            ))}

            <div className="week" onClick={() => setShowPreviousMonth(!showPreviousMonth)}>
              <span>May</span>
              {showPreviousMonth ? <IoIosArrowUp className="week_icon" /> : <IoIosArrowDown className="week_icon" />}
            </div>
            {showPreviousMonth && assignments.previousMonth.map((assignment) => (
              <div key={assignment.id} className="assignment_item mb-3 p-2" onClick={() => handleAssignmentClick(assignment)}>
                <h4>{assignment.title}</h4>
                <p>Posted On: 02-12-2024</p>
              </div>
            ))}
          </div>
          <div className="assignment_teacher_button">
            <Button className={`teacher_assignment my-button ${showModal ? 'active' : ''}`} onClick={handleAddClick}>
              <IoIosAdd style={{ height: "40px", width: "40px", color: "#ffff" }} />
            </Button>
          </div>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton >
          <Modal.Title className='assignment-modal'>Assignments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='modal_body'><strong>{selectedAssignment?.title}</strong></p>
          <p className='modal_date'><strong>Posted On:</strong> 02-12-2024</p>

          <div>
            <div className="week" onClick={() => setShowCompleted(!showCompleted)}>
              <span>Completed ({completedAssignments.length})</span>
              {showCompleted ? <IoIosArrowUp className="week_icon" /> : <IoIosArrowDown className="week_icon" />}
            </div>
            {showCompleted && (
              <div className="assignments-container scrollable-container">
                {completedAssignments.map((assignment, index) => (
                  <div key={index} className="assignment-card">
                    <div className="assignment-title">{assignment.name}</div>
                    <div className="assignment-info">
                      <div className={`assignment-status ${assignment.status.toLowerCase()}`}>
                        {assignment.status}
                      </div>
                      <div className="assignment-date">{assignment.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="week" onClick={() => setShowPending(!showPending)}>
              <span>Pending ({pendingAssignments.length})</span>
              {showPending ? <IoIosArrowUp className="week_icon" /> : <IoIosArrowDown className="week_icon" />}
            </div>
            {showPending && (
              <div className="assignments-container scrollable-container">
                {pendingAssignments.map((assignment, index) => (
                  <div key={index} className="assignment-card">
                    <div className="assignment-title">{assignment.name}</div>
                    <div className="assignment-info">
                      <div className={`assignment-status ${assignment.status.toLowerCase()}`}>
                        {assignment.status}
                      </div>
                      <div className="assignment-date">{assignment.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer> */}
      </Modal>
    </Container>
  );
}

export default AssignmentList;
