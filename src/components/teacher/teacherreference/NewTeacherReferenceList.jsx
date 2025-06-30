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

const NewTeacherReferenceList = () => {
    const APIURL = useSelector((state) => state.APIURL.url);
    const admin_id = useSelector((state) => state.admininfo.admininfo?.admin_id);
    const [showPopup, setShowPopup] = useState(false);
    const dummyAssignments = Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        title: `Science Assignment`,
        postedOn: `0${5 + i}/08/2025`
    }));


    console.log(admin_id, "admin eeee")
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
                    <div className="newteacherreferencelist_left-controls">
                        <button
                            className="btn-primary btn-sm newteacherreferencelist_result_add_button"
                            onClick={() => setShowPopup(true)}   // ← open popup
                        >
                            + Add
                        </button>
                        {showPopup && (
                            <NewTeacherAddReference
                                onClose={() => setShowPopup(false)}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="newteacherreferencelist_classes_box">
                <div className="newteacherreferencelist_table_wrapper">
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
                            {dummyAssignments.map(a => (
                                <tr key={a.id}>
                                    <td>{a.title}</td>
                                    <td>{a.postedOn}</td>
                                    <td className="newteacherreferencelist_actions_col">
                                        <div className="newteacherreferencelist_actions_wrapper">
                                            <MdOutlineEdit size={24} color="#9F7BFF" />
                                            <RiDeleteBinLine size={24} color="#FF6C6C" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div >
    );
};

export default NewTeacherReferenceList;
