import React, { useState, useEffect, useRef } from "react";
import {
  Col,
  Container,
  Row,
  InputGroup,
  FormControl,
  Dropdown,
} from "react-bootstrap";
import { IoIosAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import amritha from "../../../assets/amritha.png";
import { BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";
import "../adminlokatextbookdashboard/lokabookdashboard.css";
import { FadeLoader } from "react-spinners";
import axios from "axios";


function LokaBookDashboard() {
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

  const [filteredTextbooks, setFilteredTextbooks] = useState([]);

  console.log(lokabookListData, "clgggggggggggggggggg")

  const handleEditTextbook = (textbook) => {
    navigate("/LokaTextbookEdit", { state: { textbook } });
  };

  const handlePublisherSelect = (publisher) => {
    setSelectedPublisher(publisher);
  };

  const filteredBooks = lokabookListData.filter(
    (item) =>
      (!selectedPublisher || item.textbook_details.publisher_name === selectedPublisher) &&
      (!searchTerm ||
        item.textbook_details.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.textbook_details.class_name.toLowerCase().includes(searchTerm.toLowerCase()))
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
      console.log("API Data:", response.data);

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
        [index]: true, // Show image after 3 seconds
      }));
    }, 1000);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "104.5%"}}>
      <Container
        fluid
        className="admin_loka_textbook_dashboard"
      // style={{ marginTop: "16px" }}
      >
        <div className="textbook_search">
          <Row className="search_dropdwon_textbook">
            <div className="book_search_col">
              <Dropdown className="dropdown_tb">
                <Dropdown.Toggle
                  variant="outline-secondary"
                  id="dropdown-basic"
                  className="dropdown_tb_toggle"
                >
                  {selectedPublisher || "Select Publisher"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {(publisher_name || []).map((publisher, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => handlePublisherSelect(publisher)}
                    >
                      {publisher}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <div className="separator"></div>
              <InputGroup className="inputgroup_search position-relative">
                {!searchTerm && !isFocused && (
                  <BsSearch className="position-absolute top-50 translate-middle-y end-0 book_searchbar_icon" />
                )}
                <FormControl
                  className={`ps-2 book_search_input ${isFocused ? "focused" : ""}`}
                  placeholder={isFocused ? "Search by Class" : "Search"}
                  aria-label="Search"
                  // type="number"
                  value={searchTerm}
                  // onChange={(e) => setSearchTerm(e.target.value)}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only digits
                    if (/^\d*$/.test(value)) {
                      setSearchTerm(value);
                    }
                  }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
              </InputGroup>
            </div>
          </Row>
        </div>
        <div className="admin_loka_tb_list_scroll">
          <Row>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((item, index) => (
                <Col
                  lg={2}
                  md={4}
                  sm={6}
                  xs={6}
                  key={index}
                  className="ad_lk_tb_list"
                >
                  <div className="border border-white ad_lk_tb_rectangle"
                    onClick={() => handleEditTextbook(item)}
                    style={{ cursor: "pointer" }}>

                    <div className="ad_loka_tb_img">
                      {!imageLoaded[index] ? (
                        <div className="custom-loader-container">
                          <FadeLoader color="#4B0082" height={15} width={5} radius={2} margin={2} />
                        </div>
                      ) : (
                        <img src={item.textbook_image} alt="Textbook" />
                      )}

                      {/* Hidden image that loads in the background */}
                      <img
                        src={item.textbook_image}
                        alt="Preload"
                        onLoad={() => handleImageLoad(index)}
                        style={{ display: "none" }} // Keep hidden until ready
                      />
                    </div>
                    <div className="admin_tb_texts">
                      <div className="admin_loka_publishername">
                        {item.textbook_details.publisher_name}
                      </div>
                      <div className="ad_loka_tb_subject">{item.textbook_details.subject}</div>
                      <div className="ad_loka_tb_subject">class: {item.textbook_details.class_name}</div>
                    </div>
                  </div>

                </Col>
              ))
            ) : (
              <div className="no-books-message">
                <h3>

                  No books available for the selected publisher.
                </h3>
              </div>
            )}
          </Row>
        </div>
      </Container>
      <div className="ad_lk_tb_add">
        <button
          className={`ad_lk_add_button ad_lk_add_button_my_button ${isActive ? "active" : ""
            }`}
          onClick={handleButtonClick}
        >
          <IoIosAdd style={{ height: "40px", width: "40px", color: "#ffff" }} />
        </button>
      </div>
    </div>
  );
}

export default LokaBookDashboard;
