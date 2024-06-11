import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { IoIosAdd } from "react-icons/io";
import { useNavigate  } from "react-router-dom";
import amritha from "../../../assets/amritha.png";
import '../adminlokatextbookdashboard/lokabookdashboard.css'

function LokaBookDashboard() {
  const [isActive, setIsActive] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setIsActive((prevState) => !prevState);
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  const handleButtonClick= ()=>{
    navigate('/adminlokatextbook')
}

  const handleclick= ()=>{
    navigate('/lokatextview')
}

  const lokabookListData = [
    { subject: "English", publisherName: "yyyyyyyy",},   
    { subject: "English", publisherName: "yyyyyyyy",},
    { subject: "English", publisherName: "yyyyyyyy",},
    { subject: "English", publisherName: "yyyyyyyy",},
    { subject: "English", publisherName: "yyyyyyyy",},
    { subject: "English", publisherName: "yyyyyyyy",},
    { subject: "English", publisherName: "yyyyyyyy",},
    { subject: "English", publisherName: "yyyyyyyy",},
    { subject: "English", publisherName: "yyyyyyyy",},
    { subject: "English", publisherName: "yyyyyyyy",},
    { subject: "English", publisherName: "yyyyyyyy",},
    { subject: "English", publisherName: "yyyyyyyy",},
    { subject: "English", publisherName: "yyyyyyyy",},
    { subject: "English", publisherName: "yyyyyyyy",},
    { subject: "English", publisherName: "yyyyyyyy",},
    { subject: "English", publisherName: "yyyyyyyy",},
    { subject: "English", publisherName: "yyyyyyyy",},
    { subject: "English", publisherName: "yyyyyyyy",},
    { subject: "English", publisherName: "yyyyyyyy",},
    { subject: "English", publisherName: "yyyyyyyy",},
    { subject: "English", publisherName: "yyyyyyyy",},
    { subject: "English", publisherName: "yyyyyyyy",},
  ];

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "104.5%" }}>
      <Container
        fluid
        className="admin_loka_textbook_dashboard"
        style={{ marginTop: "16px" }}
      >
        <Row>
          {lokabookListData.map((item, index) => (
            <Col lg={3} md={4} sm={6} xs={6} key={index} className="ad_lk_tb_list">
              <div onClick={handleclick} className="border border-white ad_lk_tb_rectangle">
                <div className="ad_loka_tb_img">
                  <img src={amritha} alt="Textbook"/>
                </div>
                <div className="admin_tb_texts">
                  <div className="admin_loka_publishername">
                    {item.publisherName}
                  </div>
                  <div className="ad_loka_tb_subject">{item.subject}</div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      <div className="ad_lk_tb_add">
        <button
          className={`ad_lk_add_button my-button ${isActive ? "active" : ""}`}
          onClick={handleButtonClick}
        >
          <IoIosAdd style={{ height: "40px", width: "40px", color: "#ffff" }} />
        </button>
      </div>
    </div>
  )
}

export default LokaBookDashboard