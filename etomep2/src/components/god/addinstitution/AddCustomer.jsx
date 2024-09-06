import React, { useState } from "react";
import "../addinstitution/addcustomer.css";
import { Container,Row, Col, Form, Button, InputGroup, FormControl } from "react-bootstrap";
import { FaArrowLeft, FaSpinner, FaRedo, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import Select from "react-select";

function AddCustomer() {
  const [institutionName, setInstitutionName] = useState("");
  const [institutionCode, setInstitutionCode] = useState("");
  const [email, setEmail] = useState("");
  const [board, setBoard] = useState("");
  const [custboard, setCustBoard] = useState("");
  const [address, setAddress] = useState("");
  const [region, setRegion] = useState("");
  const [medium, setMedium] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [publisherName, setPublisherName] = useState([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const publisherValues = publisherName.map((option) => option.value);
  const mediumValues = medium.map((option) => option.value);
  

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const APIURL = useSelector((state) => state.APIURL.url);

  const clearImageFile = () => {
    setImageFile(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handlePublisherChange = (selectedOptions) => {
    // Limit the number of selected options to 5
    if (selectedOptions.length <= 5) {
      setPublisherName(selectedOptions);
    } else {
      toast.error("You can only select up to 5 publishers.");
      setPublisherName(selectedOptions.slice(0, 5));
    }
  };

  const handleMediumChange = (selectedOptions) => {
    // setMedium(selectedOptions);
    if (selectedOptions.length <= 5) {
      setMedium(selectedOptions);
    } else {
      toast.error("You can only select up to 5 publishers.");
      setMedium(selectedOptions.slice(0, 5));
    }
  };


  const handleEducationBoard = (selectedOptions) => {
    setCustBoard(selectedOptions.value);
    setBoard(selectedOptions);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Password and confirm password do not match.",
      });
      setLoading(false);
      return;
    }
    // Check if all required fields are filled
    if (
      !institutionName ||
      !institutionCode ||
      !medium ||
      !email ||
      !publisherName.length ||
      !board ||
      !databaseCode ||
      !address ||
      !region ||
      // !institutionType ||
      !phoneNumber ||
      !password ||
      !confirmPassword ||
      !imageFile
    ) {
      let missingFields = [];
      if (!institutionName) missingFields.push("institution name");
      if (!institutionCode) missingFields.push("institution code");
      // if (!medium) missingFields.push("medium");
      if (!medium.length) missingFields.push("medium");
      if (!email) missingFields.push("email");
      if (!publisherName.length) missingFields.push("publisher name");
      if (!board) missingFields.push("board of education");
      if (!imageFile) missingFields.push("image file");
      // if (!databaseCode) missingFields.push("database code");
      if (!address) missingFields.push("address");
      if (!region) missingFields.push("region");
      // if (!institutionType) missingFields.push("type of institution");
      if (!phoneNumber) missingFields.push("phone number");
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

    if (phoneNumber.length !== 10 || isNaN(phoneNumber)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Phone Number",
        text: "Please enter a valid 10-digit phone number.",
      });
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("institute_name", institutionName);
      formData.append("institute_code", institutionCode);
      // formData.append("medium", medium);
      formData.append("medium", JSON.stringify(mediumValues));
      formData.append("email_id", email);
      formData.append("publisher_name", JSON.stringify(publisherValues));
      formData.append("eduational_body", custboard);
      formData.append("logo", imageFile);
      // formData.append("database_code", databaseCode);
      formData.append("address", address);
      formData.append("region", region);
      // formData.append("institute_type", institutionType);
      formData.append("phn_number", phoneNumber);
      formData.append("password", password);
      // formData.append("textbook_front_page", confirmPassword);

      const response = await axios.post(`${APIURL}/api/addadmin`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Institution created successfully!",
      });

      navigate("/GodHeader");
    } catch (error) {
      console.error("Error creating institution:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  const publishers = [
    "MADHUBAN",
    "GOYAL",
    "VIVA - EDUCATION",
    "ANAND",
    "UGS",
    "INDIANNICA",
    "BOSEM",
    "GLOBAL",
    "ANAND BOOKS",
    "APC",
    "BOARD",
    "NEW SARASWATI",
    "Cambridge",
    "Amenta",
    "Marina Publication",
    "Bharati Bhavan",
    "Inspiration Publication",
    "Saraswati Publication",
    "Goyal Brothers",
    "Jay Cee",
    "Kips",
    "Assam Book Dipo",
    "NEDSSS Publication",
    "ASTPPCL",
    "Assam Book depot",
    "NEDSSS Publi.",
    "CBSE/Dhanpat Raj & C",
    "TYCHEE",
    "Progress",
    "Headword Publishing Company",
    "Acevision Publisher Pvt Ltd",
    "Arya Publishing Company",
    "Edutree Publishers Pvt Ltd",
    "Evergreen Publications Ltd",
    "Orient BlackSwan",
    "Full Marks Pvt Ltd",
    "Langers International",
    "Vision Publications",
    "Avichal Publishing Co.",
    "Prachi India Pvt. Ltd.",
    "O. U. P.",
    "Black Pearl Publications",
    "Selina Publications",
    "Goyal Prakashan",
    "Dhanpat Rai & Co.",
    "Unisec Publications",
    "Morning Star",
    "Avichal Publishing Co.",
    "Huda Publications",
    "I. U. P.",
    "NCERT",
  ];
  const publisherOptions = publishers.map((publisher) => ({
    value: publisher,
    label: publisher,
  }));
  const mediums = [
    'English',
    'Malayalam',
    'Hindi',
    'Tamil',
    'Kannada',
    'Urudu',
    'Telgu',
    'Konkani',
    'Assamse',
    'Bengali',
    'Marathi',
  ]
  const mediumOptions = mediums.map((medium) => ({
    value: medium,
    label: medium,
  }));


  const educationboard = [
    "CENTRAL BOARD OF SECONDARY EDUCATION (CBSE) ",
    "KERALA BOARD OF PUBLIC EXAMINATION , KERALA",
    "KERALA BOARD OF HIGHER SECONDARY EDUCATION",
    "BOARD OF VOCATIONAL HIGHER SECONDARY EDUCATION, KERALA",
    "BOARD OF SECONDARY EDUCATION, MADHYA PRADESH",
    "ICSE BOARD",
  ];
  const boardOptions = educationboard.map((eduboard) => ({
    value: eduboard,
    label: eduboard,
  }));

  const [currentInput, setCurrentInput] = useState("");

  const handleInputChange = (event) => {
    setCurrentInput(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && currentInput.trim() !== "") {
      event.preventDefault();
      setMedium([...medium, currentInput.trim()]);
      setCurrentInput("");
    }
  };

  const removeTag = (index) => {
    setMedium(medium.filter((_, i) => i !== index));
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    // Remove any non-numeric characters
    const numericValue = value.replace(/\D/g, "");
    if (numericValue.length <= 10) {
      setPhoneNumber(numericValue);
    }
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      width: "100%",
      minHeight: "40px",
      height: "50px",
      border: "1px solid #526D82",
      borderRadius: "8px",
      boxShadow: state.isFocused ? "none" : "none",
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
      // padding: "0 10px",
      // border:'1px solid red',
      height:'50px',
      zIndex: 0,
      overflow: 'scroll',
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "#526D82",
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
    }),

    // multiValue: (base) => ({
    //   ...base,
    //   display: "flex",
    //   overflow: "hidden",
    //   textOverflow: "ellipsis",
    //   whiteSpace: "nowrap",
    // }),
    // multiValueLabel: (base) => ({
    //   ...base,
    //   overflow: "hidden",
    //   textOverflow: "ellipsis",
    //   whiteSpace: "nowrap",
    // }),
    // multiValueRemove: (base) => ({
    //   ...base,
    //   cursor: "pointer",
    // }),
  };
  return (
    <Container className="add_customer_container">
      <Row className="add_customer_div">
      <div className="add_customer_header">
        {/* className="form" */}
        <div className="add_customer_title">
            <Link to="/GodHeader">
              <FaArrowLeft className="customer_back_icon"/>
            </Link>
            <h3>Add Institution</h3>
          </div>
        <hr />
      </div>
      <div className="god_addcustomer_scrollable">
      <Row>
        <Col>
          {/* <div className="form-col"> */}
            <div className="input_container">
              <label for="institutionName" style={{ fontWeight: "600" }}>
                Institution Name
              </label>
              <input
                type="text"
                id="institutionName"
                name="institutionName"
                value={institutionName}
                style={{ textTransform: "capitalize" }}
                maxLength="100"
                onChange={(e) => setInstitutionName(e.target.value)}
              />
            </div>
            <div className="input_container">
              <label for="institutionCode" style={{ fontWeight: "600" }}>
                Institution Code
              </label>
              <input
                type="text"
                id="institutionCode"
                name="institutionCode"
                value={institutionCode}
                style={{ textTransform: "capitalize" }}
                maxLength="10"
                onChange={(e) => setInstitutionCode(e.target.value)}
              />
            </div>
            <div className="input_container">
              <label for="email" style={{ fontWeight: "600" }}>
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                maxLength="100"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          {/* </div> */}
        </Col>
        <Col>
          {/* <div className="form-col"> */}
            <div className="image_container">
              <label
                for="photo"
                style={{ color: "#707070", fontWeight: "600" }}
              >
                Institution Logo
              </label>
              <div className="image-upload-container">
                <div className="upload-placeholder">
                  {imageFile ? (
                    <>
                      <img
                        src={URL.createObjectURL(imageFile)}
                        alt="Uploaded Image"
                        className="uploaded_image"
                        style={{
                          maxWidth: "250px",
                          maxHeight: "200px",
                          marginLeft: "15px",
                        }}
                      />
                      <button
                        onClick={clearImageFile}
                        style={{
                          border: "none",
                          background: "none",
                          cursor: "pointer",
                        }}
                      >
                        <FaRedo
                          style={{ color: "blue", fontSize: "20px" }}
                          title="Change Image"
                        />
                      </button>
                    </>
                  ) : (
                    <>
                      <label htmlFor="image-upload" className="upload-label">
                        Upload Image
                      </label>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="upload-input"
                        onChange={handleImageUpload}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          {/* </div> */}
        </Col>
      </Row>
      <Row>
        <Col>
          {/* <div className="form-col"> */}
            <div
              className="input_container"
            >
              <label for="educationBoard" style={{ fontWeight: "600" }}>
                Board of Education
              </label>
              <Select
                type="text"
                id="educationBoard"
                name="educationBoard"
                list="board-list"
                options={boardOptions}
                value={board}
                onChange={handleEducationBoard}
                maxLength="100"
                styles={customStyles}
              />
            </div>
           
            <div className="input_container">
              <label for="address" style={{ fontWeight: "600" }}>
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={address}
                style={{ textTransform: "capitalize" }}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="input_container">
              <label for="region" style={{ fontWeight: "600" }}>
                Region
              </label>
              <input
                type="text"
                id="region"
                name="region"
                value={region}
                style={{ textTransform: "capitalize" }}
                maxLength="100"
                onChange={(e) => setRegion(e.target.value)}
              />
            </div>

            <div>
              {/* <div className="input_container">
                <label htmlFor="medium" style={{ fontWeight: "600" }}>
                  Medium
                </label>
                <div className="tags-input-container">
                  {medium.map((tag, index) => (
                    <div className="tag-item" key={index}>
                      {tag}
                      <button
                        className="remove-tag"
                        onClick={() => removeTag(index)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <input
                    type="text"
                    value={currentInput}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="tag-input-field"
                  />
                </div>
              </div> */}
              <div className="input_container">
                <label htmlFor="medium" style={{ fontWeight: "600" }}>
                  Medium
                </label>
                <Select
                  id="medium"
                  name="medium"
                  options={mediumOptions}
                  placeholder=""
                  isMulti
                  value={medium}
                  onChange={handleMediumChange}
                  maxLength="100"
                  styles={customStyles}
                />
              </div>
            </div>
          {/* </div> */}
        </Col>
        <Col>
          {/* <div className="form-col" style={{ marginTop: "1px" }}> */}
            <div
              className="input_container"
            >
              <label for="publisherName" style={{ fontWeight: "600" }}>
                Publisher Name
              </label>
              <Select
                id="publisherName"
                name="publisherName"
                options={publisherOptions}
                placeholder=""
                isMulti
                value={publisherName}
                onChange={handlePublisherChange}
                maxLength="100"
                styles={customStyles}
              />
            </div>
            <div className="input_container">
              <label for="phone" style={{ fontWeight: "600" }}>
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={phoneNumber}
                style={{ textTransform: "capitalize" }}
                maxLength={10}
                onChange={handlePhoneNumberChange}
              />
            </div>

            <div className="input_container">
              <label for="password" style={{ fontWeight: "600" }}>
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span onClick={togglePasswordVisibility}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <div className="input_container" >
              <label for="confirmPassword" style={{ fontWeight: "600" }}>
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onPaste={(e) => e.preventDefault()}
              />
              <span onClick={toggleConfirmPasswordVisibility}>
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <div className="button-container">
              <button type="submit" value="submit" onClick={handleSubmit}>
                {loading ? (
                  <>
                    <FaSpinner
                      className="spinner"
                      style={{ animation: "spin 2s linear infinite" }}
                    />
                    &nbsp;Saving...
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          {/* </div> */}
        </Col>
      </Row>
      </div>
      </Row>
    </Container>
  );
}

export default AddCustomer;
