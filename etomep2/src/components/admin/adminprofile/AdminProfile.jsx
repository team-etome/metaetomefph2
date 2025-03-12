import React, { useState, useRef } from "react";
import { Col, Container, Row, Form } from "react-bootstrap";
import { RiEdit2Fill, RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import "../adminprofile/adminprofile.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
function AdminProfile() {
  const location = useLocation();
  const admininfo =
    location.state?.admininfo ||
    useSelector((state) => state.admininfo?.admininfo);
  console.log(admininfo, "admin info");
  const navigate = useNavigate();

  const [isPasswordEditable, setIsPasswordEditable] = useState(false);
  const [password, setPassword] = useState("");
  const APIURL = useSelector((state) => state.APIURL.url);

  const admin_id = admininfo?.admin_id;
  console.log(admin_id, "admin id");

  const passwordInputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleChangePassword = () => {
    setIsPasswordEditable((prev) => !prev); // Toggle password edit mode
    if (!isPasswordEditable) {
      // Focus on the password field when entering edit mode
      setTimeout(() => {
        passwordInputRef.current?.focus(); // Use the ref to focus the field
      }, 0);
    }
  };

  const handleSavePassword = async () => {
    // Check if the password is empty
    if (!password || password === "*****") {
      Swal.fire({
        icon: "warning",
        title: "Password is required",
        text: "Please enter a new password before saving.",
        showConfirmButton: true,
      });
      return; // Stop execution if password is empty
    }

    try {
      const data = {
        id: admin_id,
        password: password,
      };

      const response = await axios.put(`${APIURL}/api/addadmin`, data);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Password Updated",
          // text: response.data.message,
          timer: 1500,
          showConfirmButton: false,
        });
        setIsPasswordEditable(false); // Switch back to read-only mode
        // Add this line to mask the password after saving:
        setShowPassword(false);
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error updating password:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update password. Please try again.",
        showConfirmButton: true,
      });
    }
  };

  const handleBack = () => {
    navigate("/admindashboard");
  };

  const handleLogout = () => {
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="admin_profile">
      <div className="background_section top_section">
        <button onClick={handleBack} className="back_button">
          &lt;
        </button>
        <button onClick={handleLogout} className="logout_button">
          Logout
        </button>
      </div>
      <div className="background_section bottom_section"></div>
      <Container className="content_container">
        <Row className=" profile-card-main-div">
          <Col md={8}>
            <div className="profile_card">
              {/* <div className="admin_profile_edit"> */}
              {/* {isPasswordEditable ? (
                  <button onClick={handleSavePassword}>Save Password</button>
                ) : (
                  <button onClick={handleChangePassword}>
                    Change Password
                  </button>
                )} */}
              {/* <RiEdit2Fill className="admin_profile_edit_icon" />
              </div> */}
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
                      <label htmlFor="boardofeducation">
                        Board Of Education
                      </label>
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
                        value={admininfo?.number || ""}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="admin_profile_group" style={{ position: "relative" }}>
                      <label htmlFor="password">Password</label>
                      <input
                        // Change this line: use a dynamic type based on showPassword
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder="*****"
                        readOnly={!isPasswordEditable}
                        value={password}
                        ref={passwordInputRef}
                        onChange={handlePasswordChange}
                        className={isPasswordEditable ? "highlighted" : ""}
                      />
                      {/* The toggle icon */}
                      {isPasswordEditable && (
                        <span
                          className="password-toggle-icon"
                          onClick={handleTogglePasswordVisibility}
                          style={{
                            position: "absolute",
                            top: "65%",
                            right: "10px",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                          }}
                        >
                          {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
                        </span>
                      )}
                    </div>

                    <span
                      style={{
                        textDecoration: 'underline',
                        fontSize: '16px',
                        color: '#526D82',
                        cursor: 'pointer',
                      }}
                      onClick={isPasswordEditable ? handleSavePassword : handleChangePassword}
                    >
                      {isPasswordEditable ? 'Save Password' : 'Change Password'}
                    </span>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="profile_image_container">
        <img
          src={admininfo?.logo}
          alt="Institution Logo"
          className="profile_image"
        />
      </div>
    </div>
  );
}

export default AdminProfile;
