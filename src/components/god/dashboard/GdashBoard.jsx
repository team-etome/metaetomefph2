import React, { useState } from 'react';
import { Col, Container, Row, Tabs, Tab } from 'react-bootstrap';
import etomelogo from '../../../assets/etomelogo.png';
import { IoIosSearch} from "react-icons/io";
import "../dashboard/gdashboard.css";
import { IoAddSharp } from "react-icons/io5";
import { Link } from "react-router-dom";




function GdashBoard() {

    const [activeTab, setActiveTab] = useState('Institution');

    const institutions = [
        { name: 'St Johns Residential HSS', board: 'ICSE', id: '024234' },
       
        { name: 'Amrita Vishwa Vidyapeedam', board: 'CBSE', id: '024234' },
        { name: 'Amrita Vishwa Vidyapeedam', board: 'CBSE', id: '024234' },
        { name: 'Amrita Vishwa Vidyapeedam xczvfbbbbbbbbb1111111111111111111111111111111111111', board: 'CBSE', id: '024234' },
        { name: 'Amritadcvdsvgbsdgvbdsgsdgsdvgdxsdsgsdgsdgswrgdsdvdsvsdgfeasegfswdgfsd Vishwa Vidyapeedam', board: 'CBSE', id: '024234' },
        { name: 'Amrita Vishwa Vidyapeedam', board: 'CBSE', id: '024234' },
        { name: 'Amrita Vishwa Vidyapeedam', board: 'CBSE', id: '024234' },
        { name: 'Amrita Vishwa Vidyapeedam', board: 'CBSE', id: '024234' },
        { name: 'Amrita Vishwa Vidyapeedam', board: 'CBSE', id: '024234' }, { name: 'Amrita Vishwa Vidyapeedam', board: 'CBSE', id: '024234' },
        { name: 'Amrita Vishwa Vidyapeedam', board: 'CBSE', id: '024234' }, { name: 'Amrita Vishwa Vidyapeedam', board: 'CBSE', id: '024234' }, { name: 'Amrita Vishwa Vidyapeedam', board: 'CBSE', id: '024234' }, { name: 'Amrita Vishwa Vidyapeedam', board: 'CBSE', id: '024234' }, { name: 'Amrita Vishwa Vidyapeedam', board: 'CBSE', id: '024234' },
        // ... other institutions
    ];

    const textbooks = [
        // ... Array of textbooks
    ];
    const renderInstitutions = () => (
        <>
           
            <Row className="card-container">
                {institutions.map((inst, index) => (
                    <Col key={index} md={4} lg={3} className="mb-4" style={{
                        width: "304px",
                        height: "150px",
                        borderRadius: "11px",
                        color: "#526D82",
                        border: "2px solid #526D82",
                        backgroundColor: "#ffff",
                        marginRight: "20px",
                        marginBottom: "20px",
                        padding: '20px',
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <Row style={{ maxHeight: '60px', overflow: 'hidden' }}>
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
                                {inst.name}
                            </p>
                        </Row>
                        <Row style={{ display: "flex", justifyContent: "space-between", height: '70px', paddingTop: "40px" }}>
                            <Col style={{ display: "flex", justifyContent: "start" }}>
                                <p style={{ margin: '0' }}>{inst.board}</p>
                            </Col>
                            <Col style={{ display: "flex", justifyContent: "end" }}>
                                <p style={{ margin: '0' }}>{inst.id}</p>
                            </Col>
                        </Row>
                    </Col>
                ))}
            </Row>
        </>
    );

    const renderTextbooks = () => (
        <>
           
            <Row>
                {/* Placeholder for textbooks */}
            </Row>
        </>
    );

    return (
        <div style={{ backgroundColor: "#DDE6ED", height: "100vh", overflowY: "hidden" }}>
            <Container>
                <Row md={12}>
                    <Col md={6} xs={4}>
                        <img src={etomelogo} alt="logo" style={{
                            width: "114px",
                            height: "45px",
                            marginTop: "45px"
                        }} />
                    </Col>
                    <Col className='gd_dash_src_col' md={6} xs={8} style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        marginTop: "47px",
                    }}>
                        <div className="search">
                            <input type="text" className="search__input" placeholder="Search school here" />
                            <button className="search__button">
                                <IoIosSearch className="search__icon" aria-hidden="true" />
                            </button>
                        </div>
                    </Col>
                </Row>
                <Row>
               <button className='add-button'>Add customer</button>
                    <Col md={12} style={{ marginTop: "30px" }}>
                        <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
                            <Tab eventKey="Institution" title="Institution">
                                {renderInstitutions()}
                            </Tab>
                            <Tab eventKey="Textbook" title="Textbook">
                                {renderTextbooks()}
                            </Tab>
                        </Tabs>
                       
                    </Col>
                   
                    
                </Row>
            </Container>
        </div>
    )
}

export default GdashBoard



