import React, { useState, useEffect, useRef } from 'react'
import '../adminstudentlist/studentlisting.css'
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";

function StudentListing() {
    const studentListData = [
        { studentnumber:'1',studentname:'yyyyyyyyyyy'},
        { studentnumber:'1',studentname:'yyyyyyyyyyy'},
        { studentnumber:'1',studentname:'yyyyyyyyyyy'},
        { studentnumber:'1',studentname:'yyyyyyyyyyy'},
        { studentnumber:'1',studentname:'yyyyyyyyyyy'},
        { studentnumber:'1',studentname:'yyyyyyyyyyy'},
        { studentnumber:'1',studentname:'yyyyyyyyyyy'},
        { studentnumber:'1',studentname:'yyyyyyyyyyy'},
        { studentnumber:'1',studentname:'yyyyyyyyyyy'},
        { studentnumber:'1',studentname:'yyyyyyyyyyy'},
        { studentnumber:'1',studentname:'yyyyyyyyyyy'},
        { studentnumber:'1',studentname:'yyyyyyyyyyy'},
        { studentnumber:'1',studentname:'yyyyyyyyyyy'},
        { studentnumber:'1',studentname:'yyyyyyyyyyy'},
        { studentnumber:'1',studentname:'yyyyyyyyyyy'},
        { studentnumber:'1',studentname:'yyyyyyyyyyy'},
        { studentnumber:'1',studentname:'yyyyyyyyyyy'},
        { studentnumber:'1',studentname:'yyyyyyyyyyy'},
        { studentnumber:'1',studentname:'yyyyyyyyyyy'},
        { studentnumber:'1',studentname:'yyyyyyyyyyy'},
        { studentnumber:'1',studentname:'yyyyyyyyyyy'},
        { studentnumber:'1',studentname:'yyyyyyyyyyy'},
        { studentnumber:'1',studentname:'yyyyyyyyyyy'},
        { studentnumber:'1',studentname:'yyyyyyyyyyy'},        
        { studentnumber:'1',studentname:'yyyyyyyyyyy'},
        { studentnumber:'1',studentname:'yyyyyyyyyyy'},
        { studentnumber:'1',studentname:'yyyyyyyyyyy'},

      ];
  return (
    <div>
    <Container className="student_container">

      <div className="student_list">
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <Link to="/institutionadding">
              <IoChevronBackSharp className="student_back" />
            </Link>
            <h1 className="student_title">Student List</h1>
            <div style={{color:'#526D82', paddingLeft:'10px', fontSize:'15px'}}>(50)</div>
          </div>
          <div style={{ border: "0.5px solid #526D82" }}></div>
        </div>
        <Row>
        {studentListData.map((item, index) => (
            <Col lg={3} md={4} sm={6} xs={6} key={index} className="class_list">
            <div className=' student_card'>
                <div className='student_number'>
                    {item.studentnumber}
                </div>
                <div className='student_name'>
                        {item.studentname}
                </div>
            </div>
            </Col>
            ))}
        </Row>
      </div>
    </Container>
  </div>
  )
}

export default StudentListing