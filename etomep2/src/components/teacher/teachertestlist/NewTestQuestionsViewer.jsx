import React from 'react';
import { IoClose } from 'react-icons/io5';
import './newtestquestionsviewer.css';

const NewTestQuestionsViewer = ({ test, onClose }) => {
    if (!test) return null;

    return (
        <div className="newtestquestionsviewer-overlay" onClick={onClose}>
            <div className="newtestquestionsviewer-modal" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="newtestquestionsviewer-header">
                    <div className="newtestquestionsviewer-header-left">
                        <h3 className="newtestquestionsviewer-title">Test Questions</h3>
                        <p className="newtestquestionsviewer-subtitle">{test.exam_name}</p>
                    </div>
                    <button className="newtestquestionsviewer-close" onClick={onClose}>
                        <IoClose size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="newtestquestionsviewer-body">
                    {test.questions && test.questions.length > 0 ? (
                        test.questions.map((section, sectionIndex) => (
                            <div key={sectionIndex} className="newtestquestionsviewer-section">
                                <h4 className="newtestquestionsviewer-section-title">
                                    {section.sectionName || `Section ${sectionIndex + 1}`}
                                </h4>
                                <div className="newtestquestionsviewer-questions-list">
                                    {section.questions && section.questions.map((question, questionIndex) => (
                                        <div key={questionIndex} className="newtestquestionsviewer-question-item">
                                            <div className="newtestquestionsviewer-question-header">
                                                <span className="newtestquestionsviewer-question-number">
                                                    Question {question.question_number || questionIndex + 1}
                                                </span>
                                                <span className="newtestquestionsviewer-question-marks">
                                                    ({question.marks} marks)
                                                </span>
                                            </div>
                                            <div className="newtestquestionsviewer-question-content">
                                                {question.question && question.question.startsWith('data:image') ? (
                                                    <img 
                                                        src={question.question} 
                                                        alt={`Question ${question.question_number || questionIndex + 1}`}
                                                        className="newtestquestionsviewer-question-image"
                                                    />
                                                ) : (
                                                    <p className="newtestquestionsviewer-question-text">{question.question}</p>
                                                )}
                                            </div>
                                            {question.answer && question.answer !== 'Image not captured' && (
                                                <div className="newtestquestionsviewer-question-answer">
                                                    <span className="newtestquestionsviewer-answer-label">Answer:</span>
                                                    {question.answer.startsWith('data:image') ? (
                                                        <img 
                                                            src={question.answer} 
                                                            alt={`Answer ${question.question_number || questionIndex + 1}`}
                                                            className="newtestquestionsviewer-answer-image"
                                                        />
                                                    ) : (
                                                        <span className="newtestquestionsviewer-answer-text">{question.answer}</span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="newtestquestionsviewer-empty">
                            <p>No questions found for this test.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NewTestQuestionsViewer; 