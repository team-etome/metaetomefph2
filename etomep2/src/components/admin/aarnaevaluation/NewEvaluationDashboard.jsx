import React, { useEffect, useState, } from 'react';
import './newevaluationdashboard.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { BiFilterAlt } from "react-icons/bi";
import { RiSearchLine } from "react-icons/ri";
import student from "../../../assets/student.jpg"
import NewEvaluationAdd from './NewEvaluationAdd';
import NewEvaluationView from './NewEvaluationView';
import Swal from 'sweetalert2';
import Select from 'react-select';
import profile from '../../../assets/avatar.jpg'
import classIcon from '../../../assets/class.jpg';
import subjectIcon from '../../../assets/subject.jpg';
import facultyIcon from '../../../assets/faculty.jpg';
import deadlineIcon from '../../../assets/deadline.jpg';

const NewEvaluationDashboard = () => {
    const APIURL = useSelector((state) => state.APIURL.url);
    const admin_id = useSelector((state) => state.admininfo.admininfo?.admin_id);


    const [showPopupView, setShowPopupView] = useState(false);


    console.log(admin_id, "admin eeee")
    const navigate = useNavigate();



    const [examTypes, setExamTypes] = useState([]);
    const [examYears, setExamYears] = useState([]);
    const [selectedFilterYear, setSelectedFilterYear] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [selectedExamType, setSelectedExamType] = useState('');
    const [evaluationData, setEvaluationData] = useState([]);

    const [filteredData, setFilteredData] = useState([]);

    const [selectedEvaluation, setSelectedEvaluation] = useState(null);  // ✅ Added

    const [showFilterPopup, setShowFilterPopup] = useState(false);
    const [activeFilter, setActiveFilter] = useState(null);
    const [showFilterList, setShowFilterList] = useState(false);
    const [selectedFilterValue, setSelectedFilterValue] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const filterOptions = {
        Class: ['7A', '7B', '7C', '7D'],
        Subject: ['Chemistry', 'Physics', 'Mathematics', 'Biology'],
        Faculty: ['Lonappan', 'Bindu Panicker', 'Sasikuttan', 'Damodar', 'Ubaid'],
        Deadline: ['12/09/2025', '22/09/2025', '07/09/2025'],
    };

    const handleCardClick = (item) => {   // ✅ New function
        setSelectedEvaluation(item);      // store the clicked item
        setShowPopupView(true);            // open the popup
    };



    useEffect(() => {
        const fetchEvaluationData = async () => {
            try {
                const response = await axios.get(`${APIURL}/api/evaluationadding/${admin_id}`);
                console.log(response.data, "Fetched Evaluation Data");

                if (response.data && Array.isArray(response.data)) {
                    setEvaluationData(response.data);     // ✅ All fetched data
                    setFilteredData(response.data);        // ✅ Initially show all
                    setExamTypes([...new Set(response.data.map(item => `${item.class_name} ${item.division}`))]);
                    setExamYears(
                        Array.from(
                            new Set(response.data.map(item => new Date(item.start_date).getFullYear().toString()))
                        ).sort((a, b) => b - a)
                    );
                } else {
                    setEvaluationData([]);
                    setFilteredData([]);
                }
            } catch (error) {
                console.error("Error fetching evaluation data:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to load evaluation data. Please try again later.'
                });
            }
        };

        if (admin_id) {
            fetchEvaluationData();
        }
    }, [admin_id, APIURL]);





    const handleSearch = () => {
        const filtered = evaluationData.filter(item => {
            const classMatch = selectedExamType === "" || `${item.class_name} ${item.division}` === selectedExamType;
            const yearMatch = selectedFilterYear === "" || new Date(item.start_date).getFullYear().toString() === selectedFilterYear;
            return classMatch && yearMatch;
        });
        setFilteredData(filtered);   // ✅ Update to show only filtered ones
    };

    // Filter data based on dropdown selection

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
        setSelectedExamType(selectedOption ? selectedOption.value : '');
    };

    const handleYearChange = (selectedOption) => {
        setSelectedFilterYear(selectedOption ? selectedOption.value : '');
    };
    return (
        <div className="evaluationdashboard_main_container">
            <div className="evaluationdashboard_main_header_container">
                <div className="evaluationdashboard_header-controls d-flex justify-content-between align-items-center">
                    <div className="evaluationdashboard_left-controls">
                        {/* Exam Type Dropdown */}
                        {/* <select
                            className="form-select form-select-sm evaluationdashboard_select_class"
                            value={selectedExamType}
                            onChange={(e) => setSelectedExamType(e.target.value)}
                        >
                            <option value="">Select Class</option>
                            {examTypes.map((type, i) => (
                                <option key={i} value={type}>{type}</option>
                            ))}
                        </select>
                        
                        <select
                            className="form-select form-select-sm evaluationdashboard_select_year"
                            value={selectedFilterYear}
                            onChange={(e) => setSelectedFilterYear(e.target.value)}
                        >
                            <option value="">Select Year</option>
                            {examYears.map((year, i) => (
                                <option key={i} value={year}>{year}</option>
                            ))}
                        </select> */}
                        <Select
                            value={examTypes.find((type) => type === selectedExamType) ? { label: selectedExamType, value: selectedExamType } : null}
                            onChange={handleExamTypeChange}
                            options={examTypes.map((type) => ({ label: type, value: type }))}
                            styles={dashboardcustomStyles}  // Set width to 300px for Exam Type dropdown
                            placeholder="Select Class"
                        />

                        {/* Exam Year Dropdown */}
                        <Select
                            value={examYears.find((year) => year === selectedFilterYear) ? { label: selectedFilterYear, value: selectedFilterYear } : null}
                            onChange={handleYearChange}
                            options={examYears.map((year) => ({ label: year, value: year }))}
                            styles={dashboardsmallcustomStyles}  // Set width to 200px for Year dropdown
                            placeholder="Select Year"
                        />
                        <button
                            className="btn-primary btn-sm evaluationdashboard_search_button"
                            onClick={handleSearch}   // ✅ add this
                        >
                            Search
                        </button>
                    </div>
                    <div className="evaluationdashboard_left-controls">
                        {/* Filter Button and Popup */}
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <button
                                className="btn-primary btn-sm evaluationdashboard_filter_button"
                                onClick={() => {
                                    setShowFilterPopup(!showFilterPopup);
                                    setShowFilterList(false);
                                    setActiveFilter(null);
                                }}
                            >
                                Filter <BiFilterAlt style={{ fontSize: "20px" }} />
                            </button>
                            {showFilterPopup && (
                                <div className="evaluationdashboard_filter-popup">
                                    {['Class', 'Subject', 'Faculty', 'Deadline'].map((type) => {
                                        let icon;
                                        if (type === 'Class') icon = classIcon;
                                        else if (type === 'Subject') icon = subjectIcon;
                                        else if (type === 'Faculty') icon = facultyIcon;
                                        else if (type === 'Deadline') icon = deadlineIcon;
                                        return (
                                            <>
                                                <div className="evaluationdashboard_filter-popup-inner">
                                                    <div
                                                        key={type}
                                                        className={`evaluationdashboard_filter-option${activeFilter === type ? ' active' : ''}`}
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
                                <div className="evaluationdashboard_filter-list-popup" >
                                    <div className="evaluationdashboard_filter-list-popup-inner">
                                        <div className="evaluationdashboard_search_container">
                                            <RiSearchLine
                                                className={`evaluationdashboard_search-icon ${searchTerm ? 'hidden' : ''}`}
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
                                                className="evaluationdashboard_filter-search"
                                            />
                                        </div>
                                        <div className="evaluationdashboard_filter-list" >
                                            {filterOptions[activeFilter]
                                                .filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()))
                                                .map(item => (
                                                    <div
                                                        key={item}
                                                        className={`evaluationdashboard_filter-list-item${selectedFilterValue === item ? ' select' : ''}`}
                                                        onClick={() => setSelectedFilterValue(item)}

                                                    >
                                                        {item}
                                                    </div>
                                                ))}
                                        </div>
                                        <button
                                            className="evaluationdashboard_apply-btn"
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
                        </div>
                        {/* End Filter Button and Popup */}
                        <button className="btn-primary btn-sm evaluationdashboard_result_add_button"
                            onClick={() => setShowPopup(true)} >
                            + Add
                        </button>
                        {showPopup && <NewEvaluationAdd isOpen={showPopup} onClose={() => setShowPopup(false)} />}
                    </div>
                </div>
            </div>
            <div className="evaluationdashboard_classes_box">
                <div className="evaluationdashboard_container">
                    {filteredData.map((item, index) => (
                        <div style={{
                            cursor: "pointer"
                        }}
                            className="evaluationdashboard_classes_box_inner"
                            key={item.id}
                            onClick={() => handleCardClick(item)}
                        >
                            <div className="evaluationdashboard_top_row">
                                <img
                                    src={item?.teacher_profile || profile}

                                    className="evaluationdashboard_box_icon"
                                />
                                <div className="evaluationdashboard_exam_details">
                                    <p className="evaluationdashboard_class_name">{item.class_name} {item.division}</p>
                                    <p className="evaluationdashboard_subject">{item.subject_name}</p>
                                    <p className="evaluationdashboard_exam_title">{item.exam_name} {item.year}</p>
                                    <p className="evaluationdashboard_deadline">
                                        Deadline: {item.end_date}
                                    </p>
                                </div>
                            </div>
                            <div className="evaluationdashboard_bottom_row">
                                <p className="evaluationdashboard_faculty">
                                    <BsFillPersonFill style={{ paddingBottom: "2px", marginRight: "0.5rem" }} />
                                    Faculty Assigned: {item.teacher_name}
                                </p>
                            </div>
                        </div>
                    ))}
                    {showPopupView && selectedEvaluation && (
                        <NewEvaluationView
                            isOpen={showPopupView}
                            onClose={() => setShowPopupView(false)}
                            selectedEvaluation={selectedEvaluation}  // ✅ Pass selectedEvaluation
                        />
                    )}

                </div>
            </div>
        </div >
    );
};

export default NewEvaluationDashboard;
