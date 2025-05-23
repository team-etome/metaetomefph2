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
import { format } from "date-fns";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { CiGlass, CiLight, CiSearch } from "react-icons/ci";
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
// import { BarChart } from 'recharts';
import { BarChart } from '@mui/x-charts';
import { useNavigate } from "react-router-dom";
import axios from "axios";




function AdminDashboard() {

  const APIURL = useSelector((state) => state.APIURL.url);
  const admininfo = useSelector((state) => state.admininfo);
  const admin_id = admininfo.admininfo?.admin_id;


  // ------------------------------Student Overview--------------------------------------------

  const [selectedView, setSelectedView] = useState('today');

  const [attendanceData, setAttendanceData] = useState([]);








  useEffect(() => {
    const fetchAttendance = async () => {

      try {
        const response = await axios.get(
          `${APIURL}/api/sudentAttendance/${admin_id}`,
          {
            params: {
              view: selectedView,
            },
          }
        );
        setAttendanceData(response.data.data);
        console.log("✅ Attendance Data:", response.data.data);
      } catch (error) {
        console.error("❌ Error fetching attendance:", error);
      }
    };

    fetchAttendance();
  }, [selectedView]);


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
  const [activeTab, setActiveTab] = useState("pending");
  const [active, setActive] = useState("pending");
  const [allActions, setAllActions] = useState([]);

  const handleTeacherActionViewAll = () => {
    setTeacherActionViewAll(true)
  }

  const closeTeacherActionViewAll = () => {
    setTeacherActionViewAll(false)
  }


  console.log(allActions, 'all action')



  const fetchTeacherActions = async () => {
    try {
      const response = await axios.get(`${APIURL}/api/teacheraction/${admin_id}`);
      const data = response.data.data;

      const formatted = data.map(item => ({
        Name: item.teacher_name,
        DueDate: item.due_date,
        Status: item.status
      }));

      setAllActions(formatted);
    } catch (error) {
      console.error("Error fetching teacher actions:", error);
    }
  };

  useEffect(() => {
    fetchTeacherActions();
  }, []);


  // ------------------------------Toggle--------------------------------------------


  const [isOn, setIsOn] = useState(false);

  // const toggleHandler = () => {
  //   setIsOn(!isOn);
  // };

  const toggleHandler = () => {
    setIsOn((prev) => {
      const newValue = !prev;
      setIsPriority(newValue);
      return newValue;
    });
  };



  // ------------------------------Todo--------------------------------------------

  const [selectedTime, setSelectedTime] = useState(null);
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showTodoPopup, setShowTodoPopup] = useState(false);



  const [title, setTitle] = useState('');
  const [isPriority, setIsPriority] = useState(false);
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');



  const [todoList, setTodoList] = useState([]);
  const [priorityTodo, setPriorityTodo] = useState(null)


  console.log(todoList, "todo list")



  console.log(title, isPriority, selectedDate, selectedTime, link, description)



  const handleTodoclose = () => {
    setShowTodoPopup(false)
  }


  const [todoViewAll, setTodoViewAll] = useState(false)


  const handleTodoViewAll = () => {

    fetchTodos();
    setTodoViewAll(true)


  }

  const closeTodoViewAll = () => {
    setTodoViewAll(false)
  }




  const handleSave = async () => {
    const formattedDate = selectedDate
      ? new Date(selectedDate).toISOString().split('T')[0]
      : null;

    const formattedTime = selectedTime
      ? new Date(selectedTime).toTimeString().split(' ')[0].slice(0, 5)
      : null;

    // Collect missing fields
    const missingFields = [];

    if (!title) missingFields.push('Title');
    if (!formattedDate) missingFields.push('Date');
    if (!formattedTime) missingFields.push('Time');
    if (!description.trim()) missingFields.push('Description');

    if (missingFields.length > 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: `Please fill in the following field(s): ${missingFields.join(', ')}`,
        confirmButtonColor: '#f59e0b',
      });
      return;
    }

    const data = {
      admin: admin_id,
      title,
      date: formattedDate,
      time: formattedTime,
      link,
      description,
      priority: isPriority,
    };

    try {
      const response = await axios.post(`${APIURL}/api/todo}`, data);

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Saved!',
          text: 'Todo saved successfully.',
          confirmButtonColor: '#3085d6',
        });
        setShowTodoPopup(false);
      }
    } catch (error) {
      console.error('Save error:', error.response?.data || error.message);
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Failed to save. Please check fields or try again.',
        confirmButtonColor: '#d33',
      });
    }
  };


  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${APIURL}/api/todo/${admin_id}`);
      const todos = response.data.todos;

      // Extract latest priority todo
      const priority = todos.find(todo => todo.priority === true);

      setPriorityTodo(priority || null); // if not found, set null
      setTodoList(todos);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };


  const getTimeLeft = (dateStr, timeStr) => {
    if (!dateStr || !timeStr) return "Invalid date";

    const dueDateTime = new Date(`${dateStr}T${timeStr}:00`);
    const now = new Date();

    const diffMs = dueDateTime - now;

    if (diffMs <= 0) return "Past due";

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const diffMinutes = Math.floor((diffMs / (1000 * 60)) % 60);

    if (diffDays > 0) return `Due in ${diffDays} day(s)`;
    if (diffHours > 0) return `Due in ${diffHours} hour(s)`;
    return `Due in ${diffMinutes} minute(s)`;
  };

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






  console.log(admin_id, "adminnnnn")

  const navigate = useNavigate()

  const handlenavigate = () => {
    navigate('/adminprofile', { state: { admininfo: admininfo.admininfo } });
  };

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

      border: "2px solid white",
      backgroundColor: "#F9F9F9"


    }}>

      <div style={{
        width: ' calc(100% - 150px)',
        height: "70px",
        marginLeft: '135px',
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 24px", // for internal spacing
        boxSizing: "border-box",
        borderRadius: "16px",
        backgroundColor: "#FFFFFF",
        marginTop: "10px",

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
            backgroundColor: "#ccc",
            cursor: "pointer"
          }} onClick={handlenavigate}>
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
          paddingTop: "24px",
          paddingLeft: "24px",
          paddingRight: "24px",

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
                  value={selectedView}
                  onChange={(e) => setSelectedView(e.target.value)}
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
                  <option value="today">This Day</option>
                  <option value="week">This Week</option>



                </select>

                <div
                  style={{
                    position: "absolute",
                    right: "0px",
                    pointerEvents: "none",
                    fontSize: "25px"


                  }}
                >
                  <RiArrowDropDownLine />
                </div>


              </div>



            </div>




            {selectedView === 'today' ? (
              <div style={{
                display: "flex",
                alignItems: "center",
                paddingLeft: "50px"
              }}>
                <PieChart
                  series={[
                    {
                      data: [
                        {
                          id: 0,
                          value: attendanceData?.present ?? 0,
                          color: '#5297FF',
                        },
                        {
                          id: 1,
                          value: attendanceData?.absent ?? 0,
                          color: '#FF6A6A',
                        },
                      ],
                    },
                  ]}
                  height={234}
                  width={345}
                />
              </div>
            ) : (
              <>
                {attendanceData?.attendance_data && attendanceData?.attendance_data.length > 0 && (
                  <BarChart
                    series={[
                      {
                        data: attendanceData?.attendance_data.map(item => item.present_students),
                        color: '#5297FF',
                      },
                      {
                        data: attendanceData?.attendance_data.map(item => item.absent),
                        color: '#FF6A6A',
                      },
                    ]}
                    xAxis={[
                      {
                        scaleType: 'band',
                        data: attendanceData?.attendance_data.map(item => item.date),
                      },
                    ]}
                    height={234}
                    width={345}
                    margin={{ top: 20, bottom: 50, left: 50, right: 20 }}
                    slotProps={{
                      legend: {
                        direction: 'row',
                        position: { vertical: 'bottom', horizontal: 'middle' },
                      },
                    }}
                    sx={{
                      '& .MuiChartsBar-rect': {
                        rx: 12,
                        ry: 12,
                      },
                    }}
                  />
                )}
              </>
            )}




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


                }}>

                    <span>{attendanceData?.total ?? "--"}</span>


                  </span></h1>




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



                    <span style={{ color: "black" }}>
                      {selectedView === 'today'
                        ? `Student Present : ${attendanceData?.present}`
                        : "Student Present"}
                    </span>

                  </li>
                  <li style={{
                    color: "#FF6A6A",
                    listStyleType: "disc",
                    listStylePosition: "inside"
                  }}>


                    <span style={{ color: "black" }}>
                      {selectedView === 'today'
                        ? `Student Absent : ${attendanceData?.absent}`
                        : "Student Absent"}
                    </span>

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

              {priorityTodo && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "399px",
                    height: "54px",
                    borderBottom: "2px solid #D5D5D5",
                    marginLeft: "8px",
                    paddingLeft: "16px",
                  }}
                >
                  <div>
                    <h1 style={{ fontSize: "14px" }}>{priorityTodo.title || 'Untitled Task'}</h1>
                  </div>
                  <div className="cursor-pointer">
                    <IoIosArrowForward size={20} />
                  </div>
                </div>
              )}
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

                    marginLeft: "24px",
                    height: "72px",
                    width: "618px"
                  }}>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Add Title"
                      style={{
                        color: "#8D8A95",
                        fontSize: "24px",
                        fontWeight: "400",
                        margin: 0,
                        height: "72px",
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
                      value={selectedDate ? format(selectedDate, 'MMM dd, yyyy') : ''}
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

                  width: "648px",
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


                    <h1 style={{
                      fontSize: "18px",
                      color: "black",
                      fontWeight: "500"
                    }}>Paste Link :</h1>

                  </div>



                  <div style={{
                    width: "520px",
                    height: "40px",
                    border: "2px solid #F3F3F3",
                    borderRadius: "8px",
                    padding: "5px",

                  }}>

                    <input onChange={(e) => setLink(e.target.value)} style={{
                      width: "480px",
                      height: "30px",
                      border: "none",
                      outline: "none",
                      margin: "0 0 8px 0",

                    }} placeholder="Link" type="text" />

                  </div>

                </div>

                <div
                  style={{

                    width: "652px",
                    height: "272px",
                    marginLeft: "24px",
                    marginTop: "20px",
                    backgroundColor: "#F6F6F6",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                    padding: "24px",
                    boxSizing: "border-box",

                  }}
                >

                  <textarea onChange={(e) => setDescription(e.target.value)}
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
                    onClick={handleSave}
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



                {todoList.map((todo, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "16px",
                      borderBottom: "1px solid #ccc",
                      width: "652px",
                      height: "56px",
                      marginLeft: "24px",
                    }}
                  >
                    <div>
                      <h1
                        style={{
                          fontSize: "14px",
                          fontWeight: "400",
                          color: "black",
                          margin: 0,
                        }}
                      >
                        {todo.title || 'Untitled Task'}
                      </h1>
                    </div>

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
                        {getTimeLeft(todo.date, todo.time)}
                      </h1>
                    </div>

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

                    <div>
                      <IoIosArrowForward size={20} />
                    </div>
                  </div>
                ))}



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
          paddingTop: "24px",
          paddingRight: "24px",



        }}>



          <div className="teacher">

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              height: "45px",

            }}>

              <div>
                <h1 className="text_font">Pending Teacher Tasks</h1>
              </div>

              <div>
                <h1 onClick={handleTeacherActionViewAll} className="view-all">View All</h1>
              </div>

            </div>




            <div className="tabs">


              <div style={{
                height: "37px",
                width: "108px",
              }} onClick={() => setActiveTab("pending")}>
                <h1 className={`action ${activeTab === "pending" ? "active" : ""}`}>QuestionPaper</h1>
              </div>

              <div style={{
                height: "37px",
                width: "110px",
              }} onClick={() => setActiveTab("complete")}>
                <h1 className={`complete ${activeTab === "complete" ? "active" : ""}`}>Evaluation</h1>
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
              <Column field="Class" header="Class"></Column>
              <Column field="Subject" header="Subject"></Column>


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
                paddingBottom: "16px",
                border: "2px solid rgb(249, 0, 0)"
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
                marginTop: "8px",
                
              }} >



                <div className="tabs"
                >

                  <div onClick={() => setActive("pending")}>
                    <h1 className={`action ${active === "pending" ? "active" : ""}`}>QuestionPaper</h1>
                  </div>

                  <div onClick={() => setActive("complete")}>
                    <h1 className={`complete ${active === "complete" ? "active" : ""}`}>Evaluation</h1>
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

                  <Column field="Class" header="Class"></Column>
                  <Column field="Subject" header="Subject"></Column>

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
                  padding: "0 8px",
                  gap: "10px"

                }}
              >
                <div>

                  <CiSearch />

                </div>

                <div>
                  <h1 style={{ fontSize: "12px", color: "#959595", fontWeight: "400" }}> Find Student</h1>
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
                    padding: "0 8px",
                    gap: "10px"

                  }}
                >

                  <div>

                    <CiSearch />

                  </div>

                  <div style={{ fontSize: "12px", }}>

                    <h1 style={{ fontSize: "12px", color: "#959595", fontWeight: "400" }}> Find Student</h1>

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
