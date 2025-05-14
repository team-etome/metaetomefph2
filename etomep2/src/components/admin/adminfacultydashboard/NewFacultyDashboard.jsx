import React, { useEffect, useState, } from 'react';
import './newfacultydashboard.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { BsFillTelephoneFill, BsEnvelopeFill } from "react-icons/bs";
import { FiPhone } from "react-icons/fi";
import { CiSquareChevDown } from "react-icons/ci";
import image from "../../../assets/student.jpg"
import NewFacultyAdd from './NewFacultyAdd';
import NewFacultyView from './NewFacultyView';
import NewFacultyAddThroughExcel from './NewFacultyAddThroughExcel';
import avatar from '../../../assets/default.jpg'
import { RiSearchLine } from "react-icons/ri";
import Select from 'react-select';



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
            // console.log(response.data,"response.dataresponse.dataresponse.data")
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

    const dashboardcustomStyles = {
            control: (base, state) => ({
                ...base,
                // minHeight: '48px',
                width:'300px',
                height: '40px',
                borderRadius: '8px',
                borderColor: state.isFocused ? '#86b7fe' :'#757575',
                boxShadow: state.isFocused ? '0 0 0 .25rem rgb(194, 218, 255)' : 0,
                // '&:hover': { borderColor: '#86b7fe' }
            }),
    
            dropdownIndicator: (base) => ({
                ...base,
                color: '#292D32',
                padding: '0 8px',
                alignItems: 'center',
                svg: {
                    width: '24px',
                    height: '24px'
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
                maxHeight: '200px',
                overflowY: 'auto',
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

    const handleChange = (selectedOption) => {
        setSelectedSubject(selectedOption ? selectedOption.value : '');
    };
    return (
        <div className="facultydashboard_main_container" >
            <div className="facultydashboard_main_header_container">
                <div className="facultydashboard_header-controls d-flex justify-content-between align-items-center">
                    <div className="facultydashboard_left-controls">
                    <Select
                            value={uniqueSubjects.find((subject) => subject === selectedSubject) ? { label: selectedSubject, value: selectedSubject } : null}
                            onChange={handleChange}
                            options={uniqueSubjects.map((subject) => ({ label: subject, value: subject }))}
                            styles={dashboardcustomStyles}
                            placeholder="Select Subject"
                        />

                    </div>

                    <div className="facultydashboard_right-controls">
                        <div className="facultydashboard_search-input-container">
                            <RiSearchLine className={`facultydashboard_search-icon ${facultySearch ? 'hidden' : ''}`} />
                            <input
                                type="text"
                                className="form-control form-control-sm facultydashboard_select_faculty"
                                placeholder="     Search Faculty"
                                value={facultySearch}
                                onChange={(e) => setFacultySearch(e.target.value)}
                            />
                        </div>

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
                                onFacultyAdded={fetchFaculty}
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
                            <div className="facultydashboard_classes_box_inner" key={faculty.id} onClick={() => handleCardClick(faculty)}>
                                <div className="faculty-avatar-container">
                                    <img src={faculty?.image || image} className="faculty-avatar" />
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
                            setSelectedFaculty={setSelectedFaculty}
                            fetchFaculty={fetchFaculty}
                        />
                    )}
                </div>
            </div>
        </div >
    );
};

export default NewFacultyDashboard;
