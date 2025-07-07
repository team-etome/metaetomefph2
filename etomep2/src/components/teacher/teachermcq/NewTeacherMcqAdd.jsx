import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import "./newteachermcqadd.css";
import NewTeacherMcqCreate from "./NewTeacherMcqCreate";

export default function NewTeacherMcqAdd({ onBack: onParentBack, class_name, division, subject, onMcqAdded, editData, isEditMode }) {
  const [step, setStep] = useState(1);
  const [formValues, setFormValues] = useState({
    examName: "",
    outOfMarks: "",
    negativeMark: "",
    individualMark: "",
    duration: "",
    topic: "",
    teacherCode: "",
  });

  // Populate form when in edit mode
  React.useEffect(() => {
    if (isEditMode && editData) {
      setFormValues({
        examName: editData.exam_name || "",
        outOfMarks: editData.out_of_mark?.toString() || "",
        negativeMark: editData.negative_mark?.toString() || "",
        individualMark: editData.individual_mark?.toString() || "",
        duration: editData.duration?.toString() || "",
        topic: editData.topic || "",
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

  const goNext = (e) => {
    e.preventDefault();
    setStep(2);
  };
  const goBack = () => {
    if (step === 1) return onParentBack?.();
    setStep(1);
  };

  const handleMcqAdded = () => {
    // Reset form values
    setFormValues({
      examName: "",
      outOfMarks: "",
      negativeMark: "",
      individualMark: "",
      duration: "",
      topic: "",
      teacherCode: "",
    });
    // Go back to step 1
    setStep(1);
    // Call the parent's onMcqAdded to refresh the list
    if (onMcqAdded) {
      onMcqAdded();
    }
    // Go back to the main listing
    onParentBack?.();
  };

  return (
    <div className="newteachermcqadd_container">
      {/* ▶ Back + Stepper */}
      <div className="newteachermcqadd_header">
        <IoArrowBack
          size={24}
          className="newteachermcqadd_back"
          onClick={goBack}
        />
        <div className="newteachermcqadd_steps">
          <div className="step-circle active">1</div>
          <span className="step-text active">
            {isEditMode ? 'MCQ Details' : 'MCQ Details'}
          </span>
          <span className="step-divider">&gt;</span>
          <div className={`step-circle ${step === 2 ? "active" : ""}`}>2</div>
          <span className={`step-text ${step === 2 ? "active" : ""}`}>
            {isEditMode ? 'View Questions' : 'Create Question'}
          </span>
        </div>
      </div>

      {step === 1 && (
        <>
          <form className="newteachermcqadd_form" onSubmit={goNext}>
            {/* Row 1: full-width */}
            <div className="newteachermcqadd_row">
              <div className="newteachermcqadd_field full">
                <label htmlFor="examName">
                  Exam Name {!isEditMode && <span className="required">*</span>}
                </label>
                <input
                  id="examName"
                  type="text"
                  value={formValues.examName}
                  onChange={handleChange}
                  className="newteachermcqadd_input"
                  readOnly={isEditMode}
                  style={isEditMode ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed' } : {}}
                />
              </div>
            </div>

            {/* Row 2: three number inputs */}
            <div className="newteachermcqadd_row">
              {[
                ["outOfMarks", "Out of Marks"],
                ["negativeMark", "Negative Mark"],
                ["individualMark", "Individual Mark"],
              ].map(([id, label]) => (
                <div key={id} className="newteachermcqadd_field">
                  <label htmlFor={id}>
                    {label} {!isEditMode && <span className="required">*</span>}
                  </label>
                  <input
                    id={id}
                    type="number"
                    value={formValues[id]}
                    onChange={handleChange}
                    className="newteachermcqadd_input"
                    readOnly={isEditMode}
                    style={isEditMode ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed' } : {}}
                  />
                </div>
              ))}
            </div>

            {/* Row 3: duration, topic, teacherCode */}
            <div className="newteachermcqadd_row">
              <div className="newteachermcqadd_field">
                <label htmlFor="duration">
                  Duration {!isEditMode && <span className="required">*</span>}
                </label>
                <input
                    id="duration"
                    type="number"
                    value={formValues.duration}
                    onChange={handleChange}
                    className="newteachermcqadd_input"
                    readOnly={isEditMode}
                    style={isEditMode ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed' } : {}}
                  />
              </div>
              <div className="newteachermcqadd_field">
                <label htmlFor="topic">
                  Topic {!isEditMode && <span className="required">*</span>}
                </label>
                <input
                  id="topic"
                  type="text"
                  value={formValues.topic}
                  onChange={handleChange}
                  className="newteachermcqadd_input"
                  readOnly={isEditMode}
                  style={isEditMode ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed' } : {}}
                />
              </div>
              <div className="newteachermcqadd_field">
                <label htmlFor="teacherCode">
                  Teacher Code {!isEditMode && <span className="required">*</span>}
                </label>
                <input
                  id="teacherCode"
                  type="text"
                  value={formValues.teacherCode}
                  onChange={handleChange}
                  className="newteachermcqadd_input"
                  readOnly={isEditMode}
                  style={isEditMode ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed' } : {}}
                />
              </div>
            </div>
          </form>

          {/* ▶ Sticky Footer */}
          <div className="newteachermcqadd_footer">
            {!isEditMode && (
              <button
                type="reset"
                className="newteachermcqadd_clear"
                onClick={() =>
                  setFormValues({
                    examName: "",
                    outOfMarks: "",
                    negativeMark: "",
                    individualMark: "",
                    duration: "",
                    topic: "",
                    teacherCode: "",
                  })
                }
              >
                Clear
              </button>
            )}
            <button
              type="button"
              className="newteachermcqadd_next"
              onClick={goNext}
            >
              {isEditMode ? 'View Questions' : 'Next'}
            </button>
          </div>
        </>
      )}

      {/* Step 2 would go here */}
      {step === 2 && (
        <NewTeacherMcqCreate 
          formData={formValues} 
          class_name={class_name}
          division={division}
          subject={subject}
          onMcqAdded={handleMcqAdded}
          editData={editData}
          isEditMode={isEditMode}
        />
      )}
    </div>
  );
}