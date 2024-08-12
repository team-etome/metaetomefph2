import React, { useState, useEffect } from "react";
import '../teacherforgotpassword/teacherforgot.css'
import { Col, Container, Row, Modal, Button } from "react-bootstrap";
import TeacherNewPassword from "../teachernewpassword/TeacherNewPassword";
import { FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdArrowBack } from "react-icons/io";

function TeacherForgot() {
    const [email, setEmail] = useState("");
    const [showOtpScreen, setShowOtpScreen] = useState(false);
    const [otp1, setOtp1] = useState("");
    const [otp2, setOtp2] = useState("");
    const [otp3, setOtp3] = useState("");
    const [otp4, setOtp4] = useState("");
    const [loading, setLoading] = useState(false);
    const [showNewPasswordModal, setShowNewPasswordModal] = useState(false);
    const [timer, setTimer] = useState(120);
  
    const navigate = useNavigate();
  
    const APIURL = useSelector((state) => state.APIURL.url);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      if (!email) {
        Swal.fire({
          title: "Error!",
          text: "Enter Email Id",
          icon: "error",
          confirmButtonText: "Ok",
        });
        setLoading(false);
        return;
      }
      try {
        const data = { email: email };
        const response = await axios.post(`${APIURL}/api/forgotpasswordteacher`, data);
        setShowOtpScreen(true);
        setLoading(false);
      } catch (error) {
        setLoading(false);
  
        if (error.response) {
          if (
            error.response.status === 400 &&
            error.response.data &&
            error.response.data.info
          ) {
            Swal.fire({
              title: "Error!",
              text: error.response.data.info,
              icon: "error",
              confirmButtonText: "Ok",
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: "Technical Error",
              icon: "error",
              confirmButtonText: "Ok",
            });
          }
        } else {
          Swal.fire({
            title: "Error!",
            text: "Unable to connect to server",
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      }
    };
  
    const handleOtpSubmit = async () => {
      try {
        const data = {
          email: email,
          otp: otp1 + otp2 + otp3 + otp4,
        };
  
        const response = await axios.post(`${APIURL}/api/verifyotpteacher`, data);
  
        if (response) {
          setShowOtpScreen(false);
          setShowNewPasswordModal(true);
        } else {
          Swal.fire({
            title: "Error!",
            text: "Invalid OTP",
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to verify OTP",
          icon: "error",
          confirmButtonText: "Ok",
        });
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      let interval = null;
  
      if (showOtpScreen && timer > 0) {
        interval = setInterval(() => {
          setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
      } else if (timer === 0) {
        clearInterval(interval);
        Swal.fire({
          title: "Time Out!",
          text: "OTP has expired, please request a new one.",
          icon: "warning",
          confirmButtonText: "Ok",
        });
        setShowOtpScreen(false);
        setTimer(300);
      }
      return () => clearInterval(interval);
      }, [showOtpScreen, timer]);
      const formatTime = () => {
      const minutes = Math.floor(timer / 60);
      const seconds = timer % 60;
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };
  
    // const handlePasswordUpdateSuccess = () => {
    //   navigate("/adminlogin");
    // };
    const handleBackClick = () => {
      window.location.reload(); // Refresh the page
    };
    return (
      <div className="teacher_fg_min_div" style={{}}>
        <form
          className="teacher_forgot_form "
          style={{ position: "absolute", top: "-400px" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "column",
            }}
          >
            <p
              className="teacher_forgot_form_title"
              style={{ marginBottom: "30px" }}
            >
              Forgot Password ?
            </p>
            <p
              style={{
                fontSize: "clamp(10px, 2vw, 12px)",
                color: "#526D82",
                marginBottom: "30px",
              }}
            >
              Enter the Email address you used when you joined and we’ll send an
              OTP to reset the Password.
            </p>
            <div className="teacher_forgot_input_container">
              <input
                type="email"
                id="email"
                name="email"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">Enter Email id</label>
            </div>
  
            <div
              className="teacher_forgot_button_container"
              style={{
                textAlign: "right",
                // marginRight: "40px",
              }}
            >
               <div className="teacher_forgot_back" onClick={handleBackClick}> <IoMdArrowBack className="teacher_forgot_back_icon"/> Back</div>
              <button
                type="submit"
                value="submit"
                onClick={handleSubmit}
                style={{ fontSize: "20px" }}
              >
                {loading ? (
                  <>
                    <FaSpinner
                      className="spinner"
                      style={{ animation: "spin 2s linear infinite" }}
                    />
                    &nbsp;Loading...
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </form>
  
        {/* ) : ( */}
        <Modal
          show={showOtpScreen}
          onHide={() => setShowOtpScreen(false)}
          centered
        >
          <Modal.Header style={{ borderBottom: "none", paddingLeft: "20px" }}>
            <Modal.Title
              style={{ flex: 1, textAlign: "center", color: "#526D82" }}
            >
              Enter OTP Code
            </Modal.Title>
            <button
              variant="secondary"
              onClick={() => setShowOtpScreen(false)}
              style={{
                backgroundColor: "transparent",
                color: "#526D82",
                border: "none",
              }}
            >
              <AiOutlineClose size={20} style={{ cursor: "pointer" }} />
            </button>
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
                  borderRadius: "10px",
                  border: "1px solid #526D82",
                  textAlign: "center",
                }}
                value={otp1}
                onChange={(e) => setOtp1(e.target.value)}
              />
              <input
                type="text"
                maxLength="1"
                style={{
                  width: "40px",
                  marginRight: "30px",
                  height: "50px",
                  borderRadius: "10px",
                  border: "1px solid #526D82",
                  textAlign: "center",
                }}
                value={otp2}
                onChange={(e) => setOtp2(e.target.value)}
              />
              <input
                type="text"
                maxLength="1"
                style={{
                  width: "40px",
                  marginRight: "30px",
                  height: "50px",
                  borderRadius: "10px",
                  border: "1px solid #526D82",
                  textAlign: "center",
                }}
                value={otp3}
                onChange={(e) => setOtp3(e.target.value)}
              />
              <input
                type="text"
                maxLength="1"
                style={{
                  width: "40px",
                  marginRight: "30px",
                  height: "50px",
                  borderRadius: "10px",
                  border: "1px solid #526D82",
                  textAlign: "center",
                }}
                value={otp4}
                onChange={(e) => setOtp4(e.target.value)}
              />
            </div>
            {/* <div>
              <p style={{marginTop: "20px", marginBottom: "20px",marginLeft:'30px', color: "#526D82",}}>
                Time remaining: {formatTime()}
              </p>
            </div>
            <div>
              <Button
                variant="primary"
                onClick={handleOtpSubmit}
                disabled={timer === 0}
                style={{
                  marginLeft: "60%",
                  backgroundColor: "transparent",
                  color: "#526D82",
                  border: "1px solid #526D82 ",
                  marginTop: "10px",
                  marginBottom: "20px",
                  width: "100px",
                }}
              >
                Submit
              </Button>
            </div> */}
            <div
              style={{
                display: "flex",
                alignItems: "center", 
                justifyContent: "space-between", 
                marginTop: "10%",
                marginBottom: "20px",
                paddingLeft: "30px",
                paddingRight: "30px",
              }}
            >
              <p style={{ color: "#526D82" }}>Time remaining: {formatTime()}</p>
              <button
              className="teacher_otp_button"
                variant="primary"
                onClick={handleOtpSubmit}
                disabled={timer === 0}
                style={{}}
              >
                Submit
              </button>
            </div>
          </Modal.Body>
        </Modal>
        {/* )} */}
        {/* </Col> */}
        {showNewPasswordModal && <TeacherNewPassword />}
      </div>
    );
}

export default TeacherForgot