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
import studenticon from "../../../assets/studenticon.png";
import teachericon from "../../../assets/teachericon.png";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import { format } from "date-fns";

function AdminDashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [notes, setNotes] = useState({});

  const [editNoteId, setEditNoteId] = useState("");

  const [filteredNotes, setFilteredNotes] = useState([]);

  console.log(filteredNotes, "filtereddddd notesssss");

  console.log(notes, "notessss");
  const [newNoteText, setNewNoteText] = useState("");

  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);

  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const APIURL = useSelector((state) => state.APIURL.url);

  const admininfo = useSelector((state) => state.admininfo);
  const admin_id = admininfo.admininfo?.admin_id;
  console.log(admin_id,'admin id')

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`${APIURL}/api/note`, {
          params: {
            admin: admin_id,
          },
        });

        if (response.data && response.data.data) {
          setNotes(response.data.data);
        } else {
          console.error("No notes found for this admin.");
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    if (admin_id) {
      fetchNotes();
    }
  }, [admin_id, APIURL]);

  const formattedDate = (date) => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      throw new Error("Invalid date provided to formattedDate");
    }

    // Adjust for timezone offset to ensure correct day
    const localDate = new Date(
      parsedDate.getTime() - parsedDate.getTimezoneOffset() * 60000
    );

    // Format as YYYY-MM-DD
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, "0");
    const day = String(localDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    // Get the current date object
    const currentDate = new Date();

    // Call handleDateChange with the current date
    handleDateChange(currentDate);
  }, []); // Empty dependency array to run once on mount

  const handleDateChange = (date) => {
    console.log(date, "dateeeeee");
    // Check if date is valid
    if (!date) {
      console.log("Invalid date selected.");
      return;
    }

    // Format the date to "yyyy-MM-dd"
    const formatted = format(date, "yyyy-MM-dd");
    console.log(formatted, "normalized and formatted selected date");

    // Set the selected date in state
    setSelectedDate(formatted);

    // Reset edit state
    setEditIndex(null);
    setEditText("");

    // Fetch notes for the selected date from the notes object
    const notesForSelectedDate = notes[formatted] || [];

    // Check if notes are found for this date
    if (notesForSelectedDate.length === 0) {
      console.log("No notes found for this date.");
      // Optionally show a message to the user
      setFilteredNotes([]);
    } else {
      console.log(notesForSelectedDate, "filtered notes");
      // Set the filtered notes to display
      setFilteredNotes(notesForSelectedDate);
    }
  };

  const handleAddNote = () => {
    if (newNoteText.trim() === "") {
      Swal.fire({
        icon: "warning",
        title: "Reminder text cannot be empty.",
        showConfirmButton: true,
      });
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    try {
      const selected = new Date(selectedDate);
      selected.setHours(0, 0, 0, 0);

      if (selected < today) {
        Swal.fire({
          icon: "error",
          title: "Invalid Date",
          text: "You cannot add reminders for past dates.",
          showConfirmButton: true,
        });
        return;
      }

      const dateKey = formattedDate(selectedDate);
      const newNote = { text: newNoteText, date: dateKey };

      setNotes((prevNotes) => {
        const updatedNotes = { ...prevNotes };
        if (updatedNotes[dateKey]) {
          updatedNotes[dateKey].push(newNote);
        } else {
          updatedNotes[dateKey] = [newNote];
        }
        return updatedNotes;
      });

      const noteData = {
        note: newNoteText,
        date: dateKey,
        admin: admin_id,
      };

      axios
        .post(`${APIURL}/api/note`, noteData)
        .then((response) => {
          Swal.fire({
            icon: "success",
            title: "Reminder Added",
            text: response.data.message,
            timer: 1500,
            showConfirmButton: false,
          });

          // Fetch the updated notes for the selected date
          axios
            .get(`${APIURL}/api/note`, {
              params: {
                admin: admin_id,
              },
            })
            .then((response) => {
              if (response.data && response.data.data) {
                const updatedNotesForSelectedDate =
                  response.data.data[dateKey] || [];
                setFilteredNotes(updatedNotesForSelectedDate);
              }
            })
            .catch((error) => {
              console.error("Error fetching updated notes:", error);
            });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to save the reminder. Please try again.",
            showConfirmButton: true,
          });
          console.error("Error saving note:", error);
        });

      setNewNoteText("");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Invalid date format selected. Please try again.",
        showConfirmButton: true,
      });
      console.error("Date handling error:", error);
    }
  };

  const handleEditNote = (index, currentText, noteId) => {
    setEditIndex(index);
    setEditText(currentText);
    setEditNoteId(noteId); // Keep track of the noteId being edited
  };

  const getNotes = () => {
    axios
      .get(`${APIURL}/api/note`, {
        params: {
          admin: admin_id,
        },
      })
      .then((response) => {
        if (response.data && response.data.data) {
          setNotes(response.data.data); // Update the state with the latest notes
          const notesForSelectedDate =
            response.data.data[formattedDate(selectedDate)] || [];
          setFilteredNotes(notesForSelectedDate); // Update the filtered notes
        } else {
          console.error("No notes found for this admin.");
          setNotes({});
          setFilteredNotes([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  };

  const handleSaveEdit = () => {
    const dateKey = formattedDate(selectedDate);

    // Update the note in the state instantly
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes[dateKey].map((note, index) =>
        index === editIndex ? { ...note, text: editText } : note
      );
      return {
        ...prevNotes,
        [dateKey]: updatedNotes,
      };
    });

    const noteData = {
      note: editText,
      date: dateKey,
      noteId: editNoteId,
      admin: admin_id,
    };

    // Send the updated note to the server
    axios
      .put(`${APIURL}/api/note`, noteData)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Reminder Updated",
          text: response.data.message,
          timer: 1500,
          showConfirmButton: false,
        });

        // Fetch the updated notes from the server
        getNotes();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update the reminder. Please try again.",
          showConfirmButton: true,
        });
        console.error("Error updating note:", error);
      });

    // Reset the editing state
    setEditIndex(null);
    setEditText("");
  };

  const handleDeleteNote = (indexToDelete, noteId) => {
    // Show confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const dateKey = formattedDate(selectedDate);
  
        // Update the state to reflect the deletion instantly
        const updatedNotes = notes[dateKey].filter(
          (_, index) => index !== indexToDelete
        );
  
        setNotes({
          ...notes,
          [dateKey]: updatedNotes.length > 0 ? updatedNotes : undefined,
        });
  
        // Make API call to delete the note
        axios
          .delete(`${APIURL}/api/note/${noteId}`)
          .then((response) => {
            Swal.fire({
              icon: "success",
              title: "Reminder Deleted",
              text: response.data.message,
              timer: 1500,
              showConfirmButton: false,
            });
  
            // Fetch the updated notes from the server
            getNotes();
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Failed to delete the reminder. Please try again.",
              showConfirmButton: true,
            });
            console.error("Error deleting note:", error);
          });
      }
    });
  };


  // Function to cancel editing
  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditText("");
  };

  // Delete note

  const selectedNotes = filteredNotes || []; // Use filteredNotes directly

  const [showThisDate, setShowThisDate] = useState(true);
  const [showPreviousDate, setShowPreviousDate] = useState(true);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [notifications, setNotifications] = useState([]);

  console.log(notifications, "notificationssssss");

  const state = useSelector((state) => state);

  const handleAssignmentClick = (notification) => {
    setSelectedAssignment(notification);
    setShowModal(true);
  };

  // useEffect(() => {
  //   let socket;

  //   if (admin_id) {
  //     const connectWebSocket = () => {
  //       const socketUrl = `ws://192.168.1.40:8000/ws/reports/${admin_id}/`;
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


  

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get(
          `${APIURL}/api/teachserstudentcount/${admin_id}`
        );
        setStudentCount(response.data.data.total_students || 0);
        setTeacherCount(response.data.data.total_teachers || 0);
        console.log(response.data.data, "dataaaaaaa");
      } catch (error) {
        console.error("Error fetching student and teacher count:", error);
      }
    };

    if (admin_id) {
      fetchCounts();
    }
  }, [admin_id, APIURL]);

  return (
    <div className="admin_dashboard">
      <Container className="admin_dasboard_container">
        <Row className="admin_dashboard_row">
          <Col md={8} xs={12} className="dashboard_content_row">
            <h1 className="dash_grt_headr">Welcome!</h1>

            <Col xs={12} className="admin_dash_cl_1">
              <Col md={5} className="dash_snd_Col">
                <Col
                  xs={12}
                  style={{ display: "flex" }}
                  className="dsh_snd_col"
                >
                  <div className="dash_student_card">
                    <img
                      className="student_icon_dash"
                      src={studenticon}
                      alt="icons"
                    />
                    <p>Total Students</p>
                    <p>{studentCount}</p>
                  </div>
                  <div className="dash_teacher_card">
                    <img
                      className="teacher_icon_dash"
                      src={teachericon}
                      alt="icons"
                    />

                    <p>Total Teachers</p>
                    <p>{teacherCount}</p>
                  </div>
                </Col>
                <Col className="dsh_clnd">
                  <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                    className="custom_calendar"
                  />
                </Col>
              </Col>

              <Col md={7} className="rw_cl_nt">
                <Col className="notes-container">
                  <h5 className="notes_header">Reminders</h5>
                  <div className="fixed_footer">
                    <FormControl
                      as="textarea"
                      placeholder="Add new reminder"
                      value={newNoteText}
                      onChange={(e) => setNewNoteText(e.target.value)}
                      className="txt_form"
                    />
                    <button
                      className="dash_noteadd_btn"
                      onClick={handleAddNote}
                    >
                      +
                    </button>
                  </div>
                  {/* <div className="dash_note_min_div">
                    <div className="notes_section">
                      {selectedNotes.map((note, index) => (
                        <div key={index} className="note_item">
                          <p>{note.text}</p>
                          <span className="note_date">{note.date}</span>
                          <button
                            className="delete_note"
                            onClick={() => handleDeleteNote(index)}
                          >
                            🗑️
                          </button>
                        </div>
                      ))}
                    </div>
                  </div> */}

                  <div className="notes_section">
                    {filteredNotes.length > 0 ? (
                      filteredNotes.map((note, index) => (
                        <div key={index} className="note_item">
                          {editIndex === index ? (
                            <>
                              <FormControl
                                as="textarea"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="edit_note_input"
                              />
                              <div className="edit_buttons">
                                <button
                                  className="save_note"
                                  onClick={handleSaveEdit}
                                >
                                  Save
                                </button>
                                <button
                                  className="cancel_edit"
                                  onClick={handleCancelEdit}
                                >
                                  Cancel
                                </button>
                              </div>
                            </>
                          ) : (
                            <>
                              <p>{note.note}</p>
                              <span className="note_date">{note.date}</span>
                              <div className="note_actions">
                                <button
                                  className="edit_note"
                                  onClick={() =>
                                    handleEditNote(index, note.note, note.id)
                                  }
                                >
                                  ✏️
                                </button>
                                <button
                                  className="delete_note"
                                  onClick={() =>
                                    handleDeleteNote(index, note.id)
                                  } // Pass note.id to delete
                                >
                                  🗑️
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      ))
                    ) : (
                      <p>No notes found for this date.</p>
                    )}
                  </div>
                </Col>
              </Col>
            </Col>
          </Col>

          <Col md={4} xs={0} className="notification_section">
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
              <div className="notification_footer">
                <button className="see_all_button">
                  See all Notifications
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminDashboard;
