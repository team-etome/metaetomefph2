import React, { useState,useEffect } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import amritha from "../../../assets/amritha.png";
import { RiEdit2Fill } from "react-icons/ri";
import "../teacherprofile/teacherprofile.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../Redux/Actions/TeacherLogoutInfoAction";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Cropper from "react-easy-crop";
import Swal from "sweetalert2";
import { teacherinfo } from "../../../Redux/Actions/TeacherInfoAction";


function TeacherProfile() {
  const teacherinfo = useSelector((state) => state.teacherinfo);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const APIURL = useSelector((state) => state.APIURL.url);
  const [firstName, setFirstName] = useState(
    teacherinfo.teacherinfo?.first_name || ""
  );
  const [lastName, setLastName] = useState(
    teacherinfo.teacherinfo?.last_name || ""
  );
  const [email, setEmail] = useState(teacherinfo.teacherinfo?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(
    teacherinfo.teacherinfo?.phone_number || ""
  );
  const [institutionCode, setInstitutionCode] = useState(""); // Add default values if available
  const [region, setRegion] = useState("");
  const [boardOfEducation, setBoardOfEducation] = useState("");
  const [profileImage, setProfileImage] = useState(
    teacherinfo.teacherinfo?.image || amritha
  );
  const [imageSrc, setImageSrc] = useState(null);  // Holds the uploaded image as a DataURL
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [teacherId, SetTeacherId] = useState(teacherinfo.teacherinfo?.teacher_id || "")


  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleback = () => {
    navigate("/teacherhome");
  };

  const handleLogout = () => {
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    localStorage.clear();
    sessionStorage.clear();
    dispatch(logout());
    navigate("/teacherlogin");
  };

  console.log(teacherinfo, "teacher info");

  const handleEditToggle = () => {
    if (isEditing) {
      // Save data when toggling off the edit mode
      handleSave();
    } else {
      setIsEditing(!isEditing);
    }
  };

  // const handleSave = () => {
  //   const formData = new FormData();
  //   formData.append("first_name", firstName);
  //   formData.append("last_name", lastName);
  //   formData.append("email", email);
  //   formData.append("phone_number", phoneNumber);
  //   formData.append("institution_code", institutionCode);
  //   formData.append("region", region);
  //   formData.append("board_of_education", boardOfEducation);
  //   if (profileImage !== amritha) {
  //     formData.append("profile_image", profileImage);
  //   }

  //   axios
  //     .put(`${APIURL}/api/addteacher/${teacherId}`, formData)
  //     .then((response) => {
  //       console.log("Data saved successfully:", response.data);
  //       setIsEditing(false);
  //     })
  //     .catch((error) => {
  //       console.error("There was an error saving the data!", error);
  //     });
  // };

  useEffect(() => {
    // Update the profileImage state whenever teacherData changes
    setProfileImage(teacherinfo?.image || amritha);
  }, [teacherinfo]);

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("phone_number", phoneNumber);
    formData.append("institution_code", institutionCode);
    formData.append("region", region);
    formData.append("board_of_education", boardOfEducation);
    if (profileImage !== amritha) {
      formData.append("image", profileImage);
    }
    if (profileImage !== amritha) {
      try {
        // Convert the blob URL to a Blob
        const response = await fetch(profileImage);
        const blob = await response.blob();
        // Create a File object from the blob
        const file = new File([blob], "profile.png", { type: blob.type });
        formData.append("image", file);
      } catch (error) {
        console.error("Error converting image:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "There was an error processing the image.",
        });
        return;
      }
    }
    console.log(profileImage, "sjdfhgusdgfiuhshid")

    axios
      .put(`${APIURL}/api/addteacher/${teacherId}`, formData)
      .then((response) => {
        const updatedTeacher = response.data.teacher;
        if (updatedTeacher) {
          // Update Redux using your teacherinfo action
          dispatch(teacherinfo(updatedTeacher));
          // Persist the updated teacher info in localStorage so it persists on refresh
          localStorage.setItem("teacherinfo", JSON.stringify(updatedTeacher));
        }
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Data saved successfully!"
        }).then(() => {
          setIsEditing(false);
        });
      })
      .catch((error) => {
        console.error("There was an error saving the data!", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "There was an error saving the data!"
        });
      });
  };

  const createCroppedImage = (imageSrc, croppedAreaPixels) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const size = Math.min(croppedAreaPixels.width, croppedAreaPixels.height);
        canvas.width = size;
        canvas.height = size;

        // Optional: For circular crop, add clipping if needed.
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
      // Set the cropped image as the new profile image
      setProfileImage(croppedImageUrl);
      setShowCropper(false); // Close the cropper modal
    } catch (error) {
      console.error("Error cropping image:", error);
    }
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setProfileImage(file);
  //   };
  //   reader.readAsDataURL(file);
  // };
  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setSelectedFileName(file.name); 
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setProfileImage(file);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result); // Set the preview image source
        setShowCropper(true);       // Open cropper modal
      };
      reader.readAsDataURL(file);
    }
  };



  return (
    <div className="teacher_profile">
      <div className="teacher_background_section teacher_top_section"  >
        <button onClick={handleback} className="teacher_back_button">
          &lt;
        </button>
        <button onClick={handleLogout} className="teacher_logout_button">
          Logout
        </button>
      </div>
      <div className="teacher_background_section teacher_bottom_section"></div>
      <Container className="teacher_content_container">
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="teacher_profile_card" >
              <div className="teacher_profile_edit">
                <button onClick={isEditing ? handleSave : handleEditToggle}>
                  {isEditing ? "Save" : "Edit"}
                </button>
                {/* <RiEdit2Fill className="teacher_profile_edit_icon" /> */}
              </div>
              <Form className="teacher_profile_form">
                <Row>
                  <Col md={6}>
                    <div className="teacher_profile_group">
                      <label htmlFor="first_name">First Name</label>
                      <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        readOnly={!isEditing}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="teacher_profile_group">
                      <label htmlFor="email">Email Id</label>
                      <input
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        readOnly={!isEditing}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <div className="teacher_profile_group">
                      <label htmlFor="last_name">Last Name</label>
                      <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        readOnly={!isEditing}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="teacher_profile_group">
                      <label htmlFor="phn_no">Phone Number</label>
                      <input
                        type="text"
                        id="phn_no"
                        name="phn_no"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        readOnly={!isEditing}
                      />
                    </div>
                  </Col>
                </Row>
                {/* <Row>
                  <Col md={6}>
                    <div className="teacher_profile_group">
                      <label htmlFor="boardofeducation">
                        Board Of Education
                      </label>
                      <input
                        type="text"
                        id="boardofeducation"
                        name="boardofeducation"
                        readOnly
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="teacher_profile_group">
                      <label htmlFor="phn_no">Phone Number</label>
                      <input
                        
                        type="text"
                        id="phn_no"
                        name="phn_no"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        readOnly={!isEditing}   
                      />
                    </div>
                  </Col>
                </Row> */}
              </Form>
            </div>
          </Col>
        </Row>
        {showCropper && (
          <div className="cropper-container">
            <div className="cropper-wrapper">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1} // For square crop (which can then be clipped to a circle if desired)
                cropSize={{ width: 150, height: 150 }} // Use same dimensions as your profile image container
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(croppedArea, croppedAreaPixels) => setCroppedAreaPixels(croppedAreaPixels)}
              />
              {/* Optional: Overlay for a circular guide */}
              <div className="cropper-overlay"></div>
            </div>
            <Button className="crop-save-btn" onClick={getCroppedImage}>
              Crop & Save
            </Button>
          </div>
        )}

      </Container>
      {/* <div className="teacher_profile_image_container">
        <img src='' alt="Profile" className="profile_image" />
        {isEditing && (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="teacher_profile_pic"
          />
        )}
      </div> */}
      {/* <div className="teacher_profile_image_container">
  <img src='' alt="Profile" className="profile_image" />
  {isEditing && (
    <div className="input_container">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="teacher_profile_pic"
      />
      <span className="file_name">{selectedFileName}</span>
    </div>
  )}
</div> */}
      <div className="teacher_profile_image_container">
        <img src={profileImage || amritha} alt="Profile" className="profile_image" />
        {isEditing && (
          <div className="input_container_pic">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="teacher_profile_pic"
            />
            {/* {selectedFileName && (
        <span className="file_name">{selectedFileName}</span>
      )} */}
          </div>
        )}
      </div>

    </div>
  );
}

export default TeacherProfile;
