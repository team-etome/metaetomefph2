import React, { useEffect, useState } from "react";
import "../adminstudentlist/studentlisting.css";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import axios from "axios";
import { useSelector } from "react-redux";

function StudentListing() {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id, "idddd");
  const [studentListData, setStudentListData] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  console.log(studentListData, "dataaaaaa");

  const handleStudentClick = (student) => {
    navigate("/studentview", { state: { student } });
  };

  // const handleBackClick = () => {
  //   navigate("/classview");
  // };
  const APIURL = useSelector((state) => state.APIURL.url);

  useEffect(() => {
    axios
      .get(`${APIURL}/api/studentdetails/${id}`)
      .then((response) => {
        setStudentListData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      <Container className="student_container">
        <div className="student_form">
          <div className="studentlist_header">
            <div className="studentlist_title_section">
            
              {/* <IoChevronBackSharp
                onClick={handleBackClick}
                className="student_back"
              /> */}
         
              <h1 className="student_title">Student List</h1>
              <div className="studentlist_number">
                ({studentListData.length})
              </div>
            </div>
            {/* <div style={{ border: "0.5px solid #526D82" }}></div> */}
          </div>
          <div
            className="studentlist_scrollable"
            style={{ paddingTop: "30px" }}
          >
            <Row>
              {studentListData.map((item, index) => (
                <Col
                  lg={4}
                  md={3}
                  sm={12}
                  xs={12}
                  key={index}
                  className="studentsss_list"
                >
                  <div
                    onClick={() => handleStudentClick(item)}
                    className=" student_card"
                  >
                    <div className="student_number">{item.roll_no}</div>
                    <div className="student_name_list">
                      {/* {item.studentname} */}
                      <span>{item.student_name}</span>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default StudentListing;
