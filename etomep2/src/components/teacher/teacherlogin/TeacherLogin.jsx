import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { RiShareBoxFill } from "react-icons/ri";
import etomelogo from "../../../assets/etomelogo.png";
import linkedin from "../../../assets/linkedin.png";
import gmail from "../../../assets/gmail.png";
import instagram from "../../../assets/instagram.png";
import lineart from "../../../assets/lineart.png";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import '../teacherlogin/teacherlogin.css';
import TeacherForgot from "../teacherforgotpassword/TeacherForgot";
import { teacherinfo } from "../../../Redux/Actions/TeacherInfoAction";

function TeacherLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [btnPosition, setBtnPosition] = useState('0');
  const [transitionDuration, setTransitionDuration] = useState('0.5s');
  const navigate = useNavigate();
  const APIURL = useSelector((state) => state.APIURL.url);
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.location.pathname === "/teacherlogin") {
      setBtnPosition("110px");
    }
  }, [window.location.pathname]);

  const handleLeftClick = () => {
    setBtnPosition('0');
    setTimeout(() => navigate('/'), 400); 
  };

  const handleRightClick = () => {
    setBtnPosition('110px');
    setTimeout(() => navigate('/teacherlogin'), 500); 
  };

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
      const response = await axios.post(`${APIURL}/api/teacherlogin`, data);
      dispatch(teacherinfo(response.data.teacher));

      Swal.fire({
        title: "Success!",
        text: "Login Successfully",
        icon: "success",
        confirmButtonText: "Ok",
      });

      navigate("/teacherhome");
    } catch (error) {
      if (error.response && error.response.status === 405) {
        Swal.fire({
          title: "Blocked!",
          text: "User has been blocked",
          icon: "error",
          confirmButtonText: "Ok",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Invalid Email id or Password",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    }
  };

  const [isFlipped, setIsFlipped] = useState(false);
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="teacher_lg_min_div"
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "#FFFFFF",
        backgroundImage: `url(${lineart})`,
        backgroundSize: "70% 100%",
        backgroundPosition: "left center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container fluid>
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Col
            md={6}
            xs={12}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              flexDirection: "column",
              textAlign: "center",
              color: "#526D82",
              paddingLeft: "100px",
            }}
            className="teacher_lg_left_div"
          >
            <img
              className="teacher_lg_logo"
              src={etomelogo}
              alt="etome logo"
              style={{
                width: "296px",
                height: "116px",
                marginBottom: "15px",
              }}
            />

            <>
              <p
                className="teacher_lg_tagline"
                style={{
                  fontSize: "clamp(15px, 2vw, 20px)",
                  fontFamily: "PT Mono",
                  marginLeft: "30px",
                }}
              >
                Innovation That Changes the world
              </p>
              <Link
                to="https://www.etome.in/"
                style={{ textDecoration: "none" }}
              >
                <button
                  className="teacher_website_button"
                  style={{
                    width: "224px",
                    height: "53px",
                    backgroundColor: "transparent",
                    color: "#526D82",
                    borderRadius: "0.5rem",
                    borderColor: "#526D82",
                    marginTop: "10px",
                    marginLeft: "30px",
                    border: "1px solid #526D82",
                  }}
                  type="submit"
                >
                  Go To Website
                  <RiShareBoxFill style={{ marginLeft: "10px" }} />
                </button>
              </Link>
            </>
          </Col>
          <Col
            className="teacher_formcol_Lg"
            md={6}
            xs={12}
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
            <form className="teacher_form ">
              <div className={`teacher_flip_card_inner ${isFlipped ? "flipped" : ""}`}>
                <div className="teacher_flip_card_front">
                  <div className="switch_forgott">
                    <p className="admin_form_title" style={{ marginBottom: "0px" }}>
                      Teacher Login
                    </p>
                    <div className="button_box" style={{}}>
                      <div className="btn" style={{ left: btnPosition, transitionDuration}}>

                        {/* <p style={{color:"white", paddingBottom:'50px'}}>Teacher</p> */}
                      </div>
                      <button type="button" className="toggle_btn" onClick={handleLeftClick} style={{ color: btnPosition === '0' ? 'white' : '#526d82' }}>Admin</button>
                      <button type="button" className="toggle_btn" onClick={handleRightClick} style={{ color: btnPosition === '110px' ? 'white' : '#526d82' }}>Teacher</button>
                    </div>
                  </div>
                  <div className="teacher_input_container">
                    <label
                      htmlFor="email"
                      style={{ fontSize: "20px", color: "#526D82" }}
                    >
                      {" "}
                      E-mail Address
                    </label>
                    <input
                      placeholder="Enter email"
                      type="email"
                      style={{ width: "100%", paddingLeft: "20px" }}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div
                    className="teacher_input_container"
                    style={{ marginTop: "30px", position: "relative" }}
                  >
                    <label
                      htmlFor="password"
                      style={{ fontSize: "20px", color: "#526D82" }}
                    >
                      Password
                    </label>
                    <input
                      placeholder="Enter password"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      style={{
                        width: "100%",
                        paddingLeft: "20px",
                        paddingRight: "40px",
                        borderRadius: "0.5rem",
                        border: "1px solid #ccc",
                        fontSize: "0.875rem",
                      }}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      onClick={togglePasswordVisibility}
                      style={{
                        position: "absolute",
                        top: "65%",
                        right: "20px",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        color: "#9CA3AF",
                        fontSize: "1.25rem",
                      }}
                    >
                      {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                    </span>
                  </div>
                  <p
                    className="teacher_signup_link"
                    onClick={handleFlip}
                    style={{}}
                  >
                    <a>Forgot Password?</a>
                  </p>
                  <button
                    className="teacher_submit_btn"
                    type="submit"
                    onClick={handleSubmit}
                    style={{ marginTop: "10px", marginBottom: "15px" }}
                  >
                    Login
                  </button>
                  <div>
                    <div className="ad_lg_social_sect">
                      <h6 style={{color:'#526D82'}}>Reach Us On</h6>
                    </div>
                    <div className="ad_lg_social_icons">
                    <a href="https://www.linkedin.com/showcase/etomebyresolute/" target="_blank" rel="noopener noreferrer" className="ad_lg_circle">
                      <img src={linkedin} alt="LinkedIn" />
                    </a>
                    <a href="https://www.instagram.com/etome_india?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer"className="ad_lg_circle">
                      <img src={instagram} alt="Instagram" />
                    </a>
                    <a href="mailto:info@etome.in" target="_blank" rel="noopener noreferrer"className="ad_lg_circle">
                      <img src={gmail} alt="Gmail" />
                    </a>
                    </div>
                    </div>
                </div>
                <div className="teacher_flip_card_back">
                  <TeacherForgot />
                </div>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TeacherLogin;
