import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import './newevaluationview.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { Weight } from 'lucide-react';



const NewEvaluationView = ({ isOpen, onClose, selectedEvaluation }) => {
    const [isEditMode, setIsEditMode] = useState(false);



    console.log(selectedEvaluation, "selected evaluation")



    if (!isOpen) return null;
    const APIURL = useSelector((state) => state.APIURL.url);
    // console.log(APIURL,"apiurl dattatata")
    const admin_id = useSelector((state) => state.admininfo.admininfo?.admin_id);
    const admininfo = useSelector((state) => state.admininfo);

    const customStyles = {
        control: (base, state) => ({
            ...base,
            minHeight: '48px',
            height: '48px',
            width: '100%',
            borderColor: '#ccc',
            borderRadius: '8px',
            boxShadow: state.isFocused ? '0 0 0 1px #526D82' : 0,
            '&:hover': {
                borderColor: '#526D82',
            },
            backgroundColor: '#fff',
            cursor: isEditMode ? 'pointer' : 'not-allowed'
        }),
        valueContainer: (base) => ({
            ...base,
            height: '48px',
            padding: '0 6px'
        }),
        dropdownIndicator: (base, state) => ({
            ...base,
            color: '#292D32',
            padding: '0 8px',
            alignItems: 'center',
            svg: {
                width: '24px',
                height: '24px'
            },
            display: isEditMode ? 'flex' : 'none'
        }),
        indicatorSeparator: () => ({
            display: 'none'
        }),
        placeholder: (base) => ({
            ...base,
            color: '#526D82',
            fontSize: '16px'
        }),
        singleValue: (base) => ({
            ...base,
            color: '#526D82',
            fontSize: '16px'
        }),
        menu: (base) => ({
            ...base,
            zIndex: 1000,
            maxHeight: '150px',
            overflowY: 'auto',
            fontSize: '14px',
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? '#f0f0f0' : '#fff',
            color: '#526D82',
            '&:active': {
                backgroundColor: '#e6e6e6',
            }
        }),
    };


    return (
        <div className="evaluationview-backdrop">
            <div className="evaluationview-modal-content">
                <div className="evaluationview-modal-header">
                    <h5>Evaluation Scheduling</h5>
                    <button onClick={onClose} className="evaluationview-close-button">&times;</button>
                </div>
                <div className="evaluationview-modal-body">
                    <form>
                        <div className="evaluationview-modal-body-row">
                            <div >
                                <div className="evaluationview-form-group">
                                    <label className="evaluationview-form-label">

                                        Name of Examination {isEditMode && <span className="evaluationview_required">*</span>}
                                    </label>
                                    <Select
                                        styles={customStyles}
                                        value={{ label: selectedEvaluation.exam_name, value: selectedEvaluation.exam_name }}

                                        isDisabled={!isEditMode}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="evaluationview-form-group">
                                    <label className="evaluationview-form-label">

                                        Year {isEditMode && <span className="evaluationview_required">*</span>}
                                    </label>
                                    <Select
                                        styles={customStyles}
                                        value={{ label: selectedEvaluation.year, value: selectedEvaluation.year }}

                                        isDisabled={!isEditMode}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="evaluationview-modal-body-row">
                            <div>
                                <div className="evaluationview-form-group">
                                    <label className="evaluationview-form-label">

                                        Subject {isEditMode && <span className="evaluationview_required">*</span>}
                                    </label>
                                    <Select
                                        styles={customStyles}
                                        value={selectedEvaluation ? { label: selectedEvaluation.subject_name, value: selectedEvaluation.subject_name } : null}

                                        isDisabled={!isEditMode}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="evaluationview-form-group">
                                    <label className="evaluationview-form-label">
                                        Class {isEditMode && <span className="evaluationview_required">*</span>}
                                    </label>
                                    <Select
                                        styles={customStyles}

                                        value={{
                                            label: `Class ${selectedEvaluation.class_name} - ${selectedEvaluation.division}`,
                                            value: `${selectedEvaluation.class_name}${selectedEvaluation.division}`
                                        }}

                                        isDisabled={!isEditMode}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="evaluationview-modal-body-row">
                            <div>
                                <div className="evaluationview-form-group">
                                    <label className="evaluationview-form-label">
                                        Date of Examination {isEditMode && <span className="evaluationview_required">*</span>}
                                    </label>
                                    <input
                                        type="date"
                                        value={selectedEvaluation.start_date || ''}
                                        disabled={!isEditMode}
                                        className="custom-input"
                                        style={{
                                            height: '50px',
                                            border: '1px solid #ccc',
                                            borderRadius: '8px',
                                            padding: '0 10px',
                                            fontSize: '16px',
                                            color: '#526D82',
                                            width: '100%',

                                            boxSizing: 'border-box',
                                            outline: "none",
                                            backgroundColor: '#fff',
                                            cursor: isEditMode ? 'pointer' : 'not-allowed'
                                        }}
                                        disabled={!isEditMode}

                                    />
                                </div>
                            </div>
                            <div>
                                <div className="evaluationview-form-group">
                                    <label className="evaluationview-form-label">Deadline</label>
                                    <input
                                        type="date"
                                        min="0"
                                        value={selectedEvaluation?.start_date || ''}
                                        disabled={!isEditMode}
                                        className="custom-input"
                                        style={{
                                            height: '50px',
                                            border: '1px solid #ccc',
                                            borderRadius: '8px',
                                            padding: '0 10px',
                                            fontSize: '16px',
                                            color: '#526D82',
                                            width: '100%',
                                            boxSizing: 'border-box',
                                            outline: "none",
                                            backgroundColor: '#fff',
                                            cursor: isEditMode ? 'pointer' : 'not-allowed'
                                        }}

                                        disabled={!isEditMode}

                                    />
                                </div>
                            </div>
                        </div>
                        <div className="evaluationview-modal-body-row">
                            <div>
                                <div className="evaluationview-form-group">
                                    <label className="evaluationview-form-label">

                                        Faculty {isEditMode && <span className="evaluationview_required">*</span>}
                                    </label>
                                    <Select
                                        value={selectedEvaluation ? { label: selectedEvaluation.teacher_name, value: selectedEvaluation.teacher_name } : null}

                                        styles={customStyles}
                                        placeholder=""
                                        isClearable={true}
                                        isDisabled={!isEditMode}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="evaluationview-modal-footer">
                    <button className="evaluationview-btn evaluationview-btn-danger">Delete</button>

                    <button

                        className="evaluationview-btn evaluationview-btn-primary"
                        onClick={() => setIsEditMode(!isEditMode)}
                    >
                        {isEditMode ? 'Save' : 'Edit'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewEvaluationView;