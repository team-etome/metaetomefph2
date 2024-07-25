import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../aarnaquestionpaper/aarnaquestionpaper.css";
import { IoIosAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";


function AarnaQuestionPaper() {
  const [isActive, setIsActive] = useState(false);
  const APIURL = useSelector((state) => state.APIURL.url);
  const [qpaperListData,setQpaperListData] = useState([])

  const admininfo = useSelector((state) => state.admininfo);
  const admin_id = admininfo.admininfo?.admin_id

  console.log(qpaperListData,"daatttttataaaa")

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${APIURL}/api/questionpaper/${admin_id}`);
        setQpaperListData(response.data);
      } catch (error) {
        console.error("There was an error fetching the question papers!", error);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      setIsActive((prevState) => !prevState);
    }, 2000);

    return () => clearInterval(interval);
  }, [APIURL]);
  const handleButtonClick = () => {
    navigate("/questionadding");
  };

  
  const handleclick = (item) => {
    navigate("/questionview", { state: { questionPaper: item } });
  };


  return (
    <div className="questionpaper_dashboard">
      <Container fluid className="qpaper_container_scroll">
      <Row>
          {qpaperListData.length > 0 ? (
            qpaperListData.map((item, index) => (
              <Col
                lg={3}
                md={6}
                sm={12}
                xs={12}
                key={index}
                className="qpaper_list"
              >
                <div
                  onClick={() => handleclick(item)}
                  className="border border-white qpaper_rectangle"
                >
                  <div className="qpaper_faculty_name">{item.facultyName}</div>
                  <div className="qpaper_term_date">
                    <div className="qpaper_term">{item.term}</div>
                    <div className="qpaper_date">{item.exam_date}</div>
                  </div>
                  <div className="qpaper_subject">{item.subject_name}</div>
                </div>
              </Col>
            ))
          ) : (
            <div className="no-exams-message">
              <h3>No exams scheduled</h3>
            </div>
          )}
        </Row>
      </Container>
      <div className="qpaper_adding_button">
        <button
          className={`qpaper_adding qpaper_adding_my_button ${
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

export default AarnaQuestionPaper;
