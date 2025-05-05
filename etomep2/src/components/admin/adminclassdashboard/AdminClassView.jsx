import React from "react";
import "./adminclassview.css";
import { useState } from "react";
import AdminClassStudentList from "./AdminClassStudentList";
import { useEffect } from "react";

const AdminClassView = ({ onClose }) => {
    const [showStudents, setShowStudents] = useState(false);
    const data = {
        className: "Class 12 A",
        circleTitle: "12 A",
        classTeacher: "Sethu Lakshmi",
        medium: "English",
        stream: "Biology Science",
        noOfSubjects: 6,
        subjectList: [
            { subjectName: "Biology", publisherName: "NCERT", facultyName: "Ramesh" },
            { subjectName: "Mathematics", publisherName: "NCERT", facultyName: "Sumesh" },
            { subjectName: "Chemistry", publisherName: "NCERT", facultyName: "Hari Narayanan" },
            { subjectName: "Biology", publisherName: "NCERT", facultyName: "Ramesh" },
            { subjectName: "Mathematics", publisherName: "NCERT", facultyName: "Sumesh" },
            { subjectName: "Chemistry", publisherName: "NCERT", facultyName: "Hari Narayanan" },
            { subjectName: "Biology", publisherName: "NCERT", facultyName: "Ramesh" },
            { subjectName: "Mathematics", publisherName: "NCERT", facultyName: "Sumesh" },
            { subjectName: "Chemistry", publisherName: "NCERT", facultyName: "Hari Narayanan" },

        ],
    };

    if (showStudents) {
        return (
          <AdminClassStudentList
            onBack={() => setShowStudents(false)}  // go back to Class View
            onClose={onClose}                     // close both
          />
        );
      }

    return (
        <div className="adminclassview-backdrop">
            {/* Header */}
            <div className="adminclassview-header">
                <p className="adminclassview-header-title">{data.className}</p>
                <button className="adminclassview-close-btn" onClick={onClose}>
                    ×
                </button>
            </div>

            <hr className="adminclassview-divider" />

            {/* Wrapper containing everything */}
            <div className="adminclassview-wrapper">
                <div className="adminclassview-top-row">
                    <div className="adminclassview-circle-container">
                        <div className="adminclassview-circle">
                            {data.circleTitle /* e.g. "12 A" */}
                        </div>
                    </div>

                    {/* Info items */}
                    <div className="adminclassview-info-container">
                        {/* Top row */}
                        <div className="adminclassview-info-container-top" >
                            <div className="adminclassview-info-item">
                                <p className="adminclassview-label">Class Teacher</p>
                                <p className="adminclassview-value">{data.classTeacher}</p>
                            </div>

                            <div className="adminclassview-info-item">
                                <p className="adminclassview-label">Medium</p>
                                <p className="adminclassview-value">{data.medium}</p>
                            </div>

                            <div className="adminclassview-info-item">
                                <p className="adminclassview-label">Stream</p>
                                <p className="adminclassview-value">{data.stream}</p>
                            </div>
                        </div>

                        {/* Bottom row */}
                        <div className="adminclassview-info-container-bottom">
                            <div className="adminclassview-info-item">
                                <p className="adminclassview-label">No of Subjects</p>
                                <p className="adminclassview-value">{data.noOfSubjects}</p>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="adminclassview-button-row"
                    onClick={() => setShowStudents(true)}
                    style={{ cursor: "pointer" }}
                >
                    <div className="adminclassview-button-container">
                        <button className="adminclassview-view-btn">View Student List</button>
                    </div>
                </div>
            </div>

            {/* Subject List Table */}
            <div className="adminclassview-subject-list-container">
                <p className="adminclassview-subject-list-title">Subject List</p>
                <table className="adminclassview-table">
                    <thead>
                        <tr>
                            <th>Subject Name</th>
                            <th>Publisher Name</th>
                            <th>Faculty Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.subjectList.map((item, index) => (
                            <tr key={index}>
                                <td>{item.subjectName}</td>
                                <td>{item.publisherName}</td>
                                <td>{item.facultyName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer Buttons */}
            <div className="adminclassview-modal-footer">
                <button className="adminclassview-btn adminclassview-btn-delete">Delete</button>
                <button className="adminclassview-btn adminclassview-btn-edit">Edit</button>
            </div>

             {/* ===== Conditionally show the StudentList component ===== */}
             {showStudents && (
                    <AdminClassStudentList
                        onClose={() => setShowStudents(false)}
                    />
                )}
        </div >
    );
};

export default AdminClassView;