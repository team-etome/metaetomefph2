import React, { useState, useRef,useEffect  } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { IoIosAdd, IoMdDownload, IoMdAdd } from "react-icons/io";
import { MdUpload } from "react-icons/md";
import generateExcelFile from "../../utils/generateExcelFile";
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


  console.log(studentlist,'student list')

  const APIURL = useSelector((state) => state.APIURL.url);
  const teacher = useSelector((state) => state.teacherinfo);
  const teacher_id = teacher.teacherinfo?.teacher_id;


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

  const studentListData = new Array(30).fill({
    studentName: "Ria Choudary",
    date: "12/03/2004",
    rollNo:'1001'
  });

  const handleclick= ()=>{
      navigate('/teacherstudentview')
  }

  useEffect(() => {
    const fetchFacultyData = async () => {
      try {
        const response = await axios.get(`${APIURL}/api/addstudent/${teacher_id}`);
        setStudentList(response.data);
      
      } catch (error) {
        console.error("Failed to fetch faculty data:", error);
      } 
      
    };

    fetchFacultyData();
  }, [APIURL]);






  return (
    <div style={{ display: "flex", justifyContent: "center", width: "104.5%"}}>
      <Container
        fluid
        className="teacher_studentdashboard_container"
        style={{ marginTop: "16px" }}
      >
        <Row>
          {studentListData.map((item, index) => (
            <Col lg={3} md={4} sm={6} xs={6} key={index} >
              <div onClick={handleclick}  className="border border-white student_rectangle">
               
                  <div className="student_name">{item.studentName}</div>
                  <div className="student_date_id">
                    <div className="student_date">
                      {item.date}
                    </div>
                    <div className="student_id">
                      {item.rollNo}
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