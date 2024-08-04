import React, { useState, useEffect } from 'react';
import etomelogo from "../../../assets/etomelogo.png";
import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import '../header/header.css';
import { RxHamburgerMenu } from "react-icons/rx";
// import { FiBell } from 'react-icons/fi';
import amritha from "../../../assets/amritha.png";
import MobileSidebar from '../sidebar/MobileSidebar';
import MobileNotification from '../../teacher/mobilenotification/MobileNotification';

function Header() {

    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleBurgerClick = () => {
        setSidebarVisible(true);
    };

    const handleCloseSidebar = () => {
        setSidebarVisible(false);
    };
    // const handleBellIconClick = () => {
    //     setShowModal(true); // Show modal when bell icon is clicked
    // };
    const handleCloseModal = () => {
        setShowModal(false); // Close modal
    };

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 799px)'); // Adjust the breakpoint as needed

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

    return (
        <>
            <Navbar expand="lg"
                className='header_container'>
                <Container fluid>

                    <Navbar.Brand href="#" className='header' >
                        <div className='header_menu' onClick={handleBurgerClick}>
                            <RxHamburgerMenu />
                        </div>
                        <div className='header_logo'>
                            <img
                                src={etomelogo}
                                alt="etome logo" />
                        </div>

                    </Navbar.Brand>
                    <div className='header_institution'>
                        <div>
                            <h6 style={{ color: '#9DB2BF', fontSize: '17px' }}>Institute Name</h6>
                            <p style={{ color: '#727272', fontSize: '12px' }}>Institutemail@gmail.com</p>
                        </div>
                        <img
                            src={amritha}
                            alt="Profile"
                            style={{
                                width: "52px",
                                height: "52px",
                                borderRadius: "50%",
                                marginRight: "30px",
                            }}
                        />
                    </div>

                </Container>
                <MobileSidebar show={sidebarVisible} onClose={handleCloseSidebar} />
            </Navbar>
            {showModal && <MobileNotification onClose={handleCloseModal} />}
        </>
    );
}
export default Header;


