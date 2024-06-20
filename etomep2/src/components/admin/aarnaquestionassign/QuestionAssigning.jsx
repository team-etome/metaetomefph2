import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import "../aarnaquestionassign/questionassigning.css";
import { useSelector } from "react-redux";
import Select from "react-select";
import axios from "axios";

function QuestionAssigning() {
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [teachers, setTeachers] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [examName, setExamName] = useState('');
    const [examDate, setExamDate] = useState('');
    const [classNo, setClassNo] = useState('');
    const [division, setDivision] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [totalMark, setTotalMark] = useState('');
    const [term, setTerm] = useState('');

    const APIURL = useSelector(state => state.APIURL.url);
    const teacherinfo = useSelector(state => state.adminteacherinfo);

    useEffect(() => {
        fetchSubjects();
        mapTeachers();
    }, [teacherinfo]);

    const mapTeachers = () => {
        const teacherOptions = teacherinfo.adminteacherinfo?.map(teacher => ({
            value: `${teacher.first_name} ${teacher.last_name}`,
            label: `${teacher.first_name} ${teacher.last_name}`
        }));
        setTeachers(teacherOptions);
    };

    const fetchSubjects = async () => {
        try {
            const response = await axios.get(`${APIURL}/api/curriculam`);
            const mappedSubjects = response.data.subject_names.map(sub => ({
                value: sub.subject_name,
                label: sub.subject_name
            }));
            setSubjects(mappedSubjects);
        } catch (error) {
            console.error("Failed to fetch subjects:", error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            subject: selectedSubject,
            teacher: selectedTeacher,
            exam_name: examName,
            exam_date: examDate,
            class_name: classNo,
            division: division,
            start_time: startTime,
            end_time: endTime,
            total_marks: totalMark,
            term: term
        };

        try {
            const response = await axios.post(`${APIURL}/api/questionpaper`, formData);
            alert('Data saved successfully');
        } catch (error) {
            console.error('Failed to submit form:', error.response.data);
            alert('Failed to save data');
        }
    };

    const customStyles = {
        control: (base, state) => ({
            ...base,
            width: "100%",
            minHeight: "40px",
            border: "1px solid #526D82",
            borderRadius: "8px",
            boxShadow: state.isFocused ? "0 0 0 1px #526D82" : "none",
            "&:hover": {
                borderColor: "#526D82"
            },
            "&:focus": {
                borderColor: "#526D82",
                outline: "none"
            }
        }),
        placeholder: (base) => ({
            ...base,
            color: "#526D82",
        }),
        singleValue: (base) => ({
            ...base,
            color: "#000",
        }),
        option: (base) => ({
            ...base,
            color: "#000",
        }),
        valueContainer: (base) => ({
            ...base,
            padding: "0 10px",
        }),
        dropdownIndicator: (base) => ({
            ...base,
            color: "#526D82",
        }),
        indicatorsContainer: (base) => ({
            ...base,
            alignItems: "center",
        }),
        menu: (base) => ({
            ...base,
            zIndex: 9999,
            position: "absolute",
        }),
    };

    return (
        <div>
            <Container className="qpaper_assign_container">
                <form className="qpaper_form" onSubmit={handleSubmit}>
                    <div className="qpaper_form_scrollable">
                        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                            <Link to="/aarnanavbar">
                                <IoChevronBackSharp className="qpaper_back" />
                            </Link>
                            <h1 className="qpaper_title">Question Setting</h1>
                        </div>
                        <div style={{ border: "0.5px solid #526D82" }}></div>

                        <Row style={{ paddingTop: "20px" }}>
                            <Col md={6}>
                                <div className="qpaper_group">
                                    <label htmlFor="exam_name">Exam Name<span style={{ color: "red" }}>*</span></label>
                                    <input type="text" id="exam_name" value={examName} onChange={(e) => setExamName(e.target.value)} />
                                </div>
                                <div className="qpaper_group">
                                    <label htmlFor="exam_date">Exam Date<span style={{ color: "red" }}>*</span></label>
                                    <input type="date" id="exam_date" value={examDate} onChange={(e) => setExamDate(e.target.value)} />
                                </div>
                                <div className="qpaper_group">
                                    <label htmlFor="class">Class<span style={{ color: "red" }}>*</span></label>
                                    <input type="text" id="class" value={classNo} onChange={(e) => setClassNo(e.target.value)} />
                                </div>
                                <div className="qpaper_group">
                                    <label htmlFor="division">Division</label>
                                    <input type="text" id="division" value={division} onChange={(e) => setDivision(e.target.value)} />
                                </div>
                                <div className="qpaper_group">
                                    <label htmlFor="subject">Subject<span style={{ color: "red" }}>*</span></label>
                                    <Select
                                        options={subjects}
                                        styles={customStyles}
                                        value={subjects.find(option => option.value === selectedSubject)}
                                        onChange={option => setSelectedSubject(option ? option.value : null)}
                                        placeholder="Select a subject"
                                        isClearable={true}
                                    />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="qpaper_group">
                                    <label htmlFor="s_time">Start Time<span style={{ color: "red" }}>*</span></label>
                                    <input type="time" id="s_time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                                </div>
                                <div className="qpaper_group">
                                    <label htmlFor="e_time">End Time<span style={{ color: "red" }}>*</span></label>
                                    <input type="time" id="e_time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                                </div>
                                <div className="qpaper_group">
                                    <label htmlFor="term">Term<span style={{ color: "red" }}>*</span></label>
                                    <input type="text" id="term" value={term} onChange={(e) => setTerm(e.target.value)} />
                                </div>
                                <div className="qpaper_group">
                                    <label htmlFor="t_mark">Total Mark<span style={{ color: "red" }}>*</span></label>
                                    <input type="text" id="t_mark" value={totalMark} onChange={(e) => setTotalMark(e.target.value)} />
                                </div>
                                <div className="qpaper_group">
                                    <label htmlFor="assign_faculty">Assign Faculty<span style={{ color: "red" }}>*</span></label>
                                    <Select
                                        options={teachers}
                                        styles={customStyles}
                                        value={teachers.find(option => option.value === selectedTeacher)}
                                        onChange={option => setSelectedTeacher(option ? option.value : null)}
                                        placeholder="Select a teacher"
                                        isClearable={true}
                                    />
                                </div>
                                <div className="submit_qpaper">
                                    <button type="submit" className="qpaper_button">Submit</button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </form>
            </Container>
        </div>
    );
}

export default QuestionAssigning;
