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
import NewLokaLibraryAdd from "./NewLokaLibraryAdd";
import chemistry from "../../../assets/chemistry.png";

function NewLokaLibraryDashboard() {
  const [lokabookListData, setLokaBookListData] = useState([]);
  const APIURL = useSelector((state) => state.APIURL.url);
  const admininfo = useSelector((state) => state.admininfo);
  const admin_id = admininfo.admininfo?.admin_id;
  const publisher_name = admininfo.admininfo?.publisher_name;
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
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

  return (
    <Container fluid className="admin_loka_library_container p-0">
      <div className="admin_loka_library_fixed_header">
        <div className="admin_loka_librarynav_header mb-4">
          <Row className="admin_loka_library_header_row">
            <Col md={4} className="admin_loka_library_select_col">
              <Form.Select
                className="admin_loka_library_select"
                onChange={(e) => setSelectedCategory(e.target.value)}
                value={selectedCategory}
              >
                <option value="">Select Categories</option>
                {categories?.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md={8} className="d-flex justify-content-end align-items-center" style={{ paddingRight: "0px" }}>
              <div className="admin_loka_library_select_col_right">
                <InputGroup className="admin_loka_library_search">
                  <FormControl
                    className="admin_loka_library_search_search_input"
                    placeholder="Search Books"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
                <button
                  className="btn-primary btn-sm admin_loka_library_add_button"
                  onClick={() => setShowPopup(true)}
                >
                  + Add
                </button>
                {showPopup && <NewLokaLibraryAdd isOpen={showPopup} onClose={() => setShowPopup(false)} />}
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <div className="admin_loka_library_scroll_container" >
        {Object.keys(groupedBooks).length > 0 ? (
          Object.keys(groupedBooks).map((cat) => (
            <div key={cat}>
              <h5 className="admin_loka_library_class_heading">{cat}</h5>
              <Row className="admin_loka_library_book_grid">
                {groupedBooks[cat].map((item, index) => (
                  <Col key={index} md={3} className="admin_loka_library_book_col">
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
                  </Col>
                ))}
              </Row>
            </div>
          ))
        ) : (
          <div className="no-books-message">
            <h3>No books available for the search criteria.</h3>
          </div>
        )}
      </div>
    </Container>
  );
}
export default NewLokaLibraryDashboard;