import React, { useEffect, useState, useRef } from 'react';
import './newexaminationpending.css';
import { useSelector, useDispatch } from 'react-redux';
import { BsFillPersonFill } from "react-icons/bs";
import NewPendingView from './NewPendingView';
import Select from 'react-select';
import axios from 'axios';


const NewExaminationPending = ({ onSelectItem, refreshTrigger }) => {
    const APIURL = useSelector((state) => state.APIURL.url);
    const teacher = useSelector((state) => state.teacherinfo);
    const teacher_id = teacher.teacherinfo?.teacher_id;
    const [examinationListData, setExaminationListData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    // Filter states
    const [selectedExamName, setSelectedExamName] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);

    // Unique values for dropdowns
    const [examNames, setExamNames] = useState([]);
    const [classes, setClasses] = useState([]);
    const [subjects, setSubjects] = useState([]);

    const handleBoxClick = (item) => {
        setSelectedItem(item);
    };

    // Fetch examination data from API
    const fetchExaminations = async () => {
        try {
            setLoading(true);
            console.log("Fetching examinations data... refreshTrigger:", refreshTrigger);
            const response = await axios.get(
                `${APIURL}/api/blueprintdetails/${teacher_id}`
            );
            console.log("API response:", response.data);

            if (Array.isArray(response.data)) {
                // Filter for pending exams (status !== "completed")
                const pendingExams = response.data.filter(exam => exam.status == "assigned");
                setExaminationListData(pendingExams);
                setFilteredData(pendingExams);
                
                // Extract unique values for dropdowns
                const uniqueExamNames = [...new Set(pendingExams.map(exam => exam.exam_name))].map(name => ({
                    value: name,
                    label: name
                }));
                const uniqueClasses = [...new Set(pendingExams.map(exam => exam.class_name))].map(className => ({
                    value: className,
                    label: className
                }));
                const uniqueSubjects = [...new Set(pendingExams.map(exam => exam.subject_name))].map(subject => ({
                    value: subject,
                    label: subject
                }));

                setExamNames(uniqueExamNames);
                setClasses(uniqueClasses);
                setSubjects(uniqueSubjects);
            } else {
                console.error("Expected an array, received:", response.data);
                setExaminationListData([]);
                setFilteredData([]);
            }
        } catch (error) {
            console.error("Failed to fetch examination data:", error);
            setExaminationListData([]);
            setFilteredData([]);
        } finally {
            setLoading(false);
        }
    };

    // Apply filters
    useEffect(() => {
        let filtered = examinationListData;

        if (selectedExamName) {
            filtered = filtered.filter(exam => exam.exam_name === selectedExamName.value);
        }

        if (selectedClass) {
            filtered = filtered.filter(exam => exam.class_name === selectedClass.value);
        }

        if (selectedSubject) {
            filtered = filtered.filter(exam => exam.subject_name === selectedSubject.value);
        }

        setFilteredData(filtered);
    }, [selectedExamName, selectedClass, selectedSubject, examinationListData]);

    // Clear all filters
    const clearFilters = () => {
        setSelectedExamName(null);
        setSelectedClass(null);
        setSelectedSubject(null);
    };

    // Fetch data when component mounts or refreshTrigger changes
    useEffect(() => {
        if (teacher_id) {
            fetchExaminations();
        }
    }, [teacher_id, refreshTrigger]);

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


    return (
        <>

            <div className="newexaminationpending_main_container">
                <div className="newexaminationpending_main_header_container">
                    <div className="newexaminationpending_header-controls d-flex justify-content-between align-items-center">
                        <div className="newexaminationpending_left-controls" >
                            <Select
                                styles={dashboardcustomStyles}
                                placeholder="Select Exam Name"
                                options={examNames}
                                value={selectedExamName}
                                onChange={(option) => setSelectedExamName(option)}
                            />

                            <Select
                                styles={dashboardsmallcustomStyles}
                                placeholder="Select Class"
                                options={classes}
                                value={selectedClass}
                                onChange={(option) => setSelectedClass(option)}
                            />
                            <Select
                                styles={dashboardsmallcustomStyles}
                                placeholder="Select Subject"
                                options={subjects}
                                value={selectedSubject}
                                onChange={(option) => setSelectedSubject(option)}
                            />

                            {(selectedExamName || selectedClass || selectedSubject) && (
                                <button 
                                    onClick={clearFilters}
                                    style={{
                                        padding: '8px 16px',
                                        backgroundColor: '#f8f9fa',
                                        border: '1px solid #dee2e6',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontSize: '14px'
                                    }}
                                >
                                    Clear Filters
                                </button>
                            )}

                        </div>
                    </div>
                </div>
                <div className="newexaminationpending_classes_box" >
                    {loading && (
                        <div style={{ textAlign: 'center', padding: '20px' }}>
                            <p>Loading pending examinations...</p>
                        </div>
                    )}
                    
                    {!loading && examinationListData.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                            <p>No pending examinations found.</p>
                        </div>
                    )}
                    
                    {!loading && examinationListData.length > 0 && (
                        <div className="newexaminationpending_container" >
                            {filteredData.map((item, index) => (
                                <div
                                    className="newexaminationpending_classes_box_inner"
                                    key={item.id || index}
                                    onClick={() => onSelectItem(item)}
                                >
                                    <div className="newexaminationpending_top_row">
                                        <div className="newexaminationpending_exam_details">
                                            <p className="newexaminationpending_examname">{item.exam_name}</p>
                                            <p className="newexaminationpending_subject">{item.subject_name}</p>
                                        </div>
                                    </div>
                                    <div className="newexaminationpending_bottom_row">
                                        <p className="newexaminationpending_class">
                                            Class: {item.class_name}</p>
                                        <div>
                                            <span className="newexaminationpending_date">Date: </span>
                                            <span className="newexaminationpending_date_input">
                                                {new Date(item.exam_date).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>


            </div >

        </>

    );
};

export default NewExaminationPending;
