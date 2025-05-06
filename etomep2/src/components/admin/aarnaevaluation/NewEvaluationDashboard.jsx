import React, { useEffect, useState, } from 'react';
import './newevaluationdashboard.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import student from "../../../assets/student.jpg"
import NewEvaluationAdd from './NewEvaluationAdd';
import NewEvaluationView from './NewEvaluationView';
import Swal from 'sweetalert2';
import profile from '../../../assets/avatar.jpg'

const NewEvaluationDashboard = () => {
    const APIURL = useSelector((state) => state.APIURL.url);
    const admin_id = useSelector((state) => state.admininfo.admininfo?.admin_id);

    const [showPopupView, setShowPopupView] = useState(false); 


    console.log(admin_id, "admin eeee")
    const navigate = useNavigate();



    const [examTypes, setExamTypes] = useState([]);
    const [examYears, setExamYears] = useState([]);
    const [selectedFilterYear, setSelectedFilterYear] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [selectedExamType, setSelectedExamType] = useState('');
    const [evaluationData, setEvaluationData] = useState([]);

    const [filteredData, setFilteredData] = useState([]);

    const [selectedEvaluation, setSelectedEvaluation] = useState(null);  // ✅ Added


    console.log(evaluationData, "evaluation")


    const handleCardClick = (item) => {   // ✅ New function
        setSelectedEvaluation(item);      // store the clicked item
        setShowPopupView(true);            // open the popup
    };



    useEffect(() => {
        const fetchEvaluationData = async () => {
            try {
                const response = await axios.get(`${APIURL}/api/evaluationadding/${admin_id}`);
                console.log(response.data, "Fetched Evaluation Data");

                if (response.data && Array.isArray(response.data)) {
                    setEvaluationData(response.data);     // ✅ All fetched data
                    setFilteredData(response.data);        // ✅ Initially show all
                    setExamTypes([...new Set(response.data.map(item => `${item.class_name} ${item.division}`))]);
                    setExamYears(
                        Array.from(
                            new Set(response.data.map(item => new Date(item.start_date).getFullYear().toString()))
                        ).sort((a, b) => b - a)
                    );
                } else {
                    setEvaluationData([]);
                    setFilteredData([]);
                }
            } catch (error) {
                console.error("Error fetching evaluation data:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to load evaluation data. Please try again later.'
                });
            }
        };

        if (admin_id) {
            fetchEvaluationData();
        }
    }, [admin_id, APIURL]);





    const handleSearch = () => {
        const filtered = evaluationData.filter(item => {
            const classMatch = selectedExamType === "" || `${item.class_name} ${item.division}` === selectedExamType;
            const yearMatch = selectedFilterYear === "" || new Date(item.start_date).getFullYear().toString() === selectedFilterYear;
            return classMatch && yearMatch;
        });
        setFilteredData(filtered);   // ✅ Update to show only filtered ones
    };

    // Filter data based on dropdown selection

    return (
        <div className="evaluationdashboard_main_container">
            <div className="evaluationdashboard_main_header_container">
                <div className="evaluationdashboard_header-controls d-flex justify-content-between align-items-center">
                    <div className="evaluationdashboard_left-controls">
                        {/* Exam Type Dropdown */}
                        <select
                            className="form-select form-select-sm evaluationdashboard_select_class"
                            value={selectedExamType}
                            onChange={(e) => setSelectedExamType(e.target.value)}
                        >
                            <option value="">Select Class</option>
                            {examTypes.map((type, i) => (
                                <option key={i} value={type}>{type}</option>
                            ))}
                        </select>
                        {/* Exam Year Dropdown */}
                        <select
                            className="form-select form-select-sm evaluationdashboard_select_year"
                            value={selectedFilterYear}
                            onChange={(e) => setSelectedFilterYear(e.target.value)}
                        >
                            <option value="">Select Year</option>
                            {examYears.map((year, i) => (
                                <option key={i} value={year}>{year}</option>
                            ))}
                        </select>
                        <button
                            className="btn-primary btn-sm evaluationdashboard_search_button"
                            onClick={handleSearch}   // ✅ add this
                        >
                            Search
                        </button>
                    </div>
                    <div className="evaluationdashboard_left-controls">
                    {/* <button className="btn-primary btn-sm evaluationdashboard_filter_button"
                            onClick={() => setShowPopup(true)} >
                            Filter
                        </button> */}
                        <button className="btn-primary btn-sm evaluationdashboard_result_add_button"
                            onClick={() => setShowPopup(true)} >
                            + Add
                        </button>
                        {showPopup && <NewEvaluationAdd isOpen={showPopup} onClose={() => setShowPopup(false)} />}
                    </div>
                </div>
            </div>
            <div className="evaluationdashboard_classes_box">
                <div className="evaluationdashboard_container">
                    {filteredData.map((item, index) => (
                        <div style={{
                            cursor:"pointer"
                        }} 
                            className="evaluationdashboard_classes_box_inner"
                            key={item.id}
                            onClick={() => handleCardClick(item)}
                        >
                            <div className="evaluationdashboard_top_row">
                                <img
                                    src={item?.teacher_profile || profile}

                                    className="evaluationdashboard_box_icon"
                                />
                                <div className="evaluationdashboard_exam_details">
                                    <p className="evaluationdashboard_class_name">{item.class_name} {item.division}</p>
                                    <p className="evaluationdashboard_subject">{item.subject_name}</p>
                                    <p className="evaluationdashboard_exam_title">{item.exam_name} {item.year}</p>
                                    <p className="evaluationdashboard_deadline">
                                        Deadline: {item.end_date}
                                    </p>
                                </div>
                            </div>
                            <div className="evaluationdashboard_bottom_row">
                                <p className="evaluationdashboard_faculty">
                                    <BsFillPersonFill style={{ paddingBottom: "2px", marginRight: "0.5rem" }} />
                                    Faculty Assigned: {item.teacher_name}
                                </p>
                            </div>
                        </div>
                    ))}
                    {showPopupView && selectedEvaluation && (
                        <NewEvaluationView
                            isOpen={showPopupView}
                            onClose={() => setShowPopupView(false)}
                            selectedEvaluation={selectedEvaluation}  // ✅ Pass selectedEvaluation
                        />
                    )}

                </div>
            </div>
        </div >
    );
};

export default NewEvaluationDashboard;
