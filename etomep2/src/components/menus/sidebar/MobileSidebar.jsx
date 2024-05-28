import React, { useState } from "react";
import "../sidebar/sidebar.css";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";
import { PiBook } from "react-icons/pi";
import { TbScanEye } from "react-icons/tb";
import { SlNote } from "react-icons/sl";
import { SlSettings } from "react-icons/sl";
import { MdOutlineClose } from "react-icons/md";
import amritha from "../../../assets/amritha.png";


function MobileSidebar({ show, onClose }) {

  const [activeItem, setActiveItem] = useState(null);

  const handleMenuItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className={`mobile_sidebar ${show ? "show" : ""}`}>
      <div className="mobile_sidebar_header">
        <MdOutlineClose
          onClick={onClose}
          style={{ width: "30px", height: "30px" }}
        />
      </div>
      <Row
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "70%",
          width: "100%",
          alignItems: "center",
          alignContent: "center",
          marginTop: "30px",
        }}
      >
        <Col
          className={`mob_menu_item_col ${
            activeItem === "home" ? "active" : ""
          }`}
          onClick={() => handleMenuItemClick("home")}
        >
          <div className="mob_icon_container_div">
            <GoHome className="mob_icon_img" />
            <span className="mob_icon_text">Home</span>
          </div>
        </Col>
        <Col
          className={`mob_menu_item_col ${
            activeItem === "institution" ? "active" : ""
          }`}
          onClick={() => handleMenuItemClick("institution")}
        >
           <Link  to='/institutionadding'>
          <div className="mob_icon_container_div">
            <RxDashboard className="mob_icon_img" />
            <span className="mob_icon_text">Institution</span>
          </div>
          </Link>
        </Col>
        <Col
          className={`mob_menu_item_col ${
            activeItem === "loka" ? "active" : ""
          }`}
          onClick={() => handleMenuItemClick("loka")}
        >
          <div className="mob_icon_container_div">
            <PiBook className="mob_icon_img" />
            <span className="mob_icon_text">Loka</span>
          </div>
        </Col>
        <Col
          className={`mob_menu_item_col ${
            activeItem === "aarna" ? "active" : ""
          }`}
          onClick={() => handleMenuItemClick("aarna")}
        >
          <div className="mob_icon_container_div">
            <SlNote className="mob_icon_img" />
            <span className="mob_icon_text">Aarna</span>
          </div>
        </Col>
        <Col
          className={`mob_menu_item_col ${
            activeItem === "eyora" ? "active" : ""
          }`}
          onClick={() => handleMenuItemClick("eyora")}
        >
          <div className="mob_icon_container_div">
            <TbScanEye className="mob_icon_img" />
            <span className="mob_icon_text">Eyora</span>
          </div>
        </Col>
        <Col
          className={`mob_menu_item_col ${
            activeItem === "settings" ? "active" : ""
          }`}
          onClick={() => handleMenuItemClick("settings")}
        >
          <div className="mob_icon_container_div">
            <SlSettings className="mob_icon_img" />
            <span className="mob_icon_text">Settings</span>
          </div>
        </Col>
      </Row>
      <div
        className={` ${activeItem === "settings" ? "active" : ""}`}
        onClick={() => handleMenuItemClick("profile")}
        style={{
          width: "100%",
          height: "100px",
          paddingTop: "6vh",
          display: "flex",
          justifyContent: "flex-start",
          paddingLeft: "30px",
        }}
      >
        <div className="mob_pofile_container_div">
          <img
            src={amritha}
            alt="Profile"
            style={{
              width: "46px",
              height: "46px",
              borderRadius: "50%",
            }}
          />{" "}
          {/* <SlSettings className="mob_icon_img" /> */}
          <span className="mob_profile_text">Profile</span>
        </div>
      </div>
    </div>
  );
}

export default MobileSidebar;
