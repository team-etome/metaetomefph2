import React, { useState } from "react";
import "../adminforgotpassword/adminforgot.css";
import { Col, Container, Row } from "react-bootstrap";
import etomelogo from "../../../assets/etomelogo.png";
import circle from "../../../assets/Ellipse 52 1.png";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function AdminForgot() {
  const [email, setEmail] = useState("");
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const navigate = useNavigate();

  const APIURL = useSelector((state) => state.APIURL.url);

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
      const data = { email: email,};

      const response = await axios.post(`${APIURL}/api/forgot-password`, data);
      navigate("/admindashboard");

      Swal.fire({
        title: "Success!",
        text: "Added Successfully",
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
            // className="admin_login_dv"
            style={{
              //   display: "flex",
            //   justifyContent: "center",
            //   alignItems: "center",
              height: "auto",
              paddingBottom: "50px",
              width: "50%",
            }}
          >
            <div style={{marginLeft:'40px'}}>
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
              style={{ fontSize: "20px", color: "#526D82", marginTop: "30px" }}
            >
              Enter the Email address you used when you joined and we’ll send an
              OTP to reset the Password
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
            {/* <h5>OTP</h5>
            <div>
                  <input type="text" maxLength="1" style={{ width: "40px", marginRight: "5px" }} />
                  <input type="text" maxLength="1" style={{ width: "40px", marginRight: "5px" }} />
                  <input type="text" maxLength="1" style={{ width: "40px", marginRight: "5px" }} />
                  <input type="text" maxLength="1" style={{ width: "40px", marginRight: "5px" }} />
                  <input type="text" maxLength="1" style={{ width: "40px", marginRight: "5px" }} />
                  <input type="text" maxLength="1" style={{ width: "40px", marginRight: "5px" }} />
                </div>
                <div className="admin_forgot_button_container">
                  <button  className="btn btn-primary">Submit</button>
                </div> */}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminForgot;
