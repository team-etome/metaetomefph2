<<<<<<< HEAD
import React, { useState, useRef, useEffect } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { IoIosAdd, IoMdDownload, IoMdAdd } from "react-icons/io";
import { MdUpload } from "react-icons/md";
import studentexcel from "../../utils/studentexcel";
=======
import React, { useState, useRef,useEffect  } from "react";
import { Col, Container, Row, Button ,Form} from "react-bootstrap";
import { IoIosAdd, IoMdDownload, IoMdAdd } from "react-icons/io";
import { MdUpload } from "react-icons/md";
import generateExcelFile from "../../utils/generateExcelFile";
import { BsSearch, BsFilterRight } from "react-icons/bs";
>>>>>>> 2f0136bb8e99b05eced73455ff29c0aa112bd4f4
import amritha from "../../../assets/amritha.png";
import { Link, useNavigate } from "react-router-dom";
import "../studentdashboard/studentdashboard.css";
import { useSelector } from "react-redux";
import axios from "axios";

function StudentDashboard() {
  const [isActive, setIsActive] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [file, setFile] = useState(null);
  const [studentlist, setStudentList] = useState();

  console.log(studentlist, "student list");

  const APIURL = useSelector((state) => state.APIURL.url);
  const teacher = useSelector((state) => state.teacherinfo);
  const teacher_id = teacher.teacherinfo?.teacher_id;

  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const openFileSelector = () => {
    fileInputRef.current.click();
  };

  const handleAddClick = () => {
    setShowOptions(!showOptions);
  };

  const studentListData = new Array(30).fill({
    studentName: "Ria Choudary",
<<<<<<< HEAD
    date: "12/03/2004",
    rollNo: "1001",
=======
    // date: "12/03/2004",
    rollNo:'1001'
>>>>>>> 2f0136bb8e99b05eced73455ff29c0aa112bd4f4
  });

  const handleclick = () => {
    navigate("/teacherstudentview");
  };

  useEffect(() => {
    const fetchFacultyData = async () => {
      try {
        const response = await axios.get(
          `${APIURL}/api/addstudent/${teacher_id}`
        );
        setStudentList(response.data);
      } catch (error) {
        console.error("Failed to fetch faculty data:", error);
      }
    };

    fetchFacultyData();
  }, [APIURL]);

  const handleFileUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("teacher", teacher_id);

    try {
      const response = await axios.post(
        `${APIURL}/api/studentexcel`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      alert("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    }
  };

  return (
<<<<<<< HEAD
    <div style={{ display: "flex", justifyContent: "center", width: "104.5%" }}>
=======
    <div className='teacher_student_dashboard' >
>>>>>>> 2f0136bb8e99b05eced73455ff29c0aa112bd4f4
      <Container
        fluid
        style={{ marginTop: "16px" }}
      >
<<<<<<< HEAD
        <Row>
          {studentlist?.map((item, index) => (
            <Col lg={3} md={4} sm={6} xs={6} key={index}>
              <div
                onClick={handleclick}
                className="border border-white student_rectangle"
              >
                <div className="student_name">{item.student_name}</div>
                <div className="student_date_id">
                  <div className="student_date">{item.start_date}</div>
                  <div className="student_id">{item.roll_no}</div>
                </div>
=======
        <Row style={{ paddingLeft: "2vw", paddingTop: "1vw", paddingBottom:'1vw' }}>
              <Col md={6} className="class_number">
              <h4>Class: 8 A</h4>
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
                      width: "80%",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                    className="search_filter d-flex align-items-center"
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
{/* 
                  <div
                    style={{
                      width: "10%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    <BsFilterRight style={{ height: "50px", width: "40px" }} />
                  </div> */}
                </div>
              </Col>
        </Row>
        <Row className="teacher_studentdashboard_container">
          {studentListData.map((item, index) => (
            // lg={3} md={4} sm={6} xs={6}
            <Col lg={3} md={6} sm={6} xs={12} key={index} >
              <div onClick={handleclick}  className="border border-white student_rectangle">
               
                  <div className="student_name">{item.studentName}</div>
                  <div className="student_date_id">
                    {/* <div className="student_date">
                      {item.date}
                    </div> */}
                    <div className="student_id">
                      Admisssion No.{item.rollNo}
                    </div>
                  </div>
>>>>>>> 2f0136bb8e99b05eced73455ff29c0aa112bd4f4
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      <div className="student_adding_button">
        <Button
          className={`student_adding my-button ${isActive ? "active" : ""}`}
          onClick={handleAddClick}
        >
          <IoIosAdd style={{ height: "40px", width: "40px", color: "#ffff" }} />
        </Button>
        {showOptions && (
          <>
            <div className="student_overlay" onClick={handleAddClick}></div>
            <div className="student_fab-options">
              <Link
                to="/teacherstudentadd"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  gap: "20px",
                }}
                className="student_fab_option_link"
              >
                <div className="student_fab_text">Add Student</div>
                <Button className="student_fab_option">
                  <IoMdAdd className="student_fab_icon" />
                </Button>
              </Link>

              <div
                onClick={studentexcel}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  gap: "20px",
                  cursor: "pointer",
                }}
                className="fab_option_link"
              >
                <div className="fab-text">Download Excel Template</div>
                <Button className="student_fab_option">
                  <IoMdDownload className="student_fab_icon" />
                </Button>
              </div>

              <div
                onClick={openFileSelector}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  gap: "20px",
                  cursor: "pointer",
                }}
                className="fab_option_link"
              >
                <div className="fab-text">Upload Through Excel</div>
                <Button className="student_fab_option">
                  <MdUpload className="student_fab_icon" />
                </Button>
              </div>
              <input
                type="file"
                onChange={handleFileChange}
                style={{ display: "none" }}
                ref={fileInputRef}
              />

              {file && (
                <Button
                  onClick={handleFileUpload}
                  style={{
                    backgroundColor: "#526D82",
                    border: "none",
                    marginTop: "20px",
                  }}
                >
                  Upload File
                </Button>
              )}
              
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
