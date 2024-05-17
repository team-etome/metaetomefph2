import React, { useEffect, useState } from "react";
import "../viewinstitution/viewinstitution.css";
// import { IoIosArrowRoundBack } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';

function ViewInstitution() {
  const APIURL = useSelector((state) => state.APIURL.url);

  const [institution, setInstitution] = useState([]);

  console.log(institution, "institutionnnnnnnnnnnnnnnnn");

  const { id } = useParams();



  const fetchData = () => {
    axios
      .get(`${APIURL}/api/adminLogin/${id}`)
      .then((response) => {
        console.log(response.data);
        setInstitution(response.data);
      })
      .catch((error) => console.error("Error fetching institution:", error));
  };

  useEffect(() => {
    fetchData();
  }, [APIURL, id]);




  const handleToggleBlock = async (institutionId, is_block) => {
    const actionWord = is_block ? 'unblock' : 'block'; // Correct the action word based on the state
  
    // Confirmation dialog
    const result = await Swal.fire({
      title: `Are you sure?`,
      text: `Do you want to ${actionWord} this institution?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, ${actionWord} it!`
    });
  
    
    if (result.isConfirmed) {
      try {
        await axios.post(`${APIURL}/api/block`, { id: institutionId, action: !is_block }); // Toggle the action
  
        Swal.fire({
          icon: 'success',
          title: 'Block Status Updated',
          text: `Institution has been successfully ${actionWord}.`,
        });
  
        fetchData(); 
      } catch (error) {
        console.error("Error toggling block status:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while updating block status. Please try again later.',
        });
      }
    }
  };

  return (
    <div style={{ minheight: "100vh", overflowY: "auto" }}>
      {institution.map((institution, index) => (
        <div
          key={index}
          className="container"
          style={{
            backgroundColor: "#fff",
            marginTop: "80px",
            borderRadius: "17px",
            marginBottom: "70px",
          }}
        >
          <div>
            <nav className="navbar navbar-expand-lg navbar-light">
              <div
                className="container-fluid"
                style={{ backgroundColor: "#fff" }}
              >
                <Link to="/header" style={{ color: "black" }}>
                  {/* <IoIosArrowRoundBack style={{ height: "30px", width: "30px" }} /> */}
                  <FaArrowLeft style={{ height: "30px", width: "20px" }} />
                </Link>
                <a
                  className="navbar-brand"
                  style={{
                    color: "#526D82",
                    fontWeight: "500",
                    marginRight: "auto",
                    marginLeft: "20px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "20%",
                  }}
                >
                  {institution.institute_name}
                </a>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                  <form className="d-flex">
                    <button
                      className="btn btn-outline-danger"
                      type="button"
                      onClick={() =>
                        handleToggleBlock(institution.id, institution.is_block)
                      }
                      style={{
                        backgroundColor: institution.is_block
                          ? "#28a745"
                          : "#EA4035",
                        color: institution.isBlocked ? "#EA4035" : "#FFF",
                        borderColor: institution.is_block ? "#28a745" : "#EA4035",
                        fontWeight: "600px",
                      }}
                    >
                      {institution.is_block ? "Unblock" : "Block"}
                    </button>
                  </form>
                </div>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarTogglerDemo02"
                  aria-controls="navbarTogglerDemo02"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <BsThreeDotsVertical />
                </button>

                {/* <BsThreeDotsVertical/> */}
              </div>
            </nav>
            <hr />
          </div>

          <div className="container" style={{}}>
            <div className="row" style={{ padding: "30px" }}>
              <div className="col-md-6" style={{}}>
                <div className="row">
                  <div className="col-md-6" style={{ marginBottom: "30px" }}>
                    <div
                      className="clearfix"
                      style={{
                        backgroundColor: "#DAE2E9",
                        height: "180px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        // src="https://dt19wmazj2dns.cloudfront.net/wp-content/uploads/2024/04/amrita-vishwa-vidyapeetham-university-logo-colored-version.svg"
                        src={institution.logo}
                        className="col-md-6 float-md-end mb-3 ms-md-3"
                        alt="logo"
                        style={{ maxHeight: "100%", maxWidth: "100%" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        for="institutionName"
                        className="form-label"
                        style={{ color: "#727272", fontWeight: "500px" }}
                      >
                        Institution Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="institutionName"
                        value={institution?.institute_name}
                        style={{ marginBottom: "50px", width: "100%" }}
                        readOnly
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        for="educationBoard"
                        className="form-label"
                        style={{ color: "#727272", fontWeight: "500px" }}
                      >
                        Board Of Education
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="educationBoard"
                        value={institution.eduational_body}
                        style={{ marginBottom: "50px" }}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3">
                    <label
                      for="emailId"
                      className="form-label"
                      style={{ color: "#727272", fontWeight: "500px" }}
                    >
                      Email Id
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="emailId"
                      value={institution.email_id}
                      style={{ marginBottom: "35px" }}
                      readOnly
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      for="address"
                      className="form-label"
                      style={{ color: "#727272", fontWeight: "500px" }}
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      value={institution.address}
                      style={{ marginTop: "0px" }}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6" style={{ marginBottom: "50px" }}>
                <div className="mb-3" style={{}}>
                  <label
                    for="institutionCode"
                    className="form-label"
                    style={{ color: "#727272", fontWeight: "500px" }}
                  >
                    Institution Code
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="institutionCode"
                    value={institution.institute_code}
                    style={{ marginBottom: "50px" }}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label
                    for="phoneNo"
                    className="form-label"
                    style={{ color: "#727272", fontWeight: "500px" }}
                  >
                    Phone No.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNo"
                    value={institution.phn_number}
                    style={{ marginBottom: "50px" }}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label
                    for="databaseCode"
                    className="form-label"
                    style={{ color: "#727272", fontWeight: "500px" }}
                  >
                    Database Code
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="databaseCode"
                    value={institution.database_code}
                    style={{ marginBottom: "50px" }}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label
                    for="medium"
                    className="form-label"
                    style={{ color: "#727272", fontWeight: "500px" }}
                  >
                    Medium
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="medium"
                    value={institution.medium}
                    style={{ marginBottom: "30px" }}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ViewInstitution;
