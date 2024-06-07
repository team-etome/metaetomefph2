import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import '../aarnaevaluation/evaluationdashboard.css'
import { IoIosAdd } from "react-icons/io";
import { useNavigate  } from "react-router-dom";

function EvaluationDashboard() {
    const [isActive, setIsActive] = useState(false);

    const audioRef = useRef(null);
  
    // const history = useNavigate();
    const navigate = useNavigate()

  
    useEffect(() => {
      const interval = setInterval(() => {
        setIsActive((prevState) => !prevState);
      }, 2000);
  
      return () => clearInterval(interval);
    }, []);
  
    const handleButtonClick= ()=>{
      navigate('/seatassigning')
  }

    const handleclick= ()=>{
      navigate('/evaluationview')
  }

    const evaluationListData = [
        { term: "First Term", class: "1", date:'01/10/2024', subject: "Maths" },
        { term: "First Term", class: "1", date:'01/10/2024', subject: "Maths" },
        { term: "First Term", class: "1", date:'01/10/2024', subject: "Maths" },
        { term: "First Term", class: "1", date:'01/10/2024', subject: "Maths" },
        { term: "First Term", class: "1", date:'01/10/2024', subject: "Maths" },
        { term: "First Term", class: "1", date:'01/10/2024', subject: "Maths" },
        { term: "First Term", class: "1", date:'01/10/2024', subject: "Maths" },
        { term: "First Term", class: "1", date:'01/10/2024', subject: "Maths" },
        { term: "First Term", class: "1", date:'01/10/2024', subject: "Maths" },
        { term: "First Term", class: "1", date:'01/10/2024', subject: "Maths" },
        { term: "First Term", class: "1", date:'01/10/2024', subject: "Maths" },
        { term: "First Term", class: "1", date:'01/10/2024', subject: "Maths" },
        { term: "First Term", class: "1", date:'01/10/2024', subject: "Maths" },
        { term: "First Term", class: "1", date:'01/10/2024', subject: "Maths" },
        { term: "First Term", class: "1", date:'01/10/2024', subject: "Maths" },
        { term: "First Term", class: "1", date:'01/10/2024', subject: "Maths" },
        { term: "First Term", class: "1", date:'01/10/2024', subject: "Maths" },
        { term: "First Term", class: "1", date:'01/10/2024', subject: "Maths" },
        { term: "First Term", class: "1", date:'01/10/2024', subject: "Maths" },
        { term: "First Term", class: "1", date:'01/10/2024', subject: "Maths" },
        { term: "First Term", class: "1", date:'01/10/2024', subject: "Maths" },
        { term: "First Term", class: "1", date:'01/10/2024', subject: "Maths" },
        { term: "First Term", class: "1", date:'01/10/2024', subject: "Maths" },
        { term: "First Term", class: "1", date:'01/10/2024', subject: "Maths" },
        { term: "First Term", class: "1", date:'01/10/2024', subject: "Maths" },

      ];


  return (
        <div style={{ display: "flex", justifyContent: "center", width: "104.5%" }}>
    <Container
      fluid
      className="evaluation_container_scroll"
      style={{ marginTop: "16px" }}
    >
      <Row>
        {evaluationListData.map((item, index) => (
          <Col lg={3} md={4} sm={6} xs={6} key={index} className="evaluation_list">
            <div  onClick={handleclick} className="border border-white evaluation_rectangle">
              <div className="evaluation_term">{item.term}</div>
              <div className="evaluation_class_date">
                <div className="evaluation_class">
                  {item.class}
                </div>
                <div className="evaluation_date">
                  {item.date}
                </div>
              </div>
              <div className="evaluation_subject">{item.subject}</div>

            </div>
          </Col>
        ))}
      </Row>
    </Container>
    <div className="evaluation_adding_button">
      <button
        className={`evaluation_adding my-button ${isActive ? "active" : ""}`}
        onClick={handleButtonClick}
      >
        <IoIosAdd style={{ height: "40px", width: "40px", color: "#ffff" }} />
      </button>
    </div>
  </div>
  )
}

export default EvaluationDashboard