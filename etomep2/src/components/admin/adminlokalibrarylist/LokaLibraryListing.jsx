import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row,InputGroup, FormControl } from "react-bootstrap";
import { IoIosAdd } from "react-icons/io";
import { useNavigate  } from "react-router-dom";
import chemistry from "../../../assets/chemistry.png";
import { BsSearch} from "react-icons/bs";

import '../adminlokalibrarylist/lokalibrarylist.css'

function LokaLibraryListing() {

    const [isActive, setIsActive] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');


    const navigate = useNavigate()
  
    useEffect(() => {
      const interval = setInterval(() => {
        setIsActive((prevState) => !prevState);
      }, 2000);
  
      return () => clearInterval(interval);
    }, []);
    const handleButtonClick= ()=>{
      navigate('/adminlokalibary')
  }
  
    const lokalibraryListData = [
        { subject: "subject", publisherName: "publisher name",},   
        { subject: "subject", publisherName: "publisher name",},   
        { subject: "subject", publisherName: "publisher name",},   
        { subject: "subject", publisherName: "publisher name",},   
        { subject: "subject", publisherName: "publisher name",},   
        { subject: "subject", publisherName: "publisher name",},   
        { subject: "subject", publisherName: "publisher name",},   
        { subject: "subject", publisherName: "publisher name",},   
        { subject: "subject", publisherName: "publisher name",},   
        { subject: "subject", publisherName: "publisher name",},   
        { subject: "subject", publisherName: "publisher name",},   
        { subject: "subject", publisherName: "publisher name",},   
        { subject: "subject", publisherName: "publisher name",},   
        { subject: "subject", publisherName: "publisher name",},   
        { subject: "subject", publisherName: "publisher name",},   
        { subject: "subject", publisherName: "publisher name",},   
        { subject: "subject", publisherName: "publisher name",},   
        { subject: "subject", publisherName: "publisher name",},   
        { subject: "subject", publisherName: "publisher name",},   
        { subject: "subject", publisherName: "publisher name",},   
        { subject: "subject", publisherName: "publisher name",},   
        { subject: "subject", publisherName: "publisher name",},   
        { subject: "subject", publisherName: "publisher name",},   
        { subject: "subject", publisherName: "publisher name",},   
        { subject: "subject", publisherName: "publisher name",},   
        { subject: "subject", publisherName: "publisher name",},   
        { subject: "subject", publisherName: "publisher name",},   

      ];
    

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "104.5%" }}>
       
      <Container
        fluid
        className="admin_loka_library_dashboard"
        style={{ marginTop: "16px" }}
      >
      <Row className="justify-content-between align-items-center" style={{ marginBottom: "12px" }}>
        <Col className="title_col">
        </Col>
        <Col md={6} >
        <div className="lib_search_nav">
                {/* <Col md={6} className="search_col"> */}
                  <InputGroup className="lib_inputgroup_search">
                    <BsSearch className="position-absolute top-50 translate-middle-y ms-3 library_searchbar_icon" />
                    <FormControl
                      className="ps-5 library_search_input"
                      placeholder="Search..."
                      aria-label="Search"
                    />
                  </InputGroup>
                {/* </Col> */}
        </div>
        </Col>
      </Row>
       <div className="admin_loka_library_list_scroll">
        <Row>
          {lokalibraryListData.map((item, index) => (
            <Col lg={3} md={4} sm={6} xs={6} key={index} className="ad_lk_lib_list">
              <div  className="border border-white ad_lk_lib_rectangle">
                <div className="ad_loka_lib_img">
                  <img src={chemistry} alt="Reference"/>
                </div>
                <div className="admin_lib_texts">
                  <div className="admin_loka_lib_publishername">
                    {item.publisherName}
                  </div>
                  <div className="ad_loka_lib_subject">{item.subject}</div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        </div>
      </Container>
      <div className="ad_lk_lib_add">
        <button
          className={`ad_lk_lib_add_button ad_lk_lib_add_button_my_button ${isActive ? "active" : ""}`}
          onClick={handleButtonClick}
        >
          <IoIosAdd style={{ height: "40px", width: "40px", color: "#ffff" }} />
        </button>
      </div>
    </div>
  )
}

export default LokaLibraryListing