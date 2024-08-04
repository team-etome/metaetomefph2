import React, { useState } from 'react'
import { Col, Container, Row, Tabs, Tab, Nav } from "react-bootstrap";
import '../admindashboard/admindashboard.css';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { LuBellDot } from "react-icons/lu";
import Dashimg1 from "../../../assets/dashimgone.png";
import Dashimg from "../../../assets/dashimg.png";


import { useSelector } from 'react-redux';

function AdminDashboard() {
  const [showThisDate, setShowThisDate] = useState(true);
  const [showPreviousDate, setShowPreviousDate] = useState(true);
  const [selectedAssignment, setSelectedAssignment] = useState(null);


  const state = useSelector(state => state);
  console.log(state);

  const handleAssignmentClick = (notification) => {
    setSelectedAssignment(notification);
    setShowModal(true);
  }
  const notifications = {
    thisDate: [
      { id: 1, title: 'Reshma Shared the Question Paper' },
      { id: 3, title: 'Angaha Completed the Evaluation' },
      { id: 3, title: 'Angaha Completed the Evaluation' },
      { id: 3, title: 'Angaha Completed the Evaluation' },
      { id: 3, title: 'Angaha Completed the Evaluation' },
      { id: 3, title: 'Angaha Completed the Evaluation' },


    ],
    previousDate: [
      { id: 2, title: 'Reshma Shared the Question Paper' },
      { id: 4, title: 'Reshma Shared the Question Paper' },
      { id: 5, title: 'Angaha Completed the Evaluation' },
    ]
  };
  return (
    <div className="admin_dashboard">
      <Container className='admin_dasboard_container'>
        <Row className='admin_dashboard_row'>
          <Col className='dashboard_section' md={7}>
            <div className='dashboard_content'>
              <img src={Dashimg1} alt='dashimage' className='dashboard_image1' />
              <img src={Dashimg} alt='dashimage' className='dashboard_image2' />
            </div>

          </Col>

          <Col md={5} className='notification_section'>
            <div className='notification_content'>
              <div className='notification_bar'>
                <LuBellDot className='notification_bell' />
                <h5>Notification</h5>
              </div>
              <hr />
              <div className='notification_body'>
                <div className="day" onClick={() => setShowThisDate(!showThisDate)}>
                  <span>Today</span>
                  {showThisDate ? <IoIosArrowUp className="day_icon" /> : <IoIosArrowDown className="day_icon" />}
                </div>
                {showThisDate && notifications.thisDate.map((notification) => (
                  <div key={notification.id} className="notification_item mb-3 p-2" onClick={() => handleAssignmentClick(notification)}>
                    <h4>{notification.title}</h4>
                    <p>3.00 PM</p>
                  </div>
                ))}

                <div className="day" onClick={() => setShowPreviousDate(!showPreviousDate)}>
                  <span>Yesterday</span>
                  {showPreviousDate ? <IoIosArrowUp className="day_icon" /> : <IoIosArrowDown className="day_icon" />}
                </div>
                {showPreviousDate && notifications.previousDate.map((notification) => (
                  <div key={notification.id} className="notification_item mb-3 p-2" onClick={() => handleAssignmentClick(notification)}>
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

export default AdminDashboard