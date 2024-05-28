import Reactm, {useState, useEffect} from 'react';
import etomelogo from "../../../assets/etomelogo.png";
import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import { BsSearch, BsFilterRight } from "react-icons/bs";
import '../header/header.css';
import { GiHamburgerMenu } from "react-icons/gi";
import amritha from "../../../assets/amritha.png";
import MobileSidebar from '../sidebar/MobileSidebar';

function Header() {

    const [sidebarVisible, setSidebarVisible] = useState(false);

    const handleBurgerClick = () => {
        setSidebarVisible(true);
    };

    const handleCloseSidebar = () => {
        setSidebarVisible(false);
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
        <Navbar expand="lg"
            style={{
                backgroundColor: '#ffff',
                height: "12vh",
                width: "100%",
                zIndex: "10",
                position: "fixed",
                top: "0",
                left: "0",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}>
            <Container fluid>

                <Navbar.Brand href="#" className='header' >
                    <div className='header_menu' onClick={handleBurgerClick}>
                        <GiHamburgerMenu />
                    </div>
                    <div className='header_logo'>
                        <img
                            src={etomelogo}
                            alt="etome logo"
                            style={{
                                width: "162px",
                                height: "63px",
                                display: 'flex',
                                justifyContent: 'center',
                                alignContent: 'center',
                                alignItems: 'center'
                            }}
                        />
                    </div>

                </Navbar.Brand>
                <div className='header_institution' style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
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
    );
}
export default Header;


