import React, { useState, useEffect } from 'react'
import { Col, Container, Row,Button } from "react-bootstrap";
import { IoIosAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import amritha from "../../../assets/amritha.png";
import'../adminfacultydashboard/facultydashboard.css'
import { FaFileExcel } from 'react-icons/fa';
import { MdUpload } from "react-icons/md";
import { IoMdDownload,IoMdAdd } from "react-icons/io";

function FacultyDashboard() {
  const [isActive, setIsActive] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleAddClick = () => {
    setShowOptions(!showOptions);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsActive((prevState) => !prevState);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const facultyListData = [
    { employeeid: "English", facultyName: "yyyyyyyy"},
    { employeeid: "English", facultyName: "yyyyyyyy"},    
    { employeeid: "English", facultyName: "yyyyyyyy"},
    { employeeid: "English", facultyName: "yyyyyyyy"},
    { employeeid: "English", facultyName: "yyyyyyyy"},
    { employeeid: "English", facultyName: "yyyyyyyy"},
    { employeeid: "English", facultyName: "yyyyyyyy"},
    { employeeid: "English", facultyName: "yyyyyyyy"},
    { employeeid: "English", facultyName: "yyyyyyyy"},
    { employeeid: "English", facultyName: "yyyyyyyy"},
    { employeeid: "English", facultyName: "yyyyyyyy"},
    { employeeid: "English", facultyName: "yyyyyyyy"},
    { employeeid: "English", facultyName: "yyyyyyyy"},
    { employeeid: "English", facultyName: "yyyyyyyy"},    
    { employeeid: "English", facultyName: "yyyyyyyy"},
    { employeeid: "English", facultyName: "yyyyyyyy"},
    { employeeid: "English", facultyName: "yyyyyyyy"},
    { employeeid: "English", facultyName: "yyyyyyyy"},
    { employeeid: "English", facultyName: "yyyyyyyy"},
    { employeeid: "English", facultyName: "yyyyyyyy"},
    { employeeid: "English", facultyName: "yyyyyyyy"},

  ];
  return (
    <div style={{display:"flex",justifyContent:"center",width:'104.5%'}}>
      <Container fluid className="faculty_container_scroll" style={{ marginTop: "16px" }}>
        <Row>
          {facultyListData.map((item, index) => (
            <Col lg={3} md={4} sm={6} xs={6} key={index} className="class_list">
              {/* <Link to='/facultyview' style={{ textDecoration: 'none', color: 'inherit' }}> */}
              <div className="border border-white faculty_rectangle">
              <Link to='/facultyview' style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="faculty_list_medium">{item.employeeid}</div>
                <div className="faculty_profile_name">
                  <div>
                <img 
                  src={amritha} 
                  alt='profile pic'
                  className="faculty_profile_photo"
                />
                </div>
                <div className="faculty_list_facultyname">{item.facultyName}</div>
                </div>
                <div className="faculty_lisit_circle">
                  <div className="faculty_number_div">
                    {/* <h1 style={{ fontSize: "1.8rem", fontWeight: "bold" }}>{item.classnumber}</h1> */}
                  </div>
                </div>
                </Link>
              </div>
              {/* </Link> */}
            </Col>
          ))}
        </Row>
      </Container>
      <div className="class_adding_button">
        <button className={`class_adding my-button ${isActive ? 'active' : ''}`} onClick={handleAddClick}>
          <IoIosAdd style={{ height: "40px", width: "40px", color: "#ffff" }} />
        </button>
        {showOptions && (
          <>
            <div className="overlay" onClick={handleAddClick}></div>
            <div className="fab-options">
              <Link to='/facultyadding' style={{display:'flex',justifyContent:'center',alignContent:'center', gap:'20px'}} className='fab_option_link'>
                <div className='fab-text'>Add Faculty</div>
                <button className="fab-option">
                <IoMdAdd className="fab-icon"/>
                </button>
              </Link>
              <Link to='/facultyadding' style={{display:'flex',justifyContent:'center',alignContent:'center', gap:'20px'}} className='fab_option_link'>
              <div className='fab-text' style={{width:'200px'}}>Upload Through Excel </div>
              <button className="fab-option">
              <MdUpload className="fab-icon"/>
              </button>
              </Link>
              <Link to='/facultyadding' style={{display:'flex',justifyContent:'center',alignContent:'center', gap:'20px'}} className='fab_option_link'>
              <div className='fab-text' style={{width:'200px'}}>Download Excel Template</div>
              <button className="fab-option">
              <IoMdDownload className="fab-icon"/>
              </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default FacultyDashboard