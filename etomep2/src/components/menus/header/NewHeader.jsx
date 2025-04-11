import React, { useState, useEffect } from "react";
import etomelogo from "../../../assets/etomelogo.png";
import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import "../header/Newheader.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { FiBell } from "react-icons/fi";
import amritha from "../../../assets/amritha.png";
import MobileSidebar from "../sidebar/MobileSidebar";
import MobileNotification from "../../teacher/mobilenotification/MobileNotification";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function NewHeader({ activeItemLabel }) {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const admininfo = useSelector((state) => state.admininfo);
  console.log(admininfo, "admin info");

  const navigate = useNavigate();

  const handleBurgerClick = () => {
    setSidebarVisible(true);
  };

  const handleCloseSidebar = () => {
    setSidebarVisible(false);
  };
  const handleBellIconClick = () => {
    setShowModal(true); // Show modal when bell icon is clicked
  };
  const handleCloseModal = () => {
    setShowModal(false); // Close modal
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 799px)"); // Adjust the breakpoint as needed

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
    navigate('/adminprofile', { state: { admininfo: admininfo.admininfo } });
  };

  return (
    <>
      <Navbar style={{
        border: "2px solid yellow"
      }} className="newheader_container_main">
        <Container style={{
           border: "2px solid red"
        }} className="newheader_container">
          <Navbar.Brand href="#" className="newheader">
            <div className="newheader_menu" onClick={handleBurgerClick}>
              <RxHamburgerMenu />
            </div>
            {/* <div className="newheader_logo">
              <img src={etomelogo} alt="etome logo" />
            </div> */}
            <div className="newheader_logo" style={{ border: "2px solid blue" }}>
              {/* Displaying the active item label dynamically */}
              <p>{activeItemLabel}</p>
            </div>
          </Navbar.Brand>
          <div className="newheader_institution">
            <div className="hd_title">
              {/* <h6 style={{ color: "#9DB2BF", fontSize: "20px" }}>
                {admininfo.admininfo?.institute_name}
              </h6> */}
              <p style={{ color: "#727272", }}>
                {admininfo.admininfo?.email}
              </p>
            </div>
            <img
              onClick={handlenavigate}
              src={admininfo.admininfo?.logo}
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
                                <Nav.Item>
                                    <Nav.Link eventKey="Time Table" className="ad_aarna_mob_subhead_one"style={{textDecoration:'none'}}>
                                        Time Table
                                    </Nav.Link>
                                </Nav.Item>
        <Container>

        </Container>

        <MobileSidebar show={sidebarVisible} onClose={handleCloseSidebar} />


       

      </Navbar>
      {showModal && <MobileNotification onClose={handleCloseModal} />}
    </>
  );
}
export default NewHeader;
