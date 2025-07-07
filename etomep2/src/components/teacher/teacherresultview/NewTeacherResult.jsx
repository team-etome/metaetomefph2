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

    const classname = teacher_subject.teachersubjectinfo?.class
    const subjectid = teacher_subject.teachersubjectinfo?.subject_id
    const division = teacher_subject.teachersubjectinfo?.division

    console.log(classname,"classname",subjectid,"subjectid",division,"division")


    console.log(teacher_id, "teacher_id");
    const navigate = useNavigate();

    // Fetch result data from API
    const fetchResultData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${APIURL}/api/resultteacher`, {
                params: {
                    class_name: classname,
                    subject: subjectid,
                    division:division
                }
            });

            console.log('API Response:', response.data);
            setResultData(response.data.data);

            // Extract unique types, exams, and years from the nested data
            if (response.data && response.data.data) {
                const allResults = [];
                
                // Flatten the nested data structure
                response.data.data.forEach(student => {
                    // Add main exam results
                    if (student.main_exam && student.main_exam.length > 0) {
                        student.main_exam.forEach(exam => {
                            allResults.push({
                                student_id: student.student_roll,
                                student_name: student.student_name,
                                type: 'exam_result',
                                exam_name: exam.exam_name || 'Main Exam',
                                exam_date: exam.exam_date,
                                year: new Date(exam.exam_date).getFullYear(),
                                marks: exam.obtained_marks,
                                total_marks: exam.total_marks || 100,
                                roll_no: student.student_roll
                            });
                        });
                    }
                    
                    // Add assignment results
                    if (student.assignments && student.assignments.length > 0) {
                        student.assignments.forEach(assignment => {
                            allResults.push({
                                student_id: student.student_roll,
                                student_name: student.student_name,
                                type: 'assignment',
                                exam_name: assignment.assignment_name || 'Assignment',
                                exam_date: assignment.assigned_date,
                                year: new Date(assignment.assigned_date).getFullYear(),
                                marks: assignment.obtained_mark,
                                total_marks: assignment.total_mark || 10,
                                roll_no: student.student_roll
                            });
                        });
                    }
                    
                    // Add MCQ test results
                    if (student.mcq_tests && student.mcq_tests.length > 0) {
                        student.mcq_tests.forEach(mcq => {
                            allResults.push({
                                student_id: student.student_roll,
                                student_name: student.student_name,
                                type: 'mcq_test',
                                exam_name: mcq.mcq_name || 'MCQ Test',
                                exam_date: mcq.date,
                                year: new Date(mcq.date).getFullYear(),
                                marks: mcq.obtained_mark,
                                total_marks: mcq.total_mark || 100,
                                roll_no: student.student_roll
                            });
                        });
                    }

                    // Add Mock test results
                    if (student.mock_tests && student.mock_tests.length > 0) {
                        student.mock_tests.forEach(mock => {
                            allResults.push({
                                student_id: student.student_roll,
                                student_name: student.student_name,
                                type: 'mock_test',
                                exam_name: mock.mock_name || 'Mock Test',
                                exam_date: mock.date,
                                year: new Date(mock.date).getFullYear(),
                                marks: mock.obtained_mark,
                                total_marks: mock.total_mark || 100,
                                roll_no: student.student_roll
                            });
                        });
                    }
                });

                // Extract unique types
                const types = [...new Set(allResults.map(item => item.type))].map(type => ({
                    value: type,
                    label: type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')
                }));
                setTypeOptions(types);
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

    // Update exam and year options when type changes
    useEffect(() => {
        if (!resultData || !selectedType) {
            setExamOptions([]);
            setYearOptions([]);
            return;
        }

        const allResults = [];
        
        // Flatten the nested data structure for the selected type
        resultData.forEach(student => {
            if (selectedType.value === 'exam_result' && student.main_exam && student.main_exam.length > 0) {
                student.main_exam.forEach(exam => {
                    allResults.push({
                        exam_name: exam.exam_name || 'Main Exam',
                        exam_date: exam.exam_date,
                        year: new Date(exam.exam_date).getFullYear(),
                        unique_id: `${exam.exam_name || 'Main Exam'}_${exam.exam_date}`
                    });
                });
            }
            
            if (selectedType.value === 'assignment' && student.assignments && student.assignments.length > 0) {
                student.assignments.forEach(assignment => {
                    allResults.push({
                        exam_name: assignment.assignment_name || 'Assignment',
                        exam_date: assignment.assigned_date,
                        year: new Date(assignment.assigned_date).getFullYear(),
                        unique_id: `${assignment.assignment_name || 'Assignment'}_${assignment.assigned_date}`
                    });
                });
            }
            
            if (selectedType.value === 'mcq_test' && student.mcq_tests && student.mcq_tests.length > 0) {
                student.mcq_tests.forEach(mcq => {
                    allResults.push({
                        exam_name: mcq.mcq_name || 'MCQ Test',
                        exam_date: mcq.date,
                        year: new Date(mcq.date).getFullYear(),
                        unique_id: `${mcq.mcq_name || 'MCQ Test'}_${mcq.date}`
                    });
                });
            }

            if (selectedType.value === 'mock_test' && student.mock_tests && student.mock_tests.length > 0) {
                student.mock_tests.forEach(mock => {
                    allResults.push({
                        exam_name: mock.mock_name || 'Mock Test',
                        exam_date: mock.date,
                        year: new Date(mock.date).getFullYear(),
                        unique_id: `${mock.mock_name || 'Mock Test'}_${mock.date}`
                    });
                });
            }
        });

        // Create unique exam options with date for same names
        const uniqueExams = [];
        const seenExams = new Set();
        
        allResults.forEach(result => {
            if (!seenExams.has(result.unique_id)) {
                seenExams.add(result.unique_id);
                const dateStr = new Date(result.exam_date).toLocaleDateString();
                uniqueExams.push({
                    value: result.unique_id,
                    label: `${result.exam_name} (${dateStr})`,
                    exam_name: result.exam_name,
                    exam_date: result.exam_date,
                    year: result.year
                });
            }
        });

        // Create unique year options
        const uniqueYears = [...new Set(allResults.map(item => item.year))].map(year => ({
            value: year,
            label: year
        }));

        setExamOptions(uniqueExams);
        setYearOptions(uniqueYears);
    }, [resultData, selectedType]);

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
        if (!resultData || !selectedType) return [];

        let filtered = [];

        // Flatten and filter the nested data structure
        resultData.forEach(student => {
            // Filter main exam results
            if (selectedType.value === 'exam_result' && student.main_exam && student.main_exam.length > 0) {
                student.main_exam.forEach(exam => {
                    const examUniqueId = `${exam.exam_name || 'Main Exam'}_${exam.exam_date}`;
                    const examYear = new Date(exam.exam_date).getFullYear();
                    
                    if (selectedExam && examUniqueId !== selectedExam.value) return;
                    if (selectedYear && examYear !== selectedYear.value) return;
                    
                    filtered.push({
                        student_id: student.student_roll,
                        student_name: student.student_name,
                        type: 'exam_result',
                        exam_name: exam.exam_name || 'Main Exam',
                        year: examYear,
                        marks: exam.obtained_marks,
                        total_marks: exam.total_marks || 100,
                        roll_no: student.student_roll
                    });
                });
            }
            
            // Filter assignment results
            if (selectedType.value === 'assignment' && student.assignments && student.assignments.length > 0) {
                student.assignments.forEach(assignment => {
                    const assignmentUniqueId = `${assignment.assignment_name || 'Assignment'}_${assignment.assigned_date}`;
                    const assignmentYear = new Date(assignment.assigned_date).getFullYear();
                    
                    if (selectedExam && assignmentUniqueId !== selectedExam.value) return;
                    if (selectedYear && assignmentYear !== selectedYear.value) return;
                    
                    filtered.push({
                        student_id: student.student_roll,
                        student_name: student.student_name,
                        type: 'assignment',
                        exam_name: assignment.assignment_name || 'Assignment',
                        year: assignmentYear,
                        marks: assignment.obtained_mark,
                        total_marks: assignment.total_mark || 10,
                        roll_no: student.student_roll
                    });
                });
            }
            
            // Filter MCQ test results
            if (selectedType.value === 'mcq_test' && student.mcq_tests && student.mcq_tests.length > 0) {
                student.mcq_tests.forEach(mcq => {
                    const mcqUniqueId = `${mcq.mcq_name || 'MCQ Test'}_${mcq.date}`;
                    const mcqYear = new Date(mcq.date).getFullYear();
                    
                    if (selectedExam && mcqUniqueId !== selectedExam.value) return;
                    if (selectedYear && mcqYear !== selectedYear.value) return;
                    
                    filtered.push({
                        student_id: student.student_roll,
                        student_name: student.student_name,
                        type: 'mcq_test',
                        exam_name: mcq.mcq_name || 'MCQ Test',
                        year: mcqYear,
                        marks: mcq.obtained_mark,
                        total_marks: mcq.total_mark || 100,
                        roll_no: student.student_roll
                    });
                });
            }

            // Filter Mock test results
            if (selectedType.value === 'mock_test' && student.mock_tests && student.mock_tests.length > 0) {
                student.mock_tests.forEach(mock => {
                    const mockUniqueId = `${mock.mock_name || 'Mock Test'}_${mock.date}`;
                    const mockYear = new Date(mock.date).getFullYear();
                    
                    if (selectedExam && mockUniqueId !== selectedExam.value) return;
                    if (selectedYear && mockYear !== selectedYear.value) return;
                    
                    filtered.push({
                        student_id: student.student_roll,
                        student_name: student.student_name,
                        type: 'mock_test',
                        exam_name: mock.mock_name || 'Mock Test',
                        year: mockYear,
                        marks: mock.obtained_mark,
                        total_marks: mock.total_mark || 100,
                        roll_no: student.student_roll
                    });
                });
            }
        });

        return filtered;
    };

    // Fetch data when component mounts
    useEffect(() => {
        if (teacher_id) {
            fetchResultData();
        }
    }, [teacher_id]);

    // Get unique assignments from the data
    const getUniqueAssignments = () => {
        if (!resultData || selectedType?.value !== 'assignment') return [];
        
        const assignments = [];
        const seenAssignments = new Set();
        
        resultData.forEach(student => {
            if (student.assignments && student.assignments.length > 0) {
                student.assignments.forEach(assignment => {
                    const uniqueId = `${assignment.assignment_name}_${assignment.assigned_date}`;
                    const assignmentYear = new Date(assignment.assigned_date).getFullYear();
                    
                    // Apply filters
                    if (selectedExam && uniqueId !== selectedExam.value) return;
                    if (selectedYear && assignmentYear !== selectedYear.value) return;
                    
                    if (!seenAssignments.has(uniqueId)) {
                        seenAssignments.add(uniqueId);
                        assignments.push({
                            assignment_name: assignment.assignment_name,
                            assigned_date: assignment.assigned_date,
                            total_mark: assignment.total_mark,
                            unique_id: uniqueId
                        });
                    }
                });
            }
        });
        return assignments;
    };

    // Get unique MCQ tests from the data
    const getUniqueMcqTests = () => {
        if (!resultData || selectedType?.value !== 'mcq_test') return [];
        
        const mcqTests = [];
        const seenMcqTests = new Set();
        
        resultData.forEach(student => {
            if (student.mcq_tests && student.mcq_tests.length > 0) {
                student.mcq_tests.forEach(mcq => {
                    const uniqueId = `${mcq.mcq_name}_${mcq.date}`;
                    const mcqYear = new Date(mcq.date).getFullYear();
                    
                    // Apply filters
                    if (selectedExam && uniqueId !== selectedExam.value) return;
                    if (selectedYear && mcqYear !== selectedYear.value) return;
                    
                    if (!seenMcqTests.has(uniqueId)) {
                        seenMcqTests.add(uniqueId);
                        mcqTests.push({
                            mcq_name: mcq.mcq_name,
                            date: mcq.date,
                            total_mark: mcq.total_mark,
                            unique_id: uniqueId
                        });
                    }
                });
            }
        });
        return mcqTests;
    };

    // Get unique Mock tests from the data
    const getUniqueMockTests = () => {
        if (!resultData || selectedType?.value !== 'mock_test') return [];
        
        const mockTests = [];
        const seenMockTests = new Set();
        
        resultData.forEach(student => {
            if (student.mock_tests && student.mock_tests.length > 0) {
                student.mock_tests.forEach(mock => {
                    const uniqueId = `${mock.mock_name}_${mock.date}`;
                    const mockYear = new Date(mock.date).getFullYear();
                    
                    // Apply filters
                    if (selectedExam && uniqueId !== selectedExam.value) return;
                    if (selectedYear && mockYear !== selectedYear.value) return;
                    
                    if (!seenMockTests.has(uniqueId)) {
                        seenMockTests.add(uniqueId);
                        mockTests.push({
                            mock_name: mock.mock_name,
                            date: mock.date,
                            total_mark: mock.total_mark,
                            unique_id: uniqueId
                        });
                    }
                });
            }
        });
        return mockTests;
    };

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
                                            <td>{result.roll_no}</td>
                                            <td>{result.student_name}</td>
                                            <td>{result.marks}</td>
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
                {!loading && (selectedType?.value === 'assignment' || selectedType?.value === 'mcq_test' || selectedType?.value === 'mock_test') && (
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

                                                {/* Get unique items based on selected type */}
                                                {selectedType?.value === 'assignment' && getUniqueAssignments().map((assignment, index) => (
                                                    <th
                                                        key={assignment.unique_id}
                                                        className="newteacherresult_th assignment-header-row1"
                                                    >
                                                        {assignment.assignment_name}
                                                    </th>
                                                ))}
                                                {selectedType?.value === 'mcq_test' && getUniqueMcqTests().map((mcq, index) => (
                                                    <th
                                                        key={mcq.unique_id}
                                                        className="newteacherresult_th assignment-header-row1"
                                                    >
                                                        {mcq.mcq_name}
                                                    </th>
                                                ))}
                                                {selectedType?.value === 'mock_test' && getUniqueMockTests().map((mock, index) => (
                                                    <th
                                                        key={mock.unique_id}
                                                        className="newteacherresult_th assignment-header-row1"
                                                    >
                                                        {mock.mock_name}
                                                    </th>
                                                ))}
                                            </tr>
                                            <tr>
                                                {/* "Posted On" (row 2) under each item */}
                                                {selectedType?.value === 'assignment' && getUniqueAssignments().map((assignment) => (
                                                    <th
                                                        key={assignment.unique_id + '_postedOn'}
                                                        className="newteacherresult_th assignment-header-row2"
                                                    >
                                                        Posted On: {new Date(assignment.assigned_date).toLocaleDateString()}
                                                    </th>
                                                ))}
                                                {selectedType?.value === 'mcq_test' && getUniqueMcqTests().map((mcq) => (
                                                    <th
                                                        key={mcq.unique_id + '_postedOn'}
                                                        className="newteacherresult_th assignment-header-row2"
                                                    >
                                                        Date: {new Date(mcq.date).toLocaleDateString()}
                                                    </th>
                                                ))}
                                                {selectedType?.value === 'mock_test' && getUniqueMockTests().map((mock) => (
                                                    <th
                                                        key={mock.unique_id + '_postedOn'}
                                                        className="newteacherresult_th assignment-header-row2"
                                                    >
                                                        Date: {new Date(mock.date).toLocaleDateString()}
                                                    </th>
                                                ))}
                                            </tr>
                                            <tr>
                                                {/* "Total: XX" (row 3) under each item */}
                                                {selectedType?.value === 'assignment' && getUniqueAssignments().map((assignment) => (
                                                    <th
                                                        key={assignment.unique_id + '_total'}
                                                        className="newteacherresult_th assignment-header-row3"
                                                    >
                                                        Total: {assignment.total_mark}
                                                    </th>
                                                ))}
                                                {selectedType?.value === 'mcq_test' && getUniqueMcqTests().map((mcq) => (
                                                    <th
                                                        key={mcq.unique_id + '_total'}
                                                        className="newteacherresult_th assignment-header-row3"
                                                    >
                                                        Total: {mcq.total_mark}
                                                    </th>
                                                ))}
                                                {selectedType?.value === 'mock_test' && getUniqueMockTests().map((mock) => (
                                                    <th
                                                        key={mock.unique_id + '_total'}
                                                        className="newteacherresult_th assignment-header-row3"
                                                    >
                                                        Total: {mock.total_mark}
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
                                            {resultData.filter(student => {
                                                // Filter students based on whether they have data for the selected filters
                                                if (selectedType?.value === 'assignment') {
                                                    return student.assignments?.some(assignment => {
                                                        const uniqueId = `${assignment.assignment_name}_${assignment.assigned_date}`;
                                                        const assignmentYear = new Date(assignment.assigned_date).getFullYear();
                                                        return (!selectedExam || uniqueId === selectedExam.value) &&
                                                               (!selectedYear || assignmentYear === selectedYear.value);
                                                    });
                                                }
                                                if (selectedType?.value === 'mcq_test') {
                                                    return student.mcq_tests?.some(mcq => {
                                                        const uniqueId = `${mcq.mcq_name}_${mcq.date}`;
                                                        const mcqYear = new Date(mcq.date).getFullYear();
                                                        return (!selectedExam || uniqueId === selectedExam.value) &&
                                                               (!selectedYear || mcqYear === selectedYear.value);
                                                    });
                                                }
                                                if (selectedType?.value === 'mock_test') {
                                                    return student.mock_tests?.some(mock => {
                                                        const uniqueId = `${mock.mock_name}_${mock.date}`;
                                                        const mockYear = new Date(mock.date).getFullYear();
                                                        return (!selectedExam || uniqueId === selectedExam.value) &&
                                                               (!selectedYear || mockYear === selectedYear.value);
                                                    });
                                                }
                                                return true; // Show all students for exam_result type
                                            }).map((student, idx) => (
                                                <tr className="newteacherresult_tr" key={idx}>
                                                    {/* ROLL NO (sticky) */}
                                                    <td className="newteacherresult_td sticky-left">
                                                        {student.student_roll}
                                                    </td>
                                                    {/* NAME (sticky) */}
                                                    <td className="newteacherresult_td sticky-left-2">
                                                        {student.student_name}
                                                    </td>

                                                    {/* Assignment Scores */}
                                                    {selectedType?.value === 'assignment' && getUniqueAssignments().map((assignment) => {
                                                        const studentAssignment = student.assignments?.find(a => 
                                                            a.assignment_name === assignment.assignment_name && 
                                                            a.assigned_date === assignment.assigned_date
                                                        );
                                                        return (
                                                            <td
                                                                key={student.student_roll + '_' + assignment.unique_id}
                                                                className="newteacherresult_td assignment-body-cell"
                                                            >
                                                                {studentAssignment ? studentAssignment.obtained_mark : '-'}
                                                            </td>
                                                        );
                                                    })}

                                                    {/* MCQ Test Scores */}
                                                    {selectedType?.value === 'mcq_test' && getUniqueMcqTests().map((mcq) => {
                                                        const studentMcq = student.mcq_tests?.find(m => 
                                                            m.mcq_name === mcq.mcq_name && 
                                                            m.date === mcq.date
                                                        );
                                                        return (
                                                            <td
                                                                key={student.student_roll + '_' + mcq.unique_id}
                                                                className="newteacherresult_td assignment-body-cell"
                                                            >
                                                                {studentMcq ? studentMcq.obtained_mark : '-'}
                                                            </td>
                                                        );
                                                    })}

                                                    {/* Mock Test Scores */}
                                                    {selectedType?.value === 'mock_test' && getUniqueMockTests().map((mock) => {
                                                        const studentMock = student.mock_tests?.find(m => 
                                                            m.mock_name === mock.mock_name && 
                                                            m.date === mock.date
                                                        );
                                                        return (
                                                            <td
                                                                key={student.student_roll + '_' + mock.unique_id}
                                                                className="newteacherresult_td assignment-body-cell"
                                                            >
                                                                {studentMock ? studentMock.obtained_mark : '-'}
                                                            </td>
                                                        );
                                                    })}
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
                                {/* The inner div's width must match the full scrollWidth of headerRef */}
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
