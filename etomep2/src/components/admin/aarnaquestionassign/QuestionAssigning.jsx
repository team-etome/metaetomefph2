import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import "../aarnaquestionassign/questionassigning.css";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";

import { adminteacherinfo } from "../../../Redux/Actions/AdminTeacherInfoAction";

function QuestionAssigning() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [examName, setExamName] = useState("");
  const [examDate, setExamDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [totalMark, setTotalMark] = useState("");
  const [instruction, setInstruction] = useState("");
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [classDetails, setClassDetails] = useState([]);

  const APIURL = useSelector((state) => state.APIURL.url);
  const teacherinfo = useSelector((state) => state.adminteacherinfo);
  const admininfo = useSelector((state) => state.admininfo);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const admin_id = admininfo.admininfo?.admin_id;

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const response = await axios.get(
          `${APIURL}/api/addClassname/${admin_id}`
        );
        setClassDetails(response.data);
      } catch (error) {
        console.error("Failed to fetch class data");
      }
    };
    fetchClass();
  }, [APIURL, admin_id]);

  useEffect(() => {
    const fetchTeacherInfo = async () => {
      try {
        const response = await axios.get(
          `${APIURL}/api/teacherdetails/${admin_id}`
        );
        dispatch(adminteacherinfo(response.data));
      } catch (error) {
        console.error("Failed to fetch teacher data", error);
      }
    };

    fetchTeacherInfo();
  }, [APIURL, admin_id, dispatch]);

  useEffect(() => {
    if (selectedClass && selectedDivision) {
      const selectedClassDetails = classDetails.find(
        (item) =>
          item.class_name === selectedClass.value &&
          item.division === selectedDivision.value
      );

      if (selectedClassDetails) {
        const mappedSubjects = selectedClassDetails.curriculum.map((sub) => ({
          value: sub.subject,
          label: sub.subject,
        }));
        setSubjects(mappedSubjects);
      } else {
        setSubjects([]);
      }
    } else {
      setSubjects([]);
    }
  }, [selectedClass, selectedDivision, classDetails]);

  const mapTeachers = () => {
    const teacherOptions = teacherinfo.adminteacherinfo?.map((teacher) => ({
      value: `${teacher.first_name} ${teacher.last_name}`,
      label: `${teacher.first_name} ${teacher.last_name}`,
    }));
    setTeachers(teacherOptions);
  };

  useEffect(() => {
    mapTeachers();
  }, [teacherinfo]);

  const classOptions = Array.from(
    new Set(classDetails.map((item) => item.class_name))
  ).map((className) => ({
    value: className,
    label: className,
  }));

  const divisionOptions = classDetails
    .filter((item) => item.class_name === selectedClass?.value)
    .map((item) => ({
      value: item.division,
      label: item.division,
    }));

  const handleClassChange = (selectedOption) => {
    setSelectedClass(selectedOption);
    setSelectedDivision(null);
    setSubjects([]);
  };

  const handleDivisionChange = (selectedOption) => {
    setSelectedDivision(selectedOption);
  };

  const termOptions = Array.from({ length: 10 }, (_, i) => ({
    value: `term${i + 1}`,
    label: `Term ${i + 1}`,
  }));

  const handleTermChange = (selectedOption) => {
    setTerm(selectedOption?.value || null);
    console.log("Selected Term:", selectedOption);
  };

  console.log(term, "termmmmm");

  const toTitleCase = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (endTime && startTime && endTime <= startTime) {
      Swal.fire({
        icon: "error",
        title: "Invalid Time",
        text: "End time must be after the start time.",
      });
      return;
    }

    const requiredFields = [
      { value: selectedSubject, label: "Subject" },
      { value: selectedTeacher, label: "Teacher" },
      { value: examName, label: "Exam Name" },
      { value: examDate, label: "Exam Date" },

      { value: term, label: "Term" },
      { value: totalMark, label: "Total Mark" },
      { value: startTime, label: "Start Time" },
      { value: endTime, label: "End Time" },
    ];

    const missingFields = requiredFields.filter((field) => !field.value);

    if (missingFields.length > 0) {
      const missingFieldLabels = missingFields
        .map((field) => field.label)
        .join(", ");
      Swal.fire({
        icon: "error",
        title: "Missing Required Information",
        text: `Please complete the following fields: ${missingFieldLabels}.`,
      });
      return;
    }
    const formattedExamName = toTitleCase(examName);
    const formattedTerm = toTitleCase(term);

    setLoading(true);

    try {
      const formData = {
        subject: selectedSubject,
        teacher: selectedTeacher,
        exam_name: formattedExamName,
        exam_date: examDate,
        class_name: selectedClass.label,
        division: selectedDivision.label,
        start_time: startTime,
        end_time: endTime,
        total_marks: totalMark,
        term: formattedTerm,
        instructions: instruction,
        admin: admin_id,
      };

      const response = await axios.post(
        `${APIURL}/api/questionpaper`,
        formData
      );

      navigate("/aarnanavbar");

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Data saved successfully!",
      });

      setExamName("");
      setExamDate("");
      setSelectedClass("");
      setSelectedDivision("");
      setStartTime("");
      setEndTime("");
      setTotalMark("");
      setTerm("");
      setInstruction("");
      setSelectedSubject(null);
      setSelectedTeacher(null);

      setLoading(false);
    } catch (error) {
      console.error(
        "Failed to submit form:",
        error.response?.data?.message || error.message
      );
      const errorMessage =
        error.response?.data?.error || "Failed to save data.";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      });
      setLoading(false);
    }
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      width: "100%",
      minHeight: "40px",
      height: "50px",
      border: "1px solid #526D82",
      borderRadius: "8px",
      boxShadow: state.isFocused ? "0 0 0 1px #526D82" : "none",
      "&:hover": {
        borderColor: "#526D82",
      },
      "&:focus": {
        borderColor: "#526D82",
        outline: "none",
      },
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
      paddingTop: "0px",
    }),
    indicatorSeparator: (base) => ({
      display: "none",
    }),
    indicatorsContainer: (base) => ({
      ...base,
      alignItems: "center",
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
      position: "absolute",
      width: "89%",
      maxHeight: "150px",
      overflowY: "auto",
    }),
    menuList: (base) => ({
      ...base,
      maxHeight: "150px",
      overflowY: "auto",
      paddingRight: "10px",
    }),
  };

  const handleTotalMarkChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0 && value <= 200) {
      setTotalMark(value.toString());
    } else if (value > 200) {
      setTotalMark("200"); // Set the total mark to the maximum if the value exceeds 200
      Swal.fire({
        icon: "warning",
        title: "Maximum Limit Exceeded",
        text: "The total mark cannot exceed 200.",
      });
    } else {
      // If the value is zero, negative, or not a number, we reset it or keep it empty
      setTotalMark("");
    }
  };

  return (
    <div>
      <Container className="qpaper_assign_container">
        <form className="qpaper_form" onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <h1 className="qpaper_title">Faculty Assigning</h1>
          </div>
          <div style={{ border: "0.5px solid #526D82" }}></div>
          <div className="qpaper_form_scrollable">
            <Row style={{ paddingTop: "20px" }}>
              <Col md={6}>
                <div className="qpaper_group">
                  <label htmlFor="exam_name">
                    Exam Name<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="exam_name"
                    value={examName}
                    onChange={(e) => setExamName(e.target.value)}
                    style={{ textTransform: "capitalize" }}
                    maxLength="100"
                  />
                </div>
                <div className="qpaper_group">
                  <label htmlFor="exam_date">
                    Exam Date<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="date"
                    id="exam_date"
                    value={examDate}
                    min={today}
                    onChange={(e) => setExamDate(e.target.value)}
                    style={{ textTransform: "capitalize" }}
                  />
                </div>
                <div className="qpaper_group">
                  <label htmlFor="class">
                    Class<span style={{ color: "red" }}>*</span>
                  </label>
                  <Select
                    options={classOptions}
                    styles={customStyles}
                    value={classOptions.find(
                      (option) => option.value === selectedClass?.value
                    )}
                    onChange={handleClassChange}
                    placeholder="Select a class"
                    isClearable={true}
                  />
                </div>

                <div className="qpaper_group">
                  <label htmlFor="division">Division</label>
                  <Select
                    options={divisionOptions}
                    styles={customStyles}
                    value={divisionOptions.find(
                      (option) => option.value === selectedDivision?.value
                    )}
                    onChange={handleDivisionChange}
                    placeholder="Select class before selecting division"
                    isClearable={true}
                    isDisabled={!selectedClass}
                  />
                </div>

                <div className="qpaper_group">
                  <label htmlFor="subject">
                    Subject<span style={{ color: "red" }}>*</span>
                  </label>
                  <Select
                    options={subjects}
                    styles={customStyles}
                    value={subjects?.find(
                      (option) => option.value === selectedSubject
                    )}
                    onChange={(option) =>
                      setSelectedSubject(option ? option.value : null)
                    }
                    placeholder="Select Class and Division before selecting subject"
                    isClearable={true}
                  />
                </div>
              </Col>

              <Col md={6}>
                <div className="qpaper_group">
                  <label htmlFor="s_time">
                    Start Time<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="time"
                    id="s_time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>

                <div className="qpaper_group">
                  <label htmlFor="e_time">
                    End Time<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="time"
                    id="e_time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
                {/* <div className="qpaper_group">
                  <label htmlFor="term">
                    Term<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="term"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    style={{ textTransform: "capitalize" }}
                  />
                </div> */}
                <div className="qpaper_group">
                  <label htmlFor="term">
                    Term<span style={{ color: "red" }}>*</span>
                  </label>
                  <Select
                    options={termOptions}
                    styles={customStyles}
                    value={termOptions.find((option) => option.value === term)}
                    onChange={handleTermChange}
                    placeholder="Select Term"
                    isClearable={true}
                  />
                </div>
                <div className="qpaper_group">
                  <label htmlFor="t_mark">
                    Total Mark<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="number"
                    id="t_mark"
                    value={totalMark}
                    onChange={handleTotalMarkChange}
                    style={{ textTransform: "capitalize" }}
                    maxLength="10"
                  />
                </div>
                <div className="qpaper_group">
                  <label htmlFor="assign_faculty">
                    Assign Faculty<span style={{ color: "red" }}>*</span>
                  </label>
                  <Select
                    options={teachers}
                    styles={customStyles}
                    value={teachers?.find(
                      (option) => option.value === selectedTeacher
                    )}
                    onChange={(option) =>
                      setSelectedTeacher(option ? option.value : null)
                    }
                    placeholder="Select a teacher"
                    isClearable={true}
                  />
                </div>

                <div className="submit_qpaper">
                  <button type="submit" className="qpaper_button">
                    Submit
                  </button>
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
