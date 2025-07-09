// src/components/newcompletedview.jsx
import React, { useRef, useState } from 'react';
import './newcompletedview.css';
import { AiOutlineFilePdf } from 'react-icons/ai';
import { FaArrowLeft } from "react-icons/fa6";
// import NewPendingCreateQuestion from './NewPendingCreateQuestion';
import NewQuestionGenerator from '../teacherquestiongenerator/NewQuestionGenerator';
import { useSelector } from 'react-redux';

const NewCompletedView = ({ selectedItemCompleted, onBack }) => {
    console.log(selectedItemCompleted, "selectedItemCompletedselectedItemCompleted")
    const [selectedFile, setSelectedFile] = useState(null);
    const [showCreateQ, setShowCreateQ] = useState(false);
    const [showPdf, setShowPdf] = useState(false);
    const [showQuestions, setShowQuestions] = useState(false);
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

    // Questions Modal Component
    const QuestionsModal = () => {
        if (!showQuestions) return null;

        return (
            <div className="newcompletedview-questions-modal-overlay" onClick={() => setShowQuestions(false)}>
                <div className="newcompletedview-questions-modal-content" onClick={e => e.stopPropagation()}>
                    <button
                        className="newcompletedview-questions-modal-close"
                        onClick={() => setShowQuestions(false)}
                        aria-label="Close"
                    >
                        ×
                    </button>
                    <div className="newcompletedview-questions-modal-header">
                        <h3>Exam Questions</h3>
                    </div>
                    <div className="newcompletedview-questions-modal-body">
                        {selectedItemCompleted?.questions?.map((section, sectionIndex) => (
                            <div key={sectionIndex} className="newcompletedview-questions-section">
                                <h4 className="newcompletedview-questions-section-title">
                                    {section.sectionName || `Section ${sectionIndex + 1}`}
                                </h4>
                                <div className="newcompletedview-questions-list">
                                    {section.questions?.map((question, questionIndex) => (
                                        <div key={questionIndex} className="newcompletedview-question-item">
                                            <div className="newcompletedview-question-header">
                                                <span className="newcompletedview-question-number">
                                                    Question {question.question_number || questionIndex + 1}
                                                </span>
                                                <span className="newcompletedview-question-marks">
                                                    ({question.marks} marks)
                                                </span>
                                            </div>
                                            <div className="newcompletedview-question-content">
                                                {question.question && question.question.startsWith('data:image') ? (
                                                    <img 
                                                        src={question.question} 
                                                        alt={`Question ${question.question_number || questionIndex + 1}`}
                                                        className="newcompletedview-question-image"
                                                    />
                                                ) : (
                                                    <p className="newcompletedview-question-text">{question.question}</p>
                                                )}
                                            </div>
                                            {question.answer && (
                                                <div className="newcompletedview-question-answer">
                                                    <span className="newcompletedview-answer-label">Answer:</span>
                                                    <span className="newcompletedview-answer-text">{question.answer}</span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="newpendingdetail-container">
            {/* Header */}
            <div className="newcompletedview-header">
                <div className="newcompletedview-header-left">
                    <button className="newcompletedview-close" onClick={onBack}>
                        <FaArrowLeft size={24} />
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
                                <p>{selectedItemCompleted?.exam_name}</p>
                            </div>
                            <div><span className="newcompletedview-row_label">Subject</span><p>{selectedItemCompleted?.subject_name}</p></div>
                            <div><span className="newcompletedview-row_label">Exam Date</span><p>{selectedItemCompleted?.exam_date}</p></div>
                            <div><span className="newcompletedview-row_label">Class</span><p>{selectedItemCompleted?.class_name}</p></div>
                        </div>
                        {/* Second row of four */}
                        <div className="newcompletedview-row">
                            <div><span className="newcompletedview-row_label">Start Time</span><p>{selectedItemCompleted?.start_time}</p></div>
                            <div><span className="newcompletedview-row_label">End Time</span><p>{selectedItemCompleted?.end_time}</p></div>
                            <div><span className="newcompletedview-row_label">Out of Marks</span><p>{selectedItemCompleted?.out_of_marks}</p></div>
                            <div><span className="newcompletedview-row_label">Term</span><p>{selectedItemCompleted?.term}</p></div>
                        </div>
                        <div className="newcompletedview-create-questions-wrapper" >
                            <button className="newcompletedview-create-questions" onClick={() => setShowQuestions(true)}>
                                View Question
                            </button>
                        </div>

                        {/* PDF icon and file name, click to toggle viewer */}
                        {selectedItemCompleted?.instruction && (
                            <div className="newcompletedview-upload">
                                <p className="newcompletedview-upload-heading">Instruction PDF</p>
                                <div
                                    className="newcompletedview-file-info"
                                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                                    onClick={() => setShowPdf(true)}
                                >
                                    <AiOutlineFilePdf className="newcompletedview-file-icon" size={20} />
                                    <span className="newcompletedview-file-name">
                                        {(() => {
                                            const url = selectedItemCompleted.instruction;
                                            const file = url.split('/').pop().split('?')[0];
                                            return file;
                                        })()}
                                    </span>
                                </div>
                                {/* Modal for PDF */}
                                {showPdf && (
                                    <div className="newcompletedview-pdf-modal-overlay" onClick={() => setShowPdf(false)}>
                                        <div className="newcompletedview-pdf-modal-content" onClick={e => e.stopPropagation()}>
                                            <button
                                                className="newcompletedview-pdf-modal-close"
                                                onClick={() => setShowPdf(false)}
                                                aria-label="Close"
                                            >
                                                ×
                                            </button>
                                            <div className="newcompletedview-pdf-modal-header">
                                                <h3>Instruction PDF</h3>
                                            </div>
                                            <div className="newcompletedview-pdf-modal-body">
                                                <iframe
                                                    src={selectedItemCompleted.instruction}
                                                    title="Instruction PDF"
                                                    className="newcompletedview-pdf-iframe"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="newcompletedview-footer">
                        {/* <button className="newcompletedview-submit">Submit</button> */}
                    </div>

                    {/* Questions Modal */}
                    <QuestionsModal />
                </>
            ) : (
                /* If showCreateQ is true, render the "create question" screen instead */
                <NewQuestionGenerator onClose={() => setShowCreateQ(false)} />
            )}
        </div>
    );
};

export default NewCompletedView;
