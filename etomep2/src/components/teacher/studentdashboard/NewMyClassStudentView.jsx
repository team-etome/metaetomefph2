import React, { useState } from "react";
import "./newmyclassstudentview.css";
import studentDefault from '../../../assets/student.jpg'
import Swal from 'sweetalert2';
import axios from 'axios';
import { useSelector } from 'react-redux';

const NewMyClassStudentView = ({ student, onClose, onEdit, onStatusChange }) => {
    if (!student) return null;

    const APIURL = useSelector((state) => state.APIURL.url);
    const [isBlocked, setIsBlocked] = useState(student.blocked);

    const handleBlockToggle = async () => {
        const action = isBlocked ? 'unblock' : 'block';
        const confirmText = isBlocked ? 'Do you want to unblock this student?' : 'Do you want to block this student?';
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: confirmText,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: isBlocked ? 'Yes, unblock' : 'Yes, block',
            cancelButtonText: 'Cancel'
        });
        if (result.isConfirmed) {
            try {
                await axios.post(`${APIURL}/api/studentblock`, { id: student.id, data: !isBlocked });
                Swal.fire(
                    isBlocked ? 'Unblocked!' : 'Blocked!',
                    `The student has been ${isBlocked ? 'unblocked' : 'blocked'}.`,
                    'success'
                );
                setIsBlocked(!isBlocked);
                if (onStatusChange) onStatusChange();
                if (onClose) onClose();
            } catch (error) {
                Swal.fire('Error', error.response?.data?.message || `Failed to ${action} student`, 'error');
            }
        }
    };

    return (
        <div className="newmyclassstudentview-backdrop">
            <div className="newmyclassstudentview-modal-container">
                <div className="newmyclassstudentview-modal">
                    <div className="newmyclassstudentview-topbar">
                        {/* Left: avatar + name/email */}
                        <div className="newmyclassstudentview-header-left">
                            <img
                                 src={student.image ? student.image : studentDefault}
                           
                                className="newmyclassstudentview-avatar"
                            />
                            <div className="newmyclassstudentview-header-text">
                                <div className="newmyclassstudentview-name">
                                {student.student_name}
                                </div>
                                <div className="newmyclassstudentview-email">
                                {student.email || "N/A"}                                </div>
                            </div>
                        </div>

                        {/* Right: close button */}
                        <div className="newmyclassstudentview-header-right">
                            <button
                                className="newmyclassstudentview-close-btn"
                                onClick={onClose}
                                aria-label="Close"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                    {/* Personal Information */}
                    <div className="newmyclassstudentview-section-title">
                        Personal Information
                    </div>
                    <div className="newmyclassstudentview-personal-info">
                        {[
                             ["DOB", student.dob || "N/A"],
                             ["Gender", student.gender || "N/A"],
                             ["Father Name", student.fathers_name || "N/A"],
                             ["Mother Name", student.mothers_name || "N/A"],
                             ["Guardian Name", student.guardian || "N/A"],
                             ["Phone No", student.number || "N/A"],
                             ["Address", student.address || "N/A"],
                        ].map(([label, value]) => (
                            <div className="newmyclassstudentview-info-item" key={label}>
                                <div className="newmyclassstudentview-info-label">{label}</div>
                                <div className="newmyclassstudentview-info-value">{value}</div>
                            </div>
                        ))}
                    </div>
                    {/* School Information */}
                    <div className="newmyclassstudentview-section-title">
                        School Information
                    </div>
                    <div className="newmyclassstudentview-school-info">
                        {[
                             ["Class", student.class_name || "N/A"],
                             ["Division", student.division || "N/A"],
                             ["Roll No", student.roll_no || "N/A"],
                             ["Joining Date", student.start_date || "N/A"],
                             ["Admission No", student.admission_no || "N/A"],
                             ["Academic Year", student.accademic_year|| "N/A"],   


                        ].map(([label, value]) => (
                            <div className="newmyclassstudentview-info-item" key={label}>
                                <div className="newmyclassstudentview-info-label">{label}</div>
                                <div className="newmyclassstudentview-info-value">{value}</div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Action Buttons */}
                <div className="newmyclassstudentview-action-buttons">
                    <button className="newmyclassstudentview-delete-btn" onClick={handleBlockToggle}>
                        {isBlocked ? 'Unblock' : 'Block'}
                    </button>
                    <button className="newmyclassstudentview-edit-btn" onClick={() => onEdit(student)}>
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewMyClassStudentView;
