import React from "react";
import "../addinstitution/addcustomer.css";
import { FaArrowLeft } from "react-icons/fa";

function AddCustomer() {
  return (
    <div style={{backgroundColor:'#DDE6ED', border:'2px solid white'}}>
      <div  className="form">
        <div
          style={{
            display: "flex",
            paddingTop: "33px",
            paddingBottom: "16px",
            borderBottom: "1px solid #DDE6ED", 
            marginBottom: "20px", 
          }}
        >
          <div style={{ marginLeft: "20px" }}>
            <FaArrowLeft  style={{height:'32px', width:'20px'}}/>
          </div>
          <div style={{ marginLeft: "30px", color: "#526D82" }}>
            <h3>Add Institution</h3>
          </div>
          <div style={{color:'2px solid black'}}></div>
        </div>
        <div className="form-container" style={{paddingLeft:'50px', paddingRight:'50px'}}>
          <div>
            <div className="form-row">
              <div className="form-col">
                <div className="input-container">
                  <label for="institutionName" style={{ fontWeight: "600" }}>
                    Institution Name
                  </label>
                  <input
                    type="text"
                    id="institutionName"
                    name="institutionName"
                  />
                </div>
                <div className="input-container">
                  <label for="institutionCode" style={{ fontWeight: "600" }}>
                    Institution Code
                  </label>
                  <input
                    type="text"
                    id="institutionCode"
                    name="institutionCode"
                  />
                </div>
                <div className="input-container">
                  <label for="email" style={{ fontWeight: "600" }}>
                    Email
                  </label>
                  <input type="email" id="email" name="email" />
                </div>
              </div>
              <div className="form-col">
                <div style={{ marginLeft: "10px" }}>
                  <label
                    for="photo"
                    style={{ color: "#707070", fontWeight: "600" }}
                  >
                    Institution Logo
                  </label>
                  <div className="image-upload-container">
                  <div className="upload-placeholder">
                    <label htmlFor="image-upload" className="upload-label" >
                      Upload Image
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="upload-input"
                    />
                  </div>
              </div>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-col">
                <div className="input-container">
                  <label for="educationBoard" style={{ fontWeight: "600" }}>
                    Board of Education
                  </label>
                  <input
                    type="text"
                    id="educationBoard"
                    name="educationBoard"
                  />
                </div>
                <div className="input-container">
                  <label for="databaseCode" style={{ fontWeight: "600" }}>
                    Database Code
                  </label>
                  <input type="text" id="databaseCode" name="databaseCode" />
                </div>
                <div className="input-container" style={{ fontWeight: "600" }}>
                  <label for="address">Address</label>
                  <input type="text" id="address" name="address" />
                </div>
                <div className="input-container">
                  <label for="region" style={{ fontWeight: "600" }}>
                    Region
                  </label>
                  <input type="text" id="region" name="region" />
                </div>
                <div style={{ marginLeft: "20px" }}>
                  <label
                    for="medium"
                    style={{ color: "#707070", fontWeight: "600" }}
                  >
                    Medium
                  </label>
                  <div style={{ display: "flex", color: "#5C7689" }}>
                    <div style={{ display: "flex", padding: "10px" }}>
                      <div>
                        <input
                          style={{ marginRight: "1px", marginTop: "4px" }}
                          type="radio"
                          id="english"
                          name="medium"
                        />
                      </div>
                      <div
                        style={{
                          padding: "10px",
                          marginTop: "-10px",
                          fontWeight: "600",
                        }}
                      >
                        English
                      </div>
                    </div>
                    <div style={{ display: "flex", padding: "10px" }}>
                      <div>
                        <input
                          style={{ marginRight: "10px", marginTop: "4px" }}
                          type="radio"
                          id="english"
                          name="medium"
                        />
                      </div>
                      <div style={{ fontWeight: "600" }}>Malayalam</div>
                    </div>
                  </div>
                  <div>
                    <label
                      for="institutionType"
                      style={{ color: "#707070", fontWeight: "600" }}
                    >
                      Type of Institution
                    </label>
                    <div style={{ display: "flex", color: "#5C7689" }}>
                      <div style={{ display: "flex", padding: "10px" }}>
                        <div>
                          <input
                            style={{ marginRight: "1px", marginTop: "4px" }}
                            type="radio"
                            id="school"
                            name="institutionType"
                          />
                        </div>
                        <div
                          style={{
                            padding: "10px",
                            marginTop: "-10px",
                            fontWeight: "600",
                          }}
                        >
                          School
                        </div>
                      </div>
                      <div style={{ display: "flex", padding: "10px" }}>
                        <div>
                          <input
                            style={{ marginRight: "10px", marginTop: "4px" }}
                            type="radio"
                            id="college"
                            name="institutionType"
                          />
                        </div>
                        <div style={{ fontWeight: "600" }}>College</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-col" style={{ marginTop: "1px", }}> 
                <div className="input-container">
                  <label for="phone" style={{ fontWeight: "600" }}>
                    Phone Number
                  </label>
                  <input type="text" id="phone" name="phone" />
                </div>
                <div className="input-container">
                  <label for="publisherName" style={{ fontWeight: "600" }}>
                    Publisher Name
                  </label>
                  <input type="text" id="publisherName" name="publisherName" />
                </div>
                <div className="input-container">
                  <label for="password" style={{ fontWeight: "600" }}>
                    Password
                  </label>
                  <input type="text" id="password" name="password" />
                </div>
                <div className="input-container"
                  style={{ marginBottom: "110px" }}
                >
                  <label for="confirmPassword" style={{ fontWeight: "600" }}>
                    Confirm Password
                  </label>
                  <input
                    type="text"
                    id="confirmPassword"
                    name="confirmPassword"
                  />
                </div>
                <div className="button-container">
                  <button type="submit" value="submit">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCustomer;