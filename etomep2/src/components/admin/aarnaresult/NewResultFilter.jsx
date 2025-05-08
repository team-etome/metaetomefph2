import React, { useEffect, useState, useRef } from 'react';
import './newresultfilter.css';
import { useSelector } from 'react-redux';
import Select from 'react-select';

const NewResultFilter = () => {
    const APIURL = useSelector((state) => state.APIURL.url);
    const admin_id = useSelector((state) => state.admininfo.admininfo?.admin_id);



    const [selectedExam, setSelectedExam] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedDivision, setSelectedDivision] = useState('');

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


    // Refs for horizontal scroll synchronization (header and body)
    const headerRef = useRef(null);
    const bodyRef = useRef(null);
    const isSyncingRef = useRef(false);
    const scrollbarRef = useRef(null);

    const handleHeaderScroll = (e) => {
        if (isSyncingRef.current) return;
        isSyncingRef.current = true;
        if (bodyRef.current) {
            bodyRef.current.scrollLeft = e.target.scrollLeft;
        }
        if (scrollbarRef.current) {
            scrollbarRef.current.scrollLeft = e.target.scrollLeft;
        }
        window.requestAnimationFrame(() => { isSyncingRef.current = false; });
    };

    const handleBodyScroll = (e) => {
        if (isSyncingRef.current) return;
        isSyncingRef.current = true;
        if (headerRef.current) {
            headerRef.current.scrollLeft = e.target.scrollLeft;
        }
        if (scrollbarRef.current) {
            scrollbarRef.current.scrollLeft = e.target.scrollLeft;
        }
        window.requestAnimationFrame(() => { isSyncingRef.current = false; });
    };

    const handleScrollbarScroll = (e) => {
        if (isSyncingRef.current) return;
        isSyncingRef.current = true;
        if (headerRef.current) headerRef.current.scrollLeft = e.target.scrollLeft;
        if (bodyRef.current) bodyRef.current.scrollLeft = e.target.scrollLeft;
        window.requestAnimationFrame(() => { isSyncingRef.current = false; });
    };

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

    const handleExamChange = (selectedOption) => {
        setSelectedExam(selectedOption ? selectedOption.value : '');
    };

    const handleYearChange = (selectedOption) => {
        setSelectedYear(selectedOption ? selectedOption.value : '');
    };

    const handleClassChange = (selectedOption) => {
        setSelectedClass(selectedOption ? selectedOption.value : '');
    };

    const handleDivisionChange = (selectedOption) => {
        setSelectedDivision(selectedOption ? selectedOption.value : '');
    };


    return (
        <div className="result_main_container">
            <div className="result_main_header_container">
                <div className="result_main-header-controls d-flex justify-content-between align-items-center">
                    <div className="result_main-left-controls">
                        {/* Exam Type Dropdown */}
                        <Select
                            // value={examOptions.find((option) => option === selectedExam) ? { label: selectedExam, value: selectedExam } : null}
                            onChange={handleExamChange}
                            // options={examOptions.map((option) => ({ label: option, value: option }))}
                            styles={dashboardcustomStyles}
                            placeholder="Select Examination"
                        />

                        {/* Year Dropdown */}
                        <Select
                            // value={yearOptions.find((year) => year === selectedYear) ? { label: selectedYear, value: selectedYear } : null}
                            onChange={handleYearChange}
                            // options={yearOptions.map((year) => ({ label: year, value: year }))}
                            styles={dashboardsmallcustomStyles }
                            placeholder="Select Year"
                        />

                        {/* Class Dropdown */}
                        <Select
                            // value={classOptions.find((cls) => cls === selectedClass) ? { label: selectedClass, value: selectedClass } : null}
                            onChange={handleClassChange}
                            // options={classOptions.map((cls) => ({ label: cls, value: cls }))}
                            styles={dashboardsmallcustomStyles }
                            placeholder="Select Class"
                        />

                        {/* Division Dropdown */}
                        <Select
                            // value={divisionOptions.find((div) => div === selectedDivision) ? { label: selectedDivision, value: selectedDivision } : null}
                            onChange={handleDivisionChange}
                            // options={divisionOptions.map((div) => ({ label: div, value: div }))}
                            styles={dashboardsmallcustomStyles}
                            placeholder="Select Division"
                        />
                        <button
                            className="btn-primary btn-sm search_button"
                        // onClick={handleSearch}
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
            <div className="result_classes_table" style={{ border: "1px solid #CECECE" }}>
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

            <div
                className="result-table-scrollbar-container"
                ref={scrollbarRef}
                onScroll={handleScrollbarScroll}
            >
                <div style={{ width: headerRef.current ? headerRef.current.firstChild.scrollWidth : 0, height: 1 }} />
            </div>
        </div>
    );
};

export default NewResultFilter;
