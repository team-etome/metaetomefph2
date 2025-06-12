// import React, { useEffect, useState } from 'react';
// import { Row, Col } from 'react-bootstrap';
// import Select from 'react-select';
// import './AdminQuestionassigningview.css';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import Swal from 'sweetalert2';

// const AdminQuestionAssigningView = ({ isOpen, onClose, selectedItem,onDeleted }) => {
//     if (!isOpen) return null;


//     const timetableData = useSelector(s => s.timetabledataquestionpaper.list ?? []);
//     const teacherinfo = useSelector(s => s.adminteacherinfo);
//     const teachers = teacherinfo?.adminteacherinfo || [];

//     console.log(timetableData, "selectedItemselectedItemselectedItemselectedItem")
//     const [isEditMode, setIsEditMode] = useState(false);

//     const [examOptions, setExamOptions] = useState([]);
//     const [yearOptions, setYearOptions] = useState([]);
//     const [classOptions, setClassOptions] = useState([]);
//     const [subjOptions, setSubjOptions] = useState([]);

//     const [selectedExam, setSelectedExam] = useState(null);
//     const [selectedYear, setSelectedYear] = useState(null);
//     const [selectedClass, setSelectedClass] = useState(null);
//     const [selectedSubject, setSelectedSubject] = useState(null);
//     const [selectedTeacher, setSelectedTeacher] = useState(null);
//     const [totalMarks, setTotalMarks] = useState('');
//     const [questionPaperFile, setQuestionPaperFile] = useState({
//         name: 'English.pdf',
//         status: 'Completed',
//         url: '#', 
//     });
//     const [selectedData, setSelectedData] = useState(null);
//     const APIURL = useSelector(state => state.APIURL.url);
//   const [selectedSubj,  setSelectedSubj]  = useState(null);


//     useEffect(() => {
//         if (!selectedExam || !selectedYear || !selectedClass || !selectedSubject) {
//             setSelectedData(null);
//             return;
//         }
//         const match = timetableData.find(item =>
//             item.exam_name === `${selectedExam} ${selectedYear}` &&
//             String(item.year) === String(selectedYear) &&
//             String(item.class) === String(selectedClass) &&
//             item.subject === selectedSubject
//         );
//         setSelectedData(match?.id ?? null);
//     }, [selectedExam, selectedYear, selectedClass, selectedSubject, timetableData]);


//     const handleSave = async () => {
//         if (!isEditMode) {
//             setIsEditMode(true);
//             return;
//         }

//         if (!selectedData || !selectedTeacher || !totalMarks) {
//             return Swal.fire({
//                 icon: 'warning',
//                 title: 'Missing Fields',
//                 text: 'Please fill out all fields before saving.'
//             });
//         }
//         const formData = {
//             timetable: selectedData,
//             teacher: selectedTeacher,
//             total_marks: totalMarks
//         };

//         try {
//             await axios.put(
//                 `${APIURL}/api/questionpaper/${selectedItem.id}`,
//                 formData
//             );
//             setIsEditMode(false);
//             Swal.fire({ icon: 'success', title: 'Saved!' });
//         } catch (err) {
//             console.error('Error updating question paper:', err);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Save failed',
//                 text: err.response?.data?.message || err.message,
//             });
//         }
//     };


//     const handleDelete = async () => {
//         const result = await Swal.fire({
//           title: "Are you sure?",
//           text: "This will permanently delete the question paper entry.",
//           icon: "warning",
//           showCancelButton: true,
//           confirmButtonText: "Yes, delete it!",
//           cancelButtonText: "Cancel",
//           reverseButtons: true,
//         });

//         if (result.isConfirmed) {
//           try {
//             await axios.put(
//               `${APIURL}/api/questionpaper/${selectedItem.id}`,
//               {} 
//             );

//             Swal.fire({
//               icon: "success",
//               title: "Deleted",
//               text: "Question paper entry has been deleted.",
//             });

//             onDeleted(selectedItem.id);  
//             onClose();                   
//           } catch (err) {
//             console.error("Delete failed", err);
//             Swal.fire({
//               icon: "error",
//               title: "Error",
//               text: err.response?.data?.message || "Failed to delete entry.",
//             });
//           }
//         }
//       };





