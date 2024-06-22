import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../aarnaquestionpaper/aarnaquestionpaper.css"
import { IoIosAdd } from "react-icons/io";
import { useNavigate  } from "react-router-dom";
// import {useNavigate } from "react-router-dom";


function AarnaQuestionPaper() {
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
    //     history("/questionadding");
    //   }, 500);
    // };
    const handleButtonClick= ()=>{
      navigate('/questionadding')
  }

    const handleclick= ()=>{
      navigate('/questionview')
  }
  // const qpaperListData = new Array(21).fill({
  //   facultyName: "Anagha Rajagopal",
  //   term:  "1",
  // });

    const qpaperListData = [
      { facultyName: "Anagha Rajagopal", term: "Second Term", date:'01/10/2024', subject: "Pending" },
      { facultyName: "Anagha Rajagopal", term: "Second Term", date:'01/10/2024', subject: "Pending" },
      { facultyName: "Anagha Rajagopal", term: "Second Term", date:'01/10/2024', subject: "Pending" },
      { facultyName: "Anagha Rajagopal", term: "Second Term", date:'01/10/2024', subject: "Pending" },
      { facultyName: "Anagha Rajagopal", term: "Second Term", date:'01/10/2024', subject: "Pending" },
      { facultyName: "Anagha Rajagopal", term: "Second Term", date:'01/10/2024', subject: "Pending" },
      { facultyName: "Anagha Rajagopal", term: "Second Term", date:'01/10/2024', subject: "Pending" },
      { facultyName: "Anagha Rajagopal", term: "Second Term", date:'01/10/2024', subject: "Pending" },
      { facultyName: "Anagha Rajagopal", term: "Second Term", date:'01/10/2024', subject: "Pending" },
      { facultyName: "Anagha Rajagopal", term: "Second Term", date:'01/10/2024', subject: "Pending" },
      { facultyName: "Anagha Rajagopal", term: "Second Term", date:'01/10/2024', subject: "Pending" },
      { facultyName: "Anagha Rajagopal", term: "Second Term", date:'01/10/2024', subject: "Pending" },
      { facultyName: "Anagha Rajagopal", term: "Second Term", date:'01/10/2024', subject: "Pending" },
      { facultyName: "Anagha Rajagopal", term: "Second Term", date:'01/10/2024', subject: "Pending" },
      { facultyName: "Anagha Rajagopal", term: "Second Term", date:'01/10/2024', subject: "Pending" },
      { facultyName: "Anagha Rajagopal", term: "Second Term", date:'01/10/2024', subject: "Pending" },
      { facultyName: "Anagha Rajagopal", term: "Second Term", date:'01/10/2024', subject: "Pending" },
      { facultyName: "Anagha Rajagopal", term: "Second Term", date:'01/10/2024', subject: "Pending" },
      { facultyName: "Anagha Rajagopal", term: "Second Term", date:'01/10/2024', subject: "Pending" },

    ];
  return (
    <div style={{ display: "flex", justifyContent: "center", width: "104.5%", height:'80vh'}}>
    <Container
      fluid
      className="qpaper_container_scroll"
      style={{ marginTop: "16px" }}
    >
      <Row>
        {qpaperListData.map((item, index) => (
          <Col lg={3} md={6} sm={12} xs={12} key={index} className="qpaper_list">
            <div onClick={handleclick} className="border border-white qpaper_rectangle">
              <div className="qpaper_faculty_name">{item.facultyName}</div>
              <div className="qpaper_term_date">
                <div className="qpaper_term">
                  {item.term}
                </div>
                <div className="qpaper_date">
                  {item.date}
                </div>
              </div>
              <div className="qpaper_subject">{item.subject}</div>

            </div>
          </Col>
        ))}
      </Row>
    </Container>
    <div className="qpaper_adding_button">
      <button
        className={`qpaper_adding my-button ${isActive ? "active" : ""}`}
        onClick={handleButtonClick}
      >
        <IoIosAdd style={{ height: "40px", width: "40px", color: "#ffff" }} />
      </button>
    </div>
  </div>
  )
}

export default AarnaQuestionPaper