import React, { useEffect, useState } from 'react';
import './newfacultyaddthroughexcel.css';
import { RxUpload } from "react-icons/rx";
import { IoMdDownload } from "react-icons/io";
import generateExcelFile from '../../utils/generateExcelFile';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const NewFacultyAddThroughExcel = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const admininfo = useSelector((state) => state.admininfo);
    const APIURL = useSelector((state) => state.APIURL.url);
    const admin_id = admininfo ? admininfo?.admininfo?.admin_id : null;

    const handleFileUpload = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            // Check if file is Excel format
            const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
            if (fileExtension === 'xlsx' || fileExtension === 'xls') {
                setFile(selectedFile);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid File Format',
                    text: 'Please select an Excel file (.xlsx or .xls)',
                });
                event.target.value = null;
            }
        }
    };

    const handleUploadClick = async () => {
        if (!file) {
            Swal.fire({
                icon: 'error',
                title: 'No File Selected',
                text: 'Please select a file to upload.',
            });
            return;
        }

        if (!admin_id) {
            Swal.fire({
                icon: 'error',
                title: 'Authentication Error',
                text: 'Please login again to continue.',
            });
            return;
        }

        setIsLoading(true);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("adminId", admin_id);

        try {
            Swal.fire({
                title: "Uploading...",
                text: "Please wait while the file is being uploaded.",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            const response = await axios.post(
                `${APIURL}/api/excelteacher`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("File uploaded successfully:", response);

            Swal.fire({
                icon: "success",
                title: "Upload Successful",
                text: "Faculty data has been uploaded successfully.",
            });

            // Reset form and close modal
            setFile(null);
            onClose();
            
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

    const handleClose = () => {
        if (isLoading) return; // Prevent closing while uploading
        setFile(null);
        onClose();
    };

    return (
        <div className="facultyaddthroughexcel-overlay" onClick={handleClose}>
            <div className="facultyaddthroughexcel-popup" onClick={(e) => e.stopPropagation()}>
                <div>
                    <div className="facultyaddthroughexcel_upload-icon-section">
                        <div className="facultyaddthroughexcel_upload-icon">
                            <RxUpload size={16} color="#00B88D" />
                        </div>
                        <button onClick={handleClose} className="facultyaddthroughexcel-close-button">&times;</button>
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
                                accept=".xlsx,.xls"
                                disabled={isLoading}
                            />
                            <label htmlFor="file-upload" className="facultyaddthroughexcel-upload-label">
                                {file ? file.name : 'Drag or Click to Upload'}
                            </label>
                            <div>
                                <button
                                    className="facultyaddthroughexcel-upload-btn"
                                    onClick={handleUploadClick}
                                    disabled={isLoading || !file}
                                >
                                    {isLoading ? 'Uploading...' : 'Upload'}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="facultyaddthroughexcel-footer">
                        <p className="facultyaddthroughexcel-footer-text">
                            Didn't Download the Excel Template?
                        </p>
                        <button 
                            className="facultyaddthroughexcel-download-btn"
                            onClick={generateExcelFile}
                            disabled={isLoading}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                opacity: isLoading ? 0.6 : 1
                            }}
                        >
                            <IoMdDownload style={{ fontSize: '16px' }} />
                            Download Excel Template
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewFacultyAddThroughExcel;