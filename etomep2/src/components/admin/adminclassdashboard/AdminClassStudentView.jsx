import React from "react";
import "./adminclassstudentview.css";
import studentDefault from "../../../assets/student.jpg"

const AdminClassStudentView = ({ student, onClose }) => {
    if (!student) return null;



    return (
        <div className="adminclassstudentview-backdrop">
            <div className="adminclassstudentview-modal">
                <div className="adminclassstudentview-topbar">
                    {/* Left: avatar + name/email */}
                    <div className="adminclassstudentview-header-left">
                        <img
                            src={student.image_url || studentDefault}
                            alt="student-avatar"
                            className="adminclassstudentview-avatar"
                        />
                        <div className="adminclassstudentview-header-text">
                            <div className="adminclassstudentview-name">
                            {student.student_name}
                            </div>
                            <div className="adminclassstudentview-email">
                            {student.email || "No email"}
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
                <div className="adminclassstudentview-section-title">
                    Personal Information
                </div>
                <div className="adminclassstudentview-personal-info">
                    {[
                         ["DOB", student.dob || "N/A"],
                         ["Gender", student.gender || "N/A"],
                         ["Father Name", student.fathers_name || "N/A"],
                         ["Mother Name", student.mothers_name || "N/A"],
                         ["Guardian Name", student.guardian || "N/A"],
                         ["Phone No", student.number || "N/A"],
                         ["Address", student.address || "N/A"],


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
                         ["Class", student.class_name || "N/A"],
                         ["Division", student.division || "N/A"], // If available, otherwise skip
                         ["Roll No", student.roll_no || "N/A"],
                         ["Joining Date", student.start_date || "N/A"],
                         ["Admission No", student.admission_no || "N/A"],
                         ["Academic Year", student.academic_year || "N/A"],
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
