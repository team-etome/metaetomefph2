import React from 'react';
import "../sidebar/sidebar.css";
import { Col, Row, } from "react-bootstrap";
import { GoHome } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";
import { PiBook } from "react-icons/pi";
import { TbScanEye } from "react-icons/tb";
import { SlNote } from "react-icons/sl";
import { SlSettings } from "react-icons/sl";
import { MdOutlineClose } from "react-icons/md";

function MobileSidebar({ show, onClose }) {
    return (
        <div className={`mobile_sidebar ${show ? 'show' : ''}`}>
            <div className="mobile_sidebar_header" >
                <MdOutlineClose onClick={onClose} style={{ width: "30px", height: "30px", }} />
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
                   
                }}>
                <Col className='mob_menu_item_col'>
                    <div className='mob_icon_container_div'>
                        <GoHome className="mob_icon_img" />
                        <span className="mob_icon_text">Home</span>
                    </div>
                    </Col>
                    <Col className='mob_menu_item_col'>
                    <div className='mob_icon_container_div'>
                        <RxDashboard className="mob_icon_img" />
                        <span className="mob_icon_text">Institution</span>
                    </div>
                    </Col>
                    <Col className='mob_menu_item_col'>
                    <div className='mob_icon_container_div'>
                        <PiBook  className="mob_icon_img" />
                        <span className="mob_icon_text">Loka</span>
                    </div>
                    </Col>
                    <Col className='mob_menu_item_col'>
                    <div className='mob_icon_container_div'>
                        <SlNote  className="mob_icon_img" />
                        <span className="mob_icon_text">Aarna</span>
                    </div>
                    </Col>
                    <Col className='mob_menu_item_col'>
                    <div className='mob_icon_container_div'>
                        <TbScanEye className="mob_icon_img" />
                        <span className="mob_icon_text">Eyora</span>
                    </div>
                    </Col>
                    <Col className='mob_menu_item_col'>
                    <div className='mob_icon_container_div'>
                        <SlSettings  className="mob_icon_img" />
                        <span className="mob_icon_text">Settings</span>
                    </div>
                    </Col>

            </Row>
            {/* <div className="mobile_sidebar_content">
                <div className='menu_item_col'>
                    <div className='icon_container_div'>
                        <GoHome className="icon_img" />
                        <span className="icon-text">Home</span>
                    </div>
                </div>
                <div className='menu_item_col'>
                    <div className='icon_container_div'>
                        <RxDashboard className="icon_img" />
                        <span className="icon-text">Institution</span>
                    </div>
                </div>
                <div className='menu_item_col'>
                    <div className='icon_container_div'>
                        <PiBook className="icon_img" />
                        <span className="icon-text">Loka</span>
                    </div>
                </div>
                <div className='menu_item_col'>
                    <div className='icon_container_div'>
                        <SlNote className="icon_img" />
                        <span className="icon-text">Aarna</span>
                    </div>
                </div>
                <div className='menu_item_col'>
                    <div className='icon_container_div'>
                        <TbScanEye className="icon_img" />
                        <span className="icon-text">Eyora</span>
                    </div>
                </div>
                <div className='menu_item_col'>
                    <div className='icon_container_div'>
                        <SlSettings className="icon_img" />
                        <span className="icon-text">Settings</span>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default MobileSidebar
