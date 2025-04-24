import React from "react";
import "./adminstudentdashboardview.css";
import defaultAvatar from "../../../assets/messi-ronaldo-1593920966.jpg";

const AdminStudentDashboardView = ({ student, onClose }) => {
    if (!student) return null;

    // Expanded student data (you could merge these into your `student` prop)
    const studentData = {
        name: student.name,
        email: "xyz@gmail.com",
        dob: "10/03/2000",
        gender: "Male",
        fatherName: "Suresh Kumar",
        motherName: "Renuka",
        guardianName: "Kumar",
        phone: "9686547555",
        address: "Sagar Vihar, 45 K Munshi Marg, Nr Nuookad Hotel, Chowpatty",
        school: {
            class: "7",
            division: "A",
            rollNo: student.rollNo,
            joiningDate: "12/04/2024",
            admissionNo: "254688",
            academicYear: "2022–2025",
        }
    };

    return (
        <div className="adminstudentdashboardview-backdrop">
            <div className="adminstudentdashboardview-modal-container">
                <div className="adminstudentdashboardview-modal">
                    <div className="adminstudentdashboardview-topbar">
                        {/* Left: avatar + name/email */}
                        <div className="adminstudentdashboardview-header-left">
                            <img
                                src={student.avatarUrl }
                                alt={defaultAvatar}
                                className="adminstudentdashboardview-avatar"
                            />
                            <div className="adminstudentdashboardview-header-text">
                                <div className="adminstudentdashboardview-name">
                                    {studentData.name}
                                </div>
                                <div className="adminstudentdashboardview-email">
                                    {studentData.email}
                                </div>
                            </div>
                        </div>

                        {/* Right: close button */}
                        <div className="adminstudentdashboardview-header-right">
                            <button
                                className="adminstudentdashboardview-close-btn"
                                onClick={onClose}
                                aria-label="Close"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                    {/* Personal Information */}
                    <div className="adminstudentdashboardview-section-title">
                        Personal Information
                    </div>
                    <div className="adminstudentdashboardview-personal-info">
                        {[
                            ["DOB", studentData.dob],
                            ["Gender", studentData.gender],
                            ["Father Name", studentData.fatherName],
                            ["Mother Name", studentData.motherName],
                            ["Guardian Name", studentData.guardianName],
                            ["Phone No", studentData.phone],
                            ["Address", studentData.address],
                        ].map(([label, value]) => (
                            <div className="adminstudentdashboardview-info-item" key={label}>
                                <div className="adminstudentdashboardview-info-label">{label}</div>
                                <div className="adminstudentdashboardview-info-value">{value}</div>
                            </div>
                        ))}
                    </div>
                    {/* School Information */}
                    <div className="adminstudentdashboardview-section-title">
                        School Information
                    </div>
                    <div className="adminstudentdashboardview-school-info">
                        {[
                            ["Class", studentData.school.class],
                            ["Division", studentData.school.division],
                            ["Roll No", studentData.school.rollNo],
                            ["Joining Date", studentData.school.joiningDate],
                            ["Admission No", studentData.school.admissionNo],
                            ["Academic Year", studentData.school.academicYear],
                        ].map(([label, value]) => (
                            <div className="adminstudentdashboardview-info-item" key={label}>
                                <div className="adminstudentdashboardview-info-label">{label}</div>
                                <div className="adminstudentdashboardview-info-value">{value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminStudentDashboardView;
