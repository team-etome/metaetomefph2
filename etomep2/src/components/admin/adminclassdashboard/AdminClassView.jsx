import React, { useState } from "react";
import "./adminclassview.css";
import AdminClassStudentList from "./AdminClassStudentList";
import AdminClassEditStepOne from "./AdminClassEditStepOne";
import AdminClassEditStepTwo from "./AdminClassEditStepTwo";
import { useSelector } from "react-redux";

const AdminClassView = ({ onClose, faculty, onUpdateClass }) => {
    const [showStudents, setShowStudents] = useState(false);
    // console.log(faculty, "faculty"); // check real data


    const [editStep, setEditStep] = useState(0);
    const [stepOneData, setStepOneData] = useState(null);
    const teacherinfo = useSelector((state) => state.adminteacherinfo);
    const teachers = teacherinfo?.adminteacherinfo || [];

    if (showStudents) {
        return (
            <AdminClassStudentList
                onBack={() => setShowStudents(false)}
                onClose={onClose}
                students={faculty.students.map(student => ({
                    ...student,
                    class_name: faculty.class_name,     // 👈 Add class name
                    division: faculty.section           // 👈 Add division (section)
                }))}
            />
        );
    }
    // } else if (showEdit) {
    //     return (
    //         <AdminClassEditStepOne
    //             teachers={teachers}
    //             closeModal={() => setShowEdit(false)}
    //             nextStep={(updated) => {
    //                 onUpdateClass(updated);   // push the update back up
    //                 setShowEdit(false);
    //             }}
    //             faculty={faculty}
    //         />
    //     );
    // }

    // console.log(teachers,"teachersteachersteachersteachersteachers")

    if (editStep === 1) {
        return (
            <AdminClassEditStepOne
                faculty={faculty}
                teachers={teachers}
                closeModal={() => setEditStep(0)}            // back to view
                // nextStep={(data) => {                       
                //     setStepOneData(data);
                //     setEditStep(2);
                // }}
                nextStep={(stepOnePayload) => {
                    setStepOneData({
                        ...stepOnePayload,
                        classId: faculty.classId   // or whatever the ID field is called
                    });
                    setEditStep(2);
                }}
            />
        );
    }

    // 3) Edit Step Two
    if (editStep === 2) {
        return (
            <AdminClassEditStepTwo
                stepOneData={stepOneData}                   // carry over the step-one payload
                initialEntries={faculty.curriculum || []}
                teachers={teachers}
                prevStep={() => setEditStep(1)}             // back to step one
                closeModal={() => setEditStep(0)}           // abort edit, back to view
                finishStep={(curriculumEntries) => {
                    // merge and fire update
                    onUpdateClass({
                        ...stepOneData,
                        entries: curriculumEntries
                    });
                    setEditStep(0);
                }}
            />
        );
    }


    return (
        <div className="adminclassview-backdrop">
            {/* Header */}
            <div className="adminclassview-header">
                <p className="adminclassview-header-title">{faculty.className}</p>
                <button className="adminclassview-close-btn" onClick={onClose}>×</button>
            </div>
            {/* Wrapper */}
            <div className="adminclassview-wrapper" >
                <div className="adminclassview-top-row">
                    <div className="adminclassview-circle-container">
                        <div className="adminclassview-circle">
                            {faculty.class_name} {faculty.section}
                        </div>
                    </div>

                    {/* Info items */}
                    <div className="adminclassview-info-container">
                        {/* Top row */}
                        <div className="adminclassview-info-container-top" >
                            <div className="adminclassview-info-item">
                                <p className="adminclassview-label">Class Teacher</p>
                                <p className="adminclassview-value">{faculty.teacher || "N/A"}</p>
                            </div>

                            <div className="adminclassview-info-item">
                                <p className="adminclassview-label">Medium</p>
                                <p className="adminclassview-value">{faculty.medium || "N/A"}</p>
                            </div>

                            <div className="adminclassview-info-item">
                                <p className="adminclassview-label">Stream</p>
                                <p className="adminclassview-value">{faculty.stream || "N/A"}</p>
                            </div>
                        </div>

                        {/* Bottom row */}
                        <div className="adminclassview-info-container-bottom">
                            <div className="adminclassview-info-item">
                                <p className="adminclassview-label">No of Subjects</p>
                                <p className="adminclassview-value">{faculty.subjects || 0}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="adminclassview-button-row"
                    onClick={() => setShowStudents(true)}
                    style={{ cursor: "pointer" }}
                >
                    <div className="adminclassview-button-container">
                        <button className="adminclassview-view-btn">View Student List</button>
                    </div>
                </div>
            </div>
            {/* Subject List Table */}
            <div className="adminclassview-subject-list-container">
                <p className="adminclassview-subject-list-title">Subject List</p>
                <table className="adminclassview-table">
                    <thead>


                        <tr>
                            <th>Subject Name</th>
                            <th>Publisher Name</th>
                            <th>Faculty Name</th>
                        </tr>


                    </thead>
                    <tbody>
                        {faculty.curriculum?.map((item, index) => (
                            <tr key={index}>
                                <td>{item.subject}</td>
                                <td>{item.publisher_name}</td>
                                <td>{item.teacher}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer Buttons */}
            <div className="adminclassview-modal-footer">
                <button className="adminclassview-btn adminclassview-btn-delete">Delete</button>
                <button
                    className="adminclassview-btn adminclassview-btn-edit"
                    onClick={() => setEditStep(1)}
                >Edit</button>
            </div>
        </div>
    );
};

export default AdminClassView;
