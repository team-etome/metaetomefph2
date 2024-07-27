import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { IoIosAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "../aarnaseating/seatdashboard.css";
import { useSelector } from "react-redux";
import axios from "axios";

function SeatingDashboard() {
  const [isActive, setIsActive] = useState(false);
  const [seatingData, setSeatingData] = useState([]);
  const APIURL = useSelector((state) => state.APIURL.url);
  const admininfo = useSelector((state) => state.admininfo);

  const admin_id = admininfo.admininfo?.admin_id;

  console.log(seatingData, "seatinggggggggggg");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeatingData = async () => {
      try {
        const response = await axios.get(`${APIURL}/api/seating/${admin_id}`);
        setSeatingData(response.data);
      } catch (error) {
        console.error("Error fetching seating data:", error);
      }
    };

    fetchSeatingData();

    const interval = setInterval(() => {
      setIsActive((prevState) => !prevState);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleButtonClick = () => {
    navigate("/seatassigning");
  };

  const handleclick = () => {
    navigate("/seatview");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "104.5%" }}>
      <Container
        fluid
        className="seat_container_scroll"
        style={{ marginTop: "16px" }}
      >
        <Row>
          {seatingData.length > 0 ? (
            seatingData.map((item, index) => (
              <Col
                lg={3}
                md={6}
                sm={12}
                xs={12}
                key={index}
                className="seat_list"
              >
                <div
                  onClick={handleclick}
                  className="border border-white seat_rectangle"
                >
                  <div className="seat_hall_date">
                    <div className="seat_hallno">{item.hall_name}</div>
                    <div className="seat_date">{item.exam_date}</div>
                  </div>
                  <div className="seat_facultyno">
                    No. of Faculties : {item.teacher_count}
                  </div>
                  <div className="seat_time">
                    {item.start_time}-{item.end_time}
                  </div>
                </div>
              </Col>
            ))
          ) : (
            <div className="no-exams-message">
              <h3>No Seating arranged</h3>
            </div>
          )}
        </Row>
      </Container>
      <div className="seat_adding_button">
        <button
          className={`seat_adding seat_adding_my_button ${
            isActive ? "active" : ""
          }`}
          onClick={handleButtonClick}
        >
          <IoIosAdd style={{ height: "40px", width: "40px", color: "#ffff" }} />
        </button>
      </div>
    </div>
  );
}

export default SeatingDashboard;
