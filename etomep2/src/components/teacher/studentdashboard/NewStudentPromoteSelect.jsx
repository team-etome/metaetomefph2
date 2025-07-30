import React, { useState, useEffect } from "react";
import "./newstudentpromoteselect.css";
import { RiSearchLine } from "react-icons/ri";
import image from "../../../assets/messi-ronaldo-1593920966.jpg";
import smile from "../../../assets/annoyed.png"
import frame from "../../../assets/Frame 1000008.png"
import axios from "axios";
import { useSelector } from "react-redux";
import CustomModal, { SuccessIcon } from "./CustomModal";

export default function NewStudentPromoteSelect({ studentList = [], fetchStudentList, onClose }) {
    const APIURL = useSelector((state) => state.APIURL.url);
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedDivision, setSelectedDivision] = useState("");
    const [divisions, setDivisions] = useState(["A", "B", "C"]);
    const [showRepeatModal, setShowRepeatModal] = useState(false);
    const [showPromoteSuccess, setShowPromoteSuccess] = useState(false);
    const [showRepeatSuccess, setShowRepeatSuccess] = useState(false);

    console.log(studentList, "studentListstudentList ankit ")

    useEffect(() => {
        if (selectAll) {
            setSelected(studentList.map((s) => s.id));
        } else {
            setSelected([]);
        }
    }, [selectAll, studentList]);

    useEffect(() => {
        if (selected.length > 0) {
            const selectedStudents = studentList.filter(s => selected.includes(s.id));
            const uniqueClasses = [...new Set(selectedStudents.map(s => s.standard))];
            setSelectedClass(uniqueClasses.length === 1 ? uniqueClasses[0] : "");
            // Optionally, set division to first student's division
            setSelectedDivision(selectedStudents[0]?.division || "");
        } else {
            setSelectedClass("");
            setSelectedDivision("");
        }
    }, [selected, studentList]);

    const toggleStudent = (id) => {
        setSelected(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    // Filter based on search - studentList is already filtered for promotion
    const filtered = studentList.filter((s) =>
        s.student_name?.toLowerCase().includes(search.toLowerCase())
    );

    // Find previous_class_id and current_class_id for API
    const getClassIds = () => {

        const selectedStudents = studentList.filter(s => selected.includes(s.id));
        const previous_class_id = selectedStudents[0]?.class_name || "";
        // For demo, increment class_name for current_class_id
        const current_class_id = previous_class_id ? (parseInt(previous_class_id) + 1).toString() : "";
        return { previous_class_id, current_class_id };
    };

    const handlePromoteSave = async () => {
        const { previous_class_id, current_class_id } = getClassIds();
        try {
            await axios.post(`${APIURL}/api/promotingstudent`, {
                students: selected,
                previous_class_id,
                current_class_id,
                division: selectedDivision
            });
            setShowPopup(false);
            setShowPromoteSuccess(true);
        } catch (error) {
            console.error("Promotion failed", error);
        }
    };

    const handleRepeatClass = async () => {
        const { previous_class_id, current_class_id } = getClassIds();
        try {
            await axios.post(`${APIURL}/api/promotingstudent`, {
                students: selected,
                previous_class_id,
                current_class_id :previous_class_id,
            });
            setShowRepeatModal(false);
            setShowRepeatSuccess(true);
        } catch (error) {
            console.error("Repeat class failed", error);
        }
    };

    // Auto-hide and refresh after success modals
    useEffect(() => {
        let timer;
        if (showPromoteSuccess) {
            timer = setTimeout(() => {
                setShowPromoteSuccess(false);
                if (fetchStudentList) fetchStudentList();
                if (onClose) onClose();
            }, 1500);
        }
        return () => clearTimeout(timer);
    }, [showPromoteSuccess, fetchStudentList, onClose]);

    useEffect(() => {
        let timer;
        if (showRepeatSuccess) {
            timer = setTimeout(() => {
                setShowRepeatSuccess(false);
                if (fetchStudentList) fetchStudentList();
                if (onClose) onClose();
            }, 1500);
        }
        return () => clearTimeout(timer);
    }, [showRepeatSuccess, fetchStudentList, onClose]);

    return (
        <>
            {studentList.length > 0 ? (
                <div>
                    {/* Action Bar */}
                    <div
                        className="newstudentpromoteselect-actions"
                    >
                        {/* LEFT SIDE */}
                        <div className="newstudentpromoteselect-left">
                            <label>
                                <p className="newstudentpromoteselect-actions-para">Select All</p>
                                <input
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={(e) => setSelectAll(e.target.checked)}
                                />
                            </label>
                            <button
                                className="newstudentpromoteselect-promote-btn"
                                disabled={!selected.length}
                                onClick={() => setShowPopup(true)}
                            >
                                Promote
                            </button>
                            <button
                                className="newstudentpromoteselect-repeat-btn"
                                disabled={!selected.length}
                                onClick={() => setShowRepeatModal(true)}
                            >
                                Repeat Class
                            </button>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="newstudentpromoteselect-search-wrapper">
                            <RiSearchLine className="icon" size={16} />
                            <input
                                type="text"
                                placeholder="Search Student"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Show filtered results or "no data found" message */}
                    {filtered.length > 0 ? (
                        <div className="newstudentpromoteselect-grid">
                            {filtered.map((s) => (
                                <div
                                    key={s.id}
                                    className={
                                        "newstudentpromoteselect-grid-card" +
                                        (selected.includes(s.id) ? " selected" : "")
                                    }
                                    onClick={() => toggleStudent(s.id)}
                                >
                                    <label>
                                        {/* <input
                  type="checkbox"
                  checked={selected.includes(s.student_id || s.roll_no)}
                  onChange={() => toggleStudent(s.student_id || s.roll_no)}
                /> */}
                                    </label>
                                    <img src={s.image || image} alt={s.student_name} />
                                    <div className="info">
                                        <h4>{s.student_name}</h4>
                                        <p>{s.standard} {s.division}</p>
                                    </div>
                                    <span className="roll">Roll no : {s.roll_no}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="newstudentpromoteselect-empty">
                            <img
                                src={smile}
                                alt="Annoyed face"
                                style={{ width: "65px", height: "65px", objectFit: "contain" }}
                            />
                            <p style={{ textAlign: 'center', fontSize: '16px', marginTop: '20px' }}>
                                No student data found
                            </p>
                        </div>
                    )}
                    {/* Close */}
                    {/* <button className="newstudentpromoteselect-close" onClick={onClose}>
                    &times;
                </button> */}
                </div>
            ) : (
                <div className="newstudentpromoteselect-empty">

                    <img
                        src={smile}
                        alt="Annoyed face"
                        style={{ width: "65px", height: "65px", objectFit: "contain" }}
                    />
                    <p style={{ textAlign: 'center', fontSize: '16px', marginTop: '20px' }}>
                        All the students have been promoted
                    </p>
                </div>
            )}

            {/* Popup Modal for Select Class */}
            {showPopup && (
                <div className="promote-popup-overlay">
                    <div className="promote-popup-modal">
                        <div className="promote-popup-header">
                            <div className="promote-popup-icon">
                                <img
                                    src={frame}
                                    alt="frame face"
                                    style={{ width: "32px", height: "32px", objectFit: "contain" }}
                                />
                            </div>
                            <p className="promote-popup-title" >Select Class</p>
                        </div>
                        <div className="promote-popup-body">
                            <label className="promote-popup-label">Class</label>
                            <input className="promote-popup-input" value={Number(selectedClass) + 1} readOnly />
                            <label className="promote-popup-label">Division</label>
                            <select className="promote-popup-input" value={selectedDivision} onChange={e => setSelectedDivision(e.target.value)}>
                                <option value="" disabled>Select division</option>
                                {divisions.map(div => (
                                    <option key={div} value={div}>{div}</option>
                                ))}
                            </select>
                        </div>
                        <div className="promote-popup-footer">
                            <button className="promote-popup-cancel" onClick={() => setShowPopup(false)}>Cancel</button>
                            <button className="promote-popup-save" onClick={handlePromoteSave}>Save</button>
                        </div>
                    </div>
                </div>
            )}

            {showRepeatModal && (
                <div className="promote-popup-overlay">
                    <div className="promote-popup-modal">
                        <div className="promote-popup-header">
                            <p className="promote-popup-title">Confirm Repeat Class</p>
                        </div>
                        <div className="promote-popup-body">
                            <p>
                                Are you sure you want the selected students to remain in the current class for the next academic year?
                            </p>
                        </div>
                        <div className="promote-popup-footer">
                            <button className="promote-popup-cancel" onClick={() => setShowRepeatModal(false)}>Cancel</button>
                            <button
                                className="promote-popup-save"
                                onClick={handleRepeatClass}
                            >Confirm</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Promote Success Modal */}
            <CustomModal
                open={showPromoteSuccess}
                icon={<SuccessIcon />}
                title="Promotion Successful"
                message="Selected students have been successfully promoted to the selected class."
                onConfirm={() => {
                    setShowPromoteSuccess(false);
                    if (fetchStudentList) fetchStudentList();
                    if (onClose) onClose();
                }}
                onlyConfirm
                confirmText="OK"
            />
            {/* Repeat Success Modal */}
            <CustomModal
                open={showRepeatSuccess}
                icon={<SuccessIcon />}
                title="Students Retained"
                message="The selected students have been successfully marked to repeat the current class."
                onConfirm={() => {
                    setShowRepeatSuccess(false);
                    if (fetchStudentList) fetchStudentList();
                    if (onClose) onClose();
                }}
                onlyConfirm
            />
        </>

    );
}
