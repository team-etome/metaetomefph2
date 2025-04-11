import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import './AdminQuestionassigningview.css';

const AdminQuestionAssigningview = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

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
            zIndex: 1000
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
        <div className="AdminQuestionAssigning-backdrop">
            <div className="AdminQuestionAssigning-modal-content">
                <div className="AdminQuestionAssigning-modal-header">
                    <h5>Assign Teacher</h5>
                    <button onClick={onClose} className="AdminQuestionAssigning-close-button">&times;</button>
                </div>
                <div className="AdminQuestionAssigning-modal-body">
                    <form>
                        <Row>
                            <Col md={6}>
                                <div className="AdminQuestionAssigning-form-group">
                                    <label className="AdminQuestionAssigning-form-label">Select Name of Examination</label>
                                    <Select
                                        options={[{ value: 'Annual Examination', label: 'Annual Examination' }]}
                                        styles={customStyles}
                                        placeholder="Select Examination"
                                        isClearable={true}
                                    />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="AdminQuestionAssigning-form-group">
                                    <label className="AdminQuestionAssigning-form-label">Select Year</label>
                                    <Select
                                        options={[{ value: '2025', label: '2025' }]}
                                        styles={customStyles}
                                        placeholder="Select Year"
                                        isClearable={true}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <div className="AdminQuestionAssigning-form-group">
                                    <label className="AdminQuestionAssigning-form-label">Select Subject</label>
                                    <Select
                                        options={[{ value: 'English', label: 'English' }]}
                                        styles={customStyles}
                                        placeholder="Select Subject"
                                        isClearable={true}
                                    />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="AdminQuestionAssigning-form-group">
                                    <label className="AdminQuestionAssigning-form-label">Select Class</label>
                                    <Select
                                        options={[{ value: '5', label: '5' }]}
                                        styles={customStyles}
                                        placeholder="Select Class"
                                        isClearable={true}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <div className="AdminQuestionAssigning-form-group">
                                    <label className="AdminQuestionAssigning-form-label">Assign Teacher</label>
                                    <Select
                                        options={[{ value: 'Bindu', label: 'Bindu' }]}
                                        styles={customStyles}
                                        placeholder="Select Teacher"
                                        isClearable={true}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </form>
                </div>
                <div className="AdminQuestionAssigning-modal-footer">
                    <button onClick={onClose} className="AdminQuestionAssigning-btn AdminQuestionAssigning-btn-secondary">Clear</button>
                    <button onClick={onClose} className="AdminQuestionAssigning-btn AdminQuestionAssigning-btn-danger">Delete</button>
                    <button onClick={onClose} className="AdminQuestionAssigning-btn AdminQuestionAssigning-btn-primary">Save</button>
                </div>
            </div>
        </div>
    );
};

export default AdminQuestionAssigningview;