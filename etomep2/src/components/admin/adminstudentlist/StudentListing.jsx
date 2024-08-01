import React from 'react'
import '../adminstudentlist/studentlisting.css'
import { Container, Row, Col } from "react-bootstrap";
import { Link,useNavigate  } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";

function StudentListing() {
  
  const navigate = useNavigate();
  const handleclick= ()=>{
    navigate('/studentview')
}

    const studentListData = [
        { studentnumber:'1',studentname:'rrrrrrryyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy'},
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
        { studentnumber:'1',studentname:'yyyyyyyyyyy'},
        { studentnumber:'1',studentname:'yyyyyyyyyyy'},
        { studentnumber:'1',studentname:'yyyyyyyyyyy'},
        { studentnumber:'1',studentname:'yyyyyyyyyyy'},        
        { studentnumber:'1',studentname:'yyyyyyyyyyy'},
        { studentnumber:'1',studentname:'yyyyyyyyyyy'},
        { studentnumber:'1',studentname:'yyyyyyyyyyyyyyy'},
      ];



  return (
    <div>
    <Container className="student_container">
      <div className="student_form">
        <div className='studentlist_header'>
          <div className='studentlist_title_section'>
            {/* <Link to="/classview">
              <IoChevronBackSharp className="student_back" />
            </Link> */}
            <h1 className="student_title">Student List</h1>
            <div className='studentlist_number'>(50)</div>
          </div>
          {/* <div style={{ border: "0.5px solid #526D82" }}></div> */}
        </div>
<div className='studentlist_scrollable' style={{paddingTop:'30px'}}>
        <Row>
        {studentListData.map((item, index) => (
            <Col lg={3} md={4} sm={12} xs={12} key={index} className='studentsss_list'>
            <div  onClick={handleclick} className=' student_card'>
                <div className='student_number'>
                    {item.studentnumber}
                </div>
                <div className='student_name'>
                        {/* {item.studentname} */}
                        <span>{item.studentname}</span>
                </div>
            </div>
            </Col>
            ))}
        </Row>
        </div>
      </div>
    </Container>
  </div>
  )
}

export default StudentListing