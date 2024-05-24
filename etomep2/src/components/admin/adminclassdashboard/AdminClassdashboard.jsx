import React from 'react';
import { Col, Container, Row, Card } from "react-bootstrap";
import '../adminclassdashboard/adminclassdashboard.css';
import etomelogo from "../../../assets/etomelogo.png";

function AdminClassdashboard() {
    return (
        <Row>
            <Col md={6} xl={3} style={{marginTop:'50px', marginLeft:'20px'}}>
                <div className="border border-dark text-center">
                <div
                        style={{
                            width: "70px",
                            height: "70px",
                            borderRadius: "50%",
                            marginTop: "-45px",
                            // marginRight: "60%",
                            marginLeft:'5%',
                            backgroundColor: "#F2F2F2",
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                        }}
                    />
                    <p>
                        Facutly Name
                    </p>
                    <p>
                        Facutly Name
                    </p>
                </div>
            </Col>
        </Row>
    );
}

export default AdminClassdashboard;