//     useEffect(() => {
//         if (selectedItem) {
//             const m = selectedItem.exam_name.match(/^(.*)\s+(\d{4})$/);
//             if (m) {
//                 setSelectedExam(m[1].trim());
//                 setSelectedYear(m[2]);
//             } else {
//                 setSelectedExam(selectedItem.exam_name);
//                 setSelectedYear('');
//             }
//             setSelectedClass(selectedItem.class_name);
//             setSelectedSubject(selectedItem.subject_name);
//             setTotalMarks(selectedItem.total_marks);
//             setSelectedTeacher(selectedItem.teacher)
//         }
//     }, [selectedItem]);




//     const teacherOptions = teachers.map(t => ({
//         value: t.id,
//         label: `${t.first_name} ${t.last_name}`
//     }));

//     const handleNumberInput = (e) => {
//         const value = e.target.value;
//         if (/^\d*$/.test(value)) {
//             setTotalMarks(value);
//         }
//     };

//     const customStyles = {
//         control: (base, state) => ({
//             ...base,
//             minHeight: '48px',
//             height: '48px',
//             borderRadius: '8px',
//             borderColor: '#757575',
//             // boxShadow: state.isFocused ? '0 0 0 1px #526D82' : 0,
//             boxShadow: state.isFocused ? 0 : 0,
//             '&:hover': {
//                 borderColor: '#526D82',
//             },
//             backgroundColor: '#fff',
//             cursor: isEditMode ? 'pointer' : 'not-allowed'
//         }),
//         valueContainer: (base) => ({
//             ...base,
//             height: '48px',
//             padding: '0 6px'
//         }),
//         dropdownIndicator: (base) => ({
//             ...base,
//             color: '#292D32',
//             padding: '0 8px',
//             alignItems: 'center',
//             svg: {
//                 width: '24px',
//                 height: '24px'
//             },
//             display: isEditMode ? 'flex' : 'none'
//         }),
//         indicatorSeparator: () => ({
//             display: 'none'
//         }),
//         placeholder: (base) => ({
//             ...base,
//             color: '#526D82',
//             fontSize: '16px'
//         }),
//         singleValue: (base) => ({
//             ...base,
//             color: '#526D82',
//             fontSize: '16px'
//         }),
//         menu: (base) => ({
//             ...base,
//             zIndex: 1000,
//             maxHeight: '150px',
//             overflowY: 'auto',
//             fontSize: '14px',
//         }),
//         option: (base, state) => ({
//             ...base,
//             backgroundColor: state.isFocused ? '#f0f0f0' : '#fff',
//             color: '#526D82',
//             '&:active': {
//                 backgroundColor: '#e6e6e6',
//             }
//         }),
//     };


//     useEffect(() => {
//             if (timetableData.length === 0) return;
//             const examOpts = Array.from(new Set(timetableData.map(i => i.exam_name)))
//                 .map(v => ({ value: v, label: v }));
//             const yearOpts = Array.from(new Set(
//                 timetableData.map(i => i.year).filter(y => y)
//             )).map(v => ({ value: v, label: String(v) }));
//             const classOpts = Array.from(new Set(timetableData.map(i => i.class)))
//                 .map(v => ({ value: v, label: String(v) }));
//             const subjOpts = Array.from(new Set(timetableData.map(i => i.subject)))
//                 .map(v => ({ value: v, label: v }));

//                 setExamOptions(examOpts);
//                 setYearOptions(yearOpts);
//                 setClassOptions(classOpts);
//                 setSubjOptions(subjOpts);

//         }, [timetableData]);


//     return (
//         <div className="AdminQuestionAssigning-edit-backdrop">
//             <div className="AdminQuestionAssigning-edit-modal-content">
//                 <div className="AdminQuestionAssigning-edit-modal-header">
//                     <p className="AdminQuestionAssigning-edit-modal-header-heading">Assign Teacher</p>
//                     <button onClick={onClose} className="AdminQuestionAssigning-edit-close-button">&times;</button>
//                 </div>
//                 <div className="AdminQuestionAssigning-edit-modal-body">
//                     <form >
//                         <Row>
//                             <Col className="AdminQuestionAssigning-edit-form-group-col" md={6}>
//                                 <div className="AdminQuestionAssigning-edit-form-group">
//                                     <label className="AdminQuestionAssigning-edit-form-label">
//                                         Select Name of Examination {isEditMode && <span className="AdminQuestionAssigning-edit-adding_required">*</span>}
//                                     </label>
//                                     <Select
//                                         placeholder=""
//                                         options={examOptions}
//                                         value={examOptions.find(o => o.value === selectedExam)}
//                                         onChange={o => {
//                                             setSelectedExam(o?.value || null);
//                                             setSelectedYear(null);
//                                             setSelectedClass(null);
//                                             setSelectedSubject(null);
//                                           }}
//                                         isDisabled={!isEditMode}
//                                         styles={customStyles}
//                                     />
//                                 </div>
//                             </Col>
//                             <Col md={6} className="AdminQuestionAssigning-edit-form-group-col">
//                                 <div className="AdminQuestionAssigning-edit-form-group">
//                                     <label className="AdminQuestionAssigning-edit-form-label">
//                                         Select Year {isEditMode && <span className="AdminQuestionAssigning-edit-adding_required">*</span>}
//                                     </label>
//                                     <Select
//                                         options={yearOptions}
//                                         value={yearOptions.find(o => o.value === selectedYear)}
//                                         onChange={o => {
//                                             setSelectedYear(o?.value || null);
//                                             setSelectedClass(null);
//                                             setSelectedSubject(null);
//                                           }}
//                                         isDisabled={!isEditMode}
//                                         styles={customStyles}
//                                     />
//                                 </div>
//                             </Col>
//                         </Row>
//                         <Row>
//                             <Col md={6} className="AdminQuestionAssigning-edit-form-group-col">
//                                 <div className="AdminQuestionAssigning-edit-form-group">
//                                     <label className="AdminQuestionAssigning-edit-form-label">
//                                         Select Class {isEditMode && <span className="AdminQuestionAssigning-edit-adding_required">*</span>}
//                                     </label>
//                                     <Select
//                                         options={classOptions}
//                                         value={classOptions.find(o => o.value === selectedClass)}
//                                         onChange={o => {
//                                             setSelectedClass(o?.value || null);
//                                             setSelectedSubject(null);
//                                           }}
//                                         isDisabled={!isEditMode}
//                                         styles={customStyles}
//                                     />
//                                 </div>
//                             </Col>
//                             <Col md={6} className="AdminQuestionAssigning-edit-form-group-col">
//                                 <div className="AdminQuestionAssigning-edit-form-group">
//                                     <label className="AdminQuestionAssigning-edit-form-label">
//                                         Select Subject {isEditMode && <span className="AdminQuestionAssigning-edit-adding_required">*</span>}
//                                     </label>
//                                     <Select
//                                         options={subjOptions}
//                                         value={subjOptions.find(o => o.value === selectedSubject)}
//                                         onChange={o => setSelectedSubject(o?.value)}

