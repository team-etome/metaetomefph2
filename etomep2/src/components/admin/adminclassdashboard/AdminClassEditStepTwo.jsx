import React, { useEffect, useState } from "react";
import "./adminclasseditsteptwo.css";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import Select from "react-select";



const AdminClassEditStepTwo = ({ stepOneData, initialEntries, teachers, prevStep, closeModal, finishStep }) => {



  const APIURL = useSelector((state) => state.APIURL.url);
  const admin = useSelector((state) => state.admininfo);
  const [localEntries, setLocalEntries] = useState(initialEntries);
  const admin_id = useSelector((state) => state.admininfo.admininfo?.admin_id);
  const teacherinfo = useSelector((state) => state.adminteacherinfo);
  const admininfo = useSelector((state) => state.admininfo);
  


  useEffect(() => {
    if (!initialEntries) return;
    const mapped = initialEntries.map(e => {
      const pub = e.publisher_name || "";
      const matchTeacher = teachers.find(
        t => `${t.first_name} ${t.last_name}` === e.teacher
      );
      const facIdString = matchTeacher ? matchTeacher.id.toString() : "";

      return {
        subject: e.subject,
        publishername: pub,
        facultyname: facIdString
      };
    });
    setLocalEntries(mapped);
  }, [initialEntries, teachers]);

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

      const classId = stepOneData.classId;

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




  const removeEntry = (idxToRemove) => {
    setLocalEntries(prev => prev.filter((_, i) => i !== idxToRemove));
  };


  const handleEntryChange = (index, field, value) => {
    const updated = [...localEntries];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    setLocalEntries(updated);
  };
  const steponeeditcustomStyles = {
    control: (base, state) => ({
      ...base,
      // width: '501px',
      height: '48px',
      borderRadius: '8px',
      borderColor: state.isFocused ? '#86b7fe' : '#757575',
      boxShadow: state.isFocused ? '0 0 0 .25rem rgb(194, 218, 255)' : 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      Grid: 0,
      padding: 0,
      margin: 0,
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
      fontSize: '16px'
    }),

    singleValue: (base) => ({
      ...base,
      color: '#526D82',
      fontSize: '16px'
    }),

    menu: (base) => ({
      ...base,
      // zIndex: 1000,
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
      },
      // zIndex: 9999,
    }),
  };
  const subjectOptions = admininfo?.admininfo?.subjects?.map((s) => ({
    value: s.subject,
    label: s.subject.charAt(0).toUpperCase() + s.subject.slice(1),
  })) || [];
  const publisherOptions = admininfo?.admininfo?.publisher_name?.map(p => ({
    value: p,
    label: p
  })) || [];

  const facultyOptions = teachers.map(t => ({
    value: t.id.toString(),
    label: `${t.first_name} ${t.last_name}`
  }));

  return (
    <div className="adminclasseditsteptwo-main" >
      <div className="adminclasseditsteptwo-header" >

        <p className="adminclasseditsteptwo-header-title">Add Class</p>
        <button className="adminclasseditsteptwo-close-btn" onClick={closeModal}>×</button>
      </div>
      <div className="adminclasseditsteptwo-step-indicator">
        <div className="adminclasseditsteptwo-step completed">
          <div className="adminclasseditsteptwo-step-number">1</div>
          <div className="adminclasseditsteptwo-step-label">Class Details</div>
        </div>
        <div className="adminclasseditsteptwo-step completed">
          <div className="adminclasseditsteptwo-step-number">2</div>
          <div className="adminclasseditsteptwo-step-label">Add Curriculum</div>
        </div>
      </div>

      <div className="adminclasseditsteptwo-modal-step-content">
        <div className="adminclasseditsteptwo-table-header">
          <div className="adminclasseditsteptwo-form-label">
            Subject <span className="adminclasseditsteptwo_required">*</span>
          </div>
          <div className="adminclasseditsteptwo-form-label">
            Publisher Name <span className="adminclasseditsteptwo_required">*</span>
          </div>
          <div className="adminclasseditsteptwo-form-label">
            Faculty Name <span className="adminclasseditsteptwo_required">*</span>
          </div>
          {/* you can add an empty column for the delete‐button space if you like */}
          {/* <div className="adminclasseditsteptwo-step-column adminclasseditsteptwo-header-spacer"></div> */}
        </div>
        <div className="adminclasseditsteptwo-table-body">
          {localEntries.map((entry, index) => (
            <div
              key={index}
              className={`adminclasseditsteptwo_row-with-delete ${index === 0 ? "adminclasseditsteptwo_first-row" : ""}`}
            >
              <div className="adminclasseditsteptwo_step-row">
                <div className="adminclasseditsteptwo_step-column">
                  <Select
                    id={`subject-${index}`}
                    options={subjectOptions}
                    value={
                      subjectOptions.find(o => o.value === entry.subject) || null
                    }
                    onChange={(opt) => {
                      handleEntryChange(index, 'subject', opt?.value || "");
                    }}
                    menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
                    menuPosition="fixed"
                    styles={{
                      ...steponeeditcustomStyles,
                      menuPortal: base => ({ ...base, zIndex: 9999 })
                    }}
                    placeholder="Select Subject"
                    isClearable={false}
                  />
                </div>


                <div className="adminclasseditsteptwo_step-column">
                  <Select
                    id={`publisher-${index}`}
                    options={publisherOptions}
                    value={publisherOptions.find(o => o.value === entry.publishername) || null}
                    onChange={(opt) => handleEntryChange(index, 'publishername', opt?.value || "")}
                    menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
                    menuPosition="fixed"
                    styles={{
                      ...steponeeditcustomStyles,
                      menuPortal: base => ({ ...base, zIndex: 9999 })
                    }}
                    placeholder="Select Publisher"
                    isClearable={false}
                  />
                </div>


                <div className="adminclasseditsteptwo_step-column">
                  <Select
                    id={`faculty-${index}`}
                    options={facultyOptions}
                    value={facultyOptions.find(o => o.value === entry.facultyname) || null}
                    onChange={(opt) => handleEntryChange(index, 'facultyname', opt?.value || "")}
                    menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
                    menuPosition="fixed"
                    styles={{
                      ...steponeeditcustomStyles,
                      menuPortal: base => ({ ...base, zIndex: 9999 })
                    }}
                    placeholder="Select Faculty"
                    isClearable={false}
                  />
                </div>

                {localEntries.length > 1 && (
                  <span
                    className="adminclasseditsteptwo_delete-row-btn"
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
        </div>









        {/* <div className="adminclasseditsteptwo_entry-table">
          {localEntries.map((entry, index) => (
            <div
              key={index}

              className={`adminclasseditsteptwo_row-with-delete ${index === 0 ? "adminclasseditsteptwo_first-row" : ""}`}

            >
              
            </div>
          ))} */}

        <div className="adminclasseditsteptwo_add-next-btn-container">
          <button
            type="button"
            className="adminclasseditsteptwo_add-next-btn"
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

        {/* </div> */}
      </div>

      <div className="adminclasseditsteptwo-modal-footer">
        <div className="adminclasseditsteptwo-footer-left">
          <button type="button" className="adminclasseditsteptwo_btn-back" onClick={prevStep}>
            Back
          </button>
        </div>
        <div className="adminclasseditsteptwo-footer-right">
          <button
            type="button"
            className="adminclasseditsteptwo_btn-clear"
            onClick={() => setLocalEntries([{ subject: "", publishername: "", facultyname: "" }])}
          >
            Clear
          </button>
          <button
            type="button"
            className="adminclasseditsteptwo_btn-next"
            onClick={handleSave}
          >
            Save
          </button>

        </div>
      </div>
    </div>
  );
};

export default AdminClassEditStepTwo;