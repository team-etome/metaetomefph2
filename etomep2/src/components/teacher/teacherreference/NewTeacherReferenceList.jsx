import React, { useEffect, useState, } from 'react';
import './newteacherreferencelist.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import student from "../../../assets/student.jpg"
import Swal from 'sweetalert2';
import Select from 'react-select';
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBinLine } from 'react-icons/ri';
import NewTeacherAddReference from './NewTeacherAddReference';

const NewTeacherReferenceList = ({ class_name, division, subject }) => {
    const APIURL = useSelector((state) => state.APIURL.url);
    const teacher = useSelector((state) => state.teacherinfo);
    const teacher_id = teacher.teacherinfo?.teacher_id;
    const [showPopup, setShowPopup] = useState(false);
    const [references, setReferences] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [editData, setEditData] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        const fetchReferences = async () => {
            try {
                const params = new URLSearchParams({
                    teacher_id,
                    standard: class_name,
                    division,
                    subject
                });
                const response = await axios.get(`${APIURL}/api/reference?${params.toString()}`);
                setReferences(response.data);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to fetch references.'
                });
            }
        };
        if (teacher_id && class_name && division && subject) {
            fetchReferences();
        }
    }, [APIURL, teacher_id, class_name, division, subject, showPopup]);

    // Edit handler for references
    const handleEditReference = (reference) => {
        // Use the existing reference data from the references array
        setEditData(reference);
        setIsEditMode(true);
        setShowPopup(true);
    };

    // Delete handler for references
    const handleDeleteReference = async (id) => {
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
                params: { type: "reference" }
              });
              // Remove the deleted reference from state
              setReferences(prevReferences => {
                const newReferences = { ...prevReferences };
                if (newReferences.reference) {
                  newReferences.reference = newReferences.reference.filter(ref => ref.id !== id);
                }
                return newReferences;
              });
              Swal.fire("Deleted!", "Your reference has been deleted.", "success");
            } catch (error) {
              console.error("Error deleting reference:", error);
              Swal.fire("Error!", "Failed to delete reference.", "error");
            }
          }
        });
    };

    // Extract unique months and years from references
    const getUniqueMonthsAndYears = (referenceList) => {
        const months = new Set();
        const years = new Set();
        
        referenceList.forEach(ref => {
            if (ref.date) {
                const date = new Date(ref.date);
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

    // Filter references based on selected month and year
    const getFilteredReferences = (referenceList) => {
        if (!selectedMonth && !selectedYear) return referenceList;
        
        return referenceList.filter(ref => {
            if (!ref.date) return false;
            const date = new Date(ref.date);
            const month = date.toLocaleString('default', { month: 'long' });
            const year = date.getFullYear().toString();
            
            const monthMatch = !selectedMonth || month === selectedMonth.value;
            const yearMatch = !selectedYear || year === selectedYear.value;
            
            return monthMatch && yearMatch;
        });
    };

    // Robust reference list extraction
    console.log(references,"referencesreferencesreferences")
    const referenceList = (references && Array.isArray(references.reference))
        ? references.reference
        : Array.isArray(references)
            ? references
            : [];

    const { months, years } = getUniqueMonthsAndYears(referenceList);
    const filteredReferences = getFilteredReferences(referenceList);

    console.log(referenceList, "referenceListreferenceListreferenceList")

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
        <div className="newteacherreferencelist_main_container">
            <div className="newteacherreferencelist_main_header_container">
                <div className="newteacherreferencelist_header-controls d-flex justify-content-between align-items-center">
                    <div className="newteacherreferencelist_left-controls">

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
                    <div className="newteacherreferencelist_left-controls">
                        <button
                            className="btn-primary btn-sm newteacherreferencelist_result_add_button"
                            onClick={() => setShowPopup(true)}   // ← open popup
                        >
                            + Add
                        </button>
                        {showPopup && (
                            <NewTeacherAddReference
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
            <div className="newteacherreferencelist_classes_box">
                <div className="newteacherreferencelist_table_wrapper">
                    {filteredReferences && filteredReferences.length > 0 ? (
                        <table className="newteacherreferencelist_table">
                            <colgroup>
                                <col style={{ width: '45%' }} />
                                <col style={{ width: '45%' }} />
                                <col style={{ width: '10%' }} />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Posted on</th>
                                    <th className="newteacherreferencelist_actions_col_head">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredReferences.map(a => (
                                    <tr key={a.id}>
                                        <td>{a.title}</td>
                                        <td>{a.date || a.postedOn || a.dueDate || a.due_date}</td>
                                        <td className="newteacherreferencelist_actions_col">
                                            <div className="newteacherreferencelist_actions_wrapper">
                                                <MdOutlineEdit 
                                                    size={24} 
                                                    color="#9F7BFF" 
                                                    onClick={() => handleEditReference(a)}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                                <RiDeleteBinLine 
                                                    size={24} 
                                                    color="#FF6C6C" 
                                                    onClick={() => handleDeleteReference(a.id)}
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
                                No reference is assigned
                            </p>
                        </div>
                    )}
                </div>

            </div>
        </div >
    );
};

export default NewTeacherReferenceList;
