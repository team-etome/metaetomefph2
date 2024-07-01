import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import "../teacherreferenceadd/referenceadding.css";
import { FaRedo } from "react-icons/fa";
function ReferenceAdding() {
  const [showUploadArea, setShowUploadArea] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedUrl, setSelectedUrl] = useState("");
  const [selectedTab, setSelectedTab] = useState("pdf");
  const navigate = useNavigate();
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
  // const handleSubmit = () => {
  //   navigate('/teachertexteditor');
  // }
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
                <input type="text" id="reftitle" name="reftitle" />
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
              <button type="submit">Submit</button>
            </div>
          </Row>
        </div>
      </Container>
    </div>
  );
}
export default ReferenceAdding;
