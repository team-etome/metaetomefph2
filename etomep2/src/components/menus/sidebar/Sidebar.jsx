
import React from 'react';
import { Col, Row, } from "react-bootstrap";
import elogo from '../../../assets/elogo.png';
import { GoHome } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";
import { PiBook } from "react-icons/pi";
import { TbScanEye } from "react-icons/tb";
import { SlNote } from "react-icons/sl";
import { SlSettings } from "react-icons/sl";
import "../sidebar/sidebar.css"


function Sidebar() {


  return (
    <div
      className='sidenav_fstdiv'
      style={{
        width: "90px",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: 'column'
      }}>


      <Row
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "60%",
          width: "112px",
          alignItems: "center",
          alignContent: "center",

        }}>
        <Col className='menu_item_col'>
          <div className='icon_container_div'>
            <GoHome  className="icon_img" />
            <span className="icon-text">Home</span>
          </div>
        </Col>
        <Col className='menu_item_col'>
        <div className='icon_container_div'>
            < RxDashboard  className="icon_img"/>
            <span className="icon-text">Institution</span>
          </div>
        </Col>
        <Col className='menu_item_col'>
          <div  className='icon_container_div'>
            <PiBook  className="icon_img" />
            <span className="icon-text">Loka</span>
          </div>
        </Col>
        <Col className='menu_item_col'>
        <div className='icon_container_div'>
            <SlNote  className="icon_img" />
            <span className="icon-text">Aarna</span>
          </div>
        </Col>
        <Col className='menu_item_col'>
          <div className='icon_container_div'>
            <TbScanEye className="icon_img" />
            <span className="icon-text">Eyora</span>
          </div>
        </Col>
        <Col className='menu_item_col'>
        <div className='icon_container_div'>
            < SlSettings  className="icon_img" />
            <span className="icon-text">Settings</span>
          </div>
        </Col>

      </Row>



    </div>
  )
}

export default Sidebar