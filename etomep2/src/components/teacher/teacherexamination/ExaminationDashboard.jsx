import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { IoIosAdd } from "react-icons/io";
import { useNavigate  } from "react-router-dom";
import '../teacherexamination/examinationdashboard.css'

function ExaminationDashboard() {
    const [isActive, setIsActive] = useState(false);

    const navigate = useNavigate()
    
    useEffect(() => {
      const interval = setInterval(() => {
        setIsActive((prevState) => !prevState);
      }, 2000);
  
      return () => clearInterval(interval);
    }, []);
      
    // const handleButtonClick= ()=>{
    //   navigate('/questionadding')
    // }

    const handleclick= ()=>{
      navigate('/teacherquestionview')
  }
  const examinationListData = [
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
      className="teacher_examination_container"
      style={{ marginTop: "16px" }}
    >
      <Row>
        {examinationListData.map((item, index) => (
          <Col lg={3} md={4} sm={6} xs={6} key={index} className="examination_list">
            <div onClick={handleclick} className="border border-white examination_rectangle">
              <div className="examiantion_term">{item.term}</div>
              <div className="examination_class_date">
                <div className="examination_class">
                  {item.class}
                </div>
                <div className="examination_date">
                  {item.dateLeft}
                </div>
              </div>
              <div className="examination_subject">{item.subject}</div>

            </div>
          </Col>
        ))}
      </Row>
    </Container>
  </div>
  )
}

export default ExaminationDashboard