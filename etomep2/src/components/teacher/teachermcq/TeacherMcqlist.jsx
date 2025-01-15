import React, { useState, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp, IoIosAdd } from "react-icons/io";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import "./teachermcq.css";

function TeacherMcqList() {
  const [showThisMonth, setShowThisMonth] = useState(true);
  const [showPreviousMonth, setShowPreviousMonth] = useState(true);

  const [thisMonthTests, setThisMonthTests] = useState([]);
  const [previousMonthTests, setPreviousMonthTests] = useState([]);

  const [mcqdata, setMcqData] = useState([]);

  console.log(mcqdata, "dattatttata");

  const navigate = useNavigate();

  const teacher = useSelector((state) => state.teacherinfo);
  const teacher_id = teacher.teacherinfo?.teacher_id;

  const APIURL = useSelector((state) => state.APIURL.url);

  console.log(teacher_id, "teacher id");

  useEffect(() => {
    if (teacher_id) {
      axios
        .get(`${APIURL}/api/mcqanswer/${teacher_id}`)
        .then((response) => {
          console.log(response.data, "API Response");
          const thisMonthTests = (response.data.this_month_tests || []).sort(
            (a, b) => new Date(b.exam_date) - new Date(a.exam_date)
          );
          const previousMonthTests = (response.data.previous_month_tests || []).sort(
            (a, b) => new Date(b.exam_date) - new Date(a.exam_date)
          );
  
          setMcqData(response.data);
          setThisMonthTests(thisMonthTests);
          setPreviousMonthTests(previousMonthTests);
        })
        .catch((error) => {
          console.error("Error fetching MCQ tests:", error);
        });
    }
  }, [teacher_id]);
  const handleAddClick = () => {
    navigate("/teachermcqadd");
  };

  return (
    <Container className="mcqlist_test_container">
      <Row>
        <Col className="mcqlist_test_list">
          <div className="mcqlist_test_header">
            <h2>Multiple choices Question</h2>
          </div>
          <hr />
          <div className="mcqlist_test_body">
            <div
              className="mcqlist_test_week"
              onClick={() => setShowThisMonth(!showThisMonth)}
            >
              <span>This Month</span>
              {showThisMonth ? (
                <IoIosArrowUp className="mcqlist_test_icon" />
              ) : (
                <IoIosArrowDown className="mcqlist_test_icon" />
              )}
            </div>

            {showThisMonth &&
              thisMonthTests.map((test) => (
                <div key={test.id} className="mcqlist_test_item mb-3 p-2">
                  <h5>{test.exam_name}</h5>
                  <p>Posted On: {test.exam_date}</p>
                </div>
              ))}

            <div
              className="mcqlist_test_week"
              onClick={() => setShowPreviousMonth(!showPreviousMonth)}
            >
              <span>Previous Month</span>
              {showPreviousMonth ? (
                <IoIosArrowUp className="mcqlist_test_icon" />
              ) : (
                <IoIosArrowDown className="mcqlist_test_icon" />
              )}
            </div>

            {showPreviousMonth &&
              previousMonthTests.map((test) => (
                <div key={test.id} className="mcqlist_test_item mb-3 p-2">
                  <h5>{test.exam_name}</h5>
                  <p>Posted On: {test.exam_date}</p>
                </div>
              ))}
          </div>
          <div className="mcqlist_test_teacher_button">
            <Button className="mcqlist_add_button" onClick={handleAddClick}>
              <IoIosAdd
                style={{ height: "40px", width: "40px", color: "#fff" }}
              />
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default TeacherMcqList;
