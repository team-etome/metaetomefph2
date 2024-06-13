import React, { useState, useEffect } from "react";
import "../admincurriculumadding/curriculumadding.css";
import { Container, Row, Col } from "react-bootstrap";
import { IoChevronBackSharp } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import Select from "react-select";
import { useSelector } from "react-redux";
import axios from "axios";

function CurriculumAdding() {
  const [publisher, setPublisher] = useState(null);
  const [subject, setSubject] = useState(null);
  const [faculty, setFaculty] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const [publisherOptions, setPublisherOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);

  const [selectedPublisher, setSelectedPublisher] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const [curriculumEntries, setCurriculumEntries] = useState([]);

  console.log(curriculumEntries ,'helooooo')


  const teacherinfo = useSelector((state) => state.adminteacherinfo);
  const classinfo   = useSelector((state) => state.adminclassinfo);
  const admininfo = useSelector((state) => state.admininfo);

  const admin_id = admininfo ? admininfo.admininfo?.admin_id : null;
  const class_name      = classinfo?.adminclassinfo?.className
  const division        = classinfo?.adminclassinfo?.division
  const stream          = classinfo?.adminclassinfo?.stream
  const class_teacher   = classinfo?.adminclassinfo?.teacher.value
  const medium          = classinfo?.adminclassinfo?.medium.value

  console.log(classinfo,"classinfo")
  





  const APIURL = useSelector((state) => state.APIURL.url);


  console.log(selectedPublisher , selectedSubject ,"ssssssss")


  const facultyOptions = teacherinfo.adminteacherinfo?.map((teacher) => ({
    value: `${teacher.first_name} ${teacher.last_name}`,
    label: `${teacher.first_name} ${teacher.last_name}`,
  }));



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${APIURL}/api/curriculam`);
        if (response.status === 200) {
          console.log(response.data, "dataaaaaa");

          const publishers = response.data.publisher_names.map((publisher) => ({
            value: publisher.publisher, 
            label: publisher.publisher,
          }));

          const subjects = response.data.subject_names.map((subject) => ({
            value: subject.subject_name, 
            label: subject.subject_name,
          }));

          setPublisherOptions(publishers);
          setSubjectOptions(subjects);
        }
      } catch (error) {
        console.error("Failed to fetch curriculum data:", error);
      }
    };

    fetchData();
  }, []);


  const handleSubmit = (e) => {

    console.log("enteredddddd")

    e.preventDefault();

    const payload = {
      // publisher: selectedPublisher ? selectedPublisher.value : '',
      // subject: selectedSubject ? selectedSubject.value : '',
      // faculty: faculty ? faculty.value : '',
     
      class_name      : class_name,
      division        : division,
      stream          : stream,
      class_teacher   : class_teacher,
      admin           : admin_id,
      medium          : medium,
      entries         : curriculumEntries,


    };

    axios.post(`${APIURL}/api/addClassname`, payload)
      .then(response => {
        console.log("Data submitted successfully:", response.data);
        // Handle further actions after successful submission like redirecting
      })
      .catch(error => {
        console.error("Failed to submit data:", error);
      });
  };


  const handleAddNew = () => {
    let missingFields = [];
    if (!selectedPublisher) missingFields.push("selectedPublisher");
    if (!selectedSubject) missingFields.push("selectedSubject");
    if (!faculty) missingFields.push("Faculty");

    if (missingFields.length > 0) {
        // Create a string that lists missing fields, separated by commas and replace the last comma with 'and'
        const missingFieldsString = missingFields.join(', ').replace(/, ([^,]*)$/, ' and $1');
        alert(`Please make sure all fields are selected before adding. Missing: ${missingFieldsString}.`);
    } else {
        setCurriculumEntries(prevEntries => [
            ...prevEntries,
            { selectedPublisher, selectedSubject, faculty }
        ]);
        // Clear the current selections after adding
        setSelectedPublisher(null);
        setSelectedSubject(null); 
        setFaculty(null);
    }
};

  const customStyles = {
    control: (base, state) => ({
      ...base,
      width: "100%",
      minHeight: "50px",
      border: "1px solid #526D82",
      borderRadius: "8px",
      boxShadow: state.isFocused ? "0 0 0 1px #526D82" : "none",
      "&:hover": {
        borderColor: "none", // Darker border on hover
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
    }),
    indicatorsContainer: (base) => ({
      ...base,
      alignItems: "center",
    }),
  };

  return (
    <div className="curriculum_container">
      <Container className="curriculum_add">
        <form
          className="curriculum_form"
          style={{
            backgroundColor: "#ffff",
            borderRadius: "16px",
            height: "90%",
          }}
        >
          <Row>
            <Col>
              <div className="curriculum_header">
                <Link to="/aarnanavbar">
                  <IoChevronBackSharp className="curriculum_back" />
                </Link>
                <h1 className="curriculum_title">Add Curriculum</h1>
              </div>
              <div style={{ border: "0.5px solid #526D82" }}></div>
            </Col>
          </Row>
          <Row>
            <div className="edit_delete">
              <div className="curriculum_edit">
                <button>Edit</button>
              </div>
              <div className="curriculum_delete">
                <button>Delete</button>
              </div>
            </div>
            <div className="delete_edit_mobile">
              <div className="edit_mobile">
                <button>
                  <FiEdit />
                </button>
              </div>
              <div className="delete_mobile">
                <button>
                  <RiDeleteBin6Line />
                </button>
              </div>
            </div>
          </Row>
          <Row>
            <Col md={4}>
              <div className="curriculum_inputfield">
                <label htmlFor="publisher_name">
                  Publisher Name<span style={{ color: "red" }}>*</span>
                </label>

                <Select
                  options={publisherOptions}
                  value={selectedPublisher}
                  onChange={setSelectedPublisher}
                  styles={customStyles}
                  placeholder="Select a Publisher"
                />
              </div>
            </Col>
            <Col md={4}>
              <div className="curriculum_inputfield">
                <label htmlFor="subject">
                  Subject<span style={{ color: "red" }}>*</span>
                </label>

                <Select
                  options={subjectOptions}
                  value={selectedSubject}
                  onChange={setSelectedSubject}
                  styles={customStyles}
                  placeholder="Select a Subject"
                />
              </div>
            </Col>
            <Col md={4}>
              <div className="curriculum_inputfield">
                <label htmlFor="faculty_name">
                  Faculty Name<span style={{ color: "red" }}>*</span>
                </label>
                <Select
                  options={facultyOptions}
                  styles={customStyles}
                  placeholder="Select a Teacher"
                  value={faculty}
                  onChange={setFaculty}
                />
              </div>
              <div
                className="curriculum_inputfield curriculum_addnew_button"
                style={{ textAlign: "right" }}
              >
                <button
                  onClick={handleAddNew}
                  type="button"
                  className="curriculum_addnew"
                >
                  <IoIosAdd style={{ height: "20px", width: "20px" }} />
                  Add New
                </button>
              </div>
            </Col>
          </Row>

          <div>
            <div className="curriculum_listing">
              {curriculumEntries.map((entry, index) => (
                <Row
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                  onClick={() => setSelectedRow(1)}
                  className={selectedRow === 1 ? "selected" : ""}
                >
                  <Col md={3} className="curriculum_list">
                    {entry.selectedPublisher.label}
                  </Col>
                  <Col md={3} className="curriculum_list">
                    {entry.selectedSubject.label}
                  </Col>
                  <Col md={3} className="curriculum_list">
                    {entry.faculty.label}
                  </Col>
                </Row>
              ))}
            </div>

            <div
              className="curriculum_submit_button"
              style={{ textAlign: "right", marginRight: "10px" }}
            >
              <button
                type="submit"
                value="submit"
                className="curriculum_submit"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default CurriculumAdding;
