import React from "react";
import { Modal, Button, Row, Col, Image, Form } from "react-bootstrap";
import chemistryImage from "../../../assets/chemistry.png";
import { AiOutlineClose } from "react-icons/ai";
import "../viewtextbook/viewtextbook.css";
import { Link } from "react-router-dom";


function ViewTextbook({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Body>
      <div style={{display:'flex', justifyContent:'flex-end'}}>
        <AiOutlineClose size={20} onClick={handleClose} style={{cursor:'pointer'}}/>
      </div>
        <Row style={{}}>
            <Modal.Header  style={{display:'flex', justifyContent:'center', border:'none'}}>
              <Modal.Title>Chemistry Textbook</Modal.Title>
          </Modal.Header>
        <Col md={4} className="d-flex justify-content-center align-items-center">
            <div style={{}}>
              <Image src={chemistryImage} fluid style={{ width: '180px', height: '220px',  }} />
            </div>
          </Col>

          <Col md={8} style={{width: '300px' , marginLeft:'10px'}}>
            <Form>
              {/* <Form.Group controlId="formTitle">
                <Form.Label style={{ display: 'flex', justifyContent: 'center', fontSize: '20px' }}>CHEMISTRY</Form.Label>
              </Form.Group> */}
              <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  value='chemistry'
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formPublisher">
                <Form.Label>Publisher</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Publisher"
                  value='S.chand'
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formChapters">
                <Form.Label>Total Chapters</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Total Chapters"
                  value='10'
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formVolume">
                <Form.Label>Volume</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Volume"
                  value='II'
                  readOnly
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer style={{border:'none', borderRadius:'8px', }}>
        <Link to='/addbooks'>
        <Button variant="secondary" >
          Edit
        </Button>
        </Link>
        <Button variant="secondary"  style={{backgroundColor:'#5C7689', }}>
          Preview
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ViewTextbook;

// import React from "react";
// import { Modal, Button, Container, Row, Col } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import chemistryImage from "../../../assets/chemistry.png";
// import { AiOutlineClose } from "react-icons/ai";
// import "../viewtextbook/viewtextbook.css";
 

// function ViewTextbook({ show, handleClose }) {
//   return (
    
//       <Container>
//         <Modal show={show} onHide={handleClose} centered  size="lg" >
//           <div >
            // <div
            //   style={{
            //     display: "flex",
            //     justifyContent: "flex-end",
            //     padding: "10px",
            //   }}
            // >
            //   <AiOutlineClose
            //     size={20}
            //     onClick={handleClose}
            //     style={{ cursor: "pointer" }}
            //   />
            // </div>
//             <div style={{ display: "flex",justifyContent:'left' }}>
//                 <Row >
//                     <Col style={{border:'0.2px solid #526D82', display:'flex', marginLeft:'40px', width:'180px', height:'230px',   }}>
//                     <div style={{ }}>
//                         <img
//                             src={chemistryImage}
//                             alt="Chemistry Textbook"
//                             style={{
//                             width: "160px",
//                             height: "auto",
//                             marginTop: "20px",
//                             marginRight:'150px',
//                             }}
//                         />
//                     </div>
//                     </Col>
//                     <Col >   
                      
//                             <Modal.Body style={{ }}>
//                             <h5 style={{display:'flex',  marginBottom:'20px'}}> Textbook Title </h5>
//                             <div style={{ }}>
//                             <Row>
//                             <Col md={6}>
//                             <div style={{color:'#727272',  }}>
//                                 <p > Class </p>
//                                 <p style={{width:'200px'}}> Publication Name</p>
//                                 <p> Volume</p>
//                                 <p style={{width:'200px'}}> Total No. od Chapters</p>
//                                 <Link to='/addbooks'>
//                                 <Button variant="secondary" >
//                                     Edit
//                                 </Button>
//                                 </Link>
//                             </div>
//                             </Col>
//                             <Col md={6}>
//                             <div style={{ color:'#000000',}}>
//                                 <p style={{marginLeft:'20px'}}> Class </p>
//                                 <p style={{width:'200px', marginLeft:'20px'}}> Publication Name </p>
//                                 <p style={{marginLeft:'20px'}}> Volume II </p>
//                                 <p style={{width:'200px', marginLeft:'20px'}}>Total No. of Chapters </p>
//                                 <Button variant="secondary" >
//                                     Preview
//                                 </Button>
//                             </div>
//                             </Col>
//                             </Row>
//                             </div>
//                             </Modal.Body>
                        
//                     </Col>  
//               </Row>
//             </div>
//           </div>
//         </Modal>
//       </Container>
   
//   );
// }

// export default ViewTextbook;
