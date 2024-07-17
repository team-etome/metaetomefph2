import React from 'react';
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import amritha from "../../../assets/amritha.png";
import { RiEdit2Fill } from "react-icons/ri";
import '../adminprofile/adminprofile.css';

function AdminProfile() {
  return (
    <div className='admin_profile'>
      <div className='background_section top_section'>
      <button className="back_button">&lt;</button>
      <button className="logout_button">Logout</button>
      </div>
      <div className='background_section bottom_section'>
      </div>
      <Container className="content_container">
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="profile_card">
              <div className='admin_profile_edit'>
                    <button>
                        Edit
                    </button>
                    <RiEdit2Fill className='admin_profile_edit_icon'/>
                </div> 
              <Form className='profile_form'>
                <Row>
                  <Col md={6}>
                    <div className="admin_profile_group">
                        <label htmlFor="inst_name">Institutuion Name</label>
                        <input type="text" id="inst_name" name="inst_name" readOnly />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="admin_profile_group">
                        <label htmlFor="email">Email Id</label>
                        <input type="text" id="email" name="email" readOnly />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <div className="admin_profile_group">
                        <label htmlFor="inst_code">Institutuion Code</label>
                        <input type="text" id="inst_code" name="inst_code" readOnly />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="admin_profile_group">
                        <label htmlFor="region">Region</label>
                        <input type="text" id="region" name="region" readOnly />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <div className="admin_profile_group">
                        <label htmlFor="boardofeducation">Board Of Education</label>
                        <input type="text" id="boardofeducation" name="boardofeducation" readOnly />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="admin_profile_group">
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
      <div className="profile_image_container">
        <img src={amritha} alt="Institution Logo" className="profile_image" />
      </div>
    </div>
  )
}

export default AdminProfile;

