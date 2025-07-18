import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import './newlokabookedit.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { FaTrash, FaRedo } from "react-icons/fa";


const NewLokaBookEdit = ({ isOpen, onClose, onSuccess }) => {

    if (!isOpen) return null;
    const APIURL = useSelector((state) => state.APIURL.url);
    // console.log(APIURL,"apiurl dattatata")
    const admin_id = useSelector((state) => state.admininfo.admininfo?.admin_id);
    const admininfo = useSelector((state) => state.admininfo);
    const [volume, setVolume] = useState('');
    const [textbookname, setTextBookName] = useState('');
    const [publisherOptions, setPublisherOptions] = useState([]);
    const [mediumOptions, setMediumOptions] = useState([]);
    const [classOptions, setClassOptions] = useState([]);
    const [subjectOptions, setSubjectOptions] = useState([]);
    const [id, setId] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [isEditMode, setIsEditMode] = useState(false);

    const [selectedPublisher, setSelectedPublisher] = useState(null);
    const [selectedMedium, setSelectedMedium] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);

    const selectedTextbook = useSelector((state) => state.selectedTextbook.selectedTextbook);
    const [imageData, setImageData] = useState({ file: null, preview: null });
    const [chapterCount, setChapterCount] = useState(0);
    const [chapters, setChapters] = useState([]);
    console.log(selectedTextbook, "selectedTextbook dattatatatta coming   ")
    useEffect(() => {
        if (selectedTextbook) {
            setTextBookName(selectedTextbook.textbook_details.text_name || "");
            setVolume(selectedTextbook.textbook_details.volume || "");

            setSelectedMedium({
                label: selectedTextbook.textbook_details.medium,
                value: selectedTextbook.textbook_details.medium
            });

            setSelectedPublisher({
                label: selectedTextbook.textbook_details.publisher_name,
                value: selectedTextbook.textbook_details.publisher_name
            });

            setSelectedClass({
                label: selectedTextbook.textbook_details.class_name,
                value: selectedTextbook.textbook_details.class_name
            });

            setSelectedSubject({
                label: selectedTextbook.textbook_details.subject,
                value: selectedTextbook.textbook_details.subject
            });

            const chapterList = selectedTextbook.chapters?.chapters || [];
            setChapterCount(chapterList.length);
            const mappedChapters = chapterList.map(ch => ({
                name: ch.chapter_name || '',
                file: null,
                previewUrl: ch.textbook_pdf || '',
            }));
            setChapters(mappedChapters);
            setId(selectedTextbook.textbook_details.id)
        }
        if (
            selectedTextbook &&
            selectedTextbook.textbook_details &&
            selectedTextbook.textbook_details.textbook_front_page
        ) {
            setImageData({
                file: null,
                preview: selectedTextbook.textbook_details.textbook_front_page,
            });
        }

    }, [selectedTextbook]);

    const handleCountChange = (e) => {
        const count = parseInt(e.target.value, 10);
        setChapterCount(count);

        if (!isNaN(count)) {
            const newChapters = Array.from({ length: count }, (_, i) => ({
                name: "",
                file: null,
            }));
            setChapters(newChapters);
        } else {
            setChapters([]);
        }
    };

    useEffect(() => {
        if (admininfo?.admininfo?.medium) {
            const mediums = JSON.parse(admininfo.admininfo.medium);
            setMediumOptions(mediums.map(m => ({ value: m, label: m })));
        }
        if (admininfo?.admininfo?.publisher_name) {
            setPublisherOptions(admininfo.admininfo.publisher_name.map(p => ({ value: p, label: p })));
        }
    }, [admininfo]);

    const handleChapterChange = (index, field, value) => {
        const updated = [...chapters];
        updated[index][field] = value; // field = 'name' or 'file'
        setChapters(updated);
    };

    const handleDelete = (index) => {
        const updated = chapters.filter((_, i) => i !== index);
        setChapters(updated);
        setChapterCount(updated.length);
    };
    const handleDeleteChapter = index => {
        const updated = chapters.filter((_, i) => i !== index);
        setChapters(updated);
        setChapterCount(updated.length);
    };

    // Function to validate PDF file
    const validatePDFFile = (file) => {
        if (!file) return false;
        return file.type === 'application/pdf';
    };

    // Function to check if all required fields are filled
    const isFormComplete = () => {
        if (!isEditMode) return true; // If not in edit mode, consider form complete
        
        if (!selectedClass || !selectedSubject || !selectedMedium || !selectedPublisher) {
            return false;
        }
        if (!textbookname || textbookname.trim() === '') {
            return false;
        }
        if (!imageData.preview && !imageData.file) {
            return false;
        }
        if (chapterCount === 0 || chapters.length === 0) {
            return false;
        }
        
        // Check if chapters have names and files (either uploaded or existing)
        const invalidChapters = chapters.filter((chapter, index) => {
            return !chapter.name || chapter.name.trim() === '' || (!chapter.file && !chapter.previewUrl) || (chapter.file && !validatePDFFile(chapter.file));
        });
        
        return invalidChapters.length === 0;
    };

    const handleSave = async () => {
        // Prevent multiple submissions
        if (isLoading) {
            return;
        }

        // Validate all required fields except volume when in edit mode
        if (isEditMode) {
            const missingFields = [];
            
            if (!selectedClass) {
                missingFields.push('Class');
            }
            if (!selectedSubject) {
                missingFields.push('Subject');
            }
            if (!selectedMedium) {
                missingFields.push('Medium');
            }
            if (!selectedPublisher) {
                missingFields.push('Publisher Name');
            }
            if (!textbookname || textbookname.trim() === '') {
                missingFields.push('Textbook Name');
            }
            if (!imageData.preview && !imageData.file) {
                missingFields.push('Cover Photo');
            }
            if (chapterCount === 0 || chapters.length === 0) {
                missingFields.push('Chapters');
            }
            
            // Check if chapters have names and files (either uploaded or existing)
            const invalidChapters = chapters.filter((chapter, index) => {
                return !chapter.name || chapter.name.trim() === '' || (!chapter.file && !chapter.previewUrl) || (chapter.file && !validatePDFFile(chapter.file));
            });
            
            if (invalidChapters.length > 0) {
                missingFields.push('Chapter details (names and PDF files)');
            }
            
            if (missingFields.length > 0) {
                Swal.fire({
                    title: 'Required Fields Missing',
                    text: `Please fill in the following fields: ${missingFields.join(', ')}.`,
                    icon: 'warning',
                    confirmButtonText: 'OK'
                });
                return;
            }
        }

        setIsLoading(true);

        const formData = new FormData();
        const classNameOnly = selectedClass.label.split(' ')[0];
        formData.append("class_name", classNameOnly);
        formData.append("text_name", textbookname);
        const subjectNameOnly = selectedClass.subjectList[0].subject;
        formData.append("subject", subjectNameOnly);
        formData.append("medium", selectedMedium.value);
        formData.append("publisher_name", selectedPublisher.value);
        formData.append("volume", volume);
        formData.append("admin", admin_id);

        if (imageData.file) {
            formData.append("textbook_front_page", imageData.file);
        }

        chapters.forEach((chapter, index) => {
            formData.append(`chapters[${index}][name]`, chapter.name);

            if (chapter.file) {
                formData.append(`chapters[${index}][pdfFile]`, chapter.file);
            } else if (chapter.previewUrl) {
                const fileName = decodeURIComponent(
                    chapter.previewUrl.split("/").pop().split("?")[0]
                );
                formData.append(`chapters[${index}][pdfFile]`, fileName);
            }
        });


        try {
            const response = await axios.put(
                `${APIURL}/api/admin-create-textbook/${id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Textbook updated successfully!",
                confirmButtonText: "OK"
            }).then(() => {
                onClose();
                onSuccess();
            });

        } catch (error) {
            console.error("Error saving data:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.response?.data?.error || "Something went wrong while saving.",
                confirmButtonText: "OK"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleNumberInput = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setTotalMarks(value);
        }
    };


    useEffect(() => {
        const fetchClassData = async () => {
            try {
                const response = await axios.get(`${APIURL}/api/addClassname/${admin_id}`);

                const formatted = response.data.map(cls => {
                    const classDetails = cls.classes[0]; // Get the inner class object
                    return {
                        value: classDetails.class_id,
                        label: cls.class_name,
                        subjectList: classDetails.curriculum || []  // Correct access
                    };
                });

                setClassOptions(formatted);
            } catch (error) {
                console.error('Failed to fetch class data', error);
                Swal.fire({ icon: 'error', title: 'Error', text: 'Unable to load class list.' });
            }
        };

        fetchClassData();
    }, [APIURL, admin_id]);

    const handleClassChange = (selected) => {
        setSelectedClass(selected);

        if (selected?.subjectList?.length) {
            const subjects = selected.subjectList.map(c => ({
                subject: c.subject,
                subject_id: c.subject_id
            }));

            const uniqueSubjectsMap = new Map();
            subjects.forEach(s => {
                if (!uniqueSubjectsMap.has(s.subject_id)) {
                    uniqueSubjectsMap.set(s.subject_id, s.subject);
                }
            });

            const uniqueSubjectOptions = Array.from(uniqueSubjectsMap, ([value, label]) => ({
                value,
                label
            }));

            setSubjectOptions(uniqueSubjectOptions);
        } else {
            setSubjectOptions([]);
        }

        setSelectedSubject(null);
    };
    const handleChapterCountChange = (e) => {
        const count = parseInt(e.target.value, 10);
        setChapterCount(count);

        setChapters((prev) => {
            let updated = [...prev];
            while (updated.length < count) {
                updated.push({ name: "", file: null, previewUrl: "" });
            }
            return updated.slice(0, count);
        });
    };

    const lokaeditcustomStyles = {
    control: (base, state) => ({
      ...base,
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
    menu: (base) => ({
      ...base,
      zIndex: 1000,
      maxHeight: '150px',
      overflowY: 'auto',
      fontSize: '14px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      marginTop: '4px'
    }),
    menuList: (base) => ({
      ...base,
      maxHeight: '150px',
      padding: '4px 0'
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

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Optionally, revoke the previous URL if needed to avoid memory leaks
            if (imageData.preview && imageData.preview.startsWith("blob:")) {
                URL.revokeObjectURL(imageData.preview);
            }
            const previewUrl = URL.createObjectURL(file);
            setImageData({ file, preview: previewUrl });
        }
    };

    const clearImageFile = () => {
        setImageData({ file: null, preview: null });
    };


    const handleDeleteTextbook = async () => {
        if (!selectedTextbook?.textbook_details.id) {
            Swal.fire({ icon: 'warning', title: 'No Textbook', text: 'No textbook selected to delete.' });
            return;
        }

        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This will permanently delete the textbook.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        });

        if (!confirm.isConfirmed) return;

        try {
            const formData = new FormData();
            formData.append("admin", admin_id);
            formData.append("pk", selectedTextbook.textbook_details.id);
            formData.append("delete", true);

            await axios.delete(`${APIURL}/api/admin-create-textbook/${selectedTextbook.textbook_details.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "The textbook has been deleted.",
                confirmButtonText: "OK"
            }).then(() => {
                onClose();
                onSuccess();
            });

        } catch (error) {
            console.error("Error deleting textbook:", error);
            Swal.fire({
                icon: "error",
                title: "Delete Failed",
                text: error.response?.data?.error || "Something went wrong.",
            });
        }
    };

    // Function to handle PDF file upload for chapters
    const handleChapterFileUpload = (index, file) => {
        if (!file) return;
        
        if (file.type !== 'application/pdf') {
            Swal.fire({
                icon: 'error',
                title: 'Invalid File Type',
                text: 'Please upload only PDF files for chapters.',
                confirmButtonText: 'OK'
            });
            return;
        }
        
        const updated = [...chapters];
        updated[index].file = file;
        setChapters(updated);
    };


    return (
        <div className="lokatextbookedit-backdrop">
            <div className="lokatextbookedit-modal-content">
                <div className="lokatextbookedit-modal-header">
                    <p className="lokatextbookadd-modal-header-heading">Edit Textbook</p>
                    <button onClick={onClose} className="lokatextbookedit-close-button">&times;</button>
                </div>
                <div className="lokatextbookedit-modal-body">
                    <form>
                        <div className="lokatextbookedit-form-grid">
                            <div className="lokatextbookedit-form-group" >
                                <label className="lokatextbookedit-form-label" >
                                    Select Class {isEditMode && (
                                        <span className="lokatextbookadd_required">*</span>
                                    )}
                                </label>
                                <Select
                                    options={classOptions}
                                    styles={lokaeditcustomStyles}
                                    placeholder=""
                                    isClearable={true}
                                    readOnly={!isEditMode}  
                                    value={selectedClass}
                                    onChange={handleClassChange}
                                />
                            </div>

                            <div className="lokatextbookedit-form-group">
                                <label className="lokatextbookedit-form-label">Select Medium</label>
                                <Select
                                    options={mediumOptions}
                                    styles={lokaeditcustomStyles}
                                    placeholder=""
                                    isClearable={true}
                                    readOnly={!isEditMode}  
                                    value={selectedMedium}
                                    onChange={setSelectedMedium}
                                />
                            </div>

                            <div className="lokatextbookedit-form-group">
                                <label className="lokatextbookedit-form-label">
                                    Select Subject  {isEditMode && (
                                        <span className="lokatextbookadd_required">*</span>
                                    )}</label>
                                <Select
                                    options={subjectOptions}
                                    styles={lokaeditcustomStyles}
                                    placeholder=""
                                    isClearable={true}
                                    readOnly={!isEditMode}  
                                    value={selectedSubject}
                                    onChange={setSelectedSubject}
                                />
                            </div>

                            <div className="lokatextbookedit-form-group">
                                <label className="lokatextbookedit-form-label">Textbook Name</label>

                                <input
                                    type="text"
                                    min="0"
                                    className="custom-input"
                                    style={{
                                        height: '48px',
                                        border: '1px solid #757575',
                                        borderRadius: '8px',
                                        padding: '0 8px',
                                        fontSize: '16px',
                                        color: '#526D82',
                                        width: '100%',
                                        boxSizing: 'border-box',
                                        outline: "none"
                                    }}
                                    value={textbookname}
                                    readOnly={!isEditMode}  
                                    onChange={e => setTextBookName(e.target.value)}
                                />
                            </div>

                            <div className="lokatextbookedit-form-group">
                                <label className="lokatextbookedit-form-label">Volume</label>
                                <input
                                    type="text"
                                    min="0"
                                    className="custom-input"
                                    style={{
                                        height: '48px',
                                        border: '1px solid #757575',
                                        borderRadius: '8px',
                                        padding: '0 10px',
                                        fontSize: '16px',
                                        color: '#526D82',
                                        width: '100%',
                                        boxSizing: 'border-box',
                                        outline: "none"
                                    }}
                                    value={volume}
                                    readOnly={!isEditMode}  
                                    onChange={e => setVolume(e.target.value)}
                                />
                            </div>

                            <div className="lokatextbookedit-form-group">
                                <label className="lokatextbookedit-form-label">Publisher Name</label>
                                <Select
                                    options={publisherOptions}
                                    styles={lokaeditcustomStyles}
                                    placeholder=""
                                    value={selectedPublisher}
                                    readOnly={!isEditMode}  
                                    isClearable={true}
                                    onChange={setSelectedPublisher}
                                />
                            </div>

                            <div className="lokatextbookedit-form-group lokatextbookedit-form-group--full">
                                <label className="lokatextbookedit-form-label">Add cover Photo</label>
                                <div>
                                    <label htmlFor="photo" style={{}}></label>
                                    <div className="admin_textbook_image_upload_container">
                                        <div className="admin_textbook_upload_placeholder">
                                            {imageData.preview ? (
                                                <>
                                                    <img
                                                        src={imageData.preview}
                                                        alt="Uploaded Image"
                                                        className="uploaded_image"
                                                        style={{ width: "100%", height: "200px", marginLeft: "30px", objectFit: "cover" }}
                                                    />
                                                    
                                                        <button
                                                            type="button"
                                                            onClick={clearImageFile}
                                                            readOnly={!isEditMode}
                                                            style={{
                                                                border: "none",
                                                                background: "none",
                                                                cursor: "pointer",
                                                                marginLeft: "8px"
                                                            }}
                                                            title="Change Image"
                                                        >
                                                            <label htmlFor="image-upload" style={{ cursor: "pointer" }}>
                                                                <FaRedo
                                                                    style={{ color: "blue", fontSize: "20px" }}
                                                                    title="Change Image"
                                                                />
                                                            </label>
                                                        </button>
                                            
                                                </>
                                            ) : (
                                                <>
                                                    <label htmlFor="image-upload" className="admin_textbook_upload_label">
                                                        Upload Image
                                                    </label>
                                                    <input
                                                        id="image-upload"
                                                        type="file"
                                                        accept="image/*"
                                                        className="admin_textbook_upload_input"
                                                        onChange={handleImageUpload}
                                                    />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="lokatextbookedit-form-group lokatextbookedit-form-group--full">
                                <div className="lokatextbookedit_chapter-upload-wrapper">
                                    <label className="lokatextbookedit_chapter-upload-label">Number of Chapters</label>
                                    <input
                                        type="number"
                                        value={chapterCount}
                                        readOnly={!isEditMode}  
                                        onChange={handleChapterCountChange}
                                        className="lokatextbookedit_chapter-upload-input"
                                    />

                                    <div
                                        className="lokatextbookedit_chapter-upload-scroll-area"
                                        style={{
                                            maxHeight: chapterCount > 5 ? "300px" : "auto",
                                            overflowY: chapterCount > 5 ? "auto" : "visible",
                                            border: "2px solid black"
                                        }}

                                    >
                                        {chapters.map((chapter, index) => (
                                            <div className="lokatextbookedit_chapter-upload-row" key={index} >
                                                <input
                                                    type="text"
                                                    className="lokatextbookedit_chapter-upload-text"
                                                    placeholder="Enter Chapter Name"
                                                    value={chapter.name}
                                                    readOnly={!isEditMode}  
                                                    onChange={(e) => handleChapterChange(index, "name", e.target.value)}
                                                />
                                                <div className="lokatextbookedit_custom-file-upload">
                                                    <label htmlFor={`file-upload-${index}`} className="lokatextbookedit_upload-btn">
                                                        Choose File
                                                    </label>
                                                    <input
                                                        id={`file-upload-${index}`}
                                                        type="file"
                                                        accept=".pdf"
                                                        className="lokatextbookedit_hidden-file"
                                                        readOnly={!isEditMode}  
                                                        onChange={(e) => {
                                                            if (isEditMode) {
                                                                handleChapterFileUpload(index, e.target.files[0]);
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                <div className="lokatextbookedit_file-name-display">
                                                    {chapter.file ? (
                                                        chapter.file.name
                                                    ) : chapter.previewUrl ? (
                                                        <>
                                                            <a
                                                                href={chapter.previewUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                {decodeURIComponent(
                                                                    chapter.previewUrl
                                                                        .split("/")
                                                                        .pop()
                                                                        .split("?")[0]
                                                                )}
                                                            </a>
                                                            {isEditMode && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        const updated = [...chapters];
                                                                        updated[index].previewUrl = "";
                                                                        setChapters(updated);
                                                                    }}
                                                                    readOnly={!isEditMode}  
                                                                    style={{
                                                                        background: "none",
                                                                        border: "none",
                                                                        padding: 0,
                                                                        marginLeft: 8,
                                                                        cursor: isEditMode ? "pointer" : "not-allowed",
                                                                        opacity: isEditMode ? 1 : 0.5,
                                                                    }}
                                                                    title="Replace PDF"
                                                                >
                                                                    <FaRedo color="blue" />
                                                                </button>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <span>&nbsp;</span>
                                                    )}
                                                </div>
                                                <button
                                                    className="lokatextbookedit_chapter-upload-delete"
                                                    readOnly={!isEditMode}  
                                                    onClick={() => handleDelete(index)}
                                                >
                                                    <FaTrash />
                                                </button>

                                            </div>

                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                {/* <div className="lokatextbookedit-modal-footer">
                    <button onClick={handleDeleteTextbook} className="lokatextbookedit-btn lokatextbookedit-btn-danger">Delete</button>
                    <button onClick={onClose} className="lokatextbookedit-btn lokatextbookedit-btn-secondary">Clear</button>
                    <button onClick={handleSave} className="lokatextbookedit-btn lokatextbookedit-btn-primary">Save</button>
                </div> */}
                <div className="lokatextbookedit-modal-footer">
                    <button
                        type="button"
                        className="lokatextbookedit-btn lokatextbookedit-btn-danger"
                        onClick={() => {
                            if (isEditMode) {
                                // resetForm();
                                setIsEditMode(false);
                            } else {
                                handleDeleteTextbook();
                            }
                        }}
                        style={{
                            color: !isEditMode ? 'red' : '#2162B2',
                            borderColor: !isEditMode ? 'red' : '#2162B2',
                        }}
                    >
                        {isEditMode ? 'Clear' : 'Delete'}
                    </button>

                    <button
                        type="button"
                        className="lokatextbookedit-btn lokatextbookedit-btn-primary"
                        disabled={isLoading}
                        onClick={() => {
                            if (isEditMode) {
                                handleSave();
                            } else {
                                setIsEditMode(true);
                            }
                        }}
                        style={{
                            backgroundColor: isEditMode && isFormComplete() && !isLoading ? '#2162B2' : '#bcbcbc',
                            color: '#fff',
                            border: isEditMode && isFormComplete() && !isLoading ? '1px solid #2162B2' : '1px solid #bcbcbc',
                            cursor: isEditMode && isFormComplete() && !isLoading ? 'pointer' : 'not-allowed'
                        }}
                    >
                        {isEditMode ? (isLoading ? 'Saving...' : 'Save') : 'Edit'}
                    </button>

                </div>
            </div>
        </div >
    );
};

export default NewLokaBookEdit;