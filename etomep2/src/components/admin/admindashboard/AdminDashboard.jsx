import React, { useState } from 'react'
import { Col, Container, Row, FormControl, Tabs, Tab, Nav } from "react-bootstrap";
import '../admindashboard/admindashboard.css';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { LuBellDot } from "react-icons/lu";

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// import Dashimg1 from "../../../assets/dashimgone.png";
import studenticon from "../../../assets/studenticon.png";
import teachericon from "../../../assets/teachericon.png";


import { useSelector } from 'react-redux';

function AdminDashboard() {

  // clandar part
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [notes, setNotes] = useState({
    '2023-08-10': [
      { text: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search', date: '10/08/2023' },
      { text: 'Another note for 10/08/2023', date: '10/08/2023' }
    ],
    '2023-08-11': [
      { text: 'Some note for 11/08/2023', date: '11/08/2023' }
    ],
  });
  const [newNoteText, setNewNoteText] = useState('');

  const formattedDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAddNote = () => {
    if (newNoteText.trim() === '') return; // Prevent adding empty notes

    const dateKey = formattedDate(selectedDate);
    const newNote = { text: newNoteText, date: dateKey };
    setNotes({
      ...notes,
      [dateKey]: notes[dateKey] ? [...notes[dateKey], newNote] : [newNote]
    });
    setNewNoteText(''); // Clear the input field after adding the note
  };

  const selectedNotes = notes[formattedDate(selectedDate)] || [];







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
        {/* <Row >

          <Row>

          </Row>
        </Row> */}
        <Row className='admin_dashboard_row'>
          <Col md={7} className='dashboard_content_row'>
            <Row className='dashbord_greetings_row' >
              <h1 className='dash_grt_headr'>Welcome!</h1>
            </Row>
            <Row className='dash_snd_row'>
              <Col style={{ display: "flex", justifyContent: "space-between", }} md={5} sm={12} xs={12}>
                <div className='dash_student_card'>
                  <img className='student_icon_dash' src={studenticon} alt='icons' />
                  <p>Total Students</p>
                  <p>22547</p>
                </div>
                <div className='dash_teacher_card'>
                  <img className='teacher_icon_dash' src={teachericon} alt='icons' />
                  <p>Total Teachers</p>
                  <p>225</p>
                </div>

              </Col>
              <Col md={7} sm={12} xs={12}>
                <div className="loka_card">

                </div>
              </Col>
            </Row>
            <Row >
              <Col md={5} xs={12} sm={12}>
                <Calendar
                  onChange={handleDateChange}
                  value={selectedDate}
                  className="custom_calendar"
                />
              </Col>
              <Col md={7} xs={12} sm={12} style={{ paddingTop: "4%" }} >
              <h5 className='notes_header'>Notes</h5>
              <div className="fixed_footer">
                      <FormControl
                        as="textarea"
                        placeholder="Enter note text"
                        value={newNoteText}
                        onChange={(e) => setNewNoteText(e.target.value)}
                        className='txt_form'
                      />
                      <button className='dash_noteadd_btn' onClick={handleAddNote}>+</button>
                    </div>
                <div className='dash_note_min_div'>
                  <div className="notes_section">
                    {selectedNotes.map((note, index) => (
                      <div key={index} className="note_item">
                        <p>{note.text}</p>
                        <span className="note_date">{note.date}</span>
                        <button className="delete_note" onClick={() => console.log('Delete note functionality')}>🗑️</button>
                      </div>
                    ))}
                  </div>
                </div>
                    {/* <div className="fixed_footer">
                      <FormControl
                        as="textarea"
                        placeholder="Enter note text"
                        value={newNoteText}
                        onChange={(e) => setNewNoteText(e.target.value)}
                      />
                    </div>
                      <button className='dash_noteadd_btn' onClick={handleAddNote}>+ Add New</button> */}
              </Col>
            </Row>
          </Col>


          <Col md={6} className='notification_section'>
            <div className='notification_content_1'>
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
      </Container >
    </div >
  )
}

export default AdminDashboard
