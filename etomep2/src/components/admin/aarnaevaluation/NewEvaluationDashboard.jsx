import React, { useEffect, useState, } from 'react';
import './newevaluationdashboard.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import image from "../../../assets/b763af54a51c591c7fcb7ddfbae4a92c.jpg"
import NewEvaluationAdd from './NewEvaluationAdd';
import NewEvaluationView from './NewEvaluationView';

const NewEvaluationDashboard = () => {
    const APIURL = useSelector((state) => state.APIURL.url);
    const admin_id = useSelector((state) => state.admininfo.admininfo?.admin_id);
    const navigate = useNavigate();

    const [examTypes, setExamTypes] = useState([]);
    const [examYears, setExamYears] = useState([]);
    const [selectedFilterYear, setSelectedFilterYear] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [showPopupview, setShowPopupView] = useState(false);



    const DummySeatingData = [
        {
            id: 1,
            className: "Class 7 A",
            subject: "Physics",
            examName: "Second Terminal Exam 2025",
            examDeadline: "12/09/2025",
            facultyAssigned: "Siana Catherine",
            imgUrl: image  // or any image you prefer
        },
        {
            id: 2,
            className: "Class 9 B",
            subject: "Mathematics",
            examName: "Quarterly Exam 2025",
            examDeadline: "30/10/2025",
            facultyAssigned: "Joseph Martin",
            imgUrl: image
        },
        {
            id: 3,
            className: "Class 10 A",
            subject: "Biology",
            examName: "Annual Exam 2025",
            examDeadline: "15/11/2025",
            facultyAssigned: "Anita Sharma",
            imgUrl: image
        },
        {
            id: 1,
            className: "Class 7 A",
            subject: "Physics",
            examName: "Second Terminal Exam 2025",
            examDeadline: "12/09/2025",
            facultyAssigned: "Siana Catherine",
            imgUrl: image  // or any image you prefer
        },
        {
            id: 2,
            className: "Class 9 B",
            subject: "Mathematics",
            examName: "Quarterly Exam 2025",
            examDeadline: "30/10/2025",
            facultyAssigned: "Joseph Martin",
            imgUrl: image
        },
        {
            id: 3,
            className: "Class 10 A",
            subject: "Biology",
            examName: "Annual Exam 2025",
            examDeadline: "15/11/2025",
            facultyAssigned: "Anita Sharma",
            imgUrl: image
        },
        {
            id: 1,
            className: "Class 7 A",
            subject: "Physics",
            examName: "Second Terminal Exam 2025",
            examDeadline: "12/09/2025",
            facultyAssigned: "Siana Catherine",
            imgUrl: image  // or any image you prefer
        },
        {
            id: 2,
            className: "Class 9 B",
            subject: "Mathematics",
            examName: "Quarterly Exam 2025",
            examDeadline: "30/10/2025",
            facultyAssigned: "Joseph Martin",
            imgUrl: image
        },
        {
            id: 3,
            className: "Class 10 A",
            subject: "Biology",
            examName: "Annual Exam 2025",
            examDeadline: "15/11/2025",
            facultyAssigned: "Anita Sharma",
            imgUrl: image
        },
        {
            id: 1,
            className: "Class 7 A",
            subject: "Physics",
            examName: "Second Terminal Exam 2025",
            examDeadline: "12/09/2025",
            facultyAssigned: "Siana Catherine",
            imgUrl: image  // or any image you prefer
        },
        {
            id: 2,
            className: "Class 9 B",
            subject: "Mathematics",
            examName: "Quarterly Exam 2025",
            examDeadline: "30/10/2025",
            facultyAssigned: "Joseph Martin",
            imgUrl: image
        },
        {
            id: 3,
            className: "Class 10 A",
            subject: "Biology",
            examName: "Annual Exam 2025",
            examDeadline: "15/11/2025",
            facultyAssigned: "Anita Sharma",
            imgUrl: image
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${APIURL}/api/examtimetable`, {
                    params: { admin_id }
                });
                const rawData = response.data.exam_timetables || {};

                // Convert raw data (an object) to an array of [examName, classesObj] pairs
                let examArray = Object.entries(rawData);
                // Sort exam keys by year descending and then alphabetically.
                examArray = examArray.sort(([nameA], [nameB]) => {
                    const yearMatchA = nameA.match(/\d{4}$/);
                    const yearMatchB = nameB.match(/\d{4}$/);
                    const yearA = yearMatchA ? parseInt(yearMatchA[0]) : 0;
                    const yearB = yearMatchB ? parseInt(yearMatchB[0]) : 0;
                    if (yearA !== yearB) return yearB - yearA;
                    return nameA.localeCompare(nameB);
                });

                // For each exam, convert its classes object into a sorted array of [className, entries]
                const sortedExamTimetables = examArray.map(([examName, classesObj]) => {
                    let classArray = Object.entries(classesObj || {});
                    classArray = classArray.sort(([classA], [classB]) => {
                        const numA = parseInt(classA);
                        const numB = parseInt(classB);
                        if (!isNaN(numA) && !isNaN(numB) && numA !== numB) {
                            return numA - numB;
                        }
                        return classA.localeCompare(classB);
                    });
                    return [examName, classArray];
                });

                setAllTimetableData(sortedExamTimetables);
                setFilteredTimetableData(sortedExamTimetables);

                // Populate exam types and years for filter dropdowns.
                const typesSet = new Set();
                const yearsSet = new Set();
                Object.keys(rawData).forEach(key => {
                    const yearMatch = key.match(/\d{4}$/);
                    if (yearMatch) {
                        yearsSet.add(yearMatch[0]);
                        const type = key.replace(/\s*\d{4}$/, "").trim();
                        typesSet.add(type);
                    }
                });
                setExamTypes([...typesSet].sort());
                setExamYears([...yearsSet].sort((a, b) => b - a));
            } catch (error) {
                console.error("Error fetching exam timetable data", error);
            }
        };

        fetchData();
    }, [APIURL, admin_id]);

    // Filter data based on dropdown selection
    const handleSearch = () => {
        if (!selectedExamType || !selectedFilterYear) {
            setFilteredTimetableData(allTimetableData);
            return;
        }
        const key = `${selectedExamType} ${selectedFilterYear}`;
        const filtered = allTimetableData.filter(([examName]) => examName === key);
        setFilteredTimetableData(filtered);
    };
    return (
        <div className="evaluationdashboard_main_container">
            <div className="evaluationdashboard_main_header_container">
                <div className="header-controls d-flex justify-content-between align-items-center px-3 py-2">
                    <div className="left-controls">
                        {/* Exam Type Dropdown */}
                        <select
                            className="form-select form-select-sm evaluationdashboard_select_class"
                        // value={selectedExamType}
                        // onChange={(e) => setSelectedExamType(e.target.value)}
                        >
                            <option value="">Select Class</option>
                            {examTypes.map((type, i) => (
                                <option key={i} value={type}>{type}</option>
                            ))}
                        </select>
                        {/* Exam Year Dropdown */}
                        <select
                            className="form-select form-select-sm evaluationdashboard_select_year"
                        // value={selectedFilterYear}
                        // onChange={(e) => setSelectedFilterYear(e.target.value)}
                        >
                            <option value="">Select Year</option>
                            {/* {examYears.map((year, i) => (
                                        <option key={i} value={year}>{year}</option>
                                    ))} */}
                        </select>
                        <button
                            className="btn-primary btn-sm evaluationdashboard_search_button"
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </div>
                    <div className="left-controls">
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
                    {DummySeatingData.map((item) => (
                        <div
                            className="evaluationdashboard_classes_box_inner"
                            key={item.id}
                            onClick={() => setShowPopupView(true)}
                        >
                            <div className="evaluationdashboard_top_row">
                                <img
                                    src={item.imgUrl}
                                    alt="Class Icon"
                                    className="evaluationdashboard_box_icon"
                                />
                                <div className="evaluationdashboard_exam_details">
                                    <p className="evaluationdashboard_class_name">{item.className}</p>
                                    <p className="evaluationdashboard_subject">{item.subject}</p>
                                    <p className="evaluationdashboard_exam_title">{item.examName}</p>
                                    <p className="evaluationdashboard_deadline">
                                        Deadline: {item.examDeadline}
                                    </p>
                                </div>
                            </div>
                            <div className="evaluationdashboard_bottom_row">
                                <p className="evaluationdashboard_faculty">
                                    <BsFillPersonFill style={{ paddingBottom: "2px", marginRight: "0.5rem" }} />
                                    Faculty Assigned: {item.facultyAssigned}
                                </p>
                            </div>
                        </div>    
                    ))}
                    {showPopupview && <NewEvaluationView isOpen={showPopupview} onClose={() => setShowPopupView(false)} />}
                </div>
            </div>
        </div >
    );
};

export default NewEvaluationDashboard;
