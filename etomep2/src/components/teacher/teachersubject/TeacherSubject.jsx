import React from 'react'
import '../teachersubject/teachersubject.css'
import { Container, Row, Col, Form } from 'react-bootstrap'
import "../teachersubject/teachersubject.css"
import { BsSearch } from "react-icons/bs";

function TeacherSubject() {

  const subjects = [
    { grade: "12 A", subject: "Chemistry" },
    { grade: "9 A", subject: "Chemistry" },
    { grade: "10 A", subject: "Chemistry" },
    { grade: "10 A", subject: "Chemistry" },
    { grade: "10 A", subject: "Chemistry" },
    { grade: "10 A", subject: "Chemistry" },
    { grade: "7 B", subject: "Chemistry" },
    { grade: "11 B", subject: "Chemistry" },
    { grade: "12 A", subject: "Chemistry" },
    { grade: "9 A", subject: "Chemistry" },
    { grade: "10 A", subject: "Chemistry" },
    { grade: "10 A", subject: "Chemistry" },
    { grade: "10 A", subject: "Chemistry" },
    { grade: "10 A", subject: "Chemistry" },
    { grade: "7 B", subject: "Chemistry" },
    { grade: "11 B", subject: "Chemistry" },
    { grade: "12 A", subject: "Chemistry" },
    { grade: "9 A", subject: "Chemistry" },
    { grade: "10 A", subject: "Chemistry" },
    { grade: "10 A", subject: "Chemistry" },
    { grade: "10 A", subject: "Chemistry" },
    { grade: "10 A", subject: "Chemistry" },
    { grade: "7 B", subject: "Chemistry" },
    { grade: "11 B", subject: "Chemistry" },
    { grade: "12 A", subject: "Chemistry" },
    { grade: "9 A", subject: "Chemistry" },
    { grade: "10 A", subject: "Chemistry" },
    { grade: "10 A", subject: "Chemistry" },
    { grade: "10 A", subject: "Chemistry" },
    { grade: "10 A", subject: "Chemistry" },
    { grade: "7 B", subject: "Chemistry" },
    { grade: "11 B", subject: "Chemistry" },
    // Add more subjects as needed
  ];

  return (
    <div>
      <Container fluid className='teacher_subject_container'>
        <Row className='tec_sub_fstrow'>
          <Col className='tech_sub_title_col' md={6}> <h1 className="teacher_subject_title">Subjects</h1> </Col>
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
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",


                }}
                className="teacher_subject_search_filter d-flex align-items-center"
              >
                <Form className="d-flex" >
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
            </div>
          </Col>
        </Row>
        <Row className='tec_sub_crd_rw' >
      <div className="tec_sub_card_container">
        {subjects.map((item, index) => (
          <div className="tec_sub_card" key={index}>
             <div className="card-content">
            <h3>{item.grade}</h3>
            <p>{item.subject}</p>
            </div>
          </div>
        ))}
      </div>
    </Row>


      </Container>
    </div>
  )
}

export default TeacherSubject