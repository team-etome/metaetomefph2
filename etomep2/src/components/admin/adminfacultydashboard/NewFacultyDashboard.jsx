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
import avatar from '../../../assets/default.jpg'
const NewFacultyDashboard = () => {
    const APIURL = useSelector((state) => state.APIURL.url);
    const admin_id = useSelector((state) => state.admininfo.admininfo?.admin_id);
    const navigate = useNavigate();

    const [showPopup, setShowPopup] = useState(false); // For Add Faculty
    const [showPopupexcel, setShowPopupExcel] = useState(false); // For Excel Upload
    const [showMenu, setShowMenu] = useState(false); // Dropdown menu toggle
    const [showMenuexcel, setShowMenuExcel] = useState(false); // Not used visibly but safe to keep
    const [selectedFaculty, setSelectedFaculty] = useState(null); // Selected card view
    const [selectedSubject, setSelectedSubject] = useState('');


    const [facultySearch, setFacultySearch] = useState('');



    const [facultyList, setFacultyList] = useState([]);

    const fetchFaculty = async () => {
        try {
            const response = await axios.get(`${APIURL}/api/teacherdetails/${admin_id}`);
            if (response.data && Array.isArray(response.data)) {
                setFacultyList(response.data);
            } else {
                console.warn("Unexpected response structure", response.data);
            }
        } catch (error) {
            console.error("Error fetching faculty data:", error);
        }
    };

    useEffect(() => {
        if (admin_id) {
            fetchFaculty();
        }
    }, [APIURL, admin_id]);

    console.log(facultyList, "fac")






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

    const uniqueSubjects = Array.from(
        new Set(
            facultyList.flatMap(faculty =>
                (faculty.curriculam || []).map(item => item.subject_name)
            )
        )
    );

    return (
        <div className="facultydashboard_main_container">
            <div className="facultydashboard_main_header_container">
                <div className="header-controls d-flex justify-content-between align-items-center px-3 py-2">
                    <div className="left-controls">
                        <select
                            className="form-select form-select-sm facultydashboard_select_subject"
                            value={selectedSubject}
                            onChange={(e) => setSelectedSubject(e.target.value)}
                        >
                            <option value="">Select Subject</option>
                            {uniqueSubjects.map((subject, index) => (
                                <option key={index} value={subject}>
                                    {subject.charAt(0).toUpperCase() + subject.slice(1)}
                                </option>
                            ))}
                        </select>

                    </div>
                    <div className="left-controls">
                        <input
                            type="text"
                            className="form-control form-control-sm facultydashboard_select_faculty"
                            placeholder="Search Faculty..."
                            value={facultySearch}
                            onChange={(e) => setFacultySearch(e.target.value)}
                        />


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
                        {showPopup && (
                            <NewFacultyAdd
                                isOpen={showPopup}
                                onClose={() => setShowPopup(false)}
                                onFacultyAdded={fetchFaculty} // ✅ passing callback
                            />
                        )}                        {showPopupexcel && <NewFacultyAddThroughExcel isOpen={showPopupexcel} onClose={() => setShowPopupExcel(false)} />}
                    </div>
                </div>
            </div>
            <div className="facultydashboard_classes_box">
                <div className="facultydashboard_container" >
                    {facultyList
                        .filter((faculty) => {
                            const fullName = `${faculty.first_name} ${faculty.last_name}`.toLowerCase();
                            const nameMatch = fullName.includes(facultySearch.toLowerCase());

                            const subjectMatch = selectedSubject
                                ? faculty.curriculam?.some(
                                    (item) => item.subject_name.toLowerCase() === selectedSubject.toLowerCase()
                                )
                                : true;

                            return nameMatch && subjectMatch;
                        })
                        .map((faculty) => (
                            <div className="faculty-card" key={faculty.id} onClick={() => handleCardClick(faculty)}>
                                <div className="faculty-avatar-container">
                                    <img src={faculty.photo || avatar} className="faculty-avatar" />
                                </div>
                                <div className="faculty-name-id-container">
                                    <p className="faculty-name">{faculty.first_name} {faculty.last_name}</p>
                                    <p className="faculty-id">ID: {faculty.employee_id}</p>
                                </div>
                                <div className="faculty-info-line">
                                    <FiPhone className="info-icon" />
                                    <span>{faculty.phone_number}</span>
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
