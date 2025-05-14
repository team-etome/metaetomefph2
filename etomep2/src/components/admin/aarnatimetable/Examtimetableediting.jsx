import React, { useEffect, useState } from 'react';
import './examtimetableediting.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Examtimetable from './ExamTimetable';
import Select from 'react-select';

const Examtimetableediting = ({ onClose, defaultClassOption, defaultEntries, defaultExamKey, defaultTerm }) => {
    const navigate = useNavigate();
    const APIURL = useSelector((state) => state.APIURL.url);
    const admin_id = useSelector((state) => state.admininfo.admininfo?.admin_id);
    const location = useLocation();

    const classData = location.state?.classData || [];
    console.log(defaultEntries, "classDatakdjfghuldhfiguh")

    const [examName, setExamName] = useState("Annual Examination");
    const [year, setYear] = useState("2025");
    const [selectedClass, setSelectedClass] = useState(null);
    const [subjectOptions, setSubjectOptions] = useState([]);
    const [term, setTerm] = useState(defaultTerm || "");

    const [entries, setEntries] = useState([
        { subject: 'English', date: '', startTime: '', endTime: '' }
    ]);

    const classOptions = useSelector(state => state.examClasses.list);

    // useEffect(() => {
    //     if (defaultEntries && defaultEntries.length > 0) {
    //         setEntries(defaultEntries.map(entry => ({
    //             subject: entry.subject_id,
    //             date: entry.exam_date,
    //             startTime: entry.start_time,
    //             endTime: entry.end_time
    //         })));
    //     }
    //     if (defaultClassId) {
    //         setSelectedClass({ value: defaultClassId });
    //     }
    // }, [defaultEntries, defaultClassId]);


    useEffect(() => {
        // 1) Exam Key → split into type + year
        //    Assumes your key ends in a 4-digit year.
        const match = defaultExamKey.match(/^(.*?)(\d{4})$/);
        if (match) {
            setExamName(match[1].trim());
            setYear(match[2]);
        }

        // 2) Rows
        if (defaultEntries?.length) {
            setEntries(defaultEntries.map(r => ({
                id:       r.id,
                subject: r.subject_id,
                date: r.exam_date,
                startTime: ampmTo24(r.start_time),
                endTime: ampmTo24(r.end_time),
            })));
        }

        // 3) Class → full option
        let clsOpt = defaultClassOption;
        // if for some reason you only got value, you can lookup:
        if (!clsOpt && defaultClassOption?.value) {
            clsOpt = classOptions.find(o => o.value === defaultClassOption.value);
        }
        if (clsOpt) {
            setSelectedClass(clsOpt);
            const subs = clsOpt.subjectList.map(s => ({
                label: s.subject,
                value: s.subject_id
            }));
            setSubjectOptions(subs);
        }
        if (defaultClassOption && classOptions.length) {
            const opt = classOptions.find(o => o.value === defaultClassOption.value);
            if (opt) {
                setSelectedClass(opt);
                setSubjectOptions(
                    opt.subjectList.map(s => ({ label: s.subject, value: s.subject_id }))
                );
            }
        }
    }, [defaultExamKey, defaultEntries, defaultClassOption, classOptions]);

    const convertToAmPm = (timeStr) => {
        if (!timeStr) return '';
        const [hour, minute] = timeStr.split(':');
        const h = parseInt(hour);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const formattedHour = h % 12 === 0 ? 12 : h % 12;
        return `${formattedHour.toString().padStart(2, '0')}:${minute} ${ampm}`;
    };

    // converts "02:30 PM" → "14:30", "12:00 AM" → "00:00"
    const ampmTo24 = (str) => {
        if (!str) return "";
        let [time, meridiem] = str.split(" ");
        let [h, m] = time.split(":").map(Number);
        if (meridiem === "PM" && h < 12) h += 12;
        if (meridiem === "AM" && h === 12) h = 0;
        return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
    };


    const handleAddNext = () => {
        setEntries([...entries, { subject: '', date: '', startTime: '', endTime: '' }]);
    };

    const handleEntryChange = (index, field, value) => {
        const updatedEntries = [...entries];
        updatedEntries[index][field] = value;
        setEntries(updatedEntries);
    };

    const handleRemoveRow = (indexToRemove) => {
        setEntries((prevEntries) => prevEntries.filter((_, index) => index !== indexToRemove));
    };

    // useEffect(() => {
    //     const fetchClass = async () => {
    //         try {
    //             const response = await axios.get(`${APIURL}/api/addClassname/${admin_id}`);
    //             const formatted = response.data.map((cls) => ({
    //                 value: cls.class,
    //                 label: `${cls.class_name} ${cls.division}`,
    //                 subjectList: cls.curriculum,
    //             }));
    //             setClassOptions(formatted);
    //         } catch (error) {
    //             console.error("Failed to fetch class data");
    //             Swal.fire({
    //                 icon: "error",
    //                 title: "Error!",
    //                 text: "Unable to load class list.",
    //             });
    //         }
    //     };

    //     fetchClass();
    // }, [APIURL, admin_id]);

    // const handleClassChange = (e) => {
    //     const selectedValue = parseInt(e.target.value);
    //     const selected = classOptions.find((c) => c.value === selectedValue);
    //     if (!selected) return;

    //     setSelectedClass(selected);

    //     const formattedSubjects = selected.subjectList.map((subj) => ({
    //         value: subj.subject_id,
    //         label: subj.subject,
    //     }));

    //     setSubjectOptions(formattedSubjects);

    //     setEntries((prev) =>
    //         prev.map((entry) => ({ ...entry, subject: '' }))
    //     );
    // };

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
        const timetableId = defaultEntries[0]?.id;
        if (!timetableId) {
            console.error("No timetable ID to update");
            return;
        }
        const rowIds = defaultEntries.map(r => r.id);

        const payload = {
            exam_name: examName,
            term,
            year,
            class_id: selectedClass?.value,
            admin_id,
            timetable: entries.map(entry => ({
                id:          entry?.id || null,
                subject_id: entry.subject,
                date: entry.date,
                start_time: convertToAmPm(entry.startTime),
                end_time: convertToAmPm(entry.endTime),
            })),
            id: rowIds, 
        };

        try {
            await axios.put(
                `${APIURL}/api/examtimetable`,
                payload
            );
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


    const dashboardsmallcustomStyles = {
        control: (base, state) => ({
            ...base,
            width: '200px',
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

        indicatorSeparator: () => ({ display: 'none' }),

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
            maxHeight: '200px',
            overflowY: 'auto',
            fontSize: '14px',
        }),

        option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? '#2162B2' : '#fff',
            color: state.isFocused ? '#fff' : '#222222',
            '&:active': { backgroundColor: '#e6e6e6' },
        }),
    };

    const classSelectOptions = classOptions.map(cls => ({
        label: cls.label,
        value: cls.value,
        subjectList: cls.subjectList,    // carry over the subjects
    }));

    // 2) new handler signature
    const handleClassChange = option => {
        setSelectedClass(option);

        // rebuild subject dropdown from the selected class
        const formattedSubjects = option.subjectList.map(subj => ({
            label: subj.subject,
            value: subj.subject_id,
        }));
        setSubjectOptions(formattedSubjects);

        // clear any old subject selections
        setEntries(prev => prev.map(r => ({ ...r, subject: '' })));
    };

    return (
        <div className="examtimetable-edit-backdrop">
            <div className="examtimetable-edit-container">
                <div className="examtimetable-edit-header">
                    <p className="examtimetable-edit-header-heading">Edit Time Table</p>
                    <button onClick={onClose} className="btn-close" aria-label="Close"></button>
                </div>
                <form className="examtimetable-edit-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="examtimetable-edit_form-section">
                        <div className="examtimetable-edit_form-header">
                            <label className="examtimetable-edit_form-label">
                                Name of Examination <span className="examtimetable-edit_required">*</span>
                            </label>
                            <label className="examtimetable-edit_form-label">
                                Year <span className="examtimetable-edit_required">*</span>
                            </label>
                            <label className="examtimetable-edit_form-label">
                                Select Term
                            </label>
                            <label className="examtimetable-edit_form-label">
                                Select Class <span className="examtimetable-edit_required">*</span>
                            </label>
                        </div>
                        <div className="examtimetable-edit_form-input-group">
                            <input type="text" value={examName} onChange={(e) => setExamName(e.target.value)} className="examtimetable-edit_form-input" />
                            <input type="text" value={year} onChange={(e) => setYear(e.target.value)} className="examtimetable-edit_form-input" />
                            <select
                                className="form-select form-select-sm examtimetable-edit_form-select"
                                value={term}
                                onChange={(e) => setTerm(e.target.value)}
                            >
                                <option value="">Select term</option>
                                <option value="Term 1">Term 1</option>
                                <option value="Term 2">Term 2</option>
                                <option value="Term 3">Term 3</option>
                                <option value="Term 4">Term 4</option>
                                <option value="Term 5">Term 5</option>
                                <option value="Term 6">Term 6</option>
                            </select>
                            {/* <select
                                className="form-select form-select-sm examtimetable-edit_form-select"
                                value={selectedClass?.value || ''}
                                onChange={handleClassChange}
                            >
                                <option value="">Select Class</option>
                                {classOptions.map((cls) => (
                                    <option key={cls.value} value={cls.value}>
                                        {cls.label}
                                    </option>
                                ))}
                            </select> */}
                            <Select
                                styles={dashboardsmallcustomStyles}
                                options={classSelectOptions}
                                value={selectedClass}
                                onChange={handleClassChange}
                                placeholder="Select Class"
                                isClearable
                            />
                        </div>
                    </div>
                    <div className="examtimetable-edit-form_form-content">
                        <div className="examtimetable-edit-form-table">
                            <div className="examtimetable-edit-form-table-header" >
                                <label>
                                    Select Subject <span className="examtimetable-edit_required">*</span>
                                </label>
                                <label>
                                    Date <span className="examtimetable-edit_required">*</span>
                                </label>
                                <label>
                                    Start Time <span className="examtimetable-edit_required">*</span>
                                </label>
                                <label>
                                    End Time <span className="examtimetable-edit_required">*</span>
                                </label>
                            </div>
                            {entries.map((entry, index) => (
                                <div key={index} className="examtimetable-edit-form-table-row examtimetable-edit-form-row-with-delete" >
                                    <select
                                        value={entry.subject}
                                        onChange={(e) => handleEntryChange(index, 'subject', e.target.value)}
                                        className="form-select form-select-sm examtimetable-edit_form-select"
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
                                    {entries.length > 1 && (
                                        <span
                                            className="examtimetable-edit-form-remove-row-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRemoveRow(index);
                                            }}
                                        >
                                            &#10005;
                                        </span>
                                    )}
                                </div>
                            ))}
                            <div className="examtimetable-edit_addnext_button_main">
                                <button type="button" className="btn-primary examtimetable-edit_addnext_button" onClick={handleAddNext}>+ Add Next</button>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="examtimetable-adding_clear_button_main">
                    <button type="button" className="btn-secondary examtimetable-adding_clear_button">Clear</button>
                    <button type="submit" className="btn-success examtimetable-adding_save_button" onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default Examtimetableediting;