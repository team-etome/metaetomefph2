import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { IoChevronBackSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import "../teacherassignmentadd/assignmentadding.css";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";


function AssignmentAdding() {
  const [selectedFile, setSelectedFile] = useState(null);

  const [title, setTitle] = useState("");
  const [duedate, setDueDate] = useState("");
  const [mark, setMark] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  console.log(title , duedate ,mark ,"stateeeeeez")


  const APIURL = useSelector((state) => state.APIURL.url);
  const teachersubjectinfo = useSelector((state) => state.teachersubjectinfo);
  const teacherinfo = useSelector((state) => state.teacherinfo);

  const teacher_id = teacherinfo.teacherinfo?.teacher_id;

  const class_name = teachersubjectinfo.teachersubjectinfo?.class;
  const division = teachersubjectinfo.teachersubjectinfo?.division;
  const subject = teachersubjectinfo.teachersubjectinfo?.subject;

  console.log(teachersubjectinfo, "teacher subject info");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const navigate = useNavigate();

  const handlenavigate = () => {
    navigate("/teacherassignmenteditor", {
      state: {
        title,
        duedate,
        mark,
        teacher_id,
        class_name,
        division,
        subject,
      },
    });
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true); // Set loading state to true

      const formData = new FormData();
      formData.append("title", title);
      formData.append("due_date", duedate);
      formData.append("mark", mark);
      formData.append("pdf", selectedFile);
      formData.append("teacher", teacher_id);
      formData.append("class_name", class_name);
      formData.append("division", division);
      formData.append("subject", subject);

      // Show loading spinner using Swal
      Swal.fire({
        title: "Submitting Form",
        text: "Please wait...",
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await axios.post(`${APIURL}/api/assignment`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.close(); // Close loading spinner
      navigate('/teacherassignment')
      // Show success message using Swal
      Swal.fire({
        icon: "success",
        title: "Form Submitted Successfully!",
        text: "Your assignment has been submitted.",
      });

      console.log("Form data submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting form data:", error);
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };
  const handleBackClick =() =>{
    navigate('/teacherassignment')
  }
  return (
    <div className="teacher_assignment_adding">
      <Container className="teacher_assignment_form">
        <div className="teacher_assignmentadd_header">
          {/* <Link to="/teacherassignment">
            <IoChevronBackSharp className="teacher_assignmentadd_back" />
          </Link> */}
            <IoChevronBackSharp onClick={handleBackClick} className="teacher_assignmentadd_back" />
          <h1 className="teacher_assignmentadd_title">Assignment</h1>
        </div>
        <hr style={{ border: "1px solid #526D82"}} />
        <div className="teacher_assignment_adding_scroll">
          <Row>
            <Col md={12}>
              <div className="teacher_assignmentadd_group">
                <label htmlFor="title">
                  Title
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              {/* <div className="teacher_assignmentadd_group">
                <label htmlFor="instruction">
                    Instruction
                    <span style={{ color: "red" }}>*</span>
                </label>
                <input
                    type="text"
                    id="instruction"
                    name="instruction"
                />
                </div> */}
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div className="teacher_assignmentadd_group">
                <label htmlFor="duedate">
                  Due Date
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="date"
                  id="duedate"
                  name="duedate"
                  value={duedate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
              <div className="teacher_assignmentadd_group">
                <label htmlFor="mark">
                  Mark
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="mark"
                  name="mark"
                  value={mark}
                  onChange={(e) => setMark(e.target.value)}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="upload-section">
                <div className="upload-buttons">
                  <button
                    style={{
                      backgroundColor: "#526D82",
                      color: "#fff",
                    }}
                    className="upload-btn"
                  >
                    Upload Pdf
                  </button>

                  <button className="create-btn" onClick={handlenavigate}>
                    Create Manually
                  </button>
                </div>

                <div className="drop-area">
                  <p>Drop file any where to upload</p>
                  <p>or</p>
                  <input
                    type="file"
                    className="select-file-input"
                    onChange={handleFileChange}
                    accept="application/pdf"
                  />
                  {/* <p>maximum Upload file size: 256 Mb.</p> */}
                  {/* <p>File format: PDF</p> */}
                </div>
              </div>
            </Col>
            <div className="teacher_studentadd_submit">
              <button onClick={handleSubmit} type="submit">
                Submit
              </button>
            </div>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default AssignmentAdding;
