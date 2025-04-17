import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { IoIosAdd } from "react-icons/io";
import "./newadminclassdashboard.css";
import { useState } from "react";
import AdminClassAddStepOne from "./AdminClassAddStepOne";
import AdminClassAddStepTwo from "./AdminClassAddStepTwo";
import AdminClassView from "./AdminClassView";

const NewAdminClassDashboard = () => {
    const [showModal, setShowModal] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [entries, setEntries] = useState([
        { className: "", division: "", subject: "" }
    ]);
    const classData = [
        {
            className: "Class 1",
            sections: [
                { section: "1A", teacher: "Radha krishnan", strength: 56, subjects: 6 },
                { section: "1B", teacher: "Kanakambaran", strength: 56, subjects: 6 },
                { section: "1C", teacher: "Lakshmi Nakshatra", strength: 56, subjects: 6 },
            ],
        },
        {
            className: "Class 2",
            sections: [
                { section: "2A", teacher: "Radha krishnan", strength: 56, subjects: 6 },
                { section: "2B", teacher: "Kanakambaran", strength: 56, subjects: 6 },
                { section: "2C", teacher: "Lakshmi Nakshatra", strength: 56, subjects: 6 },
            ],
        },
        {
            className: "Class 3",
            sections: [
                { section: "3A", teacher: "Radha krishnan", strength: 56, subjects: 6 },
                { section: "3B", teacher: "Kanakambaran", strength: 56, subjects: 6 },
                { section: "3C", teacher: "Radha krishnan", strength: 56, subjects: 6 },
                { section: "3D", teacher: "Kanakambaran", strength: 56, subjects: 6 },
            ],
        },
    ];
    const [showAdminClassView, setShowAdminClassView] = useState(false);
    const [selectedSection, setSelectedSection] = useState(null);

    // Modal controls
    const openModal = () => {
        setShowModal(true);
        setCurrentStep(1);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const nextStep = () => {
        if (currentStep < 2) {
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
        setEntries([...entries, { className: "", division: "", subject: "" }]);
    };

    const removeEntry = (index) => {
        const newEntries = [...entries];
        newEntries.splice(index, 1);
        setEntries(newEntries);
    };

    // Function to handle clicking a card.
    // It sets the selected section info and displays the AdminClassView modal.
    const handleCardClick = (item) => {
        setSelectedSection(item);
        setShowAdminClassView(true);
    };

    return (
        <div className="newclassdashboard-container">
            <div className="newclassdashboard_main_header_container">
                <div className="newclassdashboard_header-controls d-flex justify-content-between align-items-center">
                    <div className="left-controls">
                        <select
                            className="form-select form-select-sm newclassdashboard_select_subject"
                        // value={selectedExamType}
                        // onChange={(e) => setSelectedExamType(e.target.value)}
                        >
                            <option value="">Select Subject</option>
                        </select>
                    </div>
                    <div className="left-controls">
                        <div>
                            <button
                                className="btn-primary btn-sm newclassdashboard_result_add_button"
                                onClick={openModal}
                            >
                                + Add
                            </button>
                        </div>
                        {/* {showPopup && <NewFacultyAdd isOpen={showPopup} onClose={() => setShowPopup(false)} />} */}
                    </div>
                </div>
            </div>

            {/* Class Sections */}
            <div className="newclassdashboard-class-section">
                {classData.map((classItem, idx) => (
                    <div className="mb-4" key={idx}>
                        <h5 className="newclassdashboard-class-heading">{classItem.className}</h5>
                        <Row className="g-3">
                            {classItem.sections.map((sec, index) => (
                                <Col xs={12} sm={6} md={4} lg={3} key={index}>
                                    <div className="newclassdashboard-card"
                                        onClick={() => handleCardClick(sec)}
                                    >
                                        {/* Top section: Circle + Class Teacher */}
                                        <div className="newclassdashboard-card-top">
                                            <div className="newclassdashboard-circle">{sec.section}</div>
                                            <div className="newclassdashboard-teacher-container">
                                                <p className="newclassdashboard-info-title">Class Teacher:</p>
                                                <p className="newclassdashboard-teacher-name">{sec.teacher}</p>
                                            </div>
                                        </div>
                                        {/* Bottom section: Strength + Subjects side by side */}
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
                                </Col>
                            ))}
                        </Row>
                    </div>
                ))}
            </div>
            {/* Modal Popup */}
            {showModal && (
                <div className="newclassdashboard-custom-modal-overlay" onClick={closeModal}>
                    {/* Stop propagation so clicks inside the modal don’t close it */}
                    <div className="newclassdashboard-custom-modal-content" onClick={(e) => e.stopPropagation()}>
                        {currentStep === 1 ? (
                            <AdminClassAddStepOne nextStep={nextStep} closeModal={closeModal} />
                        ) : (
                            <AdminClassAddStepTwo
                                prevStep={prevStep}
                                closeModal={closeModal}
                                entries={entries}
                                addEntry={addEntry}
                                removeEntry={removeEntry}
                            />
                        )}
                    </div>
                </div>
            )}

            {/* Modal Popup for AdminClassView when a card is clicked */}
            {showAdminClassView && (
                <div className="newclassdashboard-custom-modal-overlay" onClick={() => setShowAdminClassView(false)}>
                    <div className="newclassdashboard-custom-modal-content" onClick={(e) => e.stopPropagation()}>
                        {/* Pass the selected section (dummy data) as a prop to AdminClassView */}
                        <AdminClassView faculty={selectedSection} onClose={() => setShowAdminClassView(false)} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewAdminClassDashboard;
