import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row, Form } from "react-bootstrap";
import "../aarnaevaluation/evaluationdashboard.css";
import { IoIosAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { BsSearch, BsFilterRight } from "react-icons/bs";

function EvaluationDashboard() {
  const [isActive, setIsActive] = useState(false);
  const [evaluationListData, setEvaluationListData] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");


  const filteredEvaluationListData = evaluationListData.filter((item) => {
    return (
      item.class_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.division.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subject_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.teacher_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.start_date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.end_date.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });


  console.log(evaluationListData, "evaluationnnnn");

  
  const admininfo = useSelector((state) => state.admininfo);
  const admin_id = admininfo.admininfo?.admin_id

  const navigate = useNavigate();
  const APIURL = useSelector((state) => state.APIURL.url);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsActive((prevState) => !prevState);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchEvaluations = async () => {
      try {
        const response = await axios.get(`${APIURL}/api/evaluationadding/${admin_id}`);
        setEvaluationListData(response.data);
      } catch (error) {
        console.error(
          "There was an error fetching the evaluation data!",
          error
        );
      }
    };

    fetchEvaluations();
  }, []);

  const handleButtonClick = () => {
    navigate("/evaluationscheduling");
  };

  const handleclick = (evaluationData) => {
    navigate("/evaluationview", { state: { evaluation: evaluationData } });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "104.5%" }}>
      <Container
        fluid
        className="evaluation_container_scroll"
        style={{ marginTop: "16px" }}
      >
        <Row>
          <div className="evaluation_list_search_filter_main d-flex">
            <Form className="d-flex">
              {/* Change: Use position-relative to correctly position the search icon */}
              <div className="position-relative">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="ps-3 evaluation_list_ad_search_bar"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <BsSearch className="position-absolute top-50 translate-middle-y ms-2 evaluation_list_searchbar_icon" />
              </div>
            </Form>
            {/* Change: Adjust filter icon alignment */}
          </div>
        </Row>
       <Row>
          {filteredEvaluationListData.length > 0 ? (
            filteredEvaluationListData.map((item, index) => (
              <Col
                lg={3}
                md={6}
                sm={12}
                xs={12}
                key={index}
                className="evaluation_list"
              >
                <div
                  onClick={() => handleclick(item)}
                  className="border border-white evaluation_rectangle"
                >
                  <div className="evaluation_term">{item.term}</div>
                  <div className="evaluation_class_date">
                    <div className="evaluation_class">
                      Class: {item.class_name}
                    </div>
                    <div className="evaluation_date">{item.date}</div>
                  </div>
                  <div className="evaluation_subject">{item.subject_name}</div>
                </div>
              </Col>
            ))
          ) : (
            <div className="no-evaluations-message">
              <h3>No evaluations scheduled</h3>
            </div>
          )}
        </Row>
      </Container>
      <div className="evaluation_adding_button">
        <button
          className={`evaluation_adding evaluation_adding_my_button ${
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

export default EvaluationDashboard;
