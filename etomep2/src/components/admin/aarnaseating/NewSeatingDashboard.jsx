import React, { useEffect, useState, useRef } from 'react';
import './newseatingdashboard.css';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import dayjs from 'dayjs';
import { BiFilterAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import NewSeatingDashboardView from './NewSeatingDashboardView';
import first from "../../../assets/IMG_first.png"
import first_selected from "../../../assets/IMG_first_selected.png"
import second from "../../../assets/IMG_second.png"
import second_selected from "../../../assets/IMG_second_selected.png"
import { BsFillPersonFill } from "react-icons/bs";
import { RiSearchLine } from "react-icons/ri";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { exampaperinfo } from '../../../Redux/Actions/ExamPaperInfoAction';
import Select from 'react-select';
import classIcon from '../../../assets/class.jpg';
import subjectIcon from '../../../assets/subject.jpg';
import facultyIcon from '../../../assets/faculty.jpg';
import deadlineIcon from '../../../assets/deadline.jpg';
import Swal from 'sweetalert2';


const NewSeatingDashboard = () => {
    const APIURL = useSelector((state) => state.APIURL.url);
    const admin_id = useSelector((state) => state.admininfo.admininfo?.admin_id);

    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [selectedExamName, setSelectedExamName] = useState("");
    const [selectedExamYear, setSelectedExamYear] = useState("");
    const [selectedExamDate, setSelectedExamDate] = useState("");

    const [selectedExamType, setSelectedExamType] = useState("");
    const [selectedFilterYear, setSelectedFilterYear] = useState("");

    const facultyDropdownRef = useRef(null);
    const [facultyDropdownOpen, setFacultyDropdownOpen] = useState(false);


    // const [showFilterPopup, setShowFilterPopup] = useState(false);
    // const [activeFilter, setActiveFilter] = useState(null);
    // const [showFilterList, setShowFilterList] = useState(false);
    // const [selectedFilterValue, setSelectedFilterValue] = useState('');
    // const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        const onClickOutside = e => {
            if (
                facultyDropdownRef.current &&
                !facultyDropdownRef.current.contains(e.target)
            ) {
                setFacultyDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', onClickOutside);
        return () => document.removeEventListener('mousedown', onClickOutside);
    }, []);

    const [teachers, setTeachers] = useState([]);


    const dispatch = useDispatch()


    useEffect(() => {
        const fetchTeacherData = async () => {
            try {
                const response = await axios.get(`${APIURL}/api/teacherdetails/${admin_id}`);
                const teacherData = response.data;
                console.log(teacherData, "teacherData list ")
                const teacherOptions = teacherData.map((teacher) => ({
                    value: teacher.id,
                    label: `${teacher.first_name} ${teacher.last_name}`
                }));

                setTeachers(teacherOptions);
            } catch (error) {
                console.error("Error fetching teacher data:", error);
            }
        };
        fetchTeacherData();
    }, [APIURL, admin_id]);

    const [examData, setExamData] = useState([]);
    const [filteredExamData, setFilteredExamData] = useState([]);

    console.log(examData, "examaaaaaa")


    const [seatingDetails, setSeatingDetails] = useState([])
    const [filteredSeatingDetails, setFilteredSeatingDetails] = useState([])


    const fetchSeatingData = async () => {
        setIsLoading(true); // Start loading
        try {
            const response = await axios.get(`${APIURL}/api/seating/${admin_id}`);
            console.log("Seating Data", response.data);

            // Store the fetched data in state
            setSeatingDetails(response.data);
            setFilteredSeatingDetails(response.data);
        } catch (error) {
            console.error("Error fetching seating data", error);
        } finally {
            setIsLoading(false); // Stop loading regardless of success or error
        }
    };
    useEffect(() => {
        fetchSeatingData();
    }, [APIURL, admin_id]);
    console.log(seatingDetails, "seatingDetailsseatingDetailsseatingDetailsseatingDetails")



    console.log(seatingDetails, 'seating detailssss')





    const exampaper = useSelector((state) => state.exampaperinfo.exampaperinfo);
    const teacherinfo = useSelector((state) => state.adminteacherinfo);


    const allPapers = Object.values(exampaper || {}).flat();


    const availableClasses = [...new Set(allPapers.map(paper => paper.class_name).filter(Boolean))];


    const availableDivisions = [...new Set(allPapers.map(paper => paper.division).filter(Boolean))];




    // const classNames = [...new Set(
    //     examData
    //         .flatMap(exam => exam.papers)
    //         .map(paper => paper.class_name)
    //         .filter(Boolean)
    // )];

    // const divisions = [...new Set(
    //     examData
    //         .flatMap(exam => exam.papers)
    //         .map(paper => paper.division)
    //         .filter(Boolean)
    // )];

    console.log(exampaper, "exam paper")

    const allExamEntries = Object.values(exampaper || {}).flat();
    const examNames = Object.keys(exampaper || []);


    const examYears = [...new Set(allExamEntries.map(entry =>
        new Date(entry.exam_date).getFullYear()
    ))];

    // Get unique exam dates
    const examDates = [...new Set(allExamEntries.map(entry => entry.exam_date))];

    const navigate = useNavigate();


    const [showModal, setShowModal] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [entries, setEntries] = useState([
        { className: "", division: "", student_left: "" }
    ]);
    const [showView, setShowView] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);



    const [selectedLayout, setSelectedLayout] = useState("");

    // Handler for image selection
    const handleImageSelection = (imageName) => {
        if (imageName === "first") {
            setSelectedLayout("layout 1");
        } else if (imageName === "second") {
            setSelectedLayout("layout 2");
        }
    };


    const handleCardClick = (item) => {
        setSelectedItem(item);
        setShowView(true);
    };


    const handleCloseModal = () => {
        setShowView(false);
        setSelectedItem(null);
    };
    // Handler to go back to the dashboard view.

    const handleBack = () => {
        setShowView(false);
        setSelectedItem(null);
    };


    // Form state for each step
    const [formData, setFormData] = useState({
        examName: '',
        examYear: '',
        examDate: '',
        roomNumber: '',
        facultiesAssigned: [],
        className: '',
        division: '',
        student_left: '',
        numberOfColumns: '',
        numberOfTables: '',
        studentsPerBench: '',
        startTime: '',
        endTime: '',
        layoutSelected: '',
    });

    // const [facultyOptions] = useState([
    //     { id: '1', name: 'Rajesh Chandrasekhar' },
    //     { id: '2', name: 'Ramya K P' },
    //     { id: '3', name: 'Lijo Jose' },
    //     { id: '4', name: 'Ankit Kumar' },
    //     { id: '5', name: 'Amal Jose' },
    //     { id: '6', name: 'Deepak Singh' }
    // ]);

    // Handle faculty selection
    const handleFacultySelect = (facultyId) => {
        const selectedFaculty = teachers.find(t => t.value === facultyId);
        if (!selectedFaculty) return;

        setFormData(prev => ({
            ...prev,
            facultiesAssigned: prev.facultiesAssigned.some(f => f.value === facultyId)
                ? prev.facultiesAssigned
                : [...prev.facultiesAssigned, selectedFaculty]
        }));
    };

    // Handle removing a faculty
    const handleRemoveFaculty = (facultyId) => {
        setFormData(prev => ({
            ...prev,
            facultiesAssigned: prev.facultiesAssigned.filter(f => f.value !== facultyId)
        }));
    };

    // === WIZARD & MODAL LOGIC ===
    const openModal = () => {
        setShowModal(true);
        setCurrentStep(1);
        // Clear form when opening modal to ensure fresh start
        clearForm();
    };

    const closeModal = () => {
        setShowModal(false);
        // Clear form when closing modal
        clearForm();
    };
    const nextStep = () => {
        if (!isStepComplete()) {
            let missingFields = [];
            
            if (currentStep === 1) {
                if (!selectedExamName.trim()) missingFields.push("Exam Name");
                if (!selectedExamYear.trim()) missingFields.push("Year");
                if (!selectedExamDate.trim()) missingFields.push("Date of Examination");
            } else if (currentStep === 2) {
                if (!formData.roomNumber.trim()) missingFields.push("Room Number");
                if (formData.facultiesAssigned.length === 0) missingFields.push("Faculties Assigned");
                
                entries.forEach((entry, index) => {
                    if (!entry.className.trim() || !entry.division.trim()) {
                        missingFields.push(`Row ${index + 1} (Class/Division)`);
                    }
                });
            }
            
            Swal.fire({
                icon: "error",
                title: "Missing Required Information",
                text: `Please complete the following fields: ${missingFields.join(", ")}`,
            });
            return;
        }
        
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const clearForm = () => {
        setFormData({
            examName: '',
            examYear: '',
            examDate: '',
            roomNumber: '',
            facultiesAssigned: [],
            className: '',
            division: '',
            student_left: '',
            numberOfColumns:'' ,
            numberOfTables: '',
            studentsPerBench:'' ,
            startTime: '',
            endTime: '',
            layoutSelected: '',
        });
        // Also clear step-related states
        setSelectedExamName("");
        setSelectedExamYear("");
        setSelectedExamDate("");
        setSelectedLayout("");
        setEntries([{ className: "", division: "", student_left: "" }]);
        setCurrentStep(1);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${APIURL}/api/questionpaper/${admin_id}`);
                const rawData = response.data.question_papers || {};

                dispatch(exampaperinfo(rawData));

                const exams = Object.entries(rawData)
                    .map(([key, papers]) => {
                        const match = key.match(/^(.*)\s+(\d{4})$/);
                        if (match) {
                            const examName = match[1].trim();
                            const examYear = match[2];
                            return { fullExamName: key, examName, examYear, papers };
                        }
                        return null;
                    })
                    .filter(item => item !== null);

                setExamData(exams);
            } catch (error) {
                console.error("Error fetching question papers", error);
            }
        };

        fetchData();
    }, [APIURL, admin_id]);

    useEffect(() => {
        setFilteredExamData(examData);
    }, [examData]);


    const assignSlot = async () => {
        if (!isStepComplete()) {
            let missingFields = [];
            
            if (!formData.numberOfColumns || formData.numberOfColumns.trim() === '') missingFields.push("Number of Columns");
            if (!formData.numberOfTables || formData.numberOfTables.trim() === '') missingFields.push("Number of Tables");
            if (!formData.studentsPerBench || formData.studentsPerBench.trim() === '') missingFields.push("Students Per Bench");
            if (!selectedLayout.trim()) missingFields.push("Layout Selection");
            
            Swal.fire({
                icon: "error",
                title: "Missing Required Information",
                text: `Please complete the following fields: ${missingFields.join(", ")}`,
            });
            return;
        }

        const payload = {
            exam_name: selectedExamName,
            exam_year: selectedExamYear,
            exam_date: selectedExamDate,
            room_number: formData.roomNumber,
            faculties_assigned: formData.facultiesAssigned, // ensure this is an array
            classes: entries.map(entry => ({
                class_name: entry.className,
                division: entry.division,
                subject: entry.subject,
            })),
            number_of_columns: parseInt(formData.numberOfColumns),
            number_of_tables: parseInt(formData.numberOfTables),
            students_per_bench: parseInt(formData.studentsPerBench),
            start_time: formData.startTime,
            end_time: formData.endTime,
            layout_selected: selectedLayout, // either 'layout 1' or 'layout 2'
            admin_id: admin_id,
        };

        console.log("Sending payload:", payload);

        try {
            const response = await axios.post(`${APIURL}/api/seating`, payload);
            console.log("Successfully saved:", response.data);

            Swal.fire({
                icon: 'success',
                title: 'Seating Assigned',
                text: 'The seating arrangement has been successfully saved!',
                confirmButtonColor: '#3085d6'
            }).then(() => {
                // Clear all form data after successful submission
                clearForm();
                
                closeModal(); // Close modal after alert is dismissed
                fetchSeatingData(); // Refresh list
            });

        } catch (error) {
            console.error("Error saving seating data:", error);

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Failed to assign seating. Please try again.',
                confirmButtonColor: '#d33'
            });
        }
    };




    // UI for step indicators
    const renderStepIndicator = () => {
        const steps = [
            { label: 'Exam Details', stepNumber: 1 },
            { label: 'Room Details', stepNumber: 2 },
            { label: 'Seating arrangement', stepNumber: 3 },
        ];
        return (
            <div className="seating-step-indicator">
                {steps.map((item) => {
                    let stepClass = 'seating-step';
                    let labelClass = 'seating-step-label';
                    if (currentStep === item.stepNumber) {
                        stepClass += ' active';
                        labelClass += ' active-label';
                    } else if (currentStep > item.stepNumber) {
                        stepClass += ' completed';
                        labelClass += ' completed-label';
                    }
                    return (
                        <div key={item.stepNumber} className={stepClass}>
                            <div className="seating-step-number">{item.stepNumber}</div>
                            <div className={labelClass}>{item.label}</div>
                        </div>
                    );
                })}
            </div>
        );
    };

    // UI for step 1: Exam Details
    const renderStepOne = () => {
        return (
            <div className="seating-modal-step-content">
                <label className="seating-form-label" htmlFor="examName">
                    Select Exam Name <span className="seating_required">*</span>
                </label>
                <select
                    className="form-select form-select-sm seating_stepone_select_exam"
                    id="examName"
                    value={selectedExamName}
                    onChange={(e) => {
                        setSelectedExamName(e.target.value);
                        const filtered = examData.filter(exam => exam.examName === e.target.value);
                        setFilteredExamData(filtered);
                    }}
                >
                    <option value="">Select Examination</option>
                    {[...new Set(examData.map((e) => e.examName))].map((name, i) => (
                        <option key={i} value={name}>{name}</option>
                    ))}
                </select>

                <div className="seating_step-row_stepone">
                    <div className="seating_step-column">
                        <label className="seating-form-label" htmlFor="examYear">
                            Select Year <span className="seating_required">*</span>
                        </label>
                        <select
                            id="examYear"
                            className="form-select form-select-sm seating_stepone_select_year"
                            value={selectedExamYear}
                            onChange={(e) => {
                                setSelectedExamYear(e.target.value);
                                const filtered = examData.filter(exam =>
                                    exam.examName === selectedExamName && exam.examYear === e.target.value
                                );
                                setFilteredExamData(filtered);
                            }}
                        >
                            <option value="">Select Year</option>
                            {[...new Set(
                                examData
                                    .filter(e => e.examName === selectedExamName)
                                    .map(e => e.examYear)
                            )].map((year, i) => (
                                <option key={i} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>

                    <div className="seating_step-column">
                        <label className="seating-form-label" htmlFor="examDate">
                            Date of Examination <span className="seating_required">*</span>
                        </label>
                        <select
                            id="examDate"
                            className="form-select form-select-sm seating_stepone_form-control"
                            value={selectedExamDate}
                            onChange={(e) => {
                                const selectedDate = e.target.value;
                                setSelectedExamDate(selectedDate);

                                // Filter out the matched exam object
                                const matchedExam = filteredExamData
                                    .flatMap(exam => exam.papers)
                                    .find(paper => paper.exam_date === selectedDate);

                                if (matchedExam) {
                                    // Auto-fill Step 2 entries
                                    setEntries([{
                                        className: matchedExam.class_name || '',
                                        division: matchedExam.division || '',
                                        subject: matchedExam.subject_name || ''
                                    }]);

                                    // Also auto-fill start_time, end_time if needed
                                    setFormData(prev => ({
                                        ...prev,
                                        startTime: matchedExam.start_time || prev.startTime,
                                        endTime: matchedExam.end_time || prev.endTime
                                    }));
                                }
                            }}
                        >
                            <option value="">Select     Date</option>
                            {[...new Set(
                                filteredExamData
                                    .flatMap(e => e.papers)
                                    .map(paper => paper.exam_date)
                            )].map((date, i) => (
                                <option key={i} value={date}>
                                    {new Date(date).toLocaleDateString("en-GB", {
                                        day: "2-digit", month: "short", year: "numeric"
                                    })}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        );
    };


    // UI for step 2: Room Details
    // const renderStepTwo = () => {
    //     return (
    //         <div className="seating-modal-step-content">
    //             <div className="seating_step-row" style={{ display: 'flex', gap: 'px' }} >
    //                 <div className="seating_step-column_steptwo" style={{ width: '242px' }}>
    //                     <label className="seating-form-label" htmlFor="roomNumber">
    //                         Room Number <span className="seating_required">*</span></label>
    //                     <input
    //                         id="roomNumber"
    //                         type="text"
    //                         className="seating_form-control_steptwo"
    //                         placeholder="202"
    //                         value={formData.roomNumber}
    //                         onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
    //                     />
    //                 </div>

    //                 <div className="seating_step-column">
    //                     <label className="seating-form-label">Faculties Assigned <span className="seating_required">*</span></label>


    //                     <select
    //                         id="FacultiesAssigned"
    //                         className="form-select form-select-sm seating_stepone_select_year"
    //                         onChange={(e) => handleFacultySelect(e.target.value)}
    //                         value={formData.facultiesAssigned[0]?.value || ''}
    //                     >
    //                         <option value="">Select Faculty</option>
    //                         {teachers.map((teacher) => (
    //                             <option key={teacher.value} value={teacher.value}>
    //                                 {teacher.label}
    //                             </option>
    //                         ))}
    //                     </select>

    //                 </div>

    //             </div>

    //             <div className="seating-modal-step-content_steptwo_entrytable">
    //                 {entries.map((entry, index) => (

    //                     <div key={index} className={`seating_step-row row-with-delete ${index === 0 ? 'first-row' : ''}`}>
    //                         <div className="seating_step-column">

    //                             {index === 0 && (
    //                                 <label className="seating-form-label" htmlFor={`className-${index}`}>
    //                                     Class Name <span className="seating_required">*</span>
    //                                 </label>
    //                             )}
    //                             <select
    //                                 id={`className-${index}`}
    //                                 className="seating_form-select"
    //                                 value={entry.className}
    //                                 onChange={(e) => updateEntry(index, 'className', e.target.value)}
    //                             >
    //                                 <option value="">Select Class</option>
    //                                 {classNames.map((cls, i) => (
    //                                     <option key={i} value={cls}>{cls}</option>
    //                                 ))}
    //                             </select>
    //                         </div>

    //                         <div className="seating_step-column">
    //                             {index === 0 && (
    //                                 <label className="seating-form-label" htmlFor={`division-${index}`}>
    //                                     Division <span className="seating_required">*</span>
    //                                 </label>
    //                             )}
    //                             <select
    //                                 id={`division-${index}`}
    //                                 className="seating_form-select"
    //                                 value={entry.division}
    //                                 onChange={(e) => updateEntry(index, 'division', e.target.value)}
    //                             >
    //                                 <option value="">Select Division</option>
    //                                 {divisions.map((div, i) => (
    //                                     <option key={i} value={div}>{div}</option>
    //                                 ))}
    //                             </select>
    //                         </div>

    //                         <div className="seating_step-column">
    //                             {index === 0 && (
    //                                 <label className="seating-form-label" htmlFor={`subject-${index}`}>
    //                                     Subject <span className="seating_required">*</span>
    //                                 </label>
    //                             )}
    //                             <select
    //                                 id={`subject-${index}`}
    //                                 className="seating_form-select"
    //                                 value={entry.subject}
    //                                 onChange={(e) => updateEntry(index, 'subject', e.target.value)}
    //                             >
    //                                 <option value="">Select Subject</option>
    //                                 <option value="Mathematics">Mathematics</option>
    //                                 <option value="Science">Science</option>
    //                                 <option value="English">English</option>
    //                             </select>
    //                         </div>

    //                         {entries.length > 1 && (
    //                             <button
    //                                 type="button"
    //                                 className="remove-row-btn"
    //                                 onClick={(e) => {
    //                                     e.stopPropagation();
    //                                     removeEntry(index);
    //                                 }}
    //                             >
    //                                 &#10005;
    //                             </button>
    //                         )}

    //                     </div>
    //                 ))}

    //                 <div className="add-next-btn-container">
    //                     <button type="button" className="add-next-btn" onClick={addEntry}>
    //                         + Add Next
    //                     </button>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // };


    // UI for step 2: Room Details
    const renderStepTwo = () => {
        return (
            <div className="seating-modal-step-content">
                <div className="seating_step-row" style={{ display: 'flex', gap: 'px' }} >
                    <div className="seating_step-column_steptwo" style={{ width: '242px' }}>
                        <label className="seating-form-label" htmlFor="roomNumber">
                            Room Number <span className="seating_required">*</span>
                        </label>
                        <input
                            id="roomNumber"
                            type="text"
                            className="seating_form-control_steptwo"
                            placeholder=""
                            value={formData.roomNumber}
                            onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                        />
                    </div>
                    <div
                        className="seating_step-column_Faculties-assigned"
                        ref={facultyDropdownRef}
                    >
                        <label className="seating-form-label">
                            Faculties Assigned <span className="seating_required">*</span>
                        </label>
                        <div className="seating_faculty-tags-wrapper">
                            {formData.facultiesAssigned.map(f => (
                                <div key={f.value} className="seating_faculty-tags">
                                    {f.label}
                                    <span
                                        className="seating_faculty-remove-icon"
                                        onClick={() => handleRemoveFaculty(f.value)}
                                    >×</span>
                                </div>
                            ))}
                        </div>
                        <div
                            className="seating_dropdown-icon"
                            onClick={() => setFacultyDropdownOpen(o => !o)}
                        ><MdOutlineKeyboardArrowDown fontSize={22} /></div>

                        {facultyDropdownOpen && (
                            <ul className="seating_options-list">
                                {teachers
                                    .filter(o => !formData.facultiesAssigned.some(f => f.value === o.value))
                                    .map(o => (
                                        <li
                                            key={o.value}
                                            onClick={() => {
                                                handleFacultySelect(o.value);
                                                setFacultyDropdownOpen(false);
                                            }}
                                        >{o.label}</li>
                                    ))}
                            </ul>
                        )}
                    </div>
                </div>

                <div className="seating-modal-step-content_steptwo_entrytable">
                    <div className="seating_step-row">
                        <div className="seating_step-column">
                            <label className="seating-form-label">
                                Class Name <span className="seating_required">*</span>
                            </label>
                        </div>
                        <div className="seating_step-column">
                            <label className="seating-form-label">
                                Division <span className="seating_required">*</span>
                            </label>
                        </div>
                        <div className="seating_step-column">
                            <label className="seating-form-label">
                                Students left
                            </label>
                        </div>
                    </div>
                    {entries.map((entry, index) => (
                        <div key={index} className={`seating_row-with-delete`}>
                            <div className="seating_step-row">
                                <div className="seating_step-column">

                                    <select
                                        id={`className-${index}`}
                                        className="form-select form-select-sm seating_form-select"
                                        value={entry.className}
                                        onChange={(e) => updateEntry(index, 'className', e.target.value)}
                                    >
                                        <option value="">Select Class</option>
                                        {availableClasses.map((cls, i) => (
                                            <option key={i} value={cls}>{cls}</option>
                                        ))}
                                    </select>


                                </div>


                                <div className="seating_step-column">


                                    <select
                                        id={`division-${index}`}
                                        className="form-select form-select-sm seating_form-select"
                                        value={entry.division}
                                        onChange={(e) => updateEntry(index, 'division', e.target.value)}
                                    >
                                        <option value="">Select Division</option>
                                        {availableDivisions.map((div, i) => (
                                            <option key={i} value={div}>{div}</option>
                                        ))}
                                    </select>



                                </div>

                                <div className="seating_step-column">
                                    <input
                                        id={`student_left-${index}`}
                                        type="number"
                                        className="seating_form-control_steptwo"
                                        placeholder=""
                                    />
                                </div>
                                {entries.length > 1 && (
                                    <span
                                        className="seating_delete-row-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeEntry(index);
                                        }}
                                    >
                                        &#10005;
                                    </span>
                                )}

                            </div>
                        </div>
                    ))}

                    <div className="add-next-btn-container">
                        <button type="button" className="add-next-btn" onClick={addEntry}>
                            + Add Next
                        </button>
                    </div>
                </div>
            </div>
        );
    };


    // Update a field on a specific row.
    const updateEntry = (index, field, value) => {
        const newEntries = [...entries];
        newEntries[index][field] = value;
        setEntries(newEntries);
    };

    // Add a new entry row.
    const addEntry = () => {
        setEntries([...entries, { className: "", division: "", student_left: "" }]);
    };

    // Remove a row (optionally, prevent removal if only one remains).
    const removeEntry = (index) => {
        if (entries.length === 1) return; // Enforce at least one row remains if desired.
        setEntries(entries.filter((_, i) => i !== index));
    };


    // UI for step 3: Seating arrangement
    const renderStepThree = () => {
        return (
            <div className="seating-modal-step-content">
                <div className="seating_step-row">
                    <div className="seating_step-column">
                        <label className="seating-form-label" htmlFor="numberOfColumns">
                            Number of Columns <span className="seating_required">*</span>
                        </label>
                        <input
                            id="numberOfColumns"
                            type="number"
                            min="0"
                            className="seating_form-control"
                            value={formData.numberOfColumns}
                            onChange={(e) => setFormData({ ...formData, numberOfColumns: e.target.value })}
                        />
                    </div>
                    <div className="seating_step-column">
                        <label className="seating-form-label" htmlFor="numberOfTables">
                            Number of Tables <span className="seating_required">*</span></label>
                        <input
                            id="numberOfTables"
                            type="number"
                            min="0"
                            className="seating_form-control"
                            value={formData.numberOfTables}
                            onChange={(e) => setFormData({ ...formData, numberOfTables: e.target.value })}
                        />
                    </div>
                    <div className="seating_step-column">
                        <label className="seating-form-label" htmlFor="studentsPerBench">
                            Students Per Bench <span className="seating_required">*</span></label>
                        <input
                            id="studentsPerBench"
                            type="number"
                            min="0"
                            className="seating_form-control"
                            value={formData.studentsPerBench}
                            onChange={(e) => setFormData({ ...formData, studentsPerBench: e.target.value })}
                        />
                    </div>
                </div>

                <label className="seating-form-label">
                    Select Layout <span className="seating_required">*</span></label>
                <div className="layout-grid">
                    <div
                        className={`layout-option ${selectedLayout === "layout 1" ? "selected" : ""}`}
                        onClick={() => handleImageSelection("first")}
                    >
                        <img src={selectedLayout === "layout 1" ? first_selected : first} alt="Layout 1" />
                    </div>

                    <div
                        className={`layout-option ${selectedLayout === "layout 2" ? "selected" : ""}`}
                        onClick={() => handleImageSelection("second")}
                    >
                        <img src={selectedLayout === "layout 2" ? second_selected : second} alt="Layout 2" />
                    </div>
                </div>
            </div>
        );
    };

    // Conditionally render the step's UI
    const renderStepContent = () => {
        if (currentStep === 1) return renderStepOne();
        if (currentStep === 2) return renderStepTwo();
        if (currentStep === 3) return renderStepThree();
        return null;
    };

    // Function to check if all required fields are filled for current step
    const isStepComplete = () => {
        if (currentStep === 1) {
            // Step 1: Exam Details
            if (!selectedExamName.trim()) return false;
            if (!selectedExamYear.trim()) return false;
            if (!selectedExamDate.trim()) return false;
            return true;
        } else if (currentStep === 2) {
            // Step 2: Room Details
            if (!formData.roomNumber.trim()) return false;
            if (formData.facultiesAssigned.length === 0) return false;
            
            // Check if all entries have required fields
            for (let entry of entries) {
                if (!entry.className.trim() || !entry.division.trim()) {
                    return false;
                }
            }
            return true;
        } else if (currentStep === 3) {
            // Step 3: Seating arrangement
            if (!formData.numberOfColumns || formData.numberOfColumns.trim() === '') return false;
            if (!formData.numberOfTables || formData.numberOfTables.trim() === '') return false;
            if (!formData.studentsPerBench || formData.studentsPerBench.trim() === '') return false;
            if (!selectedLayout.trim()) return false;
            return true;
        }
        return false;
    };

    // Footer buttons in modal
    const renderModalFooter = () => {
        return (
            <div className="modal-footer">
                <div className="modal-footer-left">
                    {currentStep > 1 && (
                        <button
                            type="button"
                            className="seating_popup_btn-back"
                            onClick={prevStep}
                        >
                            Back
                        </button>
                    )}
                </div>
                <div className="modal-footer-right">
                    <button
                        type="button"
                        className="seating_popup_btn-clear"
                        onClick={clearForm}
                    >
                        Clear
                    </button>
                    {currentStep < 3 && (
                        <button
                            type="button"
                            className="seating_popup_btn-next"
                            style={{
                                backgroundColor: isStepComplete() ? '#2162B2' : '#bcbcbc',
                                color: '#fff',
                                border: isStepComplete() ? '1px solid #2162B2' : '1px solid #bcbcbc',
                                cursor: 'pointer'
                            }}
                            onClick={nextStep}
                        >
                            Next
                        </button>
                    )}
                    {currentStep === 3 && (
                        <button
                            type="button"
                            className="seating_popup_btn-next"
                            style={{
                                backgroundColor: isStepComplete() ? '#2162B2' : '#bcbcbc',
                                color: '#fff',
                                border: isStepComplete() ? '1px solid #2162B2' : '1px solid #bcbcbc',
                                cursor: 'pointer'
                            }}
                            onClick={assignSlot}
                        >
                            Assign
                        </button>
                    )}
                </div>
            </div>
        );
    };


    // const filterOptions = {
    //     Class: ['7A', '7B', '7C', '7D'],
    //     Subject: ['Chemistry', 'Physics', 'Mathematics', 'Biology'],
    //     Faculty: ['Lonappan', 'Bindu Panicker', 'Sasikuttan', 'Damodar', 'Ubaid'],
    //     Deadline: ['12/09/2025', '22/09/2025', '07/09/2025'],
    // };




    const dashboardcustomStyles = {
        control: (base, state) => ({
            ...base,
            width: '300px',
            height: '40px',
            borderRadius: '8px',
            borderColor: state.isFocused ? '#86b7fe' : '#757575',
            boxShadow: state.isFocused ? '0 0 0 .25rem rgb(194, 218, 255)' : 0,
        }),

        dropdownIndicator: (base) => ({
            ...base,
            color: '#292D32',
            padding: '0 8px',
            alignItems: 'center',
            svg: {
                width: '24px',
                height: '24px',
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

        singleValue: (base) => ({
            ...base,
            color: '#526D82',
            fontSize: '16px'
        }),

        menu: (base) => ({
            ...base,
            zIndex: 1000,
            maxHeight: '200px',  // Limit the height of the dropdown list
            overflowY: 'auto',   // Enable scrolling when the options exceed the height
            fontSize: '14px',
        }),

        option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? '#2162B2' : '#fff',
            color: state.isFocused ? '#fff' : '#222222',
            '&:active': {
                backgroundColor: '#e6e6e6',
            }
        }),
    };
    const dashboardsmallcustomStyles = {
        control: (base, state) => ({
            ...base,
            width: '200px',
            height: '40px',
            borderRadius: '8px',
            borderColor: state.isFocused ? '#86b7fe' : '#757575',
            boxShadow: state.isFocused ? '0 0 0 .25rem rgb(194, 218, 255)' : 0,
        }),

        dropdownIndicator: (base) => ({
            ...base,
            color: '#292D32',
            padding: '0 8px',
            alignItems: 'center',
            svg: {
                width: '24px',
                height: '24px',
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

        singleValue: (base) => ({
            ...base,
            color: '#526D82',
            fontSize: '16px'
        }),

        menu: (base) => ({
            ...base,
            zIndex: 1000,
            maxHeight: '200px',  // Limit the height of the dropdown list
            overflowY: 'auto',   // Enable scrolling when the options exceed the height
            fontSize: '14px',
        }),

        option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? '#2162B2' : '#fff',
            color: state.isFocused ? '#fff' : '#222222',
            '&:active': {
                backgroundColor: '#e6e6e6',
            }
        }),
    };
    const handleExamTypeChange = (selectedOption) => {
        const examVal = selectedOption ? selectedOption.value : '';
        setSelectedExamType(examVal);
        setFilteredSeatingDetails(seatingDetails.filter(item => {
            const examMatch = !examVal || item.exam_name === examVal;
            const yearMatch = !selectedFilterYear || (
                (item.examYear && item.examYear === selectedFilterYear) ||
                (item.exam_date && new Date(item.exam_date).getFullYear().toString() === selectedFilterYear)
            );
            return examMatch && yearMatch;
        }));
    };

    const handleYearChange = (selectedOption) => {
        const yearVal = selectedOption ? selectedOption.value : '';
        setSelectedFilterYear(yearVal);
        setFilteredSeatingDetails(seatingDetails.filter(item => {
            const examMatch = !selectedExamType || item.exam_name === selectedExamType;
            const yearMatch = !yearVal || (
                (item.examYear && item.examYear === yearVal) ||
                (item.exam_date && new Date(item.exam_date).getFullYear().toString() === yearVal)
            );
            return examMatch && yearMatch;
        }));
    };

    // Compute unique exam names and years from seatingDetails
    const examNameOptions = [...new Set(seatingDetails.map(item => item.exam_name).filter(Boolean))];
    const yearOptions = [...new Set(seatingDetails.map(item => {
        // Try to extract year from exam_date or from a year property
        if (item.examYear) return item.examYear;
        if (item.exam_date) return new Date(item.exam_date).getFullYear().toString();
        return '';
    }).filter(Boolean))];



    return (
        <>

            <div className="seating_main_container">
                <div className="seating_main_header_container">
                    <div className="seating_header-controls d-flex justify-content-between align-items-center">
                        <div className="seating_left-controls" >
                            {/* Exam Type Dropdown */}
                            <Select
                                isClearable
                                value={examNameOptions.find((option) => option === selectedExamType) ? { label: selectedExamType, value: selectedExamType } : null}
                                onChange={handleExamTypeChange}
                                options={examNameOptions.map((option) => ({ label: option, value: option }))}
                                styles={dashboardcustomStyles}  // Using custom style for Exam Type
                                placeholder="Select Examination"
                            />
                            <Select
                                isClearable
                                value={yearOptions.find((year) => year === selectedFilterYear) ? { label: selectedFilterYear, value: selectedFilterYear } : null}
                                onChange={handleYearChange}
                                options={yearOptions.map((year) => ({ label: year, value: year }))}
                                styles={dashboardsmallcustomStyles}  // Using custom style for Year
                                placeholder="Select Year"
                            />
                        </div>
                        <div className="seating_left-controls">
                            {/* <div style={{ position: 'relative', display: 'inline-block' }}>
                                <button
                                    className="btn-primary btn-sm seating_filter_button"
                                    onClick={() => {
                                        setShowFilterPopup(!showFilterPopup);
                                        setShowFilterList(false);
                                        setActiveFilter(null);
                                    }}
                                >
                                    Filter <BiFilterAlt style={{ fontSize: "20px" }} />
                                </button>
                                {showFilterPopup && (
                                    <div className="seating_filter-popup">
                                        {['Class', 'Subject', 'Faculty', 'Deadline'].map((type) => {
                                            let icon;
                                            if (type === 'Class') icon = classIcon;
                                            else if (type === 'Subject') icon = subjectIcon;
                                            else if (type === 'Faculty') icon = facultyIcon;
                                            else if (type === 'Deadline') icon = deadlineIcon;
                                            return (
                                                <>
                                                    <div className="seating_filter-popup-inner">
                                                        <div
                                                            key={type}
                                                            className={`seating_filter-option${activeFilter === type ? ' active' : ''}`}
                                                            onClick={() => {
                                                                setActiveFilter(type);
                                                                setShowFilterList(true);
                                                                setSearchTerm('');
                                                                setSelectedFilterValue('');
                                                            }}

                                                        >
                                                            <img src={icon} alt={type} style={{ width: 24, height: 24, marginRight: 12, borderRadius: 4 }} />
                                                            {type}
                                                        </div>
                                                    </div>
                                                </>

                                            );
                                        })}
                                    </div>
                                )}
                                {showFilterPopup && showFilterList && activeFilter && (
                                    <div className="seating_filter-list-popup" >
                                        <div className="seating_filter-list-popup-inner">
                                            <div className="seating_search_container">
                                                <RiSearchLine
                                                    className={`seating_search-icon ${searchTerm ? 'hidden' : ''}`}
                                                    style={{
                                                        position: 'absolute',
                                                        left: '8px',
                                                        top: '50%',
                                                        transform: 'translateY(-50%)',
                                                        fontSize: '14px',
                                                        color: '#BCBCBC'
                                                    }}
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Search"
                                                    value={searchTerm}
                                                    onChange={e => setSearchTerm(e.target.value)}
                                                    className="seating_filter-search"
                                                />
                                            </div>
                                            <div className="seating_filter-list" >
                                                {filterOptions[activeFilter]
                                                    .filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()))
                                                    .map(item => (
                                                        <div
                                                            key={item}
                                                            className={`seating_filter-list-item${selectedFilterValue === item ? ' select' : ''}`}
                                                            onClick={() => setSelectedFilterValue(item)}

                                                        >
                                                            {item}
                                                        </div>
                                                    ))}
                                            </div>
                                            <button
                                                className="seating_apply-btn"
                                                disabled={!selectedFilterValue}
                                                onClick={() => {
                                                    // You can handle filter logic here if needed
                                                    setShowFilterPopup(false);
                                                    setShowFilterList(false);
                                                }}
                                            >
                                                Apply
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div> */}
                            <button className="btn-primary btn-sm seating_result_add_button" onClick={openModal}>+ Add</button>

                        </div>
                    </div>
                </div>
                <div className="seating_classes_box" >
                    <div className="seating_container" >
                        {isLoading ? (
                            <div className="no-books-message">
                                <h3>Data is loading...</h3>
                            </div>
                        ) : (
                            filteredSeatingDetails.map((item) => (
                                <div
                                    className="seating_classes_box_inner"
                                    key={item.id}
                                    onClick={() => handleCardClick(item)}

                                >
                                    <div className="seating_top_row">
                                        <div className="seating_exam_details">
                                            <h3 className="seating_room_no">ROOM NO: {item.hall_name}</h3>
                                            <p className="seating_exam_title">{item.exam_name}</p>
                                            <p className="seating_exam_date">Date of exam: {new Date(item.exam_date).toLocaleDateString('en-GB', {
                                                day: '2-digit', month: 'short', year: 'numeric'
                                            })}</p>
                                        </div>
                                    </div>
                                    <div className="seating_bottom_row">
                                        <p className="seating_faculties">

                                            <BsFillPersonFill style={{ paddingBottom: "2px", marginRight: "0.5rem" }} />
                                            {item.teacher_count} Faculties assigned</p>
                                        <div>
                                            <span className="seating_classes">Classes: </span>
                                            <span className="seating_classes_input">{item.classes.join(', ')}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* === The Modal Markup === */}
                {showModal && (
                    <div className="seating-custom-modal-overlay" onClick={closeModal}>
                        {/* Stop event propagation so clicking inside modal doesn't close it */}
                        <div className="seating-custom-modal-content" onClick={(e) => e.stopPropagation()}>
                            <div className="seating-custom-modal-content_header_main">
                                <p className="seating-custom-modal-content_header">Add new slot</p>
                                <button className="seating-modal-close-btn" onClick={closeModal}>×</button>
                            </div>
                            {/* Step indicators at the top */}
                            {renderStepIndicator()}

                            {/* Step content */}
                            {renderStepContent()}

                            {/* Footer with Back/Clear/Next or Assign */}
                            {renderModalFooter()}
                        </div>
                    </div>
                )
                }

                {showView && (
                    <div className="seatingview-custom-modal-overlay" onClick={handleCloseModal}>
                        {/* Stop event propagation so clicking inside modal doesn't close it */}
                        <div className="seatingview-custom-modal-content" onClick={(e) => e.stopPropagation()}>
                            <NewSeatingDashboardView selectedItem={selectedItem} onBack={handleCloseModal} fetchSeatingData={fetchSeatingData} />
                        </div>
                    </div>
                )}


            </div >

        </>

    );
};

export default NewSeatingDashboard;
