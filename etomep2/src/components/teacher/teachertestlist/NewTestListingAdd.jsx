import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import "./newtestlistingadd.css";
import NewTeacherMockTest from "./NewTeacherMockTest";
import Swal from 'sweetalert2';

export default function NewTestListingAdd({ onBack: onParentBack, class_name, division, subject, onTestAdded, editData, isEditMode }) {
    const [step, setStep] = useState(1);
    const [formValues, setFormValues] = useState({
      examName: "",
      topic: "",
      duration: "",
      examDate: "",
      outOfMarks: "",
      teacherCode: "",
    });
  
    // Populate form when in edit mode
    React.useEffect(() => {
        if (isEditMode && editData) {
            setFormValues({
                examName: editData.exam_name || "",
                topic: editData.topic || "",
                duration: editData.duration?.toString() || "",
                examDate: editData.exam_date || "",
                outOfMarks: editData.out_of_mark?.toString() || "",
                teacherCode: editData.teacher_code || "",
            });
        }
    }, [isEditMode, editData]);
  
    const handleChange = (e) => {
      // In edit mode, don't allow changes
      if (isEditMode) return;
      
      const { id, value } = e.target;
      setFormValues((fv) => ({ ...fv, [id]: value }));
    };
  
    // Function to check if all required fields are filled
    const isFormComplete = () => {
      if (!formValues.examName.trim()) return false;
      if (!formValues.topic.trim()) return false;
      if (!formValues.duration || formValues.duration.trim() === '') return false;
      if (!formValues.examDate) return false;
      if (!formValues.outOfMarks || formValues.outOfMarks.trim() === '') return false;
      if (!formValues.teacherCode.trim()) return false;
      return true;
    };
  
    const goNext = (e) => {
      e.preventDefault();
      
      if (!isFormComplete()) {
        let missingFields = [];
        
        if (!formValues.examName.trim()) missingFields.push("Exam Name");
        if (!formValues.topic.trim()) missingFields.push("Topic");
        if (!formValues.duration || formValues.duration.trim() === '') missingFields.push("Duration");
        if (!formValues.examDate) missingFields.push("Exam Date");
        if (!formValues.outOfMarks || formValues.outOfMarks.trim() === '') missingFields.push("Out of Marks");
        if (!formValues.teacherCode.trim()) missingFields.push("Teacher Code");
        
        Swal.fire({
          icon: "error",
          title: "Missing Required Information",
          text: `Please complete the following fields: ${missingFields.join(", ")}`,
        });
        return;
      }
      
      setStep(2);
    };
    const goBack = () => {
      if (step === 1) return onParentBack?.();
      setStep(1);
    };

    const handleTestAdded = () => {
      // Reset form values
      setFormValues({
        examName: "",
        topic: "",
        duration: "",
        examDate: "",
        outOfMarks: "",
        teacherCode: "",
      });
      // Go back to step 1
      setStep(1);
      // Call the parent's onTestAdded to refresh the list
      if (onTestAdded) {
        onTestAdded();
      }
      // Go back to the main listing
      onParentBack?.();
    };

  return (
    <div className="newtestlistingadd_container">
      {/* ▶ Back + Stepper */}
      <div className="newtestlistingadd_header">
        <IoArrowBack
          size={24}
          className="newtestlistingadd_back"
          onClick={goBack}
        />
        <div className="newtestlistingadd_steps">
          <div className="step-circle active">1</div>
          <span className="step-text active">
            {isEditMode ? 'Test Details' : 'Mock Details'}
          </span>
          <span className="step-divider">&gt;</span>
          <div className={`step-circle ${step === 2 ? "active" : ""}`}>2</div>
          <span className={`step-text ${step === 2 ? "active" : ""}`}>
            {isEditMode ? 'View Questions' : 'Create Question'}
          </span>
        </div>
      </div>

      {/* ▶ Form: 3 rows × 2 cols */}
      {step === 1 && (
        <>
      <form className="newtestlistingadd_form" onSubmit={goNext}>
        {/* Row 1 */}
        <div className="newtestlistingadd_row">
          <div className="newtestlistingadd_field">
            <label htmlFor="examName">
              Exam Name {!isEditMode && <span className="required">*</span>}
            </label>
            <input
              id="examName"
              type="text"
              className="newtestlistingadd_input"
              value={formValues.examName}
              onChange={handleChange}
              readOnly={isEditMode}
              style={isEditMode ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed' } : {}}
            />
          </div>
          <div className="newtestlistingadd_field">
            <label htmlFor="topic">
              Topic {!isEditMode && <span className="required">*</span>}
            </label>
            <input
              id="topic"
              type="text"
              className="newtestlistingadd_input"
              value={formValues.topic}
              onChange={handleChange}
              readOnly={isEditMode}
              style={isEditMode ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed' } : {}}
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="newtestlistingadd_row">
          <div className="newtestlistingadd_field">
            <label htmlFor="duration">
              Duration {!isEditMode && <span className="required">*</span>}
            </label>
            <input
              id="duration"
              type="number"
              placeholder="in minutes"
              className="newtestlistingadd_input"
              value={formValues.duration}
              onChange={handleChange}
              readOnly={isEditMode}
              style={isEditMode ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed' } : {}}
              onWheel={(e) => e.target.blur()}
            />
          </div>
          <div className="newtestlistingadd_field">
            <label htmlFor="examDate">
              Exam Date {!isEditMode && <span className="required">*</span>}
            </label>
            <input
              id="examDate"
              type="date"
              className="newtestlistingadd_input"
              value={formValues.examDate}
              onChange={handleChange}
              readOnly={isEditMode}
              style={isEditMode ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed' } : {}}
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="newtestlistingadd_row">
          <div className="newtestlistingadd_field">
            <label htmlFor="outOfMarks">
              Out of Marks {!isEditMode && <span className="required">*</span>}
            </label>
            <input
              id="outOfMarks"
              type="number"
              className="newtestlistingadd_input"
              value={formValues.outOfMarks}
              onChange={handleChange}
              readOnly={isEditMode}
              style={isEditMode ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed' } : {}}
              onWheel={(e) => e.target.blur()}
            />
          </div>
          <div className="newtestlistingadd_field">
            <label htmlFor="teacherCode">
              Teacher Code {!isEditMode && <span className="required">*</span>}
            </label>
            <input
              id="teacherCode"
              type="text"
              className="newtestlistingadd_input"
              value={formValues.teacherCode}
              onChange={handleChange}
              readOnly={isEditMode}
              style={isEditMode ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed' } : {}}
            />
          </div>
        </div>
      </form>

      {/* ▶ Sticky Footer */}
      <div className="newtestlistingadd_footer">
        {!isEditMode && (
          <button
            type="button"
            className="newtestlistingadd_clear"
            onClick={() =>
              setFormValues({
                examName: "",
                topic: "",
                duration: "",
                examDate: "",
                outOfMarks: "",
                teacherCode: "",
              })
            }
          >
            Clear
          </button>
        )}
        <button
          type="button"
          className="newtestlistingadd_next"
          style={{
            backgroundColor: isFormComplete() ? '#2162B2' : '#bcbcbc',
            color: '#fff',
            border: isFormComplete() ? '1px solid #2162B2' : '1px solid #bcbcbc',
            cursor: 'pointer'
          }}
          onClick={goNext}
        >
          {isEditMode ? 'View Questions' : 'Next'}
        </button>
      </div>
      </>
      )}
      {step === 2 && <NewTeacherMockTest 
        formData={formValues} 
        class_name={class_name}
        division={division}
        subject={subject}
        onTestAdded={handleTestAdded}
        editData={editData}
        isEditMode={isEditMode}
      />}
    </div>
  );
}
