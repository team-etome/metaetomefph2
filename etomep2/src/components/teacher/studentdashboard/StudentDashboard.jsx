import React, { useState, useRef,useEffect  } from "react";
import { Col, Container, Row, Button ,Form} from "react-bootstrap";
import { IoIosAdd, IoMdDownload, IoMdAdd } from "react-icons/io";
import { MdUpload } from "react-icons/md";
import generateExcelFile from "../../utils/generateExcelFile";
import { BsSearch, BsFilterRight } from "react-icons/bs";
import amritha from "../../../assets/amritha.png";
import { Link, useNavigate } from "react-router-dom";
import '../studentdashboard/studentdashboard.css'
import { useSelector } from "react-redux";
import axios from "axios";



function StudentDashboard() {
  const [isActive, setIsActive] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [file, setFile] = useState(null);
  const [studentlist , setStudentList] = useState()
  const [standard , setStandard] = useState()
  const [division , setDivision] = useState()
  const APIURL = useSelector((state) => state.APIURL.url);
  const teacher = useSelector((state) => state.teacherinfo);
  const teacher_id = teacher.teacherinfo?.teacher_id;

  console.log(studentlist,"student list")

  const navigate = useNavigate()
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
  
  const handleclick = (item) => {
    navigate('/teacherstudentview', { state: { student: item } });
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
  }, [APIURL]);
  return (
    <div className='teacher_student_dashboard' >
      <Container
        fluid
        style={{}}
      >
        <Row className="teacher_student_header">
              <Col md={6} className="class_number">
              <h4>Class: {standard} {division} </h4>
              </Col>
              <Col md={6}>
                <div className="student_search_filter_main">
                  <div className="student_search_filter d-flex align-items-center">
                    <Form className="d-flex">
                      <div className="position-relative">
                        <BsSearch
                          className="position-absolute top-50 translate-middle-y ms-2 student_search_icon"/>
                        <Form.Control
                          type="search"
                          placeholder="Search"
                          className="ps-4 teacher_student_search_input"
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
                  </div>  */}
                </div>
              </Col>
        </Row>
        <Row className="teacher_studentdashboard_container">
          {studentlist?.map((item, index) => (
           
            <Col lg={3} md={6} sm={6} xs={12} key={index} >
              <div  onClick={() => handleclick(item)}  className="border border-white student_rectangle">
                  <div className="student_name">{item.student_name}</div>
                  <div className="student_date_id">
                    
                    <div className="student_id">
                      Admisssion No.{item.roll_no}
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
                onClick={generateExcelFile}
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
                  // onClick={handleFileUpload}
                  // disabled={isLoading}
                  style={{
                    backgroundColor: "#526D82",
                    border : "none",
                    marginTop: "20px" }}
                >
                  {/* {isLoading ? "Uploading..." : "Upload File"} */}
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
export default StudentDashboard