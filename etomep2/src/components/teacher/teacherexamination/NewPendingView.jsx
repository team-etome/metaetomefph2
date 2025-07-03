// src/components/NewPendingView.jsx
import React, { useRef, useState } from 'react';
import './newpendingview.css';
import { AiOutlineFilePdf } from 'react-icons/ai';
import { FaArrowLeft } from "react-icons/fa6";
import NewPendingCreateQuestion from './NewPendingCreateQuestion';
import NewQuestionGenerator from '../teacherquestiongenerator/NewQuestionGenerator';
import { useSelector } from 'react-redux';

const NewPendingView = ({ selectedItem, onBack }) => {
    console.log(selectedItem,"selectedItemselectedItemankit")
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
            <div className="newpendingview-header">
            <div className="newpendingview-header-left">
                    <button className="newpendingview-close" onClick={onBack}>
                        <FaArrowLeft size={24}/>
                    </button>
                    <p className="newpendingview-title">Exam Details</p>

                </div>
                <div className="newpendingview-userinfo">
                    <span className="newpendingview-email">{teacherInfo?.email || " "}</span>
                    <span className="newpendingview-avatar">
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
                    <div className="newpendingview-body">
                        {/* First row of four */}
                        <div className="newpendingview-row">
                            <div>
                                <span className="newpendingview-row_label">Exam Name</span>
                                <p>{selectedItem.exam_name}</p>
                            </div>
                            <div><span className="newpendingview-row_label">Subject</span><p>{selectedItem.subject}</p></div>
                            <div><span className="newpendingview-row_label">Exam Date</span><p>{selectedItem.exam_date}</p></div>
                            <div><span className="newpendingview-row_label">Class</span><p>{selectedItem.class_name}</p></div>
                        </div>
                        {/* Second row of four */}
                        <div className="newpendingview-row">
                            <div><span className="newpendingview-row_label">Start Time</span><p>{selectedItem.start_time}</p></div>
                            <div><span className="newpendingview-row_label">End Time</span><p>{selectedItem.end_time}</p></div>
                            <div><span className="newpendingview-row_label">Out of Marks</span><p>{selectedItem.class_name}</p></div>
                            <div><span className="newpendingview-row_label">Term</span><p>{selectedItem.term}</p></div>
                        </div>
                        <div className="newpendingview-create-questions-wrapper" >
                            <button className="newpendingview-create-questions" onClick={() => setShowCreateQ(true)}>
                                Create Question
                            </button>
                        </div>

                        {/* Upload area */}
                        <div className="newpendingview-upload">
                            <p className="newpendingview-upload-heading">Upload Instruction</p>

                            <div
                                className="newpendingview-dropzone"
                                onClick={() => fileInputRef.current.click()}
                            >
                                <p className="newpendingview-dropzone_clickp">
                                    Click to Upload or Drag PDF/DOC here </p>
                                <p className="newpendingview-dropzone_maxp">Max. file size 25MB</p>

                                <button
                                    type="button"
                                    className="newpendingview-upload-btn"
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
                                <div className="newpendingview-file-info">

                                    <AiOutlineFilePdf
                                        className="newpendingview-file-icon"
                                        size={20}
                                    />

                                    <span className="newpendingview-file-name">
                                        {selectedFile.name}
                                    </span>
                                    <button
                                        className="newpendingview-file-remove"
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
                    <div className="newpendingview-footer">
                        <button className="newpendingview-submit">Submit</button>
                    </div>
                </>
            ) : (
                /* If showCreateQ is true, render the “create question” screen instead */
                <NewQuestionGenerator onClose={() => setShowCreateQ(false)} />
            )}
        </div>
    );
};

export default NewPendingView;
