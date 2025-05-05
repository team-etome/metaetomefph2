import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import './newevaluationadd.css';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { CloudCog, Weight } from 'lucide-react';
import { exampaperinfo } from '../../../Redux/Actions/ExamPaperInfoAction';


const NewEvaluationAdd = ({ isOpen, onClose }) => {

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
            borderColor: '#ccc',
            borderRadius: '8px',
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
            color: '#292D32',
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
    const classOptions = allExamEntries.map(entry => ({
        label: `Class ${entry.class_name} - ${entry.division}`,
        value: `${entry.class_name}|${entry.division}`
    }))


    const examDateOptions = [...new Set(allExamEntries.map(entry => entry.exam_date))]
        .map(date => ({
            label: new Date(date).toLocaleDateString("en-GB", {
                day: "2-digit", month: "short", year: "numeric"
            }),
            value: date
        }));

    // Faculty options from Redux
    const facultyOptions = teacherinfo?.adminteacherinfo?.map((teacher) => ({
        value: teacher.id,
        label: `${teacher.first_name} ${teacher.last_name}`
    })) || [];

    const handleSubmit = async () => {

        try {
            const data = {
                admin: admin_id,
                class_name: formData.className,
                division: formData.division,
                subject: formData.subject,
                teacher: formData.facultyId,
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
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
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
                                        placeholder=""      // ✅ Added to remove "Select..." text
                                        onChange={(selected) => handleInputChange('examName', selected?.value)}
                                        value={examNameOptions.find(option => option.value === formData.examName)}
                                    />
                                </div>
                            </div>

                            <div >
                                <div className="evaluationadd-form-group">
                                    <label className="evaluationadd-form-label">
                                        Year <span className="evaluationadd_required">*</span>
                                    </label>
                                    <Select
                                        options={yearOptions}
                                        styles={customStyles}
                                        isClearable={true}
                                        placeholder=""
                                        onChange={(selected) => handleInputChange('examYear', selected?.value)}
                                        value={yearOptions.find(option => option.value === formData.examYear)}
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
                                        options={subjectOptions}
                                        styles={customStyles}
                                        isClearable={true}
                                        placeholder=""
                                        onChange={(selected) => handleInputChange('subject', selected?.value)}
                                        value={subjectOptions.find(option => option.value === formData.subject)}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="evaluationadd-form-group">
                                    <label className="evaluationadd-form-label">
                                        Class <span className="evaluationadd_required">*</span>
                                    </label>
                                    <Select
                                        options={classOptions}
                                        styles={customStyles}
                                        isClearable={true}
                                        placeholder=""     // ✅ Add this line to remove "Select..." placeholder
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
                                        value={classOptions.find(option => {
                                            const [cls, div] = option.value.split('|');
                                            return cls === formData.className && div === formData.division;
                                        })}
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
                                        options={examDateOptions}
                                        styles={customStyles}
                                        isClearable={true}
                                        placeholder=""
                                        onChange={(selected) => handleInputChange('examDate', selected?.value)}
                                        value={examDateOptions.find(option => option.value === formData.examDate)}
                                    />
                                    {/* <input

                                        type="date"
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

                                    // onChange={e => setVolume(e.target.value)}
                                    /
                             
                                    /> */}
                                </div>
                            </div>
                            <div>
                                <div className="evaluationadd-form-group">
                                    <label className="evaluationadd-form-label">Deadline</label>
                                    <input
                                        type="date"
                                        min="0"
                                        value={formData.deadline}    // ✅ bind the value
                                        onChange={(e) => handleInputChange('deadline', e.target.value)}  // ✅ correct way for input field
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

                            </div>
                        </div>
                        <div className="evaluationadd-modal-body-row">
                            <div>

                                <div className="evaluationadd-form-group">
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
                    <button className="evaluationadd-btn evaluationadd-btn-primary" onClick={handleSubmit}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default NewEvaluationAdd;