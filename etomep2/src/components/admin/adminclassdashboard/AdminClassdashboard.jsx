import React from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import "../adminclassdashboard/adminclassdashboard.css";
import { IoIosAdd } from "react-icons/io";

function AdminClassdashboard() {
  const classListData = [{ medium: "English", facultyName: "yyyyyyyy" },
  { medium: "English", facultyName: "yyyyyyyy" },
  { medium: "English", facultyName: "yyyyyyyy" },
  { medium: "English", facultyName: "yyyyyyyy" },
  { medium: "English", facultyName: "yyyyyyyy" },
  { medium: "English", facultyName: "yyyyyyyy" },
  { medium: "English", facultyName: "yyyyyyyy" },
  { medium: "English", facultyName: "yyyyyyyy" },
  { medium: "English", facultyName: "yyyyyyyy" },
  { medium: "English", facultyName: "yyyyyyyy" },
  { medium: "English", facultyName: "yyyyyyyy" },
  { medium: "English", facultyName: "yyyyyyyy" },
  { medium: "English", facultyName: "yyyyyyyy" },
  { medium: "English", facultyName: "yyyyyyyy" },
  { medium: "English", facultyName: "yyyyyyyy" },
  ];

  return (
    <div>
      <Container></Container>
      <Container className="container-scroll">
        <Row>
          <Col
            md={6}
            xl={3}
            style={{ marginTop: "50px" }}
            className="class_add"
          >
            <div
              className="border border-white"
              style={{
                width: "250px",
                height: "100px",
                backgroundColor: "#ffff",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                border: "1px solid white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: "8px",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    marginTop: "-30px",
                    marginLeft: "5%",
                    backgroundColor: "#526D82",
                    backgroundSize: "cover",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <IoIosAdd
                    style={{ height: "100%", width: "100%", color: "#ffff" }}
                  />
                </div>
              </div>
              <p
                style={{
                  margin: "0",
                  marginBottom: "5px",
                  marginRight: "5%",
                  textAlign: "right",
                  color: "#526D82",
                  fontSize: "29px",
                  fontWeight: "bold",
                }}
              >
                Add Class
              </p>
            </div>
          </Col>
          {classListData.map((item, index) => (
            <Col
              key={index}
              style={{ marginTop: "50px"}}
              className="class_list"
            >
              <div
                className="border border-white"
                style={{
                  width: "250px",
                  height: "100px",
                  backgroundColor: "#ffff",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  border: "1px solid white",
                  borderRadius: "8px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    color: "#000000",
                  }}
                >
                  {item.medium}
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "10px",
                    color: "#807B7B",
                  }}
                >
                  {item.facultyName}
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "80%",
                    left: "10px",
                    transform: "translateY(-150%)",
                  }}
                >
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      backgroundColor: "#FFFF",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow: "0 -5px 10px rgba(0, 0, 0, 0.1)",
                      color: "#526D82",
                    }}
                  >
                    <h1 style={{ fontSize: "30px", fontWeight: "bold" }}>
                      2 B
                    </h1>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default AdminClassdashboard;
