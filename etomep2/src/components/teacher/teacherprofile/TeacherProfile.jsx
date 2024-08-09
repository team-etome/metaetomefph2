import React, { useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import amritha from "../../../assets/amritha.png";
import { RiEdit2Fill } from "react-icons/ri";
import "../teacherprofile/teacherprofile.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../Redux/Actions/TeacherLogoutInfoAction";
import { useDispatch, useSelector } from "react-redux";

function TeacherProfile() {
  const teacherinfo = useSelector((state) => state.teacherinfo);
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(
    teacherinfo.teacherinfo?.first_name || ""
  );
  const [lastName, setLastName] = useState(
    teacherinfo.teacherinfo?.last_name || ""
  );
  const [email, setEmail] = useState(teacherinfo.teacherinfo?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(
    teacherinfo.teacherinfo?.phone_number || ""
  );
  const [institutionCode, setInstitutionCode] = useState(""); // Add default values if available
  const [region, setRegion] = useState("");
  const [boardOfEducation, setBoardOfEducation] = useState("");
  const [profileImage, setProfileImage] = useState(amritha);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleback = () => {
    navigate("/teacherhome");
  };

  const handleLogout = () => {
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    localStorage.clear();
    sessionStorage.clear();
    dispatch(logout());
    navigate("/teacherlogin");
  };

  console.log(teacherinfo, "teacher info");

  const handleEditToggle = () => {
    if (isEditing) {
      // Save data when toggling off the edit mode
      handleSave();
    } else {
      setIsEditing(!isEditing);
    }
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("phone_number", phoneNumber);
    formData.append("institution_code", institutionCode);
    formData.append("region", region);
    formData.append("board_of_education", boardOfEducation);
    if (profileImage !== amritha) {
      formData.append("profile_image", profileImage);
    }

    axios
      .post("/api/teacher/update", formData)
      .then((response) => {
        console.log("Data saved successfully:", response.data);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("There was an error saving the data!", error);
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(file);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="teacher_profile">
      <div className="teacher_background_section teacher_top_section">
        <button onClick={handleback} className="teacher_back_button">
          &lt;
        </button>
        <button onClick={handleLogout} className="teacher_logout_button">
          Logout
        </button>
      </div>
      <div className="teacher_background_section teacher_bottom_section"></div>
      <Container className="teacher_content_container">
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="teacher_profile_card">
              <div className="teacher_profile_edit">
                <button onClick={handleEditToggle}>
                  {isEditing ? "Save" : "Edit"}
                </button>
                <RiEdit2Fill className="teacher_profile_edit_icon" />
              </div>
              <Form className="teacher_profile_form">
                <Row>
                  <Col md={6}>
                    <div className="teacher_profile_group">
                      <label htmlFor="inst_name">Teacher Name</label>
                      <input
                        type="text"
                        id="inst_name"
                        name="inst_name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        readOnly={!isEditing}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="teacher_profile_group">
                      <label htmlFor="email">Email Id</label>
                      <input
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        readOnly={!isEditing}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <div className="teacher_profile_group">
                      <label htmlFor="inst_code">Institution Code</label>
                      <input
                        type="text"
                        id="inst_code"
                        name="inst_code"
                        readOnly
                      />
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
                      <label htmlFor="boardofeducation">
                        Board Of Education
                      </label>
                      <input
                        type="text"
                        id="boardofeducation"
                        name="boardofeducation"
                        readOnly
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="teacher_profile_group">
                      <label htmlFor="phn_no">Phone Number</label>
                      <input
                        
                        type="text"
                        id="phn_no"
                        name="phn_no"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        readOnly={!isEditing}   
                      />
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="teacher_profile_image_container">
        <img src='' alt="Profile" className="profile_image" />
        {isEditing && (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        )}
      </div>
    </div>
  );
}

export default TeacherProfile;
