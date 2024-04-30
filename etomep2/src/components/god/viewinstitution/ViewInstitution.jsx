import React from "react";
import "../viewinstitution/viewinstitution.css";
// import { IoIosArrowRoundBack } from "react-icons/io";
import { FaArrowLeft} from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";


function ViewInstitution() {
  return (
    <div
      style={{  minheight: "100vh", overflowY: "auto" }}
    >
      <div
        className="container"
        style={{
          backgroundColor: "#fff",
          marginTop: "80px",
          borderRadius: "17px",
          marginBottom: "70px",
        }}
      >
        <div>
        <nav className="navbar navbar-expand-lg navbar-light" >
          <div className="container-fluid" style={{backgroundColor:'#fff',}}>
            <Link to='/header' style={{color:'black'}}>
            {/* <IoIosArrowRoundBack style={{ height: "30px", width: "30px" }} /> */}
            <FaArrowLeft   style={{ height:'30px', width:'20px' }} />
            </Link>
            <a
              className="navbar-brand"
              style={{
                color: "#526D82",
                fontWeight: "500",
                marginRight: "auto",
                marginLeft: "20px",
              }}
            >
              Institution Name
            </a>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
              <form className="d-flex">
                <button
                  className="btn btn-outline-danger"
                  type="submit"
                  style={{
                    backgroundColor: "#FDE9E6",
                    color: "#EA4035",
                    fontWeight: "600px",
                  }}
                >
                  Block
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
                      src="https://dt19wmazj2dns.cloudfront.net/wp-content/uploads/2024/04/amrita-vishwa-vidyapeetham-university-logo-colored-version.svg"
                      className="col-md-6 float-md-end mb-3 ms-md-3"
                      alt="logo"
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
                      placeholder=""
                      style={{ marginBottom: "50px", width: "100%" }}
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
                      placeholder=""
                      style={{ marginBottom: "50px" }}
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
                    placeholder=""
                    style={{ marginBottom: "35px" }}
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
                    placeholder=""
                    style={{ marginTop: "0px" }}
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
                  placeholder=""
                  style={{ marginBottom: "50px" }}
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
                  placeholder=""
                  style={{ marginBottom: "50px" }}
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
                  placeholder=""
                  style={{ marginBottom: "50px" }}
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
                  placeholder=""
                  style={{ marginBottom: "30px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewInstitution;







