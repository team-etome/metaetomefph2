import React from "react";
import "./newseatingdashboardview.css";
import image from "../../../assets/arrow-swap.jpg"

const NewSeatingDashboardView = ({ selectedItem, onBack }) => {
    // Dummy data to fill the UI
    const dummyData = {
        roomNo: "202",
        subject: "English",
        examDate: "22/07/2025",
        startTime: "10:00 AM",
        endTime: "12:00 PM",
        faculties: ["Lonappan", "Sudhakaran", "Bindu"],
        className: "10B",
        studentList: [
            { regNo: "RVF25453", name: "Jacob" },
            { regNo: "RVF45223", name: "Tyler" },
            { regNo: "RVF465434", name: "Mathew" },
            { regNo: "RVF34523", name: "Sudhakaran" },
            { regNo: "RVF54566", name: "Babblu" },
            { regNo: "RVF54677", name: "Chinkidi" },
        ],
    };

    return (
        <div className="seatingview_main_container">
            <div className="seatingview_main_container_inner" >
                <div className="seatingview_header_bar">
                    <span>Room no: {dummyData.roomNo}</span>
                    <button className="seating-modal-close-btn" onClick={onBack}>×</button>
                </div >
                <div className="seatingview_main_container_inner_header">
                    <div className="seatingview_info_area">
                        <div>
                            <div className="seatingview_info_row heading">
                                <p>Subject</p>
                                <p>Exam Date</p>
                                <p>Start Time</p>
                                <p>End Time</p>
                            </div>
                            <div className="seatingview_info_row data">
                                <p>{dummyData.subject}</p>
                                <p>{dummyData.examDate}</p>
                                <p>{dummyData.startTime}</p>
                                <p>{dummyData.endTime}</p>
                            </div>
                        </div>
                        <div className="seatingview_header_bar_bottom">
                            <div className="seatingview_info_row facultiesLabel">
                                <p>Faculties</p>
                            </div>

                            {/* Faculties data */}
                            <div className="seatingview_info_row facultiesData">
                                <p>{dummyData.faculties.join(", ")}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="seatingview_main_container_inner_table">
                    <div className="seatingview_studentlist_bar">
                        <span className="seatingview_studentlist_title">Student List</span>
                        <select className=" form-select form-select-sm seatingview_class_select" style={{ border: "1px solid black" }}>
                            <option value={dummyData.className}>{dummyData.className}</option>
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
                                {dummyData.studentList.map((student, index) => (
                                    <tr key={index}>
                                        <td>{student.name}</td>
                                        <td>{student.regNo}</td>
                                        <td>{dummyData.subject}</td>
                                    </tr>
                                ))}
                                {/* Adding an additional row */}
                                <tr>
                                    <td>John Doe</td>
                                    <td>RVF99999</td>
                                    <td>{dummyData.subject}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="seatingview_modal-footer">
                    <button className="seatingview_btn seatingview_btn-danger">Delete</button>
                    <button className="seatingview_btn seatingview_btn-secondary">edit</button>
                </div>
            </div>
        </div>
    );
};

export default NewSeatingDashboardView;