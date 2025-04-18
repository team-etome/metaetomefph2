import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import './AdminQuestionassigningadd.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const AdminQuestionAssigningadd = ({ isOpen, onClose }) => {

    if (!isOpen) return null;
    const APIURL = useSelector((state) => state.APIURL.url);
    // console.log(APIURL,"apiurl dattatata")
    const admin_id = useSelector((state) => state.admininfo.admininfo?.admin_id);
    console.log(admin_id, "admin_id dattatata")
    const [examinations, setExaminations] = useState([]);
    const [years, setYears] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [classes, setClasses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [totalMarks, setTotalMarks] = useState('');
    const [selectedData, setSelectedData] = useState(null);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedExam, setSelectedExam] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [timetableData, setTimetableData] = useState([]);
    const [filteredYears, setFilteredYears] = useState([]);
    const [filteredClasses, setFilteredClasses] = useState([]);
    const [filteredSubjects, setFilteredSubjects] = useState([]);


    useEffect(() => {
        if (selectedClass && selectedExam && selectedSubject && selectedYear) {
            const match = timetableData.find(item =>
                item.class.toString() === selectedClass.toString() &&
                item.exam_name.toString() === selectedExam.toString() &&
                item.subject.toString() === selectedSubject.toString() &&
                item.year.toString() === selectedYear.toString()
            );
            console.log(timetableData, "timedattaaaa")
            console.log(match, "match datatattata")

            // console.log(selectedClass, selectedExam ,selectedSubject , selectedYear,"selectedClass && selectedExam && selectedSubject && selectedYear")

            if (match) {
                setSelectedData(match.id);
                console.log("Matched timetable ID:", match.id);
            } else {
                setSelectedData(null);
                console.log("No match found.");
            }
        }
    }, [selectedClass, selectedExam, selectedSubject, selectedYear, timetableData]);


    const handleSave = async () => {
        if (!selectedData || !selectedTeacher || !totalMarks) {
            Swal.fire({
                icon: "warning",
                title: "Missing Fields",
                text: "Please select all fields before submitting.",
                confirmButtonText: "OK",
            });
            return;
        }
    
        const formData = {
            timetable: selectedData,
            teacher: selectedTeacher,
            total_marks: totalMarks
        };
    
        try {
            const response = await axios.post(`${APIURL}/api/questionpaper`, formData);
    
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Question paper assigned successfully!",
                confirmButtonText: "OK"
            }).then(() => {
                onClose(); // close modal after OK
            });
    
        } catch (error) {
            console.error("Error saving data:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.response?.data?.error || "Something went wrong while saving.",
                confirmButtonText: "OK"
            });
        }
    };
    


    useEffect(() => {
        const fetchTimetableData = async () => {
            try {
                const response = await axios.get(`${APIURL}/api/gettimetable/${admin_id}`);
                const examsData = response.data.exams;

                console.log(examsData, "fetchTimetableData examsData");

                const examNames = [...new Set(examsData.map(item => item.exam_name))].map(e => ({ value: e, label: e }));
                const yearOptions = [...new Set(examsData.map(item => item.year).filter(Boolean))].map(y => ({ value: y, label: y }));
                const subjectOptions = [...new Set(examsData.map(item => item.subject))].map(s => ({ value: s, label: s }));
                const classOptions = [...new Set(examsData.map(item => item.class))].map(c => ({ value: c, label: c }));

                setExaminations(examNames);
                setYears(yearOptions);
                setSubjects(subjectOptions);
                setClasses(classOptions);
                setTimetableData(examsData); 

            } catch (error) {
                console.error("Error fetching timetable data:", error);
            }
        };

        fetchTimetableData();
    }, [APIURL, admin_id]);

    useEffect(() => {
        if (selectedExam) {
            const filtered = timetableData
                .filter(item => item.exam_name === selectedExam)
                .map(item => item.year)
                .filter(Boolean);
            const unique = [...new Set(filtered)].map(y => ({ value: y, label: y }));
            setFilteredYears(unique);
            setSelectedYear(null); // reset next dropdowns
            setSelectedClass(null);
            setSelectedSubject(null);
        }
    }, [selectedExam, timetableData]);

    useEffect(() => {
        if (selectedExam && selectedYear) {
            const filtered = timetableData
                .filter(item =>
                    item.exam_name === selectedExam &&
                    item.year === selectedYear
                )
                .map(item => item.class);
            const unique = [...new Set(filtered)].map(c => ({ value: c, label: c }));
            setFilteredClasses(unique);
            setSelectedClass(null);
            setSelectedSubject(null);
        }
    }, [selectedYear, selectedExam, timetableData]);

    useEffect(() => {
        if (selectedExam && selectedYear && selectedClass) {
            const filtered = timetableData
                .filter(item =>
                    item.exam_name === selectedExam &&
                    item.year === selectedYear &&
                    item.class === selectedClass
                )
                .map(item => item.subject);
            const unique = [...new Set(filtered)].map(s => ({ value: s, label: s }));
            setFilteredSubjects(unique);
            setSelectedSubject(null);
        }
    }, [selectedClass, selectedExam, selectedYear, timetableData]);


    useEffect(() => {
        const fetchTeacherData = async () => {
            try {
                const response = await axios.get(`${APIURL}/api/teacherdetails/${admin_id}`);
                const teacherData = response.data;
                console.log(teacherData, "teacherData list ")
                const teacherOptions = teacherData.map((teacher) => ({
                    value: teacher.id,
                    label: `${teacher.first_name} ${teacher.last_name}`
                }));

                setTeachers(teacherOptions);
            } catch (error) {
                console.error("Error fetching teacher data:", error);
            }
        };
        fetchTeacherData();
    }, [APIURL, admin_id]);


    const handleNumberInput = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setTotalMarks(value);
        }
    };

    const customStyles = {
        control: (base, state) => ({
            ...base,
            minHeight: '50px',
            height: '50px',
            borderColor: '#ccc',
            boxShadow: state.isFocused ? '0 0 0 1px #526D82' : 0,
            '&:hover': {
                borderColor: '#526D82',
            }
        }),
        valueContainer: (base) => ({
            ...base,
            height: '50px',
            padding: '0 6px'
        }),
        dropdownIndicator: (base) => ({
            ...base,
            color: '#292D32', // Change the color of the dropdown arrow
            padding: '0 8px',
            alignItems: 'center',
            svg: {
                width: '24px',
                height: '24px'
            }
        }),
        indicatorSeparator: () => ({
            display: 'none' // This removes the line (separator) before the dropdown arrow
        }),
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
            maxHeight: '150px',
            overflowY: 'auto',
            fontSize: '14px',
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? '#f0f0f0' : '#fff',
            color: '#526D82',
            '&:active': {
                backgroundColor: '#e6e6e6',
            }
        }),
    };


    return (
        <div className="AdminQuestionAssigning-backdrop">
            <div className="AdminQuestionAssigning-modal-content">
                <div className="AdminQuestionAssigning-modal-header">
                    <h5>Assign Teacher</h5>
                    <button onClick={onClose} className="AdminQuestionAssigning-close-button">&times;</button>
                </div>
                <div className="AdminQuestionAssigning-modal-body">
                    <form>
                        <Row>
                            <Col md={6}>
                                <div className="AdminQuestionAssigning-form-group">
                                    <label className="AdminQuestionAssigning-form-label">Select Name of Examination</label>
                                    <Select
                                        options={examinations}
                                        styles={customStyles}
                                        placeholder=""
                                        isClearable={true}
                                        onChange={(selected) => {
                                            setSelectedExam(selected?.value || null);
                                        }}
                                    />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="AdminQuestionAssigning-form-group">
                                    <label className="AdminQuestionAssigning-form-label">Select Year</label>
                                    <Select
                                        options={filteredYears}
                                        styles={customStyles}
                                        placeholder=""
                                        isClearable={true}
                                        value={filteredYears.find(opt => opt.value === selectedYear)}
                                        onChange={(selected) => setSelectedYear(selected?.value || null)}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <div className="AdminQuestionAssigning-form-group">
                                    <label className="AdminQuestionAssigning-form-label">Select Class</label>
                                    <Select
                                        options={filteredClasses}
                                        styles={customStyles}
                                        placeholder=""
                                        isClearable={true}
                                        value={filteredClasses.find(opt => opt.value === selectedClass)}
                                        onChange={(selected) => setSelectedClass(selected?.value || null)}
                                    />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="AdminQuestionAssigning-form-group">
                                    <label className="AdminQuestionAssigning-form-label">Select Subject</label>
                                    <Select
                                        options={filteredSubjects}
                                        styles={customStyles}
                                        placeholder=""
                                        isClearable={true}
                                        value={filteredSubjects.find(opt => opt.value === selectedSubject)}
                                        onChange={(selected) => setSelectedSubject(selected?.value || null)}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <div className="AdminQuestionAssigning-form-group">
                                    <label className="AdminQuestionAssigning-form-label">Total Marks</label>
                                    <input
                                        type="text"
                                        min="0"
                                        className="custom-input"
                                        style={{
                                            height: '50px',
                                            border: '1px solid #ccc',
                                            borderRadius: '4px',
                                            padding: '0 10px',
                                            fontSize: '16px',
                                            color: '#526D82',
                                            width: '100%',
                                            boxSizing: 'border-box',
                                            outline: "none"
                                        }}
                                        onChange={handleNumberInput}
                                    />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="AdminQuestionAssigning-form-group">
                                    <label className="AdminQuestionAssigning-form-label">Assign Teacher</label>
                                    <Select
                                        options={teachers}
                                        styles={customStyles}
                                        placeholder=""
                                        isClearable={true}
                                        onChange={(selected) => setSelectedTeacher(selected?.value || null)}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </form>
                </div>
                <div className="AdminQuestionAssigning-modal-footer">
                    <button onClick={onClose} className="AdminQuestionAssigning-btn AdminQuestionAssigning-btn-secondary">Clear</button>
                    <button onClick={handleSave} className="AdminQuestionAssigning-btn AdminQuestionAssigning-btn-primary">Save</button>
                </div>
            </div>
        </div>
    );
};

export default AdminQuestionAssigningadd;