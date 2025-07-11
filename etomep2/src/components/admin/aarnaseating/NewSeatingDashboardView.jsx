import React, { useState } from "react";
import "./newseatingdashboardview.css";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import image from "../../../assets/arrow-swap.jpg"
import axios from "axios";

const NewSeatingDashboardView = ({ selectedItem, onBack, fetchSeatingData }) => {
    console.log(selectedItem,"selectedItemselectedItemselectedItemselectedItem")
    const APIURL = useSelector((s) => s.APIURL.url);
    const {
        hall_name,
        pattern,
        exam_date,
        start_time,
        end_time,
        teacher,
        teacher_count,
        classes = [],
        final_output = {}
    } = selectedItem;

    console.log(selectedItem, "selectedItemselectedItemselectedItem")
    const [currentClass, setCurrentClass] = useState(classes[0] || "");
    const studentList = final_output[currentClass] || [];

    const handleDelete = async () => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: `This will delete the seating slot for Room ${hall_name}.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            reverseButtons: true,
        });

        if (!result.isConfirmed) return;

        try {
            await axios.delete(`${APIURL}/api/seating/${selectedItem.id}`);
            await Swal.fire({
                icon: "success",
                title: "Deleted",
                text: "Seating slot removed successfully.",
            });
            if (fetchSeatingData) fetchSeatingData(); // Refresh parent list
            onBack();  // close the modal and refresh list
        } catch (err) {
            console.error("Delete failed:", err);
            Swal.fire({
                icon: "error",
                title: "Deletion failed",
                text: err.response?.data?.message || err.message,
            });
        }
    };


    return (
        <div className="seatingview_main_container">
            <div className="seatingview_main_container_inner" >
                <div className="seatingview_header_bar">
                    <span>Room no: {hall_name}</span>
                    <button className="seating-modal-close-btn" onClick={onBack}>×</button>
                </div >
                <div className="seatingview_main_container_inner_header">
                    <div className="seatingview_info_area">
                        <div>
                            <div className="seatingview_info_row heading">
                                <p>Classes Assigned</p>
                                <p>Exam Date</p>
                                <p>Start Time</p>
                                <p>End Time</p>
                            </div>
                            <div className="seatingview_info_row data">
                                <p>{classes.join(' , ')}</p>
                                <p>{new Date(exam_date).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })}</p>
                                <p>{start_time}</p>
                                <p>{end_time}</p>
                            </div>
                        </div>
                        <div className="seatingview_header_bar_bottom">
                            <div className="seatingview_info_row facultiesLabel">
                                <p>Faculty{teacher_count > 1 ? 'ies' : ''}</p>
                            </div>

                            {/* Faculties data */}
                            <div className="seatingview_info_row facultiesData">
                                <p>{Array.isArray(teacher) ? teacher.join(' , ') : teacher}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="seatingview_main_container_inner_table">
                    <div className="seatingview_studentlist_bar">
                        <span className="seatingview_studentlist_title">Student List</span>
                        <select
                            className="form-select form-select-sm seatingview_class_select"
                            style={{ border: "1px solid black" }}
                            value={currentClass}
                            onChange={(e) => setCurrentClass(e.target.value)}
                        >
                            {classes.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="seatingview_table_wrapper">
                        <table className="seatingview_table">
                            <thead>
                                <tr>
                                    <th>Name <span className="sort-arrow">
                                        <img src={image} alt="Sort Arrow" className="sort-arrow-image" />
                                    </span>
                                    </th>
                                    <th>Registration No</th>
                                    <th>Subject</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentList.map((stu, idx) => (
                                    <tr key={idx}>
                                        <td>{stu.name || stu.student_name || "—"}</td>
                                        <td>{stu.regNo || stu.reg_no || "—"}</td>
                                        <td>{stu.subject}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="seatingview_modal-footer">
                    <button
                        className="seatingview_btn seatingview_btn-danger"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                    {/* <button className="seatingview_btn seatingview_btn-secondary">edit</button> */}
                </div>
            </div>
        </div>
    );
};

export default NewSeatingDashboardView;