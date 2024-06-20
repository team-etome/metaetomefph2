import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { IoChevronBackSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import '../teacherassignmentadd/assignmentadding.css';

function AssignmentAdding() {
  const [showUploadArea, setShowUploadArea] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/teachertexteditor');
  }
  return (
    <div className='teacher_assignment_adding'>
      <Container className='teacher_assignment_form'>
        <div className='teacher_assignmentadd_header'>
          <Link to="/teacherassignment">
            <IoChevronBackSharp className="teacher_studentadd_back" />
          </Link>
          <h1 className="teacher_studentadd_title">Assignment</h1>
        </div>
        <hr style={{border:' 1px solid #526D82'}}/>
        <div className='teacher_assignment_adding_scroll'>
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
                />
                </div>
                <div className="teacher_assignmentadd_group">
                <label htmlFor="instruction">
                    Instruction
                    <span style={{ color: "red" }}>*</span>
                </label>
                <input
                    type="text"
                    id="instruction"
                    name="instruction"
                />
                </div>
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
                    type="text"
                    id="duedate"
                    name="duedate"
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
                />
                </div>
            </Col>
            <Col md={6}>
                <div className="upload-section">
                <div className="upload-buttons">
                    <button 
                    className="upload-btn" 
                    onClick={() => setShowUploadArea(!showUploadArea)}
                    >
                    Upload Pdf
                    </button>
                    <button className="create-btn" onClick={handleSubmit}>Create Manually</button>
                </div>
                {showUploadArea && (
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
                )}
                </div>
            </Col>
            <div className="teacher_studentadd_submit" >
                    <button  type="submit">
                        Submit
                    </button>
                    </div>
            </Row>
        </div>

      </Container>
    </div>
  )
}

export default AssignmentAdding;
