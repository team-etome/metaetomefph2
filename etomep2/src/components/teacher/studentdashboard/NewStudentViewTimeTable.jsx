import React, { useState, useEffect } from "react";
import "./newstudentviewtimetable.css";
import NewStudentSetTime from "./NewStudentSetTime";
import axios from "axios";
import { useSelector } from "react-redux";

export default function NewStudentViewTimeTable({ isOpen, onClose }) {
    const APIURL = useSelector((state) => state.APIURL.url);
    const teacher = useSelector((state) => state.teacherinfo);
    const teacher_id = teacher.teacherinfo?.teacher_id;
    
    const [days, setDays] = useState("");
    const [periods, setPeriods] = useState("");
    const [timeModal, setTimeModal] = useState(false);
    const [timetableData, setTimetableData] = useState({});
    const [loading, setLoading] = useState(false);

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
        }
    }, [isOpen, teacher_id]);

    const fetchTimetableData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${APIURL}/api/timetable`, {
                params: { teacher_id: teacher_id }
            });
            
            console.log("Timetable data:", response.data);
            setTimetableData(response.data.timetable || {});
            
            // Auto-set days and periods based on data
            const maxDays = Object.keys(response.data.timetable || {}).length;
            const maxPeriods = Math.max(...Object.values(response.data.timetable || {}).map(day => day.length), 0);
            
            if (maxDays > 0) setDays(maxDays.toString());
            if (maxPeriods > 0) setPeriods(maxPeriods.toString());
            
        } catch (error) {
            console.error("Error fetching timetable:", error);
            // If no data exists, don't show error - just show empty timetable
        } finally {
            setLoading(false);
        }
    };

    // Helper function to get cell data
    const getCellData = (dayIndex, periodIndex) => {
        const dayName = dayNames[dayIndex];
        const dayData = timetableData[dayName];
        
        if (dayData && dayData[periodIndex]) {
            const entry = dayData[periodIndex];
            return {
                subject: entry.subject,
                startTime: entry.start_time,
                endTime: entry.end_time
            };
        }
        return null;
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
                            />
                            <input
                                type="number" min="1"
                                placeholder="Number of Periods"
                                value={periods}
                                onChange={e => setPeriods(e.target.value)}
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
                                                const cellData = getCellData(di, pi);
                                                return (
                                                    <div
                                                        key={di}
                                                        className="nsttview-cell"
                                                        style={{ background: colors[di] }}
                                                    >
                                                        {cellData ? (
                                                            <>
                                                                <div className="nsttview-time">
                                                                    {cellData.startTime} - {cellData.endTime}
                                                                </div>
                                                                <div className="nsttview-subject">
                                                                    {cellData.subject}
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div className="nsttview-empty">No data</div>
                                                            </>
                                                        )}
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
                    <button className="nsttview-delete" onClick={() => { setDays(""); setPeriods(""); }}>
                        Clear
                    </button>
                    <button className="nsttview-edit" disabled={!(D && P)}>
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
}
