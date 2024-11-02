import React, { useState, useEffect } from "react";
import "../admincurriculumadding/curriculumadding.css";
import { Container, Row, Col } from "react-bootstrap";
import { IoChevronBackSharp } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import Select from "react-select";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

function CurriculumAdding() {
  // const [publisher, setPublisher] = useState(null);
  // const [subject, setSubject] = useState(null);
  const [faculty, setFaculty] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const [publisherOptions, setPublisherOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);

  const [selectedPublisher, setSelectedPublisher] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const [editMode, setEditMode] = useState(false); 
  const [editIndex, setEditIndex] = useState(null); 

  const [curriculumEntries, setCurriculumEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  console.log(faculty, "helooooo");

  const teacherinfo = useSelector((state) => state.adminteacherinfo);
  const classinfo = useSelector((state) => state.adminclassinfo);
  const admininfo = useSelector((state) => state.admininfo);

  console.log(admininfo, "hiaufghsdiu");

  const admin_id = admininfo ? admininfo.admininfo?.admin_id : null;

  const class_name = classinfo?.adminclassinfo?.className;
  const division = classinfo?.adminclassinfo?.division;
  const stream = classinfo?.adminclassinfo?.stream;
  const class_teacher = classinfo?.adminclassinfo?.teacher.id;
  const medium = classinfo?.adminclassinfo?.medium.value;

  console.log(classinfo, "classinfo");

  useEffect(() => {
    if (admininfo?.admininfo?.publisher_name) {
      const publishers = admininfo.admininfo.publisher_name.map(
        (publisher) => ({
          value: publisher,
          label: publisher,
        })
      );
      setPublisherOptions(publishers);
    }
  }, [admininfo]);

  const APIURL = useSelector((state) => state.APIURL.url);

  console.log(selectedPublisher, selectedSubject, "ssssssss");

  const facultyOptions = teacherinfo.adminteacherinfo?.map((teacher) => ({
    id   : teacher.id,
    value: `${teacher.first_name} ${teacher.last_name}`,
    label: `${teacher.first_name} ${teacher.last_name}`,
  }));
  

  console.log(facultyOptions,"faculty option")
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(`${APIURL}/api/curriculam`);
        if (response.status === 200) {
          // Match the educational_body from admininfo with the subject educational_body
          const filteredSubjects = response.data.subject_names.filter(
            (subject) =>
              subject.educational_body ===
              admininfo?.admininfo?.educational_body
          );

          const subjectOptions = filteredSubjects.map((subject) => ({
            value: subject.subject_name,
            label: subject.subject_name,
          }));
          setSubjectOptions(subjectOptions);
        }
      } catch (error) {
        console.error("Failed to fetch curriculum data:", error);
      }
    };

    fetchSubjects();
  }, [APIURL, admininfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const payload = {
      class_name: class_name,
      division: division,
      stream: stream,
      class_teacher: class_teacher,
      admin: admin_id,
      medium: medium,
      entries: curriculumEntries,
    };
  
    axios
      .post(`${APIURL}/api/addClassname`, payload)
      .then((response) => {
        console.log("Data submitted successfully:", response.data);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Class and Curriculum added successfully!",
        });
        navigate("/institutionadding");
      })
      .catch((error) => {
        if (error.response) {
          // Handle specific errors from the backend
          const { status, data } = error.response;
          
          let errorMessage = "An error occurred. Please try again.";
          
          switch (status) {
            case 400:
              errorMessage = data.error || "Invalid request data. Please check your entries.";
              break;
            case 401:
              errorMessage = data.error || "Admin not found.";
              break;
            case 402:
              errorMessage = data.error || "Faculty not found.";
              break;
            case 403:
              errorMessage = data.error || "Subject not found.";
              break;
            case 404:
              errorMessage = data.error || "Something went wrong on the server.";
              break;
            case 405:
              errorMessage = data.error || "Teacher is already assigned as a class teacher.";
              break;
            default:
              errorMessage = data.error || "Unexpected error occurred.";
              break;
          }
  
          Swal.fire({
            icon: "error",
            title: "Error",
            text: errorMessage,
          });
        } else {
          // If there's no response (network error, etc.)
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to connect to the server. Please check your internet connection.",
          });
        }
        console.error("Failed to submit data:", error);
      });
  };

  //   const handleAddNew = () => {
  //     let missingFields = [];
  //     if (!selectedPublisher) missingFields.push("selectedPublisher");
  //     if (!selectedSubject) missingFields.push("selectedSubject");
  //     if (!faculty) missingFields.push("Faculty");

  //     if (missingFields.length > 0) {
  //         const missingFieldsString = missingFields.join(', ').replace(/, ([^,]*)$/, ' and $1');
  //         alert(`Please make sure all fields are selected before adding. Missing: ${missingFieldsString}.`);
  //     }
  //     else {
  //         setCurriculumEntries(prevEntries => [
  //             ...prevEntries,
  //             { selectedPublisher, selectedSubject, faculty }
  //         ]);

  //         setSelectedPublisher(null);
  //         setSelectedSubject(null);
  //         setFaculty(null);
  //     }
  // };


  const handleAddNew = () => {
    // Check if all required fields are selected
    let missingFields = [];
    if (!selectedPublisher || !selectedSubject || !faculty) {
      alert("Please make sure all fields are selected before adding.");
      return;
    }

    if (missingFields.length > 0) {
      const missingFieldsString = missingFields
        .join(", ")
        .replace(/, ([^,]*)$/, " and $1");
      alert(
        `Please make sure all fields are selected before adding. Missing: ${missingFieldsString}.`
      );

      return;
    }

    // Check if the entry already exists
    const isDuplicate = curriculumEntries.some(
      (entry) =>
        entry.selectedPublisher.value === selectedPublisher.value &&
        entry.selectedSubject.value === selectedSubject.value &&
        entry.faculty.value === faculty.value
    );

     if (isDuplicate && !editMode) {
      Swal.fire({
        icon: "error",
        title: "Duplicate Entry",
        text: "This entry already exists in the list.",
      });
      return;
    }

    
    if (editMode) {
      // Update the existing entry
      const updatedEntries = [...curriculumEntries];
      updatedEntries[editIndex] = {
        selectedPublisher,
        selectedSubject,
        faculty,
      };
      setCurriculumEntries(updatedEntries);
      setEditMode(false); // Exit edit mode
      setEditIndex(null);
    } else {
      // Add a new entry if not in edit mode
      setCurriculumEntries((prevEntries) => [
        ...prevEntries,
        { selectedPublisher, selectedSubject, faculty },
      ]);
    }

    // Clear the current selections after adding
    setSelectedPublisher(null);
    setSelectedSubject(null);
    setFaculty(null);
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
        borderColor: "none",
      },
      "&:focus": {
        borderColor: "#526D82",
        outline: "none",
      },
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
      position: "absolute",
      marginTop: 0,
      width: '89%',
      maxHeight: '150px', 
      overflowY: 'auto', 
    }),
    menuList: (base) => ({
      ...base,
      maxHeight: '150px',
      overflowY: 'auto',
      paddingRight: '10px'
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
    indicatorSeparator: (base) => ({
      display: "none",
    }),
    indicatorsContainer: (base) => ({
      ...base,
      alignItems: "center",
    }),
  };
  const handleBackClick = () => {
    navigate("/classadding");
  };

  const handleEdit = (index) => {
    // Set the form values to the selected entry
    const entry = curriculumEntries[index];
    setSelectedPublisher(entry.selectedPublisher);
    setSelectedSubject(entry.selectedSubject);
    setFaculty(entry.faculty);
    setEditIndex(index);
    setEditMode(true); // Set the index of the entry being edited
    setSelectedRow(null);
  };






 const handleDelete = () => {
    if (selectedRow !== null) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          setCurriculumEntries((prevEntries) =>
            prevEntries.filter((_, i) => i !== selectedRow)
          );
          setSelectedRow(null); // Clear the selected row
          Swal.fire("Deleted!", "Your entry has been deleted.", "success");
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "No Row Selected",
        text: "Please select a row to delete.",
      });
    }
  };

  return (
    <div className="curriculum_container">
      <Container className="curriculum_add">
        <form className="curriculum_form">
          <Row>
            <Col>
              <div className="curriculum_header">
                {/* <Link to="/classadding"> */}
                {/* <IoChevronBackSharp
                  onClick={handleBackClick}
                  className="curriculum_back"
                /> */}
                {/* </Link> */}
                <h1 className="curriculum_title">Add Curriculum</h1>
              </div>
              <div style={{ border: "0.5px solid #526D82" }}></div>
            </Col>
          </Row>

          <div className="curriculum_scroll">
            <Row>
              <div className="edit_delete">
                <FiEdit
                 onClick={() => handleEdit(selectedRow)}
                  className="curriculum_edit"
                />

                <RiDeleteBin6Line
                  onClick={handleDelete}
                  className="curriculum_delete"
                />

                {/* </div> */}
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
                    placeholder=""
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
                    placeholder=""
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
                    placeholder=""
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
                    onClick={() => setSelectedRow(index)} // Set selected row index
                    className={selectedRow === index ? "selected" : "curriculum_row"}
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
                style={{ textAlign: "right", marginRight: "0px" }}
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
          </div>
        </form>
      </Container>
    </div>
  );
}

export default CurriculumAdding;
