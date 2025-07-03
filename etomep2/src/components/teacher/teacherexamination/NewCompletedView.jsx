// src/components/newcompletedview.jsx
import React, { useRef, useState } from 'react';
import './newcompletedview.css';
import { AiOutlineFilePdf } from 'react-icons/ai';
import { FaArrowLeft } from "react-icons/fa6";
// import NewPendingCreateQuestion from './NewPendingCreateQuestion';
import NewQuestionGenerator from '../teacherquestiongenerator/NewQuestionGenerator';
import { useSelector } from 'react-redux';

const NewCompletedView = ({ selectedItemCompleted, onBack }) => {
    console.log(selectedItemCompleted,"selectedItemCompletedselectedItemCompleted")
    const [selectedFile, setSelectedFile] = useState(null);
    const [showCreateQ, setShowCreateQ] = useState(false);
    const teacherInfo = useSelector((state) => state.teacherinfo.teacherinfo);
    const handlenavigate = () => {
        navigate("/teacherprofile",);
    };
    const fileInputRef = useRef();

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
        <div className="newpendingdetail-container">
            {/* Header */}
            <div className="newcompletedview-header">
            <div className="newcompletedview-header-left">
                    <button className="newcompletedview-close" onClick={onBack}>
                        <FaArrowLeft size={24}/>
                    </button>
                    <p className="newcompletedview-title">Exam Details</p>

                </div>
                <div className="newcompletedview-userinfo">
                    <span className="newcompletedview-email">{teacherInfo?.email || " "}</span>
                    <span className="newcompletedview-avatar">
                        <img
                            onClick={handlenavigate}
                            src={teacherInfo?.image || " "}
                            alt="Profile"

                        />
                    </span>
                </div>

            </div>

            {/* Body (scrollable) */}
            {!showCreateQ ? (
                <>
                    <div className="newcompletedview-body">
                        {/* First row of four */}
                        <div className="newcompletedview-row">
                            <div>
                                <span className="newcompletedview-row_label">Exam Name</span>
                                <p>{selectedItemCompleted?.examName}</p>
                            </div>
                            <div><span className="newcompletedview-row_label">Subject</span><p>{selectedItemCompleted?.subject}</p></div>
                            <div><span className="newcompletedview-row_label">Exam Date</span><p>{selectedItemCompleted?.examDate}</p></div>
                            <div><span className="newcompletedview-row_label">Class</span><p>{selectedItemCompleted?.class}</p></div>
                        </div>
                        {/* Second row of four */}
                        <div className="newcompletedview-row">
                            <div><span className="newcompletedview-row_label">Start Time</span><p>10:00</p></div>
                            <div><span className="newcompletedview-row_label">End Time</span><p>12:30</p></div>
                            <div><span className="newcompletedview-row_label">Out of Marks</span><p>100</p></div>
                            <div><span className="newcompletedview-row_label">Term</span><p>Term I</p></div>
                        </div>
                        <div className="newcompletedview-create-questions-wrapper" >
                            <button className="newcompletedview-create-questions" onClick={() => setShowCreateQ(true)}>
                                View Question
                            </button>
                        </div>

                        {/* Upload area */}
                        <div className="newcompletedview-upload">
                            <p className="newcompletedview-upload-heading">Upload Instruction</p>

                            <div
                                className="newcompletedview-dropzone"
                                onClick={() => fileInputRef.current.click()}
                            >
                                <p className="newcompletedview-dropzone_clickp">
                                    Click to Upload or Drag PDF/DOC here </p>
                                <p className="newcompletedview-dropzone_maxp">Max. file size 25MB</p>

                                <button
                                    type="button"
                                    className="newcompletedview-upload-btn"
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
                                <div className="newcompletedview-file-info">

                                    <AiOutlineFilePdf
                                        className="newcompletedview-file-icon"
                                        size={20}
                                    />

                                    <span className="newcompletedview-file-name">
                                        {selectedFile.name}
                                    </span>
                                    <button
                                        className="newcompletedview-file-remove"
                                        onClick={clearFile}
                                        aria-label="Remove file"
                                    >
                                        ×
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="newcompletedview-footer">
                        <button className="newcompletedview-submit">Submit</button>
                    </div>
                </>
            ) : (
                /* If showCreateQ is true, render the “create question” screen instead */
                <NewQuestionGenerator onClose={() => setShowCreateQ(false)} />
            )}
        </div>
    );
};

export default NewCompletedView;
