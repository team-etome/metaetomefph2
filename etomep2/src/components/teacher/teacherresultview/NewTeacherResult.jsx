import React, { useEffect, useRef, useState } from 'react';
import './newteacherresult.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import student from "../../../assets/student.jpg"
import Swal from 'sweetalert2';
import Select from 'react-select';
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBinLine } from 'react-icons/ri';

const NewTeacherResult = () => {
    const APIURL = useSelector((state) => state.APIURL.url);
    const teacher = useSelector((state) => state.teacherinfo);
    const teacher_id = teacher.teacherinfo?.teacher_id;
    const [selectedType, setSelectedType] = useState(null);
    const [selectedExam, setSelectedExam] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [resultData, setResultData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [typeOptions, setTypeOptions] = useState([]);
    const [examOptions, setExamOptions] = useState([]);
    const [yearOptions, setYearOptions] = useState([]);
    const teacher_subject = useSelector((state) => state?.teachersubjectinfo);

    const classid = teacher_subject.teachersubjectinfo?.class
    const subjectid = teacher_subject.teachersubjectinfo?.subject_id
    // console.log(classid,"classid",subjectid,"subjectid")


    console.log(teacher_id, "teacher_id");
    const navigate = useNavigate();

    // Fetch result data from API
    const fetchResultData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${APIURL}/api/resultteacher`, {
                params: {
                    class_id: classid,
                    subject: subjectid
                }
            });

            console.log('API Response:', response.data);
            setResultData(response.data);

            // Extract unique types, exams, and years from the data
            if (response.data) {
                const types = [...new Set(response.data.map(item => item.type))].map(type => ({
                    value: type,
                    label: type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')
                }));
                setTypeOptions(types);

                const exams = [...new Set(response.data.map(item => item.exam_name))].map(exam => ({
                    value: exam,
                    label: exam
                }));
                setExamOptions(exams);

                const years = [...new Set(response.data.map(item => item.year))].map(year => ({
                    value: year,
                    label: year
                }));
                setYearOptions(years);
            }
        } catch (error) {
            console.error('Error fetching result data:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to fetch result data.'
            });
        } finally {
            setLoading(false);
        }
    };

    // Handle type selection change
    const handleTypeChange = (selectedOption) => {
        setSelectedType(selectedOption);
        setSelectedExam(null);
        setSelectedYear(null);
    };

    // Handle exam selection change
    const handleExamChange = (selectedOption) => {
        setSelectedExam(selectedOption);
    };

    // Handle year selection change
    const handleYearChange = (selectedOption) => {
        setSelectedYear(selectedOption);
    };

    // Filter data based on selected options
    const getFilteredData = () => {
        if (!resultData) return [];

        let filtered = resultData;

        if (selectedType) {
            filtered = filtered.filter(item => item.type === selectedType.value);
        }

        if (selectedExam) {
            filtered = filtered.filter(item => item.exam_name === selectedExam.value);
        }

        if (selectedYear) {
            filtered = filtered.filter(item => item.year === selectedYear.value);
        }

        return filtered;
    };

    // Fetch data when component mounts
    useEffect(() => {
        if (teacher_id) {
            fetchResultData();
        }
    }, [teacher_id]);

    // dummy students/results
    const dummyResults = [
        { roll: 1, name: 'Siddharth', score: 78 },
        { roll: 2, name: 'Vihaan', score: 16 },
        { roll: 3, name: 'Aarav', score: 83 },
        { roll: 4, name: 'Karan', score: 75 },
        { roll: 5, name: 'Rohan', score: 91 },
        { roll: 6, name: 'Krishna', score: 50 },
        { roll: 7, name: 'Reyansh', score: 58 },
        { roll: 8, name: 'Aditya', score: 52 },
        { roll: 9, name: 'Vivaan', score: 57 },
        { roll: 10, name: 'Aadhil', score: 66 },

    ]


    const headerRef = useRef(null);
    const bodyRef = useRef(null);
    const scrollbarRef = useRef(null);
    const isSyncingRef = useRef(false);


    const handleHeaderScroll = (e) => {
        if (isSyncingRef.current) return;
        isSyncingRef.current = true;
        const scrollLeft = e.target.scrollLeft;
        if (bodyRef.current) bodyRef.current.scrollLeft = scrollLeft;
        if (scrollbarRef.current) scrollbarRef.current.scrollLeft = scrollLeft;
        window.requestAnimationFrame(() => { isSyncingRef.current = false; });
    };


    const handleBodyScroll = (e) => {
        if (isSyncingRef.current) return;
        isSyncingRef.current = true;
        const scrollLeft = e.target.scrollLeft;
        if (headerRef.current) headerRef.current.scrollLeft = scrollLeft;
        if (scrollbarRef.current) scrollbarRef.current.scrollLeft = scrollLeft;
        window.requestAnimationFrame(() => { isSyncingRef.current = false; });
    };


    const handleScrollbarScroll = (e) => {
        if (isSyncingRef.current) return;
        isSyncingRef.current = true;
        const scrollLeft = e.target.scrollLeft;
        if (headerRef.current) headerRef.current.scrollLeft = scrollLeft;
        if (bodyRef.current) bodyRef.current.scrollLeft = scrollLeft;
        window.requestAnimationFrame(() => { isSyncingRef.current = false; });
    };

    const assignments = [
        {
            key: 'assignment1',
            name: 'Assignment 1',
            postedOn: '14/04/2025',
            total: 10,
        },
        {
            key: 'assignment2',
            name: 'Assignment 2',
            postedOn: '14/04/2025',
            total: 10,
        },
        {
            key: 'assignment3',
            name: 'Assignment 3',
            postedOn: '14/04/2025',
            total: 10,
        },
        {
            key: 'assignment4',
            name: 'Assignment 4',
            postedOn: '14/04/2025',
            total: 10,
        },
        {
            key: 'assignment5',
            name: 'Assignment 5',
            postedOn: '14/04/2025',
            total: 10,
        },
        {
            key: 'assignment6',
            name: 'Assignment 6',
            postedOn: '14/04/2025',
            total: 10,
        },
        {
            key: 'assignment7',
            name: 'Assignment 7',
            postedOn: '14/04/2025',
            total: 10,
        },
        {
            key: 'assignment8',
            name: 'Assignment 8',
            postedOn: '14/04/2025',
            total: 10,
        },
        {
            key: 'assignment9',
            name: 'Assignment 9',
            postedOn: '14/04/2025',
            total: 10,
        },
    ];

    const dummyStudents = [
        {
            rollNo: '1',
            name: 'Siddharth',
            marks: {
                assignment1: 5,
                assignment2: 5,
                assignment3: 5,
                assignment4: 5,
                assignment5: 5,
                assignment6: 5,
                assignment7: 5,
            },
        },
        {
            rollNo: '2',
            name: 'Vihaan',
            marks: {
                assignment1: 2,
                assignment2: 2,
                assignment3: 2,
                assignment4: 2,
                assignment5: 2,
                assignment6: 2,
                assignment7: 2,
            },
        },
        {
            rollNo: '3',
            name: 'Aarav',
            marks: {
                assignment1: 6,
                assignment2: 6,
                assignment3: 6,
                assignment4: 6,
                assignment5: 6,
                assignment6: 6,
                assignment7: 6,
            },
        },
        {
            rollNo: '4',
            name: 'Karan',
            marks: {
                assignment1: 7,
                assignment2: 7,
                assignment3: 7,
                assignment4: 7,
                assignment5: 7,
                assignment6: 7,
                assignment7: 7,
            },
        },
        {
            rollNo: '5',
            name: 'Rohan',
            marks: {
                assignment1: 8,
                assignment2: 8,
                assignment3: 8,
                assignment4: 8,
                assignment5: 8,
                assignment6: 8,
                assignment7: 8,
            },
        },
        {
            rollNo: '6',
            name: 'Krishna',
            marks: {
                assignment1: 1,
                assignment2: 1,
                assignment3: 1,
                assignment4: 1,
                assignment5: 1,
                assignment6: 1,
                assignment7: 1,
            },
        },
        {
            rollNo: '7',
            name: 'Krishna',
            marks: {
                assignment1: 1,
                assignment2: 1,
                assignment3: 1,
                assignment4: 1,
                assignment5: 1,
                assignment6: 1,
                assignment7: 1,
            },
        }, {
            rollNo: '8',
            name: 'Krishna',
            marks: {
                assignment1: 1,
                assignment2: 1,
                assignment3: 1,
                assignment4: 1,
                assignment5: 1,
                assignment6: 1,
                assignment7: 1,
            },
        },
    ];






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
        <div className="newteacherresult_main_container">
            <div className="newteacherresult_main_header_container">
                <div className="newteacherresult_header-controls d-flex justify-content-between align-items-center" >
                    <div className="newteacherresult_left-controls">
                        <Select
                            isClearable
                            styles={dashboardsmallcustomStyles}
                            placeholder="Select Type"
                            options={typeOptions}
                            value={selectedType}
                            onChange={handleTypeChange}
                            isLoading={loading}
                        />
                    </div>
                    {selectedType && (
                        <div className="newteacherresult_right-controls">
                            <Select
                                isClearable
                                styles={dashboardsmallcustomStyles}
                                placeholder="Select Exam"
                                options={examOptions}
                                value={selectedExam}
                                onChange={handleExamChange}
                                isLoading={loading}
                            />
                            <Select
                                isClearable
                                styles={dashboardsmallcustomStyles}
                                placeholder="Select Year"
                                options={yearOptions}
                                value={selectedYear}
                                onChange={handleYearChange}
                                isLoading={loading}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="newteacherresult_classes_box" >
                {loading && (
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        <p>Loading results...</p>
                    </div>
                )}

                {!loading && selectedType?.value === "exam_result" && (
                    <div className="newteacherresult_content">
                        <p className="newteacherresult_title">
                            Ankit
                        </p>

                        <div className="newteacherresult_table_wrapper-examresult">
                            <table className="newteacherresult_table">
                                <colgroup>
                                    <col style={{ width: '15%' }} />
                                    <col style={{ width: '50%' }} />
                                    <col style={{ width: '35%' }} />
                                </colgroup>
                                <thead>
                                    <tr className="newteacherresult_table_headrow1">
                                        <th rowSpan="2">Roll No</th>
                                        <th rowSpan="2">Name</th>
                                        <th>{selectedExam?.label || 'Subject'}</th>
                                    </tr>
                                    <tr className="newteacherresult_table_headrow2">
                                        <th className="newteacherresult_subtotal">
                                            Total: {getFilteredData()[0]?.total_marks || 100}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getFilteredData().map((result, index) => (
                                        <tr key={index}>
                                            <td>{result.roll_no || result.student_roll}</td>
                                            <td>{result.student_name}</td>
                                            <td>{result.marks || result.score}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {getFilteredData().length === 0 && (
                            <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                                <p>No results found for the selected criteria.</p>
                            </div>
                        )}
                    </div>
                )}
                {!loading && selectedType?.value === 'assignment' && (
                    <>
                        <div className="newteacherresult_content">

                            <div className="newteacherresult_table_wrapper">
                                {/* ── HEADER TABLE (only <thead>, horizontally scrollable) ── */}
                                <div
                                    className="newteacherresult-table-header-container"
                                    ref={headerRef}
                                    onScroll={handleHeaderScroll}
                                >
                                    <table className="newteacherresult_table">
                                        <thead>
                                            <tr>
                                                {/* Roll No & Name span all three header rows */}
                                                <th
                                                    className="newteacherresult_th sticky-left"
                                                    rowSpan="3"
                                                >
                                                    Roll No
                                                </th>
                                                <th
                                                    className="newteacherresult_th sticky-left-2"
                                                    rowSpan="3"
                                                >
                                                    Name
                                                </th>

                                                {/* ASSIGNMENT NAMES: row 1 */}
                                                {assignments.map((a) => (
                                                    <th
                                                        key={a.key}
                                                        className="newteacherresult_th assignment-header-row1"
                                                    >
                                                        {a.name}
                                                    </th>
                                                ))}
                                            </tr>
                                            <tr>
                                                {/* “Posted On” (row 2) under each assignment */}
                                                {assignments.map((a) => (
                                                    <th
                                                        key={a.key + '_postedOn'}
                                                        className="newteacherresult_th assignment-header-row2"
                                                    >
                                                        Posted On: {a.postedOn}
                                                    </th>
                                                ))}
                                            </tr>
                                            <tr>
                                                {/* “Total: XX” (row 3) under each assignment */}
                                                {assignments.map((a) => (
                                                    <th
                                                        key={a.key + '_total'}
                                                        className="newteacherresult_th assignment-header-row3"
                                                    >
                                                        Total: {a.total}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                    </table>
                                </div>


                                <div
                                    className="newteacherresult-table-body-container"
                                    ref={bodyRef}
                                    onScroll={handleBodyScroll}
                                >
                                    <table className="newteacherresult_table">
                                        <tbody>
                                            {dummyStudents.map((stu, idx) => (
                                                <tr className="newteacherresult_tr" key={idx}>
                                                    {/* ROLL NO (sticky) */}
                                                    <td className="newteacherresult_td sticky-left">
                                                        {stu.rollNo}
                                                    </td>
                                                    {/* NAME (sticky) */}
                                                    <td className="newteacherresult_td sticky-left-2">
                                                        {stu.name}
                                                    </td>

                                                    {/* ASSIGNMENT SCORES */}
                                                    {assignments.map((a) => (
                                                        <td
                                                            key={stu.rollNo + '_' + a.key}
                                                            className="newteacherresult_td assignment-body-cell"
                                                        >
                                                            {stu.marks[a.key] ?? '-'}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div
                                className="newteacherresult-table-scrollbar-container"
                                ref={scrollbarRef}
                                onScroll={handleScrollbarScroll}
                            >
                                {/* The inner div’s width must match the full scrollWidth of headerRef */}
                                <div
                                    style={{
                                        width: headerRef.current
                                            ? headerRef.current.firstChild.scrollWidth
                                            : 0,
                                        height: 1,
                                    }}
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div >
    );
};

export default NewTeacherResult;