//                                         isDisabled={!isEditMode}
//                                         styles={customStyles}
//                                     />
//                                 </div>
//                             </Col>
//                         </Row>
//                         <Row>
//                             <Col md={6} className="AdminQuestionAssigning-edit-form-group-col">
//                                 <div className="AdminQuestionAssigning-edit-form-group">
//                                     <label className="AdminQuestionAssigning-edit-form-label">
//                                         Total Marks {isEditMode && <span className="AdminQuestionAssigning-edit-adding_required">*</span>}
//                                     </label>
//                                     <input
//                                         type="text"
//                                         min="0"
//                                         className="custom-input"
//                                         disabled={!isEditMode}
//                                         value={totalMarks}
//                                         onChange={e => /^\d*$/.test(e.target.value) && setTotalMarks(e.target.value)}
//                                         style={{
//                                             height: '50px',
//                                             border: '1px solid #757575',
//                                             borderRadius: '8px',
//                                             padding: '0 10px',
//                                             fontSize: '16px',
//                                             color: '#526D82',
//                                             width: '100%',
//                                             boxSizing: 'border-box',
//                                             outline: "none",
//                                             backgroundColor: '#fff',
//                                             cursor: isEditMode ? 'pointer' : 'not-allowed'
//                                         }}
//                                     />
//                                 </div>
//                             </Col>
//                             <Col md={6} className="AdminQuestionAssigning-edit-form-group-col">
//                                 <div className="AdminQuestionAssigning-edit-form-group">
//                                     <label className="AdminQuestionAssigning-edit-form-label">
//                                         Assign Teacher {isEditMode && <span className="AdminQuestionAssigning-edit-adding_required">*</span>}
//                                     </label>
//                                     <Select
//                                         options={teacherOptions}
//                                         value={teacherOptions.find(o => o.value === selectedTeacher)} 
//                                         onChange={o => setSelectedTeacher(o.value)}
//                                         isDisabled={!isEditMode}
//                                         styles={customStyles}
//                                         isClearable
//                                     />
//                                 </div>
//                             </Col>
//                         </Row>
//                         {questionPaperFile && (
//                             <Row >
//                                 <Col md={12} className="AdminQuestionAssigning-edit-form-group-col">
//                                     <label className="AdminQuestionAssigning-edit-form-label">Question Paper</label>
//                                     <div style={{
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                         border: '1px solid #757575',
//                                         borderRadius: '8px',
//                                         padding: '10px',
//                                         background: '#fff',
//                                         width: '100%',
//                                         height: '48px,'
//                                     }}>
//                                         <img src="https://cdn.jsdelivr.net/gh/edent/SuperTinyIcons/images/svg/pdf.svg" alt="PDF" style={{ width: 16, height: 20, marginRight: 12 }} />
//                                         <span style={{ flex: 1, color: '#222222', fontSize: 12 }}>{questionPaperFile.name}</span>
//                                         <span style={{
//                                             background: '#E9FFF0',
//                                             color: '#04CD47',
//                                             borderRadius: '8px',
//                                             padding: '2px 12px',
//                                             fontSize: 12,
//                                             fontWeight: 500,
//                                             border: '1px solid  #04CD47'
//                                         }}>{questionPaperFile.status}</span>
//                                     </div>
//                                 </Col>
//                             </Row>
//                         )}
//                     </form>
//                 </div>
//                 <div className="AdminQuestionAssigning-edit-modal-footer">
//                     <button onClick={handleDelete} className="AdminQuestionAssigning-edit-btn AdminQuestionAssigning-edit-btn-danger">Delete</button>
//                     <button
//                         className="AdminQuestionAssigning-edit-btn AdminQuestionAssigning-edit-btn-primary"
//                         onClick={() => {
//                             if (isEditMode) {
//                                 handleSave();
//                             } else {
//                                 setIsEditMode(true);
//                             }
//                         }}
//                     >
//                         {isEditMode ? 'Save' : 'Edit'}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminQuestionAssigningView;





