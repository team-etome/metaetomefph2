import React from "react";
import "./adminclassaddsteptwo.css";

const AdminClassAddStepTwo = ({ prevStep, closeModal, entries, addEntry, removeEntry }) => {
  return (
    <div className="adminclassaddsteptwo-main">
      {/* Modal Header */}
      <div className="adminclassaddsteptwo-header">
        <p className="adminclassaddsteptwo-header-title">Add Class</p>
        <button className="adminclassaddsteptwo-close-btn" onClick={closeModal}>
          ×
        </button>
      </div>
      {/* Step Indicator */}
      <div className="adminclassaddsteptwo-step-indicator">
        <div className="adminclassaddsteptwo-step completed">
          <div className="adminclassaddsteptwo-step-number">1</div>
          <div className="adminclassaddsteptwo-step-label">Class Details</div>
        </div>
        <div className="adminclassaddsteptwo-step completed">
          <div className="adminclassaddsteptwo-step-number">2</div>
          <div className="adminclassaddsteptwo-step-label">Add Curriculum</div>
        </div>
      </div>
      {/* Content */}
      <div className="adminclassaddsteptwo-modal-step-content">
        <div className="adminclassaddsteptwo_entry-table">
          {entries.map((entry, index) => (
            <div
              key={index}
              className={`adminclassaddsteptwo_step-row row-with-delete ${index === 0 ? "first-row" : ""}`}
            >
              <div className="adminclassaddsteptwo_step-column">
                {index === 0 && (
                  <label
                    className="adminclassaddsteptwo-form-label"
                    htmlFor={`className-${index}`}
                  >
                    Subject <span className="adminclassaddsteptwo_required">*</span>
                  </label>
                )}
                <select
                  id={`className-${index}`}
                  className="adminclassaddsteptwo_form-select"
                >
                  <option value="">Select Subject</option>
                  <option value="10">10</option>
                  <option value="9">9</option>
                  <option value="8">8</option>
                </select>
              </div>

              <div className="adminclassaddsteptwo_step-column">
                {index === 0 && (
                  <label
                    className="adminclassaddsteptwo-form-label"
                    htmlFor={`division-${index}`}
                  >
                    Publisher Name <span className="adminclassaddsteptwo_required">*</span>
                  </label>
                )}
                <select
                  id={`division-${index}`}
                  className="adminclassaddsteptwo_form-select"
                >
                  <option value="">Publisher Name</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                </select>
              </div>

              <div className="adminclassaddsteptwo_step-column">
                {index === 0 && (
                  <label
                    className="adminclassaddsteptwo-form-label"
                    htmlFor={`subject-${index}`}
                  >
                    Faculty Name <span className="adminclassaddsteptwo_required">*</span>
                  </label>
                )}
                <select
                  id={`subject-${index}`}
                  className="adminclassaddsteptwo_form-select"
                >
                  <option value="">Select Faculty</option>
                  <option value="English">English</option>
                  <option value="Math">Math</option>
                  <option value="Biology">Biology</option>
                </select>
              </div>

              {entries.length > 1 && (
                <button
                  type="button"
                  className="remove-row-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeEntry(index);
                  }}
                >
                  &#10005;
                </button>
              )}
            </div>
          ))}

          <div className="adminclassaddsteptwo_add-next-btn-container">
            <button type="button" className="adminclassaddsteptwo_add-next-btn" onClick={addEntry}>
              + Add Next
            </button>
          </div>
        </div>
      </div>
      {/* Modal Footer */}
      <div className="adminclassaddsteptwo-modal-footer">
        <div className="adminclassaddsteptwo-footer-left">
          <button type="button" className="adminclassaddsteptwo_btn-back" onClick={prevStep}>
            Back
          </button>
        </div>
        <div className="adminclassaddsteptwo-footer-right">
          <button type="button" className="adminclassaddsteptwo_btn-clear">
            Clear
          </button>
          <button type="button" className="adminclassaddsteptwo_btn-next">
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminClassAddStepTwo;
