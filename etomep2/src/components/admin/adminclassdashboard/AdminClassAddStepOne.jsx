import React from "react";
import { Row, Col } from "react-bootstrap";
import "./adminclassaddstepone.css";

const AdminClassAddStepOne = ({ nextStep, closeModal }) => {
  return (
    <div className="adminclassaddstepone-main">
      {/* Modal Header */}
      <div className="adminclassaddstepone-header">
        <p className="adminclassaddstepone-header-title">Add Class</p>
        <button className="adminclassaddstepone-close-btn" onClick={closeModal}>
          ×
        </button>
      </div>
      {/* Step Indicator */}
      <div className="adminclassaddstepone-step-indicator">
        <div className="adminclassaddstepone-step active">
          <div className="adminclassaddstepone-step-number">1</div>
          <div className="adminclassaddstepone-step-label">Class Details</div>
        </div>
        <div className="adminclassaddstepone-step">
          <div className="adminclassaddstepone-step-number">2</div>
          <div className="adminclassaddstepone-step-label">Add Curriculum</div>
        </div>
      </div>
      {/* Content Area */}
      <div className="adminclassaddstepone-modal-step-content">
        <div style={{ padding: "0" }} >
          <div style={{ display: "grid", gap: "16px"}}>
            {/* First Row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
              {/* Class Name */}
              <div>
                <label
                  className="adminclassaddstepone-form-label"
                  htmlFor="className"
                >
                  Class Name <span className="adminclassaddstepone_required">*</span>
                </label>
                <input
                  id="className"
                  type="text"
                  className="adminclassaddstepone_form-control"
                  placeholder=""
                />
              </div>

              {/* Division */}
              <div>
                <label
                  className="adminclassaddstepone-form-label"
                  htmlFor="division"
                >
                  Division <span className="adminclassaddstepone_required">*</span>
                </label>
                <input
                  id="division"
                  type="text"
                  className="adminclassaddstepone_form-control"
                  placeholder=""
                />
              </div>

              {/* Medium */}
              <div>
                <label
                  className="adminclassaddstepone-form-label"
                  htmlFor="medium"
                >
                  Medium
                </label>
                <select
                  id="medium"
                  className="form-select form-select-sm adminclassaddstepone_select_section"
                >
                  <option value="">Select Medium</option>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                </select>
              </div>
            </div>

            {/* Second Row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px" }}>
              {/* Stream */}
              <div>
                <label
                  className="adminclassaddstepone-form-label"
                  htmlFor="stream"
                >
                  Stream
                </label>
                <select
                  id="stream"
                  className="form-select form-select-sm adminclassaddstepone_select_section"
                >
                  <option value="">Select Stream</option>
                  <option value="Non-Medical">Non-Medical</option>
                  <option value="Medical">Medical</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Arts">Arts</option>
                </select>
              </div>

              {/* Class Teacher */}
              <div>
                <label
                  className="adminclassaddstepone-form-label"
                  htmlFor="classTeacher"
                >
                  Class Teacher <span className="adminclassaddstepone_required">*</span>
                </label>
                <select
                  id="classTeacher"
                  className="form-select form-select-sm adminclassaddstepone_select_section"
                >
                  <option value="">Select Teacher</option>
                  <option value="Radha Krishnan">Radha Krishnan</option>
                  <option value="Kanakambaran">Kanakambaran</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal Footer */}
      <div className="adminclassaddstepone-modal-footer" >
        <Row className="w-100">
          {/* Empty Col for spacing if needed */}
          <Col md={6}></Col>
          {/* Buttons on the right */}
          <Col md={6} className="d-flex justify-content-end">
            <button
              type="button"
              className="adminclassaddstepone_btn-clear"
            >
              Clear
            </button>
            <button
              type="button"
              className="adminclassaddstepone_btn-next"
              onClick={nextStep}
            >
              Next
            </button>
          </Col>
        </Row>
      </div>
      </div>
  );
};

export default AdminClassAddStepOne;
