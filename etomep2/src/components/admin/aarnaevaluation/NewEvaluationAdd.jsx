import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import './newevaluationadd.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';


const NewEvaluationAdd = ({ isOpen, onClose }) => {


    const exampaper = useSelector((state) => state.exampaperinfo.exampaperinfo);
    const teacherinfo = useSelector((state) => state.adminteacherinfo);

    console.log(exampaper, 'exampaper')

    if (!isOpen) return null;
    const APIURL = useSelector((state) => state.APIURL.url);
    // console.log(APIURL,"apiurl dattatata")
    const admin_id = useSelector((state) => state.admininfo.admininfo?.admin_id);
    const admininfo = useSelector((state) => state.admininfo);

    const customStyles = {
        control: (base, state) => ({
            ...base,
            minHeight: '50px',
            height: '50px',
            borderColor: '#ccc',
            boxShadow: state.isFocused ? '0 0 0 1px #526D82' : 0,
            '&:hover': {
                borderColor: '#526D82',
            }
        }),
        valueContainer: (base) => ({
            ...base,
            height: '50px',
            padding: '0 6px'
        }),
        dropdownIndicator: (base) => ({
            ...base,
            color: '#292D32', // Change the color of the dropdown arrow
            padding: '0 8px',
            alignItems: 'center',
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

    const examNameOptions = Object.keys(exampaper || {}).map((examName) => ({
        label: examName,
        value: examName
    }));

    // Get all exams in one flat list
    const allExamEntries = Object.values(exampaper || {}).flat();

    // Year options
    const yearOptions = [...new Set(allExamEntries.map(entry =>
        new Date(entry.exam_date).getFullYear()
    ))].map(year => ({ label: year.toString(), value: year.toString() }));

    // Subject options
    const subjectOptions = [...new Set(allExamEntries.map(entry => entry.subject_name))]
        .map(subject => ({ label: subject, value: subject }));

    // Class options
    const classOptions = [...new Set(allExamEntries.map(entry => entry.class_name))]
        .map(cls => ({ label: `Class ${cls}`, value: cls }));


    const examDateOptions = [...new Set(allExamEntries.map(entry => entry.exam_date))]
        .map(date => ({
            label: new Date(date).toLocaleDateString("en-GB", {
                day: "2-digit", month: "short", year: "numeric"
            }),
            value: date
        }));

    // Faculty options
    //   const facultyOptions = [...new Set(allExamEntries.map(entry => entry.teacher_name))]
    //     .map(teacher => ({ label: teacher, value: teacher }));

    return (
        <div className="evaluationadd-backdrop">
            <div className="evaluationadd-modal-content">
                <div className="evaluationadd-modal-header">
                    <h5>Evaluation Scheduling</h5>
                    <button onClick={onClose} className="evaluationadd-close-button">&times;</button>
                </div>
                <div className="evaluationadd-modal-body">
                    <form>
                        <Row>
                            <Col md={6} >
                                <div className="evaluationadd-form-group" >
                                    <label className="evaluationadd-form-label" >
                                        Select Name of Examination <span className="evaluationadd_required">*</span>
                                    </label>
                                    <Select
                                        options={examNameOptions}
                                        styles={customStyles}
                                        placeholder=""
                                        isClearable={true}
                                    // onChange={handleExamNameChange}
                                    />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="evaluationadd-form-group">
                                    <label className="evaluationadd-form-label">
                                        Select Year <span className="evaluationadd_required">*</span>
                                    </label>
                                    <Select
                                        options={yearOptions}
                                        styles={customStyles}
                                        placeholder=""
                                        isClearable={true}
                                    // onChange={handleYearChange}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <div className="evaluationadd-form-group">
                                    <label className="evaluationadd-form-label">
                                        Select Subject <span className="evaluationadd_required">*</span>
                                    </label>
                                    <Select
                                        options={subjectOptions}
                                        styles={customStyles}
                                        placeholder=""
                                        isClearable={true}
                                    />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="evaluationadd-form-group">
                                    <label className="evaluationadd-form-label">
                                        Class <span className="evaluationadd_required">*</span>
                                    </label>
                                    <Select
                                        options={classOptions}
                                        styles={customStyles}
                                        placeholder=""
                                        isClearable={true}
                                    />

                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <div className="evaluationadd-form-group">
                                    <label className="evaluationadd-form-label">
                                        Date of Examination <span className="evaluationadd_required">*</span>
                                    </label>
                                    <Select
                                        options={examDateOptions}
                                        styles={customStyles}
                                        placeholder="Select Date"
                                        isClearable={true}
                                    // onChange={e => setSelectedDate(e?.value)}
                                    />
                                    {/* <input
                                        type="date"
                                        min="0"
                                        className="custom-input"
                                        style={{
                                            height: '50px',
                                            border: '1px solid #ccc',
                                            borderRadius: '4px',
                                            padding: '0 10px',
                                            fontSize: '16px',
                                            color: '#526D82',
                                            width: '100%',
                                            boxSizing: 'border-box',
                                            outline: "none"
                                        }}
                             
                                    /> */}
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="evaluationadd-form-group">
                                    <label className="evaluationadd-form-label">Deadline</label>
                                    <input
                                        type="date"
                                        min="0"
                                        className="custom-input"
                                        style={{
                                            height: '50px',
                                            border: '1px solid #ccc',
                                            borderRadius: '4px',
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
                        </Row>
                        <Row>
                            <Col md={12}>
                                <div className="evaluationadd-form-group">
                                    <label className="evaluationadd-form-label">
                                        Select Faculty <span className="evaluationadd_required">*</span>
                                    </label>
                                    <Select
                                        // options={textbook}
                                        styles={customStyles}
                                        placeholder=""
                                        isClearable={true}
                                    // value={filteredSubjects.find(opt => opt.value === selectedSubject)}
                                    // onChange={(selected) => setTextbook(selected?.value || null)}
                                    />

                                </div>
                            </Col>
                        </Row>
                    </form>
                </div>
                <div className="evaluationadd-modal-footer">
                    <button className="evaluationadd-btn evaluationadd-btn-secondary">Clear</button>
                    <button className="evaluationadd-btn evaluationadd-btn-primary">Save</button>
                </div>
            </div>
        </div>
    );
};

export default NewEvaluationAdd;