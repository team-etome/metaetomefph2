import React, { useState, useEffect } from "react";
import { Col, Container, Row, Form } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "../teacherexamination/examinationdashboard.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch} from "react-redux";
import { exampaperinfo } from "../../../Redux/Actions/ExamPaperInfoAction";


function ExaminationDashboard() {
  const [isActive, setIsActive] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [file, setFile] = useState(null);
  const [examinationListData, setExaminationListData] = useState([]);
  const navigate = useNavigate();

  const teacher = useSelector((state) => state.teacherinfo);
  const teacher_id = teacher.teacherinfo?.teacher_id;
  const APIURL = useSelector((state) => state.APIURL.url);

  const dispatch = useDispatch()

  useEffect(() => {
    if (teacher_id) {
      fetchExaminations(teacher_id);
    }
  }, [teacher_id]);

  const fetchExaminations = async (teacherId) => {
    try {
      const response = await axios.get(
        `${APIURL}/api/blueprintdetails/${teacherId}`
      );
      console.log("API response:", response.data);

      if (Array.isArray(response.data)) {
        setExaminationListData(response.data);
      } else {
        console.error("Expected an array, received:", response.data);
        setExaminationListData([]);
      }
    } catch (error) {
      console.error("Failed to fetch examination data:", error);
      setExaminationListData([]);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsActive((prevState) => !prevState);
    }, 2000);

    return () => clearInterval(interval);
  }, []);


  const handleClick = (exam) => {
    dispatch(exampaperinfo(exam));
    navigate("/teacherquestionview", { state: { exam : exam } });
    
  };



  return (
    <div style={{}} className="teacher_examination_dashboard">
      <Container fluid style={{ marginTop: "16px" }}>
        <Row
          style={{
            paddingLeft: "2vw",
            paddingTop: "1vw",
            paddingBottom: "1vw",
          }}
        >
          <Col md={6} className="class_number">
            <h4>Assigned Exams</h4>
          </Col>
          <Col md={6}>
            <div className="examdashboard_search_filter_main"
              // style={{
              //   width: "100%",
              //   display: "flex",
              //   justifyContent: "flex-end",
              //   flexDirection: "row",
              //   paddingLeft: "1vw",
              // }}
            >
              <div 
                // style={{
                //   width: "80%",
                //   display: "flex",
                //   justifyContent: "flex-end",
                // }}
                className="examdashboard_search_filter d-flex align-items-center"
              >
                <Form className="d-flex">
                  <div className="position-relative">
                    <BsSearch
                      className="examdashboard_search_icon position-absolute top-50 translate-middle-y ms-2"
                      // style={{
                      //   zIndex: 2,
                      //   height: "20px",
                      //   width: "20px",
                      //   color: "#D8D4D4",
                      //   right: "15px",
                      // }}
                    />
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="ps-6 examdashboard_search_input"
                      aria-label="Search"
                    />
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="teacher_examination_container">
          {examinationListData.map((item, index) => (
            <Col
              lg={3}
              md={6}
              sm={6}
              xs={12}
              key={index}
              className="examination_list"
            >
               <div onClick={() => handleClick(item)}
                className="border border-white examination_rectangle"
              >
                <div className="examiantion_term">{item.exam_name}</div>
                <div className="examination_class_date">
                  <div className="examination_class">
                    Class: {item.class_name}
                  </div>
                  <div className="examination_date">{item.exam_date}</div>
                </div>
                <div className="examination_subject">{item.subject_name}</div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default ExaminationDashboard;
