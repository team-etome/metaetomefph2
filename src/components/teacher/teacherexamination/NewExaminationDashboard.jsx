import React, { useState, useEffect } from "react";
import {
    Col,
    Container,
    Row,
    Nav,
    InputGroup,
    FormControl,
    Dropdown,
} from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import "./newexaminationdashboard.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NewExaminationPending from "./NewExaminationPending";
import NewExaminationCompleted from "./NewExaminationCompleted";
import NewPendingView from './NewPendingView';
import NewCompletedView from "./NewCompletedView";

function NewExaminationDashboard() {
    const admininfo = useSelector((state) => state.admininfo);
    console.log(admininfo, "admin info");
    const teacherInfo = useSelector((state) => state.teacherinfo.teacherinfo);
    const handlenavigate = () => {
        navigate("/teacherprofile",);
    };


    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(() =>
        localStorage.getItem("aarnaActiveTab") === "Completed"
            ? "Completed"
            : "Pending"
    );
    useEffect(() => {
        localStorage.setItem("aarnaActiveTab", activeTab);
    }, [activeTab]);
    
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedItemCompleted, setSelectedItemCompleted] = useState(null);

    const handleBackFromDetail = () => {
        setSelectedItem(null);
    };
    const handleBackFromDetailCompleted = () => {
        setSelectedItemCompleted(null);
    };

    if (selectedItem) {
        return (
            <div className="newexaminationdashboard_dashboard">
                <Container className="newexaminationdashboard_main_container">
                    <NewPendingView
                        selectedItem={selectedItem}
                        onBack={handleBackFromDetail}
                    />
                </Container>
            </div>
        );
    }
    if (selectedItemCompleted) {
        return (
            <div className="newexaminationdashboard_dashboard">
                <Container className="newexaminationdashboard_main_container">
                    <NewCompletedView
                        selectedItemCompleted={selectedItemCompleted}
                        onBack={handleBackFromDetailCompleted}
                    />
                </Container>
            </div>
        );
    }

    return (
        <div className="newexaminationdashboard_dashboard" >
            <Container className="newexaminationdashboard_main_container">
                <div className="newexaminationdashboard_row_main">
                    <Row className="newexaminationdashboard_row_header">
                        <Col md={6} className="newexaminationdashboard_header_left_heading">
                            <div className="newexaminationdashboard_title">
                                <p>Aarna</p>
                            </div>
                        </Col>
                        <Col md={6} className="newexaminationdashboard_header_right_profilepic" >
                            <div className="newexaminationdashboard-userinfo">
                                <span className="newexaminationdashboard-email">{teacherInfo?.email || " "}</span>
                                <span className="newexaminationdashboard-avatar">
                                    <img
                                        onClick={handlenavigate}
                                        src={teacherInfo?.image || " "}
                                        alt="Profile"

                                    />
                                </span>
                            </div>
                        </Col>
                    </Row>
                    <Row className="newexaminationdashboard_navbar_row">
                        <Col md={12} className="newexaminationdashboard_header_bottom">
                            <Nav
                                variant="underline"
                                activeKey={activeTab}

                                onSelect={(k) => setActiveTab(k)}

                                className="newexaminationdashboard_dashboard_tab"
                                style={{ width: "100%" }}
                            >
                                <Nav.Item>
                                    <Nav.Link
                                        eventKey="Pending"

                                        className={`newexaminationdashboard_mob_subhead_one ${activeTab === 'Pending' ? 'newexaminationdashboard_active-tab' : 'newexaminationdashboard_inactive-tab'}`}

                                        style={{
                                            textDecoration: "none",
                                        }}
                                    >
                                        Pending
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link
                                        eventKey="Completed"
                                        className={`newexaminationdashboard_mob_subhead_one ${activeTab === 'Completed' ? 'newexaminationdashboard_active-tab' : 'newexaminationdashboard_inactive-tab'}`}
                                        style={{
                                            textDecoration: "none",
                                        }}
                                    >
                                        Completed
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                    </Row>
                </div>
                <div className="newexaminationdashboard_dashboard_container" >
                    {activeTab === "Pending" && <NewExaminationPending onSelectItem={setSelectedItem} />}
                    {activeTab === "Completed" && <NewExaminationCompleted onSelectItem={setSelectedItemCompleted} />}

                </div>
            </Container>
        </div>
    );
}

export default NewExaminationDashboard;
