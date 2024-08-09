import React, { useState } from "react";
import { Col, Container, Row, Modal,  Button, } from "react-bootstrap";
import etomelogo from "../../../assets/etomelogo.png";
import circle from "../../../assets/Ellipse 52 1.png";
import { Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash, FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import '../teachernewpassword/teachernewpassword.css'

function TeacherNewPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(true);
  
    const navigate = useNavigate();
  
    const APIURL = useSelector((state) => state.APIURL.url);
    // const email = useSelector((state) => state.email);
  
    // console.log("Email from Redux state:", email);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      if (password !== confirmPassword) {
        Swal.fire({
          icon: "error",
          title: "Password Mismatch",
          text: "Password and confirm password do not match.",
        });
        setLoading(false);
        return;
      }
  
      if (!password || !confirmPassword) {
        let missingFields = [];
        if (!password) missingFields.push("password");
        if (!confirmPassword) missingFields.push("confirm password");
  
        Swal.fire({
          icon: "error",
          title: "Missing Required Information",
          text: `Please complete the following fields: ${missingFields.join(
            ", "
          )}.`,
        });
  
        setLoading(false);
        return;
      }
  
      try {
        const data = {
          // email: email,
          password: password,
          confirmPassword: confirmPassword,
        };
  
        console.log("Data to be sent:", data);
  
        // const response = await axios.post(`${APIURL}/api/reset-password`, data);
        
  
        if (response) { 
          Swal.fire({
            title: "Success!",
            text: "Password Changed Successfully",
            icon: "success",
            confirmButtonText: "Ok",
  
            
          })
  
          navigate("/teacherlogin");
  
        } else {
          throw new Error('Failed to update password');
        }
      }  catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Technical Error",
          icon: "error",
          confirmButtonText: "Ok",
        });
      } finally {
        setLoading(false); 
      }
    };
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
    const toggleConfirmPasswordVisibility = () => {
      setShowConfirmPassword(!showConfirmPassword);
    };
    const handleClose = () => setShowModal(false);
  
    return (
  <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton style={{border:'none'}}>
        </Modal.Header>
        <Modal.Body>
              <div style={{}}>
                <div className="teacher_new_input_container">
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
                <div className="teacher_new_input_container" style={{marginTop: '30px'}}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmpassword"
                    name="confirmpassword"
                    placeholder=" "
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onPaste={(e) => e.preventDefault()}
                  />
                  <label htmlFor="confirmpassword">Confirm Password</label>
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
              </div>
        </Modal.Body>
        <Modal.Footer style={{border:'none'}}className="teacher_new_button_container">
          <Button
          
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            variant="primary"
            className="teacher_new_submit_btn"
          >
            {loading ? (
              <>
                <FaSpinner
                  className="spinner"
                  style={{ animation: "spin 2s linear infinite" }}
                />
                &nbsp;Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    );
}

export default TeacherNewPassword