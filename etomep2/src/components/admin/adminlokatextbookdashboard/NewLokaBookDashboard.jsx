import React, { useState, useEffect, useRef } from "react";
import {
    Col,
    Container,
    Row,
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

function NewLokaBookDashboard() {
    
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

    return (
        <Container fluid className="admin_loka_container p-0" >
            <div className="admin_loka_fixed_header">
                <div className="admin_lokanav_header mb-4">
                    <Row className="admin_loka_header_row">
                        <Col md={4} className="admin_loka_select_col">
                            <Form.Select
                                className="admin_loka_select"
                                onChange={(e) => setSelectedClass(e.target.value)}
                            >
                                <option value="">Select Class</option>
                                {[...Array(12)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </Form.Select>
                            {/* <Form.Select
                                className="admin_loka_select"
                                onChange={(e) => handlePublisherSelect(e.target.value)}
                            >
                                <option>Select Class</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                                <option>11</option>
                                <option>12</option>
                                {(publisher_name || []).map((publisher, index) => (
                                    <option key={index} value={publisher}>
                                        {publisher}
                                    </option>
                                ))}
                            </Form.Select> */}
                        </Col>
                        <Col md={8} className="d-flex justify-content-end align-items-center" style={{ paddingRight: "0px" }}>
                            <div className="admin_loka_select_col_right">
                                <InputGroup className="admin_loka_search">
                                    <Form.Control
                                        className="admin_loka_search_search_input"
                                        placeholder="Search Books"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </InputGroup>

                                <button
                                    className="btn-primary btn-sm admin_loka_add_button "
                                    onClick={() => setShowPopup(true)}
                                >
                                    + Add
                                </button>
                                {showPopup && <NewLokaBookAdd isOpen={showPopup} onClose={() => setShowPopup(false)} />}
                            </div>
                        </Col>
                    </Row>
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
                        <div key={classNum} className="admin_loka_class_section mb-4">
                            <h5 className="admin_loka_class_heading">Class {classNum}</h5>
                            <Row className="admin_loka_book_grid" >
                                {booksForClass.map((item, index) => (
                                    <Col key={index} md={3} className="admin_loka_book_col" onClick={() => handleEditTextbook(item)} >
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
                                    </Col>
                                ))}
                                 {showEditPopup && <NewLokaBookEdit isOpen={showEditPopup} onClose={() => setShowEditPopup(false)} />}
                            </Row>
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
        </Container>
    )
}
export default NewLokaBookDashboard;