import React from "react";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import chemistryImage from "../../../assets/chemistry.png";
import { AiOutlineClose } from "react-icons/ai";

function ViewTextbook({ show, handleClose }) {
  return (
    <div style={{}}>
      <Container>
        <Modal show={show} onHide={handleClose} centered>
          <div style={{ width: "100%", height: "100%",  }}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "10px",
              }}
            >
              <AiOutlineClose
                size={20}
                onClick={handleClose}
                style={{ cursor: "pointer" }}
              />
            </div>
            {/* <Modal.Header closeButton >
            <Modal.Title>Chemistry Textbook for Class XII</Modal.Title>
            </Modal.Header> */}
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Row md={12}>
                    <Col md={6} style={{border:'1px solid #526D82', width:'200px', height:'240px', display:'flex',  justifyContent:'center'}}>
                    <div style={{ }}>
                        {/* <div> */}
                        <img
                            src={chemistryImage}
                            alt="Chemistry Textbook"
                            style={{
                            width: "160px",
                            height: "auto",
                            marginTop: "20px",
                            }}
                        />
                        {/* </div> */}
                    </div>
                    </Col>
                    <Col md={6}>
                            
                        <div style={{ }}>
                            <Modal.Body style={{ }}>
                            <h5> TextBook Title </h5>
                            <Row>
                            <Col md={6}>
                            <div style={{ }}>
                                <p> Class </p>
                                <p> Publication Name </p>
                                <p> Volume</p>
                                <p> Total No. of Chapters</p>
                            </div>
                            </Col>
                            <Col md={6}>
                            <div style={{ }}>
                                <p> Class </p>
                                <p> Publication Name </p>
                                <p> Volume II </p>
                                <p> Total No. of Chapters</p>
                            </div>
                            </Col>
                            </Row>
                            </Modal.Body>
                        </div>
                    </Col>
                    
              </Row>
            </div>
            <div style={{marginLeft:'20px', marginRight:"20px", marginBottom:'20px', }}>
            {/* <Modal.Footer> */}
                <Row>
                    <Col style={{marginLeft:'40px',}}>
                        <Button variant="secondary" onClick={handleClose}>
                            Edit
                        </Button>
                    </Col>
                    <Col style={{marginLeft:'100px'}}>
                        <Button variant="secondary" onClick={handleClose}>
                            Preview
                        </Button>
                    </Col>
              </Row>
            {/* </Modal.Footer> */}
            </div>
          </div>
        </Modal>
      </Container>
    </div>
  );
}

export default ViewTextbook;
