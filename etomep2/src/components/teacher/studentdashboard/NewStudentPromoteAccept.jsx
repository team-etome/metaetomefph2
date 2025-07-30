import React, { useState, useEffect } from "react";
import "./newstudentpromoteaccept.css";
import { RiSearchLine } from "react-icons/ri";
import image from "../../../assets/messi-ronaldo-1593920966.jpg"
import axios from "axios";
import { useSelector } from "react-redux";
import smile from "../../../assets/annoyed.png"
import CustomModal, { WarningIcon, SuccessIcon } from "./CustomModal";

export default function NewStudentPromoteAccept({ studentList = [], fetchStudentList, onClose }) {
    const APIURL = useSelector((state) => state.APIURL.url);
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [loading, setLoading] = useState(false);

    // Modal states
    const [showAcceptConfirm, setShowAcceptConfirm] = useState(false);
    const [showAcceptSuccess, setShowAcceptSuccess] = useState(false);
    const [showDeclineConfirm, setShowDeclineConfirm] = useState(false);
    const [showDeclineSuccess, setShowDeclineSuccess] = useState(false);

    // studentList is already filtered to only include promoted students
    const promotedStudents = studentList;

    useEffect(() => {
        if (selectAll) {
            setSelected(promotedStudents.map((s) => s.id || s.roll_no));
        } else {
            setSelected([]);
        }
    }, [selectAll, promotedStudents]);

    const toggleStudent = (id) => {
        setSelected(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const filtered = promotedStudents.filter((s) =>
        s.student_name?.toLowerCase().includes(search.toLowerCase())
    );

    // Handle Accept Promotion
    const handleAcceptPromotion = async () => {
        if (selected.length === 0) return;
        setLoading(true);
        try {
            const requestData = {
                action: "accept",
                studentdata_id: selected
            };
            const response = await axios.post(`${APIURL}/api/studentpromote`, requestData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                setSelected([]);
                setSelectAll(false);
                setShowAcceptSuccess(true);
                if (fetchStudentList) fetchStudentList();
            }
        } catch (error) {
            console.error("Failed to accept students:", error);
        } finally {
            setLoading(false);
        }
    };

    // Handle Decline/Send Back
    const handleSendBack = async () => {
        if (selected.length === 0) return;
        setLoading(true);
        try {
            const requestData = {
                action: "decline",
                studentdata_id: selected
            };
            const response = await axios.post(`${APIURL}/api/studentpromote`, requestData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                setSelected([]);
                setSelectAll(false);
                setShowDeclineSuccess(true);
                if (fetchStudentList) fetchStudentList();
            }
        } catch (error) {
            console.error("Failed to send back students:", error);
        } finally {
            setLoading(false);
        }
    };

    // Auto-hide and refresh after success modals
    useEffect(() => {
        let timer;
        if (showAcceptSuccess) {
            timer = setTimeout(() => {
                setShowAcceptSuccess(false);
                if (fetchStudentList) fetchStudentList();
                if (onClose) onClose();
            }, 1500);
        }
        return () => clearTimeout(timer);
    }, [showAcceptSuccess, fetchStudentList, onClose]);

    useEffect(() => {
        let timer;
        if (showDeclineSuccess) {
            timer = setTimeout(() => {
                setShowDeclineSuccess(false);
                if (fetchStudentList) fetchStudentList();
                if (onClose) onClose();
            }, 1500);
        }
        return () => clearTimeout(timer);
    }, [showDeclineSuccess, fetchStudentList, onClose]);

    return (
        <>
        {promotedStudents.length > 0 ? (
            <div>
                {/* Action Bar */}
                <div className="newstudentpromoteaccept-actions">
                    {/* LEFT SIDE */}
                    <div className="newstudentpromoteaccept-left">
                        <label>
                            <p className="newstudentpromoteaccept-actions-para">Accept All</p>
                            <input
                                type="checkbox"
                                checked={selectAll}
                                onChange={(e) => setSelectAll(e.target.checked)}
                            />
                        </label>
                        <button
                            className="newstudentpromoteaccept-promote-btn"
                            disabled={!selected.length || loading}
                            onClick={() => setShowAcceptConfirm(true)}
                        >
                            Accept
                        </button>
                        <button
                            className="newstudentpromoteaccept-sendback-btn"
                            disabled={!selected.length || loading}
                            onClick={() => setShowDeclineConfirm(true)}
                        >
                            Send Back
                        </button>
                    </div>
                    {/* RIGHT SIDE */}
                    <div className="newstudentpromoteaccept-search-wrapper">
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
                    <div className="newstudentpromoteaccept-grid">
                        {filtered.map((s) => (
                            <div
                                key={s.id || s.roll_no}
                                className={
                                    "newstudentpromoteaccept-grid-card" +
                                    (selected.includes(s.id || s.roll_no) ? " selected" : "")
                                }
                                onClick={() => toggleStudent(s.id || s.roll_no)}
                            >
                                <label></label>
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
                    <div className="newstudentpromoteaccept-empty">
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
            </div>
            ) : (
                            <div className="newstudentpromoteaccept-empty">
            
                                <img
                                    src={smile}
                                    alt="Annoyed face"
                                    style={{ width: "65px", height: "65px", objectFit: "contain" }}
                                />
                                <p style={{ textAlign: 'center', fontSize: '16px', marginTop: '20px' }}>
                                   No Students have been promoted to your class
                                </p>
                            </div>
                        )}

            {/* Accept Confirmation Modal */}
            <CustomModal
                open={showAcceptConfirm}
                icon={<WarningIcon />}
                title="Confirm Acceptance"
                message="Are you sure you want to accept the selected students into the class?"
                onCancel={() => setShowAcceptConfirm(false)}
                onConfirm={() => {
                    setShowAcceptConfirm(false);
                    handleAcceptPromotion();
                }}
                cancelText="Cancel"
            />
            {/* Accept Success Modal */}
            <CustomModal
                open={showAcceptSuccess}
                icon={<SuccessIcon />}
                title="Accepted Successfully"
                message="The selected students have been successfully accepted into the class."
                onConfirm={() => {
                    setShowAcceptSuccess(false);
                    if (fetchStudentList) fetchStudentList();
                }}
                onlyConfirm
            />
            {/* Decline Confirmation Modal */}
            <CustomModal
                open={showDeclineConfirm}
                icon={<WarningIcon />}
                title="Confirm Send Back"
                message="Are you sure you want to move the selected students back to their previously promoted class?"
                onCancel={() => setShowDeclineConfirm(false)}
                onConfirm={() => {
                    setShowDeclineConfirm(false);
                    handleSendBack();
                }}
                cancelText="Cancel"
            />
            {/* Decline Success Modal */}
            <CustomModal
                open={showDeclineSuccess}
                icon={<SuccessIcon />}
                title="Students Sent Back Successfully"
                message="The selected students have been moved back to their previous class."
                onConfirm={() => {
                    setShowDeclineSuccess(false);
                    if (fetchStudentList) fetchStudentList();
                }}
                onlyConfirm
            />
        </>
    );
}
