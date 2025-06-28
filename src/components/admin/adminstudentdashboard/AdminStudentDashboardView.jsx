import React from "react";
import "./adminstudentdashboardview.css";
import studentDefault from '../../../assets/student.jpg'

const AdminStudentDashboardView = ({ student, onClose }) => {
    if (!student) return null;

 

    return (
        <div className="adminstudentdashboardview-backdrop">
            <div className="adminstudentdashboardview-modal-container">
                <div className="adminstudentdashboardview-modal">
                    <div className="adminstudentdashboardview-topbar">
                        {/* Left: avatar + name/email */}
                        <div className="adminstudentdashboardview-header-left">
                            <img
                                src={student.image_url ? student.image_url : studentDefault}
                           
                                className="adminstudentdashboardview-avatar"
                            />
                            <div className="adminstudentdashboardview-header-text">
                                <div className="adminstudentdashboardview-name">
                                {student.student_name}
                                </div>
                                <div className="adminstudentdashboardview-email">
                                {student.email || "N/A"}                                </div>
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
                             ["DOB", student.dob || "N/A"],
                             ["Gender", student.gender || "N/A"],
                             ["Father Name", student.fathers_name || "N/A"],
                             ["Mother Name", student.mothers_name || "N/A"],
                             ["Guardian Name", student.guardian || "N/A"],
                             ["Phone No", student.number || "N/A"],
                             ["Address", student.address || "N/A"],
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
                             ["Class", student.class_name || "N/A"],
                             ["Division", student.division || "N/A"],
                             ["Roll No", student.roll_no || "N/A"],
                             ["Joining Date", student.start_date || "N/A"],
                             ["Admission No", student.admission_no || "N/A"],
                             ["Academic Year", student.accademic_year|| "N/A"],   


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
