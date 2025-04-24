import React, { useEffect, useState, } from 'react';
import './newfacultydashboard.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { BsFillTelephoneFill, BsEnvelopeFill } from "react-icons/bs";
import { FiPhone } from "react-icons/fi";
import { CiSquareChevDown } from "react-icons/ci";
import image from "../../../assets/b763af54a51c591c7fcb7ddfbae4a92c.jpg"
import NewFacultyAdd from './NewFacultyAdd';
import NewFacultyView from './NewFacultyView';
import NewFacultyAddThroughExcel from './NewFacultyAddThroughExcel';

const NewFacultyDashboard = () => {
    const APIURL = useSelector((state) => state.APIURL.url);
    const admin_id = useSelector((state) => state.admininfo.admininfo?.admin_id);
    const navigate = useNavigate();

    const [showPopup, setShowPopup] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showPopupexcel, setShowPopupExcel] = useState(false);
    const [showMenuexcel, setShowMenuExcel] = useState(false);
    const [selectedFaculty, setSelectedFaculty] = useState(null);

    const DummyFacultyData = [
        {
            id: "5658",
            name: "Vihaan",
            phone: "9658526458",
            email: "abcdef@gmail.com",
            imgUrl: image, // The same or different image path
        },
        {
            id: "1234",
            name: "Shreya",
            phone: "9898989898",
            email: "shreya@example.com",
            imgUrl: image,
        },
        {
            id: "7890",
            name: "Rahul",
            phone: "9123456789",
            email: "rahul@example.com",
            imgUrl: image,
        },
        {
            id: "1",
            name: "Vihaan",
            phone: "9658526458",
            email: "abcdef@gmail.com",
            imgUrl: image, // The same or different image path
        },
        {
            id: "2",
            name: "Shreya",
            phone: "9898989898",
            email: "shreya@example.com",
            imgUrl: image,
        },
        {
            id: "3",
            name: "Rahul",
            phone: "9123456789",
            email: "rahul@example.com",
            imgUrl: image,
        },
        {
            id: "4",
            name: "Vihaan",
            phone: "9658526458",
            email: "abcdef@gmail.com",
            imgUrl: image, // The same or different image path
        },
        {
            id: "5",
            name: "Shreya",
            phone: "9898989898",
            email: "shreya@example.com",
            imgUrl: image,
        },
        {
            id: "6",
            name: "Rahul",
            phone: "9123456789",
            email: "rahul@example.com",
            imgUrl: image,
        },
        {
            id: "7",
            name: "Vihaan",
            phone: "9658526458",
            email: "abcdef@gmail.com",
            imgUrl: image, // The same or different image path
        },
        {
            id: "8",
            name: "Shreya",
            phone: "9898989898",
            email: "shreya@example.com",
            imgUrl: image,
        },
        {
            id: "9",
            name: "Rahul",
            phone: "9123456789",
            email: "rahul@example.com",
            imgUrl: image,
        },
    ];




    const toggleMenu = () => {
        setShowMenu((prev) => !prev);
    };



    const handleAddFaculty = () => {
        setShowMenu(false);
        setShowPopup(true);
    };
    const handleUploadExcel = () => {
        setShowMenuExcel(false);
        setShowPopupExcel(true);
    };
    // Called when a faculty card is clicked
    const handleCardClick = (faculty) => {
        setSelectedFaculty(faculty);
    };


    return (
        <div className="facultydashboard_main_container">
            <div className="facultydashboard_main_header_container">
                <div className="facultydashboard_header-controls d-flex justify-content-between align-items-center">
                    <div className="facultydashboard_left-controls">
                        {/* Exam Type Dropdown */}
                        <select
                            className="form-select form-select-sm facultydashboard_select_subject"

                        >
                            <option value="">Select Subject</option>
                        </select>
                        {/* Exam Year Dropdown */}
                    </div>
                    <div className="facultydashboard_left-controls">
                        <select
                            className="form-select form-select-sm facultydashboard_select_faculty"
                        >
                            <option value="">Select Faculty</option>
                           
                        </select>
                        {/* This wrapper ensures the dropdown is anchored correctly */}
                        <div>
                            <button
                                className="btn-primary btn-sm facultydashboard_result_add_button"
                                onClick={toggleMenu}
                            >
                                + Add
                            </button>
                            {showMenu && (
                                <div className="facultydashboard_dropdown-menu">
                                    <div className="facultydashboard_dropdown-item" onClick={handleAddFaculty}>
                                        + Add Faculty
                                    </div>
                                    <div className="facultydashboard_dropdown-item" onClick={handleUploadExcel}>
                                        Upload Through Excel
                                    </div>
                                </div>
                            )}

                        </div>
                        {showPopup && <NewFacultyAdd isOpen={showPopup} onClose={() => setShowPopup(false)} />}
                        {showPopupexcel && <NewFacultyAddThroughExcel isOpen={showPopupexcel} onClose={() => setShowPopupExcel(false)} />}
                    </div>
                </div>
            </div>
            <div className="facultydashboard_classes_box">
                <div className="facultydashboard_container" >
                    {DummyFacultyData.map((faculty) => (
                        <div className="facultydashboard_classes_box_inner" key={faculty.id}
                            onClick={() => handleCardClick(faculty)}
                        >
                            <div className="faculty-avatar-container">
                                <img
                                    src={faculty.imgUrl}
                                    alt={faculty.name}
                                    className="faculty-avatar"
                                />
                            </div>
                            <div className="faculty-name-id-container">
                                <p className="faculty-name">{faculty.name}</p>
                                <p className="faculty-id">ID: {faculty.id}</p>
                            </div>
                            <div className="faculty-info-line">
                                <FiPhone className="info-icon" />
                                <span>{faculty.phone}</span>
                            </div>
                            <div className="faculty-info-line">
                                <CiSquareChevDown className="info-icon" />
                                <span>{faculty.email}</span>
                            </div>
                        </div>
                    ))}
                    {/* {showPopupview && <NewEvaluationView isOpen={showPopupview} onClose={() => setShowPopupView(false)} />} */}
                    {/* Conditionally render the FacultyModal when a faculty is selected */}
                    {selectedFaculty && (
                        <NewFacultyView
                            faculty={selectedFaculty}
                            onClose={() => setSelectedFaculty(null)}
                        />
                    )}
                </div>
            </div>
        </div >
    );
};

export default NewFacultyDashboard;
