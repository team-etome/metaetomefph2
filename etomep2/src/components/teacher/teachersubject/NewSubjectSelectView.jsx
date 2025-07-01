import React from "react";
import "./newsubjectselectview.css";
import studentDefault from '../../../assets/student.jpg'

const NewSubjectSelectView = ({ student, onClose }) => {
    if (!student) return null;
    console.log(student,"studentstudentstudentstudent")

 

    return (
        <div className="newsubjectselectview-backdrop">
            <div className="newsubjectselectview-modal-container">
                <div className="newsubjectselectview-modal">
                    <div className="newsubjectselectview-topbar">
                        {/* Left: avatar + name/email */}
                        <div className="newsubjectselectview-header-left">
                            <img
                                src={student.image ? student.image : studentDefault}
                                className="newsubjectselectview-avatar"
                            />
                            <div className="newsubjectselectview-header-text">
                                <div className="newsubjectselectview-name">
                                {student.student_name}
                                </div>
                                <div className="newsubjectselectview-email">
                                {student.email || "N/A"}                                </div>
                            </div>
                        </div>

                        {/* Right: close button */}
                        <div className="newsubjectselectview-header-right">
                            <button
                                className="newsubjectselectview-close-btn"
                                onClick={onClose}
                                aria-label="Close"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                    {/* Personal Information */}
                    <div className="newsubjectselectview-section-title">
                        Personal Information
                    </div>
                    <div className="newsubjectselectview-personal-info">
                        {[
                             ["DOB", student.dob || "N/A"],
                             ["Gender", student.gender || "N/A"],
                             ["Father Name", student.father_name || "N/A"],
                             ["Mother Name", student.mother_name || "N/A"],
                             ["Guardian Name", student.guardian_name || "N/A"],
                             ["Phone No", student.number || "N/A"],
                             ["Address", student.address || "N/A"],
                        ].map(([label, value]) => (
                            <div className="newsubjectselectview-info-item" key={label}>
                                <div className="newsubjectselectview-info-label">{label}</div>
                                <div className="newsubjectselectview-info-value">{value}</div>
                            </div>
                        ))}
                    </div>
                    {/* School Information */}
                    <div className="newsubjectselectview-section-title">
                        School Information
                    </div>
                    <div className="newsubjectselectview-school-info">
                        {[
                             ["Class", student.standard || "N/A"],
                             ["Division", student.division || "N/A"],
                             ["Roll No", student.roll_no || "N/A"],
                             ["Joining Date", student.joining_date || "N/A"],
                             ["Admission No", student.admission_no || "N/A"],
                             ["Category", student.category || "N/A"],
                        ].map(([label, value]) => (
                            <div className="newsubjectselectview-info-item" key={label}>
                                <div className="newsubjectselectview-info-label">{label}</div>
                                <div className="newsubjectselectview-info-value">{value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewSubjectSelectView;
