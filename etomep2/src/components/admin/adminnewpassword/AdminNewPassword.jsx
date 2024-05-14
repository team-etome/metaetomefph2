import React, { useState } from "react";
import "../adminnewpassword/adminnewpassword.css";
import { Col, Container, Row } from "react-bootstrap";
import etomelogo from "../../../assets/etomelogo.png";
import circle from "../../../assets/Ellipse 52 1.png";
import { Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminNewPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate();

//   const APIURL = useSelector((state) => state.APIURL.url);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    if (password !== confirmPassword) {
        Swal.fire({
          icon: "error",
          title: "Password Mismatch",
          text: "Password and confirm password do not match.",
        });
        setLoading(false);
        return;
      }

    if (!password || 
        !confirmPassword
    ) {
        // let missingFields = [];
        // if (!password) missingFields.push("password");
        // if (!confirmPassword) missingFields.push("confirm password");
      Swal.fire({
        title: "Error!",
        text: "All fields are required",
        icon: "error",
        confirmButtonText: "Ok",
      });
    //   setLoading(false);
      return;
    }

    try {
      const data = {
        password: password,
        confirmPassword: confirmPassword,
      };

        // const response = await axios.post(`${APIURL}/api/reset-password'`, data);
      navigate("/adminlogin");

      Swal.fire({
        title: "Success!",
        text: "Password Changed Successfully",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Technical Error",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div
      className="admin_lgin_maindiv"
      style={{ height: "100vh", backgroundColor: "#FFFFFF" }}
    >
      <Container>
        <Row
          md={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Col
            className="admin_contant_dv"
            md={6}
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div style={{ position: "relative", width: "100%" }}>
              <img
                src={circle}
                alt="circle"
                style={{
                  width: "100%",
                  height: "850px",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "30%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                  color: "#526D82",
                  fontFamily: "Preahvihear, Arial, sans-serif",
                }}
              >
                <img
                  src={etomelogo}
                  alt="etome logo"
                  style={{
                    width: "296px",
                    height: "116px",
                    marginTop: "25px",
                    marginBottom: "15px",
                  }}
                />
                {window.innerWidth > 550 && (
                  <div>
                    <p style={{ fontSize: "27px" }}>
                      Innovation That Changes the world
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Col>

          <Col
            md={6}
            xs={12}
            style={{
              height: "auto",
              paddingBottom: "50px",
              width: "50%",
            }}
          >
            <div style={{ marginLeft: "40px" }}>
              <div className="admin_new_input_container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder=" "
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="password">New Password</label>
                <span
                  onClick={togglePasswordVisibility}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#9CA3AF",
                    fontSize: "1.25rem",
                  }}
                >
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
              </div>

              <div
                className="admin_new_input_container"
                style={{ marginTop: "50px", }}
              >
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder=" "
                  // value={confirmpassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onPaste={(e) => e.preventDefault()}
                />
                <label htmlFor="password">Confirm Password</label>
                <span
                  onClick={toggleConfirmPasswordVisibility}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#9CA3AF",
                    fontSize: "1.25rem",
                  }}
                >
                    {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
              </div>

              <div
                className="admin_new_button_container"
                style={{
                  display: "flex",
                  justifyContent: "right",
                  marginRight: "10px",
                }}
              >
                <button
                  type="submit"
                  value="submit"
                  onClick={handleSubmit}
                  style={{ fontSize: "20px" }}
                >
                  Submit
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminNewPassword;
