import React, { useEffect, useState } from "react";
import "./adminclassaddsteptwo.css";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";


const AdminClassAddStepTwo = ({
  prevStep,
  closeModal,
  entries,
  addEntry,
  removeEntry,
  teachers,
  admininfo,
  stepOneData,
  onSave,
}) => {
  useEffect(() => {
    console.log("AdminClassAddStepTwo - admininfo3");
    console.log("Subjects:", admininfo?.admininfo?.subjects);
    console.log("Publisher Names:", admininfo?.admininfo?.publisher_name);
  }, [admininfo]);


  const APIURL = useSelector((state) => state.APIURL.url);
  const admin = useSelector((state) => state.admininfo);
  const [localEntries, setLocalEntries] = useState(entries || []);


  useEffect(() => {
    if (entries) {
      setLocalEntries(entries);
    }
  }, [entries]);

  const handleSave = async () => {
    try {
      if (!stepOneData) {
        Swal.fire({
          title: 'Error',
          text: 'Step 1 data is missing!',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return;
      }

      if (!localEntries || localEntries.length === 0) {
        Swal.fire({
          title: 'Error',
          text: 'Please add at least one curriculum entry!',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return;
      }

      // Validate entries
      const incompleteEntries = localEntries.filter(entry =>
        !entry.subject || !entry.publishername || !entry.facultyname

      );

      if (incompleteEntries.length > 0) {
        Swal.fire({
          title: "Validation Error",
          text: "Please fill in all fields in the curriculum entries",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }

      const finalPayload = {
        ...stepOneData,
        admin: admin.admininfo?.admin_id,
        entries: localEntries.map((entry) => ({
          subject: entry.subject,
          publisher_name: entry.publishername,

          faculty_name: entry.facultyname
        }))

      };

      const response = await axios.post(`${APIURL}/api/addClassname`, finalPayload);

      if (response.status === 201 || response.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Class added successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        closeModal();

      } else {
        Swal.fire({
          title: "Error",
          text: "Failed to add class. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });

      }
    } catch (error) {
      console.error("Error during API call:", error);
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Something went wrong!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };


  const handleEntryChange = (index, field, value) => {
    const updated = [...localEntries];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    setLocalEntries(updated);
  };

  return (
    <div className="adminclassaddsteptwo-main" >
      <div className="adminclassaddsteptwo-header" >

        <p className="adminclassaddsteptwo-header-title">Add Class</p>
        <button className="adminclassaddsteptwo-close-btn" onClick={closeModal}>×</button>
      </div>

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

      <div className="adminclassaddsteptwo-modal-step-content">
        <div className="adminclassaddsteptwo_entry-table">
          {localEntries.map((entry, index) => (
            <div
              key={index}

              className={`adminclassaddsteptwo_row-with-delete ${index === 0 ? "adminclassaddsteptwo_first-row" : ""}`}

            >
              <div className="adminclassaddsteptwo_step-row">

                {/* Subject */}
                <div className="adminclassaddsteptwo_step-column">
                  {index === 0 && (
                    <label className="adminclassaddsteptwo-form-label" htmlFor={`subject-${index}`}>
                      Subject <span className="adminclassaddsteptwo_required">*</span>
                    </label>
                  )}
                  <select

                    id={`subject-${index}`}
                    className="form-select form-select-sm adminclassaddsteptwo_form-select"
                    value={entry.subject || ""}
                    onChange={(e) => handleEntryChange(index, 'subject', e.target.value)}

                  >
                    <option value="">Select Subject</option>
                    {admininfo?.admininfo?.subjects?.map((subject, idx) => (
                      <option key={idx} value={subject.subject}>
                        {subject.subject.charAt(0).toUpperCase() + subject.subject.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>


                <div className="adminclassaddsteptwo_step-column">
                  {index === 0 && (
                    <label className="adminclassaddsteptwo-form-label" htmlFor={`publisher-${index}`}>
                      Publisher Name <span className="adminclassaddsteptwo_required">*</span>
                    </label>
                  )}
                  <select

                    id={`publisher-${index}`}
                    className="form-select form-select-sm adminclassaddsteptwo_form-select"
                    value={entry.publishername || ""}
                    onChange={(e) => handleEntryChange(index, 'publishername', e.target.value)}
                  >
                    <option value="">Select Publisher</option>
                    {admininfo?.admininfo?.publisher_name?.map((publisher, idx) => (
                      <option key={idx} value={publisher}>{publisher}</option>

                    ))}
                  </select>
                </div>


                <div className="adminclassaddsteptwo_step-column">
                  {index === 0 && (
                    <label className="adminclassaddsteptwo-form-label" htmlFor={`faculty-${index}`}>
                      Faculty Name <span className="adminclassaddsteptwo_required">*</span>
                    </label>
                  )}
                  <select

                    id={`faculty-${index}`}
                    className="form-select form-select-sm adminclassaddsteptwo_form-select"
                    value={entry.facultyname || ""}
                    onChange={(e) => handleEntryChange(index, 'facultyname', e.target.value)}
                  >
                    <option value="">Select Faculty</option>
                    {Array.isArray(teachers) && teachers.map((teacher, idx) => (
                      <option key={idx} value={teacher.id}>
                        {teacher.first_name} {teacher.last_name}
                      </option>
                    ))}

                  </select>
                </div>

                {localEntries.length > 1 && (
                  <span
                    className="adminclassaddsteptwo_delete-row-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeEntry(index);
                    }}
                  >
                    &#10005;
                  </span>
                )}
              </div>
            </div>
          ))}

          <div className="adminclassaddsteptwo_add-next-btn-container">
            <button
              type="button"
              className="adminclassaddsteptwo_add-next-btn"
              onClick={() => {
                setLocalEntries((prev) => [
                  ...prev,
                  { subject: "", publishername: "", facultyname: "" },
                ]);
              }}
            >
              + Add Next
            </button>
          </div>

        </div>
      </div>

      <div className="adminclassaddsteptwo-modal-footer">
        <div className="adminclassaddsteptwo-footer-left">
          <button type="button" className="adminclassaddsteptwo_btn-back" onClick={prevStep}>
            Back
          </button>
        </div>
        <div className="adminclassaddsteptwo-footer-right">
          <button 
            type="button" 
            className="adminclassaddsteptwo_btn-clear"
            onClick={() => setLocalEntries([{ subject: "", publishername: "", facultyname: "" }])}
          >
            Clear
          </button>
          <button
            type="button"
            className="adminclassaddsteptwo_btn-next"
            onClick={handleSave}
          >
            Save
          </button>

        </div>
      </div>
    </div>
  );
};

export default AdminClassAddStepTwo;
