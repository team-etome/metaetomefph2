import React, { useState } from "react";
import { IoArrowBack, IoClose } from "react-icons/io5";
import { AiOutlineSearch } from "react-icons/ai";
import "./adminclassviewstudentlist.css";
import avtar from "../../../assets/avatar.jpg"

const AdminClassViewStudentList = ({ onBack, onClose }) => {
  // Dummy data to mimic your screenshot
  const allStudents = [
    { name: "Ananthu", className: "Class 1 A", rollNo: 1, avatarUrl: "https://randomuser.me/api/portraits/men/65.jpg" },
    { name: "Arjun",   className: "Class 1 A", rollNo: 2, avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Priya",   className: "Class 1 A", rollNo: 3, avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "Vikram",  className: "Class 1 A", rollNo: 4, avatarUrl: "https://randomuser.me/api/portraits/men/12.jpg" },
    { name: "Sneha",   className: "Class 1 A", rollNo: 5, avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg" },
    { name: "Ravi",    className: "Class 1 A", rollNo: 6, avatarUrl: "https://randomuser.me/api/portraits/men/24.jpg" },
    { name: "Neha",    className: "Class 1 A", rollNo: 7, avatarUrl: "https://randomuser.me/api/portraits/women/50.jpg" },
    { name: "Karan",   className: "Class 1 A", rollNo: 8, avatarUrl: "https://randomuser.me/api/portraits/men/77.jpg" },
    { name: "Aditi",   className: "Class 1 A", rollNo: 9, avatarUrl: "https://randomuser.me/api/portraits/men/16.jpg" },
    { name: "Siddharth", className: "Class 1 A", rollNo: 10, avatarUrl: "https://randomuser.me/api/portraits/men/58.jpg" },
    { name: "Meera",   className: "Class 1 A", rollNo: 11, avatarUrl: "https://randomuser.me/api/portraits/women/28.jpg" },
    { name: "Rahul",   className: "Class 1 A", rollNo: 12, avatarUrl: "https://randomuser.me/api/portraits/men/73.jpg" },
  ];

  const [search, setSearch] = useState("");
  const filtered = allStudents.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="adminclassviewstudentlist-backdrop">
      {/* Header */}
      <div className="adminclassviewstudentlist-header">
        <button className="adminclassviewstudentlist-back-btn" onClick={onBack}>
          <IoArrowBack size={20} />
        </button>
        <h2 className="adminclassviewstudentlist-title">
          Student List
          <span className="adminclassviewstudentlist-count">{filtered.length}</span>
        </h2>
        <button className="adminclassviewstudentlist-close-btn" onClick={onClose}>
          <IoClose size={24} />
        </button>
      </div>

      {/* Search */}
      <div className="adminclassviewstudentlist-search-container">
        <AiOutlineSearch className="adminclassviewstudentlist-search-icon" />
        <input
          type="text"
          className="adminclassviewstudentlist-search-input"
          placeholder="Search Student"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Grid of student cards */}
      <div className="adminclassviewstudentlist-grid-container">
        {filtered.map(student => (
          <div key={student.rollNo} className="adminclassviewstudentlist-card">
            <img
              src={student.avatarUrl}
              alt={avtar}
              className="adminclassviewstudentlist-avatar"
            />
            <div className="adminclassviewstudentlist-info">
              <div className="adminclassviewstudentlist-name">
                {student.name}
              </div>
              <div className="adminclassviewstudentlist-class">
                {student.className}
              </div>
              <div className="adminclassviewstudentlist-roll">
                Roll no: {student.rollNo}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminClassViewStudentList;