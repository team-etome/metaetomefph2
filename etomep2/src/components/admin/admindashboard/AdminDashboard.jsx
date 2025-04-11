import React, { useState, useEffect, useRef } from "react";
import { PieChart } from '@mui/x-charts/PieChart';
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
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { CiGlass, CiSearch } from "react-icons/ci";
import { FiCalendar } from "react-icons/fi";
import award1 from "../../../assets/Award1.png"
import award2 from "../../../assets/Award2.png"
import award3 from "../../../assets/Award3.png"
import gmeet from "../../../assets/gmeet.png"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { RxCross2 } from "react-icons/rx";
import { FiClock } from 'react-icons/fi';
import { MdOutlineTimer } from "react-icons/md";
function AdminDashboard() {


  // ------------------------------Report--------------------------------------------

  const [reportShowPopup, setReportShowPopup] = useState(false);

  const handleViewAllClick = () => {
    setReportShowPopup(true);
  };

  const handleClosePopup = () => {
    setReportShowPopup(false);
  };



  // ------------------------------Notification--------------------------------------------

  const [teacherShowPopup, setTeacherShowPopup] = useState(false);

  const handleTeacherViewAll = () => {

    setTeacherShowPopup(true)


  }

  const closeTeacherView = () => {
    setTeacherShowPopup(false)
  }




  // ------------------------------Teacher Action --------------------------------------------
  const [teacherActionViewAll, setTeacherActionViewAll] = useState(false);

  const handleTeacherActionViewAll = () => {
    setTeacherActionViewAll(true)
  }

  const closeTeacherActionViewAll = () => {
    setTeacherActionViewAll(false)
  }



  // ------------------------------Toggle--------------------------------------------


  const [isOn, setIsOn] = useState(false);
  const toggleHandler = () => {
    setIsOn(!isOn);
  };



  // ------------------------------Todo--------------------------------------------

  const [selectedTime, setSelectedTime] = useState(null);
  const [isTimeOpen, setIsTimeOpen] = useState(false);


  const [selectedDate, setSelectedDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);


  const [showTodoPopup, setShowTodoPopup] = useState(false);

  const handleTodoclose = () => {
    setShowTodoPopup(false)
  }


  const [todoViewAll, setTodoViewAll] = useState(false)


  const handleTodoViewAll = () => {

    setTodoViewAll(true)


  }

  const closeTodoViewAll = () => {
    setTodoViewAll(false)
  }


  // ------------------------------Exam performance--------------------------------------------

  const [examViewAll, setexamViewAll] = useState(false)


  const handleExamViewAll = () => {

    console.log("jhdfgashuf")

    setexamViewAll(true)


  }

  const closeExamViewAll = () => {
    setexamViewAll(false)
  }



  const dummyData = [
    { Name: "Leo", DueDate: "February 14, 2023", Status: "Pending evaluation." },
    { Name: "Leo", DueDate: "February 14, 2023", Status: "Pending evaluation." },
    { Name: "Leo", DueDate: "February 14, 2023", Status: "Pending evaluation." },

  ];


  // const [selectedDate, setSelectedDate] = useState(new Date());
  // const [notes, setNotes] = useState({});

  // const [editNoteId, setEditNoteId] = useState("");

  // const [filteredNotes, setFilteredNotes] = useState([]);

  // console.log(filteredNotes, "filtereddddd notesssss");

  // console.log(notes, "notessss");
  // const [newNoteText, setNewNoteText] = useState("");

  // const [studentCount, setStudentCount] = useState(0);
  // const [teacherCount, setTeacherCount] = useState(0);

  // const [editIndex, setEditIndex] = useState(null);
  // const [editText, setEditText] = useState("");

  // const APIURL = useSelector((state) => state.APIURL.url);

  // const admininfo = useSelector((state) => state.admininfo);
  // const admin_id = admininfo.admininfo?.admin_id;
  // console.log(admin_id,'admin id')

  // useEffect(() => {
  //   const fetchNotes = async () => {
  //     try {
  //       const response = await axios.get(`${APIURL}/api/note`, {
  //         params: {
  //           admin: admin_id,
  //         },
  //       });

  //       if (response.data && response.data.data) {
  //         setNotes(response.data.data);
  //       } else {
  //         console.error("No notes found for this admin.");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching notes:", error);
  //     }
  //   };

  //   if (admin_id) {
  //     fetchNotes();
  //   }
  // }, [admin_id, APIURL]);

  // const formattedDate = (date) => {
  //   const parsedDate = new Date(date);
  //   if (isNaN(parsedDate)) {
  //     throw new Error("Invalid date provided to formattedDate");
  //   }


  //   const localDate = new Date(
  //     parsedDate.getTime() - parsedDate.getTimezoneOffset() * 60000
  //   );


  //   const year = localDate.getFullYear();
  //   const month = String(localDate.getMonth() + 1).padStart(2, "0");
  //   const day = String(localDate.getDate()).padStart(2, "0");
  //   return `${year}-${month}-${day}`;
  // };

  // useEffect(() => {

  //   const currentDate = new Date();


  //   handleDateChange(currentDate);
  // }, []); 

  // const handleDateChange = (date) => {
  //   console.log(date, "dateeeeee");

  //   if (!date) {
  //     console.log("Invalid date selected.");
  //     return;
  //   }


  //   const formatted = format(date, "yyyy-MM-dd");
  //   console.log(formatted, "normalized and formatted selected date");


  //   setSelectedDate(formatted);


  //   setEditIndex(null);
  //   setEditText("");


  //   const notesForSelectedDate = notes[formatted] || [];


  //   if (notesForSelectedDate.length === 0) {
  //     console.log("No notes found for this date.");

  //     setFilteredNotes([]);
  //   } else {
  //     console.log(notesForSelectedDate, "filtered notes");

  //     setFilteredNotes(notesForSelectedDate);
  //   }
  // };

  // const handleAddNote = () => {
  //   if (newNoteText.trim() === "") {
  //     Swal.fire({
  //       icon: "warning",
  //       title: "Reminder text cannot be empty.",
  //       showConfirmButton: true,
  //     });
  //     return;
  //   }

  //   const today = new Date();
  //   today.setHours(0, 0, 0, 0);

  //   try {
  //     const selected = new Date(selectedDate);
  //     selected.setHours(0, 0, 0, 0);

  //     if (selected < today) {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Invalid Date",
  //         text: "You cannot add reminders for past dates.",
  //         showConfirmButton: true,
  //       });
  //       return;
  //     }

  //     const dateKey = formattedDate(selectedDate);
  //     const newNote = { text: newNoteText, date: dateKey };

  //     setNotes((prevNotes) => {
  //       const updatedNotes = { ...prevNotes };
  //       if (updatedNotes[dateKey]) {
  //         updatedNotes[dateKey].push(newNote);
  //       } else {
  //         updatedNotes[dateKey] = [newNote];
  //       }
  //       return updatedNotes;
  //     });

  //     const noteData = {
  //       note: newNoteText,
  //       date: dateKey,
  //       admin: admin_id,
  //     };

  //     axios
  //       .post(`${APIURL}/api/note`, noteData)
  //       .then((response) => {
  //         Swal.fire({
  //           icon: "success",
  //           title: "Reminder Added",
  //           text: response.data.message,
  //           timer: 1500,
  //           showConfirmButton: false,
  //         });


  //         axios
  //           .get(`${APIURL}/api/note`, {
  //             params: {
  //               admin: admin_id,
  //             },
  //           })
  //           .then((response) => {
  //             if (response.data && response.data.data) {
  //               const updatedNotesForSelectedDate =
  //                 response.data.data[dateKey] || [];
  //               setFilteredNotes(updatedNotesForSelectedDate);
  //             }
  //           })
  //           .catch((error) => {
  //             console.error("Error fetching updated notes:", error);
  //           });
  //       })
  //       .catch((error) => {
  //         Swal.fire({
  //           icon: "error",
  //           title: "Error",
  //           text: "Failed to save the reminder. Please try again.",
  //           showConfirmButton: true,
  //         });
  //         console.error("Error saving note:", error);
  //       });

  //     setNewNoteText("");
  //   } catch (error) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: "Invalid date format selected. Please try again.",
  //       showConfirmButton: true,
  //     });
  //     console.error("Date handling error:", error);
  //   }
  // };

  // const handleEditNote = (index, currentText, noteId) => {
  //   setEditIndex(index);
  //   setEditText(currentText);
  //   setEditNoteId(noteId);
  // };

  // const getNotes = () => {
  //   axios
  //     .get(`${APIURL}/api/note`, {
  //       params: {
  //         admin: admin_id,
  //       },
  //     })
  //     .then((response) => {
  //       if (response.data && response.data.data) {
  //         setNotes(response.data.data); 
  //         const notesForSelectedDate =
  //           response.data.data[formattedDate(selectedDate)] || [];
  //         setFilteredNotes(notesForSelectedDate);
  //       } else {
  //         console.error("No notes found for this admin.");
  //         setNotes({});
  //         setFilteredNotes([]);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching notes:", error);
  //     });
  // };

  // const handleSaveEdit = () => {
  //   const dateKey = formattedDate(selectedDate);


  //   setNotes((prevNotes) => {
  //     const updatedNotes = prevNotes[dateKey].map((note, index) =>
  //       index === editIndex ? { ...note, text: editText } : note
  //     );
  //     return {
  //       ...prevNotes,
  //       [dateKey]: updatedNotes,
  //     };
  //   });

  //   const noteData = {
  //     note: editText,
  //     date: dateKey,
  //     noteId: editNoteId,
  //     admin: admin_id,
  //   };


  //   axios
  //     .put(`${APIURL}/api/note`, noteData)
  //     .then((response) => {
  //       Swal.fire({
  //         icon: "success",
  //         title: "Reminder Updated",
  //         text: response.data.message,
  //         timer: 1500,
  //         showConfirmButton: false,
  //       });


  //       getNotes();
  //     })
  //     .catch((error) => {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Error",
  //         text: "Failed to update the reminder. Please try again.",
  //         showConfirmButton: true,
  //       });
  //       console.error("Error updating note:", error);
  //     });


  //   setEditIndex(null);
  //   setEditText("");
  // };

  // const handleDeleteNote = (indexToDelete, noteId) => {

  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "This action cannot be undone.",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonText: "Yes, delete it!",
  //     cancelButtonText: "Cancel",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       const dateKey = formattedDate(selectedDate);

  //       const updatedNotes = notes[dateKey].filter(
  //         (_, index) => index !== indexToDelete
  //       );

  //       setNotes({
  //         ...notes,
  //         [dateKey]: updatedNotes.length > 0 ? updatedNotes : undefined,
  //       });


  //       axios
  //         .delete(`${APIURL}/api/note/${noteId}`)
  //         .then((response) => {
  //           Swal.fire({
  //             icon: "success",
  //             title: "Reminder Deleted",
  //             text: response.data.message,
  //             timer: 1500,
  //             showConfirmButton: false,
  //           });


  //           getNotes();
  //         })
  //         .catch((error) => {
  //           Swal.fire({
  //             icon: "error",
  //             title: "Error",
  //             text: "Failed to delete the reminder. Please try again.",
  //             showConfirmButton: true,
  //           });
  //           console.error("Error deleting note:", error);
  //         });
  //     }
  //   });
  // };



  // const handleCancelEdit = () => {
  //   setEditIndex(null);
  //   setEditText("");
  // };



  // const selectedNotes = filteredNotes || [];

  // const [showThisDate, setShowThisDate] = useState(true);
  // const [showPreviousDate, setShowPreviousDate] = useState(true);
  // const [selectedAssignment, setSelectedAssignment] = useState(null);
  // const [notifications, setNotifications] = useState([]);

  // console.log(notifications, "notificationssssss");

  // const state = useSelector((state) => state);

  // const handleAssignmentClick = (notification) => {
  //   setSelectedAssignment(notification);
  //   setShowModal(true);
  // };

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




  // useEffect(() => {
  //   const fetchCounts = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${APIURL}/api/teachserstudentcount/${admin_id}`
  //       );
  //       setStudentCount(response.data.data.total_students || 0);
  //       setTeacherCount(response.data.data.total_teachers || 0);
  //       console.log(response.data.data, "dataaaaaaa");
  //     } catch (error) {
  //       console.error("Error fetching student and teacher count:", error);
  //     }
  //   };

  //   if (admin_id) {
  //     fetchCounts();
  //   }
  // }, [admin_id, APIURL]);

  return (


    <div style={{

      border:"2px solid white",
      backgroundColor:"#F9F9F9"
      
      
    }}>

      <div style={{
        width:' calc(100% - 150px)',
        height: "70px",
        marginLeft: '135px',
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 24px", // for internal spacing
        boxSizing: "border-box",
        borderRadius: "16px",
        backgroundColor: "#FFFFFF",
        marginTop:"10px",
       
      }}>

        {/* Left - Welcome */}
        <div style={{
          height: "42px",
          display: "flex",
          alignItems: "center" // vertical centering
        }}>
          <h1 style={{
            color: "black",
            fontSize: "28px",
            fontWeight: "600",
            margin: 0 // remove default margin
          }}>
            Welcome!
          </h1>
        </div>


        {/* Right - Email & Profile */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}>
          <h1 style={{
            fontSize: "16px",
            color: "black",
            fontWeight: "400",
            margin: 0
          }}>h@gmail.com</h1>

          <div style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            overflow: "hidden",
            backgroundColor: "#ccc"
          }}>
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000"
              alt="Profile"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }}
            />
          </div>
        </div>

      </div>





      <div style={{
       
      }} className="admin_dashboard">

        {/* <-----------------------student_overview-----------------------------------> */}

        <div style={{
          paddingTop:"24px",
          paddingLeft:"24px",
          paddingRight:"24px",
        
        }} className="dash_main">

          <div className="student_overview">

            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "50px"
            }}>


              <div >
                <h1 className="text_font">Student overview</h1>
              </div>

              <div

                style={{
                  width: "115px",
                  height: "32px",
                  border: "2px solid #D9D9D9",
                  borderRadius: "8px",
                  backgroundColor: "white",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  color: "#000000"
                }}
              >
                <select
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    outline: "none",
                    backgroundColor: "transparent",
                    fontSize: "14px",
                    cursor: "pointer",
                    appearance: "none", // Hides default arrow
                    paddingLeft: "12px", // Moves text to the left

                  }}
                >
                  <option value="" disabled selected>
                    This Day
                  </option>
                  <option value="message1">This Week</option>

                </select>

                <div
                  style={{
                    position: "absolute",
                    right: "13px",
                    pointerEvents: "none",
                    fontSize: "25px"


                  }}
                >
                  <RiArrowDropDownLine />
                </div>


              </div>



            </div>




            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 30, color: '#5297FF' },
                    { id: 1, value: 15, color: '#FF6A6A' },

                  ],

                },
              ]}
              width={400}
              height={200}
            />



            <div style={{

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0px",

              marginTop: "20px"

            }}>


              <div style={{

                width: "fit-content", // Correct way to fit content
               
                height: "56px",
                marginTop: "14px"


              }}>

                <h1 style={{
                  fontSize: "16px",
                  color: "#959595",
                  opacity: "100%",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "400"

                }}>Total Students  <span style={{
                  color: "black",
                  fontWeight: "600",
                  paddingLeft: "2px",
                  fontSize: "24px"


                }}>341</span></h1>


              </div>


              <div style={{
               
                marginTop: "14px",
                height: "56px"
              }}>

                <ul>
                  <li style={{
                    color: "#5297FF",
                    listStyleType: "disc",
                    listStylePosition: "inside",
                  }}>

                    <span style={{ color: "black" }}>Student Present : 300</span>

                  </li>
                  <li style={{
                    color: "#FF6A6A",
                    listStyleType: "disc",
                    listStylePosition: "inside"
                  }}>

                    <span style={{ color: "black" }}>Student Absent : 41</span>

                  </li>
                </ul>

              </div>

            </div>

          </div>


          {/* <-----------------------Report Alert-----------------------------------> */}


          <div style={{

            width: "fit-content",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            

          }}>


            <div className="report_alert">
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%"
              }}>
                <h1 className="text_font">
                  Report <span style={{ color: "#ED4646", marginLeft: "10px" }}>Alert</span>
                </h1>
                <h1
                  className="view-all"
                  onClick={handleViewAllClick}
                  style={{ cursor: "pointer" }}
                >
                  View All
                </h1>
              </div>

              {/* Report box (same as you posted) */}
              <div className="report" style={{ marginTop: "12px" }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  paddingTop: "5px"
                }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: "12px",
                  }}>
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000"
                      alt="Profile"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="cursor-pointer">
                    <h1 style={{
                      fontSize: "14px",
                      fontFamily: "sans-serif",
                      color: "black",
                      margin: '0px',
                    }}>
                      James Victor Reported Malpractice for Harry
                    </h1>
                  </div>
                </div>
              </div>

              {/* Popup at the top */}
              {reportShowPopup && (
                <div
                  style={{
                    position: "absolute", // Use fixed if you want it to stay in place when scrolling
                    top: "0", // Or use negative margin to lift it above
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "white",
                    borderRadius: "16px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    zIndex: 9999, // Make sure it sits above other elements
                    paddingBottom: "16px"
                  }}
                  className="report_alert_view_all"
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px 12px",
                      borderBottom: "2px solid #DFDFDF",
                    }}
                  >
                    <h1 className="text_font" style={{ margin: 0 }}>
                      Report Alerts
                    </h1>

                    <RxCross2
                      onClick={handleClosePopup}
                      style={{
                        width: "24px",
                        height: "24px",
                        cursor: "pointer",
                        color: "black"
                      }}
                    />
                  </div>

                  <div
                    style={{
                      width: "652px",
                      height: "67px",
                      backgroundColor: "#F8F6E8",
                      marginTop: "12px",
                      marginLeft: "24px",
                      borderRadius: "16px",
                      padding: "0 12px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000"
                          alt="Profile"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <div>
                        <h1
                          style={{
                            fontSize: "14px",
                            color: "black",
                            fontWeight: "400",
                            margin: 0,
                          }}
                        >
                          James Victor Reported Malpractise for Harry
                        </h1>
                      </div>
                    </div>

                    <div>
                      <h1
                        style={{
                          fontSize: "14px",
                          color: "#959595",
                          fontWeight: "400",
                          margin: 0,
                        }}
                      >
                        1 hour ago
                      </h1>
                    </div>
                  </div>
                </div>
              )}




            </div>




            {/* <-----------------------Todo list-----------------------------------> */}

            <div style={{

            }} className="todo_list">
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "12px",
                width: "100%",

              }}>

                <div>
                  <h1 className="text_font" style={{ margin: 0 }}>To do List</h1>
                </div>


                <div style={
                  {
                    marginRight: "90px",
                    marginTop: "13px",

                  }
                }>
                  <button onClick={() => setShowTodoPopup(true)} style={{

                    width: "74px",
                    height: "32px",
                    backgroundColor: "#2162B2",
                    color: "white",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",

                  }}>Add</button>
                </div>

                {/* View All - Positioned at the End */}
                <div>
                  <h1 onClick={handleTodoViewAll} className="view-all">View All</h1>
                </div>




              </div>

              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "399px",
                height: "54px",
                borderBottom: "2px solid #D5D5D5",
                marginLeft: "8px",
                paddingLeft: "16px",

              }}>

                <div>
                  <h1 style={{
                    fontSize: "14px",

                  }}>Final Exam Schedule</h1>
                </div>

                {/* Icon */}
                <div className="cursor-pointer">
                  <IoIosArrowForward size={20} />
                </div>

              </div>

            </div>


            {showTodoPopup && (
              <div style={{
                position: "absolute",
                top: "80px", // distance from top of screen (adjust as needed)
                left: "50%",
                transform: "translateX(-50%)",
                width: "700px",
                height: "600px",
                border: "2px solid #D9D9D9",
                borderRadius: "16px",
                backgroundColor: "#fff",
                zIndex: 999,
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                overflow: "auto", // in case content overflows
              }}>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between", // pushes items to start and end
                    alignItems: "center", // vertically center the items
                    width: "100%",
                    borderBottom: "2px solid #DFDFDF",
                    color: "#FFFFFF",

                  }}
                >
                  <div style={{

                    marginLeft: "24px"
                  }}>
                    <input
                      type="text"
                      // value={title}
                      // onChange={(e) => setTitle(e.target.value)}
                      placeholder="Add Title"
                      style={{
                        color: "#8D8A95",
                        fontSize: "24px",
                        fontWeight: "400",
                        margin: 0,
                        border: "none",
                        outline: "none",
                        backgroundColor: "transparent",
                        width: "100%",
                      }}
                    />
                  </div>

                  <div>
                    <RxCross2
                      onClick={handleTodoclose}
                      style={{
                        width: "24px",
                        height: "24px",
                        cursor: "pointer",
                        color: "black",
                        marginRight: "24px"

                      }}
                    />
                  </div>
                </div>

                <div style={{
                  display: "flex",
                  gap: "16px",
                  marginLeft: "24px",

                }}>


                  <div
                    style={{
                      width: '318px',
                      height: '44px',
                      border: '2px solid #757575',
                      marginTop: '24px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0 12px',
                      boxSizing: 'border-box',
                      position: 'relative', // for positioning the custom popup
                    }}
                  >
                    <input
                      type="text"
                      value={selectedDate ? format(selectedDate, 'MMM d, yyyy') : ''}
                      placeholder="Select date"
                      readOnly
                      onClick={() => setIsOpen(!isOpen)}
                      style={{
                        border: 'none',
                        outline: 'none',
                        fontSize: '14px',
                        width: '100%',
                        background: 'transparent',
                        cursor: 'pointer',
                        color: "black"
                      }}
                    />

                    <FiCalendar
                      onClick={() => setIsOpen(!isOpen)}
                      style={{
                        color: '#757575',
                        fontSize: '20px',
                        marginLeft: '8px',
                        cursor: 'pointer',
                      }}
                    />

                    {isOpen && (
                      <div style={{ position: 'absolute', top: '50px', right: '0', zIndex: 1000 }}>
                        <DatePicker
                          selected={selectedDate}
                          onChange={(date) => {
                            setSelectedDate(date);
                            setIsOpen(false);
                          }}
                          inline
                        />
                      </div>
                    )}
                  </div>




                  <div
                    style={{
                      width: '318px',
                      height: '44px',
                      border: '2px solid #757575',
                      marginTop: '24px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0 12px',
                      boxSizing: 'border-box',
                      position: 'relative',
                      color: '#757575',
                    }}
                  >
                    <input
                      type="text"
                      readOnly
                      onClick={() => setIsTimeOpen(!isTimeOpen)}
                      value={selectedTime ? format(selectedTime, 'hh:mm a') : ''}
                      placeholder="Select time"
                      style={{
                        border: 'none',
                        outline: 'none',
                        fontSize: '14px',
                        width: '100%',
                        background: 'transparent',
                        cursor: 'pointer',
                        color: 'black',
                      }}
                    />

                    <FiClock
                      onClick={() => setIsTimeOpen(!isTimeOpen)}
                      style={{ fontSize: '20px', cursor: 'pointer' }}
                    />

                    {isTimeOpen && (
                      <div style={{ position: 'absolute', top: '50px', right: '0', zIndex: 1000 }}>
                        <DatePicker
                          selected={selectedTime}
                          onChange={(time) => {
                            setSelectedTime(time);
                            setIsTimeOpen(false);
                          }}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          timeCaption="Time"
                          dateFormat="hh:mm aa"
                          inline
                        />
                      </div>
                    )}
                  </div>

                </div>

                <div style={{

                  display: "flex",
                  gap: "16px",
                  alignItems: "center",
                  paddingLeft: "24px",

                }}>


                  <div>
                    <h1 style={{
                      fontSize: "16px",
                      fontWeight: "400",
                      color: "black"
                    }}>Make it Priority</h1>
                  </div>


                  <div
                    onClick={toggleHandler}
                    style={{
                      width: '50px',
                      height: '25px',
                      borderRadius: '25px',
                      backgroundColor: isOn ? '#1677FF' : '#ccc',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '3px',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s ease',
                    }}
                  >
                    <div
                      style={{
                        height: '19px',
                        width: '19px',
                        borderRadius: '50%',
                        backgroundColor: '#fff',
                        transform: isOn ? 'translateX(25px)' : 'translateX(0px)',
                        transition: 'transform 0.3s ease',
                      }}
                    />
                  </div>

                </div>



                <div style={{

                  width: "224px",
                  height: "45px",
                  display: "flex",
                  gap: "10px",
                  marginLeft: "24px",
                  // border:"2px solid black"
                }} >



                  <div style={{

                    display: "flex",
                    alignItems: "center",
                    // border:"2px solid red"

                  }} >
                    <img style={{
                      width: "35px",
                      height: "35px"
                    }} src={gmeet} alt="" />
                  </div>



                  <div
                    style={{
                      width: "183px",
                      height: "40px",
                      borderRadius: "25px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#0066DA"
                    }}
                  >
                    <h1
                      style={{
                        color: "white",
                        fontSize: "14px",
                        fontWeight: "400",
                        margin: 0,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        cursor: "pointer"
                      }}
                    >
                      Add google meet link
                    </h1>
                  </div>

                </div>

                <div
                  style={{

                    width: "652px",
                    height: "272px",
                    marginLeft: "24px",
                    marginTop: "29px",
                    backgroundColor: "#F6F6F6",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                    padding: "24px",
                    boxSizing: "border-box",

                  }}
                >

                  <textarea
                    placeholder="Add Description"
                    style={{
                      width: "100%",
                      height: "652px",
                      padding: "12px",
                      borderRadius: "8px",
                      fontSize: "14px",
                      resize: "none",
                      boxSizing: "border-box",
                      outline: "none",
                      border: "none",
                      backgroundColor: "#F6F6F6",
                      color: "#000",

                    }}
                  />
                </div>



                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "8px",
                    marginTop: "13px",
                    marginRight: "15px",


                  }}
                >
                  <div
                    style={{
                      width: "100px",
                      height: "40px",
                      border: "2px solid #2162B2",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: "#2162B2",
                      fontWeight: "600",
                      fontSize: "14px",
                      borderRadius: "7px",
                    }}
                  >
                    Clear
                  </div>

                  <div
                    style={{
                      width: "100px",
                      height: "40px",
                      borderRadius: "7px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: "#FFFFFF",
                      backgroundColor: "#2162B2",
                      fontWeight: "600",
                      fontSize: "14px",
                    }}
                  >
                    Save
                  </div>
                </div>

              </div>


            )}



            {todoViewAll && (
              <div
                style={{
                  position: "absolute", // Use fixed if you want it to stay in place when scrolling
                  top: "0", // Or use negative margin to lift it above
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: "white",
                  borderRadius: "16px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  zIndex: 9999, // Make sure it sits above other elements
                  paddingBottom: "16px"
                }}
                className="report_alert_view_all"
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 12px",
                    borderBottom: "2px solid #DFDFDF",
                  }}
                >
                  <h1 className="text_font" style={{ margin: 0 }}>
                    To do list
                  </h1>

                  <RxCross2
                    onClick={closeTodoViewAll}
                    style={{
                      width: "24px",
                      height: "24px",
                      cursor: "pointer",
                      color: "black"
                    }}
                  />
                </div>



                <div
                  style={{
                    display: "flex",
                    alignItems: "center", // Vertically align all
                    justifyContent: "space-between",
                    gap: "16px", // Space between elements
                    // Optional padding
                    borderBottom: "1px solid #ccc", // Optional visual aid
                    width: "652px",
                    height: "56px",
                    marginLeft: "24px"
                  }}
                >
                  {/* Title */}
                  <div>
                    <h1
                      style={{
                        fontSize: "14px",
                        fontWeight: "400",
                        color: "black",
                        margin: 0,
                      }}
                    >
                      Final exam schedule
                    </h1>
                  </div>

                  {/* Timer */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "4px 8px",
                      gap: "6px",
                    }}
                  >
                    <MdOutlineTimer />
                    <h1
                      style={{
                        fontSize: "14px",
                        fontWeight: "400",
                        color: "#72989C",
                        margin: 0,
                      }}
                    >
                      Due in 1 week
                    </h1>
                  </div>

                  {/* Status */}
                  <div
                    style={{
                      width: "65px",
                      height: "24px",
                      border: "2px solid #CD0404",
                      borderRadius: "8px",
                      backgroundColor: "#FFEEEE",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <h1
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontWeight: "400",
                        margin: 0,
                      }}
                    >
                      Pending
                    </h1>
                  </div>

                  {/* Arrow Icon */}
                  <div>
                    <IoIosArrowForward size={20} />
                  </div>
                </div>


                <div
                  style={{
                    display: "flex",
                    alignItems: "center", // Vertically align all
                    justifyContent: "space-between",
                    gap: "16px", // Space between elements
                    // Optional padding
                    borderBottom: "1px solid #ccc", // Optional visual aid
                    width: "652px",
                    height: "56px",
                    marginLeft: "24px"
                  }}
                >
                  {/* Title */}
                  <div>
                    <h1
                      style={{
                        fontSize: "14px",
                        fontWeight: "400",
                        color: "black",
                        margin: 0,
                      }}
                    >
                      Final exam schedule
                    </h1>
                  </div>

                  {/* Timer */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "4px 8px",
                      gap: "6px",
                    }}
                  >
                    <MdOutlineTimer />
                    <h1
                      style={{
                        fontSize: "14px",
                        fontWeight: "400",
                        color: "#72989C",
                        margin: 0,
                      }}
                    >
                      Due in 1 week
                    </h1>
                  </div>

                  {/* Status */}
                  <div
                    style={{
                      width: "65px",
                      height: "24px",
                      border: "2px solid #CD0404",
                      borderRadius: "8px",
                      backgroundColor: "#FFEEEE",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <h1
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontWeight: "400",
                        margin: 0,
                      }}
                    >
                      Pending
                    </h1>
                  </div>

                  {/* Arrow Icon */}
                  <div>
                    <IoIosArrowForward size={20} />
                  </div>
                </div>


                <div
                  style={{
                    display: "flex",
                    alignItems: "center", // Vertically align all
                    justifyContent: "space-between",
                    gap: "16px", // Space between elements
                    // Optional padding
                    borderBottom: "1px solid #ccc", // Optional visual aid
                    width: "652px",
                    height: "56px",
                    marginLeft: "24px"
                  }}
                >
                  {/* Title */}
                  <div>
                    <h1
                      style={{
                        fontSize: "14px",
                        fontWeight: "400",
                        color: "black",
                        margin: 0,
                      }}
                    >
                      Final exam schedule
                    </h1>
                  </div>

                  {/* Timer */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "4px 8px",
                      gap: "6px",
                    }}
                  >
                    <MdOutlineTimer />
                    <h1
                      style={{
                        fontSize: "14px",
                        fontWeight: "400",
                        color: "#72989C",
                        margin: 0,
                      }}
                    >
                      Due in 1 week
                    </h1>
                  </div>

                  {/* Status */}
                  <div
                    style={{
                      width: "65px",
                      height: "24px",
                      border: "2px solid #CD0404",
                      borderRadius: "8px",
                      backgroundColor: "#FFEEEE",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <h1
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontWeight: "400",
                        margin: 0,
                      }}
                    >
                      Pending
                    </h1>
                  </div>

                  {/* Arrow Icon */}
                  <div>
                    <IoIosArrowForward size={20} />
                  </div>
                </div>

              </div>
            )}


          </div>

          {/* <-----------------------Notification-----------------------------------> */}

          <div className="notification" >

            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",

            }}>
              <div>
                <h1 className="text_font">Notification</h1>
              </div>

              <div>
                <h1 onClick={handleTeacherViewAll} className="view-all">View All</h1>
              </div>
            </div>


            {teacherShowPopup && (
              <div
                style={{
                  position: "absolute", // Use fixed if you want it to stay in place when scrolling
                  top: "0", // Or use negative margin to lift it above
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: "white",
                  borderRadius: "16px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  zIndex: 9999, // Make sure it sits above other elements
                  paddingBottom: "16px"
                }}
                className="report_alert_view_all"
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 12px",
                    borderBottom: "2px solid #DFDFDF",
                  }}
                >
                  <h1 className="text_font" style={{ margin: 0 }}>

                    Notifications

                  </h1>

                  <RxCross2
                    onClick={closeTeacherView}
                    style={{
                      width: "24px",
                      height: "24px",
                      cursor: "pointer",
                      color: "black"
                    }}
                  />
                </div>

                <div
                  style={{
                    width: "652px",
                    height: "67px",
                    backgroundColor: "#F4F4F4",
                    marginTop: "12px",
                    marginLeft: "24px",
                    borderRadius: "16px",
                    padding: "0 12px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000"
                        alt="Profile"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div>
                      <h1
                        style={{
                          fontSize: "14px",
                          color: "black",
                          fontWeight: "400",
                          margin: 0,
                        }}
                      >
                        James Victor Reported Malpractise for Harry
                      </h1>
                    </div>
                  </div>

                  <div>
                    <h1
                      style={{
                        fontSize: "14px",
                        color: "#959595",
                        fontWeight: "400",
                        margin: 0,
                      }}
                    >
                      1 hour ago
                    </h1>
                  </div>
                </div>
              </div>
            )}



            <div style={{

              width: "93%",
              height: "68px",
              backgroundColor: "#F4F4F4",
              borderRadius: "10px",
              marginLeft: "25px",
              marginTop: "12px",
               border:"2px solid black"

            }}>



              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                width: "90%",
                height: "68px",
                paddingLeft: "4px",
                


              }}>


                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",


                }}>

                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMGltYWdlfGVufDB8fDB8fHww"
                    alt="Profile"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "50%",

                    }}
                  />

                </div>


                <div style={{

                  width: "100%",
                  paddingBottom: "20px",
                  cursor: "pointer",
                 
                }}>


                  <h1 className="notification-cotent">Henry completed the evaluation  </h1>
                  <p style={{
                    paddingTop: "4px",
                    fontSize: "11.5px"
                  }}>Friday 3:12 pm</p>


                </div>
              </div>
            </div>
          </div>
        </div>


        {/* <--------------------------Teacher Action-------------------------------> */}

        <div style={{
          display: "flex",
          gap: "24px",
          justifyContent: "space-between",
          paddingLeft: "24px",
          paddingTop:"24px",
          paddingRight: "24px",


    
        }}>



          <div className="teacher">

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              height: "45px",

            }}>

              <div>
                <h1 className="text_font">Teacher Actions</h1>
              </div>

              <div>
                <h1 onClick={handleTeacherActionViewAll} className="view-all">View All</h1>
              </div>

            </div>




            <div style={{
              display: "flex",
              gap: "16px",
              paddingLeft: "30px",
              height: "25px",
              alignItems: "center",
              marginTop: "15px"

            }}>

              <div>
                <h1 className="action">Pending</h1>
              </div>



              <div>
                <h1 className="complete">Complete</h1>
              </div>



            </div>


            <DataTable value={dummyData}

              className="custom-datatable" style={
                {

                  marginTop: "15px",
                  marginLeft: "24px",

                }
              }>
              <Column style={{
                height: "52px",
              }} field="Name" header="Name"></Column>
              <Column field="DueDate" header="DueDate"></Column>
              <Column field="Status" header="Status"></Column>


            </DataTable>

          </div>

          {teacherActionViewAll && (
            <div
              style={{
                position: "absolute", // Use fixed if you want it to stay in place when scrolling
                top: "0", // Or use negative margin to lift it above
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "white",
                borderRadius: "16px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                zIndex: 9999, // Make sure it sits above other elements
                paddingBottom: "16px"
              }}
              className="report_alert_view_all"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 12px",
                  borderBottom: "2px solid #DFDFDF",
                }}
              >
                <h1 className="text_font" style={{ margin: 0 }}>
                  Teacher Actions
                </h1>

                <RxCross2
                  onClick={closeTeacherActionViewAll}
                  style={{
                    width: "24px",
                    height: "24px",
                    cursor: "pointer",
                    color: "black"
                  }}
                />
              </div>


              <div style={{
                width: "653px",
                height: "492px",
                marginTop: "8px"
              }} >



                <div style={{
                  display: "flex",
                  gap: "16px",
                  paddingLeft: "30px",
                  height: "25px",
                  alignItems: "center",
                  marginTop: "15px"

                }}>

                  <div>
                    <h1 className="action">Pending</h1>
                  </div>



                  <div>
                    <h1 className="complete">Complete</h1>
                  </div>



                </div>


                <DataTable
                  value={dummyData}
                  className="custom-datatable"
                  style={{
                    marginTop: '15px',
                    marginLeft: '24px',

                  }}
                >
                  <Column
                    field="Name"
                    header="Name"
                    style={{ height: '52px', color: '#8D8A95 !important' }}
                  />
                  <Column
                    field="DueDate"
                    header="Due Date"
                  />
                  <Column
                    field="Status"
                    header="Status"
                  />
                </DataTable>


              </div>


            </div>
          )}


          {/* <-----------------------Exam Performance-------------------------------> */}

          <div style={{
    
          }} className="exam_performance">



            <div style={{
              display: "flex",
              justifyContent: "space-between",
              height: "45px"
            }}>

              <div>
                <h1 className="text_font">Exam Performance</h1>
              </div>

              <div>
                <h1 onClick={handleExamViewAll} className="view-all">View All</h1>
              </div>

            </div>




            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingLeft: "20px",
                paddingRight: "20px",
                marginTop: "10px",
              }}
            >

              <div style={{ display: "flex", gap: "16px" }}>

                <div
                  style={{
                    width: "115px",
                    height: "32px",
                    border: "2px solid rgb(188, 190, 194)",
                    borderRadius: "8px",
                    backgroundColor: "white",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <select
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "none",
                      outline: "none",
                      backgroundColor: "transparent",
                      fontSize: "14px",
                      cursor: "pointer",
                      appearance: "none",
                      paddingLeft: "12px",
                    }}
                  >
                    <option value="" disabled selected>
                      class 1
                    </option>
                    <option value="message1">class 2</option>
                  </select>

                  <div
                    style={{
                      position: "absolute",
                      right: "13px",
                      pointerEvents: "none",
                      fontSize: "25px",
                    }}
                  >
                    <RiArrowDropDownLine />
                  </div>
                </div>


                <div
                  style={{
                    width: "115px",
                    height: "32px",
                    border: "2px solid rgb(188, 190, 194)",
                    borderRadius: "8px",
                    backgroundColor: "white",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <select
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "none",
                      outline: "none",
                      backgroundColor: "transparent",
                      fontSize: "14px",
                      cursor: "pointer",
                      appearance: "none",
                      paddingLeft: "12px",
                    }}
                  >
                    <option value="A" disabled selected>
                     A
                    </option>
                    <option value="B">B</option>
                  </select>

                  <div
                    style={{
                      position: "absolute",
                      right: "13px",
                      pointerEvents: "none",
                      fontSize: "25px",
                    }}
                  >
                    <RiArrowDropDownLine />
                  </div>
                </div>
              </div>


              <div
                style={{
                  width: "241px",
                  height: "32px",
                  border: "2px solid rgb(188, 190, 194)",
                  borderRadius: "8px",
                  backgroundColor: "white",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 8px",

                }}
              >d
                <CiSearch />
                <div style={{ fontSize: "12px", border:"2px solid"}}>Find Student</div>
              </div>



            </div>


            <div style={{
              display: "flex",
              justifyContent: "space-between", // Pushes left and right content apart
              alignItems: "center",
              width: "100%",
              padding: "15px 24px",
              borderBottom: "2px solid #DFDFDF",
              height: "52px",
              marginTop: "65px",

            }}>

              {/* Profile Section */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    overflow: "hidden"
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMGltYWdlfGVufDB8fDB8fHww"
                    alt="Profile"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div>
                  <h1 style={{ fontSize: "16px", fontWeight: "400", color: "black" }}>Liam</h1>
                </div>
              </div>

              {/* Badge and Arrow Section */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "38px"
              }}>
                <div>
                  <img src={award1} alt="Award" />
                </div>
                <div>
                  <IoIosArrowForward style={{
                    width: "25px",
                    height: "25px",

                  }} />
                </div>
              </div>
            </div>

            <div style={{
              display: "flex",
              justifyContent: "space-between", // Pushes left and right content apart
              alignItems: "center",
              width: "100%",
              padding: "15px 24px",
              borderBottom: "2px solid #DFDFDF",
              height: "52px",
              marginTop: "0px",


            }}>

              {/* Profile Section */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    overflow: "hidden"
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMGltYWdlfGVufDB8fDB8fHww"
                    alt="Profile"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div>
                  <h1 style={{ fontSize: "16px", fontWeight: "400", color: "black" }}>Liam</h1>
                </div>
              </div>

              {/* Badge and Arrow Section */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "38px"
              }}>
                <div>
                  <img src={award2} alt="Award" />
                </div>
                <div>
                  <IoIosArrowForward style={{
                    width: "25px",
                    height: "25px",

                  }} />
                </div>
              </div>
            </div>

            <div style={{
              display: "flex",
              justifyContent: "space-between", // Pushes left and right content apart
              alignItems: "center",
              width: "100%",
              padding: "15px 24px",
              borderBottom: "2px solid #DFDFDF",
              height: "52px",
              marginTop: "0px",


            }}>

              {/* Profile Section */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    overflow: "hidden"
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMGltYWdlfGVufDB8fDB8fHww"
                    alt="Profile"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div>
                  <h1 style={{ fontSize: "16px", fontWeight: "400", color: "black" }}>Liam</h1>
                </div>
              </div>

              {/* Badge and Arrow Section */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "38px"
              }}>
                <div>
                  <img src={award3} alt="Award" />
                </div>
                <div>
                  <IoIosArrowForward style={{
                    width: "25px",
                    height: "25px",

                  }} />
                </div>
              </div>
            </div>

          </div>



          {examViewAll && (
            <div
              style={{
                position: "absolute", // Use fixed if you want it to stay in place when scrolling
                top: "0", // Or use negative margin to lift it above
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "white",
                borderRadius: "16px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                zIndex: 9999, // Make sure it sits above other elements
                paddingBottom: "16px"
              }}
              className="report_alert_view_all"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 12px",
                  borderBottom: "2px solid #DFDFDF",
                }}
              >
                <h1 className="text_font" style={{ margin: 0 }}>
                  Exam Performance
                </h1>

                <RxCross2
                  onClick={closeExamViewAll}
                  style={{
                    width: "24px",
                    height: "24px",
                    cursor: "pointer",
                    color: "black"
                  }}
                />
              </div>


              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  marginTop: "10px",
                }}
              >

                <div style={{ display: "flex", gap: "16px" }}>

                  <div
                    style={{
                      width: "115px",
                      height: "32px",
                      border: "2px solid rgb(188, 190, 194)",
                      borderRadius: "8px",
                      backgroundColor: "white",
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <select
                      style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                        outline: "none",
                        backgroundColor: "transparent",
                        fontSize: "14px",
                        cursor: "pointer",
                        appearance: "none",
                        paddingLeft: "12px",
                      }}
                    >
                      <option value="" disabled selected>
                        Class
                      </option>
                      <option value="message1">This Week</option>
                    </select>

                    <div
                      style={{
                        position: "absolute",
                        right: "13px",
                        pointerEvents: "none",
                        fontSize: "25px",
                      }}
                    >
                      <RiArrowDropDownLine />
                    </div>
                  </div>


                  <div
                    style={{
                      width: "115px",
                      height: "32px",
                      border: "2px solid rgb(188, 190, 194)",
                      borderRadius: "8px",
                      backgroundColor: "white",
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <select
                      style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                        outline: "none",
                        backgroundColor: "transparent",
                        fontSize: "14px",
                        cursor: "pointer",
                        appearance: "none",
                        paddingLeft: "12px",
                      }}
                    >
                      <option value="" disabled selected>
                        Division
                      </option>
                      <option value="A">A</option>
                    </select>

                    <div
                      style={{
                        position: "absolute",
                        right: "13px",
                        pointerEvents: "none",
                        fontSize: "25px",
                      }}
                    >
                      <RiArrowDropDownLine />
                    </div>
                  </div>
                </div>


                <div
                  style={{
                    width: "241px",
                    height: "32px",
                    border: "2px solid rgb(188, 190, 194)",
                    borderRadius: "8px",
                    backgroundColor: "white",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 8px",

                  }}
                >
                  <CiSearch />
                  <div style={{ fontSize: "12px",  }}>Find Student</div>
                </div>
              </div>

              <div style={{
                display: "flex",
                justifyContent: "space-between", // Pushes left and right content apart
                alignItems: "center",
                width: "100%",
                padding: "15px 24px",
                borderBottom: "2px solid #DFDFDF",
                height: "52px",
                marginTop: "65px",

              }}>

                {/* Profile Section */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      overflow: "hidden"
                    }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMGltYWdlfGVufDB8fDB8fHww"
                      alt="Profile"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div>
                    <h1 style={{ fontSize: "16px", fontWeight: "400", color: "black" }}>Liam</h1>
                  </div>
                </div>

                {/* Badge and Arrow Section */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "38px"
                }}>
                  <div>
                    <img src={award1} alt="Award" />
                  </div>
                  <div>
                    <IoIosArrowForward style={{
                      width: "25px",
                      height: "25px",

                    }} />
                  </div>
                </div>
              </div>



            </div>
          )}

        </div>

      </div>

    </div>


  );
}

export default AdminDashboard;
