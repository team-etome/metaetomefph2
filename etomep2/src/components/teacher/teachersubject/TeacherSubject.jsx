import React, { useEffect, useState } from "react";
import "../teachersubject/teachersubject.css";
import { Container, Row, Col, Form } from "react-bootstrap";
import "../teachersubject/teachersubject.css";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector ,useDispatch} from "react-redux";
import axios from "axios";
import { teachersubjectinfo } from "../../../Redux/Actions/TeacherSubjectInfoAction";


function TeacherSubject() {



  const [subjects, setSubjects] = useState([]);
  const APIURL       = useSelector(state => state.APIURL.url);
  const teacherinfo = useSelector((state) => state.teacherinfo);
  const teacher_id = teacherinfo.teacherinfo?.teacher_id
  console.log(subjects,'subjects')


  const dispatch = useDispatch();


  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(`${APIURL}/api/subject_list/${teacher_id}`);
        setSubjects(response.data); 
      } catch (error) {
        console.error('Failed to fetch subjects:', error);
      }
    };

    if (teacher_id) {
      fetchSubjects();
    }
  }, [APIURL, teacher_id]);
  
 




  const navigate = useNavigate();

  const handlenavigate = (item) => {
    dispatch(teachersubjectinfo(item)); 
    navigate("/teacherclassview", { state: { item } });
  };



  return (
    <div>
      <Container fluid className="teacher_subject_container">
        <Row className="tec_sub_fstrow">
          <Col className="tech_sub_title_col" md={6}>
            <h1 className="teacher_subject_title">Subjects</h1>{" "}
          </Col>
          <Col md={6}>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                flexDirection: "row",
                paddingLeft: "1vw",
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
                className="teacher_subject_search_filter d-flex align-items-center"
              >
                <Form className="d-flex">
                  <div className="position-relative">
                    <BsSearch
                      className="position-absolute top-50 translate-middle-y ms-2"
                      style={{
                        zIndex: 2,
                        height: "20px",
                        width: "20px",
                        color: "#D8D4D4",
                        right: "15px",
                      }}
                    />
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="ps-6 teacher_student_search_input"
                      aria-label="Search"
                    />
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="tec_sub_crd_rw">
          <div className="tec_sub_card_container">
            {subjects.map((item, index) => (
              <div  onClick={() => handlenavigate(item)}  className="tec_sub_card" key={index}>
                <div className="card-content">
                  <h3>{item.class}{item.division}</h3>
                  <p>{item.subject}</p>
                </div>
              </div>
            ))}
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default TeacherSubject;
