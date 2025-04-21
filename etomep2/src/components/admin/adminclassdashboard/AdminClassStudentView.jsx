import React from "react";
import "./adminclassstudentview.css";
import defaultAvatar from "../../../assets/messi-ronaldo-1593920966.jpg";

const AdminClassStudentView = ({ student, onClose }) => {
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
        <div className="adminclassstudentview-backdrop">
            <div className="adminclassstudentview-modal">
                <div className="adminclassstudentview-topbar">
                    {/* Left: avatar + name/email */}
                    <div className="adminclassstudentview-header-left">
                        <img
                            src={student.avatarUrl || defaultAvatar}
                            alt={studentData.name}
                            className="adminclassstudentview-avatar"
                        />
                        <div className="adminclassstudentview-header-text">
                            <div className="adminclassstudentview-name">
                                {studentData.name}
                            </div>
                            <div className="adminclassstudentview-email">
                                {studentData.email}
                            </div>
                        </div>
                    </div>

                    {/* Right: close button */}
                    <div className="adminclassstudentview-header-right">
                        <button
                            className="adminclassstudentview-close-btn"
                            onClick={onClose}
                            aria-label="Close"
                        >
                            ×
                        </button>
                    </div>
                </div>

                <hr className="adminclassstudentview-divider" />

                {/* Personal Information */}
                <div className="adminclassstudentview-section-title" style={{border:"2px solid black"}}>
                    Personal Information
                </div>
                <div className="adminclassstudentview-personal-info">
                    {[
                        ["DOB", studentData.dob],
                        ["Gender", studentData.gender],
                        ["Father Name", studentData.fatherName],
                        ["Mother Name", studentData.motherName],
                        ["Guardian Name", studentData.guardianName],
                        ["Phone No", studentData.phone],
                        ["Address", studentData.address],
                    ].map(([label, value]) => (
                        <div className="adminclassstudentview-info-item" key={label}>
                            <div className="adminclassstudentview-info-label">{label}</div>
                            <div className="adminclassstudentview-info-value">{value}</div>
                        </div>
                    ))}
                </div>

                <hr className="adminclassstudentview-divider" />

                {/* School Information */}
                <div className="adminclassstudentview-section-title">
                    School Information
                </div>
                <div className="adminclassstudentview-school-info">
                    {[
                        ["Class", studentData.school.class],
                        ["Division", studentData.school.division],
                        ["Roll No", studentData.school.rollNo],
                        ["Joining Date", studentData.school.joiningDate],
                        ["Admission No", studentData.school.admissionNo],
                        ["Academic Year", studentData.school.academicYear],
                    ].map(([label, value]) => (
                        <div className="adminclassstudentview-info-item" key={label}>
                            <div className="adminclassstudentview-info-label">{label}</div>
                            <div className="adminclassstudentview-info-value">{value}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminClassStudentView;