import React, { useEffect, useState, useMemo } from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import './AdminQuestionassigningview.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const AdminQuestionAssigningView = ({ isOpen, onClose, selectedItem, onDeleted }) => {
    const APIURL = useSelector(state => state.APIURL.url);
    const timetableData = useSelector(s => s.timetabledataquestionpaper.list ?? []);
    console.log(timetableData, "timetableDatatimetableDatatimetableDatatimetableData")
    const teachers = useSelector(s => s.adminteacherinfo.adminteacherinfo ?? []);
    console.log(selectedItem, "selectedItemselectedItemselectedItem")
    const [isEditMode, setIsEditMode] = useState(false);
    const [questionPaperFile, setQuestionPaperFile] = useState({
        name: 'English.pdf',
        status: 'Completed',
        url: '#',
    });

    // 1. Single state object for the form
    const [formValues, setFormValues] = useState({
        exam: '',
        year: null,
        class: '',
        subject: '',
        totalMarks: '',
        teacher: null,
    });

    // 2. Initialize from selectedItem
    useEffect(() => {
        if (!selectedItem) return;
        // split "annual exam 2025" into ["annual exam","2025"]
        const m = selectedItem.exam_name.match(/^(.*)\s+(\d{4})$/);
        const examBase = m ? m[1].trim() : selectedItem.exam_name;
        const yearNum = m ? Number(m[2]) : null;

        setFormValues({
            exam: examBase,
            year: yearNum,
            class: selectedItem.class_name,
            subject: selectedItem.subject_name,
            totalMarks: selectedItem.total_marks,
            teacher: selectedItem.teacher,
        });
    }, [selectedItem]);

    // 3. Derive option lists with useMemo

    // First, normalize each item to pull out a base exam name
    const normalized = useMemo(() =>
        timetableData.map(item => ({
            ...item,
            examBase: item.exam_name.replace(/\s+\d{4}$/, '')
        })),
        [timetableData]
    );

    const examinations = useMemo(() =>
        Array.from(new Set(normalized.map(i => i.examBase)))
            .map(v => ({ value: v, label: v })),
        [normalized]
    );

    const filteredYears = useMemo(() => {
        if (!formValues.exam) return [];
        return Array.from(new Set(
            normalized
                .filter(i => i.examBase === formValues.exam)
                .map(i => i.year)
        ))
            .map(y => ({ value: y, label: String(y) }));
    }, [normalized, formValues.exam]);

    // 2) And when you build filteredClasses, make sure you pull the same string:
    const filteredClasses = useMemo(() => {
        const { exam, year } = formValues;
        if (!exam || !year) return [];

        return Array.from(
            new Set(
                normalized
                    .filter(i => i.examBase === exam && i.year === year)
                    .map(i => i.class)              // ← this is the raw "7" string
            )
        ).map(clsValue => ({
            value: clsValue,
            label:
                normalized.find(i => i.class === clsValue)?.class_name
                || `Class ${clsValue}`
        }));
    }, [normalized, formValues]);


    const filteredSubjects = useMemo(() => {
        const { exam, year, class: cls } = formValues;
        if (!exam || !year || !cls) return [];

        // pull from `i.class` and `i.subject`
        const setOfSubjects = new Set(
            normalized
                .filter(i =>
                    i.examBase === exam &&
                    i.year === year &&
                    i.class === cls
                )
                .map(i => i.subject)
        );

        return Array.from(setOfSubjects).map(subj => ({
            value: subj,
            label: subj
        }));
    }, [normalized, formValues]);


    // 4. Find the matching timetable ID on the fly
    const matched = useMemo(() =>
        normalized.find(i =>
            i.examBase === formValues.exam &&
            i.year === formValues.year &&
            i.class_name === formValues.class &&
            i.subject_name === formValues.subject
        ),
        [normalized, formValues]
    );
    const timetableId = matched?.id;

    const selectedData = useMemo(() => {
        const { exam, year, class: cls, subject } = formValues;
        if (!exam || !year || !cls || !subject) return null;
        const match = timetableData.find(item =>
          item.exam_name === exam         &&  // just the base name
          Number(item.year)   === year     &&  // numeric year
          item.class          === cls      &&  // class string, e.g. "7"
          item.subject        === subject     // subject string, e.g. "english"
        );
      
        console.log('Found match:', match);
        return match?.id ?? null;
      }, [
        timetableData,
        formValues.exam,
        formValues.year,
        formValues.class,
        formValues.subject
      ]);
      
      


    const handleSave = async () => {
        if (!isEditMode) {
            setIsEditMode(true);
            return;
        }

        if (!selectedData || !formValues.teacher || !formValues.totalMarks) {
            return Swal.fire({
                icon: 'warning',
                title: 'Missing Fields',
                text: 'Please fill out all fields before saving.'
            });
        }
        // console.log(selectedData,"selectedData || !formValues.teacher || !formValues.totalMarks")
        const formData = {
            timetable: selectedData,
            teacher: formValues.teacher,
            total_marks: formValues.totalMarks,
        };

        try {
            await axios.put(
                `${APIURL}/api/questionpaper/${selectedItem.id}`,
                formData
            );
            setIsEditMode(false);
            Swal.fire({ icon: 'success', title: 'Saved!' });
        } catch (err) {
            console.error('Error updating question paper:', err);
            Swal.fire({
                icon: 'error',
                title: 'Save failed',
                text: err.response?.data?.message || err.message,
            });
        }
    };


    const handleDelete = async () => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This will permanently delete the question paper entry.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            try {
                await axios.put(
                    `${APIURL}/api/questionpaper/${selectedItem.id}`,
                    {}
                );

                Swal.fire({
                    icon: "success",
                    title: "Deleted",
                    text: "Question paper entry has been deleted.",
                });

                onDeleted(selectedItem.id);
                onClose();
            } catch (err) {
                console.error("Delete failed", err);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: err.response?.data?.message || "Failed to delete entry.",
                });
            }
        }
    };







    const handleNumberInput = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setTotalMarks(value);
        }
    };

    const customStyles = {
        control: (base, state) => ({
            ...base,
            minHeight: '48px',
            height: '48px',
            borderRadius: '8px',
            borderColor: '#757575',
            // boxShadow: state.isFocused ? '0 0 0 1px #526D82' : 0,
            boxShadow: state.isFocused ? 0 : 0,
            '&:hover': {
                borderColor: '#526D82',
            },
            backgroundColor: '#fff',
            cursor: isEditMode ? 'pointer' : 'not-allowed'
        }),
        valueContainer: (base) => ({
            ...base,
            height: '48px',
            padding: '0 6px'
        }),
        dropdownIndicator: (base) => ({
            ...base,
            color: '#292D32',
            padding: '0 8px',
            alignItems: 'center',
            svg: {
                width: '24px',
                height: '24px'
            },
            display: isEditMode ? 'flex' : 'none'
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
            zIndex: 1000,
            maxHeight: '150px',
            overflowY: 'auto',
            fontSize: '14px',
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? '#f0f0f0' : '#fff',
            color: '#526D82',
            '&:active': {
                backgroundColor: '#e6e6e6',
            }
        }),
    };



    return (
        <div className="AdminQuestionAssigning-edit-backdrop">
            <div className="AdminQuestionAssigning-edit-modal-content">
                <div className="AdminQuestionAssigning-edit-modal-header" >
                    <p className="AdminQuestionAssigning-edit-modal-header-heading">Assign Teacher</p>
                    <button onClick={onClose} className="AdminQuestionAssigning-edit-close-button">&times;</button>
                </div>
                <div className="AdminQuestionAssigning-edit-modal-body">
                    <form >
                        <Row>
                            <Col className="AdminQuestionAssigning-edit-form-group-col" md={6}>
                                <div className="AdminQuestionAssigning-edit-form-group">
                                    <label className="AdminQuestionAssigning-edit-form-label">
                                        Select Name of Examination {isEditMode && <span className="AdminQuestionAssigning-edit-adding_required">*</span>}
                                    </label>
                                    <Select
                                        styles={customStyles}
                                        options={examinations}
                                        value={examinations.find(o => o.value === formValues.exam) || null}
                                        onChange={opt =>
                                            setFormValues(f => ({ ...f, exam: opt?.value || '' }))
                                            
                                        }
                                        isDisabled={!isEditMode}
                                        isClearable
                                    />
                                </div>
                            </Col>
                            <Col md={6} className="AdminQuestionAssigning-edit-form-group-col">
                                <div className="AdminQuestionAssigning-edit-form-group">
                                    <label className="AdminQuestionAssigning-edit-form-label">
                                        Select Year {isEditMode && <span className="AdminQuestionAssigning-edit-adding_required">*</span>}
                                    </label>
                                    <Select
                                        styles={customStyles}
                                        options={filteredYears}
                                        value={filteredYears.find(o => o.value === formValues.year) || null}
                                        onChange={opt =>
                                            setFormValues(f => ({ ...f, year: opt?.value || null }))
                                        }
                                        isDisabled={!isEditMode}
                                        isClearable
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="AdminQuestionAssigning-edit-form-group-col">
                                <div className="AdminQuestionAssigning-edit-form-group">
                                    <label className="AdminQuestionAssigning-edit-form-label">
                                        Select Class {isEditMode && <span className="AdminQuestionAssigning-edit-adding_required">*</span>}
                                    </label>
                                    <Select
                                        options={filteredClasses}
                                        value={filteredClasses.find(o => o.value === formValues.class) || null}
                                        onChange={opt =>
                                            setFormValues(f => ({ ...f, class: opt?.value || '' }))
                                        }
                                        isClearable
                                        isDisabled={!isEditMode}
                                        styles={customStyles}
                                    />

                                </div>
                            </Col>
                            <Col md={6} className="AdminQuestionAssigning-edit-form-group-col">
                                <div className="AdminQuestionAssigning-edit-form-group">
                                    <label className="AdminQuestionAssigning-edit-form-label">
                                        Select Subject {isEditMode && <span className="AdminQuestionAssigning-edit-adding_required">*</span>}
                                    </label>
                                    <Select
                                        styles={customStyles}
                                        options={filteredSubjects}
                                        value={filteredSubjects.find(o => o.value === formValues.subject) || null}
                                        onChange={opt =>
                                            setFormValues(f => ({ ...f, subject: opt?.value || '' }))
                                        }
                                        isDisabled={!isEditMode}
                                        isClearable
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="AdminQuestionAssigning-edit-form-group-col">
                                <div className="AdminQuestionAssigning-edit-form-group">
                                    <label className="AdminQuestionAssigning-edit-form-label">
                                        Total Marks {isEditMode && <span className="AdminQuestionAssigning-edit-adding_required">*</span>}
                                    </label>
                                    <input
                                        type="text"
                                        min="0"
                                        className="custom-input"
                                        style={{
                                            height: '50px',
                                            border: '1px solid #757575',
                                            borderRadius: '8px',
                                            padding: '0 10px',
                                            fontSize: '16px',
                                            color: '#526D82',
                                            width: '100%',
                                            boxSizing: 'border-box',
                                            outline: "none"
                                        }}
                                        value={formValues.totalMarks}

                                        onChange={e =>
                                            /^[0-9]*$/.test(e.target.value) &&
                                            setFormValues(f => ({ ...f, totalMarks: e.target.value }))
                                        }
                                    />
                                </div>
                            </Col>
                            <Col md={6} className="AdminQuestionAssigning-edit-form-group-col">
                                <div className="AdminQuestionAssigning-edit-form-group">
                                    <label className="AdminQuestionAssigning-edit-form-label">
                                        Assign Teacher {isEditMode && <span className="AdminQuestionAssigning-edit-adding_required">*</span>}
                                    </label>
                                    <Select
                                        options={teachers.map(t => ({
                                            value: t.id,
                                            label: `${t.first_name} ${t.last_name}`
                                        }))}
                                        value={teachers
                                            .map(t => ({ value: t.id, label: `${t.first_name} ${t.last_name}` }))
                                            .find(o => o.value === formValues.teacher) || null}
                                        onChange={opt =>
                                            setFormValues(f => ({ ...f, teacher: opt?.value || null }))
                                        }
                                        styles={customStyles}
                                        placeholder=""
                                        isClearable={true}
                                        isDisabled={!isEditMode}
                                    // onChange={(selected) => setSelectedTeacher(selected?.value || null)}
                                    />
                                </div>
                            </Col>
                        </Row>
                        {questionPaperFile && (
                            <Row>
                                <Col md={12} className="AdminQuestionAssigning-edit-form-group-col">
                                    <label className="AdminQuestionAssigning-edit-form-label">Question Paper</label>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        border: '1px solid #757575',
                                        borderRadius: '8px',
                                        padding: '10px',
                                        background: '#fff',
                                        width: '100%',
                                        height: '48px,'
                                    }}>
                                        <img src="https://cdn.jsdelivr.net/gh/edent/SuperTinyIcons/images/svg/pdf.svg" alt="PDF" style={{ width: 16, height: 20, marginRight: 12 }} />
                                        <span style={{ flex: 1, color: '#222222', fontSize: 12 }}>{questionPaperFile.name}</span>
                                        <span style={{
                                            background: '#E9FFF0',
                                            color: '#04CD47',
                                            borderRadius: '8px',
                                            padding: '2px 12px',
                                            fontSize: 12,
                                            fontWeight: 500,
                                            border: '1px solid  #04CD47'
                                        }}>{questionPaperFile.status}</span>
                                    </div>
                                </Col>
                            </Row>
                        )}
                    </form>
                </div>
                <div className="AdminQuestionAssigning-edit-modal-footer">
                    <button onClick={handleDelete} className="AdminQuestionAssigning-edit-btn AdminQuestionAssigning-edit-btn-danger">Delete</button>
                    <button
                        className="AdminQuestionAssigning-edit-btn AdminQuestionAssigning-edit-btn-primary"
                        onClick={() => {
                            if (isEditMode) {
                                handleSave();
                            } else {
                                setIsEditMode(true);
                            }
                        }}
                    >
                        {isEditMode ? 'Save' : 'Edit'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminQuestionAssigningView;