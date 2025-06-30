import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { IoIosAdd } from "react-icons/io";
import { useNavigate  } from "react-router-dom";
import '../teacherevaluation/teacherevaluationlist.css'

function TeacherEvaluationList() {
    const [isActive, setIsActive] = useState(false);

    const navigate = useNavigate()
    
    useEffect(() => {
      const interval = setInterval(() => {
        setIsActive((prevState) => !prevState);
      }, 2000);
  
      return () => clearInterval(interval);
    }, []);
      

//     const handleclick= ()=>{
//       navigate('/teacherquestionview')
//   }
  const evaluationListData = [
    {term: "Mid Term", class: "10", dateLeft:'5 days', subject: "English" },
    {term: "Mid Term", class: "11", dateLeft:'5 days', subject: "English" },
    {term: "Mid Term", class: "8", dateLeft:'5 days', subject: "English" },
    {term: "Mid Term", class: "9", dateLeft:'5 days', subject: "English" },
    {term: "Mid Term", class: "8", dateLeft:'5 days', subject: "English" },
    {term: "Mid Term", class: "1", dateLeft:'5 days', subject: "English" },
    {term: "Mid Term", class: "1", dateLeft:'5 days', subject: "English" },
    {term: "Mid Term", class: "1", dateLeft:'5 days', subject: "English" },
    {term: "Mid Term", class: "1", dateLeft:'5 days', subject: "English" },
    {term: "Mid Term", class: "1", dateLeft:'5 days', subject: "English" },
    {term: "Mid Term", class: "1", dateLeft:'5 days', subject: "English" },
    {term: "Mid Term", class: "1", dateLeft:'5 days', subject: "English" },
    {term: "Mid Term", class: "1", dateLeft:'5 days', subject: "English" },
    {term: "Mid Term", class: "1", dateLeft:'5 days', subject: "English" },
    {term: "Mid Term", class: "1", dateLeft:'5 days', subject: "English" },
    {term: "Mid Term", class: "1", dateLeft:'5 days', subject: "English" },
    {term: "Mid Term", class: "1", dateLeft:'5 days', subject: "English" },
    {term: "Mid Term", class: "1", dateLeft:'5 days', subject: "English" },
    {term: "Mid Term", class: "1", dateLeft:'5 days', subject: "English" },
    {term: "Mid Term", class: "1", dateLeft:'5 days', subject: "English" },  
];

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "104.5%" }}>
    <Container
      fluid
      className="teacher_evaluation_container"
      style={{ marginTop: "16px" }}
    >
      <Row>
        {evaluationListData.map((item, index) => (
          <Col lg={3} md={4} sm={6} xs={6} key={index} className="evaluation_list">
            <div className="border border-white evaluation_rectangle">
              <div className="evaluation_term">{item.term}</div>
              <div className="evaluation_class_date">
                <div className="evaluation_class">
                  {item.class}
                </div>
                <div className="evaluation_date">
                  {item.dateLeft}
                </div>
              </div>
              <div className="evaluation_subject">{item.subject}</div>

            </div>
          </Col>
        ))}
      </Row>
    </Container>
  </div>
  )
}

export default TeacherEvaluationList