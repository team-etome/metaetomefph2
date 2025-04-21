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
        <Row>
          {/* Class Name */}
          <Col md={4}>
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
              placeholder="1"
            />
          </Col>

          {/* Division */}
          <Col md={4}>
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
              placeholder="A"
            />
          </Col>

          {/* Medium */}
          <Col md={4}>
            <label
              className="adminclassaddstepone-form-label"
              htmlFor="medium"
            >
              Medium <span className="adminclassaddstepone_required">*</span>
            </label>
            <select
              id="medium"
              className="form-select form-select-sm adminclassaddstepone_select_year"
            >
              <option value="">Select Medium</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
            </select>
          </Col>
        </Row>

        <Row className="mt-3">
          {/* Stream */}
          <Col md={6}>
            <label
              className="adminclassaddstepone-form-label"
              htmlFor="stream"
            >
              Stream
            </label>
            <input
              id="stream"
              type="text"
              className="adminclassaddstepone_form-control"
              placeholder="Science / Commerce / Arts"
            />
          </Col>

          {/* Class Teacher */}
          <Col md={6}>
            <label
              className="adminclassaddstepone-form-label"
              htmlFor="classTeacher"
            >
              Class Teacher
            </label>
            <select
              id="classTeacher"
              className="form-select form-select-sm adminclassaddstepone_select_year"
            >
              <option value="">Select Teacher</option>
              <option value="Radha Krishnan">Radha Krishnan</option>
              <option value="Kanakambaran">Kanakambaran</option>
            </select>
          </Col>
        </Row>
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
              className="adminclassaddstepone_btn-clear me-2"
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
