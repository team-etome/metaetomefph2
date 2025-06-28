import React, { useEffect, useState, useMemo } from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import './newevaluationview.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { Weight } from 'lucide-react';



const NewEvaluationView = ({ isOpen, onClose, selectedEvaluation }) => {
    if (!isOpen) return null;
    const APIURL = useSelector(s => s.APIURL.url);
    const admin_id = useSelector(s => s.admininfo.admininfo?.admin_id);
    const exampaper = useSelector(s => s.exampaperinfo.exampaperinfo || {});
    const teacherinfo = useSelector(s => s.adminteacherinfo.adminteacherinfo || []);
    console.log(teacherinfo, "teacherinfoteacherinfoteacherinfo")

    console.log(selectedEvaluation, "selectedEvaluationselectedEvaluationselectedEvaluation")

    // 1. One formValues object
    const [formValues, setFormValues] = useState({
        exam: '',
        year: '',
        subject: '',
        class: '',
        division: '',
        teacher: ''
    });
    const [isEditMode, setIsEditMode] = useState(false);

    // 2. Initialize from selectedEvaluation when opening or toggling edit
    useEffect(() => {
        if (!selectedEvaluation) return;
        const { exam_name, year, subject_name, class_name, division, teacher_name } = selectedEvaluation;
      
        // ← find the matching teacher record by name
        const match = teacherinfo.find(
          t => `${t.first_name} ${t.last_name}` === teacher_name
        );
      
        setFormValues({
          exam: exam_name,
          year: String(year),
          subject: subject_name,
          class: class_name,
          division,
          teacher: match ? String(match.id) : ''
        });
      }, [selectedEvaluation, teacherinfo, isEditMode]);

    // 3. Flatten exampaper into an array like [{ exam, year, subject_name, class_name, division, … }, …]
    const normalized = useMemo(() => {
        return Object.entries(exampaper).flatMap(([key, arr]) => {
            // key is "ExamName YYYY"
            const m = key.match(/^(.*)\s+(\d{4})$/);
            const exam = m ? m[1] : key;
            const year = m ? m[2] : '';
            return (arr || []).map(item => ({
                ...item,
                exam,
                year: String(year),
                class_name: item.class_name,
                division: item.division,
                subject_name: item.subject_name,
            }));
        });
    }, [exampaper]);

    // 4. Derive option lists with useMemo
    const examOptions = useMemo(
        () => Array.from(new Set(normalized.map(i => i.exam)))
            .map(ex => ({ value: ex, label: ex })),
        [normalized]
    );

    const yearOptions = useMemo(() => {
        if (!formValues.exam) return [];
        return Array.from(
            new Set(normalized.filter(i => i.exam === formValues.exam).map(i => i.year))
        ).map(y => ({ value: y, label: y }));
    }, [normalized, formValues.exam]);

    const subjectOptions = useMemo(() => {
        if (!formValues.exam || !formValues.year) return [];
        return Array.from(
            new Set(
                normalized
                    .filter(i => i.exam === formValues.exam && i.year === formValues.year)
                    .map(i => i.subject_name)
            )
        ).map(s => ({ value: s, label: s }));
    }, [normalized, formValues.exam, formValues.year]);

    const classOptions = useMemo(() => {
        if (!formValues.exam || !formValues.year || !formValues.subject) return [];
        return Array.from(
            new Set(
                normalized
                    .filter(
                        i =>
                            i.exam === formValues.exam &&
                            i.year === formValues.year &&
                            i.subject_name === formValues.subject
                    )
                    .map(i => `${i.class_name}|${i.division}`)
            )
        ).map(cd => {
            const [c, d] = cd.split('|');
            return { value: cd, label: `Class ${c} - ${d}` };
        });
    }, [normalized, formValues.exam, formValues.year, formValues.subject]);

    const facultyOptions = teacherinfo.map(t => ({
        value: String(t.id),
        label: `${t.first_name} ${t.last_name}`
    }));

    // 5. Handlers that clear downstream fields
    const handleExamChange = o =>
        setFormValues(f => ({
            ...f,
            exam: o?.value || '',
            year: '',
            subject: '',
            class: ''
        }));

    const handleYearChange = o =>
        setFormValues(f => ({
            ...f,
            year: o?.value || '',
            subject: '',
            class: ''
        }));

    const handleSubjectChange = o =>
        setFormValues(f => ({
            ...f,
            subject: o?.value || '',
            class: ''
        }));

    const handleClassChange = o => setFormValues(f => ({ ...f, class: o?.value || '' }));

    const handleTeacherChange = o => setFormValues(f => ({ ...f, teacher: o?.value || '' }));

    const handleSave = async () => {
        // make sure everything is selected
        const { exam, year, subject, class: cls, division, teacher } = formValues;
        if (!exam || !year || !subject || !cls || !teacher) {
            return Swal.fire({ icon: 'warning', title: 'Incomplete', text: '…' });
        }
        const payload = {
            exam_name: exam,
            year,
            subject_name: subject,
            class_name: cls,
            division,
            teacher_id: teacher,
            admin_id
        };

        try {
            const response = await axios.put(
                `${APIURL}/api/evaluationadding/${selectedEvaluation.id}`,
                payload
            );
            // success
            Swal.fire({
                icon: 'success',
                title: 'Saved',
                text: 'Evaluation updated successfully.'
            });
            setIsEditMode(false);
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'Save failed',
                text: err.response?.data?.message || err.message
            });
        }
    };






    const customStyles = {
        control: (base, state) => ({
            ...base,
            minHeight: '48px',
            height: '48px',
            width: '100%',
            borderRadius: '8px',
            borderColor: state.isFocused ? '#526D82' : '#ccc',
            boxShadow: 'none',
            '&:hover': {
                borderColor: '#526D82',

            },
            backgroundColor: '#fff',
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
            maxHeight: '200px',
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
                                        options={examOptions}
                                        value={examOptions.find(o => o.value === formValues.exam) || null}
                                        onChange={handleExamChange}
                                        styles={customStyles}
                                        isDisabled={!isEditMode}
                                        placeholder="Select exam..."
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="evaluationview-form-group">
                                    <label className="evaluationview-form-label">

                                        Year {isEditMode && <span className="evaluationview_required">*</span>}
                                    </label>
                                    <Select
                                        options={yearOptions}
                                        value={yearOptions.find(o => o.value === formValues.year) || null}
                                        onChange={handleYearChange}
                                        styles={customStyles}
                                        isDisabled={!isEditMode}
                                        placeholder="Select year..."
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
                                        options={subjectOptions}
                                        value={subjectOptions.find(o => o.value === formValues.subject) || null}
                                        onChange={handleSubjectChange}
                                        styles={customStyles}
                                        isDisabled={!isEditMode}
                                        placeholder="Select subject..."
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="evaluationview-form-group">
                                    <label className="evaluationview-form-label">
                                        Class {isEditMode && <span className="evaluationview_required">*</span>}
                                    </label>
                                    <Select
                                        options={classOptions}
                                        value={
                                            classOptions.find(
                                              o => o.value === `${formValues.class}|${formValues.division}`
                                            ) || null
                                          }
                                          onChange={o => {
                                            const [cls, div] = (o?.value || '').split('|');
                                            setFormValues(f => ({ ...f, class: cls, division: div }));
                                          }}
                                        
                                        styles={customStyles}
                                        isDisabled={!isEditMode}
                                        placeholder="Select class..."
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
                                        value={selectedEvaluation?.start_date || ''}
                                        disabled={!isEditMode}
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
                                            outline: "none",
                                            backgroundColor: '#fff',
                                            cursor: isEditMode ? 'pointer' : 'not-allowed'
                                        }}
                                    // disabled={!isEditMode}

                                    />
                                </div>
                            </div>
                            <div>
                                <div className="evaluationview-form-group">
                                    <label className="evaluationview-form-label">Deadline</label>
                                    <input
                                        type="date"
                                        min="0"
                                        value={formValues.endDate || selectedEvaluation.end_date}
                                        onChange={e => setFormValues(f => ({ ...f, endDate: e.target.value }))}
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

                                    // disabled={!isEditMode}

                                    />
                                </div>
                            </div>
                        </div>
                        <div className="evaluationview-modal-body-row">
                            <div>
                                <div className="evaluationview-form-group-select-faculty">
                                    <label className="evaluationview-form-label">

                                        Faculty {isEditMode && <span className="evaluationview_required">*</span>}
                                    </label>
                                    <Select
                                        options={facultyOptions}
                                        value={facultyOptions.find(o => o.value === formValues.teacher) || null}
                                        onChange={handleTeacherChange}
                                        styles={customStyles}
                                        isDisabled={!isEditMode}
                                        placeholder="Select faculty..."
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
                        onClick={isEditMode ? handleSave : () => setIsEditMode(true)}
                    >
                        {isEditMode ? 'Save' : 'Edit'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewEvaluationView;