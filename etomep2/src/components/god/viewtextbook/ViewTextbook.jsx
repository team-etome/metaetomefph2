import React from "react";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import chemistryImage from "../../../assets/chemistry.png";
import { AiOutlineClose } from "react-icons/ai";
import "../viewtextbook/viewtextbook.css";
 

function ViewTextbook({ show, handleClose }) {
  return (
    <div style={{}}>
      <Container>
        <Modal show={show} onHide={handleClose} centered  size="lg" >
          <div style={{}}>
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
            <div style={{ display: "flex",  }}>
                <Row md={12}>
                    <Col md={6} style={{border:'0.2px solid #526D82', width:'200px', height:'240px', display:'flex',  justifyContent:'center', marginLeft:'40px'}}>
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
                        <div >
                            <Modal.Body style={{ }}>
                            <h5 style={{display:'flex', alignContent:'center', justifyContent:'center', marginBottom:'20px'}}> TextBook Title </h5>
                            <div style={{ }}>
                            <Row>
                            <Col md={6}>
                            <div style={{color:'#727272', fontSize:'17px' }}>
                                <p> Class </p>
                                <p style={{width:''}}> Publication </p>
                                <p> Volume</p>
                                <p> Total</p>
                            </div>
                            </Col>
                            <Col md={6}>
                            <div style={{ color:'#000000', fontSize:'17px' }}>
                                <p> Class </p>
                                <p> Publication </p>
                                <p> Volume II </p>
                                <p> Total </p>
                            </div>
                            </Col>
                            </Row>
                            </div>
                            </Modal.Body>
                        </div>
                    </Col>  
              </Row>
            </div>
            <div style={{marginLeft:'20px', marginRight:"20px", marginBottom:'20px',marginTop:'20px' }}>
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
