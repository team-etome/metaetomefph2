import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import './newlokalibraryedit.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { FaTrash, FaRedo } from "react-icons/fa";
import CreatableSelect from 'react-select/creatable';
import { BiBorderRadius } from 'react-icons/bi';

const NewLokaLibraryEdit = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    const APIURL = useSelector((state) => state.APIURL.url);
    const admin_id = useSelector((state) => state.admininfo.admininfo?.admin_id);
    console.log(admin_id, "admin_id dattatata");

    const [apicomingcatogory, setApiComingCatogory] = useState([]);
    const [category, setCategory] = useState(null); // only dropdown
    const [categoryValue, setCategoryValue] = useState(null);
    const [inputValue, setInputValue] = useState("");


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


    const customStyles = {
        control: (base, state) => ({
            ...base,
            minHeight: '50px',
            height: '50px',
            borderColor: '#ccc',
            borderRadius:'8px',
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
        <div className="lokalibraryedit-backdrop">
            <div className="lokalibraryedit-modal-content">
                <div className="lokalibraryedit-modal-header">
                    <p className="lokalibraryedit-modal-header-heading">Add Books</p>
                    <button onClick={onClose} className="lokalibraryedit-close-button">&times;</button>
                </div>
                <div className="lokalibraryedit-modal-body">
                    <form>
                        <div className="lokalibraryedit-form-grid" >
                            <div className="lokalibraryedit-form-group">
                                <label className="lokalibraryedit-form-label">
                                    Add Category <span className="lokalibraryedit_required">*</span>
                                </label>
                                <CreatableSelect
                                    // value={categoryValue}
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
                            <div className="lokalibraryedit-form-group">
                                <label className="lokalibraryedit-form-label">
                                    Title 
                                </label>
                                <input
                                    type="text"
                                    className="custom-input"
                                />
                            </div>
                            <div className="lokalibraryedit-form-group">
                                <label className="lokalibraryedit-form-label">
                                    Author Name 
                                </label>
                                <input
                                    type="text"
                                    className="custom-input"
                                />
                            </div>
                            <div className="lokalibraryedit-form-group">
                                <label className="lokalibraryedit-form-label">
                                    Publisher Name
                                </label>
                                <input
                                    type="text"
                                    className="custom-input"
                                />
                            </div>
                            <div className="lokalibraryedit-form-group lokalibraryedit-form-group--full">
                                <label className="lokalibraryedit-form-label">
                                    Add cover Photo
                                </label>
                                <div className="admin_library_image_upload_container_div">
                                    <div className="admin_library_image_upload_container" >
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
                                                    />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lokalibraryedit-form-group lokalibraryedit-form-group--full">
                                <div className="lokalibraryedit_chapter-upload-wrapper">
                                    <label className="lokalibraryedit_chapter-upload-label">
                                        Uploaded Document
                                    </label>
                                    <div className="lokalibraryedit_custom-file-upload">
                                        {documentFile ? (
                                            <>
                                                <span>{documentFile.name}</span>
                                                <button style={{ marginLeft: "8px" }}>
                                                    Change File
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <label htmlFor="file-upload" className="lokabookedit_upload-btn">
                                                    Choose File
                                                </label>
                                                <input
                                                    id="file-upload"
                                                    type="file"
                                                    className="lokalibraryedit_hidden-file"
                                                />
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="lokalibraryedit-modal-footer">
                    <button onClick={onClose} className="lokalibraryedit-btn lokalibraryedit_chapter-upload-delete">Delete</button>
                    <button className="lokalibraryedit-btn lokalibraryedit-btn-primary">Edit</button>
                </div>
            </div>
        </div>
    );
};

export default NewLokaLibraryEdit;