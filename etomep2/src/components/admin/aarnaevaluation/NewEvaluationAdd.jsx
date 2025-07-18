import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import './newevaluationadd.css';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { CloudCog, Weight } from 'lucide-react';
import { exampaperinfo } from '../../../Redux/Actions/ExamPaperInfoAction';


const NewEvaluationAdd = ({ isOpen, onClose, onAddSuccess }) => {

    const dispatch = useDispatch()

    const APIURL = useSelector((state) => state.APIURL.url);
    const admininfo = useSelector((state) => state.admininfo);
    const admin_id = useSelector((state) => state.admininfo.admininfo?.admin_id);
    
    


    useEffect(() => {
        const fetchQuestionPapers = async () => {
            try {
                const response = await axios.get(`${APIURL}/api/questionpaper/${admin_id}`);
                const rawData = response.data.question_papers || {};
                dispatch(exampaperinfo(rawData)); // 🛑 This line saves into redux
                console.log(rawData, "Fetched and stored in Redux ✅");
            } catch (error) {
                console.error("Error fetching question papers ❌", error);
            }
        };
    
        fetchQuestionPapers();
    }, [APIURL, admin_id, dispatch]);


    const exampaper = useSelector((state) => state.exampaperinfo.exampaperinfo);
    const teacherinfo = useSelector((state) => state.adminteacherinfo);
    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [formData, setFormData] = useState({
        examName: '',
        examYear: '',
        examDate: '',
        subject: '',
        className: '',
        facultyId: '',
        deadline: '',
    });

    console.log(formData, 'form dataaa')

    console.log(exampaper, 'exampaper')

    if (!isOpen) return null;

    const customStyles = {
        control: (base, state) => ({
            ...base,
            minHeight: '48px',
            height: '48px',
            width: '100%',
            borderRadius: '8px',
            borderColor: state.isFocused ? '#526D82' : '#757575',
            boxShadow: 'none',
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
            color: '#292D32',
            padding: '0 8px',
            alignItems: 'center',
            svg: {
                width: '24px',
                height: '24px'
            }
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

    // Get all exam entries from exampaper
    const getAllExamEntries = () => {
        if (!exampaper) return [];
        return Object.values(exampaper).flat();
    };

    // Step 1: Exam Name Options (all available exam names)
    const examNameOptions = [...new Set(
        Object.keys(exampaper || {}).map((examName) => {
            return examName.replace(/\s+\d{4}$/, '');
        })
    )].map((examNameWithoutYear) => ({
        label: examNameWithoutYear,
        value: examNameWithoutYear
    }));

    // Step 2: Year Options (filtered based on selected exam name)
    const getYearOptions = () => {
        if (!formData.examName) return [];
        
        const filteredEntries = getAllExamEntries().filter(entry => {
            const entryExamName = Object.keys(exampaper).find(key => 
                exampaper[key].some(item => item.id === entry.id)
            );
            return entryExamName && entryExamName.replace(/\s+\d{4}$/, '') === formData.examName;
        });

        return [...new Set(filteredEntries.map(entry =>
        new Date(entry.exam_date).getFullYear()
    ))].map(year => ({ label: year.toString(), value: year.toString() }));
    };

    // Step 3: Subject Options (filtered based on selected exam name and year)
    const getSubjectOptions = () => {
        if (!formData.examName || !formData.examYear) return [];
        
        const filteredEntries = getAllExamEntries().filter(entry => {
            const entryExamName = Object.keys(exampaper).find(key => 
                exampaper[key].some(item => item.id === entry.id)
            );
            const examNameMatches = entryExamName && entryExamName.replace(/\s+\d{4}$/, '') === formData.examName;
            const yearMatches = new Date(entry.exam_date).getFullYear().toString() === formData.examYear;
            return examNameMatches && yearMatches;
        });

        return [...new Set(filteredEntries.map(entry => entry.subject_name))]
        .map(subject => ({ label: subject, value: subject }));
    };

    // Step 4: Class Options (filtered based on selected exam name, year, and subject)
    const getClassOptions = () => {
        if (!formData.examName || !formData.examYear || !formData.subject) return [];
        
        const filteredEntries = getAllExamEntries().filter(entry => {
            const entryExamName = Object.keys(exampaper).find(key => 
                exampaper[key].some(item => item.id === entry.id)
            );
            const examNameMatches = entryExamName && entryExamName.replace(/\s+\d{4}$/, '') === formData.examName;
            const yearMatches = new Date(entry.exam_date).getFullYear().toString() === formData.examYear;
            const subjectMatches = entry.subject_name === formData.subject;
            return examNameMatches && yearMatches && subjectMatches;
        });

        return filteredEntries.map(entry => ({
        label: `Class ${entry.class_name} - ${entry.division}`,
        value: `${entry.class_name}|${entry.division}`
        }));
    };

    // Step 5: Exam Date Options (filtered based on all previous selections)
    const getExamDateOptions = () => {
        if (!formData.examName || !formData.examYear || !formData.subject || !formData.className) return [];
        
        const filteredEntries = getAllExamEntries().filter(entry => {
            const entryExamName = Object.keys(exampaper).find(key => 
                exampaper[key].some(item => item.id === entry.id)
            );
            const examNameMatches = entryExamName && entryExamName.replace(/\s+\d{4}$/, '') === formData.examName;
            const yearMatches = new Date(entry.exam_date).getFullYear().toString() === formData.examYear;
            const subjectMatches = entry.subject_name === formData.subject;
            const classMatches = entry.class_name === formData.className && entry.division === formData.division;
            return examNameMatches && yearMatches && subjectMatches && classMatches;
        });

        return [...new Set(filteredEntries.map(entry => entry.exam_date))]
        .map(date => ({
            label: new Date(date).toLocaleDateString("en-GB", {
                day: "2-digit", month: "short", year: "numeric"
            }),
            value: date
        }));
    };

    // Faculty options from Redux
    const facultyOptions = teacherinfo?.adminteacherinfo?.map((teacher) => ({
        value: teacher.id,
        label: `${teacher.first_name} ${teacher.last_name}`
    })) || [];

    const handleSubmit = async () => {

        try {
            // Check if all required fields are filled
            const requiredFields = [];
            if (!formData.examName) requiredFields.push("Name of Examination");
            if (!formData.examYear) requiredFields.push("Year");
            if (!formData.subject) requiredFields.push("Subject");
            if (!formData.className) requiredFields.push("Class");
            if (!formData.examDate) requiredFields.push("Date of Examination");
            if (!formData.facultyId) requiredFields.push("Select Faculty");

            if (requiredFields.length > 0) {
                Swal.fire({
                    title: 'Required Fields Missing',
                    text: `Please fill in the following required fields: ${requiredFields.join(', ')}`,
                    icon: 'warning',
                    confirmButtonText: 'OK'
                });
                return;
            }

            const data = {
                admin: admin_id,
                exam_name: formData.examName,
                year: formData.examYear,
                class_name: formData.className,
                division: formData.division,
                subject_name: formData.subject,
                teacher_id: formData.facultyId,
                exam_date: formData.examDate,
                end_date: formData.deadline
            };



            const response = await axios.post(`${APIURL}/api/evaluationadding`, data);

            if (response.data) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Evaluation scheduled successfully!'
                });
                if (onAddSuccess) onAddSuccess();
                onClose();
            }
        } catch (error) {

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to schedule evaluation. Please try again.'
            });
        }
    };


    const handleInputChange = (field, value) => {
        // Clear dependent fields when a parent field changes
        let newFormData = { ...formData, [field]: value };
        
        if (field === 'examName') {
            newFormData = {
                ...newFormData,
                examYear: '',
                subject: '',
                className: '',
                division: '',
                examDate: ''
            };
        } else if (field === 'examYear') {
            newFormData = {
                ...newFormData,
                subject: '',
                className: '',
                division: '',
                examDate: ''
            };
        } else if (field === 'subject') {
            newFormData = {
                ...newFormData,
                className: '',
                division: '',
                examDate: ''
            };
        } else if (field === 'className') {
            newFormData = {
                ...newFormData,
                examDate: ''
            };
        }
        
        setFormData(newFormData);
    };

    // Function to check if all required fields are filled
    const isFormComplete = () => {
        if (!formData.examName || formData.examName.trim() === '') {
            return false;
        }
        if (!formData.examYear || formData.examYear.trim() === '') {
            return false;
        }
        if (!formData.subject || formData.subject.trim() === '') {
            return false;
        }
        if (!formData.className || formData.className.trim() === '') {
            return false;
        }
        if (!formData.examDate || formData.examDate.trim() === '') {
            return false;
        }
        if (!formData.facultyId || formData.facultyId === '') {
            return false;
        }
        return true;
    };

    return (
        <div className="evaluationadd-backdrop">
            <div className="evaluationadd-modal-content">
                <div className="evaluationadd-modal-header">
                    <p className="evaluationadd-modal-header-heading">Evaluation Scheduling</p>
                    <button onClick={onClose} className="evaluationadd-close-button">&times;</button>
                </div>
                <div className="evaluationadd-modal-body">
                    <form>
                        <div className="evaluationadd-modal-body-row">
                            <div>
                                <div className="evaluationadd-form-group">
                                    <label className="evaluationadd-form-label">
                                        Name of Examination <span className="evaluationadd_required">*</span>
                                    </label>
                                    <Select
                                        options={examNameOptions}
                                        styles={customStyles}
                                        isClearable={true}
                                        placeholder=""   
                                        onChange={(selected) => handleInputChange('examName', selected?.value)}
                                        value={formData.examName ? examNameOptions.find(option => option.value === formData.examName) : null}
                                    />
                                </div>
                            </div>

                            <div >
                                <div className="evaluationadd-form-group">
                                    <label className="evaluationadd-form-label">
                                        Year <span className="evaluationadd_required">*</span>
                                    </label>
                                    <Select
                                        options={getYearOptions()}
                                        styles={customStyles}
                                        isClearable={true}
                                        placeholder=""
                                        onChange={(selected) => handleInputChange('examYear', selected?.value)}
                                        value={formData.examYear ? getYearOptions().find(option => option.value === formData.examYear) : null}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="evaluationadd-modal-body-row">
                            <div>
                                <div className="evaluationadd-form-group">
                                    <label className="evaluationadd-form-label">
                                        Subject <span className="evaluationadd_required">*</span>
                                    </label>
                                    <Select
                                        options={getSubjectOptions()}
                                        styles={customStyles}
                                        isClearable={true}
                                        placeholder=""
                                        onChange={(selected) => handleInputChange('subject', selected?.value)}
                                        value={formData.subject ? getSubjectOptions().find(option => option.value === formData.subject) : null}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="evaluationadd-form-group">
                                    <label className="evaluationadd-form-label">
                                        Class <span className="evaluationadd_required">*</span>
                                    </label>
                                    <Select
                                        options={getClassOptions()}
                                        styles={customStyles}
                                        isClearable={true}
                                        placeholder=""
                                        onChange={(selected) => {
                                            if (selected?.value) {
                                                const [cls, div] = selected.value.split('|');
                                                setFormData(prev => ({
                                                    ...prev,
                                                    className: cls,
                                                    division: div
                                                }));
                                            } else {
                                                setFormData(prev => ({
                                                    ...prev,
                                                    className: '',
                                                    division: ''
                                                }));
                                            }
                                        }}
                                        value={formData.className && formData.division ? getClassOptions().find(option => {
                                            const [cls, div] = option.value.split('|');
                                            return cls === formData.className && div === formData.division;
                                        }) : null}
                                    />

                                </div>
                            </div>
                        </div>
                        <div className="evaluationadd-modal-body-row">
                            <div>
                                <div className="evaluationadd-form-group">
                                    <label className="evaluationadd-form-label">
                                        Date of Examination <span className="evaluationadd_required">*</span>
                                    </label>

                                    <Select
                                        options={getExamDateOptions()}
                                        styles={customStyles}
                                        isClearable={true}
                                        placeholder=""
                                        onChange={(selected) => handleInputChange('examDate', selected?.value)}
                                        value={formData.examDate ? getExamDateOptions().find(option => option.value === formData.examDate) : null}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="evaluationadd-form-group">
                                    <label className="evaluationadd-form-label">Deadline</label>
                                    <input
                                        type="date"
                                        min="0"
                                        value={formData.deadline}   
                                        onChange={(e) => handleInputChange('deadline', e.target.value)}
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
                                    />
                                </div>

                            </div>
                        </div>
                        <div className="evaluationadd-modal-body-row" >
                            <div>
                                <div className="evaluationadd-form-group-select-faculty">
                                    <label className="evaluationadd-form-label">
                                        Select Faculty <span className="evaluationadd_required">*</span>
                                    </label>
                                    <Select
                                        options={facultyOptions}
                                        styles={customStyles}
                                        placeholder=""
                                        isClearable={true}
                                        onChange={(selected) => handleInputChange('facultyId', selected?.value)}
                                        value={facultyOptions.find(option => option.value === formData.facultyId)}
                                    />

                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="evaluationadd-modal-footer">
                    <button className="evaluationadd-btn evaluationadd-btn-secondary" onClick={() => setFormData({
                        examName: '',
                        examYear: '',
                        examDate: '',
                        subject: '',
                        className: '',
                        facultyId: '',
                    })}>Clear</button>
                    <button 
                        className="evaluationadd-btn evaluationadd-btn-primary" 
                        onClick={handleSubmit}
                        style={{
                            backgroundColor: isFormComplete() ? '#2162B2' : '#bcbcbc',
                            color: isFormComplete() ? '#fff' : '#fff',
                            border: isFormComplete() ? '1px solid #2162B2' : '1px solid #bcbcbc',
                            cursor: 'pointer'
                        }}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewEvaluationAdd;