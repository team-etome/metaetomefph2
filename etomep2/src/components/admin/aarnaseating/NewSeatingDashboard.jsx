import React, { useEffect, useState, } from 'react';
import './newseatingdashboard.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";
import image from "../../../assets/b763af54a51c591c7fcb7ddfbae4a92c.jpg"
import NewSeatingDashboardView from './NewSeatingDashboardView';
import first from "../../../assets/IMG_first.png"
import first_selected from "../../../assets/IMG_first_selected.png"
import second from "../../../assets/IMG_second.png"
import second_selected from "../../../assets/IMG_second_selected.png"
import { BsFillPersonFill } from "react-icons/bs";

const NewSeatingDashboard = () => {
    const APIURL = useSelector((state) => state.APIURL.url);
    const admin_id = useSelector((state) => state.admininfo.admininfo?.admin_id);

    const [selectedExamName, setSelectedExamName] = useState("");
    const [selectedExamYear, setSelectedExamYear] = useState("");
    const [selectedExamDate, setSelectedExamDate] = useState("");

    const [selectedExamType, setSelectedExamType] = useState("");
    const [selectedFilterYear, setSelectedFilterYear] = useState("");






    const exampaper = useSelector((state) => state.exampaperinfo.exampaperinfo);

    console.log(exampaper, 'exam paper')

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
        { className: "", division: "", subject: "" }
    ]);
    const [showView, setShowView] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);



    const [selectedLayout, setSelectedLayout] = useState("");

    // Handler for image selection
    const handleImageSelection = (imageName) => {
        setSelectedLayout(imageName); // Set the selected layout
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
        subject: '',
        numberOfColumns: 5,
        numberOfTables: 4,
        studentsPerBench: 2,
        startTime: '09:00 AM',
        endTime: '12:00 PM',
        layoutSelected: '',
    });
    // === WIZARD & MODAL LOGIC ===
    const openModal = () => {
        setShowModal(true);
        setCurrentStep(1);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    const nextStep = () => {
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
            subject: '',
            numberOfColumns: 5,
            numberOfTables: 4,
            studentsPerBench: 2,
            startTime: '09:00 AM',
            endTime: '12:00 PM',
            layoutSelected: '',
        });
    };

    const assignSlot = () => {
        // Final submission from step 3
        console.log('Final data:', formData);
        closeModal();
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
                    if (currentStep === item.stepNumber) stepClass += ' active';
                    else if (currentStep > item.stepNumber) stepClass += ' completed';
                    return (
                        <div key={item.stepNumber} className={stepClass}>
                            <div className="seating-step-number">{item.stepNumber}</div>
                            <div className="seating-step-label">{item.label}</div>
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
                    Exam Name <span className="seating_required">*</span>
                </label>
                <select
                    className="form-select form-select-sm seating_stepone_select_exam"
                    id="examName"
                    value={selectedExamName}
                    onChange={(e) => setSelectedExamName(e.target.value)}
                >
                    <option value="">Select Examination</option>
                    {/* {examNames.map((name, i) => (
                        <option key={i} value={name}>{name}</option>
                    ))} */}
                </select>

                <div className="seating_step-row_stepone">
                    <div className="seating_step-column">
                        <label className="seating-form-label" htmlFor="examYear">
                            Year <span className="seating_required">*</span>
                        </label>
                        <select
                            id="examYear"
                            className="form-select form-select-sm seating_stepone_select_year"
                            value={selectedExamYear}
                            onChange={(e) => setSelectedExamYear(e.target.value)}
                        >
                            <option value="">Select Year</option>
                            {examYears.map((year, i) => (
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
                            onChange={(e) => setSelectedExamDate(e.target.value)}
                        >
                            <option value="">Select Date</option>
                            {examDates.map((date, i) => (
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
    const renderStepTwo = () => {
        return (
            <div className="seating-modal-step-content">
                <div className="seating_step-row">
                    <div className="seating_step-column_steptwo">
                        <label className="seating-form-label" htmlFor="roomNumber">
                            Room Number <span className="seating_required">*</span></label>
                        <input
                            id="roomNumber"
                            type="text"
                            className="seating_form-control_steptwo"
                            placeholder="202"
                            value={formData.roomNumber}
                            onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                        />
                    </div>
                    <div className="seating_step-column">
                        <label className="seating-form-label">Faculties Assigned <span className="seating_required">*</span></label>
                

                        <select
                            id="Faculties Assigned"
                            className="form-select form-select-sm seating_stepone_select_year"
                
                        >
                            <option value="Enter faculty names separated by commas"></option>
                          
                        </select>
                    </div>
                </div>

                <div className="seating-modal-step-content_steptwo_entrytable">
                    {entries.map((entry, index) => (
                        <div key={index} className={`seating_step-row row-with-delete ${index === 0 ? 'first-row' : ''}`}>
                            <div className="seating_step-column">
                             
                                {index === 0 && (
                                    <label className="seating-form-label" htmlFor={`className-${index}`}>
                                        Class Name <span className="seating_required">*</span>
                                    </label>
                                )}
                                <select
                                    id={`className-${index}`}
                                    className="seating_form-select"
                                    value={entry.className}
                                    onChange={(e) => updateEntry(index, 'className', e.target.value)}
                                >
                                    <option value="">Select Class</option>
                                    <option value="10">10</option>
                                    <option value="9">9</option>
                                    <option value="8">8</option>
                                </select>
                            </div>

                            <div className="seating_step-column">
                                {index === 0 && (
                                    <label className="seating-form-label" htmlFor={`division-${index}`}>
                                        Division <span className="seating_required">*</span>
                                    </label>
                                )}
                                <select
                                    id={`division-${index}`}
                                    className="seating_form-select"
                                    value={entry.division}
                                    onChange={(e) => updateEntry(index, 'division', e.target.value)}
                                >
                                    <option value="">Select Division</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                </select>
                            </div>

                            <div className="seating_step-column">
                                {index === 0 && (
                                    <label className="seating-form-label" htmlFor={`subject-${index}`}>
                                        Subject <span className="seating_required">*</span>
                                    </label>
                                )}
                                <select
                                    id={`subject-${index}`}
                                    className="seating_form-select"
                                    value={entry.subject}
                                    onChange={(e) => updateEntry(index, 'subject', e.target.value)}
                                >
                                    <option value="">Select Subject</option>
                                    <option value="English">English</option>
                                    <option value="Math">Math</option>
                                    <option value="Biology">Biology</option>
                                </select>
                            </div>

                      
                            {entries.length > 1 && (
                                <button
                                    type="button"
                                    className="remove-row-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeEntry(index);
                                    }}
                                >
                                    &#10005;
                                </button>
                            )}
                        </div>
                    ))}

                    {/* + Add Next Button */}
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
        setEntries([...entries, { className: "", division: "", subject: "" }]);
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

                {/* <div className="seating_step-row">
                    <div className="seating_step-column">
                        <label className="seating-form-label" htmlFor="startTime">Start Time *</label>
                        <input
                            id="startTime"
                            type="time"
                            className="seating_form-control"
                            // For simple handling, store 'HH:MM' in state
                            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                        />
                    </div>
                    <div className="seating_step-column">
                        <label className="seating-form-label" htmlFor="endTime">End Time *</label>
                        <input
                            id="endTime"
                            type="time"
                            className="seating_form-control"
                            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                        />
                    </div>
                </div> */}

                <label className="seating-form-label">
                    Select Layout <span className="seating_required">*</span></label>
                <div className="layout-grid">
                    {/* First image */}
                    <div
                        className={`layout-option ${selectedLayout === "first" ? "selected" : ""}`}
                        onClick={() => handleImageSelection("first")}
                    >
                        <img
                            src={selectedLayout === "first" ? first_selected : first}
                            alt="First Layout"
                        />
                    </div>

                    {/* Second image */}
                    <div
                        className={`layout-option ${selectedLayout === "second" ? "selected" : ""}`}
                        onClick={() => handleImageSelection("second")}
                    >
                        <img
                            src={selectedLayout === "second" ? second_selected : second}
                            alt="Second Layout"
                        />
                    </div>
                </div>
            </div>
        );
    };

    // Conditionally render the step’s UI
    const renderStepContent = () => {
        if (currentStep === 1) return renderStepOne();
        if (currentStep === 2) return renderStepTwo();
        if (currentStep === 3) return renderStepThree();
        return null;
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
                            onClick={nextStep}
                        >
                            Next
                        </button>
                    )}
                    {currentStep === 3 && (
                        <button
                            type="button"
                            className="seating_popup_btn-next"
                            onClick={assignSlot}
                        >
                            Assign
                        </button>
                    )}
                </div>
            </div>
        );
    };


    const DummySeatingData = [
        {
            id: 1,
            roomNo: '201',
            examName: 'Second Terminal Exam',
            examDate: '22/07/2025',
            faculties: 5,
            classes: ['10E', '8D', '5B'],
        },
        {
            id: 2,
            roomNo: '305',
            examName: 'Quarterly Exam',
            examDate: '01/09/2025',
            faculties: 3,
            classes: ['9A', '9B'],
        },
        {
            id: 3,
            roomNo: '110',
            examName: 'Annual Exam',
            examDate: '15/11/2025',
            faculties: 4,
            classes: ['12A', '12B', '12C'],
        },
        {
            id: 1,
            roomNo: '201',
            examName: 'Second Terminal Exam',
            examDate: '22/07/2025',
            faculties: 5,
            classes: ['10E', '8D', '5B'],
        },
        {
            id: 2,
            roomNo: '305',
            examName: 'Quarterly Exam',
            examDate: '01/09/2025',
            faculties: 3,
            classes: ['9A', '9B'],
        },
        {
            id: 3,
            roomNo: '110',
            examName: 'Annual Exam',
            examDate: '15/11/2025',
            faculties: 4,
            classes: ['12A', '12B', '12C'],
        },
        {
            id: 1,
            roomNo: '201',
            examName: 'Second Terminal Exam',
            examDate: '22/07/2025',
            faculties: 5,
            classes: ['10E', '8D', '5B'],
        },
        {
            id: 2,
            roomNo: '305',
            examName: 'Quarterly Exam',
            examDate: '01/09/2025',
            faculties: 3,
            classes: ['9A', '9B'],
        },
        {
            id: 3,
            roomNo: '110',
            examName: 'Annual Exam',
            examDate: '15/11/2025',
            faculties: 4,
            classes: ['12A', '12B', '12C'],
        },
        {
            id: 1,
            roomNo: '201',
            examName: 'Second Terminal Exam',
            examDate: '22/07/2025',
            faculties: 5,
            classes: ['10E', '8D', '5B'],
        },
        {
            id: 2,
            roomNo: '305',
            examName: 'Quarterly Exam',
            examDate: '01/09/2025',
            faculties: 3,
            classes: ['9A', '9B'],
        },
        {
            id: 3,
            roomNo: '110',
            examName: 'Annual Exam',
            examDate: '15/11/2025',
            faculties: 4,
            classes: ['12A', '12B', '12C'],
        },
        {
            id: 1,
            roomNo: '201',
            examName: 'Second Terminal Exam',
            examDate: '22/07/2025',
            faculties: 5,
            classes: ['10E', '8D', '5B'],
        },
        {
            id: 2,
            roomNo: '305',
            examName: 'Quarterly Exam',
            examDate: '01/09/2025',
            faculties: 3,
            classes: ['9A', '9B'],
        },
        {
            id: 3,
            roomNo: '110',
            examName: 'Annual Exam',
            examDate: '15/11/2025',
            faculties: 4,
            classes: ['12A', '12B', '12C'],
        },
        {
            id: 1,
            roomNo: '201',
            examName: 'Second Terminal Exam',
            examDate: '22/07/2025',
            faculties: 5,
            classes: ['10E', '8D', '5B'],
        },
        {
            id: 2,
            roomNo: '305',
            examName: 'Quarterly Exam',
            examDate: '01/09/2025',
            faculties: 3,
            classes: ['9A', '9B'],
        },
        {
            id: 3,
            roomNo: '110',
            examName: 'Annual Exam',
            examDate: '15/11/2025',
            faculties: 4,
            classes: ['12A', '12B', '12C'],
        },
    ];



    // Filter data based on dropdown selection
    const handleSearch = () => {

    };
    return (
        <>

            <div className="seating_main_container">
                <div className="seating_main_header_container">
                    <div className="seating_header-controls d-flex justify-content-between align-items-center">
                        <div className="seating_left-controls">
                            {/* Exam Type Dropdown */}
                            <select
                                className="form-select form-select-sm seating_select_exam"
                                value={selectedExamType}
                                onChange={(e) => setSelectedExamType(e.target.value)}
                            >
                                <option value="">Select Examination</option>
                                {/* {examTypes.map((type, i) => (
                                    <option key={i} value={type}>{type}</option>
                                ))} */}
                            </select>
                            {/* Exam Year Dropdown */}
                            <select
                                className="form-select form-select-sm seating_select_year"
                                value={selectedFilterYear}
                                onChange={(e) => setSelectedFilterYear(e.target.value)}
                            >
                                <option value="">Select Year</option>
                                {examYears.map((year, i) => (
                                    <option key={i} value={year}>{year}</option>
                                ))}
                            </select>
                            <button
                                className="btn-primary btn-sm seating_search_button"
                                onClick={handleSearch}
                            >
                                Search
                            </button>
                        </div>
                        <div className="left-controls">
                            <button className="btn-primary btn-sm seating_result_add_button" onClick={openModal}>+ Add</button>

                        </div>
                    </div>
                </div>
                <div className="seating_classes_box">
                    <div className="seating_container">
                        {DummySeatingData.map((item) => (
                            <div
                                className="seating_classes_box_inner"
                                key={item.id}
                                onClick={() => handleCardClick(item)}
                            >
                                <div className="seating_top_row">
                                    <div className="seating_exam_details">
                                        <h3 className="seating_room_no">ROOM NO: {item.roomNo}</h3>
                                        <p className="seating_exam_title">{item.examName}</p>
                                        <p className="seating_exam_date">Date of exam: {item.examDate}</p>
                                    </div>
                                </div>
                                <div className="seating_bottom_row">
                                    <p className="seating_faculties">

                                        <BsFillPersonFill style={{ paddingBottom: "2px", marginRight: "0.5rem" }} />
                                        {item.faculties} Faculties assigned</p>
                                    <div>
                                        <span className="seating_classes">Classes: </span>
                                        <span className="seating_classes_input">{item.classes.join(', ')}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
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
                            <NewSeatingDashboardView selectedItem={selectedItem} onBack={handleCloseModal} />
                        </div>
                    </div>
                )}

                
            </div >

        </>

    );
};

export default NewSeatingDashboard;
