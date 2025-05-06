import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import './newfacultyadd.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { FaTrash, FaRedo } from "react-icons/fa";

const NewFacultyAdd = ({ isOpen, onClose, onFacultyAdded }) => {
    if (!isOpen) return null;

    const APIURL = useSelector((state) => state.APIURL.url);
    const admin_id = useSelector((state) => state.admininfo.admininfo?.admin_id);

    const admininfo = useSelector((state) => state.admininfo);

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        employeeid: "",
        gender: null,
        phoneno: "",
        email: "",
        password: "",
        imageFile: null
    });

    const [phoneCode, setPhoneCode] = useState("+91");

    const resetForm = () => {
        setFormData({
            firstname: "",
            lastname: "",
            employeeid: "",
            gender: null,
            phoneno: "",
            email: "",
            password: "",
            imageFile: null
        });
    };

    const handleInputChange = (field, value) => {
        if (field === 'firstname' || field === 'lastname') {
            value = value.charAt(0).toUpperCase() + value.slice(1);
        }
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };


    const handleSave = async () => {
        const validationErrors = [];


        if (!formData.firstname) validationErrors.push("First name is required.");
        if (!formData.gender?.value) validationErrors.push("Gender is required.");
        if (!formData.email) validationErrors.push("Email is required.");
        if (!formData.password) validationErrors.push("Password is required.");


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailRegex.test(formData.email)) {
            validationErrors.push("Please enter a valid email address.");
        }


        // Phone number format (optional field)
        if (formData.phoneno && formData.phoneno.length !== 10) {

            validationErrors.push("Phone number must be 10 digits.");
        }

        if (validationErrors.length > 0) {
            Swal.fire("Validation Error", validationErrors[0], "warning");
            return;
        }


        const formDataToSend = new FormData();
        formDataToSend.append("admin_id", admin_id);
        formDataToSend.append("first_name", formData.firstname);
        formDataToSend.append("last_name", formData.lastname);
        formDataToSend.append("employee_id", formData.employeeid);
        formDataToSend.append("gender", formData.gender?.value);
        formDataToSend.append("phone_number", formData.phoneno);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("password", formData.password);
        if (formData.imageFile) formDataToSend.append("profile_photo", formData.imageFile);

        try {
            const response = await axios.post(`${APIURL}/api/addteacher`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }

            });

            if (response.data.message === "Teacher added successfully") {
                Swal.fire("Success", "Faculty added successfully", "success");

                resetForm();

                onFacultyAdded?.();
                onClose();
            } else {
                Swal.fire("Error", response.data.message || "Something went wrong", "error");
            }
        } catch (error) {
            Swal.fire("Error", error.response?.data?.message || "Server error occurred", "error");
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                Swal.fire("Error", "Image size should be less than 5MB", "error");
                return;
            }
            setFormData(prev => ({
                ...prev,
                imageFile: file
            }));
        }
    };

    const clearImageFile = () => {
        setFormData(prev => ({
            ...prev,
            imageFile: null
        }));
    };


    const customStyles = {
        control: (base, state) => ({
            ...base,
            minHeight: '48px',
            height: '48px',
            borderRadius: '8px',
            borderColor: '#757575',
            boxShadow: state.isFocused ? '0 0 0 1px #526D82' : 0,
            '&:hover': { borderColor: '#526D82' }
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
            color: '#526D82',
            '&:active': {
                backgroundColor: '#e6e6e6',
            }
        }),

    };

    const handleImageUpload = (e) => setImageFile(e.target.files[0]);
    const clearImageFile = () => setImageFile(null);

    return (
        <div className="facultyadd-backdrop">
            <div className="facultyadd-modal-content">
                <div className="facultyadd-modal-header">
                    <p className="lokatextbookadd-modal-header-heading">Add Faculty</p>
                    <button onClick={onClose} className="facultyadd-close-button">&times;</button>
                </div>

                <div className="facultyadd-modal-body">

                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="lokatextbookadd-form-grid">
                            <div className="facultyadd-form-group">
                                <label className="facultyadd-form-label">
                                    First Name <span className="facultyadd_required">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.firstname}
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
                                    onChange={(e) => handleInputChange('firstname', e.target.value)}
                                />
                            </div>
                            <div className="facultyadd-form-group">
                                <label className="facultyadd-form-label">Last Name</label>
                                <input
                                    type="text"
                                    value={formData.lastname}
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
                                    onChange={(e) => handleInputChange('lastname', e.target.value)}
                                />
                            </div>
                            <div className="facultyadd-form-group">
                                <label className="facultyadd-form-label">Employee ID</label>
                                <input
                                    type="text"
                                    value={formData.employeeid}
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
                                    onChange={(e) => handleInputChange('employeeid', e.target.value)}
                                />
                            </div>
                            <div className="facultyadd-form-group">
                                <label className="facultyadd-form-label">
                                    Gender <span className="facultyadd_required">*</span>
                                </label>
                                <Select
                                    styles={customStyles}
                                    placeholder="Select Gender"
                                    isClearable={true}
                                    value={formData.gender}
                                    onChange={(selectedOption) => handleInputChange('gender', selectedOption)}
                                    options={[
                                        { value: "Male", label: "Male" },
                                        { value: "Female", label: "Female" },
                                        { value: "Other", label: "Other" }
                                    ]}
                                />
                            </div>
                            <div className="facultyadd-form-group">
                                <label className="facultyadd-form-label">Phone Number</label>
                                <div className="facultyadd-phone-container">
                                    <select
                                        className="facultyadd-phone-select"
                                        value={phoneCode}
                                        onChange={(e) => setPhoneCode(e.target.value)}
                                    >
                                        <option value="+91">+91</option>
                                        <option value="+1">+1</option>
                                        <option value="+44">+44</option>
                                        {/* Add more country codes as needed */}
                                    </select>
                                    <input
                                        type="text"
                                        value={formData.phoneno}
                                        className="facultyadd-phone-input"
                                        onChange={(e) => handleInputChange('phoneno', e.target.value)}
                                        maxLength={10}
                                        style={{ borderLeft: 'none' }}
                                    />
                                </div>
                            </div>
                            <div className="facultyadd-form-group">
                                <label className="facultyadd-form-label">
                                    Email ID <span className="facultyadd_required">*</span>
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
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
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                />
                            </div>
                        </div>


                        <Row>
                            <Col md={12}>
                                <div className="facultyadd-form-group">

                                    <label className="facultyadd-form-label">
                                        Password <span className="facultyadd_required">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        value={formData.password}
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
                                        onChange={(e) => handleInputChange('password', e.target.value)}
                                    />

                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={12}>
                                <div className="facultyadd-form-group">

                                    <label className="facultyadd-form-label">Add cover Photo</label>
                                    <div>
                                        <div className="admin_faculty_image_upload_container">
                                            <div className="admin_faculty_upload_placeholder">
                                                {formData.imageFile ? (
                                                    <div className="image-preview-container">
                                                        <img
                                                            src={URL.createObjectURL(formData.imageFile)}
                                                            alt="Uploaded Image"
                                                            className="uploaded_image"
                                                            style={{
                                                                maxWidth: '100%',
                                                                maxHeight: '200px',
                                                                objectFit: 'contain'
                                                            }}
                                                        />
                                                        <button
                                                            className="clear-image-btn"
                                                            onClick={clearImageFile}
                                                            title="Remove Image"
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <label
                                                            htmlFor="image-upload"
                                                            className="admin_faculty_upload_label"
                                                        >
                                                            Upload Image
                                                        </label>
                                                        <input
                                                            id="image-upload"
                                                            type="file"
                                                            accept="image/*"
                                                            className="admin_faculty_upload_input"
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
                    </form>
                </div>

                <div className="facultyadd-modal-footer">

                    <button
                        onClick={() => {
                            Swal.fire({
                                title: 'Are you sure?',
                                text: "All entered data will be lost!",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Yes, clear it',
                                cancelButtonText: 'Cancel'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    resetForm();
                                    onClose();
                                }
                            });
                        }}
                        className="facultyadd-btn facultyadd-btn-secondary"
                    >
                        Clear
                    </button>

                    <button onClick={handleSave} className="facultyadd-btn facultyadd-btn-primary">Save</button>
                </div>
            </div>
        </div>
    );
};

export default NewFacultyAdd;
