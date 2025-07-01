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

    return (
        <div className="newteacherassignments_main_container">
            <div className="newteacherassignments_main_header_container">
                <div className="newteacherassignments_header-controls d-flex justify-content-between align-items-center">
                    <div className="newteacherassignments_left-controls">

                        <Select
                            isClearable
                            // value={examTypes.find((type) => type === selectedExamType) ? { label: selectedExamType, value: selectedExamType } : null}
                            // onChange={handleExamTypeChange}
                            // options={examTypes.map((type) => ({ label: type, value: type }))}
                            styles={dashboardsmallcustomStyles}
                            placeholder="Select Month"
                        />

                        <Select
                            isClearable
                            // value={examYears.find((year) => year === selectedFilterYear) ? { label: selectedFilterYear, value: selectedFilterYear } : null}
                            // onChange={handleYearChange}
                            // options={examYears.map((year) => ({ label: year, value: year }))}
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
                                onClose={() => setShowPopup(false)}
                                class_name={class_name}
                                division={division}
                                subject={subject}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="newteacherassignments_classes_box" >
                <div className="newteacherassignments_table_wrapper">
                    {assignmentList && assignmentList.length > 0 ? (
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
                                {assignmentList.map(a => (
                                    <tr key={a.id}>
                                        <td>{a.title}</td>
                                        <td>{a.postedOn || a.dueDate || a.due_date}</td>
                                        <td className="newteacherassignments_actions_col">
                                            <div className="newteacherassignments_actions_wrapper">
                                                <MdOutlineEdit size={24} color="#9F7BFF" />
                                                <RiDeleteBinLine size={24} color="#FF6C6C" />
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
