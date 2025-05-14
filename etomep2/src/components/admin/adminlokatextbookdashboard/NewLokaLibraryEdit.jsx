import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import './newlokalibraryedit.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { FaTrash, FaRedo, FaTimes } from "react-icons/fa";
import CreatableSelect from 'react-select/creatable';
import { BiBorderRadius } from 'react-icons/bi';

const NewLokaLibraryEdit = ({ isOpen, onClose, onUpdated }) => {
    if (!isOpen) return null;
    const APIURL = useSelector((state) => state.APIURL.url);
    const admin_id = useSelector((state) => state.admininfo.admininfo?.admin_id);
    // console.log(APIURL,"APIURLAPIURLAPIURLAPIURLAPIURL")
    console.log(admin_id, "admin_id dattatata");
    const selected = useSelector((state) => state.SelectedLibrary.selectedLibrary);
    const apicomingcatogory = useSelector(
        (state) => state.AdminLibraryCategories.list
    );
    //  console.log(apicomingcatogory,"apicomingcatogoryapicomingcatogoryapicomingcatogory")

    console.log(selected, "sljhfuhsbgfuvohsdfguhvbeyufdgveyfdgubeudshbfeurbg")

    // const [apicomingcatogory, setApiComingCatogory] = useState([]);
    const [category, setCategory] = useState(null); // only dropdown
    const [categoryValue, setCategoryValue] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [coverPhoto, setCoverPhoto] = useState(null);
    const [documentFile, setDocumentFile] = useState(null);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publisher, setPublisher] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const [coverFile, setCoverFile] = useState(null); // for FormData for feont page 



    useEffect(() => {
        if (selected) {
            setTitle(selected.text_name || '');
            setAuthor(selected.author_name || '');
            setPublisher(selected.publisher_name || '');
            setCoverFile(selected.textbook_image || '');
            setDocumentFile(selected.textbook_pdf || '');
            // For your CreatableSelect, categoryValue needs the shape { label, value }:
            setCategoryValue(
                selected.category
                    ? { label: selected.category, value: selected.category }
                    : null
            );
        }
    }, [selected]);

    const resetForm = () => {
        if (!selected) return;
        setTitle(selected.text_name || '');
        setAuthor(selected.author_name || '');
        setPublisher(selected.publisher_name || '');
        setCoverFile(selected.textbook_image || '');
        setDocumentFile(selected.textbook_pdf || '');
        setCategoryValue(
            selected.category
                ? { label: selected.category, value: selected.category }
                : null
        );
    };
    useEffect(resetForm, [selected]);



    const handleEditSubmit = async () => {
        // 1) Validate all required fields
        // if (
        //     !categoryValue?.value ||
        //     !title ||
        //     !author ||
        //     !publisher ||
        //     !coverFile ||
        //     !documentFile
        // ) {
        //     Swal.fire({
        //         icon: 'warning',
        //         title: 'Missing Fields',
        //         text: 'Please fill out all fields and select both files.',
        //     });
        //     return;
        // }

        // 2) Build FormData
        const formData = new FormData();
        formData.append('admin_id', admin_id);
        formData.append('id', selected.id);
        formData.append('category', categoryValue.value);
        formData.append('text_name', title);
        formData.append('author_name', author);
        formData.append('publisher_name', publisher);
        formData.append('textbook_front_page', coverFile);
        formData.append('textbook_pdf', documentFile);

        try {
            // 3) Send multipart/form-d
            await axios.put(
                `${APIURL}/api/create-textbook/${selected.id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            await Swal.fire({
                icon: 'success',
                title: 'Updated!',
                text: 'Book details have been saved.',
            });

            // onClose();
            onUpdated();
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.response?.data?.error || 'Failed to update the book.',
            });
        }
    };


    // at top of NewLokaLibraryEdit
const handleDelete = async () => {
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: 'This will permanently delete the book.',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel',
    });
    if (!result.isConfirmed) return;
  
    try {
      await axios.delete(`${APIURL}/api/create-textbook/${selected.id}`);
      await Swal.fire('Deleted!', 'The book has been removed.', 'success');
    //   onClose();
    onUpdated();
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Could not delete the book.', 'error');
    }
  };
  



    // Clear functions to reset the file states
    const clearCoverPhoto = () => {
        setCoverFile(null);
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
            borderRadius: '8px',
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
            },
            display: isEditMode ? 'flex' : 'none',
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


    const getFileNameFromUrl = (input) => {
        if (!input) return '';
        if (typeof input === 'string') {
            const [path] = input.split('?');
            return path.split('/').pop();
        }
        if (input instanceof File) {
            return input.name;
        }
        return '';
    };


    return (
        <div className="lokalibraryedit-backdrop">
            <div className="lokalibraryedit-modal-content">
                <div className="lokalibraryedit-modal-header">
                    <p className="lokalibraryedit-modal-header-heading">Edit Books</p>
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
                                    value={categoryValue}
                                    inputValue={inputValue}
                                    options={apicomingcatogory.map((c) => ({ label: c, value: c }))}
                                    styles={customStyles}
                                    placeholder=""
                                    isDisabled={!isEditMode}
                                    isClearable
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
                                    disabled={!isEditMode}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="lokalibraryedit-form-group">
                                <label className="lokalibraryedit-form-label">
                                    Author Name
                                </label>
                                <input
                                    type="text"
                                    className="custom-input"
                                    value={author}
                                    disabled={!isEditMode}
                                    onChange={(e) => setAuthor(e.target.value)}
                                />
                            </div>
                            <div className="lokalibraryedit-form-group">
                                <label className="lokalibraryedit-form-label">
                                    Publisher Name
                                </label>
                                <input
                                    type="text"
                                    className="custom-input"
                                    value={publisher}
                                    disabled={!isEditMode}
                                    onChange={(e) => setPublisher(e.target.value)}
                                />
                            </div>
                            <div className="lokalibraryedit-form-group lokalibraryedit-form-group--full">
                                <label className="lokalibraryedit-form-label">
                                    Add cover Photo
                                </label>
                                <div className="admin_library_image_upload_container_div">
                                    <div className="admin_library_image_upload_container" >
                                        <div className="admin_library_upload_placeholder">
                                            {coverFile ? (
                                                <>
                                                    <img
                                                        src={
                                                            coverFile instanceof File
                                                                ? URL.createObjectURL(coverFile) // only for File
                                                                : coverFile                     // raw URL string
                                                        }
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
                                                        disabled={!isEditMode}
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
                                                        disabled={!isEditMode}
                                                        className="admin_library_upload_input"
                                                        onChange={(e) => setCoverFile(e.target.files[0])}
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
                                                <div >
                                                    <img src="https://cdn.jsdelivr.net/gh/edent/SuperTinyIcons/images/svg/pdf.svg" alt="PDF" style={{ width: 16, height: 20, marginRight: 12 }} />
                                                    <span>{getFileNameFromUrl(documentFile)}</span>
                                                    <button
                                                        onClick={() => setDocumentFile('')}
                                                        disabled={!isEditMode}
                                                        style={{
                                                            marginLeft: 8,
                                                            color: "black",
                                                            width: 24,
                                                            height: 24,
                                                            padding: 0,
                                                            background: 'transparent',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        <FaTimes size={12} />
                                                    </button>
                                                </div>

                                            </>
                                        ) : (
                                            <>
                                                <label htmlFor="file-upload" className="lokabookedit_upload-btn">
                                                    Choose File
                                                </label>
                                                <input
                                                    id="file-upload"
                                                    type="file"
                                                    disabled={!isEditMode}
                                                    className="lokalibraryedit_hidden-file"
                                                    onChange={(e) => setDocumentFile(e.target.files[0])}
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
                    <button
                        type="button"
                        className="lokalibraryedit-btn lokalibraryedit_chapter-upload-delete"
                        onClick={() => {
                            if (isEditMode) {
                                resetForm();
                                setIsEditMode(false);
                            } else {
                                handleDelete();
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
                        className="lokalibraryedit-btn lokalibraryedit-btn-primary"
                        onClick={() => {
                            if (isEditMode) {
                                handleEditSubmit();
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

export default NewLokaLibraryEdit;