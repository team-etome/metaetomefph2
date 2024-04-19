import React, { useState } from "react";
import "../godlogin/glogin.css";
import { Col, Container, Row } from "react-bootstrap";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import etomelogo from "../../../assets/etomelogo.png";
import { useSelector } from "react-redux";

import Swal from "sweetalert2";
import axios from "axios";

import { useNavigate } from "react-router-dom";


function GodLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const APIURL = useSelector((state) => state.APIURL.url);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {

      Swal.fire({
        title: "Error!",
        text: "All fields are required",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    try {

      const data = {
        
        email: email,
        password: password,

      };

      const response = await axios.post(`${APIURL}/api/godLogin`, data);
      navigate("/header");


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
      className="godlgin_maindiv"
      style={{ height: "100vh", backgroundColor: "#DAE2E9" }}
    >
      <Container>

        <Row md={12} style={{display:"flex",justifyContent:"center", alignItems:"center", }}>
          <Col className='gd_contant_dv' md={6}  xs={12}
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection:"column",
          
           
            
          }}>
          

            
            <h1 style={{
              color: "#526D82",
              fontSize: "64px",

       

              flexDirection: "column",
            }}
          />
            <h1
              style={{
                color: "#526D82",
                fontSize: "64px",
              }}
            >
              Hello!
            </h1>

            <p style={{ color: "#526D82" }}>
              Etome, working with EInk, wants to change education by using
              digital technology to replace heavy textbooks and notebooks,
              making learning easier and more fun.
            </p>
            <button
              style={{
                display: "block",
                width: "224px",
                height: "53px",
                backgroundColor: "#526D82",
                color: "#ffff",
                borderRadius: "0.5rem",
                border: "none",
              }}
              type="submit"
            >
              Learn More
            </button>
          </Col>
          <Col
            md={6}
            xs={12}
            className="gd_login_dv"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "auto",

              marginTop:"100px",
             paddingBottom:"50px",
             width:"50%"
            }}>


           
            <form className="form">


            <img src={etomelogo} alt="etome logo" className='gd_login_logo'

style=
{{
  width: "170px",
  height: "70px",
  marginTop:"25px",
  marginBottom:"15px"
  
}} />

              <p className="form-title">Sign in to your account</p>
              <div className="input-container">
                <input placeholder="Enter email" type="email" style={{width:"100%",paddingLeft:"20px"}}
                onChange={(e) => setEmail(e.target.value)}
                />
                <span >

                  <MdOutlineAlternateEmail />
                </span>
              </div>
              <div className="input-container">
                <input placeholder="Enter password" type="password" style={{width:"100%",paddingLeft:"20px"}} 
                 onChange={(e) => setPassword(e.target.value)}
                />

                <span>
                  <FaRegEye />
                  {/* < FaRegEyeSlash */}
                </span>
              </div>
              <button className="submit_btn" type="submit" onClick={handleSubmit}>
                Sign in
              </button>


              <p className="signup-link">


                <a href="">Forgot Password?</a>
              </p>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
    
  );
}

export default GodLogin;

