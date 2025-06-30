import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import Select from "react-select";
import "../adminfacultyadding/facultyadding.css";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

function FacultyAdding() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState(null);
  const [loading, setLoading] = useState(false);

  const admininfo = useSelector((state) => state.admininfo);
  const APIURL = useSelector((state) => state.APIURL.url);

  const admin_id = admininfo ? admininfo.admininfo?.admin_id : "";

  console.log(admin_id, "admin id");

  const navigate = useNavigate();
  const genderOptions = [
    { value: "Female", label: "Female" },
    { value: "Male", label: "Male" },
    { value: "Other", label: "Other" },
  ];

  const toTitleCase = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = [
      { value: firstName, label: "First Name" },
      { value: lastName, label: "Last Name" },
      { value: email, label: "Email" },
      { value: phoneNumber, label: "Phone Number" },
      { value: gender, label: "Gender" },
      { value: password, label: "Password" },
    ];

    const missingFields = requiredFields.filter((field) => !field.value);

    if (missingFields.length > 0) {
      const missingFieldLabels = missingFields
        .map((field) => field.label)
        .join(", ");
      Swal.fire({
        icon: "error",
        title: "Missing Required Information",
        text: `Please complete the following fields: ${missingFieldLabels}.`,
      });
      return;
    }

    const formattedFirstName = toTitleCase(firstName);
    const formattedLastName = toTitleCase(lastName);
    const formattedEmployeeId = toTitleCase(employeeId);

    const nameRegex = /^[A-Za-z\s]+$/;

    if (!nameRegex.test(firstName)) {
      Swal.fire({
        icon: "error",
        title: "Invalid First Name",
        text: "First name must contain only letters and spaces.",
      });
      return;
    }

    if (!nameRegex.test(lastName)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Last Name",
        text: "Last name must contain only letters and spaces.",
      });
      return;
    }
    // Validate phone number
    if (phoneNumber.length !== 10 || isNaN(phoneNumber)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Phone Number",
        text: "Please enter a valid 10-digit phone number.",
      });
      return;
    }

    setLoading(true);

    try {
      const formData = {
        first_name: formattedFirstName,
        last_name: formattedLastName,
        email: email,
        phone_number: phoneNumber,
        gender: gender.value,
        employee_id: formattedEmployeeId,
        password: password,
        admin_id: admin_id,
      };

      const response = await axios.post(`${APIURL}/api/addteacher`, formData);

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "Faculty has been added successfully!",
      });

      setFirstName("");
      setLastName("");
      setEmail("");
      setEmployeeId("");
      setPhoneNumber("");
      setPassword("");
      setGender(null);
      setLoading(false);

      navigate("/institutionadding");
    } catch (error) {
      console.error("Error submitting form:", error);

      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong! Please try again.";

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
        footer: "Please check the data and try again.",
      });
      setLoading(false);
    }
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, "");
    if (numericValue.length <= 10) {
      setPhoneNumber(numericValue);
    }
  };
  const customStyles = {
    control: (base, state) => ({
      ...base,
      width: "95%",
      minHeight: "40px",
      height: "50px",
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
      paddingTop: "0px",
    }),
    indicatorSeparator: (base) => ({
      display: "none",
    }),
    indicatorsContainer: (base) => ({
      ...base,
      alignItems: "center",
    }),

    menu: (base) => ({
      ...base,
      zIndex: 9999,
      position: "absolute",
      width: "89%",
      maxHeight: "150px",
      overflowY: "auto",
    }),
    menuList: (base) => ({
      ...base,
      maxHeight: "150px",
      overflowY: "auto",
      paddingRight: "10px",
    }),
  };
  const handleBackClick = () => {
    navigate("/institutionadding");
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
            <h1 className="faculty_title">Add Faculty</h1>
          </div>
          <div style={{ border: "0.5px solid #526D82" }}></div>
          <div className="faculty_add_scroll">
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
                    onChange={(e) => {
                      const alphabeticValue = e.target.value.replace(
                        /[^a-zA-Z\s]/g,
                        ""
                      ); // Allow only alphabets and spaces
                      setFirstName(alphabeticValue);
                    }}
                    style={{ textTransform: "capitalize" }}
                    maxLength="50"
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
                    onChange={(e) => {
                      const alphabeticValue = e.target.value.replace(
                        /[^a-zA-Z\s]/g,
                        ""
                      ); // Allow only alphabets and spaces
                      setLastName(alphabeticValue);
                    }}
                    style={{ textTransform: "capitalize" }}
                    maxLength="50"
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
                    maxLength="75"
                  />
                </div>
                <div className="faculty_group">
                  <label htmlFor="employee_id">Employee Id</label>
                  <input
                    type="text"
                    id="employee_id"
                    name="employee_id"
                    value={employeeId}
                    onChange={(e) => {
                      const alphanumericValue = e.target.value.replace(
                        /[^a-zA-Z0-9]/g,
                        ""
                      ); // Remove non-alphanumeric characters
                      setEmployeeId(alphanumericValue);
                    }}
                    style={{ textTransform: "capitalize" }}
                    maxLength="10"
                  />
                </div>
              </Col>

              <Col md={6}>
                <div className="faculty_group">
                  <label htmlFor="phone_no">
                    Phone No:<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="number"
                    id="phone_no"
                    name="phone_no"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    style={{ textTransform: "capitalize" }}
                    maxLength={10}
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
                    style={{ textTransform: "capitalize" }}
                    maxLength={10}
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
                    maxLength={50}
                  />
                </div>
                <div className="submit_faculty">
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="faculty_button"
                  >
                    Submit
                  </button>
                </div>
              </Col>
            </Row>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default FacultyAdding;
