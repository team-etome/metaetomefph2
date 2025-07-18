import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import './newstudentadd.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { FaTrash, FaRedo } from "react-icons/fa";
import { useDispatch } from 'react-redux';

// onStudentAdded

const NewStudentAdd = ({ isOpen, onClose, onStudentAdded, studentToEdit }) => {
    if (!isOpen) return null;

    const APIURL = useSelector((state) => state.APIURL.url);
    const teacher = useSelector((state) => state.teacherinfo);
    console.log(teacher, "teacher")
    const teacher_id = teacher.teacherinfo?.teacher_id;
    console.log(teacher_id, "teacher_idteacher_idteacher_idteacher_id")

    const [formData, setFormData] = useState({
        studentname: "",
        rollno: "",
        employeeid: "",
        dateofbirth: "",
        joiningdate: "",
        admissionno: "",
        fathername: "",
        mothername: "",
        guardian: "",
        address: "",
        gender: null,
        phoneno: "",
        email: "",
        password: "",
        imageFile: null
    });

    const [imageUrl, setImageUrl] = useState("");

    const [phoneCode, setPhoneCode] = useState("+91");

    const [initialData, setInitialData] = useState(null);
    const [isFormComplete, setIsFormComplete] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (studentToEdit) {
            setFormData({
                studentname: studentToEdit.student_name || "",
                rollno: studentToEdit.roll_no || "",
                employeeid: studentToEdit.employeeid || "",
                dateofbirth: studentToEdit.dob || "",
                joiningdate: studentToEdit.start_date || "",
                admissionno: studentToEdit.admission_no || "",
                fathername: studentToEdit.fathers_name || "",
                mothername: studentToEdit.mothers_name || "",
                guardian: studentToEdit.guardian || "",
                address: studentToEdit.address || "",
                gender: studentToEdit.gender ? { value: studentToEdit.gender, label: studentToEdit.gender } : null,
                phoneno: studentToEdit.number || "",
                email: studentToEdit.email || "",
                password: "",
                imageFile: null
            });
            setImageUrl(studentToEdit.image || "");
            setInitialData({
                studentname: studentToEdit.student_name || "",
                rollno: studentToEdit.roll_no || "",
                employeeid: studentToEdit.employeeid || "",
                dateofbirth: studentToEdit.dob || "",
                joiningdate: studentToEdit.start_date || "",
                admissionno: studentToEdit.admission_no || "",
                fathername: studentToEdit.fathers_name || "",
                mothername: studentToEdit.mothers_name || "",
                guardian: studentToEdit.guardian || "",
                address: studentToEdit.address || "",
                gender: studentToEdit.gender ? { value: studentToEdit.gender, label: studentToEdit.gender } : null,
                phoneno: studentToEdit.number || "",
                email: studentToEdit.email || "",
                password: "",
                imageFile: null
            });
        } else {
            setImageUrl("");
            setInitialData(null);
            setIsFormComplete(false);
        }
    }, [studentToEdit]);

    // Monitor form changes and update completion status
    useEffect(() => {
        const isComplete = checkFormCompletion(formData);
        setIsFormComplete(isComplete);
    }, [formData]);

    const resetForm = () => {
        setFormData({
            studentname: "",
            rollno: "",
            employeeid: "",
            dateofbirth: "",
            joiningdate: "",
            admissionno: "",
            fathername: "",
            mothername: "",
            guardian: "",
            address: "",
            gender: null,
            phoneno: "",
            email: "",
            password: "",
            imageFile: null
        });
        setIsFormComplete(false);
    };

    // Function to check if all required fields are filled
    const checkFormCompletion = (data) => {
        const requiredFields = [
            'studentname',
            'rollno', 
            'phoneno',
            'email',
            'gender',
            'dateofbirth',
            'joiningdate',
            'admissionno',
            'fathername',
            'mothername',
            'guardian',
            'address'
        ];

        const isComplete = requiredFields.every(field => {
            if (field === 'gender') {
                return data[field] && data[field].value;
            }
            return data[field] && data[field].toString().trim() !== '';
        });

        // Additional validation for email format and phone number length
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailValid = data.email && emailRegex.test(data.email);
        const isPhoneValid = data.phoneno && data.phoneno.length === 10;

        return isComplete && isEmailValid && isPhoneValid;
    };

    // const handleInputChange = (field, value) => {
    //     if (field === 'firstname' || field === 'lastname') {
    //         value = value.charAt(0).toUpperCase() + value.slice(1);
    //     }
    //     setFormData(prev => ({
    //         ...prev,
    //         [field]: value
    //     }));
    // };

    function getChangedFields(formData, initialData) {
        // Map frontend keys to backend keys
        const fieldMap = {
            studentname: 'student_name',
            admissionno: 'admission_no',
            rollno: 'roll_no',
            phoneno: 'number',
            email: 'email',
            gender: 'gender',
            dateofbirth: 'dob',
            joiningdate: 'start_date',
            fathername: 'fathers_name',
            mothername: 'mothers_name',
            address: 'address',
            guardian: 'guardian',
            imageFile: 'image',
        };
        const changed = {};
        Object.keys(formData).forEach(key => {
            if (!(key in fieldMap)) return; // Only use mapped fields
            if (key === "gender") {
                if ((formData.gender?.value || "") !== (initialData.gender?.value || "")) {
                    changed[fieldMap[key]] = formData.gender?.value || "";
                }
            } else if (formData[key] !== initialData[key]) {
                changed[fieldMap[key]] = formData[key];
            }
        });
        return changed;
    }

    const handleSave = async () => {
        setIsSaving(true);
        
        const validationErrors = [];

        if (!formData.studentname) validationErrors.push("Student name is required.");
        if (!formData.rollno) validationErrors.push("Roll number is required.");
        if (!formData.phoneno) validationErrors.push("Phone number is required.");
        if (!formData.email) validationErrors.push("Email is required.");
        if (!formData.gender?.value) validationErrors.push("Gender is required.");
        if (!formData.dateofbirth) validationErrors.push("Date of birth is required.");
        if (!formData.joiningdate) validationErrors.push("Joining date is required.");
        if (!formData.admissionno) validationErrors.push("Admission number is required.");
        if (!formData.fathername) validationErrors.push("Father's name is required.");
        if (!formData.mothername) validationErrors.push("Mother's name is required.");
        if (!formData.guardian) validationErrors.push("Guardian name is required.");
        if (!formData.address) validationErrors.push("Address is required.");

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailRegex.test(formData.email)) {
            validationErrors.push("Please enter a valid email address.");
        }

        // Phone number length
        if (formData.phoneno && formData.phoneno.length !== 10) {
            validationErrors.push("Phone number must be 10 digits.");
        }

        if (validationErrors.length > 0) {
            Swal.fire({
                icon: "warning",
                title: "Validation Error",
                html: `
                    <div style="text-align: left;">
                        <p style="margin-bottom: 10px; font-weight: bold;">Please fill in the following required fields:</p>
                        <ul style="margin: 0; padding-left: 20px;">
                            ${validationErrors.map(error => `<li style="margin-bottom: 5px;">${error}</li>`).join('')}
                        </ul>
                    </div>
                `,
                confirmButtonText: 'OK'
            });
            setIsSaving(false);
            return;
        }

        if (studentToEdit && studentToEdit.id) {
            // Editing: send only changed fields
            const changedFields = getChangedFields(formData, initialData);
            if (Object.keys(changedFields).length === 0) {
                Swal.fire("No changes detected", "You haven't changed any fields.", "info");
                setIsSaving(false);
                return;
            }
            // If imageFile is present, handle it as FormData, else send JSON
            let dataToSend;
            let headers;
            if (changedFields.image) {
                dataToSend = new FormData();
                Object.entries(changedFields).forEach(([key, value]) => {
                    if (key === "image") {
                        dataToSend.append("image", value);
                    } else {
                        dataToSend.append(key, value);
                    }
                });
                dataToSend.append("student_id", studentToEdit.id);
                headers = { 'Content-Type': 'multipart/form-data' };
            } else {
                dataToSend = { ...changedFields, student_id: studentToEdit.id };
                headers = { 'Content-Type': 'application/json' };
            }
            try {
                await axios.put(`${APIURL}/api/addstudent`, dataToSend, { headers });
                Swal.fire({
                    icon: 'success',
                    title: 'Update Successful',
                    text: 'Student has been updated successfully!'
                });
                onClose();
                if (onStudentAdded) onStudentAdded();
            } catch (error) {
                Swal.fire("Error", error.response?.data?.message || "Server error occurred", "error");
            } finally {
                setIsSaving(false);
            }
        } else {
            // Submit form
            const formDataToSend = new FormData();
            formDataToSend.append("teacher", teacher_id);
            formDataToSend.append("student_name", formData.studentname);
            formDataToSend.append("roll_no", formData.rollno);
            formDataToSend.append("number", formData.phoneno);
            formDataToSend.append("email", formData.email);
            formDataToSend.append("gender", formData.gender?.value);
            formDataToSend.append("dob", formData.dateofbirth);
            formDataToSend.append("start_date", formData.joiningdate);
            formDataToSend.append("admission_no", formData.admissionno);
            formDataToSend.append("fathers_name", formData.fathername);
            formDataToSend.append("mothers_name", formData.mothername);
            formDataToSend.append("guardian", formData.guardian);
            formDataToSend.append("address", formData.address);
            if (formData.imageFile) {
                formDataToSend.append("image", formData.imageFile);
            }

            try {
                const response = await axios.post(`${APIURL}/api/addstudent`, formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if (response.data) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Registration Successful',
                        text: 'Student has been added successfully!'
                    });
                    onClose();
                    if (onStudentAdded) {
                        onStudentAdded();
                    }
                }
            } catch (error) {
                Swal.fire("Error", error.response?.data?.message || "Server error occurred", "error");
            } finally {
                setIsSaving(false);
            }
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
            setImageUrl(""); // Remove old image preview if uploading new
        }
    };

    const clearImageFile = () => {
        setFormData(prev => ({
            ...prev,
            imageFile: null
        }));
        setImageUrl(""); // Remove previewed image as well
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

    // const handleImageUpload = (e) => setImageFile(e.target.files[0]);
    // const clearImageFile = () => setImageFile(null);

    return (
        <div className="newstudentadd-backdrop">
            <div className="newstudentadd-modal-content">
                <div className="newstudentadd-modal-header">
                    <p className="newstudentadd-modal-header-heading">Add Student</p>
                    <button onClick={onClose} className="newstudentadd-close-button">&times;</button>
                </div>

                <div className="newstudentadd-modal-body">

                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="newstudentadd-form-grid">
                            <div className="newstudentadd-form-group">
                                <label className="newstudentadd-form-label">
                                    Student Name <span className="newstudentadd_required">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.studentname}
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
                                    onChange={(e) => setFormData({ ...formData, studentname: e.target.value })}
                                />
                            </div>
                            <div className="newstudentadd-form-group">
                                <label className="newstudentadd-form-label">
                                    Roll No <span className="newstudentadd_required">*</span></label>
                                <input
                                    type="Number"
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
                                    value={formData.rollno}
                                    onChange={(e) => setFormData({ ...formData, rollno: e.target.value })}
                                    onWheel={(e) => e.target.blur()}
                                />
                            </div>
                            <div className="newstudentadd-form-group">
                                <label className="newstudentadd-form-label">
                                    Phone Number <span className="newstudentadd_required">*</span>
                                </label>
                                <div className="newstudentadd-phone-container">
                                    <select
                                        className="newstudentadd-phone-select"
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
                                        className="newstudentadd-phone-input"
                                        value={formData.phoneno}
                                        onChange={(e) => setFormData({ ...formData, phoneno: e.target.value })}
                                        maxLength={10}
                                        style={{ borderLeft: 'none' }}
                                    />
                                </div>
                            </div>
                            <div className="newstudentadd-form-group">
                                <label className="newstudentadd-form-label">
                                    Email ID <span className="newstudentadd_required">*</span>
                                </label>
                                <input
                                    type="email"
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
                                    }} value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div className="newstudentadd-form-group">
                                <label className="newstudentadd-form-label">
                                    Gender <span className="newstudentadd_required">*</span>
                                </label>
                                <Select
                                    styles={customStyles}
                                    placeholder="Select Gender"
                                    isClearable={true}
                                    value={formData.gender}
                                    onChange={(option) => setFormData({ ...formData, gender: option })}
                                    options={[
                                        { value: "Male", label: "Male" },
                                        { value: "Female", label: "Female" },
                                        { value: "Other", label: "Other" }
                                    ]}
                                />
                            </div>
                            <div className="newstudentadd-form-group">
                                <label className="newstudentadd-form-label">
                                    Date of Birth <span className="newstudentadd_required">*</span>
                                    </label>
                                <input
                                    type="date"
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
                                    value={formData.dateofbirth}
                                    onChange={(e) => setFormData({ ...formData, dateofbirth: e.target.value })}
                                />
                            </div>
                            <div className="newstudentadd-form-group">
                                <label className="newstudentadd-form-label">
                                    Joining Date <span className="newstudentadd_required">*</span>
                                    </label>
                                <input
                                    type="date"
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
                                    value={formData.joiningdate}
                                    onChange={(e) => setFormData({ ...formData, joiningdate: e.target.value })}
                                />
                            </div>
                            <div className="newstudentadd-form-group">
                                <label className="newstudentadd-form-label">
                                    Admission No <span className="newstudentadd_required">*</span>
                                </label>
                                <input
                                    type="text"
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
                                    value={formData.admissionno}
                                    onChange={(e) => setFormData({ ...formData, admissionno: e.target.value })}
                                />
                            </div>
                            <div className="newstudentadd-form-group">
                                <label className="newstudentadd-form-label">
                                    Father's Name <span className="newstudentadd_required">*</span>
                                </label>
                                <input
                                    type="text"
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
                                    value={formData.fathername}
                                    onChange={(e) => setFormData({ ...formData, fathername: e.target.value })}
                                />
                            </div>
                            <div className="newstudentadd-form-group">
                                <label className="newstudentadd-form-label">
                                    Mother's Name <span className="newstudentadd_required">*</span>
                                </label>
                                <input
                                    type="text"
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
                                    value={formData.mothername}
                                    onChange={(e) => setFormData({ ...formData, mothername: e.target.value })}
                                />
                            </div>
                            <div className="newstudentadd-form-group">
                                <label className="newstudentadd-form-label">
                                    Gaurdian Name <span className="newstudentadd_required">*</span>
                                </label>
                                <input
                                    type="text"
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
                                    value={formData.guardian}
                                    onChange={(e) => setFormData({ ...formData, guardian: e.target.value })}
                                />
                            </div>
                            <div className="newstudentadd-form-group">
                                <label className="newstudentadd-form-label">
                                    Address <span className="newstudentadd_required">*</span>
                                </label>
                                <input
                                    type="text"
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
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                />
                            </div>

                        </div>
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
                                                ) : imageUrl ? (
                                                    <div className="image-preview-container">
                                                        <img
                                                            src={imageUrl}
                                                            alt="Student"
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

                <div className="newstudentadd-modal-footer">
                    <div style={{ display: 'flex', gap: '10px' }}>
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
                            className="newstudentadd-btn newstudentadd-btn-secondary"
                        >
                            Clear
                        </button>

                        <button 
                            className="newstudentadd-btn"
                            style={{
                                backgroundColor: isFormComplete && !isSaving ? '#2162B2' : '#bcbcbc',
                                color: '#fff',
                                border: isFormComplete && !isSaving ? '1px solid #2162B2' : '1px solid #bcbcbc',
                                cursor: isSaving ? 'not-allowed' : 'pointer'
                            }}
                            onClick={handleSave}
                            disabled={isSaving}
                        >
                            {isSaving ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewStudentAdd;
