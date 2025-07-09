import React, { useEffect, useState, } from 'react';
import './newtestlisting.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import student from "../../../assets/student.jpg"
import Swal from 'sweetalert2';
import Select from 'react-select';
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBinLine } from 'react-icons/ri';
import NewTestListingAdd from './NewTestListingAdd';
import NewTestQuestionsViewer from './NewTestQuestionsViewer';

const NewTestListing = ({ class_name, division, subject }) => {
    console.log(class_name, division, subject,"class_name, division, subject, admin")
    const APIURL = useSelector((state) => state.APIURL.url);
    const teacher = useSelector((state) => state.teacherinfo);
    const admin_id = useSelector((state) => state.admininfo.admininfo?.admin_id);
    const teacher_id = teacher.teacherinfo?.teacher_id;
    const [adding, setAdding] = useState(false);
    const [tests, setTests] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedTest, setSelectedTest] = useState(null);
    const [showQuestionsViewer, setShowQuestionsViewer] = useState(false);
    const [editData, setEditData] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    // Fetch tests from API
    const fetchTests = async () => {
        try {
            const response = await axios.get(`${APIURL}/api/test`, {
                params: {
                    teacher_id: teacher_id,
                    class_name: class_name,
                    division: division,
                    subject: subject,
                    type:"MOCK"
                }
            });
            console.log('Fetched tests data:', response.data);
            setTests(response.data);
        } catch (error) {
            console.error('Failed to fetch tests:', error);
        }
    };

    useEffect(() => {
        if (teacher_id && class_name && division && subject) {
            fetchTests();
        }
    }, [APIURL, teacher_id, class_name, division, subject]);

    // Edit handler for tests
    const handleEditTest = (test) => {
        setEditData(test);
        setIsEditMode(true);
        setAdding(true);
    };

    // View questions handler
    const handleViewQuestions = (test) => {
        setSelectedTest(test);
        setShowQuestionsViewer(true);
    };

    // Delete handler for tests
    const handleDeleteTest = async (id) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this deletion!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel"
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              await axios.delete(`${APIURL}/api/testdelete/${id}/`, {
                params: { type: "mock" }
              });
              // Remove the deleted test from state
              setTests(prevTests => {
                console.log('Previous tests state:', prevTests);
                console.log('Deleting test with ID:', id);
                
                // Handle different possible data structures
                if (prevTests && Array.isArray(prevTests.test)) {
                  const filteredTests = prevTests.test.filter(test => test.id !== id);
                  console.log('Filtered tests (object structure):', filteredTests);
                  return {
                    ...prevTests,
                    test: filteredTests
                  };
                } else if (Array.isArray(prevTests)) {
                  const filteredTests = prevTests.filter(test => test.id !== id);
                  console.log('Filtered tests (array structure):', filteredTests);
                  return filteredTests;
                }
                console.log('No matching structure found, returning original state');
                return prevTests;
              });
              Swal.fire("Deleted!", "Your test has been deleted.", "success");
            } catch (error) {
              console.error("Error deleting test:", error);
              Swal.fire("Error!", "Failed to delete test.", "error");
            }
          }
        });
    };

    // Extract unique months and years from tests
    const getUniqueMonthsAndYears = (testList) => {
        const months = new Set();
        const years = new Set();
        
        testList.forEach(test => {
            if (test.exam_date || test.date) {
                const date = new Date(test.exam_date || test.date);
                const month = date.toLocaleString('default', { month: 'long' });
                const year = date.getFullYear().toString();
                months.add(month);
                years.add(year);
            }
        });
        
        return {
            months: Array.from(months).sort(),
            years: Array.from(years).sort((a, b) => b - a) // Sort years descending
        };
    };

    // Filter tests based on selected month and year
    const getFilteredTests = (testList) => {
        if (!selectedMonth && !selectedYear) return testList;
        
        return testList.filter(test => {
            if (!test.exam_date && !test.date) return false;
            const date = new Date(test.exam_date || test.date);
            const month = date.toLocaleString('default', { month: 'long' });
            const year = date.getFullYear().toString();
            
            const monthMatch = !selectedMonth || month === selectedMonth.value;
            const yearMatch = !selectedYear || year === selectedYear.value;
            
            return monthMatch && yearMatch;
        });
    };

    // Robust test list extraction
    console.log('Current tests state:', tests);
    const testList = (tests && Array.isArray(tests.test))
        ? tests.test
        : Array.isArray(tests)
            ? tests
            : [];
    console.log('Extracted testList:', testList);

    const { months, years } = getUniqueMonthsAndYears(testList);
    const filteredTests = getFilteredTests(testList);

    console.log(teacher_id, "admin eeee")
    const navigate = useNavigate();

    const handleTestAdded = () => {
        fetchTests();
        setAdding(false);
        setEditData(null);
        setIsEditMode(false);
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
        <div className="newtestlisting_main_container">
            {!adding ? (
                <>
                    <div className="newtestlisting_main_header_container">
                        <div className="newtestlisting_header-controls d-flex justify-content-between align-items-center">
                            <div className="newtestlisting_left-controls">

                                <Select
                                    isClearable
                                    value={selectedMonth}
                                    onChange={setSelectedMonth}
                                    options={months.map(month => ({ label: month, value: month }))}
                                    styles={dashboardsmallcustomStyles}
                                    placeholder="Select Month"
                                />

                                <Select
                                    isClearable
                                    value={selectedYear}
                                    onChange={setSelectedYear}
                                    options={years.map(year => ({ label: year, value: year }))}
                                    styles={dashboardsmallcustomStyles}
                                    placeholder="Select Year"
                                />

                            </div>
                            <div className="newtestlisting_left-controls">
                                <button
                                    className="btn-primary btn-sm newtestlisting_result_add_button"
                                    onClick={() => setAdding(true)}
                                >
                                    + Add
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="newtestlisting_classes_box" >
                        <div className="newtestlisting_table_wrapper">
                            <table className="newtestlisting_table">
                                <colgroup>
                                    <col style={{ width: '45%' }} />
                                    <col style={{ width: '45%' }} />
                                    <col style={{ width: '10%' }} />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Posted on</th>
                                        <th className="newtestlisting_actions_col_head">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTests && filteredTests.length > 0 ? (
                                        filteredTests.map(a => (
                                            <tr key={a.id}>
                                                <td>{a.exam_name || a.title}</td>
                                                <td>{a.exam_date || a.postedOn || a.date}</td>
                                                <td className="newtestlisting_actions_col">
                                                    <div className="newtestlisting_actions_wrapper">
                                                        <MdOutlineEdit 
                                                            size={24} 
                                                            color="#9F7BFF" 
                                                            onClick={() => handleEditTest(a)}
                                                            style={{ cursor: 'pointer' }}
                                                        />
                                                        <RiDeleteBinLine 
                                                            size={24} 
                                                            color="#FF6C6C" 
                                                            onClick={() => handleDeleteTest(a.id)}
                                                            style={{ cursor: 'pointer' }}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" style={{ textAlign: 'center', color: '#888', fontWeight: 500 }}>
                                                No tests found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                    </div>

                    {/* Questions Viewer Modal */}
                    {showQuestionsViewer && selectedTest && (
                        <NewTestQuestionsViewer
                            test={selectedTest}
                            onClose={() => {
                                setShowQuestionsViewer(false);
                                setSelectedTest(null);
                            }}
                        />
                    )}
                </>
            ) : (
                <NewTestListingAdd 
                    onBack={() => {
                        setAdding(false);
                        setEditData(null);
                        setIsEditMode(false);
                    }} 
                    class_name={class_name}
                    division={division}
                    subject={subject}
                    onTestAdded={handleTestAdded}
                    editData={editData}
                    isEditMode={isEditMode}
                />
            )}
        </div >
    );
};

export default NewTestListing;
