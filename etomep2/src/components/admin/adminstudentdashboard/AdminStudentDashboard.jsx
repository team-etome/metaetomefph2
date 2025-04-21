import React, { useEffect, useState, } from 'react';
import './adminstudentdashboard.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FiPhone } from "react-icons/fi";
import { CiSquareChevDown } from "react-icons/ci";
import image from "../../../assets/b763af54a51c591c7fcb7ddfbae4a92c.jpg"


const AdminStudentDashboard = () => {
    const APIURL = useSelector((state) => state.APIURL.url);
    const admin_id = useSelector((state) => state.admininfo.admininfo?.admin_id);
    const navigate = useNavigate();

    return (
        <div className="facultydashboard_main_container">
            <div className="facultydashboard_main_header_container">
                <div className="header-controls d-flex justify-content-between align-items-center px-3 py-2">
                    <div className="left-controls">
                        {/* Exam Type Dropdown */}
                        <select
                            className="form-select form-select-sm facultydashboard_select_subject"
                        // value={selectedExamType}
                        // onChange={(e) => setSelectedExamType(e.target.value)}
                        >
                            <option value="">Select Subject</option>
                        </select>
                        {/* Exam Year Dropdown */}
                    </div>
                    <div className="left-controls">
                        <select
                            className="form-select form-select-sm facultydashboard_select_faculty"
                        // value={selectedFilterYear}
                        // onChange={(e) => setSelectedFilterYear(e.target.value)}
                        >
                            <option value="">Select Faculty</option>
                            {/* {examYears.map((year, i) => (
                                        <option key={i} value={year}>{year}</option>
                                    ))} */}
                        </select>
                        {/* This wrapper ensures the dropdown is anchored correctly */}
                    </div>
                </div>
            </div>
            <div className="facultydashboard_classes_box">
                <div className="facultydashboard_container" >
                </div>
            </div>
        </div >
    );
};

export default AdminStudentDashboard;
