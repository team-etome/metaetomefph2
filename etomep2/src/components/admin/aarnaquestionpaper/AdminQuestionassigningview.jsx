import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import './AdminQuestionassigningview.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const AdminQuestionAssigningView = ({ isOpen, onClose, selectedItem,onDeleted }) => {
    if (!isOpen) return null;

    console.log(selectedItem, "selectedItemselectedItemselectedItemselectedItem")

    // Redux slices
    const timetableData = useSelector(s => s.timetabledataquestionpaper.list ?? []);
    const teacherinfo = useSelector(s => s.adminteacherinfo);
    const teachers = teacherinfo?.adminteacherinfo || [];

    // Local state
    const [isEditMode, setIsEditMode] = useState(false);

    const [examOptions, setExamOptions] = useState([]);
    const [yearOptions, setYearOptions] = useState([]);
    const [classOptions, setClassOptions] = useState([]);
    const [subjOptions, setSubjOptions] = useState([]);

    const [selectedExam, setSelectedExam] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [totalMarks, setTotalMarks] = useState('');
    const [questionPaperFile, setQuestionPaperFile] = useState({
        name: 'English.pdf',
        status: 'Completed',
        url: '#', // dummy URL
    });
    const [selectedData, setSelectedData] = useState(null);
    const APIURL = useSelector(state => state.APIURL.url);
    // 1️ Build the four master dropdowns once timetableData arrives


    useEffect(() => {
        if (!selectedExam || !selectedYear || !selectedClass || !selectedSubject) {
            setSelectedData(null);
            return;
        }
        const match = timetableData.find(item =>
            item.exam_name === `${selectedExam} ${selectedYear}` &&
            String(item.year) === String(selectedYear) &&
            String(item.class) === String(selectedClass) &&
            item.subject === selectedSubject
        );
        setSelectedData(match?.id ?? null);
    }, [selectedExam, selectedYear, selectedClass, selectedSubject, timetableData]);



    useEffect(() => {
        if (!timetableData.length) return;

        setExamOptions(
            Array.from(new Set(timetableData.map(i => i.exam_name)))
                .map(v => ({ value: v, label: v }))
        );
        // ✅ use the separate `year` property
        setYearOptions(
            Array.from(new Set(
                timetableData
                    .map(i => i.year)      // number or string
                    .filter(Boolean)       // drop null/undefined
                    .map(String)           // ensure string
            ))
                .map(v => ({ value: v, label: v }))
        );

        setClassOptions(Array.from(new Set(timetableData.map(i => i.class)))
            .map(v => ({ value: v, label: String(v) })));

        setSubjOptions(Array.from(new Set(timetableData.map(i => i.subject)))
            .map(v => ({ value: v, label: v })));
    }, [timetableData]);

    // 2️ When a row is clicked, populate the form state from selectedItem
    // useEffect(() => {
    //     if (!selectedItem) return;
    //     setSelectedExam(selectedItem.exam_name);
    //     const year = selectedItem.exam_date.split('-')[0];
    //     setSelectedYear(year);
    //     setSelectedClass(String(selectedItem.class));
    //     setSelectedSubject(selectedItem.subject);
    //     setTotalMarks(String(selectedItem.total_marks));
    //     setSelectedTeacher(selectedItem.teacher_name);

    // }, [selectedItem]);

    // 3️ Save handler (you can wire this up exactly as you had it)
    const handleSave = async () => {
        if (!isEditMode) {
            setIsEditMode(true);
            return;
        }

        if (!selectedData || !selectedTeacher || !totalMarks) {
            return Swal.fire({
                icon: 'warning',
                title: 'Missing Fields',
                text: 'Please fill out all fields before saving.'
            });
        }
        const formData = {
            timetable: selectedData,
            teacher: selectedTeacher,
            total_marks: totalMarks
        };

        try {
            await axios.put(
                `${APIURL}/api/questionpaper/${selectedItem.id}`,
                formData
            );
            setIsEditMode(false);
            Swal.fire({ icon: 'success', title: 'Saved!' });
        } catch (err) {
            console.error('Error updating question paper:', err);
            Swal.fire({
                icon: 'error',
                title: 'Save failed',
                text: err.response?.data?.message || err.message,
            });
        }
    };


    const handleDelete = async () => {
        // 1. Ask for confirmation
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "This will permanently delete the question paper entry.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "Cancel",
          reverseButtons: true,
        });
      
        // 2. If they confirmed, do the delete
        if (result.isConfirmed) {
          try {
            await axios.put(
              `${APIURL}/api/questionpaper/${selectedItem.id}`,
              {} // or any payload your API expects
            );
      
            Swal.fire({
              icon: "success",
              title: "Deleted",
              text: "Question paper entry has been deleted.",
            });
      
            onDeleted(selectedItem.id);  // notify parent
            onClose();                   // close modal
          } catch (err) {
            console.error("Delete failed", err);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: err.response?.data?.message || "Failed to delete entry.",
            });
          }
        }
      };
      




    useEffect(() => {
        if (selectedItem) {
            const m = selectedItem.exam_name.match(/^(.*)\s+(\d{4})$/);
            if (m) {
                setSelectedExam(m[1].trim());
                setSelectedYear(m[2]);
            } else {
                setSelectedExam(selectedItem.exam_name);
                setSelectedYear('');
            }
            setSelectedClass(selectedItem.class_name);
            setSelectedSubject(selectedItem.subject_name);
            setTotalMarks(selectedItem.total_marks);
            setSelectedTeacher(selectedItem.teacher)
        }
    }, [selectedItem]);
    const teacherOptions = teachers.map(t => ({
        value: t.id,
        label: `${t.first_name} ${t.last_name}`
    }));

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
            borderRadius: '8px',
            borderColor: '#757575',
            // boxShadow: state.isFocused ? '0 0 0 1px #526D82' : 0,
            boxShadow: state.isFocused ? 0 : 0,
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
                                        placeholder=""
                                        options={examOptions}
                                        value={examOptions.find(o => o.value === selectedExam)}
                                        onChange={o => setSelectedExam(o?.value)}
                                        isDisabled={!isEditMode}
                                        styles={customStyles}
                                        isClearable
                                    />
                                </div>
                            </Col>
                            <Col md={6} className="AdminQuestionAssigning-edit-form-group-col">
                                <div className="AdminQuestionAssigning-edit-form-group">
                                    <label className="AdminQuestionAssigning-edit-form-label">
                                        Select Year {isEditMode && <span className="AdminQuestionAssigning-edit-adding_required">*</span>}
                                    </label>
                                    <Select
                                        options={yearOptions}
                                        value={yearOptions.find(o => o.value === selectedYear)}
                                        onChange={o => setSelectedYear(o?.value)}
                                        isDisabled={!isEditMode}
                                        styles={customStyles}
                                        isClearable
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
                                        options={classOptions}
                                        value={classOptions.find(o => o.value === selectedClass)}
                                        onChange={o => setSelectedClass(o?.value)}
                                        isDisabled={!isEditMode}
                                        styles={customStyles}
                                        isClearable
                                    />
                                </div>
                            </Col>
                            <Col md={6} className="AdminQuestionAssigning-edit-form-group-col">
                                <div className="AdminQuestionAssigning-edit-form-group">
                                    <label className="AdminQuestionAssigning-edit-form-label">
                                        Select Subject {isEditMode && <span className="AdminQuestionAssigning-edit-adding_required">*</span>}
                                    </label>
                                    <Select
                                        options={subjOptions}
                                        value={subjOptions.find(o => o.value === selectedSubject)}
                                        onChange={o => setSelectedSubject(o?.value)}
                                        isDisabled={!isEditMode}
                                        styles={customStyles}
                                        isClearable
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
                                        value={totalMarks}
                                        onChange={e => /^\d*$/.test(e.target.value) && setTotalMarks(e.target.value)}
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
                                        options={teacherOptions}
                                        value={teacherOptions.find(o => o.value === selectedTeacher)}  // match by ID
                                        onChange={o => setSelectedTeacher(o.value)}
                                        isDisabled={!isEditMode}
                                        styles={customStyles}
                                        isClearable
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
                                        height: '48px,'
                                    }}>
                                        <img src="https://cdn.jsdelivr.net/gh/edent/SuperTinyIcons/images/svg/pdf.svg" alt="PDF" style={{ width: 16, height: 20, marginRight: 12 }} />
                                        <span style={{ flex: 1, color: '#222222', fontSize: 12 }}>{questionPaperFile.name}</span>
                                        <span style={{
                                            background: '#E9FFF0',
                                            color: '#04CD47',
                                            borderRadius: '8px',
                                            padding: '2px 12px',
                                            fontSize: 12,
                                            fontWeight: 500,
                                            border: '1px solid  #04CD47'
                                        }}>{questionPaperFile.status}</span>
                                    </div>
                                </Col>
                            </Row>
                        )}
                    </form>
                </div>
                <div className="AdminQuestionAssigning-edit-modal-footer">
                    <button onClick={handleDelete} className="AdminQuestionAssigning-edit-btn AdminQuestionAssigning-edit-btn-danger">Delete</button>
                    <button
                        className="AdminQuestionAssigning-edit-btn AdminQuestionAssigning-edit-btn-primary"
                        onClick={() => {
                            if (isEditMode) {
                                handleSave();
                            } else {
                                setIsEditMode(true);
                            }
                        }}
                    >
                        {isEditMode ? 'Save' : 'Edit'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminQuestionAssigningView;