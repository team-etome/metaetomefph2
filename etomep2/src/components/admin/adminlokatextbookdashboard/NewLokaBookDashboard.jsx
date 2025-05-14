import React, { useState, useEffect, useRef } from "react";
import {
    InputGroup,
    FormControl,
    Dropdown,
    Card, Form
} from "react-bootstrap";
import { IoIosAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import amritha from "../../../assets/amritha.png";
import { BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";
import "./newlokabookdashboard.css";
import { FadeLoader } from "react-spinners";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import NewLokaBookAdd from "./NewLokaBookAdd";
import { useDispatch } from 'react-redux';
import { setSelectedTextbook } from "../../../Redux/Actions/TextbookEditAction";
import NewLokaBookEdit from "./NewLokaBookEdit";
import Select from 'react-select';
import { RiSearchLine } from "react-icons/ri";

const NewLokaBookDashboard = () => {

    const [showEditPopup, setShowEditPopup] = useState(false);
    const dispatch = useDispatch();

    const handleEditTextbook = (book) => {
        dispatch(setSelectedTextbook(book));
        setShowEditPopup(true); // open edit popup
    };

    const [isActive, setIsActive] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [lokabookListData, setLokaBookListData] = useState([]);
    const APIURL = useSelector((state) => state.APIURL.url);
    const admininfo = useSelector((state) => state.admininfo);
    const admin_id = admininfo.admininfo?.admin_id;
    const [selectedPublisher, setSelectedPublisher] = useState("");
    const publisher_name = admininfo.admininfo?.publisher_name;
    const [isFocused, setIsFocused] = useState(false);
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [selectedClass, setSelectedClass] = useState("");


    const [filteredTextbooks, setFilteredTextbooks] = useState([]);

    // console.log(lokabookListData, "clgggggggggggggggggg")

    // const handleEditTextbook = (textbook) => {
    //     navigate("/LokaTextbookEdit", { state: { textbook } });
    // };

    const handlePublisherSelect = (publisher) => {
        setSelectedPublisher(publisher);
    };

    // const filteredBooks = lokabookListData.filter(
    //     (item) =>
    //         (!selectedPublisher || item.textbook_details.publisher_name === selectedPublisher) &&
    //         (!searchTerm ||
    //             item.textbook_details.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //             item.textbook_details.class_name.toLowerCase().includes(searchTerm.toLowerCase()))
    // );
    const filteredBooks = lokabookListData.filter(
        (item) =>
            (!selectedClass || item.textbook_details.class_name === selectedClass) &&
            (!searchTerm ||
                item.textbook_details.subject.toLowerCase().includes(searchTerm.toLowerCase()))
    );


    useEffect(() => {
        const interval = setInterval(() => {
            setIsActive((prevState) => !prevState);
        }, 2000);

        return () => clearInterval(interval);
    }, []);
    const handleButtonClick = () => {
        navigate("/adminlokatextbook");
    };

    useEffect(() => {
        fetchTextbookData();
    }, [APIURL, admin_id]);

    const fetchTextbookData = async () => {
        try {
            const response = await axios.get(
                `${APIURL}/api/admin-create-textbook/${admin_id}`
            );
            console.log("API Data:for textbook", response.data);

            setLokaBookListData(
                Array.isArray(response.data.textbooks)
                    ? response.data.textbooks
                    : [response.data.textbooks]
            );
        } catch (error) {
            console.error("Failed to fetch textbooks:", error);
        }
    };

    const [imageLoaded, setImageLoaded] = useState({}); // Track when image is ready to display

    const handleImageLoad = (index) => {
        setTimeout(() => {
            setImageLoaded((prevState) => ({
                ...prevState,
                [index]: true,
            }));
        }, 1000);
    };

    const dashboardcustomStyles = {
        control: (base, state) => ({
            ...base,
            // minHeight: '48px',
            width: '300px',
            height: '40px',
            borderRadius: '8px',
            borderColor: state.isFocused ? '#86b7fe' : '#757575',
            boxShadow: state.isFocused ? '0 0 0 .25rem rgb(194, 218, 255)' : 0,
            // '&:hover': { borderColor: '#86b7fe' }
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
            maxHeight: '200px',
            overflowY: 'auto',
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

    const handleClassChange = (selectedOption) => {
        setSelectedClass(selectedOption ? selectedOption.value : '');
    };

    // Get unique class names from `lokabookListData`
    const classOptions = [...new Set(lokabookListData.map(item => item.textbook_details.class_name))]
        .sort((a, b) => {
            const numA = parseInt(a.match(/\d+/)) || 0;
            const numB = parseInt(b.match(/\d+/)) || 0;
            return numA - numB;
        })
        .map((className) => ({ label: className, value: className }));


    return (
        <div className="admin_loka_container">
            <div className="admin_loka_fixed_header">
                <div className="admin_loka_header_row">
                    <div className="admin_loka_select_col">
                        <Select
                            value={classOptions.find((option) => option.value === selectedClass) || null}
                            onChange={handleClassChange}
                            options={classOptions}
                            styles={dashboardcustomStyles}  // Custom styles for the dropdown
                            placeholder="Select Class"
                        />

                    </div>
                    <div className="admin_loka_select_col_right">
                        {/* <InputGroup className="admin_loka_search">
                            <Form.Control
                                className="admin_loka_search_search_input"
                                placeholder="Search Books"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </InputGroup> */}

                        <div className="admin_loka_search-input-container">
                            <RiSearchLine className={`admin_loka_search-icon ${searchTerm ? 'hidden' : ''}`} />
                            <input
                                type="text"
                                className="form-control form-control-sm admin_loka_select_faculty"
                                placeholder="     Search Books"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <button
                            className="btn-primary btn-sm admin_loka_add_button"
                            onClick={() => setShowPopup(true)}
                        >
                            + Add
                        </button>
                        {showPopup && <NewLokaBookAdd isOpen={showPopup} onClose={() => setShowPopup(false)} />}
                    </div>
                </div>

            </div>
            <div className="admin_loka_scroll_container">
                {(selectedClass ? [selectedClass] : [...Array(12).keys()].map(i => (i + 1).toString())).map((classNum) => {
                    const booksForClass = lokabookListData.filter(
                        (book) =>
                            book.textbook_details.class_name === classNum &&
                            book.textbook_details.subject.toLowerCase().includes(searchTerm.toLowerCase())
                    );

                    if (booksForClass.length === 0) return null;

                    return (
                        <div key={classNum} className="admin_loka_class_section">
                            <p className="admin_loka_class_heading">Class {classNum}</p>
                            <div className="admin_loka_book_grid">
                                {booksForClass.map((item, index) => (
                                    <div key={index} className="admin_loka_book_col" onClick={() => handleEditTextbook(item)}>
                                        <div className="admin_loka_book_card">
                                            <div className="admin_loka_book_img">
                                                <img src={item.textbook_image} alt="Textbook" />
                                            </div>
                                            <div className="admin_loka_book_body">
                                                <div className="admin_loka_subject_name">{item.textbook_details.subject}</div>
                                                <div className="admin_loka_book_title">{item.textbook_details.text_name}</div>
                                                <div className="admin_loka_publisher">{item.textbook_details.publisher_name}</div>
                                                <div className="admin_loka_class_name">{item.textbook_details.class_name}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {showEditPopup && <NewLokaBookEdit isOpen={showEditPopup} onClose={() => setShowEditPopup(false)} />}

                            </div>

                        </div>
                    );
                })}
                {selectedClass && !lokabookListData.some(book => book.textbook_details.class_name === selectedClass) && (
                    <div className="no-books-message text-center mt-4">
                        <h4>No books available for selected class.</h4>
                    </div>
                )}
                {searchTerm && !lokabookListData.some(
                    (book) =>
                        book.textbook_details.subject.toLowerCase().includes(searchTerm.toLowerCase())
                ) && (
                        <div className="no-books-message text-center mt-4">
                            <h4>No books found for "{searchTerm}".</h4>
                        </div>
                    )}
            </div>
        </div>
    )
}
export default NewLokaBookDashboard;