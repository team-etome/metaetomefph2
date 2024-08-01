import React,{ useState } from 'react'
import { Col, Container, Row, Tabs, Tab, Nav } from "react-bootstrap";
import '../admindashboard/admindashboard.css';
import { IoIosArrowDown, IoIosArrowUp} from 'react-icons/io';
import { LuBellDot } from "react-icons/lu";
import background from "../../../assets/background.png";
import logo from "../../../assets/logo.png";

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
      { id: 1, title: 'Reshma Shared the Question Paper'},
      { id: 3, title: 'Angaha Completed the Evaluation'},
    ],
    previousDate: [
      { id: 2, title: 'Reshma Shared the Question Paper'},
      { id: 4, title: 'Reshma Shared the Question Paper'},
      { id: 5, title: 'Angaha Completed the Evaluation'},
    ]
  };
  return (
 <div className="admin_dashboard">
      <Container className='admin_dasboard_container'>
        <Row className='admin_dashboard_row'>
          {/* <Col md={12} className='ad_dashboard_col' >
            <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
              <img src={background} alt="" style={{height:'85vh', width:"130%", paddingLeft:'0vh', borderRadius:'8px', display:'flex', justifyContent:'center',alignItems:'center'}}/>
            </div>
            
          </Col> */}
          <Col md={12} className='ad_dashboard_col' >
            <div className="background-image-container" style={{ position: 'relative', textAlign: 'center' }}>
              <img 
                src={background} 
                alt="Background" 
                style={{ height: '85vh', width: "100%", paddingLeft: '0vh', borderRadius: '8px' }}
              />
              {/* <div className="overlay-text" style={{ position: 'absolute', top: '0%', left: '35%', transform: 'translateX(-50%)', color: '#fff', fontSize: '2rem' }}>
                <img src={logo} alt="etome Logo" style={{ width: '400px', height: 'auto',display:'flex',justifyContent:'flex-start' }} />
                <span style={{color:'#000000',left: '55%', display:'flex',justifyContent:'flex-start'}}>Innovation that Changes the World</span>
              </div> */}
            </div>
          </Col>
          {/* <Col md={5} className='notification_section'>
          <div className='notification_content'>
           <div className='notification_bar'>
              <LuBellDot className='notification_bell'/>
              <h5>Notification</h5>
            </div>
            <hr/>
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
          </Col> */}
        </Row>
      </Container>
    </div>
  )
}

export default AdminDashboard