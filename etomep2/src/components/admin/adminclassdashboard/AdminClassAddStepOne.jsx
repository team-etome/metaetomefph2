import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./adminclassaddstepone.css";

const AdminClassAddStepOne = ({ nextStep, closeModal, teachers }) => {
  const [formData, setFormData] = useState({
    className: "",
    division: "",
    medium: "",
    stream: "",
    classTeacher: "",
    classTeacherId: ""
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    // Special handling for class teacher selection
    if (id === "classTeacher") {
      // Find the selected teacher object
      const selectedTeacher = teachers.find(
        teacher => `${teacher.first_name} ${teacher.last_name}` === value
      );

      // Update both the name and ID
      setFormData(prev => ({
        ...prev,
        classTeacher: value,
        classTeacherId: selectedTeacher ? selectedTeacher.id : ""
      }));
    } else {
      // Normal handling for other fields
      setFormData(prev => ({
        ...prev,
        [id]: value
      }));
    }

    // Clear error for this field
    if (errors[id]) {
      const newErrors = { ...errors };
      delete newErrors[id];
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.className.trim()) {
      newErrors.className = "Class name is required";
      isValid = false;
    }

    if (!formData.division.trim()) {
      newErrors.division = "Division is required";
      isValid = false;
    }

    if (!formData.classTeacher) {
      newErrors.classTeacher = "Class teacher is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleClear = () => {
    setFormData({
      className: "",
      division: "",
      medium: "",
      stream: "",
      classTeacher: "",
      classTeacherId: ""
    });
    setErrors({});
  };

  const handleNext = () => {
    if (validateForm()) {
      const formattedData = {
        class_name: formData.className,
        division: formData.division,
        medium: formData.medium,
        stream: formData.stream,
        class_teacher: formData.classTeacher,
        class_teacher_id: formData.classTeacherId
      };
      nextStep(formattedData);  // Send formattedData instead of raw formData
    } else {
      alert("Please fill in all required fields");
    }
  };

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
              className={`adminclassaddstepone_form-control ${errors.className ? 'is-invalid' : ''}`}
              placeholder="Enter class name"
              value={formData.className}
              onChange={handleInputChange}
            />
            {errors.className && (
              <div className="invalid-feedback">{errors.className}</div>
            )}
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
              className={`adminclassaddstepone_form-control ${errors.division ? 'is-invalid' : ''}`}
              placeholder="Enter division"
              value={formData.division}
              onChange={handleInputChange}
            />
            {errors.division && (
              <div className="invalid-feedback">{errors.division}</div>
            )}
          </Col>

          {/* Medium */}
          <Col md={4}>
            <label
              className="adminclassaddstepone-form-label"
              htmlFor="medium"
            >
              Medium
            </label>
            <select
              id="medium"
              className="form-select form-select-sm adminclassaddstepone_select_section"
              value={formData.medium}
              onChange={handleInputChange}
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
            <select
              id="stream"
              className="form-select form-select-sm adminclassaddstepone_select_section"
              value={formData.stream}
              onChange={handleInputChange}
            >
              <option value="">Select Stream</option>
              <option value="Non-Medical">Non-Medical</option>
              <option value="Medical">Medical</option>
              <option value="Commerce">Commerce</option>
              <option value="Arts">Arts</option>
            </select>
          </Col>

          {/* Class Teacher */}
          <Col md={6}>
            <label
              className="adminclassaddstepone-form-label"
              htmlFor="classTeacher"
            >
              Class Teacher <span className="adminclassaddstepone_required">*</span>
            </label>
            <select
              id="classTeacher"
              className={`form-select form-select-sm adminclassaddstepone_select_section ${errors.classTeacher ? 'is-invalid' : ''}`}
              value={formData.classTeacherId || ""}
              onChange={(e) => {
                const selectedId = e.target.value;
                const selectedTeacher = teachers.find(teacher => teacher.id.toString() === selectedId);
                setFormData(prev => ({
                  ...prev,
                  classTeacher: selectedTeacher ? `${selectedTeacher.first_name} ${selectedTeacher.last_name}` : '',
                  classTeacherId: selectedId
                }));

                // Clear error if already selected
                if (errors.classTeacher) {
                  const newErrors = { ...errors };
                  delete newErrors.classTeacher;
                  setErrors(newErrors);
                }
              }}
            >
              <option value="">Select Teacher</option>
              {Array.isArray(teachers) && teachers.map((teacher, index) => (
                <option key={index} value={teacher.id}>
                  {teacher.first_name} {teacher.last_name}
                </option>
              ))}
            </select>
            {errors.classTeacher && (
              <div className="invalid-feedback">{errors.classTeacher}</div>
            )}
          </Col>
        </Row>
      </div>
      {/* Modal Footer */}
      <div className="adminclassaddstepone-modal-footer">
        <Row className="w-100">
          {/* Empty Col for spacing if needed */}
          <Col md={6}></Col>
          {/* Buttons on the right */}
          <Col md={6} className="d-flex justify-content-end">
            <button
              type="button"
              className="adminclassaddstepone_btn-clear me-2"
              onClick={handleClear}
            >
              Clear
            </button>
            <button
              type="button"
              className="adminclassaddstepone_btn-next"
              onClick={handleNext}
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
