import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import './newlokalibraryadd.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { FaTrash, FaRedo } from "react-icons/fa";
import CreatableSelect from 'react-select/creatable';

const NewLokaLibraryAdd = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    const APIURL = useSelector((state) => state.APIURL.url);
    const admin_id = useSelector((state) => state.admininfo.admininfo?.admin_id);
    console.log(admin_id, "admin_id dattatata");

    const [apicomingcatogory, setApiComingCatogory] = useState([]);
    const [category, setCategory] = useState(null); // only dropdown
    const [title, setTitle] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [publisherName, setPublisherName] = useState('');
    const [categoryValue, setCategoryValue] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Use one state for the cover image
    const [coverPhoto, setCoverPhoto] = useState(null);
    // Use one state for the PDF document
    const [documentFile, setDocumentFile] = useState(null);

    // Clear functions to reset the file states
    const clearCoverPhoto = () => {
        setCoverPhoto(null);
    };

    const clearDocumentFile = () => {
        setDocumentFile(null);
    };

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`${APIURL}/api/category/${admin_id}`);
                const catOptions = response.data.categories.map((cat) =>
                    typeof cat === 'string'
                      ? { value: cat, label: cat }
                      : { value: cat.id, label: cat.name }
                  );
                  setApiComingCatogory(catOptions);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
    }, [APIURL, admin_id]);

    const handleSave = async () => {
        if (!category || !title || !authorName || !publisherName || !coverPhoto || !documentFile) {
            Swal.fire({
                icon: "warning",
                title: "Missing Fields",
                text: "Please select all fields before submitting.",
                confirmButtonText: "OK",
            });
            return;
        }

        const formData = new FormData();
        formData.append('admin_id', admin_id);
        formData.append('category', category);
        formData.append('text_name', title);
        formData.append('author_name', authorName);
        formData.append('publisher_name', publisherName);
        formData.append('textbook_front_page', coverPhoto);
        formData.append('textbook_pdf', documentFile);

        try {
            const response = await axios.post(`${APIURL}/api/create-textbook/`, formData);

            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Textbook created successfully!",
                confirmButtonText: "OK"
            }).then(() => {
                onClose(); // close modal after OK
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
            color: '#000',
            '&:active': {
                backgroundColor: '#e6e6e6',
            }
        }),
    };

    return (
        <div className="lokalibraryadd-backdrop">
            <div className="lokalibraryadd-modal-content">
                <div className="lokalibraryadd-modal-header">
                    <h5>Add Books</h5>
                    <button onClick={onClose} className="lokalibraryadd-close-button">&times;</button>
                </div>
                <div className="lokalibraryadd-modal-body">
                    <form>
                        <Row>
                            <Col md={6}>
                                <div className="lokalibraryadd-form-group">
                                    <label className="lokalibraryadd-form-label">Add Category</label>
                                    <CreatableSelect
                                        value={categoryValue}
                                        inputValue={inputValue}
                                        options={apicomingcatogory}
                                        styles={customStyles}
                                        placeholder=""
                                        isClearable={true}
                                        onInputChange={(newInputValue, actionMeta) => {
                                            setInputValue(newInputValue);
                                            return newInputValue;
                                        }}
                                        onChange={(selected) => {
                                            setCategory(selected ? selected.value : "");
                                            setCategoryValue(selected);
                                            setInputValue("");
                                        }}
                                        onCreateOption={(inputText) => {
                                            const newOption = { value: inputText, label: inputText };
                                            setCategory(newOption.value);
                                            setCategoryValue(newOption);
                                            setInputValue("");
                                        }}
                                        onBlur={() => {
                                            if (inputValue && !categoryValue) {
                                                const newOption = { value: inputValue, label: inputValue };
                                                setCategory(newOption.value);
                                                setCategoryValue(newOption);
                                                setInputValue("");
                                            }
                                        }}
                                    />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="lokalibraryadd-form-group">
                                    <label className="lokalibraryadd-form-label">Title</label>
                                    <input
                                        type="text"
                                        className="custom-input"
                                        value={title}
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
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <div className="lokalibraryadd-form-group">
                                    <label className="lokalibraryadd-form-label">Author Name</label>
                                    <input
                                        type="text"
                                        className="custom-input"
                                        value={authorName}
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
                                        onChange={(e) => setAuthorName(e.target.value)}
                                    />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="lokalibraryadd-form-group">
                                    <label className="lokalibraryadd-form-label">Publisher Name</label>
                                    <input
                                        type="text"
                                        className="custom-input"
                                        value={publisherName}
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
                                        onChange={(e) => setPublisherName(e.target.value)}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <div className="lokalibraryadd-form-group">
                                    <label className="lokalibraryadd-form-label">Add cover Photo</label>
                                    <div>
                                        <label htmlFor="photo" style={{}}></label>
                                        <div className="admin_library_image_upload_container">
                                            <div className="admin_library_upload_placeholder">
                                                {coverPhoto ? (
                                                    <>
                                                        <img
                                                            src={URL.createObjectURL(coverPhoto)}
                                                            alt="Uploaded Image"
                                                            className="uploaded_image"
                                                            style={{
                                                                width: "100%",
                                                                height: "200px",
                                                                marginLeft: "30px",
                                                            }}
                                                        />
                                                        <button
                                                            onClick={clearCoverPhoto}
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
                                                            className="admin_library_upload_label"
                                                        >
                                                            Upload Image
                                                        </label>
                                                        <input
                                                            id="image-upload"
                                                            type="file"
                                                            accept="image/*"
                                                            className="admin_library_upload_input"
                                                            onChange={(e) => setCoverPhoto(e.target.files[0])}
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
                                <div className="lokalibraryadd-form-group">
                                    <div className="lokalibraryadd_chapter-upload-wrapper">
                                        <label className="lokalibraryadd_chapter-upload-label">Uploaded Document</label>
                                        <div className="lokalibraryadd_custom-file-upload">
                                            {documentFile ? (
                                                <>
                                                    <span>{documentFile.name}</span>
                                                    <button onClick={clearDocumentFile} style={{ marginLeft: "8px" }}>
                                                        Change File
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <label htmlFor="file-upload" className="lokabook_upload-btn">
                                                        Choose File
                                                    </label>
                                                    <input
                                                        id="file-upload"
                                                        type="file"
                                                        className="lokalibraryadd_hidden-file"
                                                        onChange={(e) => setDocumentFile(e.target.files[0])}
                                                    />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </form>
                </div>
                <div className="lokalibraryadd-modal-footer">
                    <button onClick={onClose} className="lokalibraryadd-btn lokalibraryadd-btn-secondary">Clear</button>
                    <button onClick={handleSave} className="lokalibraryadd-btn lokalibraryadd-btn-primary">Save</button>
                </div>
            </div>
        </div>
    );
};

export default NewLokaLibraryAdd;