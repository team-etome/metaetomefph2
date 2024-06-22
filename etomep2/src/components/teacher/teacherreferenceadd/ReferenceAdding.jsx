import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { IoIosArrowDown, IoIosArrowUp, IoIosAdd } from 'react-icons/io';
import { Link, useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import '../teacherreferenceadd/referenceadding.css'

function ReferenceAdding() {
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
    <div className='teacher_reference_adding'>
        <Container className='teacher_reference_form'>
        <div className='teacher_ref_add_header'>
          <Link to="/teacherrefrencelist">
            <IoChevronBackSharp className="teacher_refadd_back" />
          </Link>
          <h1 className="teacher_refadd_title">Add Reference</h1>
        </div>
        <hr style={{border:' 1px solid #526D82'}}/>
        <div className='teacher_assignment_adding_scroll'>
            <Row>
            <Col md={12}>
                <div className="teacher_assignmentadd_group">
                <label htmlFor="reftitle">
                    Reference Title
                    <span style={{ color: "red" }}>*</span>
                </label>
                <input
                    type="text"
                    id="reftitle"
                    name="reftitle"
                />
                </div>
            </Col>
            </Row>
            <Row>
            <Col md={6}>
                <div className="teacher_assignmentadd_group">
                <label htmlFor="refclass">
                    Class
                    <span style={{ color: "red" }}>*</span>
                </label>
                <input
                    type="text"
                    id="refclass"
                    name="refclass"
                />
                </div>
                <div className="teacher_assignmentadd_group">
                <label htmlFor="refdiv">
                    Division
                    <span style={{ color: "red" }}>*</span>
                </label>
                <input
                    type="text"
                    id="refdiv"
                    name="refdiv"
                />
                </div>
                <div className="teacher_assignmentadd_group">
                <label htmlFor="refsub">
                    Subject
                    <span style={{ color: "red" }}>*</span>
                </label>
                <input
                    type="text"
                    id="refsub"
                    name="refsub"
                />
                </div>
            </Col>
            <Col md={6}>
                <div className="upload_section">
                    <h6>Media Library</h6>
                <div className="upload_buttons">
                </div>
                {/* {showUploadArea && ( */}
                    <div className="drop_area">
                    <p>Drop file any where to upload</p>
                    <p>or</p>
                    <input 
                        type="file" 
                        className="select_file_input" 
                        onChange={handleFileChange} 
                        accept="application/pdf"
                    />
                    {/* <p>maximum Upload file size: 256 Mb.</p> */}
                    {/* <p>File format: PDF</p> */}
                    </div>
                {/* )} */}
                </div>
            </Col>
            <div className="teacher_ref_submit" >
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

export default ReferenceAdding