import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from "react-bootstrap";
import { IoIosAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import amritha from "../../../assets/amritha.png";
import'../adminfacultydashboard/facultydashboard.css'

function FacultyDashboard() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsActive((prevState) => !prevState);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const facultyListData = [
    { employeeid: "English", facultyName: "yyyyyyyy"},
    { employeeid: "English", facultyName: "yyyyyyyy"},    
    { employeeid: "English", facultyName: "yyyyyyyy"},
    { employeeid: "English", facultyName: "yyyyyyyy"},
    { employeeid: "English", facultyName: "yyyyyyyy"},
    { employeeid: "English", facultyName: "yyyyyyyy"},
    { employeeid: "English", facultyName: "yyyyyyyy"},
    { employeeid: "English", facultyName: "yyyyyyyy"},
    { employeeid: "English", facultyName: "yyyyyyyy"},
    { employeeid: "English", facultyName: "yyyyyyyy"},
    { employeeid: "English", facultyName: "yyyyyyyy"},
    { employeeid: "English", facultyName: "yyyyyyyy"},
    { employeeid: "English", facultyName: "yyyyyyyy"},
    { employeeid: "English", facultyName: "yyyyyyyy"},    
    { employeeid: "English", facultyName: "yyyyyyyy"},
    { employeeid: "English", facultyName: "yyyyyyyy"},
    { employeeid: "English", facultyName: "yyyyyyyy"},
    { employeeid: "English", facultyName: "yyyyyyyy"},
    { employeeid: "English", facultyName: "yyyyyyyy"},
    { employeeid: "English", facultyName: "yyyyyyyy"},
    { employeeid: "English", facultyName: "yyyyyyyy"},

  ];
  return (
    <div style={{display:"flex",justifyContent:"center",width:'104.5%'}}>
      <Container fluid className="faculty_container_scroll" style={{ marginTop: "16px" }}>
        <Row>
          {facultyListData.map((item, index) => (
            <Col lg={3} md={4} sm={6} xs={6} key={index} className="class_list">
              <div className="border border-white faculty_rectangle">
                <div className="faculty_list_medium">{item.employeeid}</div>
                <div className="faculty_profile_name">
                  <div>
                <img 
                  src={amritha} 
                  alt='profile pic'
                  className="faculty_profile_photo"
                />
                </div>
                <div className="faculty_list_facultyname">{item.facultyName}</div>
                </div>
                <div className="faculty_lisit_circle">
                  <div className="faculty_number_div">
                    {/* <h1 style={{ fontSize: "1.8rem", fontWeight: "bold" }}>{item.classnumber}</h1> */}
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      <div className="class_adding_button">
        <Link to='/facultyadding'>
        <button className={`class_adding my-button ${isActive ? 'active' : ''}`}>
          <IoIosAdd style={{ height: "40px", width: "40px", color: "#ffff" }} />
        </button>
        </Link>
      </div>
    </div>
  )
}

export default FacultyDashboard