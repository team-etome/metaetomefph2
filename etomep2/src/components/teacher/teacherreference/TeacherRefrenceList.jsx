import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { IoIosArrowDown, IoIosArrowUp, IoIosAdd } from 'react-icons/io';
import { useNavigate } from "react-router-dom";
import '../teacherreference/teacherrefrencelist.css';

function TeacherRefrenceList() {
    const [showThisMonth, setShowThisMonth] = useState(true);
    const [showPreviousMonth, setShowPreviousMonth] = useState(true);
    const [showModal, setShowModal] = useState(false);
  
    const navigate = useNavigate();
  
    const handleAddClick = () => {
      navigate('/teacherrefrenceadding');
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

  
  return (
    <Container className='refrence_container'>
      <Row>
        <Col className='refrence_list'>
          <h2>References</h2>
          <hr />
          <div className='refrence_body'>
            <div className="refrence_week" onClick={() => setShowThisMonth(!showThisMonth)}>
              <span>June</span>
              {showThisMonth ? <IoIosArrowUp className="week_icon" /> : <IoIosArrowDown className="week_icon" />}
            </div>
            {showThisMonth && refrences.thisMonth.map((refrences) => (
              <div key={refrences.id} className="refrence_item mb-3 p-2" onClick={() => handleAssignmentClick(refrences)}>
                <h5>{refrences.title}</h5>
                <p>Posted On: 02-12-2024</p>
              </div>
            ))}

            <div className="refrence_week" onClick={() => setShowPreviousMonth(!showPreviousMonth)}>
              <span>May</span>
              {showPreviousMonth ? <IoIosArrowUp className="week_icon" /> : <IoIosArrowDown className="week_icon" />}
            </div>
            {showPreviousMonth && refrences.previousMonth.map((refrences) => (
              <div key={refrences.id} className="refrence_item mb-3 p-2" onClick={() => handleAssignmentClick(refrences)}>
                <h4>{refrences.title}</h4>
                <p>Posted On: 02-12-2024</p>
              </div>
            ))}
          </div>
          <div className="refrence_teacher_button">
            <Button className={`teacher_refrence my-button ${showModal ? 'active' : ''}`} onClick={handleAddClick}>
              <IoIosAdd style={{ height: "40px", width: "40px", color: "#ffff" }} />
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default TeacherRefrenceList