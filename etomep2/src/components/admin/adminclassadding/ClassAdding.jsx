import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import '../adminclassadding/classadding.css';

function ClassAdding() {
  return (
    <Container style={{backgroundColor:'#ffff', height:'50vh'}}>
      <Row>
        <Col>
          <h1 style={{color:'#526D82', fontSize:'25px'}}>Class Adding</h1>
          <div style={{border:'1px solid #526D82'}}></div>
        </Col>
      </Row>
      <Row >
        <Col md={6}>
          <div className='form_group'>
            <input type="text" id="class_number" name='class_number' placeholder=" "/>
            <label htmlFor="class_number">Class Name</label>
          </div>
          <div className='form_group'>
            <input type="text" id="class_category" name='class_category' placeholder=" "/>
            <label htmlFor="class_category" >Stream</label>
          </div>
          <div className='form_group'>
            <input type="text" id="class_teacher" name='class_teacher'placeholder=" "/>
            <label htmlFor="class_teacher" >Class Teacher</label>
          </div>
        </Col>
        <Col md={6}>
          <div className='form_group'>
            <input type="text" id="class_division" name='class_division'placeholder=" "/>
            <label htmlFor="class_division" >Division</label>
          </div>
          <div className='form_group'>
            <input type="text" id="class_medium" name='class_medium'placeholder=" "/>
            <label htmlFor="class_medium" >Medium</label>
          </div>
          <div className=' class_next_button'>
            <button type="submit" value="submit" className='class_next' >
              Next
            </button>
          </div>
        </Col>

      </Row>
    </Container>
  );
}

export default ClassAdding;
