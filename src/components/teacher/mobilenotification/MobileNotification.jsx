import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { LuBellDot } from "react-icons/lu";
import '../mobilenotification/mobilenotification.css';


const MobileNotification = ({ onClose }) => {
  const [showThisDate, setShowThisDate] = useState(false);
  const [showPreviousDate, setShowPreviousDate] = useState(false);

  const notifications = {
    thisDate: [
      { id: 1, title: 'Reshma Shared the Question Paper'},
      { id: 3, title: 'Angaha Completed the Evaluation'},
    ],
    previousDate: [
      { id: 2, title: 'Reshma Shared the Question Paper'},
      { id: 4, title: 'Reshma Shared the Question Paper'},
      { id: 5, title: 'Angaha Completed the Evaluation'},
      { id: 2, title: 'Reshma Shared the Question Paper'},
      { id: 4, title: 'Reshma Shared the Question Paper'},
      { id: 5, title: 'Angaha Completed the Evaluation'},
      { id: 2, title: 'Reshma Shared the Question Paper'},
      { id: 4, title: 'Reshma Shared the Question Paper'},
      { id: 5, title: 'Angaha Completed the Evaluation'},
    ]
  };

//   const handleAssignmentClick = (notification) => {
//     console.log('Clicked on notification:', notification);
//   };
const handleAssignmentClick = (notification) => {
    setSelectedAssignment(notification);
    setShowModal(true);
  }
  return (
    <Modal
      show={true}
      onHide={onClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter ">
        <div className='mobile_header'>
            <LuBellDot className='mobile_notification_bell'/>
            <h5>Notifications</h5>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='mobile_notification_content'>
          <div className='mobile_notification_body'>
            <div className="mobile_day" onClick={() => setShowThisDate(!showThisDate)}>
              <span>Today</span>
              {showThisDate ? <IoIosArrowUp className="mobile_day_icon" /> : <IoIosArrowDown className="mobile_day_icon" />}
            </div>
            {showThisDate && notifications.thisDate.map((notification) => (
              <div key={notification.id} className="mobile_notification_item mb-3 p-2" onClick={() => handleAssignmentClick(notification)}>
                <h4>{notification.title}</h4>
                <p>3.00 PM</p>
              </div>
            ))}

            <div className="mobile_day" onClick={() => setShowPreviousDate(!showPreviousDate)}>
              <span>Yesterday</span>
              {showPreviousDate ? <IoIosArrowUp className="mobile_day_icon" /> : <IoIosArrowDown className="mobile_day_icon" />}
            </div>
            {showPreviousDate && notifications.previousDate.map((notification) => (
              <div key={notification.id} className="mobile_notification_item mb-3 p-2" onClick={() => handleAssignmentClick(notification)}>
                <h4>{notification.title}</h4>
                <p>10.00 AM</p>
              </div>
            ))}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default MobileNotification;
