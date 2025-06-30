import React, { useEffect, useState } from 'react';
import './newfacultyaddthroughexcel.css';
import { RxUpload } from "react-icons/rx";

const NewFacultyAddThroughExcel = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    const [file, setFile] = useState(null);

    const handleFileUpload = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUploadClick = () => {
        if (file) {
            alert('File uploaded successfully!');
        }
    };
    return (
        <div className="facultyaddthroughexcel-overlay" onClick={onClose}>
            <div className="facultyaddthroughexcel-popup">
                <div>
                    <div className="facultyaddthroughexcel_upload-icon-section">
                        <div className="facultyaddthroughexcel_upload-icon">
                            <RxUpload size={16} color="#00B88D" />
                        </div>
                        <button onClick={onClose} className="facultyaddthroughexcel-close-button">&times;</button>
                    </div>
                    <div className="facultyaddthroughexcel-header">
                        <span className="facultyaddthroughexcel-header-text">Upload Through Excel</span>
                    </div>
                    <div className="facultyaddthroughexcel-body" >
                        <div className="facultyaddthroughexcel-upload-section" >
                            <input
                                type="file"
                                id="file-upload"
                                className="facultyaddthroughexcel-file-input"
                                onChange={handleFileUpload}
                            />
                            {/* <label htmlFor="file-upload" className="facultyaddthroughexcel-upload-label">
                                {file ? file.name : 'Drag or Click to Upload'}
                            </label> */}
                            <div>
                                <button
                                    className="facultyaddthroughexcel-upload-btn"
                                    onClick={handleUploadClick}
                                >
                                    Upload
                                </button>
                            </div>

                        </div>
                    </div>
                    <div className="facultyaddthroughexcel-footer">
                        <p className="facultyaddthroughexcel-footer-text">
                            Didn’t Download the Excel Template?
                        </p>
                        <button className="facultyaddthroughexcel-download-btn">
                            Download Excel Template
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewFacultyAddThroughExcel;