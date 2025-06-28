import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../adminclassadding/classadding.css";
import { IoChevronBackSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { adminclassinfo } from "../../../Redux/Actions/AdminclassAddingInfo";
import Swal from "sweetalert2";
import { adminallclassinfo } from "../../../Redux/Actions/AdminAllClassInfoAction";

function ClassAdding() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const classData = location.state?.classData || {}; 
  console.log(classData,"class data")
  
  // Received data
  // console.log(classData,"classadding")
  const [className, setClassName] = useState(classData.class_name || "");
  const [teacher, setTeacher] = useState(classData.class_teacher || "");
  const [selectedTeacherId, setSelectedTeacherId] = useState(classData.class_teacher || "");
  const [division, setDivision] = useState(classData.division || "");
  const [medium, setMedium] = useState(classData.medium || "");
  const [category, setCategory] = useState(classData.category || "");
  const [subjectCount, setSubjectCount] = useState(classData.subject_count || "");
  const [curriculum, setCurriculum] = useState(classData.curriculum || []);
  const [classid, setClassId] = useState(classData.class || "");


  console.log(selectedTeacherId, "selected")



  console.log(teacher, "teacher")

  // const [medium, setMedium] = useState("");
  // const [teacher, setTeacher] = useState("");
  // const [className, setClassName] = useState("");
  const [stream, setStream] = useState("");
  // const [division, setDivision] = useState("");
  const [loading, setLoading] = useState(false);

  const [mediumOption, setMediumOption] = useState([]);
  const [streamDisabled, setStreamDisabled] = useState(true);

  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // console.log(medium);

  const admininfo = useSelector((state) => state.admininfo);
  console.log(admininfo, "admininfo")

  const teacherinfo = useSelector((state) => state.adminteacherinfo);
  console.log(teacherinfo, "teacherinfo")

  // console.log(teacherinfo, "teacher info");

  const m = admininfo ? admininfo.admininfo?.medium : null;
  // console.log(m, "m")

  const mediumOptions = m ? [{ value: m, label: m }] : [];

  const toTitleCase = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    if (classData) {
      setClassName(classData.class_name || "");
      // setTeacher(classData.class_teacher || "");
      setDivision(classData.division || "");
      setMedium(mediumOption.find((option) => option.value === classData.medium) || "");
      setCategory(classData.category || "");
      setSubjectCount(classData.subject_count || "");
      setCurriculum(classData.curriculum || []);

    }
  }, [mediumOption]);

  useEffect(() => {
    if (m) {
      try {
        // If m is a JSON string, parse it
        const parsedMedium = typeof m === "string" ? JSON.parse(m) : m;

        // Ensure parsedMedium is an array
        if (Array.isArray(parsedMedium)) {
          const options = parsedMedium.map((item) => ({
            value: item.trim(),
            label: item.trim(),
          }));
          setMediumOption(options);
        } else {
          console.error("Medium data is not an array:", parsedMedium);
        }
      } catch (e) {
        console.error("Error parsing medium:", e);
      }
    }
  }, [m]);
  const handleMediumChange = (selectedOption) => {
    setMedium(selectedOption); // Set the selected object
  };

  const handleClassNameChange = (e) => {
    const value = e.target.value;

    // Allow empty input and ensure only numbers are entered
    if (value === "" || /^[1-9]$|^1[0-2]$/.test(value)) {
      setClassName(value);

      // If the value is less than 11, disable the stream field
      if (parseInt(value, 10) < 11 || value === "") {
        setStream("");
        setStreamDisabled(true); // Disable stream if class is less than 11
      } else {
        setStreamDisabled(false); // Enable stream if class is 11 or 12
      }
    } else {
      // If invalid input (negative or 0), reset the value
      setClassName("");
    }
  };
  useEffect(() => {
    if (classData.class_teacher && teacherinfo.adminteacherinfo?.length > 0) {
      const selectedTeacher = teacherinfo.adminteacherinfo.find(
        (teacher) => teacher.id === classData.class_teacherid
      );

      if (selectedTeacher) {
        setSelectedTeacherId(selectedTeacher.id);
        setTeacher(`${selectedTeacher.first_name} ${selectedTeacher.last_name}`);
      }
    }
  }, [classData.class_teacher, teacherinfo.adminteacherinfo]);



  const teacherOptions = teacherinfo.adminteacherinfo?.map((teacher) => ({
    id: teacher.id,
    value: `${teacher.first_name} ${teacher.last_name}`, // Assuming you want to use names as value; could be `teacher.id` or similar if needed
    label: `${teacher.first_name} ${teacher.last_name}`, // Display format in the dropdown
  }));

  console.log(teacherOptions, "teacher option")

  // console.log(teacherOptions, "kjfhbidwghius");

  // const handleSubmit = (e) => {

  //   console.log('enterrrrrr')
  //   e.preventDefault();

  //   const classData = {
  //     medium,
  //     teacher,
  //     className,
  //     stream,
  //     division
  //   };

  //   dispatch(adminclassinfo(classData));
  //   navigate('/curriculumadding')

  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = [
      { value: className, label: "Class Name" },
      { value: teacher, label: " Class Teacher" },
      { value: division, label: "Division" },
      // { value: medium, label: "Medium" },
    ];
    if (className >= 11) {
      requiredFields.push({ value: stream, label: "Stream" });
    }
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
    const formattedStream = toTitleCase(stream);
    const formattedDivision = toTitleCase(division);

    const classData = {

      medium:medium.value,
      teacher: selectedTeacherId,
      className,
      class_id: classid,
      // stream,
      // division,
      stream: formattedStream,
      division: formattedDivision,
      category,
      subjectCount,
      curriculum
    };

    dispatch(adminclassinfo(classData));
    sessionStorage.setItem("activeTab", "Class");
    // Navigate to CurriculumAdding with class data
    navigate("/curriculumadding", { state: { classData } });
  };
  const customStyles = {
    control: (base, state) => ({
      ...base,
      width: "89%",
      minHeight: "40px",
      height: "50px",
      border: "1px solid #526D82",
      borderRadius: "8px",
      marginLeft: "5px",
      boxShadow: state.isFocused ? "0 0 0 1px #526D82" : "none",
      "&:hover": {
        borderColor: "none",
      },
      "&:focus": {
        borderColor: "#526D82", // Ensures the border color when the element is focused
        outline: "none", // Removes the default outline when focused
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
      // paddingTop:'0px'
    }),
    indicatorSeparator: (base) => ({
      display: "none",
    }),
    indicatorsContainer: (base) => ({
      ...base,
      alignItems: "center",
    }),
    // menu: (base) => ({
    //   ...base,
    //   zIndex: 9999,
    //   position: "absolute",
    //   width:'89%',
    //   maxHeight: "90px",
    //   overflow: "auto",

    // }),
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
  const handleDivisionChange = (e) => {
    const value = e.target.value.toUpperCase(); // Convert input to uppercase
    const regex = /^[A-Z]*$/; // Regular expression to allow only uppercase letters

    if (regex.test(value)) {
      setDivision(value); // Update the division state if the input is valid
    }
  };
  // useEffect(() => {
  //   dispatch(adminallclassinfo()); // Ensure this action fetches the required medium data
  // }, [dispatch]);




  return (
    <div>
      <Container className="class_add">
        <form className="class_form">
          <div className="header-container">
            {/* <Link to="/institutionadding"> */}
            <Link
              to="/institutionadding"
              onClick={() => sessionStorage.setItem("activeTab", "Class")}
            >
              {/* <IoChevronBackSharp
                  className="class_add_back"
                  /> */}
            </Link>
            <h1 className="class_title">Class Adding</h1>
          </div>
          <div style={{ border: "0.5px solid #526D82" }}></div>
          <div className="class_add_scroll">
            <Row>
              {/* <div className="class_scroll"> */}
              <Col md={6}>
                <div className="form_group">
                  <input
                    type="number"
                    id="class_number"
                    name="class_number"
                    placeholder=""
                    value={className}
                    onChange={handleClassNameChange}
                    style={{ textTransform: "capitalize" }}
                    onKeyDown={(e) => {
                      // Prevent typing 'e', '-', or '+' in the number input
                      if (["e", "E", "-", "+"].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                  <label htmlFor="class_number">
                    Class Name<span style={{ color: "red" }}>*</span>
                  </label>
                </div>

                <div className="form_group">
                  <input
                    type="text"
                    id="class_category"
                    name="class_category"
                    placeholder=""
                    value={stream}
                    onChange={(e) => setStream(e.target.value)}
                    style={{
                      textTransform: "capitalize",
                      backgroundColor: streamDisabled ? "#e0e0e0" : "white", // Gray background when disabled
                    }}
                    readOnly={parseInt(className, 10) < 11}
                  />
                  <label htmlFor="class_category">Stream</label>
                </div>

                <div className="class_select">

                  <Select
                    options={teacherOptions}
                    styles={customStyles}
                    value={teacherOptions.find((option) => option.id === selectedTeacherId) || ""}
                    onChange={(selectedOption) => {
                      setTeacher(selectedOption.label);  // Store teacher name
                      setSelectedTeacherId(selectedOption.id);  // Store teacher ID
                    }}
                    placeholder=""
                  />

                  <label htmlFor="class_teacher">
                    Class Teacher<span style={{ color: "red" }}>*</span>
                  </label>
                </div>
              </Col>
              <Col md={6}>
                <div className="form_group division">
                  <input
                    type="text"
                    id="class_division"
                    name="class_division"
                    placeholder=""
                    value={division}
                    onChange={handleDivisionChange}
                    style={{ textTransform: "capitalize" }}
                    maxLength={2}
                  />
                  <label htmlFor="class_division">
                    Division<span style={{ color: "red" }}>*</span>
                  </label>
                </div>

                <div className="class_select">
                  <Select
                    options={mediumOption}
                    styles={customStyles}
                    placeholder=""
                    value={medium}
                    onChange={handleMediumChange}
                    style={{ textTransform: "capitalize" }}
                    maxLength={50}
                  />
                  <label htmlFor="class_medium">Medium</label>
                </div>

                <div className=" class_next_button" style={{}}>
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    value="submit"
                    className="class_next"
                  >
                    Next
                  </button>
                </div>
              </Col>
              {/* </div> */}
            </Row>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default ClassAdding;
