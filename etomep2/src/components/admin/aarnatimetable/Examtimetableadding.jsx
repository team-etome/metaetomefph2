import React, { useEffect, useState } from 'react';
import './examtimetableadding.css'; // Ensure the CSS is appropriate
import axios from 'axios';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import Select from 'react-select';

const Examtimetableadding = ({ onClose }) => {
    const APIURL = useSelector((state) => state.APIURL.url);
    const admin_id = useSelector((state) => state.admininfo.admininfo?.admin_id);

    const [examName, setExamName] = useState("");
    const [year, setYear] = useState("");
    const [selectedClass, setSelectedClass] = useState(null);
    const [subjectOptions, setSubjectOptions] = useState([]);
    const [term, setTerm] = useState("")

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



    const classOptions = useSelector(state => state.examClasses.list);

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

        const payload = {
            exam_name: examName,
            term,
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

    const handleRemoveRow = (indexToRemove) => {
        setEntries((prevEntries) => prevEntries.filter((_, index) => index !== indexToRemove));
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
        <div className="examtimetable-adding-backdrop">
            <div className="examtimetable-adding-container">
                <div className="examtimetable-adding-header">
                    <p className="examtimetable-adding-header-heading">Add Time Table</p>
                    <button onClick={onClose} className="btn-close" aria-label="Close"></button>
                </div>
                <form className="examtimetable-adding-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="examtimetable-adding_form-section">
                        <div className="examtimetable-adding_form-header">
                            <label className="examtimetable-adding_form-label">
                                Name of Examination <span className="examtimetable-adding_required">*</span>
                            </label>
                            <label className="examtimetable-adding_form-label">
                                Year <span className="examtimetable-adding_required">*</span>
                            </label>
                            <label className="examtimetable-adding_form-label">
                                Select Term
                            </label>
                            <label className="examtimetable-adding_form-label">
                                Select Class <span className="examtimetable-adding_required">*</span>
                            </label>
                        </div>
                        <div className="examtimetable-adding_form-input-group">
                            <input type="text" value={examName} onChange={(e) => setExamName(e.target.value)} className="examtimetable-adding_form-input" />
                            <input type="text" value={year} onChange={(e) => setYear(e.target.value)} className="examtimetable-adding_form-input" />
                            <select
                                className="form-select form-select-sm examtimetable-adding_form-select"
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
                                className="form-select form-select-sm examtimetable-adding_form-select"
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
                    <div className="examtimetable-adding-form_form-content">
                        <div className="examtimetable-adding-form-table">
                            <div className="examtimetable-adding-form-table-header">
                                <label>
                                    Select Subject <span className="examtimetable-adding_required">*</span>
                                </label>
                                <label>
                                    Date <span className="examtimetable-adding_required">*</span>
                                </label>
                                <label>
                                    Start Time <span className="examtimetable-adding_required">*</span>
                                </label>
                                <label>
                                    End Time <span className="examtimetable-adding_required">*</span>
                                </label>
                            </div>
                            {entries.map((entry, index) => (
                                <div key={index} className="examtimetable-adding-form-table-row examtimetable-adding-form-row-with-delete">
                                    <select
                                        value={entry.subject}
                                        onChange={(e) => handleEntryChange(index, 'subject', e.target.value)}
                                        className="form-select form-select-sm examtimetable-adding_form-select"
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
                                            className="examtimetable-adding-form-remove-row-btn"
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
                            <div className="examtimetable-adding_addnext_button_main">
                                <button type="button" className="btn-primary examtimetable-adding_addnext_button" onClick={handleAddNext}>+ Add Next</button>
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

export default Examtimetableadding;