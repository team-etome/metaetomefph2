import React from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import "../adminclassdashboard/adminclassdashboard.css";
import { IoIosAdd } from "react-icons/io";

function AdminClassdashboard() {
  const classListData = [{ medium: "English", facultyName: "yyyyyyyy", classnumber: "1B" },
  { medium: "English", facultyName: "yyyyyyyy" , classnumber: "1B" },
  { medium: "English", facultyName: "yyyyyyyy" , classnumber: "1B" },
  { medium: "English", facultyName: "yyyyyyyy" , classnumber: "1B"  },
  { medium: "English", facultyName: "yyyyyyyy" , classnumber: "1B" },
  { medium: "English", facultyName: "yyyyyyyy" , classnumber: "1B" },
  { medium: "English", facultyName: "yyyyyyyy" , classnumber: "1B" },
  { medium: "English", facultyName: "yyyyyyyy" , classnumber: "1B" },
  { medium: "English", facultyName: "yyyyyyyy" , classnumber: "1B" },
  { medium: "English", facultyName: "yyyyyyyy" , classnumber: "1B" },
  { medium: "English", facultyName: "yyyyyyyy" , classnumber: "1B" },
  { medium: "English", facultyName: "yyyyyyyy" , classnumber: "1B" },
  { medium: "English", facultyName: "yyyyyyyy" , classnumber: "1B" },
  { medium: "English", facultyName: "yyyyyyyy" , classnumber: "1B" },
  { medium: "English", facultyName: "yyyyyyyy" , classnumber: "1B" },
  { medium: "English", facultyName: "yyyyyyyy" , classnumber: "1B" },
  { medium: "English", facultyName: "yyyyyyyy" , classnumber: "1B" },
  { medium: "English", facultyName: "yyyyyyyy" , classnumber: "1B" },
  { medium: "English", facultyName: "yyyyyyyy" , classnumber: "1B" },
  { medium: "English", facultyName: "yyyyyyyy" , classnumber: "1B" },
  { medium: "English", facultyName: "yyyyyyyy" , classnumber: "1B" },
  { medium: "English", facultyName: "yyyyyyyy" , classnumber: "1B" },
  { medium: "English", facultyName: "yyyyyyyy" , classnumber: "1B" },
  ];

  return (
    <div style={{}}>
      <Container></Container>
      <Container className="container-scroll" style={{marginTop:'30px'}}>
        <Row>
          {classListData.map((item, index) => (
            <Col
              key={index}
              className="class_list"
            >
              <div className="border border-white class_rectangle">
                <div className="class_list_medium">
                  {item.medium}
                </div>
                <div className="class_list_facultyname">
                  {item.facultyName}
                </div>
                <div className="class_lisit_circle">
                  <div className="class_number_div">
                    <h1 style={{ fontSize: "30px", fontWeight: "bold" }}>
                      {item.classnumber}
                    </h1>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      <div className="class_adding_button">
        <div className="class_adding">
          <IoIosAdd style={{ height: "40px", width: "40px", color: "#ffff" }}/>
        </div>
      </div>
    </div>
  );
}

export default AdminClassdashboard;
