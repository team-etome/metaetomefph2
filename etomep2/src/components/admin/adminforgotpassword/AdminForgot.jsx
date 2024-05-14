import React, { useState } from "react";
import "../adminforgotpassword/adminforgot.css";
import { Col, Container, Row, Modal, Button } from "react-bootstrap";
import etomelogo from "../../../assets/etomelogo.png";
import circle from "../../../assets/Ellipse 52 1.png";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";


function AdminForgot() {
  const [email, setEmail] = useState("");
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  //   const APIURL = useSelector((state) => state.APIURL.url);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      Swal.fire({
        title: "Error!",
        text: "Enter Email Id",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
    try {
      const data = { email: email };
      //   const response = await axios.post(`${APIURL}/api/forgot-password`, data);
      setShowOtpScreen(true);

      //   Swal.fire({
      //     title: "Success!",
      //     text: "Added Successfully",
      //     icon: "success",
      //     confirmButtonText: "Ok",
      //   });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Technical Error",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

    // Handle OTP verification
  const handleOtpSubmit = () => {
    Swal.fire({
      title: "Success!",
      text: "OTP Verified Successfully",
      icon: "success",
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/admindashboard");
      }
    });
  };

  return (
    <div
      //   className="admin_lgin_maindiv"
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
                {/* {window.innerWidth > 550 && ( */}
                  <div>
                    <p style={{ fontSize: "27px" }}>
                      Innovation That Changes the world
                    </p>
                  </div>
                {/* )} */}
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
            {/* {!showOtpScreen ? ( */}
              <div style={{ marginLeft: "40px" }}>
                <h5
                  style={{
                    fontSize: "40px",
                    color: "#526D82",
                    fontWeight: "normal",
                  }}
                >
                  Forgot Password
                </h5>
                <p
                  style={{
                    fontSize: "20px",
                    color: "#526D82",
                    marginTop: "30px",
                  }}
                >
                  Enter the Email address you used when you joined and we’ll
                  send an OTP to reset the Password
                </p>
                <div className="admin_forgot_input_container">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder=" "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required // Ensures the form cannot be submitted without an email
                  />
                  <label htmlFor="email">Enter Email id</label>
                </div>

                <div
                  className="admin_forgot_button_container"
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    marginRight: "40px",
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
            {/* ) : ( */}
              <Modal
                show={showOtpScreen}
                onHide={() => setShowOtpScreen(false)}
                centered
              >
                <Modal.Header
                  style={{ borderBottom: "none", paddingLeft: "20px" }}
                >
                <Modal.Title style={{ flex: 1, textAlign: "center", color: "#526D82" }}>Enter OTP Code</Modal.Title>
                <Button variant="secondary" onClick={() => setShowOtpScreen(false)} style={{backgroundColor:'transparent', color:'#526D82', border:'none',}}>
                    <AiOutlineClose size={20} style={{ cursor: "pointer",}}/>
                </Button>

                </Modal.Header>
                <Modal.Body>
                  <div
                    style={{
                      color: "#526D82",
                      textAlign: "center",
                    }}
                  >
                    <input
                      type="text"
                      maxLength="1"
                      style={{
                        width: "40px",
                        marginRight: "30px",
                        height: "50px",
                        borderRadius:'10px',
                        border:'1px solid #526D82'

                      }}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                    <input
                      type="text"
                      maxLength="1"
                      style={{
                        width: "40px",
                        marginRight: "30px",
                        height: "50px",
                        borderRadius:'10px',
                        border:'1px solid #526D82'
                      }}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                    <input
                      type="text"
                      maxLength="1"
                      style={{
                        width: "40px",
                        marginRight: "30px",
                        height: "50px",
                        borderRadius:'10px',
                        border:'1px solid #526D82'

                      }}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                    <input
                      type="text"
                      maxLength="1"
                      style={{
                        width: "40px",
                        marginRight: "30px",
                        height: "50px",
                        borderRadius:'10px',
                        border:'1px solid #526D82'

                      }}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </div>
                  <div>
                    <Button
                      variant="primary"
                      onClick={handleOtpSubmit}
                      style={{
                        marginLeft: "60%",
                        backgroundColor: "transparent",
                        color: "#526D82",
                        border: "1px solid #526D82 ",
                        marginTop: "50px",
                        marginBottom: "20px",
                        width:'100px'
                      }}
                    >
                      Submit
                    </Button>
                  </div>
                </Modal.Body>
              </Modal>
            {/* )} */}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminForgot;
