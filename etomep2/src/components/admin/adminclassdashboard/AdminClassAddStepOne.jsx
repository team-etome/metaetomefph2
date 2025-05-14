import React, { useState, useEffect } from "react";
import Select from "react-select";
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

  const [isStreamEnabled, setIsStreamEnabled] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const classNameNum = parseInt(formData.className);
    setIsStreamEnabled(!isNaN(classNameNum) && classNameNum > 10);
  }, [formData.className]);

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

  const steponeaddcustomStyles = {
          control: (base, state) => ({
              ...base,
              // width: '501px',
              height: '48px',
              borderRadius: '8px',
              borderColor: state.isFocused ? '#86b7fe' : '#757575',
              boxShadow: state.isFocused ? '0 0 0 .25rem rgb(194, 218, 255)' : 0,
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 8,
              paddingRight: 8,
              Grid: 0,
              padding: 0,
              marginTop: '4px',
          }),
  
          dropdownIndicator: (base) => ({
              ...base,
              color: '#292D32',
              padding: '0 8px',
              alignItems: 'center',
              svg: {
                  width: '24px',
                  height: '24px',
              }
          }),
  
          indicatorSeparator: () => ({
              display: 'none'
          }),
  
          placeholder: (base) => ({
              ...base,
              color: '#526D82',
              fontSize: '16px',
              margin: 0,           // remove any extra top/bottom margins
              lineHeight: '48px',
          }),
  
  
          singleValue: (base) => ({
              ...base,
              color: '#526D82',
              fontSize: '16px'
          }),
  
          menu: (base) => ({
              ...base,
              zIndex: 1000,
              maxHeight: '200px',  // Limit the height of the dropdown list
              overflowY: 'auto',   // Enable scrolling when the options exceed the height
              fontSize: '14px',
          }),
  
          option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? '#2162B2' : '#fff',
              color: state.isFocused ? '#fff' : '#222222',
              '&:active': {
                  backgroundColor: '#e6e6e6',
              }
          }),
      };
      const teacherOptions = teachers.map(t => ({
          value: t.id.toString(),
          label: `${t.first_name} ${t.last_name}`
      }));

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
        <div className="adminclassaddstepone-form-grid">
          {/* Class Name */}
          <div className="adminclassaddstepone-form-field">
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
          </div>

          {/* Division */}
          <div className="adminclassaddstepone-form-field">
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
          </div>

          {/* Medium */}
          <div className="adminclassaddstepone-form-field">
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
          </div>
        </div>

        {/* Bottom Row - Stream and Class Teacher */}
        <div className="adminclassaddstepone-bottom-row">
          {/* Stream */}
          <div className="adminclassaddstepone-form-field">
            <label
              className="adminclassaddstepone-form-label"
              htmlFor="stream"
            >
              Stream
            </label>
            <select
              id="stream"
              className={`form-select form-select-sm adminclassaddstepone_select_section ${!isStreamEnabled ? 'adminclassaddstepone-disabled' : ''}`}
              value={formData.stream}
              onChange={handleInputChange}
              disabled={!isStreamEnabled}
              style={{
                backgroundColor: !isStreamEnabled ? '#757575' : 'white',
                color: !isStreamEnabled ? '#757575' : 'black'
              }}
            >
              {isStreamEnabled ? (
                <>
                  <option value="">Select Stream</option>
                  <option value="Non-Medical">Non-Medical</option>
                  <option value="Medical">Medical</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Arts">Arts</option>
                </>
              ) : (
                <option value="">Stream not available</option>
              )}
            </select>
          </div>

          {/* Class Teacher */}
          <div className="adminclassaddstepone-form-field_classteacher">
            <label
              className="adminclassaddstepone-form-label"
              htmlFor="classTeacher"
            >
              Class Teacher <span className="adminclassaddstepone_required">*</span>
            </label>
            {/* <select
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
            </select> */}
            <Select
              id="classTeacher"
              styles={steponeaddcustomStyles}
              options={teacherOptions}
              value={teacherOptions.find(o => o.value === formData.classTeacherId) || null}
              onChange={(opt) => {
                setFormData(prev => ({
                  ...prev,
                  classTeacherId: opt?.value || "",
                  classTeacher: opt?.label || ""
                }));
                if (errors.classTeacher) {
                  const newErrors = { ...errors };
                  delete newErrors.classTeacher;
                  setErrors(newErrors);
                }
              }}
              placeholder="Select Teacher"
              isClearable
            />
            {errors.classTeacher && (
              <div className="invalid-feedback">{errors.classTeacher}</div>
            )}
          </div>
        </div>
      </div>
      {/* Modal Footer */}
      <div className="adminclassaddstepone-modal-footer">
        <div className="adminclassaddstepone-footer-content">
          <div className="spacer"></div>
          <div className="adminclassaddstepone-button-group">
            <button
              type="button"
              className="adminclassaddstepone_btn-clear"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminClassAddStepOne;
