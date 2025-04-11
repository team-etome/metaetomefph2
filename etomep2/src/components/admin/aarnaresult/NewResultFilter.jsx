import React, { useEffect, useState, useRef } from 'react';
import './newresultfilter.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";

const NewResultFilter = () => {
    const APIURL = useSelector((state) => state.APIURL.url);
    const admin_id = useSelector((state) => state.admininfo.admininfo?.admin_id);
    const navigate = useNavigate();

    const [examTypes, setExamTypes] = useState([]);
    const [examYears, setExamYears] = useState([]);
    const [selectedExamType, setSelectedExamType] = useState("");
    const [allTimetableData, setAllTimetableData] = useState([]);
    const [filteredTimetableData, setFilteredTimetableData] = useState([]);
    const [selectedFilterYear, setSelectedFilterYear] = useState("");

    const subjects = [
        { key: 'english', name: 'English', total: 100 },
        { key: 'malayalam', name: 'Malayalam', total: 100 },
        { key: 'socialScience', name: 'Social Science', total: 100 },
        { key: 'physics', name: 'Physics', total: 100 },
        { key: 'chemistry', name: 'Chemistry', total: 100 },
        { key: 'mathematics', name: 'Mathematics', total: 100 },
        { key: 'biology', name: 'Biology', total: 100 },
        { key: 'art', name: 'Art', total: 100 },
        { key: 'math', name: 'Math', total: 100 },
        { key: 'bio', name: 'Bio', total: 100 },
    ];

    // Dummy student data for demonstration
    const dummyStudents = [
        {
            rollNo: '1',
            name: 'Siddharth jdghfldfighvejfhulfdhuih',
            marks: {
                english: 78,
                malayalam: 63,
                socialScience: 70,
                physics: 30,
                chemistry: 79,
                mathematics: 26,
                biology: 82,
                art: 33,
                math: 33,
                bio: 33,
            },
            obtainedMarks: 650,
            percentage: '92%',
        },
        {
            rollNo: '2',
            name: 'Vihaan',
            marks: {
                english: 85,
                malayalam: 70,
                socialScience: 65,
                physics: 79,
                chemistry: 28,
                mathematics: 63,
                biology: 180,
                art: 33,
                math: 33,
                bio: 33,
            },
            obtainedMarks: 620,
            percentage: '87%',
        },
        {
            rollNo: '3',
            name: 'Aarav',
            marks: {
                english: 73,
                malayalam: 67,
                socialScience: 72,
                physics: 81,
                chemistry: 65,
                mathematics: 90,
                biology: 88,
                art: 33,
                math: 33,
                bio: 33,
            },
            obtainedMarks: 650,
            percentage: '90%',
        },
        {
            rollNo: '1',
            name: 'Siddharth jdghfldfighvejfhulfdhuih',
            marks: {
                english: 78,
                malayalam: 63,
                socialScience: 70,
                physics: 30,
                chemistry: 79,
                mathematics: 26,
                biology: 82,
                art: 33,
                math: 33,
                bio: 33,
            },
            obtainedMarks: 650,
            percentage: '92%',
        },
        {
            rollNo: '2',
            name: 'Vihaan',
            marks: {
                english: 85,
                malayalam: 70,
                socialScience: 65,
                physics: 79,
                chemistry: 28,
                mathematics: 63,
                biology: 180,
                art: 33,
                math: 33,
                bio: 33,
            },
            obtainedMarks: 620,
            percentage: '87%',
        },
        {
            rollNo: '3',
            name: 'Aarav',
            marks: {
                english: 73,
                malayalam: 67,
                socialScience: 72,
                physics: 81,
                chemistry: 65,
                mathematics: 90,
                biology: 88,
                art: 33,
                math: 33,
                bio: 33,
            },
            obtainedMarks: 650,
            percentage: '90%',
        },
        {
            rollNo: '1',
            name: 'Siddharth',
            marks: {
                english: 78,
                malayalam: 63,
                socialScience: 70,
                physics: 30,
                chemistry: 79,
                mathematics: 26,
                biology: 82,
                art: 33,
                math: 33,
                bio: 33,
            },
            obtainedMarks: 650,
            percentage: '92%',
        },
        {
            rollNo: '2',
            name: 'Vihaan',
            marks: {
                english: 85,
                malayalam: 70,
                socialScience: 65,
                physics: 79,
                chemistry: 28,
                mathematics: 63,
                biology: 180,
                art: 33,
                math: 33,
                bio: 33,
            },
            obtainedMarks: 620,
            percentage: '87%',
        },
        {
            rollNo: '3',
            name: 'Aarav',
            marks: {
                english: 73,
                malayalam: 67,
                socialScience: 72,
                physics: 81,
                chemistry: 65,
                mathematics: 90,
                biology: 88,
                art: 33,
                math: 33,
                bio: 33,
            },
            obtainedMarks: 650,
            percentage: '90%',
        },
        {
            rollNo: '1',
            name: 'Siddharth jdghfldfighvejfhulfdhuih',
            marks: {
                english: 78,
                malayalam: 63,
                socialScience: 70,
                physics: 30,
                chemistry: 79,
                mathematics: 26,
                biology: 82,
                art: 33,
                math: 33,
                bio: 33,
            },
            obtainedMarks: 650,
            percentage: '92%',
        },
        {
            rollNo: '2',
            name: 'Vihaan',
            marks: {
                english: 85,
                malayalam: 70,
                socialScience: 65,
                physics: 79,
                chemistry: 28,
                mathematics: 63,
                biology: 180,
                art: 33,
                math: 33,
                bio: 33,
            },
            obtainedMarks: 620,
            percentage: '87%',
        },
        {
            rollNo: '3',
            name: 'Aarav',
            marks: {
                english: 73,
                malayalam: 67,
                socialScience: 72,
                physics: 81,
                chemistry: 65,
                mathematics: 90,
                biology: 88,
                art: 33,
                math: 33,
                bio: 33,
            },
            obtainedMarks: 650,
            percentage: '90%',
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

    // Refs for horizontal scroll synchronization (header and body)
    const headerRef = useRef(null);
    const bodyRef = useRef(null);
    const isSyncingRef = useRef(false);

    const handleHeaderScroll = (e) => {
        if (isSyncingRef.current) return;
        isSyncingRef.current = true;
        if (bodyRef.current) {
            bodyRef.current.scrollLeft = e.target.scrollLeft;
        }
        window.requestAnimationFrame(() => { isSyncingRef.current = false; });
    };

    const handleBodyScroll = (e) => {
        if (isSyncingRef.current) return;
        isSyncingRef.current = true;
        if (headerRef.current) {
            headerRef.current.scrollLeft = e.target.scrollLeft;
        }
        window.requestAnimationFrame(() => { isSyncingRef.current = false; });
    };

    return (
        <div className="result_main_container">
            <div className="result_main_header_container">
                <div className="header-controls d-flex justify-content-between align-items-center px-3 py-2">
                    <div className="left-controls">
                        {/* Exam Type Dropdown */}
                        <select
                            className="form-select form-select-sm result_select_exam"
                            value={selectedExamType}
                            onChange={(e) => setSelectedExamType(e.target.value)}
                        >
                            <option value="">Select Examination</option>
                            {examTypes.map((type, i) => (
                                <option key={i} value={type}>{type}</option>
                            ))}
                        </select>
                        {/* Exam Year Dropdown */}
                        <select
                            className="form-select form-select-sm result_select_year"
                            value={selectedFilterYear}
                            onChange={(e) => setSelectedFilterYear(e.target.value)}
                        >
                            <option value="">Select Year</option>
                            {examYears.map((year, i) => (
                                <option key={i} value={year}>{year}</option>
                            ))}
                        </select>
                        <select
                            className="form-select form-select-sm result_select_class"
                            value={selectedFilterYear}
                            onChange={(e) => setSelectedFilterYear(e.target.value)}
                        >
                            <option value="">Select Class</option>
                            {examYears.map((year, i) => (
                                <option key={i} value={year}>{year}</option>
                            ))}
                        </select>
                        <select
                            className="form-select form-select-sm result_select_division"
                            value={selectedFilterYear}
                            onChange={(e) => setSelectedFilterYear(e.target.value)}
                        >
                            <option value="">Select Division</option>
                            {examYears.map((year, i) => (
                                <option key={i} value={year}>{year}</option>
                            ))}
                        </select>
                        <button
                            className="btn-primary btn-sm search_button"
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>

            <div className="class-result-container">
                <span>Class result</span>
            </div>

            {/* Wrapper for both the header table and body table */}
            <div className="result_classes_table" style={{border:"1px solid #CECECE"}}>
                <div className="result_table_wrapper">
                    {/* Header Table: only thead */}
                    <div
                        className="result-table-header-container"
                        ref={headerRef}
                        onScroll={handleHeaderScroll}
                    >
                        <table className="result-table">
                            <thead>
                                <tr>
                                    <th className="result-th sticky-left" rowSpan="2">Roll No</th>
                                    <th className="result-th sticky-left-2" rowSpan="2">
                                        <div className="name-scroll-container">Name</div>
                                    </th>
                                    <th className="result-th-subjectlist_subjectheading" colSpan={subjects.length}>Subjects</th>
                                    <th className="result-th-marks sticky-right-1" rowSpan="2">Obtained Marks</th>
                                    <th className="result-th-percentage sticky-right-2" rowSpan="2">Percentage</th>
                                </tr>
                                <tr>
                                    {subjects.map((subject) => (
                                        <th className="result-th-subjectlist_heading" key={subject.key}>
                                            <div className="subject-container">
                                                <div className="subject-name">{subject.name}</div>
                                                <div className="subject-total">
                                                    <span className="total-label">Total: </span>
                                                    <span className="total-value">{subject.total}</span>
                                                </div>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                        </table>
                    </div>
                    {/* Body Table: only tbody with vertical scrolling */}
                    <div
                        className="result-table-body-container"
                        ref={bodyRef}
                        onScroll={handleBodyScroll}
                    >
                        <table className="result-table">
                            <tbody>
                                {dummyStudents.map((student, index) => (
                                    <tr className="result-tr" key={index}>
                                        <td className="result-td sticky-left">{student.rollNo}</td>
                                        <td className="result-td sticky-left-2">
                                            <div className="name-scroll-container">{student.name}</div>
                                        </td>
                                        {subjects.map((subject) => (
                                            <td className="result-th-subjectlist" key={subject.key}>
                                                {student.marks[subject.key] ?? '-'}
                                            </td>
                                        ))}
                                        <td className="result-td sticky-right-1">{student.obtainedMarks}</td>
                                        <td className="result-td-percentage sticky-right-2">{student.percentage}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewResultFilter;
