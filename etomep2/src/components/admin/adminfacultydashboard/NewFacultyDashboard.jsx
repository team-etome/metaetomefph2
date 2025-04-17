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

const NewFacultyDashboard = () => {
    const APIURL = useSelector((state) => state.APIURL.url);
    const admin_id = useSelector((state) => state.admininfo.admininfo?.admin_id);
    const navigate = useNavigate();

    const [examTypes, setExamTypes] = useState([]);
    const [examYears, setExamYears] = useState([]);
    const [selectedFilterYear, setSelectedFilterYear] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
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


    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(`${APIURL}/api/examtimetable`, {
    //                 params: { admin_id }
    //             });
    //             const rawData = response.data.exam_timetables || {};

    //             // Convert raw data (an object) to an array of [examName, classesObj] pairs
    //             let examArray = Object.entries(rawData);
    //             // Sort exam keys by year descending and then alphabetically.
    //             examArray = examArray.sort(([nameA], [nameB]) => {
    //                 const yearMatchA = nameA.match(/\d{4}$/);
    //                 const yearMatchB = nameB.match(/\d{4}$/);
    //                 const yearA = yearMatchA ? parseInt(yearMatchA[0]) : 0;
    //                 const yearB = yearMatchB ? parseInt(yearMatchB[0]) : 0;
    //                 if (yearA !== yearB) return yearB - yearA;
    //                 return nameA.localeCompare(nameB);
    //             });

    //             // For each exam, convert its classes object into a sorted array of [className, entries]
    //             const sortedExamTimetables = examArray.map(([examName, classesObj]) => {
    //                 let classArray = Object.entries(classesObj || {});
    //                 classArray = classArray.sort(([classA], [classB]) => {
    //                     const numA = parseInt(classA);
    //                     const numB = parseInt(classB);
    //                     if (!isNaN(numA) && !isNaN(numB) && numA !== numB) {
    //                         return numA - numB;
    //                     }
    //                     return classA.localeCompare(classB);
    //                 });
    //                 return [examName, classArray];
    //             });

    //             setAllTimetableData(sortedExamTimetables);
    //             setFilteredTimetableData(sortedExamTimetables);

    //             // Populate exam types and years for filter dropdowns.
    //             const typesSet = new Set();
    //             const yearsSet = new Set();
    //             Object.keys(rawData).forEach(key => {
    //                 const yearMatch = key.match(/\d{4}$/);
    //                 if (yearMatch) {
    //                     yearsSet.add(yearMatch[0]);
    //                     const type = key.replace(/\s*\d{4}$/, "").trim();
    //                     typesSet.add(type);
    //                 }
    //             });
    //             setExamTypes([...typesSet].sort());
    //             setExamYears([...yearsSet].sort((a, b) => b - a));
    //         } catch (error) {
    //             console.error("Error fetching exam timetable data", error);
    //         }
    //     };

    //     fetchData();
    // }, [APIURL, admin_id]);


    const toggleMenu = () => {
        setShowMenu((prev) => !prev);
    };



    const handleAddFaculty = () => {
        setShowMenu(false);
        setShowPopup(true);
    };
    const handleUploadExcel = () => {
        setShowMenu(false);
        // Replace this alert with your Excel upload logic
        alert("Excel upload clicked. (Implement your upload logic here.)");
    };
    // Called when a faculty card is clicked
    const handleCardClick = (faculty) => {
        setSelectedFaculty(faculty);
    };


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
                            {examTypes.map((type, i) => (
                                <option key={i} value={type}>{type}</option>
                            ))}
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
                                    <div className="facultydashboard_dropdown-item">
                                        Upload Through Excel
                                    </div>
                                </div>
                            )}

                        </div>
                        {showPopup && <NewFacultyAdd isOpen={showPopup} onClose={() => setShowPopup(false)} />}
                    </div>
                </div>
            </div>
            <div className="facultydashboard_classes_box">
                <div className="facultydashboard_container" >
                    {DummyFacultyData.map((faculty) => (
                        <div className="faculty-card" key={faculty.id}
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
