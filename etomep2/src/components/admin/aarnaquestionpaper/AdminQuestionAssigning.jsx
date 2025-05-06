import React, { useState, useEffect } from 'react';
import AdminQuestionAssignadd from './AdminQuestionassigningadd';
import './AdminQuestionAssigning.css'; // Import custom CSS
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { exampaperinfo } from '../../../Redux/Actions/ExamPaperInfoAction';
import AdminQuestionAssigningView from './AdminQuestionassigningview';
import image from "../../../assets/arrow-swap.jpg"



const AdminQuestionAssigning = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [showPopupview, setShowPopupView] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [questionData, setQuestionData] = useState([]);
    console.log(questionData)
    const APIURL = useSelector((state) => state.APIURL.url);
    const admin_id = useSelector((state) => state.admininfo.admininfo?.admin_id);
    const [examData, setExamData] = useState([]);
    const [filteredExamData, setFilteredExamData] = useState([]);
    const [selectedExam, setSelectedExam] = useState('All');
    const [selectedYear, setSelectedYear] = useState('All');
    const [sortDropdown, setSortDropdown] = useState({
        isOpen: false,
        column: null
    });


    const dispatch = useDispatch();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${APIURL}/api/questionpaper/${admin_id}`);
                const rawData = response.data.question_papers || {};
                
                dispatch(exampaperinfo(rawData));

                console.log(response.data, "responseresponseresponse");

                // Process the rawData into an array of exam objects.
                // Each key (e.g., "Annual Examination 2025") is split into examName and examYear.
                const exams = Object.entries(rawData)
                    .map(([key, papers]) => {
                        const match = key.match(/^(.*)\s+(\d{4})$/);
                        if (match) {
                            const examName = match[1].trim();
                            const examYear = match[2];
                            return { fullExamName: key, examName, examYear, papers };
                        }
                        return null;
                    })
                    .filter(item => item !== null);

                setExamData(exams);
            } catch (error) {
                console.error("Error fetching question papers", error);
            }
        };

        fetchData();
    }, [APIURL, admin_id]);

    // Initialize filtered data to show all exams
    useEffect(() => {
        setFilteredExamData(examData);
    }, [examData]);

    // Filter the data based on selected exam and year
    const handleSearch = () => {
        const filtered = examData.filter(item => {
            const examMatch = selectedExam === 'Select Exam' || item.examName === selectedExam;
            const yearMatch = selectedYear === 'Select Year' || item.examYear === selectedYear;
            return examMatch && yearMatch;
        });
        setFilteredExamData(filtered);
    };

    // Build dropdown options for exam names and exam years
    const examOptions = ['Select Exam', ...Array.from(new Set(examData.map(item => item.examName)))];
    const yearOptions = ['Select Year', ...Array.from(new Set(examData.map(item => item.examYear)))];

    // const changePage = (page) => {
    //     if (page < 1 || page > totalPages) return;
    //     setCurrentPage(page);
    //     setInputPage(''); // Reset input on page change
    // };

    // const goToPage = () => {
    //     const page = Number(inputPage);
    //     if (page && page >= 1 && page <= totalPages) {
    //         changePage(page);
    //     }
    // };

    // const paginationItems = () => {
    //     let items = [];
    //     // Only show ellipses and first/last page when appropriate
    //     if (currentPage > 3) {
    //         items.push(<button key={1} onClick={() => changePage(1)}>1</button>);
    //         items.push(<span key="left-ellipsis">...</span>);
    //     }
    //     for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
    //         items.push(
    //             <button key={i} className={currentPage === i ? 'active' : ''} onClick={() => changePage(i)}>
    //                 {i}
    //             </button>
    //         );
    //     }
    //     if (currentPage < totalPages - 2) {
    //         items.push(<span key="right-ellipsis">...</span>);
    //         items.push(<button key={totalPages} onClick={() => changePage(totalPages)}>{totalPages}</button>);
    //     }
    //     return items;
    // };

    const handleRowClick = (item) => {
        setSelectedItem(item); // Pass the clicked row data to the modal
        setShowPopupView(true); // Open the modal
    };

    const handleSortClick = (column, event) => {
        event.stopPropagation();
        setSortDropdown(prevState => ({
            isOpen: prevState.column === column ? !prevState.isOpen : true,
            column: column
        }));
    };

    const handleSort = (column, direction) => {
        // Implement sorting logic here
        setSortDropdown({ isOpen: false, column: null });
    };

    const renderSortDropdown = (column) => {
        if (!sortDropdown.isOpen || sortDropdown.column !== column) return null;

        return (
            <div className="AdminQuestionAssigning_sort-dropdown" onClick={(e) => e.stopPropagation()}>
                <div className="AdminQuestionAssigning_sort-option" onClick={() => handleSort(column, 'asc')}>
                    Sort A to Z
                </div>
                <div className="AdminQuestionAssigning_sort-option" onClick={() => handleSort(column, 'desc')}>
                    Sort Z to A
                </div>
                <div className="AdminQuestionAssigning_sort-option" onClick={() => handleSort(column, 'asc')}>
                    Sort A to Z
                </div>
                <div className="AdminQuestionAssigning_sort-option" onClick={() => handleSort(column, 'desc')}>
                    Sort Z to A
                </div>
                <div className="AdminQuestionAssigning_sort-option" onClick={() => handleSort(column, 'asc')}>
                    Sort A to Z
                </div>
                <div className="AdminQuestionAssigning_sort-option" onClick={() => handleSort(column, 'desc')}>
                    Sort Z to A
                </div>
            </div>
        );
    };

    return (
        <div className="AdminQuestionAssigning_main_container">
            <div className="AdminQuestionAssigning_main_header_container">
                <div className="AdminQuestionAssigning_header-controls d-flex justify-content-between align-items-center">
                    <div className="AdminQuestionAssigning_left-controls">
                        <select
                            className="form-select form-select-sm AdminQuestionAssigning_select_exam"
                            value={selectedExam}
                            onChange={(e) => setSelectedExam(e.target.value)}
                        >
                            {examOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <select
                            className="form-select form-select-sm AdminQuestionAssigning_select_year"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                        >
                            {yearOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <button className="btn-primary btn-sm AdminQuestionAssigning_search_button" onClick={handleSearch}>Search</button>

                    </div>
                    <div className="AdminQuestionAssigning_right-controls">
                        <button className="btn-primary btn-sm AdminQuestionAssigning_add_button" onClick={() => setShowPopup(true)}>+ Add</button>
                        {showPopup && <AdminQuestionAssignadd isOpen={showPopup} onClose={() => setShowPopup(false)} />}
                    </div>
                </div>
            </div>
            <div className="AdminQuestionAssigning_classes">
                {filteredExamData.map((exam, index) => (
                    <div key={index} className="AdminQuestionAssigning_classes-exam-group">
                        <div className="AdminQuestionAssigning_exam-group-content">
                            {/* Heading shows the full exam name */}
                            <p className="AdminQuestionAssigning_exam-group-heading">{exam.fullExamName}</p>
                            <div className="AdminQuestionAssigning_exam-section">
                                <table className="AdminQuestionAssigning_main_table">
                                    <thead>
                                        <tr>
                                            <th>
                                                Subject
                                                <span 
                                                    className="AdminQuestionAssigning_sort-arrow"
                                                    onClick={(e) => handleSortClick('subject', e)}
                                                >
                                                    <img src={image} alt="Sort Arrow" className="AdminQuestionAssigning_sort-arrow-image" />
                                                    {renderSortDropdown('subject')}
                                                </span>
                                            </th>
                                            <th>
                                                Class
                                                <span 
                                                    className="AdminQuestionAssigning_sort-arrow"
                                                    onClick={(e) => handleSortClick('class', e)}
                                                >
                                                    <img src={image} alt="Sort Arrow" className="AdminQuestionAssigning_sort-arrow-image" />
                                                    {renderSortDropdown('class')}
                                                </span>
                                            </th>
                                            <th>
                                                Teacher
                                                <span 
                                                    className="AdminQuestionAssigning_sort-arrow"
                                                    onClick={(e) => handleSortClick('teacher', e)}
                                                >
                                                    <img src={image} alt="Sort Arrow" className="AdminQuestionAssigning_sort-arrow-image" />
                                                    {renderSortDropdown('teacher')}
                                                </span>
                                            </th>
                                            <th>
                                                Date
                                                <span 
                                                    className="AdminQuestionAssigning_sort-arrow"
                                                    onClick={(e) => handleSortClick('date', e)}
                                                >
                                                    <img src={image} alt="Sort Arrow" className="AdminQuestionAssigning_sort-arrow-image" />
                                                    {renderSortDropdown('date')}
                                                </span>
                                            </th>
                                            <th>
                                                Time Duration
                                                <span 
                                                    className="AdminQuestionAssigning_sort-arrow"
                                                    onClick={(e) => handleSortClick('duration', e)}
                                                >
                                                    <img src={image} alt="Sort Arrow" className="AdminQuestionAssigning_sort-arrow-image" />
                                                    {renderSortDropdown('duration')}
                                                </span>
                                            </th>
                                            <th>
                                                Status
                                                <span 
                                                    className="AdminQuestionAssigning_sort-arrow"
                                                    onClick={(e) => handleSortClick('status', e)}
                                                >
                                                    <img src={image} alt="Sort Arrow" className="AdminQuestionAssigning_sort-arrow-image" />
                                                    {renderSortDropdown('status')}
                                                </span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {exam.papers.map((item, i) => (
                                            <tr key={i} onClick={() => handleRowClick(item)}>
                                                <td>{item.subject_name}</td>
                                                <td>{item.class_name} {item.division}</td>
                                                <td>{item.teacher_name}</td>
                                                <td>{item.exam_date}</td>
                                                <td>{item.start_time} - {item.end_time}</td>
                                                <td>
                                                    <span className={`status-badge ${item.status === 'completed' ? 'Completed' : 'Pending'}`}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
            {/* <div className="pagination">
                <span className="page-info">Page {currentPage} of {totalPages}</span>
                <div className="go-to-page">
                    {paginationItems()}
                    <div className="vertical-divider mx-3"></div>
                    <p>Go to page</p>
                    <input
                        type="text"
                        value={inputPage}
                        onChange={e => setInputPage(e.target.value)}
                        placeholder=""
                    />
                    <button onClick={goToPage}>Go</button>
                </div>
                <div className="pagination-buttons">

                    <button className="AdminQuestionAssigning_prev_button" disabled={currentPage <= 1} onClick={() => changePage(currentPage - 1)}>Previous </button>
                    <button className="AdminQuestionAssigning_next_button" disabled={currentPage >= totalPages} onClick={() => changePage(currentPage + 1)}>Next</button>
                </div>
            </div> */}

            {showPopupview && (
                <AdminQuestionAssigningView
                    isOpen={showPopupview}
                    onClose={() => setShowPopupView(false)}
                    selectedItem={selectedItem} // Pass the selected item as a prop to the view page
                />
            )}
        </div>
    );
};

export default AdminQuestionAssigning;