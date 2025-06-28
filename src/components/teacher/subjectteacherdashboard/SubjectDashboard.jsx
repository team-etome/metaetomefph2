import React, { useState } from "react";
import { Col, Container, Row,FormControl, Tabs, Tab, Nav, Dropdown } from "react-bootstrap";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoPersonCircleOutline } from "react-icons/io5";
import { LuBellDot } from "react-icons/lu";
import { AiOutlineFilePdf } from "react-icons/ai";
import "../subjectteacherdashboard/subjectteacherdashboard.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import pdficon from '../../../assets/pdficon.svg'
import { RiPresentationLine } from "react-icons/ri";

function SubjectDashboard() {
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
    const [value, setValue] = useState(new Date());
  
    // const state = useSelector(state => state);
    // console.log(state);
  
    const handleAssignmentClick = (assignment) => {
      setSelectedAssignment(assignment);
      setShowModal(true);
    };
    const notifications = {
      thisDate: [
        { id: 1, title: "Reshma Shared the Question Paper" },
        { id: 3, title: "Angaha Completed the Evaluation" },
        { id: 1, title: "Reshma Shared the Question Paper" },
        { id: 3, title: "Angaha Completed the Evaluation" },
        { id: 1, title: "Reshma Shared the Question Paper" },
        { id: 3, title: "Angaha Completed the Evaluation" },
        { id: 1, title: "Reshma Shared the Question Paper" },
        { id: 3, title: "Angaha Completed the Evaluation" },
      ],
      previousDate: [
        { id: 2, title: "Reshma Shared the Question Paper" },
        { id: 4, title: "Reshma Shared the Question Paper" },
        { id: 5, title: "Angaha Completed the Evaluation" },
      ],
    };
  return (
    <div className="sbteacher_home">
      <Container className="sbteacher_home_container">
        
        <Row className="sbteacher_home_row">
          <Col className="sbdashboard_section" md={7}>
          <Row className="sbtchr_head">
          <h1>Welcome !</h1>
        </Row>
            <Row className="sbtchr_db_rsrce_sub">
              <Col md={7} sm={12} xs={12}  className="sbtchr_rscr_mtr">
                <div className="sbtchr_rsr_title">
                  <h6>Resource Materials</h6>
                  <select name="" id="" className="sbtchr_drpdwn">
                    <option value="class1">Class 11A</option>
                    <option value="class2">Class 2B</option>
                  </select>
                </div>
                <div className="sbtchr_rscr_mat">
                  <div className="sbtchr_pdf">
                    <img src={pdficon} className="sbtchr_icon" />
                    <p>titleeeetitleeeetitleeeetitleeeetitleeee</p>
                  </div>
                  <div className="sbtchr_pdf">
                    <img src={pdficon} className="sbtchr_icon" />
                    <p>titleeeetitleeeetitleeeetitleeeetitleeee</p>
                  </div>
                </div>
              </Col>
              <Col md={5} sm={12} xs={12} className="sbtchr_sb_tchr">
                <div className="sbtchr_sb_list">
                  <div className="sbtchr_gp">
                    <h6>Scheduled Classes</h6>
                    <div className="sbheading-divider"></div>
                    {/* <hr style={{border:'1px solid red'}}/> */}
                    {/* <hr className="heading-divider" /> */}
                    <div className="sbtchr_hd_list">
                      <div className="sbtchr_list">
                        <div className="sbtchr_person_name">
                          <RiPresentationLine className="sbtchr_person" />
                          <div className="sbtchr_sub">
                            <p>10 B</p>
                          </div>
                        </div>
                        <div className="sbtchr_sub_phn">
                          <p>Subject: Physics</p>
                          {/* <p >Phone Number</p> */}
                        </div>
                      </div>
                      <div className="sbtchr_list">
                        <div className="sbtchr_person_name">
                          <RiPresentationLine className="sbtchr_person" />
                          <div className="sbtchr_sub">
                            <p>11 A</p>
                          </div>
                        </div>
                        <div className="sbtchr_sub_phn">
                          <p>Subject: Chemistry</p>
                          {/* <p >Phone Number</p> */}
                        </div>
                      </div>
                      <div className="sbtchr_list">
                        <div className="sbtchr_person_name">
                          <RiPresentationLine className="sbtchr_person" />
                          <div className="sbtchr_sub">
                            <p>Teacher Nameeee</p>
                          </div>
                        </div>
                        <div className="sbtchr_sub_phn">
                          <p>Subject</p>
                          {/* <p >Phone Number</p> */}
                        </div>
                      </div>
                      <div className="sbtchr_list">
                        <div className="sbtchr_person_name">
                          <RiPresentationLine className="sbtchr_person" />
                          <div className="sbtchr_sub">
                            <p>Teacher Nameeee</p>
                          </div>
                        </div>
                        <div className="sbtchr_sub_phn">
                          <p>Subject</p>
                          {/* <p >9989993455</p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row >
              <Col md={5} xs={12} sm={12}>
                <Calendar
                  onChange={handleDateChange}
                  value={selectedDate}
                  className="sbcustom_calendar_tchr "
                />
              </Col>
              <Col md={7} xs={12} sm={12} style={{ paddingTop: "8%" }} >
              <h5 className='sbnotes_header_tchr'>Notes</h5>
              <div className="sbfixed_footer_tchr ">
                      <FormControl
                        as="textarea"
                        placeholder="Enter note text"
                        value={newNoteText}
                        onChange={(e) => setNewNoteText(e.target.value)}
                        className='sbtxt_form_tchr '
                      />
                      <button className='sbdash_noteadd_btn_tchr' onClick={handleAddNote}>+</button>
                    </div>
                <div className='sbdash_note_min_div_tchr '>
                  <div className="sbnotes_section_tchr ">
                    {selectedNotes.map((note, index) => (
                      <div key={index} className="sbnote_item_tchr ">
                        <p>{note.text}</p>
                        <span className="sbnote_date_tchr ">{note.date}</span>
                        <button className="sbdelete_note_tchr " onClick={() => console.log('Delete note functionality')}>🗑️</button>
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
          <Col md={4} className="sbteacher_home_section">
            <div className="sbteacher_home_content">
              <div className="sbteacher_home_bar">
                <LuBellDot className="sbteacher_home_bell" />
                <h5>Notification</h5>
              </div>
              <hr />
              <div className="sbteacher_home_body">
                <div
                  className="sbteacher_home_day"
                  onClick={() => setShowThisDate(!showThisDate)}
                >
                  <span>Today</span>
                  {showThisDate ? (
                    <IoIosArrowUp className="sbteacher_home_day_icon" />
                  ) : (
                    <IoIosArrowDown className="sbteacher_home_day_icon" />
                  )}
                </div>
                {showThisDate &&
                  notifications.thisDate.map((notification) => (
                    <div
                      key={notification.id}
                      className="sbteacher_home_item mb-3 p-2"
                      onClick={() => handleAssignmentClick(notification)}
                    >
                      <h4>{notification.title}</h4>
                      <p>3.00 PM</p>
                    </div>
                  ))}

                <div
                  className="sbteacher_home_day"
                  onClick={() => setShowPreviousDate(!showPreviousDate)}
                >
                  <span>Yesterday</span>
                  {showPreviousDate ? (
                    <IoIosArrowUp className="sbteacher_home_day_icon" />
                  ) : (
                    <IoIosArrowDown className="sbteacher_home_day_icon" />
                  )}
                </div>
                {showPreviousDate &&
                  notifications.previousDate.map((notification) => (
                    <div
                      key={notification.id}
                      className="sbteacher_home_item mb-3 p-2"
                      onClick={() => handleAssignmentClick(notification)}
                    >
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

export default SubjectDashboard