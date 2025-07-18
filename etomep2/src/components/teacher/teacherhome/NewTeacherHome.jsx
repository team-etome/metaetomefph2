import React, { useState, useEffect } from 'react';
import './newteacherhome.css';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import NewTeacherAssignTask from './NewTeacherAssignTask';
import NewTeacherRankList from './NewTeacherRankList';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Select from 'react-select';
import { PieChart } from '@mui/x-charts/PieChart';
import medal1 from "../../../assets/Award1.png";
import medal2 from "../../../assets/Award2.png";
import medal3 from "../../../assets/Award3.png";
import student from "../../../assets/student.jpg";




export default function NewTeacherHome() {
  const [showAssignTaskPopup, setShowAssignTaskPopup] = useState(false);
  const [showRankListPopup, setShowRankListPopup] = useState(false);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [dashboardData, setDashboardData] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState('');

  const teacherInfo = useSelector((state) => state.teacherinfo.teacherinfo);
  const APIURL = useSelector((state) => state.APIURL.url);
  const navigate = useNavigate();

  console.log(teacherInfo, "dataaaa");

  const handlenavigate = () => {
    navigate("/teacherprofile");
  };

  // Fetch assigned tasks
  const fetchAssignedTasks = async () => {
    try {
      const response = await axios.get(`${APIURL}/api/assignedtaskteacher/${teacherInfo?.teacher_id}`);
      console.log('Assigned tasks:', response.data);
      // Extract tasks from the nested structure
      const tasks = response.data?.data || [];
      const flattenedTasks = [];

      // Handle the nested structure where tasks are in 'questions' array
      if (tasks.length > 0 && tasks[0].questions) {
        tasks[0].questions.forEach(task => {
          flattenedTasks.push({
            task_type: 'Question Paper',
            due_date: task.due_date,
            class_name: task.class,
            subject_name: task.subject,
            status: task.status,
            teacher_name: task.teacher_name
          });
        });
      }

      setAssignedTasks(flattenedTasks);
    } catch (error) {
      console.error('Error fetching assigned tasks:', error);
      setAssignedTasks([]);
    }
  };

  // Fetch teacher dashboard data
  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(`${APIURL}/api/teacherdashboard/${teacherInfo?.teacher_id}`, {
      });
      console.log('Dashboard data:', response.data);
      // Extract data from the response - it's an array
      const dashboardInfo = response.data || [];
      setDashboardData(dashboardInfo);

      // Set default selected values if data exists
      if (dashboardInfo.length > 0) {
        setSelectedClass(dashboardInfo[0].class_name || '');
        setSelectedDivision(dashboardInfo[0].division || '');
        setSelectedSubject(dashboardInfo[0].subject || '');
        // Auto-select the first examination as default
        setSelectedQuestion(dashboardInfo[0].question || '');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setDashboardData([]);
    }
  };

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${APIURL}/api/notification`, {
        params: {
          teacher_id: teacherInfo?.teacher_id
        }
      });
      console.log('Notifications:', response.data);
      // Extract notifications from the nested structure
      const notifications = response.data?.data || [];
      setNotifications(notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setNotifications([]);
    }
  };

  useEffect(() => {
    if (teacherInfo?.teacher_id) {
      setLoading(true);
      Promise.all([
        fetchAssignedTasks(),
        fetchDashboardData(),
        fetchNotifications()
      ]).finally(() => setLoading(false));
    }
  }, [teacherInfo?.teacher_id, APIURL]);

  // Get unique values for dropdowns
  const uniqueClasses = [...new Set(dashboardData.map(item => item.class_name))];
  const uniqueDivisions = [...new Set(dashboardData.map(item => item.division))];
  const uniqueSubjects = [...new Set(dashboardData.map(item => item.subject))];
  const uniqueQuestions = [...new Set(dashboardData.map(item => item.question))];

  // Filter dashboard data based on selected filters
  const filteredDashboardData = dashboardData.filter(item =>
    (!selectedClass || item.class_name === selectedClass) &&
    (!selectedDivision || item.division === selectedDivision) &&
    (!selectedSubject || item.subject === selectedSubject) &&
    (!selectedQuestion || item.question === selectedQuestion)
  );

  // Get current filtered data for display
  const currentData = filteredDashboardData.length > 0 ? filteredDashboardData[0] : null;

  // Calculate aggregated data when no specific examination is selected
  const aggregatedData = selectedQuestion ? null : dashboardData.filter(item =>
    (!selectedClass || item.class_name === selectedClass) &&
    (!selectedDivision || item.division === selectedDivision) &&
    (!selectedSubject || item.subject === selectedSubject)
  );

  // Extract data for pie chart - use aggregated data if no specific examination selected
  let passedCount = 0;
  let failedCount = 0;
  let rankList = [];

  if (selectedQuestion && currentData) {
    // Use specific examination data
    passedCount = currentData.pass_students || 0;
    failedCount = currentData.failed_student || 0;
    rankList = currentData.students || [];
  } else if (aggregatedData && aggregatedData.length > 0) {
    // Use aggregated data across all examinations
    passedCount = aggregatedData.reduce((sum, item) => sum + (item.pass_students || 0), 0);
    failedCount = aggregatedData.reduce((sum, item) => sum + (item.failed_student || 0), 0);

    // Combine all students from all examinations and sort by marks
    const allStudents = aggregatedData.reduce((students, item) => {
      if (item.students && Array.isArray(item.students)) {
        return students.concat(item.students);
      }
      return students;
    }, []);

    // Remove duplicates and sort by marks (highest first)
    const uniqueStudents = allStudents.filter((student, index, self) =>
      index === self.findIndex(s => s.name === student.name)
    );
    rankList = uniqueStudents.sort((a, b) => (b.mark || 0) - (a.mark || 0));
  } else {
    // No data available
    passedCount = 0;
    failedCount = 0;
    rankList = [];
  }

  const totalCount = passedCount + failedCount;
  const dashboardsmallcustomStyles = {
    control: (base, state) => ({
      ...base,
      width: '240px',
      height: '30px',
      borderRadius: '8px',
      borderColor: state.isFocused ? '#86b7fe' : '#757575',
      boxShadow: state.isFocused ? '0 0 0 .25rem rgb(194, 218, 255)' : 0,
    }),

    dropdownIndicator: (base) => ({
      ...base,
      color: '#292D32',
      padding: '0 8px',
      alignItems: 'center',
      svg: {
        width: '24px',
        height: '24px',
      }
    }),

    indicatorSeparator: () => ({
      display: 'none'
    }),

    clearIndicator: () => ({
      display: 'none'
    }),

    placeholder: (base) => ({
      ...base,
      color: '#526D82',
      fontSize: '16px'
    }),

    singleValue: (base) => ({
      ...base,
      color: '#526D82',
      fontSize: '16px'
    }),

    menu: (base) => ({
      ...base,
      zIndex: 1000,
      maxHeight: '200px',
      overflowY: 'auto',
      fontSize: '14px',
    }),

    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? '#2162B2' : '#fff',
      color: state.isFocused ? '#fff' : '#222222',
      '&:active': {
        backgroundColor: '#e6e6e6',
      }
    }),
  };

  const dashboardcustomStyles = {
    control: (base, state) => ({
      ...base,
      width: '120px',
      height: '30px',
      borderRadius: '8px',
      borderColor: state.isFocused ? '#86b7fe' : '#757575',
      boxShadow: state.isFocused ? '0 0 0 .25rem rgb(194, 218, 255)' : 0,
    }),

    dropdownIndicator: (base) => ({
      ...base,
      color: '#292D32',
      padding: '0 8px',
      alignItems: 'center',
      svg: {
        width: '24px',
        height: '24px',
      }
    }),

    indicatorSeparator: () => ({
      display: 'none'
    }),

    clearIndicator: () => ({
      display: 'none'
    }),

    placeholder: (base) => ({
      ...base,
      color: '#526D82',
      fontSize: '16px'
    }),

    singleValue: (base) => ({
      ...base,
      color: '#526D82',
      fontSize: '16px'
    }),

    menu: (base) => ({
      ...base,
      zIndex: 1000,
      maxHeight: '200px',
      overflowY: 'auto',
      fontSize: '14px',
    }),

    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? '#2162B2' : '#fff',
      color: state.isFocused ? '#fff' : '#222222',
      '&:active': {
        backgroundColor: '#e6e6e6',
      }
    }),
  };

  return (
    <div className="newteacherhome-root">
      <div className="newteacherhome-header-row">
        <p className="newteacherhome-welcome">Welcome!</p>
        <div className="newteacherhome-userinfo">
          <span className="newteacherhome-email">{teacherInfo?.email || " "}</span>
          <span className="newteacherhome-avatar">
            <img
              onClick={handlenavigate}
              src={teacherInfo?.image || " "}
              alt="Profile"
            />
          </span>
        </div>
      </div>
      <div className="newteacherhome-main">
        <div className="newteacherhome-left">
          <div className="newteacherhome-exam-section">
            <div className="newteacherhome-exam-row" style={{ display: 'flex', gap: 24 }}>
              <div className="newteacherhome-exam-left">
                <div className="newteacherhome-exam-header">
                  <Select
                    value={selectedQuestion ? { label: selectedQuestion, value: selectedQuestion } : null}
                    onChange={(option) => setSelectedQuestion(option ? option.value : '')}
                    options={uniqueQuestions.map(question => ({ label: question, value: question }))}
                    styles={dashboardsmallcustomStyles}
                    placeholder="select Examination"
                  />
                </div>
                <div className="newteacherhome-exam-filters">
                  <div className="newteacherhome-filter-dropdown">
                    <Select
                      value={selectedClass ? { label: selectedClass, value: selectedClass } : null}
                      onChange={(option) => setSelectedClass(option ? option.value : '')}
                      options={uniqueClasses.map(className => ({ label: className, value: className }))}
                      styles={dashboardcustomStyles}
                      placeholder="Class"
                    />
                  </div>

                  <div className="newteacherhome-filter-dropdown">
                    <Select
                      value={selectedDivision ? { label: selectedDivision, value: selectedDivision } : null}
                      onChange={(option) => setSelectedDivision(option ? option.value : '')}
                      options={uniqueDivisions.map(division => ({ label: division, value: division }))}
                      styles={dashboardcustomStyles}
                      placeholder="Division"
                    />
                  </div>

                  <div className="newteacherhome-filter-dropdown">
                    <Select
                      value={selectedSubject ? { label: selectedSubject, value: selectedSubject } : null}
                      onChange={(option) => setSelectedSubject(option ? option.value : '')}
                      options={uniqueSubjects.map(subject => ({ label: subject, value: subject }))}
                      styles={dashboardcustomStyles}
                      placeholder="Subject"
                    />
                  </div>
                </div>
                <div className="newteacherhome-exam-content">
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "50px",
                  }}>
                    <PieChart
                      series={[
                        {
                          data: [
                            {
                              id: 0,
                              value: passedCount,
                              color: '#5297FF',
                            },
                            {
                              id: 1,
                              value: failedCount,
                              color: '#FF6A6A',
                            },
                          ],
                        },
                      ]}
                      height={180}
                      width={295}
                    />
                  </div>
                  <div className="newteacherhome-pie-legend">
                    <span><span className="newteacherhome-dot blue" /> Students Passed ({passedCount})</span>
                    <span><span className="newteacherhome-dot red" /> Students Failed ({failedCount})</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flex: 1 }}>
                <span className="newteacherhome-exam-viewall" onClick={() => setShowRankListPopup(true)}>View All</span>
                <div className="newteacherhome-ranklist-box">
                  <div className="newteacherhome-ranklist-title">Rank List</div>
                  <ul className="newteacherhome-ranklist-ul">
                    {rankList.length > 0 ? (
                      rankList.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="newteacherhome-rankitem">
                        <div className="newteacherhome-rank-avatar">
                          <img
                            src={item.image || student}
                            alt={item.name}
                            onError={(e) => {
                              e.target.src = student;
                            }}
                          />
                        </div>
                        <span className="newteacherhome-rank-name">{item.name}</span>
                        <img
                          src={idx === 0 ? medal1 : idx === 1 ? medal2 : medal3}
                          alt={`Rank ${idx + 1}`}
                          className={`newteacherhome-medal rank${idx + 1}`}
                        />
                      </li>
                      ))
                    ) : (
                      <li className="newteacherhome-rankitem">
                        <span className="newteacherhome-rank-name" style={{ color: '#666', fontStyle: 'italic' }}>
                          {selectedQuestion ? 'No data for selected examination' : 'Select an examination to view data'}
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="newteacherhome-tasks-section">
            <div className="newteacherhome-tasks-section-main">
              <div className="newteacherhome-tasks-header">
                <span className="newteacherhome-tasks-header-heading">Assigned Tasks</span>
                <span className="newteacherhome-tasks-viewall" onClick={() => setShowAssignTaskPopup(true)}>View All</span>
              </div>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <p>Loading tasks...</p>
                </div>
              ) : (
              <table className="newteacherhome-tasks-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Due date</th>
                    <th>Class</th>
                    <th>Subject</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                    {assignedTasks.length > 0 ? (
                      assignedTasks.map((task, idx) => (
                    <tr key={idx}>
                          <td>{task.task_type || task.type}</td>
                          <td>{task.due_date || task.due}</td>
                          <td>{task.class_name || task.class}</td>
                          <td>{task.subject_name || task.subject}</td>
                          <td>
                            <span className={`newteacherhome-status ${(task.status || 'Pending').toLowerCase() === 'completed' ? 'completed' : 'pending'}`}>
                              {task.status || 'Pending'}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" style={{ textAlign: 'center', color: '#666' }}>
                          No assigned tasks found
                      </td>
                    </tr>
                    )}
                </tbody>
              </table>
              )}
            </div>
          </div>
        </div>
        <div className="newteacherhome-right">
          <div className="newteacherhome-notification-section">
            <div className="newteacherhome-notification-title">Notification</div>
            <div className="newteacherhome-notification-list">
              {loading ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <p>Loading notifications...</p>
                </div>
              ) : notifications.length > 0 ? (
                notifications.map((notif, idx) => (
                <div className="newteacherhome-notification-item" key={idx}>
                  {/* <span className="newteacherhome-notif-avatar" /> */}
                  <div className="newteacherhome-notif-content">
                      <span className="newteacherhome-notif-action">
                        {notif.teacher_name || notif.student_name || notif.name}
                        <span className="newteacherhome-notif-action"> {notif.message || notif.action}</span>
                      </span>
                      <span className="newteacherhome-notif-time">
                        {notif.created_at ? new Date(notif.created_at).toLocaleString() : notif.time}
                      </span>
                    </div>
                    <span className="newteacherhome-notif-dot" />
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                  <p>No notifications found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showAssignTaskPopup && (
        <NewTeacherAssignTask
          onClose={() => setShowAssignTaskPopup(false)}
          assignedTasks={assignedTasks}
        />
      )}
      {showRankListPopup && (
        <NewTeacherRankList
          onClose={() => setShowRankListPopup(false)}
          rankList={rankList}
        />
      )}
    </div>
  );
}
