import React, { useEffect, useState, } from 'react';
import './newteachermcq.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import student from "../../../assets/student.jpg"
import Swal from 'sweetalert2';
import Select from 'react-select';
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBinLine } from 'react-icons/ri';
import NewTeacherMcqAdd from './NewTeacherMcqAdd';

const NewTeacherMcq = ({ class_name, division, subject }) => {
    const APIURL = useSelector((state) => state.APIURL.url);
    const teacher = useSelector((state) => state.teacherinfo);
    const teacher_id = teacher.teacherinfo?.teacher_id;
    const [adding, setAdding] = useState(false);
    const [mcqs, setMcqs] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);

    // Fetch MCQs from API
    const fetchMcqs = async () => {
        try {
            const response = await axios.get(`${APIURL}/api/test`, {
                params: {
                    teacher_id: teacher_id,
                    class_name: class_name,
                    division: division,
                    subject: subject,
                    type:"MCQ"
                }
            });
            console.log('Fetched MCQ data:', response.data);
            setMcqs(response.data);
        } catch (error) {
            console.error('Failed to fetch MCQs:', error);
        }
    };

    useEffect(() => {
        if (teacher_id && class_name && division && subject) {
            fetchMcqs();
        }
    }, [APIURL, teacher_id, class_name, division, subject]);

    // Delete handler for MCQs
    const handleDeleteMcq = async (id) => {
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
                params: { type: "MCQ" }
              });
              // Remove the deleted MCQ from state
              setMcqs(prevMcqs => {
                console.log('Previous MCQs state:', prevMcqs);
                console.log('Deleting MCQ with ID:', id);
                
                // Handle different possible data structures
                if (prevMcqs && Array.isArray(prevMcqs.test)) {
                  const filteredMcqs = prevMcqs.test.filter(mcq => mcq.id !== id);
                  console.log('Filtered MCQs (object structure):', filteredMcqs);
                  return {
                    ...prevMcqs,
                    test: filteredMcqs
                  };
                } else if (Array.isArray(prevMcqs)) {
                  const filteredMcqs = prevMcqs.filter(mcq => mcq.id !== id);
                  console.log('Filtered MCQs (array structure):', filteredMcqs);
                  return filteredMcqs;
                }
                console.log('No matching structure found, returning original state');
                return prevMcqs;
              });
              Swal.fire("Deleted!", "Your MCQ has been deleted.", "success");
            } catch (error) {
              console.error("Error deleting MCQ:", error);
              Swal.fire("Error!", "Failed to delete MCQ.", "error");
            }
          }
        });
    };

    // Extract unique months and years from MCQs
    const getUniqueMonthsAndYears = (mcqList) => {
        const months = new Set();
        const years = new Set();
        
        mcqList.forEach(mcq => {
            if (mcq.exam_date || mcq.date || mcq.created_date) {
                const date = new Date(mcq.exam_date || mcq.date || mcq.created_date);
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

    // Filter MCQs based on selected month and year
    const getFilteredMcqs = (mcqList) => {
        if (!selectedMonth && !selectedYear) return mcqList;
        
        return mcqList.filter(mcq => {
            if (!mcq.exam_date && !mcq.date && !mcq.created_date) return false;
            const date = new Date(mcq.exam_date || mcq.date || mcq.created_date);
            const month = date.toLocaleString('default', { month: 'long' });
            const year = date.getFullYear().toString();
            
            const monthMatch = !selectedMonth || month === selectedMonth.value;
            const yearMatch = !selectedYear || year === selectedYear.value;
            
            return monthMatch && yearMatch;
        });
    };

    // Robust MCQ list extraction
    console.log('Current MCQs state:', mcqs);
    const mcqList = (mcqs && Array.isArray(mcqs.test))
        ? mcqs.test
        : Array.isArray(mcqs)
            ? mcqs
            : [];
    console.log('Extracted mcqList:', mcqList);

    const { months, years } = getUniqueMonthsAndYears(mcqList);
    const filteredMcqs = getFilteredMcqs(mcqList);

    console.log(teacher_id, "teacher eeee")
    const navigate = useNavigate();

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
        <div className="newteachermcq_main_container">
            {!adding ? (
                <>
                    <div className="newteachermcq_main_header_container">
                        <div className="newteachermcq_header-controls d-flex justify-content-between align-items-center">
                            <div className="newteachermcq_left-controls">

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
                            <div className="newteachermcq_left-controls">
                                <button
                                    className="btn-primary btn-sm newteachermcq_result_add_button"
                                    onClick={() => setAdding(true)}
                                >
                                    + Add
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="newteachermcq_classes_box" >
                        <div className="newteachermcq_table_wrapper">
                            <table className="newteachermcq_table">
                                <colgroup>
                                    <col style={{ width: '45%' }} />
                                    <col style={{ width: '45%' }} />
                                    <col style={{ width: '10%' }} />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Posted on</th>
                                        <th className="newteachermcq_actions_col_head">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredMcqs && filteredMcqs.length > 0 ? (
                                        filteredMcqs.map(a => (
                                            <tr key={a.id}>
                                                <td>{a.exam_name || a.title}</td>
                                                <td>{a.exam_date || a.postedOn || a.date || a.created_date}</td>
                                                <td className="newteachermcq_actions_col">
                                                    <div className="newteachermcq_actions_wrapper">
                                                        <MdOutlineEdit size={24} color="#9F7BFF" />
                                                        <RiDeleteBinLine 
                                                            size={24} 
                                                            color="#FF6C6C" 
                                                            onClick={() => handleDeleteMcq(a.id)}
                                                            style={{ cursor: 'pointer' }}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" style={{ textAlign: 'center', color: '#888', fontWeight: 500 }}>
                                                No MCQs found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </>
            ) : (
                <NewTeacherMcqAdd 
                    onBack={() => setAdding(false)} 
                    class_name={class_name}
                    division={division}
                    subject={subject}
                    onMcqAdded={fetchMcqs}
                />
            )}
        </div >
    );
};

export default NewTeacherMcq;
