import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import Select from "react-select";
import "../adminfacultyadding/facultyadding.css";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2'; 

function FacultyAdding() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState(null);

  const admininfo = useSelector((state) => state.admininfo);
  const APIURL = useSelector((state) => state.APIURL.url);
  const admin_id = admininfo ? admininfo.admininfo?.admin_id : '';

  console.log(admin_id,"admin id")


  const navigate = useNavigate()
  const genderOptions = [
    { value: "Female", label: "Female" },
    { value: "Male", label: "Male" },
    { value: "Other", label: "Other" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      first_name: firstName, // Using snake_case if your backend expects these keys
      last_name: lastName,
      email: email,
      phone_number: phoneNumber, // Assuming the backend expects phone_number
      gender: gender ? gender.value : null, // Send the value of gender or null if not selected
      employee_id: employeeId, // Using snake_case if that's what your backend expects
      password: password,
      admin_id: admin_id,
    };

    try {
      const response = await axios.post(`${APIURL}/api/addteacher`, formData);
      console.log("Success:", response.data);
      setFirstName("");
      setLastName("");
      setEmail("");
      setEmployeeId("");
      setPhoneNumber("");
      setPassword("");
      setGender(null);

      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'Faculty has been added successfully!',
      });

      navigate('/institutionadding')

      

    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: 'Please check the data and try again.'
      });
      // Handle errors
    }
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      width: "100%",
      minHeight: "50px",
      border: "1px solid #526D82",
      borderRadius: "8px",
      boxShadow: state.isFocused ? "0 0 0 1px #526D82" : "none",
      "&:hover": {
        borderColor: "none",
      },
      "&:focus": {
        borderColor: "#526D82",
        outline: "none",
      },
    }),
    placeholder: (base) => ({
      ...base,
      color: "#526D82",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#000",
    }),
    option: (base) => ({
      ...base,
      color: "#000",
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "0 10px",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "#526D82",
    }),
    indicatorsContainer: (base) => ({
      ...base,
      alignItems: "center",
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
      position: "absolute",
    }),
  };

  return (
    <div>
      <Container className="faculty_container">
        <form className="faculty_form">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <Link to="/institutionadding">
              <IoChevronBackSharp className="faculty_back" />
            </Link>
            <h1 className="faculty_title">Add Faculty</h1>
          </div>
          <div style={{ border: "0.5px solid #526D82" }}></div>

          <Row style={{ paddingTop: "20px" }}>
            <Col md={6}>
              <div className="faculty_group">
                <label htmlFor="first_name">
                  First Name<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="faculty_group">
                <label htmlFor="last_name">
                  Last Name<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="faculty_group">
                <label htmlFor="email_id">
                  Email ID<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="email"
                  id="email_id"
                  name="email_id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="faculty_group">
                <label htmlFor="employee_id">Employee Id</label>
                <input
                  type="text"
                  id="employee_id"
                  name="employee_id"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                />
              </div>
            </Col>

            <Col md={6}>
              <div className="faculty_group">
                <label htmlFor="phone_no">
                  Phone No:<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="phone_no"
                  name="phone_no"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="faculty_group">
                <label htmlFor="gender">
                  Gender<span style={{ color: "red" }}>*</span>
                </label>
                <Select
                  options={genderOptions}
                  styles={customStyles}
                  value={gender}
                  onChange={setGender}
                  placeholder=""
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                />
              </div>
              <div className="faculty_group">
                <label htmlFor="password">
                  Password<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="submit_faculty">
                <button onClick={handleSubmit} type="submit" className="faculty_button">
                  Submit
                </button>
              </div>
            </Col>
          </Row>
        </form>
      </Container>
    </div>
  );
}

export default FacultyAdding;
