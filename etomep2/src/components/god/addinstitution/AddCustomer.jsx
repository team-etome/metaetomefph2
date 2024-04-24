import React , {useState} from "react";
import "../addinstitution/addcustomer.css";
import { FaArrowLeft, FaSpinner, FaRedo  } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";


function AddCustomer() {

  const [institutionName, setInstitutionName] = useState("");
  const [institutionCode, setInstitutionCode] = useState("");
  const [email, setEmail] = useState("");
  const [board, setBoard] = useState("");
  const [databaseCode, setDatabaseCode] = useState("");
  const [address, setAddress] = useState("");
  const [region, setRegion] = useState("");
  const [medium, setMedium] = useState("");
  const [institutionType, setInstitutionType] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [publisherName, setPublisherName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  

  const APIURL = useSelector((state) => state.APIURL.url);

  const clearImageFile = () => {
    setImageFile(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleMediumChange = (e) => {
    setMedium(e.target.value);
  };

  const handleInstitutionChange = (e) => {
    setInstitutionType(e.target.value);
  };
  


  const handleSubmit = async () => {
    // Check if all required fields are filled
    if (
      !institutionName ||
      !institutionCode ||
      !medium ||
      !email ||
      !publisherName ||
      !board ||
      !databaseCode ||
      !address ||
      !region ||
      !institutionType ||
      !phoneNumber ||
      !password ||
      !confirmPassword ||
      !imageFile
    ) {
      let missingFields = [];
      if (!institutionName) missingFields.push("institution name");
      if (!institutionCode) missingFields.push("institution code");
      if (!medium) missingFields.push("medium");
      if (!email) missingFields.push("email");
      if (!publisherName) missingFields.push("publisher name");
      if (!board) missingFields.push("board of education");
      if (!imageFile) missingFields.push("image file");
      if (!databaseCode) missingFields.push("database code");
      if (!address) missingFields.push("address");
      if (!region) missingFields.push("region");
      if (!institutionType) missingFields.push("type of institution");
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

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("institute_name", institutionName);
      formData.append("institute_code", institutionCode);
      formData.append("medium", medium);
      formData.append("email_id", email);
      formData.append("publisher_name", publisherName);
      formData.append("eduational_body", board);
      formData.append("logo", imageFile);
      formData.append("database_code", databaseCode);
      formData.append("address", address);
      formData.append("region", region);
      formData.append("institute_type", institutionType);
      formData.append("phn_number", phoneNumber);
      formData.append("password", password);
      // formData.append("textbook_front_page", confirmPassword);

      const response = await axios.post(
        `${APIURL}/api/addadmin`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Textbook created successfully!",
      });
    } catch (error) {
      console.error("Error creating textbook:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    } finally {
      setLoading(false); 
    }
  };

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
            width:'100%'

          }}
        >
          <div style={{ marginLeft: "20px" }}>
            <Link to='/header' style={{color:'black'}}>
            <FaArrowLeft  style={{height:'32px', width:'20px'}}/>
            </Link>
          </div>
          <div style={{ marginLeft: "30px", color: "#526D82"}}>
            <h3>Add Institution</h3>
          </div>
          {/* <div style={{color:'2px solid black'}}></div> */}
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
                    value={institutionName}
                    style={{ textTransform: 'capitalize' }}
                    onChange={(e) => setInstitutionName(e.target.value)}
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
                    value={institutionCode}
                    style={{ textTransform: 'capitalize' }}
                    onChange={(e) => setInstitutionCode(e.target.value)}
                  />
                </div>
                <div className="input-container">
                  <label for="email" style={{ fontWeight: "600" }}>
                    Email
                  </label>
                    
                  <input type="text" id="email" name="email"  value={email}  onChange={(e) => setEmail(e.target.value)}/>
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
                  {imageFile ? (
                              <>
                                <img
                                  src={URL.createObjectURL(imageFile)}
                                  alt="Uploaded Image"
                                  className="uploaded_image"
                                  style={{
                                    maxWidth: "100%",
                                    maxHeight: "200px",
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
                    // <label htmlFor="image-upload" className="upload-label" >
                    //   Upload Image
                    // </label>
                    // <input
                    //   id="image-upload"
                    //   type="file"
                    //   accept="image/*"
                    //   className="upload-input"
                    //   onChange={handleImageUpload}
                    // />
                    <>
                      <label
                        htmlFor="image-upload"
                        className="upload-label"
                      >
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
                    value={board}
                    style={{ textTransform: 'capitalize' }}
                    onChange={(e) => setBoard(e.target.value)}
                  />
                </div>
                <div className="input-container">
                  <label for="databaseCode" style={{ fontWeight: "600" }}>
                    Database Code
                  </label>
                  <input type="text" id="databaseCode" name="databaseCode" value={databaseCode} style={{textTransform:'capitalize'}} onChange={(e) => setDatabaseCode(e.target.value)}/>
                </div>
                <div className="input-container" style={{ fontWeight: "600" }}>
                  <label for="address">Address</label>
                  <input type="text" id="address" name="address" value={address} style={{textTransform:'capitalize'}} onChange={(e) => setAddress(e.target.value)}/>
                </div>
                <div className="input-container">
                  <label for="region" style={{ fontWeight: "600" }}>
                    Region
                  </label>
                  <input type="text" id="region" name="region" value={region} style={{textTransform:'capitalize'}} onChange={(e) => setRegion(e.target.value)}/>
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
                          value="english"
                          checked={medium === "english"}
                          onChange={handleMediumChange}
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
                          value="malayalam"
                          checked={medium === "malayalam"}
                          onChange={handleMediumChange}
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
                            value='school'
                            checked={institutionType === "school"}
                            onChange={handleInstitutionChange}
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
                            value='college'
                            checked={institutionType === "college"}
                            onChange={handleInstitutionChange}
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
                  <input type="text" id="phone" name="phone" value={phoneNumber} style={{textTransform:'capitalize'}} onChange={(e) => setPhoneNumber(e.target.value)}/>
                </div>
                <div className="input-container">
                  <label for="publisherName" style={{ fontWeight: "600" }}>
                    Publisher Name
                  </label>
                  <input type="text" id="publisherName" name="publisherName" value={publisherName}  style={{textTransform:'capitalize'}} onChange={(e) => setPublisherName(e.target.value)}/>
                </div>
                <div className="input-container">
                  <label for="password" style={{ fontWeight: "600" }}>
                    Password
                  </label>
                  <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="input-container"
                  style={{ marginBottom: "110px" }}
                >
                  <label for="confirmPassword" style={{ fontWeight: "600" }}>
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                  />
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCustomer;