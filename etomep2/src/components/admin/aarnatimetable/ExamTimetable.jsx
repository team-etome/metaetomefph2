import React, { useEffect, useState } from 'react';
import Examtimetableadding from './Examtimetableadding';
import './examtimetable.css'; // Import custom CSS
import { useSelector } from 'react-redux';
import axios from 'axios';
import dayjs from 'dayjs';
import Examtimetableediting from './Examtimetableediting';
import { useNavigate } from "react-router-dom";


const Examtimetable = () => {
    const APIURL = useSelector((state) => state.APIURL.url);
    const admin_id = useSelector((state) => state.admininfo.admininfo?.admin_id);

    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [editPopupVisible, setEditPopupVisible] = useState(false);
    const [selectedClassEntries, setSelectedClassEntries] = useState([]);
    const [selectedClassId, setSelectedClassId] = useState(null);
    const [examTypes, setExamTypes] = useState([]);
    const [examYears, setExamYears] = useState([]);
    const [selectedExamType, setSelectedExamType] = useState("");
    const [allTimetableData, setAllTimetableData] = useState([]);
    const [filteredTimetableData, setFilteredTimetableData] = useState([]);

    const [selectedFilterYear, setSelectedFilterYear] = useState("");

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
                        // Try numeric sorting first
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
                // Sort years in descending order
                setExamYears([...yearsSet].sort((a, b) => b - a));
            } catch (error) {
                console.error("Error fetching exam timetable data", error);
            }
        };

        fetchData();
    }, [APIURL, admin_id]);

    // Filter data based on dropdown selection
    const handleSearch = () => {
        // If filter not selected, show all data.
        if (!selectedExamType || !selectedFilterYear) {
            setFilteredTimetableData(allTimetableData);
            return;
        }
        const key = `${selectedExamType} ${selectedFilterYear}`;
        // Filter the timetable data array for the exam name matching the key.
        const filtered = allTimetableData.filter(([examName]) => examName === key);
        setFilteredTimetableData(filtered);
    };

    // Helper to format day from date
    const getDayFromDate = (dateString) => dayjs(dateString).format('dddd');

    return (
        <div className="examtimetable_main_container">
            <div className="examtimetable_main_header_container">
                <div className="header-controls d-flex justify-content-between align-items-center px-3 py-2">
                    <div className="left-controls">
                        {/* Exam Type Dropdown */}
                        <select
                            className="form-select form-select-sm examtimetable_select_exam"
                            value={selectedExamType}
                            onChange={(e) => setSelectedExamType(e.target.value)}
                        >
                            <option value="">Select Exam Type</option>
                            {examTypes.map((type, i) => (
                                <option key={i} value={type}>{type}</option>
                            ))}
                        </select>
                        {/* Exam Year Dropdown */}
                        <select
                            className="form-select form-select-sm examtimetable_select_year"
                            value={selectedFilterYear}
                            onChange={(e) => setSelectedFilterYear(e.target.value)}
                        >
                            <option value="">Select Year</option>
                            {examYears.map((year, i) => (
                                <option key={i} value={year}>{year}</option>
                            ))}
                        </select>
                        <button
                            className="btn-primary btn-sm examtimetable_search_button"
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </div>
                    <div className="right-controls">
                        <button className="btn-primary btn-sm examtimetable-add_button" onClick={() => setShowPopup(true)}>+ Add</button>
                        {showPopup && <Examtimetableadding onClose={() => setShowPopup(false)} />}
                    </div>
                </div>
                {/* <h3 className="examtimetable-heading">Annual Examination 2025</h3> */}
            </div>
            <div className="examtimetable_classes">
                {/* {Object.entries(timetableData).map(([className, entries], index) => (
                    <div key={index} className="examtimetable_table_class-section">
                        <div className="class-header d-flex justify-content-between align-items-center " >
                            <h4>Class {className}</h4>
                            <button
                                className="btn-outline-secondary btn-sm edit_button"
                                onClick={() => navigate("/examtimetableedit", { state: { classData: entries } })}
                            >
                                Edit
                            </button>
                        </div>
                        <table className="table table-hover examtimetable_main_table">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Day</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Subject</th>
                                </tr>
                            </thead>
                            <tbody>
                                {entries.map((entry, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{getDayFromDate(entry.exam_date)}</td>
                                        <td>{dayjs(entry.exam_date).format('DD/MM/YYYY')}</td>
                                        <td>{entry.start_time} - {entry.end_time}</td>
                                        <td>{entry.subject}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))} */}
                {filteredTimetableData && filteredTimetableData.length > 0 ? (
                    filteredTimetableData.map(([examName, classArray], index) => (
                        <div key={index} className="exam-section">
                            <h3 className="exam-title">{examName}</h3>
                            {classArray.map(([className, entries]) => (
                                <div key={className} className="examtimetable_table_class-section">
                                    <div className="class-header d-flex justify-content-between align-items-center">
                                        <h4 className="class-title">Class {className}</h4>
                                        <button
                                            className="btn-outline-secondary btn-sm examtimetable_table_class-section-edit_button"
                                            // onClick={() => navigate("/examtimetableedit", { state: { classData: entries } })}
                                        >
                                            Edit
                                        </button>
                                    </div>
                                    <table className="examtimetable_main_table">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Day</th>
                                                <th>Date</th>
                                                <th>Time</th>
                                                <th>Subject</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {entries.map((entry, i) => (
                                                <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>{getDayFromDate(entry.exam_date)}</td>
                                                    <td>{dayjs(entry.exam_date).format('DD/MM/YYYY')}</td>
                                                    <td>{entry.start_time} - {entry.end_time}</td>
                                                    <td>{entry.subject}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <div className="no-books-message">

                        <h3>No timetable data found for the selected filters.</h3>
                    </div>
                )}
                {editPopupVisible && (
                    <Examtimetableediting
                        onClose={() => setEditPopupVisible(false)}
                        defaultClassId={selectedClassId}
                        defaultEntries={selectedClassEntries}
                    />
                )}

            </div>

        </div >
    );
}

export default Examtimetable;