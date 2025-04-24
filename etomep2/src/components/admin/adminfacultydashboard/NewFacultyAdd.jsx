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
    // console.log(APIURL,"apiurl dattatata")
    const admin_id = useSelector((state) => state.admininfo.admininfo?.admin_id);
    const admininfo = useSelector((state) => state.admininfo);
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [employeeid, setEmployeeId] = useState("");
    const [gender, setGender] = useState(null);
    const [phoneno, setPhoneNo] = useState("");
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);


    const [imageFile, setImageFile] = useState(null);


    console.log(phoneno, "phone number")


    const handleSave = async () => {
        const validationErrors = [];

        if (!firstname.trim()) validationErrors.push("First name is required.");
        if (!gender?.value) validationErrors.push("Gender is required.");
        if (!email.trim()) validationErrors.push("Email is required.");
        if (!password.trim()) validationErrors.push("Password is required.");

        // Email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            validationErrors.push("Please enter a valid email address.");
        }

        // Phone number format (optional field)
        if (phoneno && phoneno.length !== 10) {
            validationErrors.push("Phone number must be 10 digits.");
        }

        if (validationErrors.length > 0) {
            Swal.fire("Validation Error", validationErrors[0], "warning");
            return;
        }

        const formData = new FormData();
        formData.append("admin_id", admin_id);
        formData.append("first_name", firstname);
        formData.append("last_name", lastname);
        formData.append("employee_id", employeeid);
        formData.append("gender", gender?.value);
        formData.append("phone_number", phoneno);
        formData.append("email", email);
        formData.append("password", password);
        if (imageFile) formData.append("photo", imageFile);

        console.log(formData, "formdataa")

        try {
            const response = await axios.post(`${APIURL}/api/addteacher`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.message === "Teacher added successfully") {
                Swal.fire("Success", "Faculty added successfully", "success");
                onFacultyAdded?.();  // ✅ refresh list in parent
                onClose();           // ✅ close modal
            } else {
                Swal.fire("Error", response.data.message || "Something went wrong", "error");
            }
        } catch (error) {
            console.error("Error while saving faculty:", error);
            Swal.fire("Error", error.response?.data?.message || "Server error occurred", "error");
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
        console.log(e.target.files[0], "e.target.files[0]e.target.files[0]")
        setImageFile(e.target.files[0]);
    };
    const clearImageFile = () => {
        setImageFile(null);
    };

    return (
        <div className="facultyadd-backdrop">
            <div className="facultyadd-modal-content">
                <div className="facultyadd-modal-header">
                    <h5>Add Faculty</h5>
                    <button onClick={onClose} className="facultyadd-close-button">&times;</button>
                </div>
                <div className="facultyadd-modal-body">
                    <form>
                        <Row>
                            <Col md={6} >
                                <div className="facultyadd-form-group" >
                                    <label className="facultyadd-form-label" >
                                        First Name <span className="facultyadd_required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={firstname}
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
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            const formatted = value.charAt(0).toUpperCase() + value.slice(1);
                                            setFirstName(formatted);
                                        }}
                                    />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="facultyadd-form-group">
                                    <label className="facultyadd-form-label">Last Name</label>
                                    <input
                                        type="text"
                                        value={lastname}
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
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            const formatted = value.charAt(0).toUpperCase() + value.slice(1);
                                            setLastName(formatted);
                                        }}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <div className="facultyadd-form-group">
                                    <label className="facultyadd-form-label">Employee ID</label>
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
                                        onChange={e => setEmployeeId(e.target.value)}
                                    />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="facultyadd-form-group">
                                    <label className="facultyadd-form-label">
                                        Gender<span className="facultyadd_required">*</span>
                                    </label>
                                    <Select
                                        styles={customStyles}
                                        placeholder="Select Gender"
                                        isClearable={true}
                                        value={gender}
                                        onChange={(selectedOption) => setGender(selectedOption)}
                                        options={[
                                            { value: "Male", label: "Male" },
                                            { value: "Female", label: "Female" },
                                            { value: "Other", label: "Other" }
                                        ]}
                                    />

                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <div className="facultyadd-form-group">
                                    <label className="facultyadd-form-label">Phone Number</label>
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
                                        onChange={e => setPhoneNo(e.target.value)}
                                    />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="facultyadd-form-group">
                                    <label className="facultyadd-form-label">
                                        Email ID<span className="facultyadd_required">*</span>
                                    </label>
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
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <div className="facultyadd-form-group">
                                    <label className="facultyadd-form-label">
                                        Password<span className="facultyadd_required">*</span>
                                    </label>
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
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <div className="facultyadd-form-group">
                                    <label className="facultyadd-form-label">Add cover Photo</label>
                                    <div>
                                        <label htmlFor="photo" style={{}}></label>
                                        <div className="admin_faculty_image_upload_container">
                                            <div className="admin_faculty_upload_placeholder">
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
                                    onClose(); // ✅ only close if user confirms
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