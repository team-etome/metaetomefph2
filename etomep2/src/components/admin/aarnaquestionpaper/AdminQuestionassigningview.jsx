import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import './AdminQuestionassigningview.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const AdminQuestionAssigningView = ({ isOpen, onClose, selectedItem }) => {
    if (!isOpen) return null;

    const APIURL = useSelector((state) => state.APIURL.url);
    // console.log(APIURL,"apiurl dattatata")
    const admin_id = useSelector((state) => state.admininfo.admininfo?.admin_id);
    console.log(admin_id, "admin_id dattatata")
    console.log(selectedItem,"selectedItemselectedItem")

    const [selectedExam, setSelectedExam] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [totalMarks, setTotalMarks] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState(null);


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
            borderColor: '#ccc',
            boxShadow: state.isFocused ? '0 0 0 1px #526D82' : 0,
            '&:hover': {
                borderColor: '#526D82',
            }
        }),
        valueContainer: (base) => ({
            ...base,
            height: '48px',
            padding: '0 6px'
        }),
        dropdownIndicator: (base) => ({
            ...base,
            color: '#292D32', // Change the color of the dropdown arrow
            padding: '0 8px',
            alignItems: 'center',
            // fontWeight: '200',
            svg: {
                width: '24px',
                height: '24px'
            }
        }),
        indicatorSeparator: () => ({
            display: 'none' // This removes the line (separator) before the dropdown arrow
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
                                        Select Name of Examination <span className="AdminQuestionAssigning-edit-adding_required">*</span>
                                        </label>
                                    <Select
                                        styles={customStyles}
                                        placeholder=""
                                        isClearable={true}
                                    />
                                </div>
                            </Col>
                            <Col md={6} className="AdminQuestionAssigning-edit-form-group-col">
                                <div className="AdminQuestionAssigning-edit-form-group">
                                    <label className="AdminQuestionAssigning-edit-form-label">
                                        Select Year <span className="AdminQuestionAssigning-edit-adding_required">*</span>
                                        </label>
                                    <Select
                                        styles={customStyles}
                                        placeholder=""
                                        isClearable={true}
                                    
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="AdminQuestionAssigning-edit-form-group-col">
                                <div className="AdminQuestionAssigning-edit-form-group">
                                    <label className="AdminQuestionAssigning-edit-form-label">
                                        Select Class <span className="AdminQuestionAssigning-edit-adding_required">*</span>
                                        </label>
                                    <Select
                                        styles={customStyles}
                                        placeholder=""
                                        isClearable={true}
                                       
                                    />
                                </div>
                            </Col>
                            <Col md={6} className="AdminQuestionAssigning-edit-form-group-col">
                                <div className="AdminQuestionAssigning-edit-form-group">
                                    <label className="AdminQuestionAssigning-edit-form-label">
                                        Select Subject <span className="AdminQuestionAssigning-edit-adding_required">*</span> 
                                        </label>
                                    <Select
                                        styles={customStyles}
                                        placeholder=""
                                        isClearable={true}
                                     
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="AdminQuestionAssigning-edit-form-group-col">
                                <div className="AdminQuestionAssigning-edit-form-group">
                                    <label className="AdminQuestionAssigning-edit-form-label">
                                        Total Marks <span className="AdminQuestionAssigning-edit-adding_required">*</span>
                                        </label>
                                    <input
                                        type="text"
                                        min="0"
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
                                            outline: "none"
                                        }}
                                    />
                                </div>
                            </Col>
                            <Col md={6} className="AdminQuestionAssigning-edit-form-group-col">
                                <div className="AdminQuestionAssigning-edit-form-group">
                                    <label className="AdminQuestionAssigning-edit-form-label">
                                        Assign Teacher <span className="AdminQuestionAssigning-edit-adding_required">*</span>
                                        </label>
                                    <Select
                                        styles={customStyles}
                                        placeholder=""
                                        isClearable={true}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </form>
                </div>
                <div className="AdminQuestionAssigning-edit-modal-footer">
                    <button onClick={onClose} className="AdminQuestionAssigning-edit-btn AdminQuestionAssigning-edit-btn-danger">Delete</button>
                    <button className="AdminQuestionAssigning-edit-btn AdminQuestionAssigning-edit-btn-primary">Edit</button>
                </div>
            </div>
        </div>
    );
};

export default AdminQuestionAssigningView;