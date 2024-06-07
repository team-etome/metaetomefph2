import React, { useState, useRef } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { IoIosAdd, IoMdDownload, IoMdAdd } from "react-icons/io";
import { MdUpload } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import amritha from "../../../assets/amritha.png";
import "../adminfacultydashboard/facultydashboard.css";
import generateExcelFile from "../../utils/generateExcelFile";
import { useSelector } from "react-redux";

function FacultyDashboard() {
  const [isActive, setIsActive] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Correctly declared here

  const admininfo = useSelector((state) => state.admininfo);
  const APIURL = useSelector((state) => state.APIURL.url);
  const admin_id = admininfo ? admininfo.admininfo.admin_id : null;


  const navigate = useNavigate()

  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const openFileSelector = () => {
    fileInputRef.current.click();
  };

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
      const response = await axios.post(
        `${APIURL}/api/excelteacher`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Upload successful");
      console.log(response.data);
      setShowOptions(false);
      setFile(null); // Clear file after upload
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error during file upload.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddClick = () => {
    setShowOptions(!showOptions);
  };

  const facultyListData = new Array(21).fill({
    employeeid: "English",
    facultyName: "yyyyyyyy",
  });

  const handleclick= ()=>{
      navigate('/facultyview')
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "104.5%" }}>
      <Container
        fluid
        className="faculty_container_scroll"
        style={{ marginTop: "16px" }}
      >
        <Row>
          {facultyListData.map((item, index) => (
            <Col lg={3} md={4} sm={6} xs={6} key={index} className="class_list">
              <div onClick={handleclick}  className="border border-black faculty_rectangle">
               
                  <div className="faculty_list_medium">{item.employeeid}</div>
                  <div className="faculty_profile_name">
                  
                    <div className="faculty_list_facultyname">
                      {item.facultyName}
                    </div>
                  </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      <div className="faculty_adding_button">
        <Button className={`faculty_adding my-button ${isActive ? 'active' : ''}`} onClick={handleAddClick}>

          <IoIosAdd style={{ height: "40px", width: "40px", color: "#ffff" }} />
        </Button>
        {showOptions && (
          <>
            <div className="overlay" onClick={handleAddClick}></div>
            <div className="fab-options">
              <Link
                to="/facultyadding"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  gap: "20px",
                }}
                className="fab_option_link"
              >
                <div className="fab-text">Add Faculty</div>
                <Button className="fab-option">
                  <IoMdAdd className="fab-icon" />
                </Button>
              </Link>

              <div
                onClick={generateExcelFile}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  gap: "20px",
                  cursor: "pointer",
                }}
                className="fab_option_link"
              >
                <div className="fab-text">Download Excel Template</div>
                <Button className="fab-option">
                  <IoMdDownload className="fab-icon" />
                </Button>
              </div>

              <div
                onClick={openFileSelector}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  gap: "20px",
                  cursor: "pointer",
                }}
                className="fab_option_link"
              >
                <div className="fab-text">Upload Through Excel</div>
                <Button className="fab-option">
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
                  onClick={handleFileUpload}
                  disabled={isLoading} 
                  style={{ 
                    backgroundColor: "#526D82",
                    border : "none",
                    marginTop: "20px" }}
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
