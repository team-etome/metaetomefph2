import React, { useState, useRef, useEffect } from "react";
import { Col, Container, Row, Button, Form, Spinner } from "react-bootstrap";
import { IoIosAdd, IoMdDownload, IoMdAdd } from "react-icons/io";
import { MdUpload } from "react-icons/md";
import studentexcel from "../../utils/studentexcel";
import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import '../studentdashboard/studentdashboard.css';
import { useSelector } from "react-redux";
import axios from "axios";

function StudentDashboard() {
  const [isActive, setIsActive] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [file, setFile] = useState(null);
  const [studentlist, setStudentList] = useState([]);
  const [standard, setStandard] = useState("");
  const [division, setDivision] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

  const handleClick = (item) => {
    navigate('/teacherstudentview', { state: { student: item } });
  };

  const handleFileUpload = async () => {
    if (!file) return;
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('teacher',teacher_id)

    try {
      await axios.post(`${APIURL}/api/studentexcel`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Handle success (e.g., show a success message, refresh student list)
    } catch (error) {
      console.error("Failed to upload file:", error);
      // Handle error (e.g., show an error message)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchFacultyData = async () => {
      try {
        const response = await axios.get(`${APIURL}/api/addstudent/${teacher_id}`);
        setStudentList(response.data);
        setStandard(response.data[0].standard);
        setDivision(response.data[0].division);
      } catch (error) {
        console.error("Failed to fetch faculty data:", error);
      }
    };
    fetchFacultyData();
  }, [APIURL, teacher_id]);

  return (
    <div className='teacher_student_dashboard'>
      <Container fluid>
        <Row style={{ paddingLeft: "2vw", paddingBottom: '1vw' }}>
          <Col md={6} className="class_number">
            <h4>Class: {standard} {division}</h4>
          </Col>
          <Col md={6}>
            <div className="student_search_filter_main">
              <div className="student_search_filter d-flex align-items-center">
                <Form className="d-flex">
                  <div className="position-relative">
                    <BsSearch className="position-absolute top-50 translate-middle-y ms-2 student_search_icon" />
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
        <Row className="teacher_studentdashboard_container">
          {studentlist.map((item, index) => (
            <Col lg={3} md={6} sm={6} xs={12} key={index}>
              <div onClick={() => handleClick(item)} className="border border-white student_rectangle">
                <div className="student_name">{item.student_name}</div>
                <div className="student_date_id">
                  <div className="student_id">
                    Admission No.{item.roll_no}
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      <div className="student_adding_button">
        <Button className={`student_adding my-button ${isActive ? 'active' : ''}`} onClick={handleAddClick}>
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
                  disabled={isLoading}
                  style={{
                    backgroundColor: "#526D82",
                    border: "none",
                    marginTop: "20px"
                  }}
                >
                  {isLoading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />{" "}
                      Uploading...
                    </>
                  ) : "Upload File"}
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default StudentDashboard;
