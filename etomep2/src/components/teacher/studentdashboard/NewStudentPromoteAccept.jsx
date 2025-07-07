import React, { useState, useEffect } from "react";
import "./newstudentpromoteaccept.css";
import { RiSearchLine } from "react-icons/ri";
import image from "../../../assets/messi-ronaldo-1593920966.jpg"
import axios from "axios";
import { useSelector } from "react-redux";

export default function NewStudentPromoteAccept({ studentList = [] }) {
    const APIURL = useSelector((state) => state.APIURL.url);
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [showSendBackModal, setShowSendBackModal] = useState(false);
    const [loading, setLoading] = useState(false);

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
            const formData = new FormData();
            formData.append("action", "accept");
            formData.append("studentdata_id", JSON.stringify(selected));

            const response = await axios.post(`${APIURL}/api/studentpromote`, formData);
            
            if (response.status === 200) {
                // Success - you might want to refresh the data or show success message
                console.log("Students accepted successfully");
                // Clear selection after successful acceptance
                setSelected([]);
                setSelectAll(false);
            }
        } catch (error) {
            console.error("Failed to accept students:", error);
            // Handle error - show error message to user
        } finally {
            setLoading(false);
        }
    };

    // Handle Send Back
    const handleSendBack = async () => {
        if (selected.length === 0) return;

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("action", "send_back");
            formData.append("studentdata_id", JSON.stringify(selected));

            const response = await axios.post(`${APIURL}/api/studentpromote`, formData);
            
            if (response.status === 200) {
                // Success - you might want to refresh the data or show success message
                console.log("Students sent back successfully");
                // Clear selection after successful send back
                setSelected([]);
                setSelectAll(false);
                setShowSendBackModal(false);
            }
        } catch (error) {
            console.error("Failed to send back students:", error);
            // Handle error - show error message to user
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
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
                            onClick={handleAcceptPromotion}
                        >
                            Accept
                        </button>

                        <button
                            className="newstudentpromoteaccept-sendback-btn"
                            disabled={!selected.length || loading}
                            onClick={() => setShowSendBackModal(true)}
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

                {/* Student Grid */}
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
                            <label>
                                {/* <input
                  type="checkbox"
                  checked={selected.includes(s.id || s.roll_no)}
                  onChange={() => toggleStudent(s.id || s.roll_no)}
                /> */}
                            </label>
                            <img src={s.image || image} alt={s.student_name} />
                            <div className="info">
                                <h4>{s.student_name}</h4>
                                <p>{s.class_name} {s.division}</p>
                            </div>
                            <span className="roll">Roll no : {s.roll_no}</span>
                        </div>
                    ))}
                </div>

                {/* Close */}
                {/* <button className="newstudentpromoteaccept-close" onClick={onClose}>
                    &times;
                </button> */}
            </div>

            {/* Send Back Confirmation Modal */}
            {showSendBackModal && (
                <div className="sendback-modal-overlay">
                    <div className="sendback-modal">
                        <div className="sendback-modal-header">
                            <h3>Confirm Send Back</h3>
                        </div>
                        <div className="sendback-modal-body">
                            <p>
                                Are you sure you want to send back the selected students? 
                                This will move them back to the promotion queue.
                            </p>
                        </div>
                        <div className="sendback-modal-footer">
                            <button 
                                className="sendback-modal-cancel" 
                                onClick={() => setShowSendBackModal(false)}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                className="sendback-modal-confirm"
                                onClick={handleSendBack}
                                disabled={loading}
                            >
                                {loading ? "Processing..." : "Confirm"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
