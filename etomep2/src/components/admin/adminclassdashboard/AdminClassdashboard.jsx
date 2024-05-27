import React from 'react';
import { Col, Container, Row, Card } from "react-bootstrap";
import '../adminclassdashboard/adminclassdashboard.css';
import etomelogo from "../../../assets/etomelogo.png";

function AdminClassdashboard() {
    return (
        <div>
            <Container>
                
            </Container>
        <Container>
        <Row>
            <Col md={6} xl={3} style={{marginTop:'50px', marginLeft:'20px'}}>
                <div className="border border-dark text-center" style={{width:'250px', height:'107px'}}>
                <div
                        style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                            marginTop: "-30px",
                            // marginRight: "60%",
                            marginLeft:'5%',
                            backgroundColor: "#F2F2F2",
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                        }}
                    ></div>
                    <div>
                    <p>
                        Facutly Name
                    </p>
                    <p>
                        Facutly Name
                    </p>
                    </div>
                </div>
            </Col>
        </Row>
        </Container>
        </div>
    );
}

export default AdminClassdashboard;
