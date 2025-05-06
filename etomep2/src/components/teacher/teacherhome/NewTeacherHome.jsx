import React, { useState } from 'react';
import './newteacherhome.css';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import NewTeacherAssignTask from './NewTeacherAssignTask';
import NewTeacherRankList from './NewTeacherRankList';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const dummyRankList = [
  { name: 'Neha Katherine Jose', avatar: '', rank: 1 },
  { name: 'Liam', avatar: '', rank: 2 },
  { name: 'Liam', avatar: '', rank: 3 }
];

const dummyNotifications = Array(20).fill({
  name: 'Henry',
  action: 'completed the evaluation',
  time: 'Friday 3:12 pm',
  avatar: '',
});

const dummyTasks = [
  { type: 'Question Paper', due: '21-07-25', class: 'Class 10A', subject: 'Malayalam', status: 'Pending' },
  { type: 'Evaluation', due: '31-09-25', class: 'Class 10B', subject: 'English', status: 'Pending' },
  { type: 'Evaluation', due: '12-07-25', class: 'Class 10C', subject: 'English', status: 'Completed' },
];

const PieChart = () => (
  <svg width="140" height="140" viewBox="0 0 32 32" className="newteacherhome-piechart">
    <circle r="16" cx="16" cy="16" fill="#f87171" />
    <path d="M16 16 L16 0 A16 16 0 1 1 4.6 27.4 Z" fill="#60a5fa" />
  </svg>
);


export default function NewTeacherHome() {
  const [showAssignTaskPopup, setShowAssignTaskPopup] = useState(false);
  const [showRankListPopup, setShowRankListPopup] = useState(false);
  const teacherInfo = useSelector((state) => state.teacherinfo.teacherinfo);
  console.log(teacherInfo,"dataaaa")
  const navigate = useNavigate();
  const handlenavigate = () => {
    navigate("/teacherprofile",);
  };

  return (
    <div className="newteacherhome-root">
      <div className="newteacherhome-header-row">
        <p className="newteacherhome-welcome">Welcome!</p>
        <div className="newteacherhome-userinfo">
          <span className="newteacherhome-email">h@gmail.com</span>
          <span className="newteacherhome-avatar">
          <img
              onClick={handlenavigate}
              src={teacherInfo?.image || " "}
              alt="Profile"
              style={{
                borderRadius: "50%",
                marginRight: "30px",
                cursor: "pointer",
              }}
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
                  <span className="newteacherhome-exam-title">Annual Examination <MdOutlineKeyboardArrowDown size={20} style={{ verticalAlign: 'middle' }} /></span>
                </div>
                <div className="newteacherhome-exam-filters" >
                  <button className="newteacherhome-filter-btn-class">Class <MdOutlineKeyboardArrowDown size={18} style={{ verticalAlign: 'middle' }} /></button>
                  <button className="newteacherhome-filter-btn-division">Division <MdOutlineKeyboardArrowDown size={18} style={{ verticalAlign: 'middle' }} /></button>
                  <button className="newteacherhome-filter-btn-subject">Subject <MdOutlineKeyboardArrowDown size={18} style={{ verticalAlign: 'middle' }} /></button>
                </div>
                <div className="newteacherhome-exam-content">
                  <div className="newteacherhome-pie-container">
                    <PieChart />
                  </div>
                  <div className="newteacherhome-pie-legend">
                      <span ><span className="newteacherhome-dot blue" /> Students Passed (20)</span>
                      <span><span className="newteacherhome-dot red" /> Students Failed (12)</span>
                    </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flex: 1 }}>
                <span className="newteacherhome-exam-viewall" onClick={() => setShowRankListPopup(true)}>View All</span>
                <div className="newteacherhome-ranklist-box">
                  <div className="newteacherhome-ranklist-title">Rank List</div>
                  <ul className="newteacherhome-ranklist-ul">
                    {dummyRankList.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="newteacherhome-rankitem">
                        <span className="newteacherhome-rank-avatar" />
                        <span className="newteacherhome-rank-name">{item.name}</span>
                        <span className={`newteacherhome-rank-badge rank${item.rank}`}>{item.rank}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="newteacherhome-tasks-section">
            <div className="newteacherhome-tasks-section-main" >
              <div className="newteacherhome-tasks-header" >
                <span className="newteacherhome-tasks-header-heading">Assigned Tasks</span>
                <span className="newteacherhome-tasks-viewall" onClick={() => setShowAssignTaskPopup(true)}>View All</span>
              </div>
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
                  {dummyTasks.map((task, idx) => (
                    <tr key={idx}>
                      <td>{task.type}</td>
                      <td>{task.due}</td>
                      <td>{task.class}</td>
                      <td>{task.subject}</td>
                      <td>
                        <span className={`newteacherhome-status ${task.status === 'Completed' ? 'completed' : 'pending'}`}>{task.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="newteacherhome-right">
          <div className="newteacherhome-notification-section">
            <div className="newteacherhome-notification-title">Notification</div>
            <div className="newteacherhome-notification-list">
              {dummyNotifications.map((notif, idx) => (
                <div className="newteacherhome-notification-item" key={idx}>
                  <span className="newteacherhome-notif-avatar" />
                  <div className="newteacherhome-notif-content">
                    <span className="newteacherhome-notif-name">{notif.name} <span className="newteacherhome-notif-action">{notif.action}</span></span>
                    <span className="newteacherhome-notif-time">{notif.time}</span>
                  </div>
                  <span className="newteacherhome-notif-dot" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showAssignTaskPopup && (
        <NewTeacherAssignTask onClose={() => setShowAssignTaskPopup(false)} />
      )}
      {showRankListPopup && (
        <NewTeacherRankList onClose={() => setShowRankListPopup(false)} />
      )}
    </div>
  );
}
