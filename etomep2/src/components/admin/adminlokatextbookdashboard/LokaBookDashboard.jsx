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

  const publisher_name = admininfo.admininfo?.publisher_name;

  console.log(publisher_name, "lokaaaaaaa");

  const navigate = useNavigate();

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

  //   const handleclick= ()=>{
  //     navigate('/lokatextview')
  // }
  const fetchTextbookData = async () => {
    try {
      const response = await axios.get(
        `${APIURL}/api/admin-create-textbook/${admin_id}`
      );
      console.log("API Data:", response.data);
      // Ensure that textbook_details is treated as an array
      setLokaBookListData(
        Array.isArray(response.data.textbook_details)
          ? response.data.textbook_details
          : [response.data.textbook_details]
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
        style={{ marginTop: "16px" }}
      >
        {/* <Row className="justify-content-between align-items-center" style={{ marginBottom: "12px" }}>
              <Col className="tb_title_col">
              </Col>
              <Col md={6} className="book_search_col" style={{display:'flex'}}>
             
              <Dropdown className="dropdown_tb">
                <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic" className="dropdown_tb_toggle">
                  NCERT
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>NCERT</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              
                <InputGroup className="inputgroup_search">
                <BsSearch className="position-absolute top-50 translate-middle-y ms-4 book_searchbar_icon"/>
                  <FormControl
                  className="ps-5 book_search_input"
                    placeholder="Search..."
                    aria-label="Search"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </InputGroup>

              </Col>
            </Row> */}
        <div className="admin_loka_tb_list_scroll">
          <Row>
            {lokabookListData.map((item, index) => (
              <Col
                lg={3}
                md={4}
                sm={6}
                xs={6}
                key={index}
                className="ad_lk_tb_list"
              >
                <div className="border border-white ad_lk_tb_rectangle">
                  <div className="ad_loka_tb_img">
                    <img src={item.textbook_front_page} alt="Textbook" />
                  </div>
                  <div className="admin_tb_texts">
                    <div className="admin_loka_publishername">
                      {item.publisher_name}
                    </div>
                    <div className="ad_loka_tb_subject">{item.subject}</div>
                  </div>
                </div>
              </Col>
            ))}
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
