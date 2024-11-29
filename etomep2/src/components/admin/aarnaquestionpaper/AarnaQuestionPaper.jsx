import React, { useState, useEffect } from "react";
import { Col, Container, Row, Form } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import "../aarnaquestionpaper/aarnaquestionpaper.css";
import { IoIosAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function AarnaQuestionPaper() {
  const [isActive, setIsActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const APIURL = useSelector((state) => state.APIURL.url);
  const [qpaperListData, setQpaperListData] = useState([]);

  const admininfo = useSelector((state) => state.admininfo);
  const admin_id = admininfo.admininfo?.admin_id;

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

  // Filter the question papers based on the search term
  //   const filteredQpaperListData = qpaperListData.filter((item) => {
  //   return (
  //     item.class_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     item.division.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     const combined = (item.class_name + " " + item.division + " " + item.subject_name).toLowerCase();

  //   );
  // });

  const filteredQpaperListData = qpaperListData.filter((item) => {
    // Remove spaces from class_name, division, and subject_name and combine them into one string
    const combined = (
      item.class_name.replace(/\s+/g, '') +
      item.division.replace(/\s+/g, '') 
 
    ).toLowerCase();
  
    // Remove spaces from searchTerm
    const searchTermWithoutSpaces = searchTerm.replace(/\s+/g, '').toLowerCase();
  
    // Check if the search term (without spaces) is found in the combined string
    return combined.includes(searchTermWithoutSpaces);
  });

  return (
    <div className="questionpaper_dashboard">
      <Container fluid className="qpaper_container_scroll_1">
        <Row>
          <div className="qp_list_search_filter_main d-flex">
            <Form className="d-flex">
              <div className="position-relative">
                <Form.Control
                  type="search"
                  placeholder="Search by class"
                  className="ps-3 qp_list_ad_search_bar"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <BsSearch className="position-absolute top-50 translate-middle-y qp_list_searchbar_icon" />
              </div>
            </Form>
          </div>
        </Row>
        <Row>
          {filteredQpaperListData.length > 0 ? (
            filteredQpaperListData.map((item, index) => (
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
                  <div className="qpaper_faculty_name">{item.teacher_name}</div>
                  <div className="qpaper_term_date">
                    <div className="qpaper_term">{item.exam_name}</div>
                    <div className="qpaper_date">{item.exam_date}</div>
                  </div>
                  <div className="qpaper_subject">
                    {item.class_name} {item.division} - {item.subject_name}
                  </div>
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
