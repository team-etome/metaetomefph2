import React, { useState, useRef } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { RiEdit2Fill, RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import "../adminprofile/adminprofile.css";
import Cropper from "react-easy-crop";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
function AdminProfile() {
  const location = useLocation();
  const admininfo =
    location.state?.admininfo ||
    useSelector((state) => state.admininfo?.admininfo);
  console.log(admininfo, "admin info");
  const navigate = useNavigate();

  const [isPasswordEditable, setIsPasswordEditable] = useState(false);
  const [password, setPassword] = useState("");
  const APIURL = useSelector((state) => state.APIURL.url);

  const admin_id = admininfo?.admin_id;
  console.log(admin_id, "admin id");

  const passwordInputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleChangePassword = () => {
    setIsPasswordEditable((prev) => !prev); // Toggle password edit mode
    if (!isPasswordEditable) {
      // Focus on the password field when entering edit mode
      setTimeout(() => {
        passwordInputRef.current?.focus(); // Use the ref to focus the field
      }, 0);
    }
  };

  const handleSavePassword = async () => {
    // Check if the password is empty
    if (!password || password === "*****") {
      Swal.fire({
        icon: "warning",
        title: "Password is required",
        text: "Please enter a new password before saving.",
        showConfirmButton: true,
      });
      return; // Stop execution if password is empty
    }

    try {
      const data = {
        id: admin_id,
        password: password,
      };

      const response = await axios.put(`${APIURL}/api/addadmin`, data);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Password Updated",
          // text: response.data.message,
          timer: 1500,
          showConfirmButton: false,
        });
        setIsPasswordEditable(false); // Switch back to read-only mode
        // Add this line to mask the password after saving:
        setShowPassword(false);
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error updating password:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update password. Please try again.",
        showConfirmButton: true,
      });
    }
  };

  const handleBack = () => {
    navigate("/admindashboard");
  };

  const handleLogout = () => {
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };


  // Toggle edit mode for the profile image
  const [isEditing, setIsEditing] = useState(false);
  // Current profile image state – initialize with admin logo
  const [profileImage, setProfileImage] = useState(admininfo?.logo);
  // States for cropping functionality
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  // Convert the selected image to a DataURL and open the cropper modal
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Create cropped image using a canvas
  const createCroppedImage = (imageSrc, croppedAreaPixels) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        // Set canvas dimensions to the minimum of width and height to get a square crop
        const size = Math.min(croppedAreaPixels.width, croppedAreaPixels.height);
        canvas.width = size;
        canvas.height = size;

        // For circular crop (if needed), clip the canvas
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
        ctx.clip();

        ctx.drawImage(
          image,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
          0,
          0,
          size,
          size
        );

        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error("Canvas cropping failed"));
            return;
          }
          resolve(URL.createObjectURL(blob));
        }, "image/png");
      };
      image.onerror = (error) => reject(error);
    });
  };

  const getCroppedImage = async () => {
    try {
      const croppedImageUrl = await createCroppedImage(imageSrc, croppedAreaPixels);
      setProfileImage(croppedImageUrl);
      setShowCropper(false);
    } catch (error) {
      console.error("Error cropping image:", error);
    }
  };

  const handleUpdateProfileImage = async () => {
    try {
      // Convert the current profileImage URL to a Blob.
      const responseBlob = await fetch(profileImage);
      const blob = await responseBlob.blob();

      // Create a File object from the blob.
      const file = new File([blob], "profile.png", { type: blob.type });

      // Prepare form data.
      const formData = new FormData();
      formData.append("logo", file); // Use the correct field name as required by your backend.
      formData.append("id", admin_id);

      // Call the API endpoint to update the profile image.
      const updateResponse = await axios.put(`${APIURL}/api/addadmin`, formData, {
        // headers: { "Content-Type": "multipart/form-data" },
      });

      if (updateResponse.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Profile Image Updated",
          text: "Your profile image has been successfully updated.",
          showConfirmButton: true,
          confirmButtonText: "OK",
        }).then(() => {
          setIsEditing(false); // Exit editing mode.
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update profile image.",
          showConfirmButton: true,
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error updating image:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update profile image.",
        showConfirmButton: true,
        confirmButtonText: "OK",
      });
    }
  };

  const handleEditButtonClick = () => {
    if (isEditing) {
      handleUpdateProfileImage();
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div className="admin_profile">
      <div className="background_section top_section">
        <button onClick={handleBack} className="back_button">
          &lt;
        </button>
        <button onClick={handleLogout} className="logout_button">
          Logout
        </button>
      </div>
      <div className="background_section bottom_section"></div>
      <Container className="content_container">
        <Row className=" profile-card-main-div">
          <Col md={8}>
            <div className="profile_card">
              {<div className="admin_profile_edit">
                {/* { {isPasswordEditable ? (
                  <button onClick={handleSavePassword}>Save Password</button>
                ) : (
                  <button onClick={handleChangePassword}>
                    Change Password
                  </button>
                )} } */}
                {/* <RiEdit2Fill className="admin_profile_edit_icon" /> */}
                <button onClick={handleEditButtonClick}>
                  {isEditing ? "Save" : "Edit"}
                </button>
              </div>}
              <Form className="profile_form">
                <Row>
                  <Col md={6}>
                    <div className="admin_profile_group">
                      <label htmlFor="inst_name">Institution Name</label>
                      <input
                        type="text"
                        id="inst_name"
                        name="inst_name"
                        readOnly
                        value={admininfo?.institute_name || ""}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="admin_profile_group">
                      <label htmlFor="email">Email Id</label>
                      <input
                        type="text"
                        id="email"
                        name="email"
                        readOnly
                        value={admininfo?.email || ""}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <div className="admin_profile_group">
                      <label htmlFor="inst_code">Institution Code</label>
                      <input
                        type="text"
                        id="inst_code"
                        name="inst_code"
                        readOnly
                        value={admininfo?.institute_code || ""}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="admin_profile_group">
                      <label htmlFor="region">Region</label>
                      <input
                        type="text"
                        id="region"
                        name="region"
                        readOnly
                        value={admininfo?.region || ""}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <div className="admin_profile_group">
                      <label htmlFor="boardofeducation">
                        Board Of Education
                      </label>
                      <input
                        type="text"
                        id="boardofeducation"
                        name="boardofeducation"
                        readOnly
                        value={admininfo?.educational_body || ""}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="admin_profile_group">
                      <label htmlFor="phn_no">Phone Number</label>
                      <input
                        type="text"
                        id="phn_no"
                        name="phn_no"
                        readOnly
                        value={admininfo?.number || ""}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="admin_profile_group" style={{ position: "relative" }}>
                      <label htmlFor="password">Password</label>
                      <input
                        // Change this line: use a dynamic type based on showPassword
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder="*****"
                        readOnly={!isPasswordEditable}
                        value={password}
                        ref={passwordInputRef}
                        onChange={handlePasswordChange}
                        className={isPasswordEditable ? "highlighted" : ""}
                      />
                      {/* The toggle icon */}
                      {isPasswordEditable && (
                        <span
                          className="password-toggle-icon"
                          onClick={handleTogglePasswordVisibility}
                          style={{
                            position: "absolute",
                            top: "65%",
                            right: "10px",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                          }}
                        >
                          {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
                        </span>
                      )}
                    </div>

                    <span
                      style={{
                        textDecoration: 'underline',
                        fontSize: '16px',
                        color: '#526D82',
                        cursor: 'pointer',
                      }}
                      onClick={isPasswordEditable ? handleSavePassword : handleChangePassword}
                    >
                      {isPasswordEditable ? 'Save Password' : 'Change Password'}
                    </span>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="profile_image_container">
        <img src={profileImage} alt="Institution Logo" className="profile_image" />
        {isEditing && (
          <div className="input_container_pic">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="admin_profile_pic"
            />
          </div>
        )}
      </div>
      {showCropper && (
        <div className="cropper-container">
          <div className="cropper-wrapper">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1} // For a square crop – adjust as needed
              cropSize={{ width: 150, height: 150 }}
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={(croppedArea, croppedAreaPixels) =>
                setCroppedAreaPixels(croppedAreaPixels)
              }
            />
            <div className="cropper-overlay"></div>
          </div>
          <Button className="crop-save-btn" onClick={getCroppedImage}>
            Crop & Save
          </Button>
        </div>
      )}
    </div>
  );
}

export default AdminProfile;
