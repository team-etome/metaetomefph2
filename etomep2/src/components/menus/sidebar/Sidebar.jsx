import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { GoHome } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";
import { PiBook } from "react-icons/pi";
import { SlNote, SlSettings } from "react-icons/sl";
import { TbScanEye } from "react-icons/tb";
import "../sidebar/sidebar.css";
import etomelogo from "../../../assets/etomelogo.png";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate(); // Ensure this is imported and used
  const [activeItem, setActiveItem] = useState(null);

  const teacher = useSelector((state) => state.teacherinfo);
  const teacher_token = teacher.teacherinfo?.teacher_token;

  useEffect(() => {
    const path = location.pathname;
    const routes = {
      "/admindashboard": "home",
      "/teacherstudentdashboard": "institution",
      "/teachersubject": "loka",
      "/teacherexamination": "aarna",
      "/settings": "settings",
      "/institutionadding": "institution",
      "/adminlokanavbar": "loka",
      "/aarnanavbar": "aarna",
      "/eyora": "eyora",
      "/teacherhome": "teacherhome",
    };

    if (teacher_token) {
      routes["/teacherstudentdashboard"] = "institution";
      routes["/teachersubject"] = "loka";
      routes["/teacherexamination"] = "aarna";
    }

    const found = Object.keys(routes).find((route) => path.includes(route));
    setActiveItem(routes[found] || null);
  }, [location.pathname, teacher_token]);

  return (
    <div className="sidenav_fstdiv">
      <div className="sidebar_header">
        <img
          src={etomelogo}
          alt="Logo"
          style={{ width: "110px", height: "40px", display: "block" }}
        />
      </div>
      <Row
        style={{
          display: "flex",
          flexDirection: "column",
          height: "60%",
          width: "112px",
          justifyContent: "space-between",
          marginTop: "10vh",
        }}
      >
        {teacher_token ? (
          <>
            <Link to="/teacherhome" style={{ textDecoration: "none", color: "inherit" }}>
              <Col className={`menu_item_col ${activeItem === "teacherhome" ? "active" : ""}`}>
                <div className="icon_container_div">
                  <GoHome className="icon_img" />
                  <span className="icon-text">Home</span>
                </div>
              </Col>
            </Link>

            <Link to="/teacherstudentdashboard" style={{ textDecoration: "none", color: "inherit" }}>
              <Col className={`menu_item_col ${activeItem === "institution" ? "active" : ""}`}>
                <div className="icon_container_div">
                  <RxDashboard className="icon_img" />
                  <span className="icon-text">My Class</span>
                </div>
              </Col>
            </Link>
            <Link to="/teachersubject" style={{ textDecoration: "none", color: "inherit" }}>
              <Col className={`menu_item_col ${activeItem === "loka" ? "active" : ""}`}>
                <div className="icon_container_div">
                  <PiBook className="icon_img" />
                  <span className="icon-text">Subjects</span>
                </div>
              </Col>
            </Link>
            <Link to="/teacherexamination" style={{ textDecoration: "none", color: "inherit" }}>
              <Col className={`menu_item_col ${activeItem === "aarna" ? "active" : ""}`}>
                <div className="icon_container_div">
                  <SlNote className="icon_img" />
                  <span className="icon-text">Aarna</span>
                </div>
              </Col>
            </Link>
            <Link to="/settings" style={{ textDecoration: "none", color: "inherit" }}>
              <Col className={`menu_item_col ${activeItem === "settings" ? "active" : ""}`}>
                <div className="icon_container_div">
                  <SlSettings className="icon_img" />
                  <span className="icon-text">Settings</span>
                </div>
              </Col>
            </Link>
          </>



        ) : (
          <>
          
            <Link to="/admindashboard" style={{ textDecoration: "none", color: "inherit" }}>
              <Col className={`menu_item_col ${activeItem === "home" ? "active" : ""}`}>
                <div className="icon_container_div">
                  <GoHome className="icon_img" />
                  <span className="icon-text">Home</span>
                </div>
              </Col>
            </Link>



            <Link to="/institutionadding" style={{ textDecoration: "none", color: "inherit" }}>
              <Col className={`menu_item_col ${activeItem === "institution" ? "active" : ""}`}>
                <div className="icon_container_div">
                  <RxDashboard className="icon_img" />
                  <span className="icon-text">Institution</span>
                </div>
              </Col>
            </Link>




            <Link to="/adminlokanavbar" style={{ textDecoration: "none", color: "inherit" }}>
              <Col className={`menu_item_col ${activeItem === "loka" ? "active" : ""}`}>
                <div className="icon_container_div">
                  <PiBook className="icon_img" />
                  <span className="icon-text">Loka</span>
                </div>
              </Col>
            </Link>




            <Link to="/aarnanavbar" style={{ textDecoration: "none", color: "inherit" }}>
              <Col className={`menu_item_col ${activeItem === "aarna" ? "active" : ""}`}>
                <div className="icon_container_div">
                  <SlNote className="icon_img" />
                  <span className="icon-text">Aarna</span>
                </div>
              </Col>
            </Link>


            <Link  style={{ textDecoration: "none", color: "inherit" }}>
            <Col className={`menu_item_col ${activeItem === "eyora" ? "active" : ""}`}>
              <div className="icon_container_div">
                <TbScanEye className="icon_img" />
                <span className="icon-text">Eyora</span>
              </div>
            </Col>
            </Link>

            <Link style={{ textDecoration: "none", color: "inherit" }}>
              <Col className={`menu_item_col ${activeItem === "settings" ? "active" : ""}`}>
                <div className="icon_container_div">
                  <SlSettings className="icon_img" />
                  <span className="icon-text">Settings</span>
                </div>
              </Col>
            </Link>


          </>
        )}
      </Row>
    </div>
  );
}

export default Sidebar;
