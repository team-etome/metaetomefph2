import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import '../adminclassadding/classadding.css';
import { IoChevronBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";


function ClassAdding() {



  return (
    <div className="page_container" style={{}}>
      <Container className='class_add'>
        <form className='class_form' style={{backgroundColor:'#ffff', borderRadius:'16px'}}>
          <Row>
            <Col>
              <div className="header-container">
                <Link to='/institutionadding'>
                <IoChevronBackSharp style={{color:'#526D82', height: "32px", width: "32px", marginLeft:'20px' }} />
                </Link>
                <h1 style={{color:'#526D82', fontSize:'25px', marginLeft:'10px'}}>Class Adding</h1>
              </div>
              <div style={{border:'1px solid #526D82'}}></div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div className='form_group'>
                <input type="text" id="class_number" name='class_number' placeholder=" "/>
                <label htmlFor="class_number">Class Name<span style={{color: 'red'}}>*</span></label>
              </div>
              <div className='form_group'>
                <input type="text" id="class_category" name='class_category' placeholder=" "/>
                <label htmlFor="class_category">Stream</label>
              </div>
              <div className='form_group'>
                <input type="text" id="class_teacher" name='class_teacher' placeholder=" "/>
                <label htmlFor="class_teacher">Class Teacher<span style={{color: 'red'}}>*</span></label>
              </div>
            </Col>
            <Col md={6} >
              <div className='form_group'>
                <input type="text" id="class_division" name='class_division' placeholder=" "/>
                <label htmlFor="class_division">Division<span style={{color: 'red'}}>*</span></label>
              </div>
              <div className='form_group'>
                <input type="text" id="class_medium" name='class_medium' placeholder=" "/>
                <label htmlFor="class_medium">Medium</label>
              </div>
              <div className='form_group class_next_button' style={{textAlign:'right', marginRight: "80px"}}>
                <button type="submit" value="submit" className='class_next'>
                  Next
                </button>
              </div>
            </Col>
          </Row>
        </form>
      </Container>
    </div>
  );
}

export default ClassAdding;
