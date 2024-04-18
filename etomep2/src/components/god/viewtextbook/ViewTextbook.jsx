import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import chemistryImage from "../../../assets/chemistry.png";


function ViewTextbook({ show, handleClose }) {
  return (
    <div style={{}}>  
    <Modal show={show} onHide={handleClose}  >
    <div style={{ width:'100%', }}>
        <Modal.Header closeButton >
            <Modal.Title>Chemistry Textbook for Class XII</Modal.Title>
        </Modal.Header>
        <div style={{display:'flex', display: 'flex', justifyContent: 'center', marginLeft:'20px' }}>
            <div style={{ width: '30%' }}>
            <img src={chemistryImage} alt="Chemistry Textbook" style={{ width: '100%', height: 'auto', marginTop:'30px',  }}/>
            </div>
            <div style={{ width: '70%' , opacity: '0.73'}}>
            <Modal.Body>
                <p><Link to="https://www.amazon.in/s?i=stripbooks&rh=p_27%3AUSHA.V+MSC.MATHS&ref=dp_byline_sr_book_1" target="_blank" rel="noopener noreferrer">Textbook link</Link> </p>
                <p>Syllabus.</p>
                <p>Publisher Name</p>
                <p>Volume</p>
                <p>Total No. of Chapters</p>
            </Modal.Body>
            </div>
        </div>
        {/* <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            Close
            </Button>
        </Modal.Footer> */}
        </div>
        </Modal>
    </div>
  )
}

export default ViewTextbook