// src/components/newteacheraddassignment.jsx
import React, { useRef, useState } from 'react';
import './newteacheraddassignment.css';
import { AiOutlineFilePdf } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';
import { BsCalendar3 } from 'react-icons/bs';
import { FaBold, FaItalic, FaUnderline, FaListUl } from 'react-icons/fa';
import {
    AiOutlineAlignLeft,
    AiOutlineAlignCenter,
    AiOutlineAlignRight,
} from 'react-icons/ai';

const NewTeacherAddAssignment = ({ onClose }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef();
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [mark, setMark] = useState('');
    const [manualMode, setManualMode] = useState(false);

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
        <div className="newteacheraddassignment-overlay">
            <div className="newteacheraddassignment-modal" >
                {/* Header */}
                <div className="newteacheraddassignment-header">
                    <p className="newteacheraddassignment-title">Add Assignments</p>
                    <button className="newteacheraddassignment-close" onClick={onClose}>
                        <IoClose size={24} />
                    </button>
                </div>

                {/* Body (scrollable) */}
                {!manualMode ? (
                    <div className="newteacheraddassignment-body">
                        <div className="newteacheraddassignment-info-row">
                            <div className="newteacheraddassignment-field">
                                <label>Title <span className="newteacheraddassignment_required">*</span></label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    // placeholder="Enter title"
                                    className="newteacheraddassignment-input"
                                />
                            </div>

                            <div className="newteacheraddassignment-field">
                                <label>Due Date <span className="newteacheraddassignment_required">*</span></label>
                                <div className="newteacheraddassignment-datepicker">
                                    <input
                                        type="date"
                                        value={dueDate}
                                        onChange={e => setDueDate(e.target.value)}
                                        className="newteacheraddassignment-input"
                                    />
                                    <BsCalendar3 className="calendar-icon" />
                                </div>
                            </div>

                            <div className="newteacheraddassignment-field">
                                <label>Mark <span className="newteacheraddassignment_required">*</span></label>
                                <input
                                    type="number"
                                    value={mark}
                                    onChange={e => setMark(e.target.value)}
                                    // placeholder="0"
                                    className="newteacheraddassignment-input"
                                />
                            </div>
                        </div>
                        <div className="newteacheraddassignment-add-question-row">
                            <p className="newteacheraddassignment-add-question-heading">
                                Add Question
                            </p>
                            <div className="newteacheraddassignment-btn-row">
                                <button
                                    type="button"
                                    className="newteacheraddassignment-upload-btn-primary"
                                >
                                    Upload File
                                </button>
                                <button
                                    type="button"
                                    className="newteacheraddassignment-manual-btn"
                                    onClick={() => setManualMode(true)}
                                >
                                    Create Manually &rarr;
                                </button>
                            </div>
                        </div>

                        {/* Upload area */}
                        <div className="newteacheraddassignment-upload">
                            <div
                                className="newteacheraddassignment-dropzone"
                                onClick={() => fileInputRef.current.click()}
                            >
                                <p className="newteacheraddassignment-dropzone_clickp">
                                    Click to Upload or Drag PDF/DOC here </p>
                                <p className="newteacheraddassignment-dropzone_maxp">Max. file size 25MB</p>

                                <button
                                    type="button"
                                    className="newteacheraddassignment-upload-btn"
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
                                <div className="newteacheraddassignment-file-info">

                                    <AiOutlineFilePdf
                                        className="newteacheraddassignment-file-icon"
                                        size={20}
                                    />

                                    <span className="newteacheraddassignment-file-name">
                                        {selectedFile.name}
                                    </span>
                                    <button
                                        className="newteacheraddassignment-file-remove"
                                        onClick={clearFile}
                                        aria-label="Remove file"
                                    >
                                        ×
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="newaddassignmentmanually-body">
                        {/* mimic your Figma: big textarea + formatting bar */}
                        <textarea
                            className="newaddassignmentmanually-textarea"
                            placeholder="Type your Question here"
                        />
                        <div className="newaddassignmentmanually-toolbar">
                            <button type="button"><FaBold /></button>
                            <button type="button"><FaItalic /></button>
                            <button type="button"><FaUnderline /></button>
                            <button type="button"><AiOutlineAlignLeft /></button>
                            <button type="button"><AiOutlineAlignCenter /></button>
                            <button type="button"><AiOutlineAlignRight /></button>
                            <button type="button"><FaListUl /></button>
                        </div>
                    </div>
                )}

                {/* Footer */}
                {!manualMode ? (
                    <div className="newteacheraddassignment-footer">
                        <button className="newaddassignmentmanually-submit-btn">
                            Submit
                        </button>
                    </div>
                ) : (
                    <div className="newaddassignmentmanually-footer">
                        {/* BACK BUTTON (left side) */}
                        <button
                            className="newaddassignmentmanually-back-btn"
                            onClick={() => setManualMode(false)}
                        >
                            Back
                        </button>

                        {/* CLEAR + SUBMIT (right side) */}
                        <div className="newaddassignmentmanually-footer-actions">
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
                )}
            </div>
        </div>
    );
};

export default NewTeacherAddAssignment;
