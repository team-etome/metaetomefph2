import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import etomelogo from '../../../assets/etomelogo.png'
import { IoIosSearch } from "react-icons/io";
import "../dashboard/gdashboard.css"
import { IoAddSharp } from "react-icons/io5";
import { PiChalkboardTeacher } from "react-icons/pi";
import { GoBook } from "react-icons/go";

function GdashBoard() {
    return (
        <div style={{ backgroundColor: "#DDE6ED", height: "100vh", overflowY: "hidden" }}>
            <Container>
                <Row md={12}  >
                    <Col md={6} xs={6}>
                        <img src={etomelogo} alt="logo"
                            style=
                            {{
                                width: "114px",
                                height: "45px",
                                marginTop: "45px"
                            }}
                        /></Col>
                    <Col md={6} xs={6}
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            marginTop: "47px",


                        }}>
                        <div className="search">
                            <input type="text" className="search__input" placeholder="Search school here" />
                            <button className="search__button">
                                <IoIosSearch className="search__icon" aria-hidden="true" /> </button>
                        </div>
                    </Col>
                </Row>

                <Row md={12} style={{
                    marginTop: "30px",
                    paddingRight: "5px",

                }}>
                    <Col className='dbheading' md={6} xs={12}>
                        <div className="menu_gd_dash">
                            <div className="menu-item">
                                <div ><PiChalkboardTeacher className="icon_gd_dashicon"/></div>
                                <div className="label">Institution</div>
                                <div><hr/></div>
                            </div>
                            <div className="menu-item">
                                <div className="icon"><GoBook className="icon_gd_dashicon"/></div>
                                <div className="label">Textbook</div>
                            </div>
                        </div>
                    </Col>


                    <Col className='dboption_col' md={6} xs={12}>



                        <Row
                            className='dbiconsbtn'
                            style={{
                                width: "105px",
                                height: "45px",
                                borderRadius: "8px",
                                color: "#526D82",
                                border: " 2px solid #526D82",
                                display: "flex",
                                textAlign: "center",
                                justifyContent:"flex-end",
                                paddingTop: "9px",
                                marginLeft: "28px",
                                marginRight: "5px",
                                backgroundColor: "#ffff",
                            }}>
                            <p style={{ fontWeight: "600" }}> <IoAddSharp />
                                <span className="hide-on-mobile"> Add</span>
                            </p>
                        </Row>

                    </Col>
                </Row>

                <Row className='dbcardrow' md={12}
                    style={{
                        paddingLeft: "20px",
                        paddingTop: "15px",
                        overflowY: "scroll",
                        height: "500px"
                    }}>



                    <Col md={3} xs={12} style={{
                        width: "304px",
                        height: "150px",
                        borderRadius: "11px",
                        color: "#526D82",
                        border: "2px solid #526D82",
                        backgroundColor: "#ffff",
                        marginRight: "20px",
                        marginBottom: "20px",
                        padding: '10px',
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <Row style={{
                            maxHeight: '60px',
                            overflow: 'hidden'
                        }}>
                            <p style={{
                                fontWeight: "600",
                                textAlign: "start",
                                margin: "2px 0",
                                lineHeight: '1.2',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: '2',
                                WebkitBoxOrient: 'vertical'
                            }}>
                                St Johns Residential HSS g
                            </p>
                        </Row>
                        <Row style={{ display: "flex", justifyContent: "space-between", height: '70px', paddingTop: "40px" }}>
                            <Col style={{ display: "flex", justifyContent: "start" }}>
                                <p style={{ margin: '0' }}>ICSE</p>
                            </Col>
                            <Col style={{ display: "flex", justifyContent: "end" }}>
                                <p style={{ margin: '0' }}>024234</p>
                            </Col>
                        </Row>
                    </Col>



                    <Col md={3} xs={12} style={{
                        width: "304px",
                        height: "150px",
                        borderRadius: "11px",
                        color: "#526D82",
                        border: "2px solid #526D82",
                        backgroundColor: "#ffff",
                        marginRight: "20px",
                        marginBottom: "20px",
                        padding: '10px',
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <Row style={{
                            maxHeight: '60px',
                            overflow: 'hidden'
                        }}>
                            <p style={{
                                fontWeight: "600",
                                textAlign: "start",
                                margin: "2px 0",
                                lineHeight: '1.2',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: '2',
                                WebkitBoxOrient: 'vertical'
                            }}>
                                St Johns Residential HSS g
                            </p>
                        </Row>
                        <Row style={{ display: "flex", justifyContent: "space-between", height: '70px', paddingTop: "40px" }}>
                            <Col style={{ display: "flex", justifyContent: "start" }}>
                                <p style={{ margin: '0' }}>ICSE</p>
                            </Col>
                            <Col style={{ display: "flex", justifyContent: "end" }}>
                                <p style={{ margin: '0' }}>024234</p>
                            </Col>
                        </Row>
                    </Col> <Col md={3} xs={12} style={{
                        width: "304px",
                        height: "150px",
                        borderRadius: "11px",
                        color: "#526D82",
                        border: "2px solid #526D82",
                        backgroundColor: "#ffff",
                        marginRight: "20px",
                        marginBottom: "20px",
                        padding: '10px',
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <Row style={{
                            maxHeight: '60px',
                            overflow: 'hidden'
                        }}>
                            <p style={{
                                fontWeight: "600",
                                textAlign: "start",
                                margin: "2px 0",
                                lineHeight: '1.2',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: '2',
                                WebkitBoxOrient: 'vertical'
                            }}>
                                St Johns Residential HSS g
                            </p>
                        </Row>
                        <Row style={{ display: "flex", justifyContent: "space-between", height: '70px', paddingTop: "40px" }}>
                            <Col style={{ display: "flex", justifyContent: "start" }}>
                                <p style={{ margin: '0' }}>ICSE</p>
                            </Col>
                            <Col style={{ display: "flex", justifyContent: "end" }}>
                                <p style={{ margin: '0' }}>024234</p>
                            </Col>
                        </Row>
                    </Col> <Col md={3} xs={12} style={{
                        width: "304px",
                        height: "150px",
                        borderRadius: "11px",
                        color: "#526D82",
                        border: "2px solid #526D82",
                        backgroundColor: "#ffff",
                        marginRight: "20px",
                        marginBottom: "20px",
                        padding: '10px',
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <Row style={{
                            maxHeight: '60px',
                            overflow: 'hidden'
                        }}>
                            <p style={{
                                fontWeight: "600",
                                textAlign: "start",
                                margin: "2px 0",
                                lineHeight: '1.2',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: '2',
                                WebkitBoxOrient: 'vertical'
                            }}>
                                St Johns Residential HSS g
                            </p>
                        </Row>
                        <Row style={{ display: "flex", justifyContent: "space-between", height: '70px', paddingTop: "40px" }}>
                            <Col style={{ display: "flex", justifyContent: "start" }}>
                                <p style={{ margin: '0' }}>ICSE</p>
                            </Col>
                            <Col style={{ display: "flex", justifyContent: "end" }}>
                                <p style={{ margin: '0' }}>024234</p>
                            </Col>
                        </Row>
                    </Col>


                </Row>
            </Container>
        </div>
    )
}

export default GdashBoard