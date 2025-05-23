import React, { useState, useEffect } from 'react';
import AdminQuestionAssignadd from './AdminQuestionassigningadd';
import './AdminQuestionAssigning.css'; // Import custom CSS
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { exampaperinfo } from '../../../Redux/Actions/ExamPaperInfoAction';
import AdminQuestionAssigningView from './AdminQuestionassigningview';
import image from "../../../assets/arrow-swap.jpg"
import Select from 'react-select';
import { loadTimetableDataQuestionPaper } from '../../../Redux/Actions/AdminTimetableDataQuestionPaperActions';



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
        column: null,
        groupIndex: null
    })


    const dispatch = useDispatch();
    // grab timetable from Redux
    const timetableData = useSelector(s => s.timetabledataquestionpaper.list ?? []);
    // ─── new: fetch & store timetable
    useEffect(() => {
        if (timetableData.length === 0) {
            axios.get(`${APIURL}/api/gettimetable/${admin_id}`)
                .then(resp => {
                    const examsData = resp.data.exams;
                    console.log('fetched examsData', examsData);
                    dispatch(loadTimetableDataQuestionPaper(examsData));
                })
                .catch(err => console.error('gettimetable failed', err));
        }
    }, [APIURL, admin_id, dispatch, timetableData.length]);


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

    const handleRowClick = (item, fullExamName) => {
        setSelectedItem({
            ...item,
            exam_name: fullExamName,
        });
        setShowPopupView(true); // Open the modal
    };

    const handleSortClick = (column, groupIndex, event) => {
        event.stopPropagation();
        setSortDropdown(prev => ({
            isOpen:
                prev.column === column && prev.groupIndex === groupIndex
                    ? !prev.isOpen
                    : true,
            column,
            groupIndex
        }));
    };

    const handleSort = (column, direction) => {
        // Implement sorting logic here
        setSortDropdown({ isOpen: false, column: null });
    };

    const renderSortDropdown = (column, groupIndex) => {
        if (
            !sortDropdown.isOpen ||
            sortDropdown.column !== column ||
            sortDropdown.groupIndex !== groupIndex
        )
            return null;



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


    const dashboardcustomStyles = {
        control: (base, state) => ({
            ...base,
            width: '300px',
            height: '40px',
            borderRadius: '8px',
            borderColor: state.isFocused ? '#86b7fe' : '#757575',
            boxShadow: state.isFocused ? '0 0 0 .25rem rgb(194, 218, 255)' : 0,
        }),

        dropdownIndicator: (base) => ({
            ...base,
            color: '#292D32',
            padding: '0 8px',
            alignItems: 'center',
            svg: {
                width: '24px',
                height: '24px',
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
            maxHeight: '200px',  // Limit the height of the dropdown list
            overflowY: 'auto',   // Enable scrolling when the options exceed the height
            fontSize: '14px',
        }),

        option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? '#2162B2' : '#fff',
            color: state.isFocused ? '#fff' : '#222222',
            '&:active': {
                backgroundColor: '#e6e6e6',
            }
        }),
    };
    const dashboardsmallcustomStyles = {
        control: (base, state) => ({
            ...base,
            width: '200px',
            height: '40px',
            borderRadius: '8px',
            borderColor: state.isFocused ? '#86b7fe' : '#757575',
            boxShadow: state.isFocused ? '0 0 0 .25rem rgb(194, 218, 255)' : 0,
        }),

        dropdownIndicator: (base) => ({
            ...base,
            color: '#292D32',
            padding: '0 8px',
            alignItems: 'center',
            svg: {
                width: '24px',
                height: '24px',
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
            maxHeight: '200px',  // Limit the height of the dropdown list
            overflowY: 'auto',   // Enable scrolling when the options exceed the height
            fontSize: '14px',
        }),

        option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? '#2162B2' : '#fff',
            color: state.isFocused ? '#fff' : '#222222',
            '&:active': {
                backgroundColor: '#e6e6e6',
            }
        }),
    };

    const handleExamChange = (selectedOption) => {
        setSelectedExam(selectedOption ? selectedOption.value : '');
    };
    const handleYearChange = (selectedOption) => {
        setSelectedYear(selectedOption ? selectedOption.value : '');
    };

    return (
        <div className="AdminQuestionAssigning_main_container">
            <div className="AdminQuestionAssigning_main_header_container">
                <div className="AdminQuestionAssigning_header-controls d-flex justify-content-between align-items-center">
                    <div className="AdminQuestionAssigning_left-controls">
                        <Select
                            value={examOptions.find((option) => option === selectedExam) ? { label: selectedExam, value: selectedExam } : null}
                            onChange={handleExamChange}
                            options={examOptions.map((option) => ({ label: option, value: option }))}
                            styles={dashboardcustomStyles} // Custom width for Exam dropdown
                            placeholder="Select Exam"
                        />
                        <Select
                            value={yearOptions.find((year) => year === selectedYear) ? { label: selectedYear, value: selectedYear } : null}
                            onChange={handleYearChange}
                            options={yearOptions.map((year) => ({ label: year, value: year }))}
                            styles={dashboardsmallcustomStyles}
                            placeholder="Select Year"
                        />
                        <button className="btn-primary btn-sm AdminQuestionAssigning_search_button" onClick={handleSearch}>Search</button>

                    </div>
                    <div className="AdminQuestionAssigning_right-controls">
                        <button className="btn-primary btn-sm AdminQuestionAssigning_add_button" onClick={() => setShowPopup(true)}>+ Add</button>
                        {showPopup && <AdminQuestionAssignadd isOpen={showPopup} onClose={() => setShowPopup(false)} />}
                    </div>
                </div>
            </div>
            <div className="AdminQuestionAssigning_classes">
                {filteredExamData.length === 0 ? (
                    <div className="AdminQuestionAssigning_no-data">
                        <h3>
                            No QuestionPaper data found for the selected filters.
                        </h3>
                    </div>
                ) : (
                    filteredExamData.map((exam, examIndex) => (
                        <div key={examIndex} className="AdminQuestionAssigning_classes-exam-group">
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
                                                        onClick={(e) => handleSortClick('subject', examIndex, e)}
                                                    >
                                                        <img src={image} alt="Sort Arrow" className="AdminQuestionAssigning_sort-arrow-image" />
                                                        {renderSortDropdown('subject', examIndex)}
                                                    </span>
                                                </th>
                                                <th>
                                                    Class
                                                    <span
                                                        className="AdminQuestionAssigning_sort-arrow"
                                                        onClick={(e) => handleSortClick('class', examIndex, e)}
                                                    >
                                                        <img src={image} alt="Sort Arrow" className="AdminQuestionAssigning_sort-arrow-image" />
                                                        {renderSortDropdown('class', examIndex)}
                                                    </span>
                                                </th>
                                                <th>
                                                    Teacher
                                                    <span
                                                        className="AdminQuestionAssigning_sort-arrow"
                                                        onClick={(e) => handleSortClick('teacher', examIndex, e)}
                                                    >
                                                        <img src={image} alt="Sort Arrow" className="AdminQuestionAssigning_sort-arrow-image" />
                                                        {renderSortDropdown('teacher', examIndex)}
                                                    </span>
                                                </th>
                                                <th>
                                                    Date
                                                    <span
                                                        className="AdminQuestionAssigning_sort-arrow"
                                                        onClick={(e) => handleSortClick('date', examIndex, e)}
                                                    >
                                                        <img src={image} alt="Sort Arrow" className="AdminQuestionAssigning_sort-arrow-image" />
                                                        {renderSortDropdown('date', examIndex)}
                                                    </span>
                                                </th>
                                                <th>
                                                    Time Duration
                                                    <span
                                                        className="AdminQuestionAssigning_sort-arrow"
                                                        onClick={(e) => handleSortClick('duration', examIndex, e)}
                                                    >
                                                        <img src={image} alt="Sort Arrow" className="AdminQuestionAssigning_sort-arrow-image" />
                                                        {renderSortDropdown('duration', examIndex)}
                                                    </span>
                                                </th>
                                                <th>
                                                    Status
                                                    <span
                                                        className="AdminQuestionAssigning_sort-arrow"
                                                        onClick={(e) => handleSortClick('status', examIndex, e)}
                                                    >
                                                        <img src={image} alt="Sort Arrow" className="AdminQuestionAssigning_sort-arrow-image" />
                                                        {renderSortDropdown('status', examIndex)}
                                                    </span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {exam.papers.map((item, i) => (
                                                <tr key={i} onClick={() => handleRowClick(item, exam.fullExamName)}>
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
                    )))}

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
                    selectedItem={selectedItem}
                    onDeleted={(deletedId) => {
                        setFilteredExamData((groups) =>
                            groups.map((g) => ({
                                ...g,
                                papers: g.papers.filter((p) => p.id !== deletedId),
                            }))
                        );
                    }}
                />
            )}
        </div>
    );
};

export default AdminQuestionAssigning;