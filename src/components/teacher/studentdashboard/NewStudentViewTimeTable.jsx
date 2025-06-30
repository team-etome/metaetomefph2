import React, { useState, useEffect } from "react";
import "./newstudentviewtimetable.css";
import NewStudentSetTime from "./NewStudentSetTime";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function NewStudentViewTimeTable({ isOpen, onClose }) {
    const APIURL = useSelector((state) => state.APIURL.url);
    const teacher = useSelector((state) => state.teacherinfo);
    const teacher_id = teacher.teacherinfo?.teacher_id;
    console.log(teacher_id, teacher,"teacher_idteacher_idteacher_id")
    
    const [days, setDays] = useState("");
    const [periods, setPeriods] = useState("");
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [timetableData, setTimetableData] = useState({});

    // For editable grid
    const [timeData, setTimeData] = useState({});
    const [selectedSubjects, setSelectedSubjects] = useState({});
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedCol, setSelectedCol] = useState(null);
    const [selectedSubjectCell, setSelectedSubjectCell] = useState(null);
    const [subjectOptions, setSubjectOptions] = useState([]);
    const [timeModal, setTimeModal] = useState(false);

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

    // Fetch timetable data when component opens
    useEffect(() => {
        if (isOpen && teacher_id) {
            fetchTimetableData();
            fetchSubjects();
        }
    }, [isOpen, teacher_id]);

    const fetchTimetableData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${APIURL}/api/timetable`, {
                params: { teacher_id: teacher_id }
            });
            setTimetableData(response.data.timetable || {});
            // Auto-set days and periods based on data
            const maxDays = Object.keys(response.data.timetable || {}).length;
            const maxPeriods = Math.max(...Object.values(response.data.timetable || {}).map(day => day.length), 0);
            if (maxDays > 0) setDays(maxDays.toString());
            if (maxPeriods > 0) setPeriods(maxPeriods.toString());
        } catch (error) {
            console.error("Error fetching timetable:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSubjects = async () => {
        try {
            const res = await axios.get(`${APIURL}/api/selectsubject/${teacher_id}`);
            setSubjectOptions(res.data.subjects || []);
        } catch (error) {
            console.error("Error fetching subjects", error);
        }
    };

    // Convert timetableData to timeData and selectedSubjects for editing
    const prepareEditState = () => {
        const tData = {};
        const sSubjects = {};
        Object.entries(timetableData).forEach(([day, arr], di) => {
            arr.forEach((entry, pi) => {
                const key = `${pi}_${di}`;
                tData[key] = { start: entry.start_time, end: entry.end_time };
                sSubjects[key] = entry.subject;
            });
        });
        setTimeData(tData);
        setSelectedSubjects(sSubjects);
    };

    // On edit, prepare editable state
    const handleEditClick = () => {
        setEditMode(true);
        prepareEditState();
    };

    // On save, convert back to API format and send PUT
    const handleSaveClick = async () => {
        const timetableToSend = {};
        for (let pi = 0; pi < P; pi++) {
            for (let di = 0; di < D; di++) {
                const key = `${pi}_${di}`;
                const subject = selectedSubjects[key];
                const time = timeData[key];
                if (subject && time) {
                    const day = dayNames[di];
                    if (!timetableToSend[day]) timetableToSend[day] = [];
                    timetableToSend[day].push({
                        period: pi + 1,
                        subject: subject,
                        start_time: time.start,
                        end_time: time.end
                    });
                }
            }
        }
        try {
            await axios.put(`${APIURL}/api/timetable`, {
                teacher_id: teacher_id,
                timetable: timetableToSend,
            });
            setTimetableData(timetableToSend);
            setEditMode(false);
            Swal.fire({
                icon: 'success',
                title: 'Saved!',
                text: 'Timetable updated successfully.'
            }).then(() => {
                onClose();
            });
        } catch (error) {
            console.error("Error updating timetable:", error);
            Swal.fire({
                icon: 'error',
                title: 'Failed!',
                text: 'Failed to update timetable. Try again.'
            });
        }
    };

    // Add this function outside the return
    const handleDelete = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete the timetable?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        });
        if (result.isConfirmed) {
            try {
                await axios.delete(`${APIURL}/api/timetable`, { data: { teacher_id } });
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'Timetable deleted successfully.'
                }).then(() => {
                    onClose();
                });
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed!',
                    text: 'Failed to delete timetable. Try again.'
                });
            }
        }
    };

    return (
        <div className="newstudentviewtimetable-overlay">
            <div
                className="newstudentviewtimetable-modal"
                style={{ "--cols": D, "--rows": P, }}
            >
                {/* Header */}
                <div className="nsttview-header">
                    <h3>View Time Table</h3>
                    <button className="nsttview-close" onClick={onClose}>×</button>
                </div>

                {loading ? (
                    <div className="nsttview-loading">Loading timetable...</div>
                ) : (
                    <>
                        {/* Inputs */}
                        <div className="nsttview-inputs">
                            <input
                                type="number" min="1" max="7"
                                placeholder="Number of Days"
                                value={days}
                                onChange={e => setDays(e.target.value)}
                                disabled={!editMode}
                            />
                            <input
                                type="number" min="1"
                                placeholder="Number of Periods"
                                value={periods}
                                onChange={e => setPeriods(e.target.value)}
                                disabled={!editMode}
                            />
                        </div>
                        {D > 0 && (
                            <>
                                <div className="nsttview-grid-header">
                                    <div className="nsttview-cell nsttview-cell-header nsttview-col-periods" >Periods</div>
                                    {dayNames.slice(0, D).map((day, i) => (
                                        <div
                                            key={day}
                                            className="nsttview-cell nsttview-cell-header"
                                            style={{ background: colors[i] }}
                                        >
                                            {day}
                                        </div>
                                    ))}
                                </div>
                                {/* ── Scrollable body ── */}
                                <div className="nsttview-body">
                                    {Array.from({ length: P }).map((_, pi) => (
                                        <React.Fragment key={pi}>
                                            <div className="nsttview-cell nsttview-row-header">{pi + 1}</div>
                                            {Array.from({ length: D }).map((_, di) => {
                                                const key = `${pi}_${di}`;
                                                return (
                                                    <div
                                                        key={di}
                                                        className="nsttview-cell"
                                                        style={{ background: colors[di] }}
                                                    >
                                                        {editMode ? (
                                                            <>
                                                                <div
                                                                    className="nstt-btn"
                                                                    onClick={() => {
                                                                        setSelectedRow(pi);
                                                                        setSelectedCol(di);
                                                                        setTimeModal(true);
                                                                    }}
                                                                >
                                                                    {timeData[key]
                                                                        ? `${timeData[key].start} - ${timeData[key].end}`
                                                                        : "Set Time"}
                                                                </div>
                                                                <div className="nstt-btn" style={{ position: "relative" }}>
                                                                    {selectedSubjectCell?.row === pi && selectedSubjectCell?.col === di ? (
                                                                        <select
                                                                            className="subject-dropdown"
                                                                            onChange={(e) => {
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
                                                                            {selectedSubjects[key] || "Select Subject"}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                {timeModal && selectedRow === pi && selectedCol === di && (
                                                                    <NewStudentSetTime
                                                                        isOpen={timeModal}
                                                                        onClose={() => setTimeModal(false)}
                                                                        onSave={({ start, end }) => {
                                                                            setTimeData(prev => ({ ...prev, [key]: { start, end } }));
                                                                            setTimeModal(false);
                                                                        }}
                                                                        startValue={timeData[key]?.start || ''}
                                                                        endValue={timeData[key]?.end || ''}
                                                                    />
                                                                )}
                                                            </>
                                                        ) : (() => {
                                                            // View mode: show time and subject if present
                                                            const cellData = timetableData[dayNames[di]] && timetableData[dayNames[di]][pi];
                                                            return cellData ? (
                                                                <>
                                                                    <div className="nsttview-time">
                                                                        {cellData.start_time} - {cellData.end_time}
                                                                    </div>
                                                                    <div className="nsttview-subject">
                                                                        {cellData.subject}
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <div className="nsttview-empty">No data</div>
                                                            );
                                                        })()}
                                                    </div>
                                                );
                                            })}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                )}

                {/* Footer */}
                <div className="nsttview-footer">
                    <button className="nsttview-delete" onClick={handleDelete}>
                        Delete
                    </button>
                    {editMode ? (
                        <button className="nsttview-edit" disabled={!(D && P)} onClick={handleSaveClick}>
                            Save
                        </button>
                    ) : (
                        <button className="nsttview-edit" disabled={!(D && P)} onClick={handleEditClick}>
                            Edit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
