import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { IoIosAdd } from "react-icons/io";
import "./newadminclassdashboard.css";
import { useSelector } from "react-redux";
import AdminClassAddStepOne from "./AdminClassAddStepOne";
import AdminClassAddStepTwo from "./AdminClassAddStepTwo";
import AdminClassView from "./AdminClassView";
import axios from "axios";
import Swal from "sweetalert2";
import Select from 'react-select';

const NewAdminClassDashboard = () => {
    const [showModal, setShowModal] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedClass, setSelectedClass] = useState('');
    const [entries, setEntries] = useState([
        { subject: "", publishername: "", facultyname: "" }
    ]);

    // Get teacher info and admin info from Redux store
    const teacherinfo = useSelector((state) => state.adminteacherinfo);
    const admininfo = useSelector((state) => state.admininfo);
    console.log(teacherinfo, "teacher info");
    console.log(admininfo, "admin info2");


    const APIURL = useSelector((state) => state.APIURL.url);

    console.log(admininfo?.admininfo.admin_id, "admininfo.admin_id ")

    const admin_id = admininfo?.admininfo.admin_id


    const [classData, setClassData] = useState([]);


    console.log(classData, 'class dataaaaaa')



    const fetchClassData = async () => {
        console.log("entersddddddd");
        try {
            const response = await axios.get(`${APIURL}/api/addClassname/${admin_id}`);
            console.log(response.data, "Fetched class data");

            const formattedData = response.data.map(item => ({
                className: item.class_name,
                sections: item.classes.map(cls => ({
                    section: cls.division,
                    teacher: cls.class_teacher,
                    strength: cls.students.length,
                    subjects: cls.curriculum.length,
                    students: cls.students,
                    classId: cls.class_id,
                    class_name: cls.class_name,
                    medium: cls.medium,
                    stream: cls.stream,
                    curriculum: cls.curriculum,
                }))
            }));

            const sortedData = formattedData.sort((a, b) => {
                const numA = parseInt(a.className.match(/\d+/)); // extract number
                const numB = parseInt(b.className.match(/\d+/));
                return numA - numB;
            });

            setClassData(sortedData);
        } catch (error) {
            console.error("Error fetching class data:", error);
        }
    };

    useEffect(() => {
        if (admin_id) {
            console.log("admininfo available, fetching class data...");
            fetchClassData();
        }
    }, [admininfo.admin_id]);



    // State for step 1 data
    const [stepOneData, setStepOneData] = useState({
        class_name: "",
        division: "",
        medium: "",
        stream: "",
        level: "",
        class_teacher: null
    });

    // State for step 2 data
    const [stepTwoData, setStepTwoData] = useState([]);



    const [showAdminClassView, setShowAdminClassView] = useState(false);
    const [selectedSection, setSelectedSection] = useState(null);

    // Modal controls
    const openModal = () => {
        setShowModal(true);
        setCurrentStep(1);
        // Reset entries when opening modal
        setEntries([{ subject: "", publishername: "", facultyname: "" }]);
    };

    const closeModal = () => {
        setShowModal(false);
        // Reset states when closing modal
        setStepOneData({
            class_name: "",
            division: "",
            medium: "",
            stream: "",
            level: "",
            class_teacher: null
        });
        setStepTwoData([]);
        setEntries([{ subject: "", publishername: "", facultyname: "" }]);
    };

    const nextStep = (data) => {
        if (currentStep < 2) {
            setStepOneData(data);
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    // Manage dynamic row entries in Step Two
    const addEntry = () => {
        setEntries(prevEntries => [...prevEntries, { subject: "", publishername: "", facultyname: "" }]);
    };

    const removeEntry = (index) => {
        console.log("Removing entry at index:", index);
        setEntries(prevEntries => {
            const newEntries = [...prevEntries];
            newEntries.splice(index, 1);
            console.log("Updated entries after removal:", newEntries);
            return newEntries;
        });
    };




    // Function to handle clicking a card
    const handleCardClick = (item) => {
        console.log(item, "Item on click"); // debug to confirm
        setSelectedSection(item);
        setShowAdminClassView(true);
    };
    const dashboardcustomStyles = {
        control: (base, state) => ({
            ...base,
            width: '300px',
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

    const handleClassChange = (selectedOption) => {
        setSelectedClass(selectedOption ? selectedOption.value : '');
    };
    return (
        <div className="newclassdashboard-container">
            <div className="newclassdashboard_main_header_container">
                <div className="newclassdashboard_header-controls d-flex justify-content-between align-items-center">
                    <div className="newclassdashboard_left-controls">
                        {/* <select
                            className="form-select form-select-sm newclassdashboard_select_subject"
                        >
                            <option value="">Select Class</option>
                            {classData.map((classItem, idx) => (
                                <option key={idx} value={classItem.className}>
                                    Class {classItem.className}
                                </option>
                            ))}
                        </select> */}
                        <Select
                            value={classData.find((classItem) => classItem.className === selectedClass) ? { label: `Class ${selectedClass}`, value: selectedClass } : null}
                            onChange={handleClassChange}
                            options={classData.map((classItem) => ({ label: `Class ${classItem.className}`, value: classItem.className }))}
                            styles={dashboardcustomStyles}
                            placeholder="Select Class"
                        />
                    </div>
                    <div className="newclassdashboard_left-controls">
                        <div>
                            <button
                                className="btn-primary btn-sm newclassdashboard_result_add_button"
                                onClick={openModal}
                            >
                                + Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Class Sections */}
            <div className="newclassdashboard-class-section">
                {classData.map((classItem, idx) => (
                    <div className="newclassdashboard-class-section-main mb-4" key={idx}>
                        <p className="newclassdashboard-class-heading">Class {classItem.className}</p>
                        <div className="newclassdashboard-class-section-row" >
                            {classItem.sections.map((sec, index) => (
                                <div key={index} className="newclassdashboard-card-container">
                                    <div className="newclassdashboard-card"
                                        onClick={() => handleCardClick(sec)}
                                    >
                                        <div className="newclassdashboard-card-top">
                                            <div className="newclassdashboard-circle">{sec.class_name} {sec.section}</div>
                                            <div className="newclassdashboard-teacher-container">
                                                <p className="newclassdashboard-info-title">Class Teacher:</p>
                                                <p className="newclassdashboard-teacher-name">{sec.teacher}</p>
                                            </div>
                                        </div>
                                        <div className="newclassdashboard-card-bottom">
                                            <p className="newclassdashboard-info-title">
                                                Strength:
                                                <span className="newclassdashboard-info-text"> {sec.strength}</span>
                                            </p>
                                            <p className="newclassdashboard-info-title">
                                                Subjects:
                                                <span className="newclassdashboard-info-text"> {sec.subjects}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Popup */}
            {showModal && (
                <div className="newclassdashboard-custom-modal-overlay" onClick={closeModal}>
                    <div className="newclassdashboard-custom-modal-content" onClick={(e) => e.stopPropagation()}>
                        {currentStep === 1 ? (
                            <AdminClassAddStepOne
                                nextStep={nextStep}
                                closeModal={closeModal}
                                teachers={teacherinfo.adminteacherinfo}
                            />
                        ) : (
                            <AdminClassAddStepTwo
                                prevStep={prevStep}
                                closeModal={closeModal}
                                entries={entries}
                                addEntry={addEntry}
                                removeEntry={removeEntry}
                                teachers={teacherinfo.adminteacherinfo}
                                admininfo={admininfo}
                                stepOneData={stepOneData}
                            // onSave={handleSave}
                            />
                        )}
                    </div>
                </div>
            )}

            {/* Modal Popup for AdminClassView */}
            {showAdminClassView && (
                <div className="newclassdashboard-custom-modal-overlay" onClick={() => setShowAdminClassView(false)}>
                    <div className="newclassdashboard-custom-modal-content" onClick={(e) => e.stopPropagation()}>
                        <AdminClassView
                            faculty={selectedSection}
                            onClose={() => setShowAdminClassView(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewAdminClassDashboard;
