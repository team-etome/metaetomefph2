import React, { useState, useRef, useEffect } from "react";
import { Col, Container, Row, Button, Form } from "react-bootstrap";
import { IoIosAdd, IoMdDownload, IoMdAdd } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";
import { MdUpload } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import amritha from "../../../assets/amritha.png";
import "../adminfacultydashboard/facultydashboard.css";
import generateExcelFile from "../../utils/generateExcelFile";
import { useSelector, useDispatch } from "react-redux";
import { adminteacherinfo } from "../../../Redux/Actions/AdminTeacherInfoAction";
import { BsSearch, BsFilterRight } from "react-icons/bs";
import Swal from "sweetalert2";



function FacultyDashboard() {
  const [isActive, setIsActive] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [facultyListData, setFacultyListData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");


  console.log(facultyListData, "uygr8estp97wer ")

  const admininfo = useSelector((state) => state.admininfo);
  const APIURL = useSelector((state) => state.APIURL.url);
  const admin_id = admininfo ? admininfo?.admininfo?.admin_id : null;

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   const fetchFacultyData = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await axios.get(
  //         `${APIURL}/api/teacherdetails/${admin_id}`
  //       );
  //       setFacultyListData(response.data);
  //       dispatch(adminteacherinfo(response.data));
  //     } catch (error) {
  //       console.error("Failed to fetch faculty data:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchFacultyData();
  // }, [APIURL]);
  // Move fetchFacultyData outside of useEffect
  const fetchFacultyData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${APIURL}/api/teacherdetails/${admin_id}`
      );
      setFacultyListData(response.data);
      dispatch(adminteacherinfo(response.data));
    } catch (error) {
      console.error("Failed to fetch faculty data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFacultyData(); // Now use fetchFacultyData inside useEffect
  }, [APIURL]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const validateLastName = (lastname) => {
    const regex = /^[a-zA-Z\s]*$/; // Allows only letters and spaces
    return regex.test(lastname);
  };

  const openFileSelector = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = async () => {
    console.log("entereddddd")
    if (!file) {
      Swal.fire({
        icon: "error",
        title: "No File Selected",
        text: "Please select a file to upload.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("adminId", admin_id);

    try {

      Swal.fire({
        title: "Uploading...",
        text: "Please wait while the file is being uploaded.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      console.log("Starting file upload...");
      const response = await axios.post(
        `${APIURL}/api/excelteacher`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("File uploaded successfully:", response);


      Swal.fire({
        icon: "success",
        title: "Upload Successful",
        text: "File has been uploaded successfully.",
      });

      await fetchFacultyData();
      setShowOptions(false);
      setFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);

      let errorMessage = "An error occurred during file upload.";
      if (error.response) {
        if (typeof error.response.data === "string") {
          errorMessage = error.response.data;
        } else if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      }


      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: errorMessage,
      });
    }
  };

  const handleAddClick = () => {
    setShowOptions(!showOptions);
  };

  const handleclick = (facultyData) => {
    navigate("/facultyview", { state: { faculty: facultyData } });
  };

  const filteredFacultyList = facultyListData.filter(
    (faculty) =>
      faculty.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faculty.employee_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "104.5%" }}>
      <div className="search-bar-wrapper">
        <Row className="search_filter_main_header">
          <Col md={6}></Col>
          <Col md={6} className="fac_search_col">
            <div className="search_filter_main">
              <Form className="d-flex inst_search">
                <div className="position-relative ad_sch">
                  <BsSearch
                    className={`position-absolute top-50 translate-middle-y ms-2 inst_search_icon ${searchQuery ? "hidden" : ""
                      }`}
                  />
                  <Form.Control
                    type="search"
                    placeholder="Search by name"
                    className="ps-3 search_bar"
                    aria-label="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
      <Container fluid className="faculty_container_scroll">
        {/* <Row className="search_filter_main_header">
          <Col md={6} ></Col>
          <Col md={6} className='fac_search_col'>
            <div className="search_filter_main" >
              <Form className="d-flex inst_search">
                <div className="position-relative ad_sch">
                  <BsSearch className={`position-absolute top-50 translate-middle-y ms-2 inst_search_icon ${searchQuery ? 'hidden' : ''}`} />
                  <Form.Control
                    type="search"
                    placeholder="Search by name"
                    className="ps-3 search_bar"
                    aria-label="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </Form>
            </div>
          </Col>
        </Row> */}
        <Row>
          {filteredFacultyList.map((item, index) => (
            <Col lg={3} md={4} sm={6} xs={6} key={index} className="fac_list">
              <div
                onClick={() => handleclick(item)}
                className={`faculty_rectangle ${!item.status ? "" : "inactive-faculty"
                  }`}
              >
                <div
                  className="faculty_list_medium"
                  style={{ textTransform: "capitalize" }}
                >
                  ID:{item.employee_id}
                </div>
                <div className="faculty_profile_name">
                  <div
                    className="faculty_list_facultyname"
                    style={{ textTransform: "capitalize" }}
                  >
                    {item.first_name}
                  </div>
                </div>
                <div className="faculty_lisit_circle">
                  <div className="faculty_number_div">
                    {/* <img
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                      src={amritha}
                      alt=""
                    /> */}
                    {item.image ? (
                      <img
                        style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                        src={item.image}
                        alt={item.first_name || "Faculty Profile"}
                      />
                    ) : (
                      <IoPersonSharp style={{
                        width: "40px",
                        height: "50px",
                        borderRadius: "50%",
                      }} />
                    )
                    }
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      <div className="faculty_adding_button">
        <button
          className={`faculty_adding faculty_adding_my_button ${isActive ? "active" : ""
            }`}
          onClick={handleAddClick}
        >
          <IoIosAdd style={{ height: "40px", width: "40px", color: "#ffff" }} />
        </button>
        {showOptions && (
          <>
            <div className="overlay" onClick={handleAddClick}></div>
            <div className="fab-options">
              <Link to="/facultyadding" className="fab_option_link">
                <Button className="fab-option" style={{ marginTop: "10px" }}>
                  <IoMdAdd className="fab-icon" />
                </Button>
                <div className="fab-text">Add Faculty</div>
              </Link>

              <div
                onClick={generateExcelFile}
                // style={{
                // display: "flex",
                // justifyContent: "center",
                // alignContent: "center",
                // marginTop:'20px',
                // gap: "20px",
                // cursor: "pointer",
                // marginTop:'20px',
                // }}
                className="fab_option_link"
              >
                <div className="fab-text">Download Excel Template</div>
                <Button className="fab-option" style={{ marginTop: "70px" }}>
                  <IoMdDownload className="fab-icon" />
                </Button>
              </div>

              <div
                onClick={openFileSelector}
                // style={{
                // display: "flex",
                // justifyContent: "center",
                // alignContent: "center",
                // gap: "20px",
                // cursor: "pointer",
                // marginTop:'20px',
                // }}
                className="fab_option_link"
              >
                <div className="fab-text">Upload Through Excel</div>
                <Button className="fab-option" style={{ marginTop: "130px" }}>
                  <MdUpload className="fab-icon" />
                </Button>
              </div>
              <input
                type="file"
                onChange={handleFileChange}
                accept=".xls,.xlsx"
                style={{ display: "none" }}
                ref={fileInputRef}
              />
              {file && (
                <Button
                  className="upload_button"
                  onClick={handleFileUpload}
                  disabled={isLoading}
                >
                  {isLoading ? "Uploading..." : "Upload File"}
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default FacultyDashboard;