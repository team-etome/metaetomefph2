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
    // Combine class_name and division, remove spaces, and make the string lowercase
    const combined = (
      item.class_name.replace(/\s+/g, "") + item.division.replace(/\s+/g, "")
    ).toLowerCase();

    // Remove spaces from searchTerm and make it lowercase
    const searchTermWithoutSpaces = searchTerm
      .replace(/\s+/g, "")
      .toLowerCase();

    // Check if the search term (without spaces) is found in the combined string
    return combined.includes(searchTermWithoutSpaces);
  });

  console.log(evaluationListData, "evaluationnnnn");

  const admininfo = useSelector((state) => state.admininfo);
  const admin_id = admininfo.admininfo?.admin_id;

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
        const response = await axios.get(
          `${APIURL}/api/evaluationadding/${admin_id}`
        );
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
                  placeholder="Search by class"
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
                      <div>{item.teacher_name}</div>
                    </div>

                    <div>
                      <div
                        style={{
                          marginLeft: "30px",
                        }}
                      >
                        End date : {item.end_date}
                      </div>
                    </div>
                  </div>

                  <div className="evaluation_subject">
                    {" "}
                    {item.class_name} {item.division}-{item.subject_name}
                  </div>
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
