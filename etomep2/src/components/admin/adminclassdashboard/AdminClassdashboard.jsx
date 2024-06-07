import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../adminclassdashboard/adminclassdashboard.css";
import { IoIosAdd } from "react-icons/io";
import { useNavigate  } from "react-router-dom";
import amritha from "../../../assets/amritha.png";
import mp3File from "../../../../src/assets/fun.mp3";

function AdminClassdashboard() {
  const [isActive, setIsActive] = useState(false);

  // const audioRef = useRef(null);

  // const history = useNavigate();
  const navigate = useNavigate()


  useEffect(() => {
    const interval = setInterval(() => {
      setIsActive((prevState) => !prevState);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // const handleButtonClick = (event) => {
  //   event.preventDefault();
  //   setIsActive(!isActive);
  //   if (audioRef.current) {
  //     audioRef.current.play();
  //   }
  //   setTimeout(() => {
  //     history("/classadding");
  //   }, 500);
  // };
  const handleButtonClick= ()=>{
    navigate('/classadding')
}

  const handleclick= ()=>{
    navigate('/classview')
}

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
    <div style={{ display: "flex", justifyContent: "center", width: "104.5%" }}>
      <Container
        fluid
        className="container-scroll"
        style={{ marginTop: "16px" }}
      >
        <Row>
          {classListData.map((item, index) => (
            <Col lg={3} md={4} sm={6} xs={6} key={index} className="class_list">
              <div onClick={handleclick} className="border border-white class_rectangle">
                <div className="class_list_medium">{item.medium}</div>
                <div className="class_profile_name">
                  <div>
                    <img
                      src={amritha}
                      alt="profile pic"
                      className="faculty_profile_photo"
                    />
                  </div>
                  <div className="class_list_facultyname">
                    {item.facultyName}
                  </div>
                </div>
                <div className="class_lisit_circle">
                  <div className="class_number_div">
                    <h1 style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
                      {item.classnumber}
                    </h1>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      {/* <div className="class_adding_button">
        <audio ref={audioRef} src={mp3File}></audio>
        <Link to="/classadding">
          <button
            className={`class_adding my-button ${isActive ? "active" : ""}`}
          >
            <IoIosAdd
              style={{ height: "40px", width: "40px", color: "#ffff" }}
            />
          </button>
        </Link>
      </div> */}
      <div className="class_adding_button">
        {/* <audio ref={audioRef} src={mp3File}></audio> */}
        <button
          className={`class_adding my-button ${isActive ? "active" : ""}`}
          onClick={handleButtonClick}
        >
          <IoIosAdd style={{ height: "40px", width: "40px", color: "#ffff" }} />
        </button>
      </div>
    </div>
  );
}

export default AdminClassdashboard;
