// src/components/newteacheraddreference.jsx
import React, { useRef, useState, useEffect } from 'react';
import './newteacheraddreference.css';
import { AiOutlineFilePdf } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';
import { BsCalendar3 } from 'react-icons/bs';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

const NewTeacherAddReference = ({ onClose, class_name, division, subject, editData, isEditMode }) => {
    const APIURL = useSelector((state) => state.APIURL.url);
    const teacher = useSelector((state) => state.teacherinfo);
    const teacher_id = teacher.teacherinfo?.teacher_id;
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef();
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [urlMode, setUrlMode] = useState(false);

    // Populate form when in edit mode
    useEffect(() => {
        if (isEditMode && editData) {
            setTitle(editData.title || '');
            
            // Determine if it's a file or URL reference
            if (editData.pdf) {
                // If there's a PDF, it's a file reference
                setUrlMode(false);
                const fileName = editData.pdf.split('/').pop().split('?')[0]; // Remove query parameters
                setSelectedFile({ 
                    name: fileName,
                    isExistingFile: true,
                    url: editData.pdf 
                });
            } else if (editData.url) {
                // If there's a URL, it's a URL reference
                setUrlMode(true);
                setUrl(editData.url);
            }
        }
    }, [isEditMode, editData]);

    const handleFileChange = e => {
        const file = e.target.files[0];
        if (file) {
            // If currently in URL mode and URL has content, show confirmation
            if (urlMode && url.trim()) {
                Swal.fire({
                    title: 'Switch to File Mode?',
                    text: 'You have entered a URL. Selecting a file will clear the URL. Do you want to continue?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#2162B2',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, switch',
                    cancelButtonText: 'Cancel'
                }).then((result) => {
                    if (result.isConfirmed) {
                        setSelectedFile(file);
                        setUrlMode(false);
                        setUrl('');
                    } else {
                        // Reset file input
                        fileInputRef.current.value = '';
                    }
                });
            } else {
                setSelectedFile(file);
                setUrlMode(false);
                setUrl('');
            }
        }
    };

    const clearFile = () => {
        setSelectedFile(null);
        fileInputRef.current.value = "";
    };

    // Handle mode switching
    const switchToFileMode = () => {
        // If currently in URL mode and URL has content, show confirmation
        if (urlMode && url.trim()) {
            Swal.fire({
                title: 'Switch to File Mode?',
                text: 'You have entered a URL. Switching to file mode will clear the URL. Do you want to continue?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#2162B2',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, switch',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    setUrlMode(false);
                    setUrl('');
                }
            });
        } else {
            setUrlMode(false);
            setUrl('');
        }
    };

    const switchToUrlMode = () => {
        // If currently in file mode and file is selected, show confirmation
        if (!urlMode && selectedFile) {
            Swal.fire({
                title: 'Switch to URL Mode?',
                text: 'You have selected a file. Switching to URL mode will clear the file. Do you want to continue?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#2162B2',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, switch',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    setUrlMode(true);
                    clearFile();
                }
            });
        } else {
            setUrlMode(true);
            clearFile();
        }
    };

    // Function to check if all required fields are filled
    const isFormComplete = () => {
        // Check title
        if (!title.trim()) return false;
        
        if (urlMode) {
            // URL mode - check if URL is provided and valid
            if (!url.trim()) return false;
            try {
                new URL(url);
            } catch {
                return false; // Invalid URL
            }
        } else {
            // File mode - check if file is selected
            if (!selectedFile) return false;
        }
        
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!title.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Please enter a title for the reference.'
            });
            return;
        }

        if (urlMode) {
            // URL mode validation
            if (!url.trim()) {
                Swal.fire({
                    icon: 'error',
                    title: 'Validation Error',
                    text: 'Please enter a URL for the reference.'
                });
                return;
            }
            
            // Basic URL validation
            try {
                new URL(url);
            } catch {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid URL',
                    text: 'Please enter a valid URL (e.g., https://example.com)'
                });
                return;
            }
        } else {
            // File mode validation
            if (!selectedFile) {
                Swal.fire({
                    icon: 'error',
                    title: 'Validation Error',
                    text: 'Please select a file to upload.'
                });
                return;
            }
        }

        try {
            const requestMethod = isEditMode ? 'put' : 'post';
            const requestUrl = isEditMode ? `${APIURL}/api/reference/${editData.id}` : `${APIURL}/api/reference`;
            
            if (urlMode) {
                // Send URL data as JSON
                const urlData = {
                    class_name,
                    division,
                    subject,
                    teacher: teacher_id,
                    title,
                    url
                };
                
                // Add ID for edit mode
                if (isEditMode && editData) {
                    urlData.id = editData.id;
                }
                
                await axios[requestMethod](requestUrl, urlData);
            } else {
                // Send file data as FormData
                const formData = new FormData();
                formData.append('class_name', class_name);
                formData.append('division', division);
                formData.append('subject', subject);
                formData.append('teacher', teacher_id);
                formData.append('title', title);
                
                // Add ID for edit mode
                if (isEditMode && editData) {
                    formData.append('id', editData.id);
                }
                
                if (selectedFile) {
                    if (selectedFile.isExistingFile) {
                        // If it's an existing file, we don't need to append it again
                        formData.append('keep_existing_pdf', 'true');
                        formData.append('existing_pdf_url', selectedFile.url);
                    } else {
                        // New file selected
                        formData.append('pdf', selectedFile);
                    }
                }
                
                await axios[requestMethod](requestUrl, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }
            Swal.fire({
                icon: 'success',
                title: isEditMode ? 'Reference Updated' : 'Reference Added',
                text: isEditMode ? 'The reference was updated successfully!' : 'The reference was added successfully!'
            });
            onClose();
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Failed to add reference.'
            });
        }
    };

    return (
        <div className="newteacheraddreference-overlay">
            <div className="newteacheraddreference-modal" >
                {/* Header */}
                <div className="newteacheraddreference-header">
                    <p className="newteacheraddreference-title">
                        {isEditMode ? 'Edit Reference' : 'Add Reference'}
                    </p>
                    <button className="newteacheraddreference-close" onClick={onClose}>
                        <IoClose size={24} />
                    </button>
                </div>

                {/* Body (scrollable) */}
                <div className="newteacheraddreference-body">
                    <div className="newteacheraddreference-info-row">
                        <div className="newteacheraddreference-field">
                            <label>Title <span className="newteacheraddreference_required">*</span></label>
                            <input
                                type="text"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                // placeholder="Enter reference title"
                                className="newteacheraddreference-input"
                            />
                        </div>
                    </div>
                    <div className="newteacheraddreference-add-question-row">
                        <p className="newteacheraddreference-add-question-heading">
                            Add Reference
                        </p>
                        <div className="newteacheraddreference-btn-row">
                            <button
                                type="button"
                                className={`newteacheraddreference-manual-btn ${!urlMode ? 'active' : ''}`}
                                onClick={switchToFileMode}
                            >
                                Upload File
                            </button>
                            <button
                                type="button"
                                className={`newteacheraddreference-manual-btn ${urlMode ? 'active' : ''}`}
                                onClick={switchToUrlMode}
                            >
                                Upload URL
                            </button>
                        </div>
                    </div>

                    {/* Upload area */}
                    {!urlMode ? (
                    <div className="newteacheraddreference-upload">
                        <div
                            className="newteacheraddreference-dropzone"
                            onClick={() => fileInputRef.current.click()}
                        >
                            <p className="newteacheraddreference-dropzone_clickp">
                                Click to Upload or Drag PDF/DOC here </p>
                            <p className="newteacheraddreference-dropzone_maxp">Max. file size 25MB</p>

                            <button
                                type="button"
                                className="newteacheraddreference-upload-btn"
                                onClick={e => {
                                    e.stopPropagation();
                                    fileInputRef.current.click();
                                }}
                            >
                                Upload File
                            </button>
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />

                        </div>



                        {/* <=== the new "chip" that appears once a file is selected=== */}
                        {selectedFile && (
                            <div className="newteacheraddreference-file-info">

                                <AiOutlineFilePdf
                                    className="newteacheraddreference-file-icon"
                                    size={20}
                                />

                                <span className="newteacheraddreference-file-name">
                                    {selectedFile.name}
                                    {selectedFile.isExistingFile && (
                                        <span style={{ color: '#666', fontSize: '12px', marginLeft: '8px' }}>
                                            (Existing file)
                                        </span>
                                    )}
                                </span>
                                <button
                                    className="newteacheraddreference-file-remove"
                                    onClick={clearFile}
                                    aria-label="Remove file"
                                >
                                    ×
                                </button>
                            </div>
                        )}
                    </div>
                    ) : (
                        // NEW: URL mode
                        <div className="newteacheraddreference-url-input">
                          <label>Paste Link:</label>
                          <input
                            type="text"
                            placeholder="Link"
                            value={url}
                            onChange={e => {
                                const newUrl = e.target.value;
                                // If currently in file mode and file is selected, show confirmation
                                if (!urlMode && selectedFile && newUrl.trim()) {
                                    Swal.fire({
                                        title: 'Switch to URL Mode?',
                                        text: 'You have selected a file. Entering a URL will clear the file. Do you want to continue?',
                                        icon: 'warning',
                                        showCancelButton: true,
                                        confirmButtonColor: '#2162B2',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: 'Yes, switch',
                                        cancelButtonText: 'Cancel'
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            setUrl(newUrl);
                                            setUrlMode(true);
                                            clearFile();
                                        }
                                    });
                                } else {
                                    setUrl(newUrl);
                                }
                            }}
                            className="newteacheraddreference-input"
                          />
                        </div>
                      )}
                </div>


                {/* Footer */}
                <div className="newteacheraddreference-footer">
                    <button
                        className="newaddassignmentmanually-clear-btn"
                        onClick={() => {
                            setTitle('');
                            setUrl('');
                            clearFile();
                        }}
                    >
                        Clear
                    </button>
                    <button 
                        className="newaddassignmentmanually-submit-btn" 
                        style={{
                            backgroundColor: isFormComplete() ? '#2162B2' : '#bcbcbc',
                            color: '#fff',
                            border: isFormComplete() ? '1px solid #2162B2' : '1px solid #bcbcbc',
                            cursor: 'pointer'
                        }}
                        onClick={handleSubmit}
                    >
                        {isEditMode ? 'Update' : 'Submit'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewTeacherAddReference;
