import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import "./newtestlistingadd.css";
import NewTeacherMockTest from "./NewTeacherMockTest";

export default function NewTestListingAdd({ onBack: onParentBack, class_name, division, subject, onTestAdded }) {
    const [step, setStep] = useState(1);
    const [formValues, setFormValues] = useState({
      examName: "",
      topic: "",
      duration: "",
      examDate: "",
      outOfMarks: "",
      teacherCode: "",
    });
  
    const handleChange = (e) => {
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
            Mock Details
          </span>
          <span className="step-divider">&gt;</span>
          <div className={`step-circle ${step === 2 ? "active" : ""}`}>2</div>
          <span className={`step-text ${step === 2 ? "active" : ""}`}>
            Create Question
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
              Exam Name <span className="required">*</span>
            </label>
            <input
              id="examName"
              type="text"
              className="newtestlistingadd_input"
              value={formValues.examName}
              onChange={handleChange}
            />
          </div>
          <div className="newtestlistingadd_field">
            <label htmlFor="topic">
              Topic <span className="required">*</span>
            </label>
            <input
              id="topic"
              type="text"
              className="newtestlistingadd_input"
              value={formValues.topic}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="newtestlistingadd_row">
          <div className="newtestlistingadd_field">
            <label htmlFor="duration">
              Duration <span className="required">*</span>
            </label>
            <input
              id="duration"
              type="number"
              placeholder="in minutes"
              className="newtestlistingadd_input"
              value={formValues.duration}
              onChange={handleChange}
            />
          </div>
          <div className="newtestlistingadd_field">
            <label htmlFor="examDate">
              Exam Date <span className="required">*</span>
            </label>
            <input
              id="examDate"
              type="date"
              className="newtestlistingadd_input"
              value={formValues.examDate}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="newtestlistingadd_row">
          <div className="newtestlistingadd_field">
            <label htmlFor="outOfMarks">
              Out of Marks <span className="required">*</span>
            </label>
            <input
              id="outOfMarks"
              type="number"
              className="newtestlistingadd_input"
              value={formValues.outOfMarks}
              onChange={handleChange}
            />
          </div>
          <div className="newtestlistingadd_field">
            <label htmlFor="teacherCode">
              Teacher Code <span className="required">*</span>
            </label>
            <input
              id="teacherCode"
              type="text"
              className="newtestlistingadd_input"
              value={formValues.teacherCode}
              onChange={handleChange}
            />
          </div>
        </div>
      </form>

      {/* ▶ Sticky Footer */}
      <div className="newtestlistingadd_footer">
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
        <button
          type="button"
          className="newtestlistingadd_next"
          onClick={goNext}
        >
          Next
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
      />}
    </div>
  );
}
