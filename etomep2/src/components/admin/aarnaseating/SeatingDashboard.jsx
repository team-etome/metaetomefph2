import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { IoIosAdd } from "react-icons/io";
import { useNavigate  } from "react-router-dom";
import'../aarnaseating/seatdashboard.css'

function SeatingDashboard() {
    const [isActive, setIsActive] = useState(false);

    const audioRef = useRef(null);
  
    // const history = useNavigate();
    const navigate = useNavigate()

  
    useEffect(() => {
      const interval = setInterval(() => {
        setIsActive((prevState) => !prevState);
      }, 2000);
  
      return () => clearInterval(interval);
    }, []);
  
    const handleButtonClick= ()=>{
      navigate('/seatassigning')
  }

    const handleclick= ()=>{
      navigate('/seatview')
  }
  
    const qpaperListData = [
      {hallNo: "11", date:'01/10/2024',fcaultyNo: "1", time: "10.00 Am - 1.00 Pm" },
      {hallNo: "11", date:'01/10/2024',fcaultyNo: "1", time: "10.00 Am - 1.00 Pm" },
      {hallNo: "11", date:'01/10/2024',fcaultyNo: "1", time: "10.00 Am - 1.00 Pm" },
      {hallNo: "11", date:'01/10/2024',fcaultyNo: "1", time: "10.00 Am - 1.00 Pm" },
      {hallNo: "11", date:'01/10/2024',fcaultyNo: "1", time: "10.00 Am - 1.00 Pm" },
      {hallNo: "11", date:'01/10/2024',fcaultyNo: "1", time: "10.00 Am - 1.00 Pm" },
      {hallNo: "11", date:'01/10/2024',fcaultyNo: "1", time: "10.00 Am - 1.00 Pm" },
      {hallNo: "11", date:'01/10/2024',fcaultyNo: "1", time: "10.00 Am - 1.00 Pm" },
      {hallNo: "11", date:'01/10/2024',fcaultyNo: "1", time: "10.00 Am - 1.00 Pm" },
      {hallNo: "11", date:'01/10/2024',fcaultyNo: "1", time: "10.00 Am - 1.00 Pm" },
      {hallNo: "11", date:'01/10/2024',fcaultyNo: "1", time: "10.00 Am - 1.00 Pm" },
      {hallNo: "11", date:'01/10/2024',fcaultyNo: "1", time: "10.00 Am - 1.00 Pm" },
      {hallNo: "11", date:'01/10/2024',fcaultyNo: "1", time: "10.00 Am - 1.00 Pm" },      
      {hallNo: "11", date:'01/10/2024',fcaultyNo: "1", time: "10.00 Am - 1.00 Pm" },
      {hallNo: "11", date:'01/10/2024',fcaultyNo: "1", time: "10.00 Am - 1.00 Pm" },
      {hallNo: "11", date:'01/10/2024',fcaultyNo: "1", time: "10.00 Am - 1.00 Pm" },
      {hallNo: "11", date:'01/10/2024',fcaultyNo: "1", time: "10.00 Am - 1.00 Pm" },
      {hallNo: "11", date:'01/10/2024',fcaultyNo: "1", time: "10.00 Am - 1.00 Pm" },      
      {hallNo: "11", date:'01/10/2024',fcaultyNo: "1", time: "10.00 Am - 1.00 Pm" },
      {hallNo: "11", date:'01/10/2024',fcaultyNo: "1", time: "10.00 Am - 1.00 Pm" },
      {hallNo: "11", date:'01/10/2024',fcaultyNo: "1", time: "10.00 Am - 1.00 Pm" },
      {hallNo: "11", date:'01/10/2024',fcaultyNo: "1", time: "10.00 Am - 1.00 Pm" },
      {hallNo: "11", date:'01/10/2024',fcaultyNo: "1", time: "10.00 Am - 1.00 Pm" },
    ];
  return (
    <div style={{ display: "flex", justifyContent: "center", width: "104.5%" }}>
    <Container
      fluid
      className="seat_container_scroll"
      style={{ marginTop: "16px" }}
    >
      <Row>
        {qpaperListData.map((item, index) => (
          <Col lg={3} md={6} sm={12} xs={12} key={index} className="qpaper_list">
            <div onClick={handleclick} className="border border-white seat_rectangle">
                <div className="seat_hall_date">
              <div className="seat_hallno">{item.hallNo}</div>
                <div className="seat_date">
                  {item.date}
                </div>
                </div>
                <div className="seat_facultyno">
                  No. of Faculties : {item.fcaultyNo}
                </div>
              <div className="seat_time">{item.time}</div>

            </div>
          </Col>
        ))}
      </Row>
    </Container>
    <div className="seat_adding_button">
      <button
        className={`seat_adding my-button ${isActive ? "active" : ""}`}
        onClick={handleButtonClick}
      >
        <IoIosAdd style={{ height: "40px", width: "40px", color: "#ffff" }} />
      </button>
    </div>
  </div>
  )
}

export default SeatingDashboard