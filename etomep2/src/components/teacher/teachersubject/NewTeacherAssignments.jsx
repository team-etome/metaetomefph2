import React, { useEffect, useState, } from 'react';
import './newteacherassignments.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import student from "../../../assets/student.jpg"
import Swal from 'sweetalert2';
import Select from 'react-select';
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBinLine } from 'react-icons/ri';
import NewTeacherAddAssignment from './NewTeacherAddAssignment';

const NewTeacherAssignments = ({ class_name, division, subject }) => {
    const APIURL = useSelector((state) => state.APIURL.url);
    const teacher = useSelector((state) => state.teacherinfo);
    const teacher_id = teacher.teacherinfo?.teacher_id;
    const [showPopup, setShowPopup] = useState(false);
    const [assignments, setAssignments] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [editData, setEditData] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const navigate = useNavigate();
    console.log(class_name, division, subject,teacher_id,"class_name, division, subject,teacher_id")

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const params = new URLSearchParams({
                    teacher_id,
                    standard: class_name,
                    division,
                    subject
                });
                const response = await axios.get(`${APIURL}/api/assignment?${params.toString()}`);
                setAssignments(response.data);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to fetch assignments.'
                });
            }
        };
        if (teacher_id && class_name && division && subject) {
            fetchAssignments();
        }
    }, [APIURL, teacher_id, class_name, division, subject, showPopup]);

    console.log(assignments,"response.dataresponse.dataresponse.data")

    // Edit handler for assignments
    const handleEditAssignment = (assignment) => {
        // Use the existing assignment data from the assignments array
        setEditData(assignment);
        setIsEditMode(true);
        setShowPopup(true);
    };

    // Delete handler for assignments
    const handleDeleteAssignment = async (id) => {
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
                params: { type: "assignment" }
              });
              // Remove the deleted assignment from state
              setAssignments(prevAssignments => {
                const newAssignments = { ...prevAssignments };
                if (newAssignments.assignments) {
                  newAssignments.assignments = newAssignments.assignments.filter(assignment => assignment.id !== id);
                }
                return newAssignments;
              });
              Swal.fire("Deleted!", "Your assignment has been deleted.", "success");
            } catch (error) {
              console.error("Error deleting assignment:", error);
              Swal.fire("Error!", "Failed to delete assignment.", "error");
            }
          }
        });
    };

    // Extract unique months and years from assignments
    const getUniqueMonthsAndYears = (assignmentList) => {
        const months = new Set();
        const years = new Set();
        
        assignmentList.forEach(assignment => {
            if (assignment.postedOn || assignment.dueDate || assignment.due_date || assignment.date) {
                const date = new Date(assignment.postedOn || assignment.dueDate || assignment.due_date || assignment.date);
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

    // Filter assignments based on selected month and year
    const getFilteredAssignments = (assignmentList) => {
        if (!selectedMonth && !selectedYear) return assignmentList;
        
        return assignmentList.filter(assignment => {
            if (!assignment.postedOn && !assignment.dueDate && !assignment.due_date && !assignment.date) return false;
            const date = new Date(assignment.postedOn || assignment.dueDate || assignment.due_date || assignment.date);
            const month = date.toLocaleString('default', { month: 'long' });
            const year = date.getFullYear().toString();
            
            const monthMatch = !selectedMonth || month === selectedMonth.value;
            const yearMatch = !selectedYear || year === selectedYear.value;
            
            return monthMatch && yearMatch;
        });
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

    // Robust assignment list extraction
    const assignmentList = (assignments && Array.isArray(assignments.assignments))
      ? assignments.assignments
      : Array.isArray(assignments)
        ? assignments
        : [];

    const { months, years } = getUniqueMonthsAndYears(assignmentList);
    const filteredAssignments = getFilteredAssignments(assignmentList);

    return (
        <div className="newteacherassignments_main_container">
            <div className="newteacherassignments_main_header_container">
                <div className="newteacherassignments_header-controls d-flex justify-content-between align-items-center">
                    <div className="newteacherassignments_left-controls">

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
                    <div className="newteacherassignments_left-controls">
                        <button
                            className="btn-primary btn-sm newteacherassignments_result_add_button"
                            onClick={() => setShowPopup(true)}   // ← open popup
                        >
                            + Add
                        </button>
                        {showPopup && (
                            <NewTeacherAddAssignment
                                onClose={() => {
                                    setShowPopup(false);
                                    setEditData(null);
                                    setIsEditMode(false);
                                }}
                                class_name={class_name}
                                division={division}
                                subject={subject}
                                editData={editData}
                                isEditMode={isEditMode}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="newteacherassignments_classes_box" >
                <div className="newteacherassignments_table_wrapper">
                    {filteredAssignments && filteredAssignments.length > 0 ? (
                        <table className="newteacherassignments_table">
                            <colgroup>
                                <col style={{ width: '45%' }} />
                                <col style={{ width: '45%' }} />
                                <col style={{ width: '10%' }} />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Posted on</th>
                                    <th className="newteacherassignments_actions_col_head">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAssignments.map(a => (
                                    <tr key={a.id}>
                                        <td>{a.title}</td>
                                        <td>{a.postedOn || a.dueDate || a.due_date}</td>
                                        <td className="newteacherassignments_actions_col">
                                            <div className="newteacherassignments_actions_wrapper">
                                                <MdOutlineEdit 
                                                    size={24} 
                                                    color="#9F7BFF" 
                                                    onClick={() => handleEditAssignment(a)}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                                <RiDeleteBinLine 
                                                    size={24} 
                                                    color="#FF6C6C" 
                                                    onClick={() => handleDeleteAssignment(a.id)}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div>
                            <p style={{ textAlign: 'center', color: '#888', fontWeight: 500 }}>
                                No assignment is assigned
                            </p>
                        </div>
                    )}
                </div>

            </div>
        </div >
    );
};

export default NewTeacherAssignments;
