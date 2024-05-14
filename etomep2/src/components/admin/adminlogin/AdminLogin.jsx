import React, { useState } from "react";
import "../adminlogin/login.css";
import { Col, Container, Row } from "react-bootstrap";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { RiShareBoxFill } from "react-icons/ri";
import etomelogo from "../../../assets/etomelogo.png";
import circle from "../../../assets/Ellipse 52 1.png"
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


function AdminLogin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
  
    const navigate = useNavigate();
  
    const APIURL = useSelector((state) => state.APIURL.url);
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
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
  
        const response = await axios.post(`${APIURL}/api/adminLogin`, data);
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
    <div className="admin_lgin_maindiv"  style={{ height: "100vh", backgroundColor: "#FFFFFF" }}>
        <Container>
        <Row
          md={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // border:'1px solid red',
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
    // borderRadius: "50%", 
    // border:'1px solid black',
    // padding: "20px",
  }}
>
  <div style={{position: 'relative', width: '100%'}}>
    <img
      src={circle}
      alt="circle"
      style={{
        width: "100%",
        height: "850px",
      }}
    />
    <div style={{ position: 'absolute', top: '50%', left: '30%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: '#526D82', fontFamily: 'Preahvihear, Arial, sans-serif' }}>
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
      {/* Conditionally render the text and button for non-mobile screens */}
      {window.innerWidth > 550 && (
        <div>
          <p style={{ fontSize: '27px', }}>
            Innovation That Changes the world
          </p>
          <Link to="https://www.etome.in/" style={{textDecoration:'none', display: 'inline-block', textAlign: 'center'}}>
            <button
              style={{
                display: "inline-block",
                width: "224px",
                height: "53px",
                backgroundColor: "transparent",
                color: "#526D82",
                borderRadius: "1rem",
                borderColor: "#526D82",
                marginTop: "20px",
              }}
              type="submit"
            >
              Go To Website
              <RiShareBoxFill style={{marginLeft:'10px'}}/>
            </button>
          </Link>
        </div>
      )}
    </div>
  </div>
</Col>

          
          <Col
            md={6}
            xs={12}
            className="admin_login_dv"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "auto",
              marginTop: "50px",
              paddingBottom: "50px",
              width: "50%",
            }}
          >
            <form className="admin_form ">
              {/* <img
                src={etomelogo}
                alt="etome logo"
                className="gd_login_logo"
                style={{
                  width: "170px",
                  height: "70px",
                  marginTop: "25px",
                  marginBottom: "15px",
                }}
              /> */}

              <p className="admin_form_title" style={{marginBottom:'30px', }}>Login</p>

              <div className="admin_input_container">
                <label htmlFor="email" style={{fontSize: "20px", color:'#526D82'}}> E-mail Address</label>
                <input
                  placeholder="Enter email"
                  type="email"
                  style={{ width: "100%", paddingLeft: "20px" }}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="admin_input_container" style={{ marginTop: '30px', position: 'relative' }}>
                <label htmlFor="password" style={{ fontSize: "20px", color:'#526D82' }}>Password</label>
                <input
                    placeholder="Enter password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    style={{ width: "100%", paddingLeft: "20px", paddingRight: "40px", borderRadius: '0.5rem', border: '1px solid #ccc', fontSize: '0.875rem' }}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <span onClick={togglePasswordVisibility} style={{
                    position: 'absolute',
                    top: '65%',
                    right: '20px',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    color: '#9CA3AF',
                    fontSize: '1.25rem'  
                }}>
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </span>
            </div>

              <p className="admin_signup-link" style={{}}>
                <a href="/adminforgot">Forgot Password?</a>
              </p>
              <button
                className="admin_submit_btn"
                type="submit"
                onClick={handleSubmit}
                style={{marginTop:'10px', marginBottom:'50px'}}
              >
                Login
              </button>


            </form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default AdminLogin