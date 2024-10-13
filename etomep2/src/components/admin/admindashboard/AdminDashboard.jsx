import React, { useState, useEffect } from "react";
import {
  Col,
  Container,
  Row,
  FormControl,
  Tabs,
  Tab,
  Nav,
} from "react-bootstrap";
import "../admindashboard/admindashboard.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { LuBellDot } from "react-icons/lu";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
// import Dashimg1 from "../../../assets/dashimgone.png";
import studenticon from "../../../assets/studenticon.png";
import teachericon from "../../../assets/teachericon.png";
import { useSelector } from "react-redux";

function AdminDashboard() {
  // clandar part
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [notes, setNotes] = useState({});
  const [newNoteText, setNewNoteText] = useState("");

  const APIURL = useSelector((state) => state.APIURL.url);

  const admininfo = useSelector((state) => state.admininfo);
  const admin_id = admininfo.admininfo?.admin_id;

  console.log(admin_id, "admin id");

  const formattedDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAddNote = () => {
    if (newNoteText.trim() === "") return;

    const dateKey = formattedDate(selectedDate);
    const newNote = { text: newNoteText, date: dateKey };
    setNotes({
      ...notes,
      [dateKey]: notes[dateKey] ? [...notes[dateKey], newNote] : [newNote],
    });
    q;
    setNewNoteText("");
  };

  // Delete note
  const handleDeleteNote = (indexToDelete) => {
    const dateKey = formattedDate(selectedDate);
    const updatedNotes = notes[dateKey].filter(
      (_, index) => index !== indexToDelete
    );

    setNotes({
      ...notes,
      [dateKey]: updatedNotes.length > 0 ? updatedNotes : undefined, // Remove date if no notes left
    });
  };
  const selectedNotes = notes[formattedDate(selectedDate)] || [];

  const [showThisDate, setShowThisDate] = useState(true);
  const [showPreviousDate, setShowPreviousDate] = useState(true);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [notifications, setNotifications] = useState([]);

  console.log(notifications, "ghfusrdg");

  const state = useSelector((state) => state);
  console.log(state);

  const handleAssignmentClick = (notification) => {
    setSelectedAssignment(notification);
    setShowModal(true);
  };

  // useEffect(() => {
  //   let socket;

  //   if (admin_id) {
  //     const connectWebSocket = () => {
  //       const socketUrl = `ws://192.168.1.42:8000/ws/reports/${admin_id}/`;
  //       console.log(`Connecting WebSocket: ${socketUrl}`);
  //       socket = new WebSocket(socketUrl);

  //       socket.onopen = () => {
  //         console.log("WebSocket connection established.");
  //       };

  //       socket.onmessage = (event) => {
  //         console.log("WebSocket message received:", event);
  //         try {
  //           const data = JSON.parse(event.data);
  //           console.log("Parsed WebSocket message:", data);
  //           if (data && data.message) {
  //             const newNotification = {
  //               id: new Date().getTime(),
  //               title: (
  //                 <span  >
  //                   <strong className="highlight-text">Issue Reported:</strong> {data.message.description}{" "}
  //                   in Hall {data.message.hall_number} reported by Teacher{" "}
  //                   {data.message.teacher_name} on {data.message.date}
  //                 </span>
  //               ),
  //               time: new Date(),
  //             };
  //             setNotifications((prevNotifications) => [
  //               newNotification,
  //               ...prevNotifications,
  //             ]);
  //           }
  //         } catch (error) {
  //           console.error("Error parsing WebSocket message:", error);
  //         }
  //       };

  //       socket.onerror = (error) => {
  //         console.error("WebSocket error:", error);
  //       };

  //       socket.onclose = (event) => {
  //         console.log("WebSocket connection closed:", event);
       
  //         if (!event.wasClean) {
  //           console.log("Attempting to reconnect WebSocket...");
  //           setTimeout(() => connectWebSocket(), 5000);
  //         }
  //       };
  //     };

  //     connectWebSocket();

  //     return () => {
  //       if (socket) {
  //         console.log("Closing WebSocket connection.");
  //         socket.close();
  //       }
  //     };
  //   }
  // }, [admin_id, APIURL]);

  return (
    <div className="admin_dashboard">
      <Container className="admin_dasboard_container">
        {/* <Row >

          <Row>

          </Row>
        </Row> */}
        <Row className="admin_dashboard_row">
          <Col md={7} className="dashboard_content_row">
            <Row className="dashbord_greetings_row">
              <h1 className="dash_grt_headr">Welcome!</h1>
            </Row>
            <Row className="dash_snd_row">
              <Col
                style={{ display: "flex", justifyContent: "space-between" }}
                className="dsh_snd_col"
                md={5}
                sm={12}
                xs={12}
              >
                <div className="dash_student_card">
                  <img
                    className="student_icon_dash"
                    src={studenticon}
                    alt="icons"
                  />
                  <p>Total Students</p>
                  <p>22547</p>
                </div>
                <div className="dash_teacher_card">
                  <img
                    className="teacher_icon_dash"
                    src={teachericon}
                    alt="icons"
                  />
                  <p>Total Teachers</p>
                  <p>225</p>
                </div>
              </Col>
              <Col md={7} sm={12} xs={12} className="dsh_lka">
                <div className="loka_card"></div>
              </Col>
            </Row>
            <Row className="rw_cl_nt">
              <Col md={5} xs={12} sm={12} className="dsh_clnd">
                <Calendar
                  onChange={handleDateChange}
                  value={selectedDate}
                  className="custom_calendar"
                />
              </Col>
              <Col md={7} xs={12} sm={12} className="dsh_nt">
                <h5 className="notes_header">Notes</h5>
                <div className="fixed_footer">
                  <FormControl
                    as="textarea"
                    placeholder="Enter note text"
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    className="txt_form"
                  />
                  <button className="dash_noteadd_btn" onClick={handleAddNote}>
                    +
                  </button>
                </div>
                <div className="dash_note_min_div">
                  <div className="notes_section">
                    {selectedNotes.map((note, index) => (
                      <div key={index} className="note_item">
                        <p>{note.text}</p>
                        <span className="note_date">{note.date}</span>
                        {/* <button className="delete_note" onClick={() => console.log('Delete note functionality')}>🗑️</button> */}
                        <button
                          className="delete_note"
                          onClick={() => handleDeleteNote(index)}
                        >
                          🗑️
                        </button>
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

{/*           <Col md={6} className="notification_section">
            <div className="notification_content_1">
              <div className="notification_bar">
                <LuBellDot className="notification_bell" />
                <h5>Notifications</h5>
              </div>
              <hr />
              <div className="notification_body">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="notification_item mb-3 p-2"
                    >
                      <h4>{notification.title}</h4>
                      <p>{new Date(notification.time).toLocaleTimeString()}</p>
                    </div>
                  ))
                ) : (
                  <p>No notifications available.</p>
                )}
              </div>
            </div>
          </Col> */}
        </Row>
      </Container>
    </div>
  );
}

export default AdminDashboard;
