// src/components/newteacheraddreference.jsx
import React, { useRef, useState } from 'react';
import './newteacheraddreference.css';
import { AiOutlineFilePdf } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';
import { BsCalendar3 } from 'react-icons/bs';

const NewTeacherAddReference = ({ onClose }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef();
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [mark, setMark] = useState('');
    const [urlMode, setUrlMode] = useState(false);

    const handleFileChange = e => {
        const file = e.target.files[0];
        if (file) setSelectedFile(file);
    };

    const clearFile = () => {
        setSelectedFile(null);
        // reset the input so you can re-pick the same file if needed
        fileInputRef.current.value = "";
    };

    return (
        <div className="newteacheraddreference-overlay">
            <div className="newteacheraddreference-modal" >
                {/* Header */}
                <div className="newteacheraddreference-header">
                    <p className="newteacheraddreference-title">Add Assignments</p>
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
                                // placeholder="Enter title"
                                className="newteacheraddreference-input"
                            />
                        </div>
                    </div>
                    <div className="newteacheraddreference-add-question-row">
                        <p className="newteacheraddreference-add-question-heading">
                            Add Question
                        </p>
                        <div className="newteacheraddreference-btn-row">
                            <button
                                type="button"
                                className="newteacheraddreference-upload-btn-primary"
                                onClick={() => setUrlMode(false)}
                            >
                                Upload File
                            </button>
                            <button
                                type="button"
                                className="newteacheraddreference-manual-btn"
                                onClick={() => setUrlMode(true)}
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



                        {/* <=== the new “chip” that appears once a file is selected=== */}
                        {selectedFile && (
                            <div className="newteacheraddreference-file-info">

                                <AiOutlineFilePdf
                                    className="newteacheraddreference-file-icon"
                                    size={20}
                                />

                                <span className="newteacheraddreference-file-name">
                                    {selectedFile.name}
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
                            className="newteacheraddreference-input"
                          />
                        </div>
                      )}
                </div>


                {/* Footer */}
                <div className="newteacheraddreference-footer">
                    <button
                        className="newaddassignmentmanually-clear-btn"
                        onClick={() => {/* clear the textarea here */ }}
                    >
                        Clear
                    </button>
                    <button className="newaddassignmentmanually-submit-btn">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewTeacherAddReference;
