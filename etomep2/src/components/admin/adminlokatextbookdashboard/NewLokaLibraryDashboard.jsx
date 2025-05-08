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
import "./newlokalibrarydashboard.css";
import { FadeLoader } from "react-spinners";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Select from 'react-select';
import NewLokaLibraryAdd from "./NewLokaLibraryAdd";
import NewLokaLibraryEdit from "./NewLokaLibraryEdit";
import chemistry from "../../../assets/chemistry.png";
import { RiSearchLine } from "react-icons/ri";

function NewLokaLibraryDashboard() {
  const [lokabookListData, setLokaBookListData] = useState([]);
  const APIURL = useSelector((state) => state.APIURL.url);
  const admininfo = useSelector((state) => state.admininfo);
  const admin_id = admininfo.admininfo?.admin_id;
  const publisher_name = admininfo.admininfo?.publisher_name;
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");


  console.log(lokabookListData, "clgggggggggggggggggg")

  useEffect(() => {
    const fetchTextbooks = async () => {
      try {
        const response = await axios.get(`${APIURL}/api/create-textbook/${admin_id}`);
        if (response.data && response.data.data) {
          setLokaBookListData(response.data.data);
        }
        // console.log(response.data, "responsedatat coming ")
      } catch (error) {
        console.error("Error fetching textbooks:", error);
      }
    };

    if (admin_id) {
      fetchTextbooks();
    }
  }, [APIURL, admin_id]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`${APIURL}/api/category/${admin_id}`);
        setCategories(response.data.categories);
        // console.log(response.data, "response.data catogoaryyyyyyy")
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [APIURL, admin_id]);

  // First filter textbooks based on search term (text_name)
  const filteredBySearch = lokabookListData.filter((item) =>
    item.text_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // If a category is selected, filter further; otherwise use all filteredBySearch items.
  const finalFiltered = selectedCategory
    ? filteredBySearch.filter((item) => item.category === selectedCategory)
    : filteredBySearch;

  // Group the finalFiltered items by category
  const groupedBooks = finalFiltered.reduce((acc, item) => {
    const cat = item.category || "Uncategorized";
    if (!acc[cat]) {
      acc[cat] = [];
    }
    acc[cat].push(item);
    return acc;
  }, {});

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setShowEditPopup(true);
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

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption ? selectedOption.value : '');
  };

  return (
    <div className="admin_loka_library_container">
      <div className="admin_loka_library_fixed_header">
        <div className="admin_loka_library_header_row">
          <div className="admin_loka_library_select_col">
            <Select
              value={categories.find((cat) => cat === selectedCategory) ? { label: selectedCategory, value: selectedCategory } : null}
              onChange={handleCategoryChange}
              options={categories.map((cat) => ({ label: cat, value: cat }))}
              styles={dashboardcustomStyles}
              placeholder="Select Categories"
            />
          </div>
          <div className="admin_loka_library_select_col_right">
            <div className="admin_loka_library_search-input-container">
              <RiSearchLine className={`admin_loka_search-icon ${searchTerm ? 'hidden' : ''}`} />
              <input
                type="text"
                className="form-control form-control-sm admin_loka_library_select_faculty"
                placeholder="     Search Faculty"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              className="btn-primary btn-sm admin_loka_library_add_button"
              onClick={() => setShowPopup(true)}
            >
              + Add
            </button>
            {showPopup && <NewLokaLibraryAdd isOpen={showPopup} onClose={() => setShowPopup(false)} />}
          </div>
        </div>
      </div>

      <div className="admin_loka_library_scroll_container">
        {Object.keys(groupedBooks).length > 0 ? (
          Object.keys(groupedBooks).map((cat) => (
            <div key={cat} className="admin_loka_library_class_section mb-4">
              <p className="admin_loka_library_class_heading">{cat}</p>
              <div className="admin_loka_library_book_grid">
                {groupedBooks[cat].map((item, index) => (
                  <div
                    key={index}
                    className="admin_loka_library_book_col"
                    onClick={() => handleBookClick(item)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="admin_loka_library_book_card">
                      <div className="admin_loka_library_book_img">
                        <img
                          src={item.textbook_image ? item.textbook_image : chemistry}
                          alt="Textbook"
                        />
                      </div>
                      <div className="admin_loka_library_book_body">
                        <div className="admin_loka_library_subject_name">{item.text_name}</div>
                        <div className="admin_loka_library_book_title">
                          {item.textbook_details ? item.textbook_details.subject : item.category}
                        </div>
                        <div className="admin_loka_library_author_name">{item.author_name}</div>
                        <div className="admin_loka_library_publisher_name">{item.publisher_name}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="no-books-message">
            <h3>No books available for the search criteria.</h3>
          </div>
        )}
      </div>

      {showEditPopup && selectedBook && (
        <NewLokaLibraryEdit
          isOpen={showEditPopup}
          onClose={() => setShowEditPopup(false)}
          bookData={selectedBook}
        />
      )}
    </div>
  );
}

export default NewLokaLibraryDashboard;