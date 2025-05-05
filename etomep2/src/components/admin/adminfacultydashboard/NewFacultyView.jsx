import React from 'react';
import './newfacultyview.css';
import defaultImage from "../../../assets/default.jpg";
import image from "../../../assets/messi-ronaldo-1593920966.jpg"

const NewFacultyView = ({ faculty, onClose }) => {
    if (!faculty) return null;


    return (
        <div className="facultyview-backdrop">
            <div className="facultyview-modal-container">

                {/* Header Section */}
                <div className="facultyview-header">
                    <div className="facultyview-email-row" >
                        <img
                            src={faculty.image || image}
                            alt="Faculty Avatar"
                            className="facultyview-profile-image"
                        />
                        <div className="facultyview-text-container">
                            <div className="facultyview-title">{faculty.first_name} {faculty.last_name}</div>
                            <div className="facultyview-email">{faculty.email}</div>
                        </div>
                    </div>
                    <div>
                        <button className="facultyview-close-btn" onClick={onClose}>
                            &times;
                        </button>
                    </div>
                </div>
                <hr className="facultyview-divider" />

                {/* Personal Information */}
                <div className="facultyview-section-title">Personal Information</div>
                <div className="facultyview-personal-info">
                    <div className="facultyview-info-item">
                        <div className="facultyview-info-label">Phone No</div>
                        <div className="facultyview-info-value">
                            {faculty.phone_number}
                        </div>
                    </div>
                    <div className="facultyview-info-item">
                        <div className="facultyview-info-label">Gender</div>
                        <div className="facultyview-info-value">
                            {faculty.gender}
                        </div>
                    </div>
                    <div className="facultyview-info-item">
                        <div className="facultyview-info-label">Employee ID</div>
                        <div className="facultyview-info-value">
                            {faculty.employee_id}
                        </div>
                    </div>
                    {/* <div className="facultyview-info-item">
                        <div className="facultyview-info-label">Password</div>
                        <div className="facultyview-info-value">
                            {faculty.password}
                        </div>
                    </div> */}
                </div>

                <hr className="facultyview-divider" />

                {/* Subject Fields */}
                <div className="facultyview-section-title">Subject Fields</div>
                <div className="facultyview-subject-fields">
                    {faculty?.curriculam && faculty.curriculam.length > 0 ? (
                        Object.entries(
                            faculty.curriculam.reduce((acc, item) => {
                                const key = item.subject_name;
                                const value = `${item.class_name}${item.division}`;
                                if (!acc[key]) acc[key] = [];
                                acc[key].push(value);
                                return acc;
                            }, {})
                        ).map(([subjectName, codes]) => (
                            <div className="facultyview-subject-card" key={subjectName}>
                                <div className="facultyview-subject-title">{subjectName}</div>
                                <div className="facultyview-subject-chips">
                                    {codes.map((code, idx) => (
                                        <span className="facultyview-chip" key={idx}>
                                            {code}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p style={{ color: "#888", fontStyle: "italic" }}>No subjects assigned.</p>
                    )}
                </div>

                {/* Footer Buttons */}
                <div className="facultyview-modal-footer">
                    <button className="facultyview-btn facultyview-btn-danger">Delete</button>
                    <button className="facultyview-btn facultyview-btn-primary">Edit</button>
                </div>
            </div>
        </div>
    );
};

export default NewFacultyView;
