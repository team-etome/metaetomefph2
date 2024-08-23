import React, { useState } from 'react'
import { Col, Container, Row, Tabs, Tab, Nav,Dropdown } from "react-bootstrap";
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { LuBellDot } from "react-icons/lu";
import { AiOutlineFilePdf } from "react-icons/ai";
import '../teacherhome/teacherhome.css'
// import Dashimg1 from "../../../assets/dashimgone.png";
// import Dashimg from "../../../assets/dashimg.png";

function TeacherHome() {
  const [showThisDate, setShowThisDate] = useState(true);
  const [showPreviousDate, setShowPreviousDate] = useState(true);
  const [selectedAssignment, setSelectedAssignment] = useState(null);


  // const state = useSelector(state => state);
  // console.log(state); 

  const handleAssignmentClick = (assignment) => {
    setSelectedAssignment(assignment);
    setShowModal(true);
  }
  const notifications = {
    thisDate: [
      { id: 1, title: 'Reshma Shared the Question Paper' },
      { id: 3, title: 'Angaha Completed the Evaluation' },
      { id: 1, title: 'Reshma Shared the Question Paper' },
      { id: 3, title: 'Angaha Completed the Evaluation' },
      { id: 1, title: 'Reshma Shared the Question Paper' },
      { id: 3, title: 'Angaha Completed the Evaluation' },
      { id: 1, title: 'Reshma Shared the Question Paper' },
      { id: 3, title: 'Angaha Completed the Evaluation' },
    ],
    previousDate: [
      { id: 2, title: 'Reshma Shared the Question Paper' },
      { id: 4, title: 'Reshma Shared the Question Paper' },
      { id: 5, title: 'Angaha Completed the Evaluation' },
    ]
  };
  return (
    <div className="teacher_home">
      <Container className='teacher_home_container'>
        <Row className='tchr_head'>
          <h4>
            Welcome !
          </h4>
          </Row>
        <Row className='teacher_home_row'>
          <Col className='dashboard_section' md={8}>
          <Row className='tchr_db_rsrce_sub'>
          <Col md={6} className='tchr_rscr_mtr'>
            <div className='tchr_rsr_title'>
              <h6>Resource Materials</h6>
              <select name="" id="" className='tchr_drpdwn'>
              <option value="class1">Class 1</option>
              <option value="class2">Class 2</option>
              </select>
            </div>
            <div className='tchr_rscr_mat'>
              <div className='tchr_pdf'>
               <AiOutlineFilePdf className='tchr_icon'/>
               <p>titleeeetitleeeetitleeeetitleeeetitleeee</p>
              </div>
              <div className='tchr_pdf'>
               <AiOutlineFilePdf className='tchr_icon'/>
               <p>titleeee</p>
              </div><div className='tchr_pdf'>
               <AiOutlineFilePdf className='tchr_icon'/>
               <p>titleeee</p>
              </div><div className='tchr_pdf'>
               <AiOutlineFilePdf className='tchr_icon'/>
               <p>titleeee</p>
              </div><div className='tchr_pdf'>
               <AiOutlineFilePdf className='tchr_icon'/>
               <p>titleeee</p>
              </div><div className='tchr_pdf'>
               <AiOutlineFilePdf className='tchr_icon'/>
               <p>titleeee</p>
              </div><div className='tchr_pdf'>
               <AiOutlineFilePdf className='tchr_icon'/>
               <p>titleeee</p>
              </div><div className='tchr_pdf'>
               <AiOutlineFilePdf className='tchr_icon'/>
               <p>titleeee</p>
              </div><div className='tchr_pdf'>
               <AiOutlineFilePdf className='tchr_icon'/>
               <p>titleeee</p>
              </div>
              <div className='tchr_pdf'>
               <AiOutlineFilePdf className='tchr_icon'/>
               <p>titleeee</p>
              </div>
              <div className='tchr_pdf'>
               <AiOutlineFilePdf className='tchr_icon'/>
               <p>titleeee</p>
              </div>
              <div className='tchr_pdf'>
               <AiOutlineFilePdf className='tchr_icon'/>
               <p>titleeee</p>
              </div>
            </div>
            </Col>
            <Col  md={6} className='tchr_sb_tchr'>
            subject teachers
            </Col>
          </Row>
            <Row className='tcrr_cal_notes'>
              <Col md={6} className='tchr_cal'>
               calendar
              </Col>
              <Col md={6} className='tchr_notes'>
               notes
              </Col>
            </Row>
          </Col>
          <Col md={4} className='teacher_home_section'>
            <div className='teacher_home_content'>
              <div className='teacher_home_bar'>
                <LuBellDot className='teacher_home_bell' />
                <h5>Notification</h5>
              </div>
              <hr />
              <div className='teacher_home_body'>
                <div className="teacher_home_day" onClick={() => setShowThisDate(!showThisDate)}>
                  <span>Today</span>
                  {showThisDate ? <IoIosArrowUp className="teacher_home_day_icon" /> : <IoIosArrowDown className="teacher_home_day_icon" />}
                </div>
                {showThisDate && notifications.thisDate.map((notification) => (
                  <div key={notification.id} className="teacher_home_item mb-3 p-2" onClick={() => handleAssignmentClick(notification)}>
                    <h4>{notification.title}</h4>
                    <p>3.00 PM</p>
                  </div>
                ))}

                <div className="teacher_home_day" onClick={() => setShowPreviousDate(!showPreviousDate)}>
                  <span>Yesterday</span>
                  {showPreviousDate ? <IoIosArrowUp className="teacher_home_day_icon" /> : <IoIosArrowDown className="teacher_home_day_icon" />}
                </div>
                {showPreviousDate && notifications.previousDate.map((notification) => (
                  <div key={notification.id} className="teacher_home_item mb-3 p-2" onClick={() => handleAssignmentClick(notification)}>
                    <h4>{notification.title}</h4>
                    <p>10.00 AM</p>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default TeacherHome