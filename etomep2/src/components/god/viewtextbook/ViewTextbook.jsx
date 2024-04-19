import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import chemistryImage from "../../../assets/chemistry.png";
import { AiOutlineClose } from 'react-icons/ai';

function ViewTextbook({ show, handleClose }) {
  return (
    <div style={{}}>  
    <Modal show={show} onHide={handleClose}  centered  style={{}}>
    <div style={{ width:'100%' , height: '100%' ,color:'#526D82'}}>
    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' ,}}>
    <AiOutlineClose size={24} onClick={handleClose} style={{ cursor: 'pointer', boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px" }} />
          </div>
        {/* <Modal.Header closeButton >
            <Modal.Title>Chemistry Textbook for Class XII</Modal.Title>
        </Modal.Header> */}
        <div style={{display:'flex',  justifyContent: 'center', marginLeft:'20px', marginRight:'40px' }}>

            <div style={{ width: '40%', paddingLeft:'1px', paddingRight:'1px',paddingTop:'10px',paddingBottom:'10px', marginLeft:'10px', marginBottom:'10px'}}>
                <div style={{ width: '100%', height: '100%', backgroundColor: '#DDE6ED',paddingTop:'1px',paddingBottom:'20px', paddingRight:'20px',paddingLeft:'20px',display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={chemistryImage} alt="Chemistry Textbook" style={{ width: '160px', height: 'auto', marginTop:'20px',   }}/>
            </div>
            </div>
            <div style={{ width: '70%' , }}>
            <Modal.Body style={{marginLeft:'40px', }}>
                <h5 style={{marginBottom:'15px', fontWeight:'600', fontFamily:'Poppins', }}>Chemistry</h5>
                <div style={{ padding:'0px'}}>
                <p style={{fontWeight:'600', fontFamily:'Poppins', marginBottom: '10px'}}> Class XII</p>
                <p style={{ fontWeight:'600', fontFamily:'Poppins', marginBottom: '10px'}}><Link to="" target="_blank" rel="noopener noreferrer">Textbook link</Link> </p>
                <p style={{ fontWeight:'600', fontFamily:'Poppins',marginBottom: '10px'}}>Publisher Name</p>
                <p style={{fontWeight:'600', fontFamily:'Poppins',marginBottom: '10px'}}>Volume II</p>
                <p style={{fontWeight:'600', fontFamily:'Poppins',marginBottom: '10px'}}>Total No. of Chapters</p>
                </div>
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