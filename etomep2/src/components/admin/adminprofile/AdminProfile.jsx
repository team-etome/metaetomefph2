import React from "react";
import { Col, Container, Row, Form } from "react-bootstrap";
import { RiEdit2Fill } from "react-icons/ri";
import "../adminprofile/adminprofile.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminProfile() {
  const location = useLocation();
  const admininfo = location.state?.admininfo || useSelector((state) => state.admininfo?.admininfo);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/admindashboard');
  };

  const handleLogout = () => {
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    localStorage.clear();
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <div className="admin_profile">
      <div className="background_section top_section">
        <button onClick={handleBack} className="back_button">&lt;</button>
        <button onClick={handleLogout} className="logout_button">Logout</button>
      </div>
      <div className="background_section bottom_section"></div>
      <Container className="content_container">
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="profile_card">
              <div className="admin_profile_edit">
                <button>Edit</button>
                <RiEdit2Fill className="admin_profile_edit_icon" />
              </div>
              <Form className="profile_form">
                <Row>
                  <Col md={6}>
                    <div className="admin_profile_group">
                      <label htmlFor="inst_name">Institution Name</label>
                      <input
                        type="text"
                        id="inst_name"
                        name="inst_name"
                        readOnly
                        value={admininfo?.institute_name || ""}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="admin_profile_group">
                      <label htmlFor="email">Email Id</label>
                      <input
                        type="text"
                        id="email"
                        name="email"
                        readOnly
                        value={admininfo?.email || ""}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <div className="admin_profile_group">
                      <label htmlFor="inst_code">Institution Code</label>
                      <input
                        type="text"
                        id="inst_code"
                        name="inst_code"
                        readOnly
                        value={admininfo?.institute_code || ""}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="admin_profile_group">
                      <label htmlFor="region">Region</label>
                      <input
                        type="text"
                        id="region"
                        name="region"
                        readOnly
                        value={admininfo?.region || ""}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <div className="admin_profile_group">
                      <label htmlFor="boardofeducation">Board Of Education</label>
                      <input
                        type="text"
                        id="boardofeducation"
                        name="boardofeducation"
                        readOnly
                        value={admininfo?.educational_body || ""}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="admin_profile_group">
                      <label htmlFor="phn_no">Phone Number</label>
                      <input
                        type="text"
                        id="phn_no"
                        name="phn_no"
                        readOnly
                        value={admininfo?.number || ''}
                      />
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="profile_image_container">
        <img src={admininfo?.logo} alt="Institution Logo" className="profile_image" />
      </div>
    </div>
  );
}

export default AdminProfile;
