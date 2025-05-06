import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import './AdminQuestionassigningview.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const AdminQuestionAssigningView = ({ isOpen, onClose, selectedItem }) => {
    if (!isOpen) return null;

    const [isEditMode, setIsEditMode] = useState(false);
    const APIURL = useSelector((state) => state.APIURL.url);
    const admin_id = useSelector((state) => state.admininfo.admininfo?.admin_id);
    console.log(admin_id, "admin_id dattatata")
    console.log(selectedItem,"selectedItemselectedItem")

    const [selectedExam, setSelectedExam] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [totalMarks, setTotalMarks] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [questionPaperFile, setQuestionPaperFile] = useState({
        name: 'English.pdf',
        status: 'Completed',
        url: '#', // dummy URL
    });

    useEffect(() => {
        if (selectedItem) {
            setSelectedExam(selectedItem.exam_name);
            setSelectedYear(selectedItem.exam_date.split('-')[0]); // Assuming the year is in exam_date
            setSelectedClass(selectedItem.class_name);
            setSelectedSubject(selectedItem.subject_name);
            setTotalMarks(selectedItem.total_marks);
            setSelectedTeacher(selectedItem.teacher_name);
        }
    }, [selectedItem]);

    const handleNumberInput = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setTotalMarks(value);
        }
    };

    const customStyles = {
        control: (base, state) => ({
            ...base,
            minHeight: '48px',
            height: '48px',
            borderRadius:'8px',
            borderColor: '#757575',
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
        dropdownIndicator: (base) => ({
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
        <div className="AdminQuestionAssigning-edit-backdrop">
            <div className="AdminQuestionAssigning-edit-modal-content">
                <div className="AdminQuestionAssigning-edit-modal-header">
                    <p className="AdminQuestionAssigning-edit-modal-header-heading">Assign Teacher</p>
                    <button onClick={onClose} className="AdminQuestionAssigning-edit-close-button">&times;</button>
                </div>
                <div className="AdminQuestionAssigning-edit-modal-body">
                    <form >
                        <Row>
                            <Col className="AdminQuestionAssigning-edit-form-group-col" md={6}>
                                <div className="AdminQuestionAssigning-edit-form-group">
                                    <label className="AdminQuestionAssigning-edit-form-label">
                                        Select Name of Examination {isEditMode && <span className="AdminQuestionAssigning-edit-adding_required">*</span>}
                                    </label>
                                    <Select
                                        styles={customStyles}
                                        placeholder=""
                                        isClearable={true}
                                        isDisabled={!isEditMode}
                                    />
                                </div>
                            </Col>
                            <Col md={6} className="AdminQuestionAssigning-edit-form-group-col">
                                <div className="AdminQuestionAssigning-edit-form-group">
                                    <label className="AdminQuestionAssigning-edit-form-label">
                                        Select Year {isEditMode && <span className="AdminQuestionAssigning-edit-adding_required">*</span>}
                                    </label>
                                    <Select
                                        styles={customStyles}
                                        placeholder=""
                                        isClearable={true}
                                        isDisabled={!isEditMode}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="AdminQuestionAssigning-edit-form-group-col">
                                <div className="AdminQuestionAssigning-edit-form-group">
                                    <label className="AdminQuestionAssigning-edit-form-label">
                                        Select Class {isEditMode && <span className="AdminQuestionAssigning-edit-adding_required">*</span>}
                                    </label>
                                    <Select
                                        styles={customStyles}
                                        placeholder=""
                                        isClearable={true}
                                        isDisabled={!isEditMode}
                                    />
                                </div>
                            </Col>
                            <Col md={6} className="AdminQuestionAssigning-edit-form-group-col">
                                <div className="AdminQuestionAssigning-edit-form-group">
                                    <label className="AdminQuestionAssigning-edit-form-label">
                                        Select Subject {isEditMode && <span className="AdminQuestionAssigning-edit-adding_required">*</span>}
                                    </label>
                                    <Select
                                        styles={customStyles}
                                        placeholder=""
                                        isClearable={true}
                                        isDisabled={!isEditMode}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="AdminQuestionAssigning-edit-form-group-col">
                                <div className="AdminQuestionAssigning-edit-form-group">
                                    <label className="AdminQuestionAssigning-edit-form-label">
                                        Total Marks {isEditMode && <span className="AdminQuestionAssigning-edit-adding_required">*</span>}
                                    </label>
                                    <input
                                        type="text"
                                        min="0"
                                        className="custom-input"
                                        disabled={!isEditMode}
                                        style={{
                                            height: '50px',
                                            border: '1px solid #757575',
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
                                    />
                                </div>
                            </Col>
                            <Col md={6} className="AdminQuestionAssigning-edit-form-group-col">
                                <div className="AdminQuestionAssigning-edit-form-group">
                                    <label className="AdminQuestionAssigning-edit-form-label">
                                        Assign Teacher {isEditMode && <span className="AdminQuestionAssigning-edit-adding_required">*</span>}
                                    </label>
                                    <Select
                                        styles={customStyles}
                                        placeholder=""
                                        isClearable={true}
                                        isDisabled={!isEditMode}
                                    />
                                </div>
                            </Col>
                        </Row>
                        {questionPaperFile && (
                            <Row >
                                <Col md={12} className="AdminQuestionAssigning-edit-form-group-col">
                                    <label className="AdminQuestionAssigning-edit-form-label">Question Paper</label>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        border: '1px solid #757575',
                                        borderRadius: '8px',
                                        padding: '10px',
                                        background: '#fff',
                                        width: '100%',
                                        height:'48px,'
                                    }}>
                                        <img src="https://cdn.jsdelivr.net/gh/edent/SuperTinyIcons/images/svg/pdf.svg" alt="PDF" style={{width: 16, height: 20, marginRight: 12}} />
                                        <span style={{flex: 1, color: '#222222', fontSize: 12}}>{questionPaperFile.name}</span>
                                        <span style={{
                                            background: '#E9FFF0',
                                            color: '#04CD47',
                                            borderRadius: '8px',
                                            padding: '2px 12px',
                                            fontSize: 12,
                                            fontWeight: 500,
                                            border:'1px solid  #04CD47'
                                        }}>{questionPaperFile.status}</span>
                                    </div>
                                </Col>
                            </Row>
                        )}
                    </form>
                </div>
                <div className="AdminQuestionAssigning-edit-modal-footer">
                    <button onClick={onClose} className="AdminQuestionAssigning-edit-btn AdminQuestionAssigning-edit-btn-danger">Delete</button>
                    <button 
                        className="AdminQuestionAssigning-edit-btn AdminQuestionAssigning-edit-btn-primary"
                        onClick={() => setIsEditMode(!isEditMode)}
                    >
                        {isEditMode ? 'Save' : 'Edit'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminQuestionAssigningView;