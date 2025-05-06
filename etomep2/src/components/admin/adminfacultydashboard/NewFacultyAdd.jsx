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

    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [employeeid, setEmployeeId] = useState("");
    const [gender, setGender] = useState(null);
    const [phoneno, setPhoneNo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageFile, setImageFile] = useState(null);

    const handleSave = async () => {
        const validationErrors = [];

        if (!firstname) validationErrors.push("First name is required.");
        if (!gender?.value) validationErrors.push("Gender is required.");
        if (!email) validationErrors.push("Email is required.");
        if (!password) validationErrors.push("Password is required.");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            validationErrors.push("Please enter a valid email address.");
        }

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
        if (imageFile) formData.append("profile_photo", imageFile);

        try {
            const response = await axios.post(`${APIURL}/api/addteacher`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.data.message === "Teacher added successfully") {
                Swal.fire("Success", "Faculty added successfully", "success");
                onFacultyAdded?.();
                onClose();
            } else {
                Swal.fire("Error", response.data.message || "Something went wrong", "error");
            }
        } catch (error) {
            Swal.fire("Error", error.response?.data?.message || "Server error occurred", "error");
        }
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
        indicatorSeparator: () => ({ display: 'none' }),
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
                    <form>
                        <Row>
                            <Col md={6}>
                                <div className="facultyadd-form-group">
                                    <label className="facultyadd-form-label">First Name <span className="facultyadd_required">*</span></label>
                                    <input type="text" value={firstname} onChange={(e) => setFirstName(e.target.value)} className="custom-input" />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="facultyadd-form-group">
                                    <label className="facultyadd-form-label">Last Name</label>
                                    <input type="text" value={lastname} onChange={(e) => setLastName(e.target.value)} className="custom-input" />
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <div className="facultyadd-form-group">
                                    <label className="facultyadd-form-label">Employee ID</label>
                                    <input type="text" value={employeeid} onChange={(e) => setEmployeeId(e.target.value)} className="custom-input" />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="facultyadd-form-group">
                                    <label className="facultyadd-form-label">Gender <span className="facultyadd_required">*</span></label>
                                    <Select
                                        styles={customStyles}
                                        placeholder="Select Gender"
                                        isClearable
                                        value={gender}
                                        onChange={setGender}
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
                                    <input type="text" value={phoneno} onChange={(e) => setPhoneNo(e.target.value)} className="custom-input" />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="facultyadd-form-group">
                                    <label className="facultyadd-form-label">Email ID<span className="facultyadd_required">*</span></label>
                                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="custom-input" />
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={12}>
                                <div className="facultyadd-form-group">
                                    <label className="facultyadd-form-label">Password<span className="facultyadd_required">*</span></label>
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="custom-input" />
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={12}>
                                <div className="facultyadd-form-group">
                                    <label className="facultyadd-form-label">Add Cover Photo</label>
                                    <div className="admin_faculty_image_upload_container">
                                        <div className="admin_faculty_upload_placeholder">
                                            {imageFile ? (
                                                <img src={URL.createObjectURL(imageFile)} alt="Uploaded" className="uploaded_image" />
                                            ) : (
                                                <>
                                                    <label htmlFor="image-upload" className="admin_faculty_upload_label">Upload Image</label>
                                                    <input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="admin_faculty_upload_input" />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </form>
                </div>

                <div className="facultyadd-modal-footer">
                    <button onClick={onClose} className="facultyadd-btn facultyadd-btn-secondary">Clear</button>
                    <button onClick={handleSave} className="facultyadd-btn facultyadd-btn-primary">Save</button>
                </div>
            </div>
        </div>
    );
};

export default NewFacultyAdd;
