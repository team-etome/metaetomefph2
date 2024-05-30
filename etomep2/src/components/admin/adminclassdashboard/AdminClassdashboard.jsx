import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../adminclassdashboard/adminclassdashboard.css";
import { IoIosAdd } from "react-icons/io";

function AdminClassdashboard() {

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsActive((prevState) => !prevState);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const classListData = [
    { medium: "English", facultyName: "yyyyyyyy", classnumber: "1 A" },
    { medium: "English", facultyName: "yyyyyyyy", classnumber: "1 B" },
    { medium: "English", facultyName: "yyyyyyyy", classnumber: "1 C" },
    { medium: "English", facultyName: "yyyyyyyy", classnumber: "1 D" },
    { medium: "English", facultyName: "yyyyyyyy", classnumber: "1 E" },
    { medium: "English", facultyName: "yyyyyyyy", classnumber: "1 F" },
    { medium: "English", facultyName: "yyyyyyyy", classnumber: "1 G" },
    { medium: "English", facultyName: "yyyyyyyy", classnumber: "1 H" },
    { medium: "English", facultyName: "yyyyyyyy", classnumber: "1 I" },
    { medium: "English", facultyName: "yyyyyyyy", classnumber: "1 J" },
    { medium: "English", facultyName: "yyyyyyyy", classnumber: "1 K" },
    { medium: "English", facultyName: "yyyyyyyy", classnumber: "1 L" },
    { medium: "English", facultyName: "yyyyyyyy", classnumber: "1 M" },
    { medium: "English", facultyName: "yyyyyyyy", classnumber: "1 N" },
    { medium: "English", facultyName: "yyyyyyyy", classnumber: "1 O" },
    { medium: "English", facultyName: "yyyyyyyy", classnumber: "1 B" },
    { medium: "English", facultyName: "yyyyyyyy", classnumber: "1 B" },
    { medium: "English", facultyName: "yyyyyyyy", classnumber: "1 B" },
    { medium: "English", facultyName: "yyyyyyyy", classnumber: "1 B" },
    { medium: "English", facultyName: "yyyyyyyy", classnumber: "1 B" },
    { medium: "English", facultyName: "yyyyyyyy", classnumber: "1 B" },
    { medium: "English", facultyName: "yyyyyyyy", classnumber: "1 B" },
  ];

  return (
    <div style={{display:"flex",justifyContent:"center",width:'104.5%'}}>
      <Container fluid className="container-scroll" style={{ marginTop: "16px" }}>
        <Row>
          {classListData.map((item, index) => (
            <Col lg={3} md={4} sm={6} xs={6} key={index} className="class_list">
              <div className="border border-white class_rectangle">
                <div className="class_list_medium">{item.medium}</div>
                <div className="class_list_facultyname">{item.facultyName}</div>
                <div className="class_lisit_circle">
                  <div className="class_number_div">
                    <h1 style={{ fontSize: "1.8rem", fontWeight: "bold" }}>{item.classnumber}</h1>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      <div className="class_adding_button">
        <button className={`class_adding my-button ${isActive ? 'active' : ''}`}>
          <IoIosAdd style={{ height: "40px", width: "40px", color: "#ffff" }} />
        </button>
      </div>
    </div>
  );
}

export default AdminClassdashboard;