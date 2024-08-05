import React, { useState, useRef, useEffect } from "react";
import { Col, Container, Row, Button, Form } from "react-bootstrap";
import { IoIosAdd, IoMdDownload, IoMdAdd } from "react-icons/io";
import { MdUpload } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import amritha from "../../../assets/amritha.png";
import "../adminfacultydashboard/facultydashboard.css";
import generateExcelFile from "../../utils/generateExcelFile";
import { useSelector, useDispatch } from "react-redux";
import { adminteacherinfo } from "../../../Redux/Actions/AdminTeacherInfoAction";
import { BsSearch, BsFilterRight } from "react-icons/bs";

function FacultyDashboard() {
  const [isActive, setIsActive] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [facultyListData, setFacultyListData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const admininfo = useSelector((state) => state.admininfo);
  const APIURL = useSelector((state) => state.APIURL.url);
  const admin_id = admininfo ? admininfo?.admininfo?.admin_id : null;

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
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

    fetchFacultyData();
  }, [APIURL]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const openFileSelector = () => {
    fileInputRef.current.click();
  };

  // const handleFileUpload = async () => {
  //   if (!file) {
  //     alert("Please select a file to upload.");
  //     return;
  //   }

  //   setIsLoading(true);
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("adminId", admin_id);

  //   try {
  //     const response = await axios.post(
  //       `${APIURL}/api/excelteacher`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     console.log("File uploaded successfully:", response);
  //   alert("Upload successful");
  //   fetchFacultyData();
  //   setShowOptions(false);
  //   setFile(null);
  // } catch (error) {
  //   console.error("Error uploading file:", error);

  //   let errorMessage = "An error occurred during file upload.";
  //   if (error.response) {
  //     if (typeof error.response.data === 'string') {
  //       errorMessage = error.response.data;
  //     } else if (error.response.data && error.response.data.message) {
  //       errorMessage = error.response.data.message;
  //     }
  //   }

    //   alert("Upload successful");
    //   fetchFacultyData();

    //   console.log(response.data);
    //   setShowOptions(false);
    //   setFile(null);
    // } catch (error) {
    //   console.error("Error uploading file:", error);
      // alert("Error during file upload.");
      // const errorMessage = error.response?.data?.message || "Error during file upload.";
      // alert(errorMessage);
      // let errorMessage = "Error during file upload.";

      
      // if (error.response && error.response.data) {
      //   if (typeof error.response.data === 'string') {
      //     errorMessage = error.response.data;
      //   } else if (error.response.data.message) {
      //     errorMessage = error.response.data.message;
      //   }
      // }
      // alert(errorMessage);

      // const errorMessage = 
      // typeof error.response?.data === 'string' 
      // ? error.response?.data 
      // : error.response?.data?.message || "Error during file upload.";

  //   alert(errorMessage);

  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleFileUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("adminId", admin_id);

    try {
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
      alert("Upload successful");
      await fetchFacultyData();
      setShowOptions(false);
      setFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);

      // let errorMessage = "An error occurred during file upload.";
      if (error.response) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      }

      alert(errorMessage);
    } finally {
      setIsLoading(false);
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
      <Container
        fluid
        className="faculty_container_scroll"
        style={{ marginTop: "16px" }}
      >
        <Row>
          <Col md={6}></Col>
          <Col md={6}>
            <div className="search_filter_main">
              <Form className="d-flex inst_search">
                <div className="position-relative">
                  <BsSearch className="position-absolute top-50 translate-middle-y ms-2 inst_search_icon" />
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
        <Row>
          {filteredFacultyList.map((item, index) => (
            <Col lg={3} md={4} sm={6} xs={6} key={index} className="class_list">
              <div
                onClick={() => handleclick(item)}
                className="border border-white faculty_rectangle"
              >
                <div className="faculty_list_medium" style={{textTransform:'capitalize'}}>ID:{item.employee_id}</div>
                <div className="faculty_profile_name">
                  <div className="faculty_list_facultyname"style={{textTransform:'capitalize'}}>
                    {item.first_name}
                  </div>
                </div>
                <div className="faculty_lisit_circle">
                  <div className="faculty_number_div">
                    <img
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                      src={amritha}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      <div className="faculty_adding_button">
        <button
          className={`faculty_adding faculty_adding_my_button ${
            isActive ? "active" : ""
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
                <Button
                  className="fab-option"
                  style={{ marginTop: "20px" }}
                >

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
                <Button className="fab-option" style={{ marginTop: "80px" }}>
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
                <Button className="fab-option" style={{ marginTop: "140px" }}>
                  <MdUpload className="fab-icon" />
                </Button>
              </div>
              <input
                type="file"
                onChange={handleFileChange}
                style={{ display: "none" }}
                ref={fileInputRef}
              />
              {file && (
                <Button
                  className="upload_button"
                  onClick={handleFileUpload}
                  disabled={isLoading}
                  // style={{
                  //   backgroundColor: "#526D82",
                  //   border: "none",
                  //   marginTop: "200px",
                  //   marginRight:'70px',
                  // }}
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
