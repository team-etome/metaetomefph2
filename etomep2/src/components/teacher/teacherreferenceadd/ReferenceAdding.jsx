import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import "../teacherreferenceadd/referenceadding.css";
import { FaRedo } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

function ReferenceAdding() {
  const [showUploadArea, setShowUploadArea] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedUrl, setSelectedUrl] = useState("");
  const [selectedTab, setSelectedTab] = useState("pdf");
  const [referenceTitle, setReferenceTitle] = useState("");

  // const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleUrlChange = (event) => {
    setSelectedUrl(event.target.value);
  };
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setSelectedFile(null);
    setSelectedUrl("");
  };
  const clearPdfFile = () => {
    setSelectedFile(null);
  };
  const clearUrl = () => {
    setSelectedUrl("");
  };

  const APIURL = useSelector((state) => state.APIURL.url);
  const teachersubjectinfo = useSelector((state) => state.teachersubjectinfo);
  const teacherinfo = useSelector((state) => state.teacherinfo);

  const teacher_id = teacherinfo.teacherinfo?.teacher_id;

  const class_name = teachersubjectinfo.teachersubjectinfo?.class;
  const division = teachersubjectinfo.teachersubjectinfo?.division;
  const subject = teachersubjectinfo.teachersubjectinfo?.subject;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("teacher", teacher_id);
    formData.append("class_name", class_name);
    formData.append("division", division);
    formData.append("subject", subject);
    formData.append("title", referenceTitle);

    if (selectedTab === "pdf" && selectedFile) {
      formData.append("textbook_pdf", selectedFile);
    } else if (selectedTab === "url" && selectedUrl) {
      formData.append("url", selectedUrl);
    }

    try {
      const response = await axios.post(`${APIURL}/api/reference`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Swal.fire({
        icon: "success",
        title: "Reference added successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      // navigate('/teacherrefrencelist'); // Uncomment to navigate after successful submission
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an error adding the reference",
      });
    }
  };


  return (
    <div className="teacher_reference_adding">
      <Container className="teacher_reference_form">
        <div className="teacher_ref_add_header">
          <Link to="/teacherrefrencelist">
            <IoChevronBackSharp className="teacher_refadd_back" />
          </Link>
          <h1 className="teacher_refadd_title">Add Reference</h1>
        </div>
        <hr style={{ border: "1px solid #526D82" }} />
        <div className="teacher_assignment_adding_scroll">
          <Row>
            <Col md={12}>
              <div className="teacher_assignmentadd_group">
                <label htmlFor="reftitle">
                  Reference Title
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input 
                onChange={(e)=>setReferenceTitle(e.target.value)}
                type="text" id="reftitle" name="reftitle" />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="upload_section">
                <h6>Media Library</h6>
                <div className="upload_buttons">
                  <button
                    onClick={() => handleTabChange("pdf")}
                    className={`ref_pdf_btn ${
                      selectedTab === "pdf" ? "active" : ""
                    }`}
                  >
                    Upload Pdf
                  </button>
                  <button
                    onClick={() => handleTabChange("url")}
                    className={`ref_url_btn ${
                      selectedTab === "url" ? "active" : ""
                    }`}
                  >
                    Upload URL
                  </button>
                </div>
                {selectedTab === "pdf" && (
                  <div className="upload_section_content">
                    <div className="refrence_pdf_upload_container">
                      <div className="refrence_pdf_placeholder">
                        {selectedFile ? (
                          <>
                            <embed
                              src={URL.createObjectURL(selectedFile)}
                              type="application/pdf"
                              width="100%"
                              height="200px"
                            />
                            <button
                              onClick={clearPdfFile}
                              style={{
                                border: "none",
                                background: "none",
                                cursor: "pointer",
                              }}
                            >
                              <FaRedo
                                style={{
                                  color: "blue",
                                  fontSize: "20px",
                                }}
                                title="Change PDF"
                              />
                            </button>
                          </>
                        ) : (
                          <>
                            <label
                              htmlFor="pdf-upload"
                              className="refrence_pdf_upload_label"
                            >
                              Upload PDF
                            </label>
                            <input
                              id="pdf-upload"
                              type="file"
                              accept=".pdf"
                              className="refrence_pdf_upload_input"
                              onChange={handleFileChange}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {selectedTab === "url" && (
                  <div className="upload_section_content">
                    <div className="refrence_url_upload_container">
                      <div className="refrence_url_placeholder">
                        <input
                          type="text"
                          value={selectedUrl}
                          placeholder="Paste the URL here.."
                          onChange={handleUrlChange}
                          className="url_upload_input"
                        />
                        {selectedUrl && (
                          <button
                            onClick={clearUrl}
                            style={{
                              border: "none",
                              background: "none",
                              cursor: "pointer",
                            }}
                          >
                            <FaRedo
                              style={{
                                color: "blue",
                                fontSize: "20px",
                              }}
                              title="Clear URL"
                            />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Col>
            <div className="teacher_ref_submit">
              <button onClick={handleSubmit} type="submit">Submit</button>
            </div>
          </Row>
        </div>
      </Container>
    </div>
  );
}
export default ReferenceAdding;
