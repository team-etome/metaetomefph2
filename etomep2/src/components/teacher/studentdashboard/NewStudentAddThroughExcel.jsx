import React, { useEffect, useState } from 'react';
import './newstudentaddthroughexcel.css';
import { RxUpload } from "react-icons/rx";

const NewStudentAddThroughExcel = ({ isOpen, onClose }) => {
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
        <div className="studentaddthroughexcel-overlay" onClick={onClose}>
            <div className="studentaddthroughexcel-popup">
                <div>
                    <div className="studentaddthroughexcel_upload-icon-section">
                        <div className="studentaddthroughexcel_upload-icon">
                            <RxUpload size={16} color="#00B88D" />
                        </div>
                        <button onClick={onClose} className="studentaddthroughexcel-close-button">&times;</button>
                    </div>
                    <div className="studentaddthroughexcel-header">
                        <span className="studentaddthroughexcel-header-text">Upload Through Excel</span>
                    </div>
                    <div className="studentaddthroughexcel-body" >
                        <div className="studentaddthroughexcel-upload-section" >
                            <input
                                type="file"
                                id="file-upload"
                                className="studentaddthroughexcel-file-input"
                                onChange={handleFileUpload}
                            />
                            {/* <label htmlFor="file-upload" className="studentaddthroughexcel-upload-label">
                                {file ? file.name : 'Drag or Click to Upload'}
                            </label> */}
                            <div>
                                <button
                                    className="studentaddthroughexcel-upload-btn"
                                    onClick={handleUploadClick}
                                >
                                    Upload
                                </button>
                            </div>

                        </div>
                    </div>
                    <div className="studentaddthroughexcel-footer">
                        <p className="studentaddthroughexcel-footer-text">
                            Didn’t Download the Excel Template?
                        </p>
                        <button className="studentaddthroughexcel-download-btn">
                            Download Excel Template
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewStudentAddThroughExcel;