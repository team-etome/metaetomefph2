import React, { useState, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import {FaRedo} from "react-icons/fa";
import Select from "react-select";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import "../addstudent/addstudent.css";

function AddStudent() {
  const [studentName, setStudentName] = useState(null);
  const [studentRollno, setStudentRollno] = useState(null);
  const [studentEmail, setStudentEmail] = useState(null);
  const [studentPhone, setStudentPhone] = useState(null);
  const [studentDob, setStudentDob] = useState(null);
  const [studentcategory, setStudentCategory] = useState(null);
  const [studentGender, setStudentGender] = useState(null);
  const [studentJoined, setStudentJoined] = useState(null);
  const [studentAdmission, setStudentAdmission] = useState(null);
  const [studentGuardian, setstudentGuardian] = useState(null);
  const [studentFather, setStudentFather] = useState(null);
  const [studentMother, setStudentMother] = useState(null);
  const [studentAddress, setStudentAddress] = useState(null);
  const [imageFile, setImageFile] = useState(null);


  // const admininfo = useSelector((state) => state.admininfo);
  const APIURL = useSelector((state) => state.APIURL.url);
  const teacher = useSelector((state) => state.teacherinfo);

  const teacher_id = teacher.teacherinfo?.teacher_id;

  const navigate = useNavigate();

  const clearImageFile = () => {
    setImageFile(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      student_name: studentName,
      admission_no: studentAdmission,
      roll_no: studentRollno,
      number: studentPhone,
      email: studentEmail,
      gender: studentGender,
      dob: studentDob,
      // category: studentcategory,
      start_date: studentJoined,
      guardian: studentGuardian,
      fathers_name: studentFather,
      mothers_name: studentMother,
      address: studentAddress,
      teacher: teacher_id,
    };

    try {
      const response = await axios.post(`${APIURL}/api/addstudent`, formData);
      console.log("Success:", response.data);

      setStudentName("");
      setStudentRollno("");
      setStudentEmail("");
      setStudentPhone("");
      setStudentDob("");
      setStudentGender("");
      setStudentCategory("");
      setStudentJoined("");
      setStudentAdmission("");
      setstudentGuardian("");
      setStudentFather("");
      setStudentMother("");
      setStudentAddress("");

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "Student has been added successfully!",
      });

      navigate("/teacherstudentdashboard");
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: "Please check the data and try again.",
      });
      // Handle errors
    }
  };
  const genderOptions = [
    { value: "Female", label: "Female" },
    { value: "Male", label: "Male" },
    { value: "other", label: "other" },
  ];

  const customStyles = {
    control: (base, state) => ({
      ...base,
      width: '100%',
      minHeight: '40px', 
      height: '50px',
      border: '1px solid #526D82',
      borderRadius: '8px',
      boxShadow: state.isFocused ? 'none' : 'none',
      "&:hover": {
        borderColor: 'none' 
      },
      "&:focus": {
        borderColor: '#526D82', 
        outline: 'none' 
      }
    }),
    placeholder: (base) => ({
      ...base,
      color: '#526D82',
    }),
    singleValue: (base) => ({
      ...base,
      color: '#000',
    }),
    option: (base) => ({
      ...base,
      color: '#000',
    }),
    valueContainer: (base) => ({
      ...base,
      padding: '0 10px',
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: '#526D82',
    }),
    indicatorSeparator: (base) => ({
      display: 'none',
    }),
    indicatorsContainer: (base) => ({
      ...base,
      alignItems: 'center',
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
      position: 'absolute',
    }),
  };

  return (
    <div>
      <Container className="teacher_studentadd_container">
        <form className="teacher_studentadd_form">
          {/* <div className="teacher_studentadd_scrollable"> */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              // marginBottom: "10px",
            }}
          >
<<<<<<< HEAD
            <Link to="/teachernavbar">
=======
            <Link to="/teacherstudentdashboard">
>>>>>>> 2f0136bb8e99b05eced73455ff29c0aa112bd4f4
              <IoChevronBackSharp className="teacher_studentadd_back" />
            </Link>
            <h1 className="teacher_studentadd_title">Add Student</h1>
          </div>
          <div style={{ border: "0.5px solid #526D82" }}></div>
          <div className="teacher_studentadd_scrollable">
            <Row style={{ paddingTop: "20px" }}>
              <Col md={6}>
                <div className="teacher_studentadd_group">
                  <label htmlFor="student_name">
                    Student Name<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="student_name"
                    name="student_name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                  />
                </div>
                <div className="teacher_studentadd_group">
                  <label htmlFor="roll_no">
                    Roll No.<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="exam_roll_nodate"
                    name="roll_no"
                    value={studentRollno}
                    onChange={(e) => setStudentRollno(e.target.value)}
                  />
                </div>

                <div className="teacher_studentadd_group">
                  <label htmlFor="email">
                    Email Id<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                  />
                </div>
                <div className="teacher_studentadd_group">
                  <label htmlFor="phone">
                    Phone No.<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                  />
                </div>
                <div className="teacher_studentadd_group">
                  <label htmlFor="dob">
                    DOB<span style={{ color: "red" }}>*</span>
                  </label>
                  <input  onChange={(e) => setStudentDob (e.target.value)} type="date" name="" id="" />
                </div>
                <div className="teacher_studentadd_group">
                  <label htmlFor="gender">
                    Gender<span style={{ color: "red" }}>*</span>
                  </label>

                  <Select
                    options={genderOptions}
                    styles={customStyles}
                    value={genderOptions.find(
                      (option) => option.value === studentGender
                    )}
                    onChange={(option) => setStudentGender(option.value)}
                    placeholder="Select Gender"
                  />
                </div>
                {/* <div className="teacher_studentadd_group">
                  <label htmlFor="category">
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                  />
                </div> */}
              </Col>
              <Col md={6}>
                <div className="teacher_studentadd_group">
                  <label htmlFor="join_date">
                    Joining Date<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    onChange={(e) => setStudentJoined(e.target.value)}
                    type="date"
                    name=""
                    id=""
                  />
                </div>

                <div className="teacher_studentadd_group">
                  <label htmlFor="term">
                    Admission Number<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="s_time"
                    name="s_time"
                    value={studentAdmission}
                    onChange={(e) => setStudentAdmission(e.target.value)}
                  />
                </div>
                <div className="teacher_studentadd_group">
                  <label htmlFor="guardian_name">
                    Gaurdian Name<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="guardian_name"
                    name="guardian_name"
                    value={studentGuardian}
                    onChange={(e) => setstudentGuardian(e.target.value)}
                  />
                </div>
                <div className="teacher_studentadd_group">
                  <label htmlFor="father_name">
                    Father's Name<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="father_name"
                    name="father_name"
                    value={studentFather}
                    onChange={(e) => setStudentFather(e.target.value)}
                  />
                </div>
                <div className="teacher_studentadd_group">
                  <label htmlFor="mother_name">
                    Mother's Name<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="mother_name"
                    name="mother_name"
                    value={studentMother}
                    onChange={(e) => setStudentMother(e.target.value)}
                  />
                </div>
                <div className="teacher_studentadd_group">
                  <label htmlFor="address">
                    Address<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={studentAddress}
                    onChange={(e) => setStudentAddress(e.target.value)}
                  />
                </div>
                <div className="image_conatiner">
                  <div className="student_image_upload_container">
                  <label className="upload_profile_label">Upload Profile Image</label>
                  <label >Or</label>
                    <div className="student_upload_placeholder">
                      {imageFile ? (
                        <>
                          <img
                            src={URL.createObjectURL(imageFile)}
                            alt="Uploaded Image"
                            className="student_uploaded_image"
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
                          <label
                            htmlFor="image-upload"
                            className="student_upload_label"
                          >
                            Select File
                          </label>
                          <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            className="student_upload_input"
                            onChange={handleImageUpload}
                          />
                        </>
                      )}
                    </div>
                    <label style={{paddingTop:'10px'}}>maximum  Upload file size : 256 Mb.</label>
                  </div>
                </div>
                <div className="teacher_studentadd_submit">
                  <button onClick={handleSubmit} type="submit">
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

export default AddStudent;
