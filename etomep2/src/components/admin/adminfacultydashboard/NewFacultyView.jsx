import React from 'react';
import './newfacultyview.css';
import image from "../../../assets/messi-ronaldo-1593920966.jpg"

const NewFacultyView = ({ faculty, onClose }) => {
    if (!faculty) return null;

    // Dummy faculty data to mimic the screenshot
    const facultyData = {
        name: 'Aarav',
        email: 'xyz@gmail.com',
        personalInfo: {
            phone: '3654585666',
            gender: 'Male',
            employeeId: '565555',
            password: '456',
        },
        subjects: {
            English: ['1A', '1B', '2C',],
            Mathematics: ['1A', '1B', '2C'],
            Hindi: ['1A', '1B', '2C'],
            physics:['1A', '1B', '2C']
        },
    };

    return (
        <div className="facultyview-backdrop">
            <div className="facultyview-modal-container">

                {/* Header Section */}
                <div className="facultyview-header">
                    <div className="facultyview-title">{facultyData.name}</div>
                    <button className="facultyview-close-btn" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <hr className="facultyview-divider" />

                <div className="facultyview-email-row">
                    <img
                        src={image}
                        alt="Faculty Avatar"
                        className="facultyview-profile-image"
                    />
                    <div className="facultyview-text-container">
                        <div className="facultyview-name">{facultyData.name}</div>
                        <div className="facultyview-email">{facultyData.email}</div>
                    </div>
                </div>

                <hr className="facultyview-divider" />

                {/* Personal Information */}
                <div className="facultyview-section-title">Personal Information</div>
                <div className="facultyview-personal-info">
                    <div className="facultyview-info-item">
                        <div className="facultyview-info-label">Phone No</div>
                        <div className="facultyview-info-value">
                            {facultyData.personalInfo.phone}
                        </div>
                    </div>
                    <div className="facultyview-info-item">
                        <div className="facultyview-info-label">Gender</div>
                        <div className="facultyview-info-value">
                            {facultyData.personalInfo.gender}
                        </div>
                    </div>
                    <div className="facultyview-info-item">
                        <div className="facultyview-info-label">Employee ID</div>
                        <div className="facultyview-info-value">
                            {facultyData.personalInfo.employeeId}
                        </div>
                    </div>
                    <div className="facultyview-info-item">
                        <div className="facultyview-info-label">Password</div>
                        <div className="facultyview-info-value">
                            {facultyData.personalInfo.password}
                        </div>
                    </div>
                </div>

                <hr className="facultyview-divider" />

                {/* Subject Fields */}
                <div className="facultyview-section-title">Subject Fields</div>
                <div className="facultyview-subject-fields">
                    {Object.entries(facultyData.subjects).map(([subjectName, codes]) => (
                        <div className="facultyview-subject-card" key={subjectName} >
                            <div className="facultyview-subject-title">{subjectName}</div>
                            <div className="facultyview-subject-chips">
                                {codes.map((code, idx) => (
                                    <span className="facultyview-chip" key={idx}>
                                        {code}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
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
