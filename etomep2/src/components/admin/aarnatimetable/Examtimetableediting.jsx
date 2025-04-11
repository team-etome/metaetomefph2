import React, { useEffect, useState } from 'react';
import './Examtimetableediting.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Examtimetable from './ExamTimetable';

const Examtimetableediting = () => {
    const navigate = useNavigate();
    const APIURL = useSelector((state) => state.APIURL.url);
    const admin_id = useSelector((state) => state.admininfo.admininfo?.admin_id);
    const location = useLocation();
    const classData = location.state?.classData || [];
    console.log(classData, "classDatakdjfghuldhfiguh")

    const [examName, setExamName] = useState("Annual Examination");
    const [year, setYear] = useState("2025");
    const [classOptions, setClassOptions] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [subjectOptions, setSubjectOptions] = useState([]);

    const [entries, setEntries] = useState([
        { subject: 'English', date: '', startTime: '', endTime: '' }
    ]);

    const convertToAmPm = (timeStr) => {
        if (!timeStr) return '';
        const [hour, minute] = timeStr.split(':');
        const h = parseInt(hour);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const formattedHour = h % 12 === 0 ? 12 : h % 12;
        return `${formattedHour.toString().padStart(2, '0')}:${minute} ${ampm}`;
    };


    const handleAddNext = () => {
        setEntries([...entries, { subject: '', date: '', startTime: '', endTime: '' }]);
    };

    const handleEntryChange = (index, field, value) => {
        const updatedEntries = [...entries];
        updatedEntries[index][field] = value;
        setEntries(updatedEntries);
    };

    useEffect(() => {
        const fetchClass = async () => {
            try {
                const response = await axios.get(`${APIURL}/api/addClassname/${admin_id}`);
                const formatted = response.data.map((cls) => ({
                    value: cls.class,
                    label: `${cls.class_name} ${cls.division}`,
                    subjectList: cls.curriculum,
                }));
                setClassOptions(formatted);
            } catch (error) {
                console.error("Failed to fetch class data");
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: "Unable to load class list.",
                });
            }
        };

        fetchClass();
    }, [APIURL, admin_id]);

    const handleClassChange = (e) => {
        const selectedValue = parseInt(e.target.value);
        const selected = classOptions.find((c) => c.value === selectedValue);
        if (!selected) return;

        setSelectedClass(selected);

        const formattedSubjects = selected.subjectList.map((subj) => ({
            value: subj.subject_id,
            label: subj.subject,
        }));

        setSubjectOptions(formattedSubjects);

        setEntries((prev) =>
            prev.map((entry) => ({ ...entry, subject: '' }))
        );
    };


    const handleSave = async () => {
        // Validate required fields
        let missingFields = [];

        if (!examName.trim()) missingFields.push("Exam Name");
        if (!year.trim()) missingFields.push("Year");
        if (!selectedClass || !selectedClass.value) missingFields.push("Class");


        entries.forEach((entry, index) => {
            if (!entry.subject || !entry.date || !entry.startTime || !entry.endTime) {
                missingFields.push(`Row ${index + 1}`);
            }
        });

        if (missingFields.length > 0) {
            Swal.fire({
                icon: "error",
                title: "Missing Required Information",
                text: `Please complete the following fields: ${missingFields.join(", ")}`,
            });
            return;
        }

        const payload = {
            exam_name: examName,
            year,
            class_id: selectedClass?.value,
            admin_id,
            timetable: entries.map(entry => ({
                subject_id: entry.subject,
                date: entry.date,
                start_time: convertToAmPm(entry.startTime),
                end_time: convertToAmPm(entry.endTime),
            })),
        };

        try {
            await axios.post(`${APIURL}/api/examtimetable`, payload);
            Swal.fire({
                icon: "success",
                title: "Saved!",
                text: "Timetable saved successfully.",
                confirmButtonText: "OK",
            }).then(() => {
                onClose();
            });
        } catch (error) {
            console.error("Error saving timetable:", error.response?.data || error.message);
            Swal.fire({
                icon: "error",
                title: "Failed!",
                text: "Could not save the timetable. Please try again.",
                confirmButtonText: "OK",
            });
        }
    };


    return (
        <div className="examtimetable-editing-backdrop">
            <div className="examtimetable-editing-container">
                <div className="examtimetable-editing-header">
                    <h3>Edit Time Table</h3>
                    <button
                        onClick={() => navigate('/aarnanavbar')}
                        className="btn-close"
                        aria-label="Close"
                    ></button>

                </div>
                <form className="examtimetable-editing-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="examtimetable-editing_form-section">
                        <div className="examtimetable-editing_form-header">
                            <label className="examtimetable-editing_form-label">
                                Name of Examination <span className="examtimetable-editing_required">*</span>
                            </label>
                            <label className="examtimetable-editing_form-label">
                                Year <span className="examtimetable-editing_required">*</span>
                            </label>
                            <label className="examtimetable-editing_form-label">
                                term
                            </label>
                            <label className="examtimetable-editing_form-label">
                                Select Classes <span className="examtimetable-editing_required">*</span>
                            </label>
                        </div>
                        <div className="examtimetable-editing_form-input-group">
                            <input type="text" value={examName} onChange={(e) => setExamName(e.target.value)} className="examtimetable-editing_form-input" />
                            <input type="text" value={year} onChange={(e) => setYear(e.target.value)} className="examtimetable-editing_form-input" />
                            <select
                                className="examtimetable-editing_form-select"
                                value={term}
                                onChange={(e) => setTerm(e.target.value)}
                            >
                                <option value="">Select Class</option>
                                <option value="Term 1">Term 1</option>
                                <option value="Term 2">Term 2</option>
                                <option value="Term 3">Term 3</option>
                                <option value="Term 4">Term 4</option>
                                <option value="Term 5">Term 5</option>
                                <option value="Term 6">Term 6</option>
                            </select>
                            <select
                                className="examtimetable-editing_form-select"
                                value={selectedClass?.value || ''}
                                onChange={handleClassChange}
                            >
                                <option value="">Select Class</option>
                                {classOptions.map((cls) => (
                                    <option key={cls.value} value={cls.value}>
                                        {cls.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <hr />
                    <div className="examtimetable-editing-form_form-content">
                        <div className="examtimetable-editing-form-table">
                            <div className="examtimetable-editing-form-table-header">
                                <label>
                                    Subject <span className="examtimetable-editing_required">*</span>
                                </label>
                                <label>Date <span className="examtimetable-editing_required">*</span></label>
                                <label>Start Time <span className="examtimetable-editing_required">*</span></label>
                                <label>End Time <span className="examtimetable-editing_required">*</span></label>
                            </div>
                            {entries.map((entry, index) => (
                                <div key={index} className="examtimetable-editing-form-table-row">
                                    <select
                                        value={entry.subject}
                                        onChange={(e) => handleEntryChange(index, 'subject', e.target.value)}
                                    >
                                        <option value="">Select Subject</option>
                                        {subjectOptions.map((subj) => (
                                            <option key={subj.value} value={subj.value}>
                                                {subj.label}
                                            </option>
                                        ))}
                                    </select>
                                    <input type="date" value={entry.date} onChange={(e) => handleEntryChange(index, 'date', e.target.value)} />
                                    <input type="time" value={entry.startTime} onChange={(e) => handleEntryChange(index, 'startTime', e.target.value)} />
                                    <input type="time" value={entry.endTime} onChange={(e) => handleEntryChange(index, 'endTime', e.target.value)} />
                                </div>
                            ))}
                            <div className="form-actions examtimetable-editing_addnext_button_main">
                                <button type="button" className="btn-primary examtimetable-editing_addnext_button" onClick={handleAddNext}>+ Add Next</button>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="form-actions examtimetable-editing_clear_button_main">
                    <button type="button" className="btn-secondary examtimetable-editing_clear_button">Clear</button>
                    <button type="submit" className="btn-success examtimetable-editing_save_button" onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default Examtimetableediting;