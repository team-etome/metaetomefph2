import { React, useRef } from "react";
import "../teacherclassview/teacherclassview.css";
import { Container, Row, Col, Form } from "react-bootstrap";
import { IoIosArrowBack } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function TeacherClassView() {
  const scrollContainerRef = useRef(null);

  const location = useLocation()
  const { item } = location.state || {};
  console.log(item,'item')

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    scrollContainerRef.current.startX = touch.clientX;
    scrollContainerRef.current.scrollLeft =
      scrollContainerRef.current.scrollLeft;
  };

  const handleTouchMove = (e) => {
    if (!scrollContainerRef.current.startX) return;
    const touch = e.touches[0];
    const walk = (touch.clientX - scrollContainerRef.current.startX) * 2; // Scroll faster
    scrollContainerRef.current.scrollLeft -= walk;
  };

  const handleTouchEnd = () => {
    scrollContainerRef.current.startX = null;
  };

  return (
    <div>
      <Container className="teacher_clsview_container" fluid>
        <Row
          style={{
            width: "100%",
            height: "88vh",
            paddingTop: "50px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Row className="tech_clsvw_hd_rw" md={2} xs={1}>
            <Col className="teacher_clsview_ti_cl">
              <Link to="/teachersubject">
                <div>
                  <IoIosArrowBack
                    style={{ color: "#526D82", width: "32px", height: "32px" }}
                  />
                </div>
              </Link>
              <div>
             
                <h1 className="teacher_clsview_title">Class {item.class} {item.division}</h1>
              </div>
            </Col>
            <Col className="teacher_clsview_ti_cl">
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
                  className="tch_clsvw_search_filter d-flex align-items-center"
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
              </div>
            </Col>
          </Row>
          <div
            className="scrollable-container"
            ref={scrollContainerRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <Link to = '/teacherassignment'  className="no-underline-link">
              <div className="tch_vw_snd_rw ">
                <h1 className="tch_vw_scrll_hding" >Assignment</h1>
              </div>
            </Link>

            <Link to ='/teacherrefrencelist'  className="no-underline-link">
            <div className="tch_vw_snd_rw">
              <h1 className="tch_vw_scrll_hding">Reference</h1>
            </div>
            </Link>
            
            <Link to ='/teachertestlist'  className="no-underline-link">
            <div className="tch_vw_snd_rw">
              <h1 className="tch_vw_scrll_hding">Test</h1>
            </div>
            </Link>
            <Link className="no-underline-link">
            <div className="tch_vw_snd_rw" >
              <h1 className="tch_vw_scrll_hding">Result</h1>
            </div>
            </Link>
          </div>
          <Row>
            <h1 className="tch_vw_sndrw_hd">Students List</h1>
            <div className="tch_vw_card_container">
              {item.students
                .map((student, index) => (
                  <div className="tch_vw_card" key={index}>
                    <h3>{student.student_name}</h3>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p1>{student.dob}</p1>
                      <p>{student.admission_no}</p>
                    </div>
                  </div>
                ))}
            </div>
          </Row>
        </Row>
      </Container>
    </div>
  );
}

export default TeacherClassView;
