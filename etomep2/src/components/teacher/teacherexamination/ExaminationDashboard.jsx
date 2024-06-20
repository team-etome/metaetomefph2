import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row, Button ,Form } from "react-bootstrap";
import { IoIosAdd, IoMdDownload, IoMdAdd } from "react-icons/io";
import { MdUpload } from "react-icons/md";
import generateExcelFile from "../../utils/generateExcelFile";
import { BsSearch, BsFilterRight } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import '../teacherexamination/examinationdashboard.css'

function ExaminationDashboard() {
    const [isActive, setIsActive] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [file, setFile] = useState(null);
    const navigate = useNavigate()
    
    useEffect(() => {
      const interval = setInterval(() => {
        setIsActive((prevState) => !prevState);
      }, 2000);
  
      return () => clearInterval(interval);
    }, []);
    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };
  
    const openFileSelector = () => {
      fileInputRef.current.click();
    };
  
  
    const handleAddClick = () => {
      setShowOptions(!showOptions);
    };
      
    // const handleButtonClick= ()=>{
    //   navigate('/questionadding')
    // }

    const handleclick= ()=>{
      navigate('/teacherquestionview')
  }
  const examinationListData = [
    {term: "Mid Term", class: "1 A", dateLeft:'5 days left', subject: "English" },
    {term: "Mid Term", class: "1 B", dateLeft:'5 days left', subject: "English" },
    {term: "Mid Term", class: "1", dateLeft:'5 days left', subject: "English" },
    {term: "Mid Term", class: "1", dateLeft:'5 days left', subject: "English" },
    {term: "Mid Term", class: "1", dateLeft:'5 days left', subject: "English" },
    {term: "Mid Term", class: "1", dateLeft:'5 days left', subject: "English" },
    {term: "Mid Term", class: "1", dateLeft:'5 days left', subject: "English" },
    {term: "Mid Term", class: "1", dateLeft:'5 days left', subject: "English" },
    {term: "Mid Term", class: "1", dateLeft:'5 days left', subject: "English" },
    {term: "Mid Term", class: "1", dateLeft:'5 days left', subject: "English" },
    {term: "Mid Term", class: "1", dateLeft:'5 days left', subject: "English" },
    {term: "Mid Term", class: "1", dateLeft:'5 days left', subject: "English" },
    {term: "Mid Term", class: "1", dateLeft:'5 days left', subject: "English" },
    {term: "Mid Term", class: "1", dateLeft:'5 days left', subject: "English" },
    {term: "Mid Term", class: "1", dateLeft:'5 days left', subject: "English" },
    {term: "Mid Term", class: "1", dateLeft:'5 days left', subject: "English" },
    {term: "Mid Term", class: "1", dateLeft:'5 days left', subject: "English" },
    {term: "Mid Term", class: "1", dateLeft:'5 days left', subject: "English" },
    {term: "Mid Term", class: "1", dateLeft:'5 days left', subject: "English" },
    {term: "Mid Term", class: "1", dateLeft:'5 days left', subject: "English" },  
];

  return (
    <div style={{}} className="teacher_examination_dashboard">
    <Container
      fluid
      style={{ marginTop: "16px" }}
    >
              <Row style={{ paddingLeft: "2vw", paddingTop: "1vw", paddingBottom:'1vw' }}>
              <Col md={6} className="class_number">
              <h4>Class: 8 A</h4>
              </Col>
              <Col md={6}>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    flexDirection: "row",
                    paddingLeft: "1vw",
                  }}
                >
                  <div
                    style={{
                      width: "80%",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                    className="search_filter d-flex align-items-center"
                  >
                    <Form className="d-flex">
                      <div className="position-relative">
                        <BsSearch
                          className="position-absolute top-50 translate-middle-y ms-2"
                          style={{
                            zIndex: 2,
                            height: "20px",
                            width: "20px",
                            color: "#D8D4D4",
                            right: "15px",
                          }}
                        />
                        <Form.Control
                          type="search"
                          placeholder="Search"
                          className="ps-6 teacher_student_search_input"
                          aria-label="Search"
                        />
                      </div>
                    </Form>
                  </div>

                  {/* <div
                    style={{
                      width: "10%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    <BsFilterRight style={{ height: "50px", width: "40px" }} />
                  </div> */}
                </div>
              </Col>
        </Row>
      <Row className="teacher_examination_container">
        {examinationListData.map((item, index) => (
          <Col lg={3} md={6} sm={6} xs={12} key={index} className="examination_list">
            <div onClick={handleclick} className="border border-white examination_rectangle">
              <div className="examiantion_term">{item.term}</div>
              <div className="examination_class_date">
                <div className="examination_class">
                  Class: {item.class}
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