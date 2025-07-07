import React from 'react';
import { IoClose } from 'react-icons/io5';
import './newmcqquestionsviewer.css';

const NewMcqQuestionsViewer = ({ mcq, onClose }) => {
    if (!mcq) return null;

    return (
        <div className="newmcqquestionsviewer-overlay" onClick={onClose}>
            <div className="newmcqquestionsviewer-modal" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="newmcqquestionsviewer-header">
                    <div className="newmcqquestionsviewer-header-left">
                        <h3 className="newmcqquestionsviewer-title">MCQ Questions</h3>
                        <p className="newmcqquestionsviewer-subtitle">{mcq.exam_name}</p>
                    </div>
                    <button className="newmcqquestionsviewer-close" onClick={onClose}>
                        <IoClose size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="newmcqquestionsviewer-body">
                    {mcq.questions && mcq.questions.length > 0 ? (
                        mcq.questions.map((section, sectionIndex) => (
                            <div key={sectionIndex} className="newmcqquestionsviewer-section">
                                <h4 className="newmcqquestionsviewer-section-title">
                                    {section.name || `Section ${sectionIndex + 1}`}
                                </h4>
                                <div className="newmcqquestionsviewer-questions-list">
                                    {section.questions && section.questions.map((question, questionIndex) => (
                                        <div key={questionIndex} className="newmcqquestionsviewer-question-item">
                                            <div className="newmcqquestionsviewer-question-header">
                                                <span className="newmcqquestionsviewer-question-number">
                                                    Question {question.id || questionIndex + 1}
                                                </span>
                                            </div>
                                            <div className="newmcqquestionsviewer-question-content">
                                                {question.questionImage && question.questionImage.startsWith('data:image') ? (
                                                    <img 
                                                        src={question.questionImage} 
                                                        alt={`Question ${question.id || questionIndex + 1}`}
                                                        className="newmcqquestionsviewer-question-image"
                                                    />
                                                ) : (
                                                    <p className="newmcqquestionsviewer-question-text">{question.question}</p>
                                                )}
                                            </div>
                                            
                                            {/* Options */}
                                            {question.options && question.options.length > 0 && (
                                                <div className="newmcqquestionsviewer-options">
                                                    <span className="newmcqquestionsviewer-options-label">Options:</span>
                                                    <div className="newmcqquestionsviewer-options-list">
                                                        {question.options.map((option, optionIndex) => (
                                                            <div key={optionIndex} className="newmcqquestionsviewer-option">
                                                                <span className="newmcqquestionsviewer-option-label">
                                                                    {String.fromCharCode(65 + optionIndex)}. 
                                                                </span>
                                                                <span className="newmcqquestionsviewer-option-text">
                                                                    {option}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Answer Key */}
                                            {question.answerKey && (
                                                <div className="newmcqquestionsviewer-answer">
                                                    <span className="newmcqquestionsviewer-answer-label">Correct Answer:</span>
                                                    <span className="newmcqquestionsviewer-answer-text">
                                                        {question.answerKey}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="newmcqquestionsviewer-empty">
                            <p>No questions found for this MCQ.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NewMcqQuestionsViewer; 