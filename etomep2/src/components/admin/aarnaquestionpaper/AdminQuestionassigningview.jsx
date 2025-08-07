import React, { useEffect, useState, useMemo } from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import './AdminQuestionassigningview.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const AdminQuestionAssigningView = ({ isOpen, onClose, selectedItem, onDeleted }) => {
    console.log(selectedItem,"selectedItemselectedItemselectedItem")
    const APIURL = useSelector(state => state.APIURL.url);
    const timetableData = useSelector(s => s.timetabledataquestionpaper.list ?? []);
    console.log(timetableData, "timetableDatatimetableDatatimetableDatatimetableData")
    const teachers = useSelector(s => s.adminteacherinfo.adminteacherinfo ?? []);
    console.log(selectedItem, "selectedItemselectedItemselectedItem")
    const [isEditMode, setIsEditMode] = useState(false);
    const [showQuestions, setShowQuestions] = useState(false);

    // 1. Single state object for the form
    const [formValues, setFormValues] = useState({
        exam: '',
        year: null,
        class: '',
        subject: '',
        totalMarks: '',
        teacher: null,
    });

    // 2. Initialize from selectedItem
    useEffect(() => {
        if (!selectedItem) return;
        // split "annual exam 2025" into ["annual exam","2025"]
        const m = selectedItem.exam_name.match(/^(.*)\s+(\d{4})$/);
        const examBase = m ? m[1].trim() : selectedItem.exam_name;
        const yearNum = m ? Number(m[2]) : null;

        setFormValues({
            exam: examBase,
            year: yearNum,
            class: selectedItem.class_name,
            subject: selectedItem.subject_name,
            totalMarks: selectedItem.total_marks,
            teacher: selectedItem.teacher,
        });
    }, [selectedItem]);

    // 3. Derive option lists with useMemo

    // First, normalize each item to pull out a base exam name
    const normalized = useMemo(() =>
        timetableData.map(item => ({
            ...item,
            examBase: item.exam_name.replace(/\s+\d{4}$/, '')
        })),
        [timetableData]
    );

    const examinations = useMemo(() =>
        Array.from(new Set(normalized.map(i => i.examBase)))
            .map(v => ({ value: v, label: v })),
        [normalized]
    );

    const filteredYears = useMemo(() => {
        if (!formValues.exam) return [];
        return Array.from(new Set(
            normalized
                .filter(i => i.examBase === formValues.exam)
                .map(i => i.year)
        ))
            .map(y => ({ value: y, label: String(y) }));
    }, [normalized, formValues.exam]);

    // 2) And when you build filteredClasses, make sure you pull the same string:
    const filteredClasses = useMemo(() => {
        const { exam, year } = formValues;
        if (!exam || !year) return [];

        return Array.from(
            new Set(
                normalized
                    .filter(i => i.examBase === exam && i.year === year)
                    .map(i => i.class)              // ← this is the raw "7" string
            )
        ).map(clsValue => ({
            value: clsValue,
            label:
                normalized.find(i => i.class === clsValue)?.class_name
                || `Class ${clsValue}`
        }));
    }, [normalized, formValues]);


    const filteredSubjects = useMemo(() => {
        const { exam, year, class: cls } = formValues;
        if (!exam || !year || !cls) return [];

        // pull from `i.class` and `i.subject`
        const setOfSubjects = new Set(
            normalized
                .filter(i =>
                    i.examBase === exam &&
                    i.year === year &&
                    i.class === cls
                )
                .map(i => i.subject)
        );

        return Array.from(setOfSubjects).map(subj => ({
            value: subj,
            label: subj
        }));
    }, [normalized, formValues]);


    // 4. Find the matching timetable ID on the fly
    const matched = useMemo(() =>
        normalized.find(i =>
            i.examBase === formValues.exam &&
            i.year === formValues.year &&
            i.class_name === formValues.class &&
            i.subject_name === formValues.subject
        ),
        [normalized, formValues]
    );
    const timetableId = matched?.id;

    const selectedData = useMemo(() => {
        const { exam, year, class: cls, subject } = formValues;
        if (!exam || !year || !cls || !subject) return null;
        const match = timetableData.find(item =>
          item.exam_name === exam         &&  // just the base name
          Number(item.year)   === year     &&  // numeric year
          item.class          === cls      &&  // class string, e.g. "7"
          item.subject        === subject     // subject string, e.g. "english"
        );
      
        console.log('Found match:', match);
        return match?.id ?? null;
      }, [
        timetableData,
        formValues.exam,
        formValues.year,
        formValues.class,
        formValues.subject
      ]);
      
    // Function to check if all required fields are filled
    const isFormComplete = () => {
        if (!selectedData) {
            return false;
        }
        if (!formValues.teacher) {
            return false;
        }
        if (!formValues.totalMarks || formValues.totalMarks.trim() === '') {
            return false;
        }
        return true;
    };

    const handleSave = async () => {
        if (!isEditMode) {
            setIsEditMode(true);
            return;
        }

        if (!selectedData || !formValues.teacher || !formValues.totalMarks) {
            return Swal.fire({
                icon: 'warning',
                title: 'Missing Fields',
                text: 'Please fill out all fields before saving.'
            });
        }
        // console.log(selectedData,"selectedData || !formValues.teacher || !formValues.totalMarks")
        const formData = {
            timetable: selectedData,
            teacher: formValues.teacher,
            total_marks: formValues.totalMarks,
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
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This will permanently delete the question paper entry.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(
                    `${APIURL}/api/questionpaper/${selectedItem.id}`,
                    {}
                );

                Swal.fire({
                    icon: "success",
                    title: "Deleted",
                    text: "Question paper entry has been deleted.",
                });

                onDeleted(selectedItem.id);
                onClose();
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

    // Questions Modal Component
    const QuestionsModal = () => {
        if (!showQuestions) return null;

        return (
            <div className="AdminQuestionAssigning-questions-modal-overlay-main" onClick={() => setShowQuestions(false)}>
                <div className="AdminQuestionAssigning-questions-modal-content" onClick={e => e.stopPropagation()}>
                    <button
                        className="AdminQuestionAssigning-questions-modal-close"
                        onClick={() => setShowQuestions(false)}
                        aria-label="Close"
                    >
                        ×
                    </button>
                    <div className="AdminQuestionAssigning-questions-modal-header">
                        <h3>Exam Questions</h3>
                    </div>
                    <div className="AdminQuestionAssigning-questions-modal-body">
                        {selectedItem?.question?.map((section, sectionIndex) => (
                            <div key={sectionIndex} className="AdminQuestionAssigning-questions-section">
                                <h4 className="AdminQuestionAssigning-questions-section-title">
                                    {section.sectionName || `Section ${sectionIndex + 1}`}
                                </h4>
                                <div className="AdminQuestionAssigning-questions-list">
                                    {section.questions?.map((question, questionIndex) => (
                                        <div key={questionIndex} className="AdminQuestionAssigning-question-item">
                                            <div className="AdminQuestionAssigning-question-header">
                                                <span className="AdminQuestionAssigning-question-number">
                                                    Question {question.question_number || questionIndex + 1}
                                                </span>
                                                <span className="AdminQuestionAssigning-question-marks">
                                                    ({question.marks} marks)
                                                </span>
                                            </div>
                                            <div className="AdminQuestionAssigning-question-content">
                                                {question.question && question.question.startsWith('data:image') ? (
                                                    <img 
                                                        src={question.question} 
                                                        alt={`Question ${question.question_number || questionIndex + 1}`}
                                                        className="AdminQuestionAssigning-question-image"
                                                    />
                                                ) : (
                                                    <p className="AdminQuestionAssigning-question-text">{question.question}</p>
                                                )}
                                            </div>
                                            {question.answer && (
                                                <div className="AdminQuestionAssigning-question-answer">
                                                    <span className="AdminQuestionAssigning-answer-label">Answer:</span>
                                                    {question.answer && question.answer.startsWith('data:image') ? (
                                                        <img 
                                                            src={question.answer} 
                                                            alt={`Answer ${question.question_number || questionIndex + 1}`}
                                                            className="AdminQuestionAssigning-answer-image"
                                                        />
                                                    ) : (
                                                        <span className="AdminQuestionAssigning-answer-text">{question.answer}</span>
                                                    )}
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
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginTop: '4px'
        }),
        menuList: (base) => ({
            ...base,
            maxHeight: '150px',
            padding: '4px 0'
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? '#f0f0f0' : '#fff',
            color: '#526D82',
            padding: '8px 12px',
            cursor: 'pointer',
            '&:active': {
                backgroundColor: '#e6e6e6',
            }
        }),
    };



    return (
        <div className="AdminQuestionAssigning-edit-backdrop">
            <div className="AdminQuestionAssigning-edit-modal-content">
                <div className="AdminQuestionAssigning-edit-modal-header" >
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
                                        options={examinations}
                                        value={examinations.find(o => o.value === formValues.exam) || null}
                                        onChange={opt =>
                                            setFormValues(f => ({ ...f, exam: opt?.value || '' }))
                                            
                                        }
                                        isDisabled={!isEditMode}
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
                                        styles={customStyles}
                                        options={filteredYears}
                                        value={filteredYears.find(o => o.value === formValues.year) || null}
                                        onChange={opt =>
                                            setFormValues(f => ({ ...f, year: opt?.value || null }))
                                        }
                                        isDisabled={!isEditMode}
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
                                        options={filteredClasses}
                                        value={filteredClasses.find(o => o.value === formValues.class) || null}
                                        onChange={opt =>
                                            setFormValues(f => ({ ...f, class: opt?.value || '' }))
                                        }
                                        isClearable
                                        isDisabled={!isEditMode}
                                        styles={customStyles}
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
                                        options={filteredSubjects}
                                        value={filteredSubjects.find(o => o.value === formValues.subject) || null}
                                        onChange={opt =>
                                            setFormValues(f => ({ ...f, subject: opt?.value || '' }))
                                        }
                                        isDisabled={!isEditMode}
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
                                        style={{
                                            height: '50px',
                                            border: '1px solid #757575',
                                            borderRadius: '8px',
                                            padding: '0 10px',
                                            fontSize: '16px',
                                            color: '#526D82',
                                            width: '100%',
                                            boxSizing: 'border-box',
                                            outline: "none"
                                        }}
                                        value={formValues.totalMarks}

                                        onChange={e =>
                                            /^[0-9]*$/.test(e.target.value) &&
                                            setFormValues(f => ({ ...f, totalMarks: e.target.value }))
                                        }
                                    />
                                </div>
                            </Col>
                            <Col md={6} className="AdminQuestionAssigning-edit-form-group-col">
                                <div className="AdminQuestionAssigning-edit-form-group">
                                    <label className="AdminQuestionAssigning-edit-form-label">
                                        Assign Teacher {isEditMode && <span className="AdminQuestionAssigning-edit-adding_required">*</span>}
                                    </label>
                                    <Select
                                        options={teachers.map(t => ({
                                            value: t.id,
                                            label: `${t.first_name} ${t.last_name}`
                                        }))}
                                        value={teachers
                                            .map(t => ({ value: t.id, label: `${t.first_name} ${t.last_name}` }))
                                            .find(o => o.value === formValues.teacher) || null}
                                        onChange={opt =>
                                            setFormValues(f => ({ ...f, teacher: opt?.value || null }))
                                        }
                                        styles={customStyles}
                                        placeholder=""
                                        isClearable={true}
                                        isDisabled={!isEditMode}
                                    // onChange={(selected) => setSelectedTeacher(selected?.value || null)}
                                    />
                                </div>
                            </Col>
                        </Row>
                        {/* Show View Question button only if questions exist */}
                        {selectedItem?.question && selectedItem.question.length > 0 && (
                            <Row>
                                <Col md={12} className="AdminQuestionAssigning-edit-form-group-col">
                                    <div className="AdminQuestionAssigning-edit-form-group">
                                        <label className="AdminQuestionAssigning-edit-form-label">Question Paper</label>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            border: '1px solid #757575',
                                            borderRadius: '8px',
                                            padding: '10px',
                                            background: '#fff',
                                            width: '100%',
                                            height: '48px',
                                            cursor: 'pointer'
                                        }} onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setShowQuestions(true);
                                        }}>
                                            <button 
                                                type="button"
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    color: '#526D82',
                                                    fontSize: '16px',
                                                    fontWeight: '500',
                                                    cursor: 'pointer',
                                                    padding: '0',
                                                    margin: '0'
                                                }}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setShowQuestions(true);
                                                }}
                                            >
                                                View Question
                                            </button>
                                        </div>
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
                        style={{
                            backgroundColor: isEditMode && isFormComplete() ? '#2162B2' : isEditMode ? '#bcbcbc' : '#2162B2',
                            color: '#fff',
                            border: isEditMode && isFormComplete() ? '1px solid #2162B2' : isEditMode ? '1px solid #bcbcbc' : '1px solid #2162B2',
                            cursor: isEditMode && !isFormComplete() ? 'not-allowed' : 'pointer'
                        }}
                        disabled={isEditMode && !isFormComplete()}
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
            
            {/* Questions Modal */}
            <QuestionsModal />
        </div>
    );
};

export default AdminQuestionAssigningView;