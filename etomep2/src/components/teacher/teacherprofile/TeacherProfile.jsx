import React from 'react';
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import amritha from "../../../assets/amritha.png";
import { RiEdit2Fill } from "react-icons/ri";
import '../teacherprofile/teacherprofile.css'

function TeacherProfile() {
  return (
    <div className='teacher_profile'>
      <div className='teacher_background_section teacher_top_section'>
      <button className="teacher_back_button">&lt;</button>
      <button className="teacher_logout_button">Logout</button>
      </div>
      <div className='teacher_background_section teacher_bottom_section'>
      </div>
      <Container className="teacher_content_container">
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="teacher_profile_card">
              <div className='teacher_profile_edit'>
                    <button>
                        Edit
                    </button>
                    <RiEdit2Fill className='teacher_profile_edit_icon'/>
                </div> 
              <Form className='teacher_profile_form'>
                <Row>
                  <Col md={6}>
                    <div className="teacher_profile_group">
                        <label htmlFor="inst_name">Institutuion Name</label>
                        <input type="text" id="inst_name" name="inst_name" readOnly />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="teacher_profile_group">
                        <label htmlFor="email">Email Id</label>
                        <input type="text" id="email" name="email" readOnly />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <div className="teacher_profile_group">
                        <label htmlFor="inst_code">Institutuion Code</label>
                        <input type="text" id="inst_code" name="inst_code" readOnly />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="teacher_profile_group">
                        <label htmlFor="region">Region</label>
                        <input type="text" id="region" name="region" readOnly />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <div className="teacher_profile_group">
                        <label htmlFor="boardofeducation">Board Of Education</label>
                        <input type="text" id="boardofeducation" name="boardofeducation" readOnly />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="teacher_profile_group">
                        <label htmlFor="phn_no">Phone Number</label>
                        <input type="text" id="phn_no" name="phn_no" readOnly />
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="teacher_profile_image_container">
        <img src={amritha} alt="Institution Logo" className="profile_image" />
      </div>
    </div>
  )
}

export default TeacherProfile