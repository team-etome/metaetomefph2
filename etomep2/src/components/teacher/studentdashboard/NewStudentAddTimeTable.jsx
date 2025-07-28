import React, { useEffect, useState } from "react";
import "./newstudentaddtimetable.css";
import NewStudentSetTime from "./NewStudentSetTime";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';

export default function NewStudentAddTimeTable({ isOpen, onClose }) {
    const APIURL = useSelector((state) => state.APIURL.url);
    const teacher = useSelector((state) => state.teacherinfo);
    const teacher_id = teacher.teacherinfo?.teacher_id;
    const class_id = teacher.teacherinfo?.class_id;
    const [days, setDays] = useState("");
    const [periods, setPeriods] = useState("");
    const [timeModal, setTimeModal] = useState(false);
    const [timeData, setTimeData] = useState({});
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedCol, setSelectedCol] = useState(null);



    const [selectedSubjectCell, setSelectedSubjectCell] = useState(null); // { row: 1, col: 2 }
    const [subjectOptions, setSubjectOptions] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState({});





    if (!isOpen) return null;

    const D = Math.min(Math.max(+days, 0), 6);
    const P = Math.max(+periods, 0);

    const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const colors = [
        "#FFDFDF", // Mon
        "#DFFFEF", // Tue
        "#DFE1FF", // Wed
        "#FDDFFF", // Thu
        "#EBFFDF",
        "#DFFCFF",
    ];

    const fetchSubjects = async () => {
        try {
            const res = await axios.get(`${APIURL}/api/selectsubject/${class_id}`);
            console.log("Subject API:", res.data);
            setSubjectOptions(res.data.subjects || []);
        } catch (error) {
            console.error("Error fetching subjects", error);
        }
    };

    useEffect(() => {
        fetchSubjects();
    }, [APIURL, class_id]);

    // Function to check if form is complete
    const isFormComplete = () => {
        // Check if days and periods are set
        if (!days || !periods || days.trim() === '' || periods.trim() === '') {
            return false;
        }

        // Check if at least one subject and time slot is filled
        let hasData = false;
        for (let pi = 0; pi < P; pi++) {
            for (let di = 0; di < D; di++) {
                const key = `${pi}_${di}`;
                const subject = selectedSubjects[key];
                const time = timeData[key];

                if (subject && time) {
                    hasData = true;
                    break;
                }
            }
            if (hasData) break;
        }

        return hasData;
    };

    const handleSave = async () => {
        if (!isFormComplete()) {
            let missingFields = [];

            if (!days || days.trim() === '') missingFields.push("Number of Days");
            if (!periods || periods.trim() === '') missingFields.push("Number of Periods");

            if (days && periods) {
                missingFields.push("At least one subject and time slot");
            }

            Swal.fire({
                icon: "error",
                title: "Missing Required Information",
                text: `Please complete the following: ${missingFields.join(", ")}`,
            });
            return;
        }

        const timetableData = {};

        for (let pi = 0; pi < P; pi++) {
            for (let di = 0; di < D; di++) {
                const key = `${pi}_${di}`;
                const subject = selectedSubjects[key];
                const time = timeData[key];

                if (subject && time) {
                    const day = dayNames[di];
                    if (!timetableData[day]) timetableData[day] = [];

                    timetableData[day].push({
                        period: pi + 1,
                        subject: subject,
                        start_time: time.start,
                        end_time: time.end
                    });
                }
            }
        }

        if (Object.keys(timetableData).length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Incomplete Data',
                text: 'Please fill at least one subject and time slot.',
            });
            return;
        }

        try {
            const response = await axios.post(`${APIURL}/api/timetable`, {
                teacher_id: teacher_id,
                timetable: timetableData,
            });

            Swal.fire({
                icon: 'success',
                title: 'Saved!',
                text: 'Timetable saved successfully.',
            }).then(() => {
                onClose(); // Close modal after success
            });
        } catch (error) {
            console.error("Error saving timetable:", error);
            Swal.fire({
                icon: 'error',
                title: 'Failed!',
                text: 'Failed to save timetable. Try again.',
            });
        }
    };


    return (
        <div className="newstudentaddtimetable-overlay">
            <div
                className="newstudentaddtimetable-modal"
                style={{ "--cols": D, "--rows": P, }}
            >
                {/* Header */}
                <div className="nstt-header">
                    <h3>Add Time Table</h3>
                    <button className="nstt-close" onClick={onClose}>×</button>
                </div>

                {/* Inputs */}
                <div className="nstt-inputs">
                    <input
                        type="number" min="1" max="7"
                        placeholder="Number of Days"
                        value={days}
                        onChange={e => setDays(e.target.value)}
                        onWheel={(e) => e.target.blur()}
                    />
                    <input
                        type="number" min="1"
                        placeholder="Number of Periods"
                        value={periods}
                        onChange={e => setPeriods(e.target.value)}
                        onWheel={(e) => e.target.blur()}
                    />
                </div>
                {D > 0 && (
                    <>
                        <div className="nstt-grid-header" >
                            <div className="nstt-cell nstt-cell-header nstt-col-periods" >Periods</div>
                            {dayNames.slice(0, D).map((day, i) => (
                                <div
                                    key={day}
                                    className="nstt-cell nstt-cell-header"
                                    style={{ background: colors[i] }}
                                >
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* ── Scrollable body ── */}
                        <div className="nstt-body">
                            {Array.from({ length: P }).map((_, pi) => (
                                <React.Fragment key={pi}>
                                    <div className="nstt-cell nstt-row-header">{pi + 1}</div>
                                    {Array.from({ length: D }).map((_, di) => (
                                        <div
                                            key={di}
                                            className="nstt-cell"
                                            style={{ background: colors[di] }}
                                        >
                                            <div
                                                className="nstt-btn"
                                                onClick={() => {
                                                    setSelectedRow(pi);
                                                    setSelectedCol(di);
                                                    setTimeModal(true);
                                                }}
                                            >
                                                {timeData[`${pi}_${di}`]
                                                    ? `${timeData[`${pi}_${di}`].start} - ${timeData[`${pi}_${di}`].end}`
                                                    : "Set Time"}
                                            </div>
                                            <div className="nstt-btn" style={{ position: "relative" }}>
                                                {selectedSubjectCell?.row === pi && selectedSubjectCell?.col === di ? (
                                                    <select
                                                        className="subject-dropdown"
                                                        onChange={(e) => {
                                                            const key = `${pi}_${di}`;
                                                            setSelectedSubjects(prev => ({
                                                                ...prev,
                                                                [key]: e.target.value
                                                            }));
                                                            setSelectedSubjectCell(null);
                                                        }}
                                                        onBlur={() => setSelectedSubjectCell(null)}
                                                        autoFocus
                                                    >
                                                        <option value="">Select Subject</option>
                                                        {Array.isArray(subjectOptions) && subjectOptions.map((subj) => (
                                                            <option key={subj.id} value={subj.name}>{subj.name}</option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <div
                                                        onClick={() => {
                                                            setSelectedSubjectCell({ row: pi, col: di });
                                                        }}
                                                    >
                                                        {selectedSubjects[`${pi}_${di}`] || "Select Subject"}
                                                    </div>
                                                )}
                                            </div>



                                        </div>
                                    ))}
                                </React.Fragment>
                            ))}
                            {timeModal && (
                                <NewStudentSetTime
                                    isOpen={timeModal}
                                    onClose={() => setTimeModal(false)}
                                    onSave={({ start, end }) => {
                                        const key = `${selectedRow}_${selectedCol}`;
                                        setTimeData(prev => ({ ...prev, [key]: { start, end } }));
                                        setTimeModal(false);
                                    }}
                                />
                            )}
                        </div>
                    </>)}

                {/* Footer */}
                <div className="nstt-footer">
                    <button className="nstt-clear" onClick={() => { setDays(""); setPeriods(""); }}>
                        Clear
                    </button>
                    <button
                        className="nstt-save"
                        style={{
                            backgroundColor: isFormComplete ? '#2162B2' : '#bcbcbc',
                            color: '#fff',
                            border: isFormComplete ? '1px solid #2162B2' : '1px solid #bcbcbc',
                            cursor: 'pointer'
                        }}
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
