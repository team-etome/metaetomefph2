import React, { useState,useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import elogo from "../../../assets/elogo.png";
import { GoHome } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";
import { PiBook } from "react-icons/pi";
import { TbScanEye } from "react-icons/tb";
import { SlNote } from "react-icons/sl";
import { SlSettings } from "react-icons/sl";
import "../sidebar/sidebar.css";
import etomelogo from "../../../assets/etomelogo.png";

function Sidebar() {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("admindashboard")) {
      setActiveItem("home");
    } else if (path.includes("institutionadding")) {
      setActiveItem("institution");
    } else if (path.includes("loka")) {
      setActiveItem("loka");
    } else if (path.includes("aarna")) {
      setActiveItem("aarna");
    } else if (path.includes("eyora")) {
      setActiveItem("eyora");
    } else if (path.includes("settings")) {
      setActiveItem("settings");
    }
  }, [location.pathname]);

  // const handleMenuItemClick = (item) => {
  //   setActiveItem(item);
  // };
  return (
    <div
      className="sidenav_fstdiv"
      style={{
        width: "90px",
        height: "100vh",
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div className="sidebar_header">
        <img
          src={etomelogo}
          alt="Logo"
          style={{
            width: "162px",
            height: "63px",
            display: "block",
          }}
        />
      </div>
      <Row
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "60%",
          width: "112px",
          alignItems: "center",
          alignContent: "center",
          marginTop: "10vh",
        }}
      >
        <Link to="/admindashboard" style={{textDecoration:'none', color:'inherit'}}>
          <Col
            className={`menu_item_col  ${activeItem === "home" ? "active" : ""}`}
            onClick={() => setActiveItem("home")}
          >
            <div className="icon_container_div ">
              <GoHome className="icon_img" />
              <span className="icon-text">Home</span>
            </div>
          </Col>
        </Link>
        <Col
          className={`menu_item_col ${
            activeItem === "institution" ? "active" : ""
          }`}
          onClick={() => setActiveItem("institution")}
        >
          <Link to="/institutionadding" style={{textDecoration:'none', color:'inherit'}}>
            <div className="icon_container_div">
              <RxDashboard className="icon_img" />
              <span className="icon-text">Institution</span>
            </div>
          </Link>
        </Col>
        <Col
          className={`menu_item_col ${activeItem === "loka" ? "active" : ""}`}
          // onClick={() => handleMenuItemClick("loka")}
        >
          <div className="icon_container_div">
            <PiBook className="icon_img" />
            <span className="icon-text">Loka</span>
          </div>
        </Col>
        <Col
          className={`menu_item_col ${activeItem === "aarna" ? "active" : ""}`}
          // onClick={() => handleMenuItemClick("aarna")}
        >
          <Link to='/aarnanavbar'style={{textDecoration:'none', color:'inherit'}}>
          <div className="icon_container_div">
            <SlNote className="icon_img" />
            <span className="icon-text">Aarna</span>
          </div>
          </Link>
        </Col>
        <Col
          className={`menu_item_col ${activeItem === "eyora" ? "active" : ""}`}
          // onClick={() => handleMenuItemClick("eyora")}
        >
          <div className="icon_container_div">
            <TbScanEye className="icon_img" />
            <span className="icon-text">Eyora</span>
          </div>
        </Col>
        <Col
          className={`menu_item_col ${
            activeItem === "settings" ? "active" : ""
          }`}
          // onClick={() => handleMenuItemClick("settings")}
        >
          <div className="icon_container_div">
            <SlSettings className="icon_img" />
            <span className="icon-text">Settings</span>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Sidebar;
