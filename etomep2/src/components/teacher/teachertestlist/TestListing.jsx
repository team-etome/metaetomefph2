import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { IoIosArrowDown, IoIosArrowUp, IoIosAdd } from 'react-icons/io';
import { useNavigate } from "react-router-dom";
import '../teachertestlist/teacherlisting.css'
import { BsFilterRight } from "react-icons/bs";
import { IoChevronBackSharp } from "react-icons/io5";


function TestListing() {
    const [showThisMonth, setShowThisMonth] = useState(true);
    const [showPreviousMonth, setShowPreviousMonth] = useState(true);
    const [showModal, setShowModal] = useState(false);
  
    const navigate = useNavigate();
  
    const handleAddClick = () => {
      navigate('/teachertestadd');
    }
  
    const handleAssignmentClick = (assignment) => {
      setSelectedAssignment(assignment);
      setShowModal(true);
    }
  
    const refrences = {
      thisMonth: [
        { id: 1, title: 'Environmental impacts', description: 'Details about environmental impacts',},
        { id: 3, title: 'Today\'s Model Examination is Vector Graphics', description: 'Details about the model examination', },
      ],
      previousMonth: [
        { id: 2, title: 'Deforestation and Its Effects on Biodiversity', description: 'Details about deforestation',},
        { id: 4, title: 'Soil Erosion', description: 'Details about soil erosion',studentclass: 'A',  },
        { id: 5, title: 'Water Conservation', description: 'Details about water conservation',studentclass: 'A',},
      ]
    };
    const handleBackClick = () => {
      navigate ('/teacherclassview')
    }
  return (
    <Container className='test_container'>
      <Row>
        <Col className='test_list'>
          <div className='test_header'>
          <IoChevronBackSharp onClick={handleBackClick} className="teacher_test_back" />
            <h2>Test</h2>
            <div className="test_search_filter_icon d-flex align-items-center">
              <BsFilterRight className="bs-filter-right" />
            </div>
          </div>
          <hr />
          <div className='test_body'>
            <div className="test_week" onClick={() => setShowThisMonth(!showThisMonth)}>
              <span>June</span>
              {showThisMonth ? <IoIosArrowUp className="test_icon" /> : <IoIosArrowDown className="test_icon" />}
            </div>
            {showThisMonth && refrences.thisMonth.map((refrences) => (
              <div key={refrences.id} className="test_item mb-3 p-2" onClick={() => handleAssignmentClick(refrences)}>
                <h5>{refrences.title}</h5>
                <p>Posted On: 02-12-2024</p>
              </div>
            ))}

            <div className="test_week" onClick={() => setShowPreviousMonth(!showPreviousMonth)}>
              <span>May</span>
              {showPreviousMonth ? <IoIosArrowUp className="test_icon" /> : <IoIosArrowDown className="test_icon" />}
            </div>
            {showPreviousMonth && refrences.previousMonth.map((refrences) => (
              <div key={refrences.id} className="test_item mb-3 p-2" onClick={() => handleAssignmentClick(refrences)}>
                <h4>{refrences.title}</h4>
                <p>Posted On: 02-12-2024</p>
              </div>
            ))}
          </div>
          <div className="test_teacher_button">
            <Button className={`teacher_test teacher_test_my_button ${showModal ? 'active' : ''}`} onClick={handleAddClick}>
              <IoIosAdd style={{ height: "40px", width: "40px", color: "#ffff" }} />
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default TestListing