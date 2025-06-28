import React, { useEffect, useState } from 'react';
import './newstudentaddthroughexcel.css';
import { RxUpload } from "react-icons/rx";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import studentexcel from "../../utils/studentexcel";

const NewStudentAddThroughExcel = ({ isOpen, onClose, onStudentAdded }) => {
    if (!isOpen) return null;
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const APIURL = useSelector((state) => state.APIURL.url);
    const teacher = useSelector((state) => state.teacherinfo);
    const teacher_id = teacher.teacherinfo?.teacher_id;

    const handleFileUpload = (event) => {
        setFile(event.target.files[0]);
    };

    const handleDownloadTemplate = () => {
        studentexcel();
    };

    const handleUploadClick = async () => {
        if (!file) {
            Swal.fire({
                icon: "error",
                title: "No File Selected",
                text: "Please select a file to upload.",
            });
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("teacher", teacher_id);

        try {
            Swal.fire({
                title: "Uploading...",
                text: "Please wait while the file is being uploaded.",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            console.log("Starting file upload...");
            const response = await axios.post(`${APIURL}/api/studentexcel`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("File uploaded successfully:", response);

            Swal.fire({
                icon: "success",
                title: "Upload Successful",
                text: "File has been uploaded successfully.",
            });

            // Close the modal and reset file
            onClose();
            setFile(null);
            // Call the callback to refresh the student list
            if (onStudentAdded) {
                onStudentAdded();
            }
        } catch (error) {
            console.error("Error uploading file:", error);

            let errorMessage = "An error occurred during file upload.";
            if (error.response) {
                if (typeof error.response.data === "string") {
                    errorMessage = error.response.data;
                } else if (error.response.data && error.response.data.message) {
                    errorMessage = error.response.data.message;
                }
            }

            Swal.fire({
                icon: "error",
                title: "Upload Failed",
                text: errorMessage,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="newstudentaddthroughexcel-overlay" onClick={onClose}>
            <div className="newstudentaddthroughexcel-popup" onClick={(e) => e.stopPropagation()}>
                <div>
                    <div className="newstudentaddthroughexcel_upload-icon-section">
                        <div className="newstudentaddthroughexcel_upload-icon">
                            <RxUpload size={16} color="#00B88D" />
                        </div>
                        <button onClick={onClose} className="newstudentaddthroughexcel-close-button">&times;</button>
                    </div>
                    <div className="newstudentaddthroughexcel-header">
                        <span className="newstudentaddthroughexcel-header-text">Upload Through Excel</span>
                    </div>
                    <div className="newstudentaddthroughexcel-body" >
                        <div className="newstudentaddthroughexcel-upload-section" >
                            <input
                                type="file"
                                id="file-upload"
                                className="newstudentaddthroughexcel-file-input"
                                onChange={handleFileUpload}
                                accept=".xls,.xlsx"
                            />
                            <label htmlFor="file-upload" className="newstudentaddthroughexcel-upload-label">
                                {file ? file.name : 'Drag or Click to Upload'}
                            </label>
                            <div>
                                <button
                                    className="newstudentaddthroughexcel-upload-btn"
                                    onClick={handleUploadClick}
                                    disabled={isLoading || !file}
                                >
                                    {isLoading ? "Uploading..." : "Upload"}
                                </button>
                            </div>

                        </div>
                    </div>
                    <div className="newstudentaddthroughexcel-footer">
                        <p className="newstudentaddthroughexcel-footer-text">
                            Didn't Download the Excel Template?
                        </p>
                        <button 
                            className="newstudentaddthroughexcel-download-btn"
                            onClick={handleDownloadTemplate}
                        >
                            Download Excel Template
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewStudentAddThroughExcel;