import React, { useState, useEffect } from "react";
import etomelogo from "../../../assets/etomelogo.png";
import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import "../header/header.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { FiBell } from "react-icons/fi";
import amritha from "../../../assets/amritha.png";
import MobileSidebar from "../sidebar/MobileSidebar";
import MobileNotification from "../../teacher/mobilenotification/MobileNotification";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function TeacherH() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const teacherInfo = useSelector((state) => state.teacherinfo.teacherinfo);
  console.log(teacherInfo,"dataaaa")
  const navigate = useNavigate();

  const handleBurgerClick = () => {
    setSidebarVisible(true);
  };

  const handleCloseSidebar = () => {
    setSidebarVisible(false);
  };
  const handleBellIconClick = () => {
    setShowModal(true); 
  };
  const handleCloseModal = () => {
    setShowModal(false); 
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 799px)"); 

    const handleMediaQueryChange = (e) => {
      if (e.matches) {
        setSidebarVisible(false);
      }
    };

    mediaQuery.addListener(handleMediaQueryChange);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handlenavigate = () => {
    navigate("/teacherprofile",);
  };

  return (
    <>
      <Navbar expand="lg" className="header_container">
        <Container fluid>
          <Navbar.Brand href="#" className="header">
            <div className="header_menu" onClick={handleBurgerClick}>
              <RxHamburgerMenu />
            </div>
            <div className="header_logo">
              <img src={etomelogo} alt="etome logo" />
            </div>
          </Navbar.Brand>
          <div className="tch_header_institution">
            <div>
              {/* <h6 style={{ color: "#red", fontSize: "30px" }}>
                {}
              </h6> */}
              <h6 style={{ color: "#727272", fontSize: "20px", fontWeight:'400',}}>
                {}
{/*                Navya Maria jaisonnnnn */}
              </h6>
            </div>
            <img
              onClick={handlenavigate}
              src={teacherInfo?.image || " "}
              alt="Profile"
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                marginRight: "30px",
                cursor: "pointer",
              }}
            />
          </div>
          <div className="notification_icon" onClick={handleBellIconClick}>
            <FiBell />
          </div>
        </Container>
        <MobileSidebar show={sidebarVisible} onClose={handleCloseSidebar} />
      </Navbar>
      {showModal && <MobileNotification onClose={handleCloseModal} />}
    </>
  );
}
export default TeacherH;
