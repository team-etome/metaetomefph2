import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import './newevaluationadd.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';


const NewEvaluationAdd = ({ isOpen, onClose }) => {

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
                                        // options={classOptions}
                                        styles={customStyles}
                                        placeholder=""
                                        isClearable={true}
                                        // onChange={handleClassChange}
                                    />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="evaluationadd-form-group">
                                    <label className="evaluationadd-form-label">
                                        Select Year <span className="evaluationadd_required">*</span>
                                        </label>
                                    <Select
                                        // options={mediumOptions}
                                        styles={customStyles}
                                        placeholder=""
                                        isClearable={true}
                                        // onChange={setSelectedMedium}
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
                                        // options={subjectOptions}
                                        styles={customStyles}
                                        placeholder=""
                                        isClearable={true}
                                        // onChange={setSelectedSubject}
                                    />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="evaluationadd-form-group">
                                    <label className="evaluationadd-form-label">
                                        Class <span className="evaluationadd_required">*</span>
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
                        <Row>
                            <Col md={6}>
                                <div className="evaluationadd-form-group">
                                    <label className="evaluationadd-form-label">
                                        Date of Examination <span className="evaluationadd_required">*</span>
                                        </label>
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
                                        // onChange={e => setVolume(e.target.value)}
                                    />
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