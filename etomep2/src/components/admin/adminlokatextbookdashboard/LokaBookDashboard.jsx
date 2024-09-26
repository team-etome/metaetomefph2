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
  const navigate = useNavigate();


  console.log(lokabookListData,"clgggggggggggggggggg")

  const handlePublisherSelect = (publisher) => {
    setSelectedPublisher(publisher);
  };

  const filteredBooks = lokabookListData.filter(
    (item) =>
      (!selectedPublisher || item.publisher_name === selectedPublisher) &&
      (!searchTerm ||
        item.subject.toLowerCase().includes(searchTerm.toLowerCase()))
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

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "104.5%" }}>
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
              <InputGroup className="inputgroup_search">
                <BsSearch className="position-absolute top-50 translate-middle-y ms-1 book_searchbar_icon" />
                <FormControl
                  className="ps-4 book_search_input"
                  placeholder="Search..."
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
                  <div className="border border-white ad_lk_tb_rectangle">
                    <div className="ad_loka_tb_img">
                      <img src={item.textbook_image} alt="Textbook" />
                    </div>
                    <div className="admin_tb_texts">
                      <div className="admin_loka_publishername">
                        {item.publisher_name}
                      </div>
                      <div className="ad_loka_tb_subject">{item.subject}</div>
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
          className={`ad_lk_add_button ad_lk_add_button_my_button ${
            isActive ? "active" : ""
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
