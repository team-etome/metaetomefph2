import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import './newlokabookadd.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { FaTrash, FaRedo } from "react-icons/fa";


const NewLokaBookAdd = ({ isOpen, onClose }) => {

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

    const [selectedPublisher, setSelectedPublisher] = useState(null);
    const [selectedMedium, setSelectedMedium] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);

    const [imageFile, setImageFile] = useState(null);
    const [chapterCount, setChapterCount] = useState(0);
    const [chapters, setChapters] = useState([]);

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
        updated[index][field] = value;
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


    const handleSave = async () => {
        if (!selectedClass || !selectedSubject || !selectedMedium || !selectedPublisher) {
            Swal.fire({ icon: 'warning', title: 'Missing Fields', text: 'Please select all fields.' });
            return;
        }

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

        if (imageFile) {
            formData.append("textbook_front_page", imageFile);
        }

        chapters.forEach((chapter, index) => {
            formData.append(`chapters[${index}][name]`, chapter.name);
            if (chapter.file) {
                formData.append(`chapters[${index}][pdfFile]`, chapter.file);
            }
        });

        try {
            const response = await axios.post(
                `${APIURL}/api/admin-create-textbook/${admin_id}`,
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
                text: "Textbook added successfully!",
                confirmButtonText: "OK"
            }).then(() => {
                onClose();
            });

        } catch (error) {
            console.error("Error saving data:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.response?.data?.error || "Something went wrong while saving.",
                confirmButtonText: "OK"
            });
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
                const formatted = response.data.map(cls => ({
                    value: cls.class,
                    label: `${cls.class_name} ${cls.division}`,
                    subjectList: cls.curriculum,
                }));
                setClassOptions(formatted);
            } catch (error) {
                console.error('Failed to fetch class data');
                Swal.fire({ icon: 'error', title: 'Error', text: 'Unable to load class list.' });
            }
        };
        fetchClassData();
    }, [APIURL, admin_id]);

    const handleClassChange = selected => {
        setSelectedClass(selected);
        if (selected?.subjectList) {
            setSubjectOptions(selected.subjectList.map(s => ({ value: s.subject_id, label: s.subject })));
        } else {
            setSubjectOptions([]);
        }
        setSelectedSubject(null);
    };
    const handleChapterCountChange = e => {
        const count = parseInt(e.target.value, 10);
        setChapterCount(count);
        if (!isNaN(count)) {
            const newChapters = Array.from({ length: count }, () => ({ name: '', file: null }));
            setChapters(newChapters);
        } else {
            setChapters([]);
        }
    };

    const customStyles = {
        control: (base, state) => ({
            ...base,
            minHeight: '50px',
            height: '50px',
            borderColor: '#ccc',
            boxShadow: state.isFocused ? '0 0 0 1px #526D82' : 0,
            '&:hover': {
                borderColor: '#526D82',
            }
        }),
        valueContainer: (base) => ({
            ...base,
            height: '50px',
            padding: '0 6px'
        }),
        dropdownIndicator: (base) => ({
            ...base,
            color: '#292D32', // Change the color of the dropdown arrow
            padding: '0 8px',
            alignItems: 'center',
            svg: {
                width: '24px',
                height: '24px'
            }
        }),
        indicatorSeparator: () => ({
            display: 'none' // This removes the line (separator) before the dropdown arrow
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
    const handleImageUpload = (e) => {
        console.log(e.target.files[0],"e.target.files[0]e.target.files[0]")
        setImageFile(e.target.files[0]);
    };
    const clearImageFile = () => {
        setImageFile(null);
    };

    return (
        <div className="lokatextbookadd-backdrop">
            <div className="lokatextbookadd-modal-content">
                <div className="lokatextbookadd-modal-header">
                    <h5>Add Textbook</h5>
                    <button onClick={onClose} className="lokatextbookadd-close-button">&times;</button>
                </div>
                <div className="lokatextbookadd-modal-body">
                    <form>
                        <Row>
                            <Col md={6} >
                                <div className="lokatextbookadd-form-group" >
                                    <label className="lokatextbookadd-form-label" >Select Class</label>
                                    <Select
                                        options={classOptions}
                                        styles={customStyles}
                                        placeholder=""
                                        isClearable={true}
                                        onChange={handleClassChange}
                                    />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="lokatextbookadd-form-group">
                                    <label className="lokatextbookadd-form-label">Select Medium</label>
                                    <Select
                                        options={mediumOptions}
                                        styles={customStyles}
                                        placeholder=""
                                        isClearable={true}
                                        onChange={setSelectedMedium}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <div className="lokatextbookadd-form-group">
                                    <label className="lokatextbookadd-form-label">Select Subject</label>
                                    <Select
                                        options={subjectOptions}
                                        styles={customStyles}
                                        placeholder=""
                                        isClearable={true}
                                        onChange={setSelectedSubject}
                                    />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="lokatextbookadd-form-group">
                                    <label className="lokatextbookadd-form-label">Textbook Name</label>
                                    {/* <Select
                                        options={textbook}
                                        styles={customStyles}
                                        placeholder=""
                                        isClearable={true}
                                        value={filteredSubjects.find(opt => opt.value === selectedSubject)}
                                        onChange={(selected) => setTextbook(selected?.value || null)}
                                    /> */}
                                    <input
                                        type="text"
                                        min="0"
                                        className="custom-input"
                                        style={{
                                            height: '50px',
                                            border: '1px solid #ccc',
                                            borderRadius: '4px',
                                            padding: '0 10px',
                                            fontSize: '16px',
                                            color: '#526D82',
                                            width: '100%',
                                            boxSizing: 'border-box',
                                            outline: "none"
                                        }}
                                        onChange={e => setTextBookName(e.target.value)}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <div className="lokatextbookadd-form-group">
                                    <label className="lokatextbookadd-form-label">Volume</label>
                                    <input
                                        type="text"
                                        min="0"
                                        className="custom-input"
                                        style={{
                                            height: '50px',
                                            border: '1px solid #ccc',
                                            borderRadius: '4px',
                                            padding: '0 10px',
                                            fontSize: '16px',
                                            color: '#526D82',
                                            width: '100%',
                                            boxSizing: 'border-box',
                                            outline: "none"
                                        }}
                                        onChange={e => setVolume(e.target.value)}
                                    />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="lokatextbookadd-form-group">
                                    <label className="lokatextbookadd-form-label">Publisher Name</label>
                                    <Select
                                        options={publisherOptions}
                                        styles={customStyles}
                                        placeholder=""
                                        isClearable={true}
                                        onChange={setSelectedPublisher}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <div className="lokatextbookadd-form-group">
                                    <label className="lokatextbookadd-form-label">Add cover Photo</label>
                                    <div>
                                        <label htmlFor="photo" style={{}}></label>
                                        <div className="admin_textbook_image_upload_container">
                                            <div className="admin_textbook_upload_placeholder">
                                                {imageFile ? (
                                                    <>
                                                        <img
                                                            src={URL.createObjectURL(imageFile)}
                                                            alt="Uploaded Image"
                                                            className="uploaded_image"
                                                            style={{
                                                                width: "100%",
                                                                height: "200px",
                                                                marginLeft: "30px",
                                                            }}
                                                        />
                                                        <button
                                                            onClick={clearImageFile}
                                                            style={{
                                                                border: "none",
                                                                background: "none",
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            <FaRedo
                                                                style={{
                                                                    color: "blue",
                                                                    fontSize: "20px",
                                                                }}
                                                                title="Change Image"
                                                            />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <label
                                                            htmlFor="image-upload"
                                                            className="admin_textbook_upload_label"
                                                        >
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
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <div className="lokatextbookadd-form-group">
                                    <div className="lokatextbookadd_chapter-upload-wrapper">
                                        <label className="lokatextbookadd_chapter-upload-label">Number of Chapters</label>
                                        <input
                                            type="number"
                                            value={chapterCount}
                                            onChange={handleChapterCountChange}
                                            className="lokatextbookadd_chapter-upload-input"
                                        />

                                        <div
                                            className="lokatextbookadd_chapter-upload-scroll-area"
                                            style={{
                                                maxHeight: chapterCount > 5 ? "300px" : "auto",
                                                overflowY: chapterCount > 5 ? "auto" : "visible",
                                                border: "2px solid black"
                                            }}

                                        >
                                            {chapters.map((chapter, index) => (
                                                <div className="lokatextbookadd_chapter-upload-row" key={index} >
                                                    <input
                                                        type="text"
                                                        className="lokatextbookadd_chapter-upload-text"
                                                        placeholder="Enter Chapter Name"
                                                        value={chapter.name}
                                                        onChange={(e) =>
                                                            handleChapterChange(index, "name", e.target.value)
                                                        }
                                                    />
                                                    <div className="lokatextbookadd_custom-file-upload">
                                                        <label htmlFor={`file-upload-${index}`} className="lokabook_upload-btn" >
                                                            Choose File
                                                        </label>
                                                        <input
                                                            id={`file-upload-${index}`}
                                                            type="file"
                                                            className="lokatextbookadd_hidden-file"
                                                            onChange={(e) =>
                                                                handleChapterChange(index, "file", e.target.files[0])
                                                            }
                                                        />
                                                    </div>

                                                    <div className="lokatextbookadd_file-name-display">
                                                        {chapter.file ? chapter.file.name : <span>&nbsp;</span>}
                                                    </div>

                                                    <button
                                                        className="lokatextbookadd_chapter-upload-delete"
                                                        onClick={() => handleDelete(index)}
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>

                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </form>
                </div>
                <div className="lokatextbookadd-modal-footer">
                    <button onClick={onClose} className="lokatextbookadd-btn lokatextbookadd-btn-secondary">Clear</button>
                    <button onClick={handleSave} className="lokatextbookadd-btn lokatextbookadd-btn-primary">Save</button>
                </div>
            </div>
        </div>
    );
};

export default NewLokaBookAdd;