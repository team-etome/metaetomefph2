import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row, Form, Nav } from "react-bootstrap";
import { BsSearch, BsFilterRight } from "react-icons/bs";
import "../aarnaquestionpaper/aarnaquestionpaper.css";
import { IoIosAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function AarnaQuestionPaper() {
  const [isActive, setIsActive] = useState(false);
  const APIURL = useSelector((state) => state.APIURL.url);
  const [qpaperListData, setQpaperListData] = useState([]);

  const admininfo = useSelector((state) => state.admininfo);
  const admin_id = admininfo.admininfo?.admin_id;

  console.log(qpaperListData, "daatttttataaaa");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${APIURL}/api/questionpaper/${admin_id}`
        );
        setQpaperListData(response.data);
      } catch (error) {
        console.error(
          "There was an error fetching the question papers!",
          error
        );
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
          <div className="qp_list_search_filter_main d-flex">
            <Form className="d-flex">
              {/* Change: Use position-relative to correctly position the search icon */}
              <div className="position-relative">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="ps-3 qp_list_ad_search_bar"
                  aria-label="Search"
                />
                <BsSearch className="position-absolute top-50 translate-middle-y qp_list_searchbar_icon" />
              </div>
            </Form>
            {/* Change: Adjust filter icon alignment */}
          </div>
        </Row>
        <Row >
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
                    {/* <div className="qpaper_term">{item.term}</div> */}
                    <div className="qpaper_term">{item.exam_name}</div>
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
