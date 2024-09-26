// import React, { useState, useEffect } from "react";
// import "../sidebar/sidebar.css";
// import { Col, Row } from "react-bootstrap";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { GoHome } from "react-icons/go";
// import { RxDashboard } from "react-icons/rx";
// import { PiBook } from "react-icons/pi";
// import { TbScanEye } from "react-icons/tb";
// import { SlNote, SlSettings } from "react-icons/sl";
// import { MdOutlineClose } from "react-icons/md";
// import amritha from "../../../assets/amritha.png";
// import { FiBell } from "react-icons/fi";
// import { useSelector } from "react-redux";

// function MobileSidebar({ show, onClose }) {
//   const [activeItem, setActiveItem] = useState(null);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const teacher = useSelector((state) => state.teacherinfo);
//   const teacher_token = teacher.teacherinfo?.teacher_token;

//   useEffect(() => {
//     const path = location.pathname;
//     const routes = ["admindashboard", "eyora", "settings"];
//     if (teacher_token) {
//       routes.push(
//         "teacherstudentdashboard",
//         "teachersubject",
//         "teacherexamination"
//       ); // Routes visible only to teachers
//     }
//     const found = routes.find((route) => path.includes(route));
//     setActiveItem(found || null);
//   }, [location.pathname, teacher_token]);

//   const handleLokaClick = () => {
//     console.log("enteredsddddd");
//     localStorage.setItem("activeTab", activeItem);
//     navigate("/adminlokanavbar");
//   };

//   const handlenavigate = () => {
//     navigate("/teacherprofile");
//   };
//   const handleteachernavigate = () => {
//     navigate("/adminprofile");
//   };
//   return (
//     <div className={`mobile_sidebar ${show ? "show" : ""}`}>
//       <div className="mobile_sidebar_header">
//         <MdOutlineClose
//           onClick={onClose}
//           style={{ width: "30px", height: "30px" }}
//         />
//         <FiBell style={{ width: "20px", height: "20px", marginTop: "5px" }} />
//       </div>
//       <Row
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           height: "60%",
//           width: "100%",
//           alignItems: "center",
//           alignContent: "center",
//           marginTop: "15%",
//         }}
//       >
//         {teacher_token ? (
//           <>
//             <Col
//               className={`mob_menu_item_col ${
//                 activeItem === "teacherhome" ? "active" : ""
//               }`}
//               onClick={() => handleMenuItemClick("teacherhome")}
//             >
//               <Link to="/teacherhome">
//                 <div className="mob_icon_container_div">
//                   <GoHome className="mob_icon_img" />
//                   <span className="mob_icon_text">Home</span>
//                 </div>
//               </Link>
//             </Col>
//             <Col
//               className={`mob_menu_item_col ${
//                 activeItem === "teacherstudentdashboard" ? "active" : ""
//               }`}
//               onClick={() => handleMenuItemClick("teacherstudentdashboard")}
//             >
//               <Link to="/teacherstudentdashboard">
//                 <div className="mob_icon_container_div">
//                   <RxDashboard className="mob_icon_img" />
//                   <span className="mob_icon_text">My Class</span>
//                 </div>
//               </Link>
//             </Col>
//             <Col
//               className={`mob_menu_item_col ${
//                 activeItem === "teachersubject" ? "active" : ""
//               }`}
//               onClick={() => handleMenuItemClick("teachersubject")}
//             >
//               <Link to="/teachersubject">
//                 <div className="mob_icon_container_div">
//                   <PiBook className="mob_icon_img" />
//                   <span className="mob_icon_text">Subjects</span>
//                 </div>
//               </Link>
//             </Col>
//             <Col
//               className={`mob_menu_item_col ${
//                 activeItem === "teacherexamination" ? "active" : ""
//               }`}
//               onClick={() => handleMenuItemClick("teacherexamination")}
//             >
//               <Link to="/teacherexamination">
//                 <div className="mob_icon_container_div">
//                   <SlNote className="mob_icon_img" />
//                   <span className="mob_icon_text">Aarna</span>
//                 </div>
//               </Link>
//             </Col>
//             <Col
//               className={`mob_menu_item_col ${
//                 activeItem === "settings" ? "active" : ""
//               }`}
//               onClick={() => handleMenuItemClick("settings")}
//             >
//               <Link to="">
//                 <div className="mob_icon_container_div">
//                   <SlSettings className="mob_icon_img" />
//                   <span className="mob_icon_text">Settings</span>
//                 </div>
//               </Link>
//             </Col>
            
//           </>
          
//         ) : (
//           <>
//             <Col
//               className={`mob_menu_item_col ${
//                 activeItem === "admindashboard" ? "active" : ""
//               }`}
//               onClick={() => handleMenuItemClick("admindashboard")}
//             >
//               <Link to="/admindashboard">
//                 <div className="mob_icon_container_div">
//                   <GoHome className="mob_icon_img" />
//                   <span className="mob_icon_text">Home</span>
//                 </div>
//               </Link>
//             </Col>
//             <Col
//               className={`mob_menu_item_col ${
//                 activeItem === "institutionadding" ? "active" : ""
//               }`}
//               onClick={() => handleMenuItemClick("institutionadding")}
//             >
//               <Link to="/institutionadding">
//                 <div className="mob_icon_container_div">
//                   <RxDashboard className="mob_icon_img" />
//                   <span className="mob_icon_text">Institution</span>
//                 </div>
//               </Link>
//             </Col>
//             <Col
//               className={`mob_menu_item_col ${
//                 activeItem === "adminlokanavbar" ? "active" : ""
//               }`}
//               onClick={handleLokaClick}
//             >
//               <Link to="/adminlokanavbar">
//                 <div className="mob_icon_container_div">
//                   <PiBook className="mob_icon_img" />
//                   <span className="mob_icon_text">Loka</span>
//                 </div>
//               </Link>
//             </Col>
//             <Col
//               className={`mob_menu_item_col ${
//                 activeItem === "aarnanavbar" ? "active" : ""
//               }`}
//               onClick={() => handleMenuItemClick("aarnanavbar")}
//             >
//               <Link to="/aarnanavbar">
//                 <div className="mob_icon_container_div">
//                   <SlNote className="mob_icon_img" />
//                   <span className="mob_icon_text">Aarna</span>
//                 </div>
//               </Link>
//             </Col>
//             <Col
//               className={`mob_menu_item_col ${
//                 activeItem === "eyora" ? "active" : ""
//               }`}
//               onClick={() => handleMenuItemClick("eyora")}
//             >
//               <div className="mob_icon_container_div">
//                 <TbScanEye className="mob_icon_img" />
//                 <span className="mob_icon_text">Eyora</span>
//               </div>
//             </Col>
//             <Col
//               className={`mob_menu_item_col ${
//                 activeItem === "settings" ? "active" : ""
//               }`}
//               onClick={() => handleMenuItemClick("settings")}
//             >
//               <div className="mob_icon_container_div">
//                 <SlSettings className="mob_icon_img" />
//                 <span className="mob_icon_text">Settings</span>
//               </div>
//             </Col>
//           </>
//         )}

//       </Row>
//       <div
//         className={` ${activeItem === "profile" ? "active" : ""}`}
//         onClick={() => handleMenuItemClick("profile")}
//         style={{
//           width: "100%",
//           height: "100px",
//           paddingTop: "10px",
//           display: "flex",
//           justifyContent: "flex-start",
//           paddingLeft: "30px",
//         }}
//       >
//         <div
//           onClick={handlenavigate}
//           style={{
//             cursor: "pointer",
//           }}
//           className="mob_pofile_container_div"
//         >
//           <img
//             src=""
//             alt="Profile"
//             style={{
//               width: "46px",
//               height: "46px",
//               borderRadius: "50%",
//             }}
//           />
//           <span className="mob_profile_text">Profile</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MobileSidebar;

import React, { useState, useEffect } from "react";
import "../sidebar/sidebar.css";
import { Col, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";
import { PiBook } from "react-icons/pi";
import { TbScanEye } from "react-icons/tb";
import { SlNote, SlSettings } from "react-icons/sl";
import { MdOutlineClose } from "react-icons/md";
import amritha from "../../../assets/amritha.png";
import { FiBell } from "react-icons/fi";
import { useSelector } from "react-redux";

function MobileSidebar({ show, onClose }) {
  const [activeItem, setActiveItem] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const teacher = useSelector((state) => state.teacherinfo);
  const teacher_token = teacher.teacherinfo?.teacher_token;

  useEffect(() => {
    const path = location.pathname;
    const routes = ["admindashboard", "eyora", "settings"];
    if (teacher_token) {
      routes.push(
        "teacherstudentdashboard",
        "teachersubject",
        "teacherexamination"
      ); 
    }
    const found = routes.find((route) => path.includes(route));
    setActiveItem(found || null);
  }, [location.pathname, teacher_token]);

  const handleLokaClick = () => {
    console.log("enteredsddddd");
    localStorage.setItem("activeTab", activeItem);
    navigate("/adminlokanavbar");
  };

  const handleAdminProfileNavigate = () => {
    navigate("/adminprofile");
  };

  const handleTeacherProfileNavigate = () => {
    navigate("/teacherprofile");
  };

  return (
    <div className={`mobile_sidebar ${show ? "show" : ""}`}>
      <div className="mobile_sidebar_header">
        <MdOutlineClose
          onClick={onClose}
          style={{ width: "30px", height: "30px" }}
        />
        <FiBell style={{ width: "20px", height: "20px", marginTop: "5px" }} />
      </div>
      <Row
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "60%",
          width: "100%",
          alignItems: "center",
          alignContent: "center",
          marginTop: "15%",
        }}
      >
        {teacher_token ? (
          <>
            <Col
              className={`mob_menu_item_col ${
                activeItem === "teacherhome" ? "active" : ""
              }`}
              onClick={() => handleMenuItemClick("teacherhome")}
            >
              <Link to="/teacherhome">
                <div className="mob_icon_container_div">
                  <GoHome className="mob_icon_img" />
                  <span className="mob_icon_text">Home</span>
                </div>
              </Link>
            </Col>
            <Col
              className={`mob_menu_item_col ${
                activeItem === "teacherstudentdashboard" ? "active" : ""
              }`}
              onClick={() => handleMenuItemClick("teacherstudentdashboard")}
            >
              <Link to="/teacherstudentdashboard">
                <div className="mob_icon_container_div">
                  <RxDashboard className="mob_icon_img" />
                  <span className="mob_icon_text">My Class</span>
                </div>
              </Link>
            </Col>
            <Col
              className={`mob_menu_item_col ${
                activeItem === "teachersubject" ? "active" : ""
              }`}
              onClick={() => handleMenuItemClick("teachersubject")}
            >
              <Link to="/teachersubject">
                <div className="mob_icon_container_div">
                  <PiBook className="mob_icon_img" />
                  <span className="mob_icon_text">Subjects</span>
                </div>
              </Link>
            </Col>
            <Col
              className={`mob_menu_item_col ${
                activeItem === "teacherexamination" ? "active" : ""
              }`}
              onClick={() => handleMenuItemClick("teacherexamination")}
            >
              <Link to="/teacherexamination">
                <div className="mob_icon_container_div">
                  <SlNote className="mob_icon_img" />
                  <span className="mob_icon_text">Aarna</span>
                </div>
              </Link>
            </Col>
            <Col
              className={`mob_menu_item_col ${
                activeItem === "settings" ? "active" : ""
              }`}
              onClick={() => handleMenuItemClick("settings")}
            >
              <Link to="">
                <div className="mob_icon_container_div">
                  <SlSettings className="mob_icon_img" />
                  <span className="mob_icon_text">Settings</span>
                </div>
              </Link>
            </Col>
            <div
              className={`mob_menu_item_col ${
                activeItem === "teacherprofile" ? "active" : ""
              }`}
              onClick={() => handleMenuItemClick("teacherprofile")}
              // style={{
              //   width: "100%",
              //   height: "100px",
              //   paddingTop: "10px",
              //   display: "flex",
              //   justifyContent: "flex-start",
              //   paddingLeft: "30px",
              // }}
            >
              <div
                onClick={handleTeacherProfileNavigate}
                style={{
                  cursor: "pointer",
                }}
                className="mob_pofile_container_div"
              >
                <img
                  src=""
                  alt="Profile"
                  style={{
                    width: "46px",
                    height: "46px",
                    borderRadius: "50%",
                  }}
                />
                <span className="mob_profile_text">Profile</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <Col
              className={`mob_menu_item_col ${
                activeItem === "admindashboard" ? "active" : ""
              }`}
              onClick={() => handleMenuItemClick("admindashboard")}
            >
              <Link to="/admindashboard">
                <div className="mob_icon_container_div">
                  <GoHome className="mob_icon_img" />
                  <span className="mob_icon_text">Home</span>
                </div>
              </Link>
            </Col>
            <Col
              className={`mob_menu_item_col ${
                activeItem === "institutionadding" ? "active" : ""
              }`}
              onClick={() => handleMenuItemClick("institutionadding")}
            >
              <Link to="/institutionadding">
                <div className="mob_icon_container_div">
                  <RxDashboard className="mob_icon_img" />
                  <span className="mob_icon_text">Institution</span>
                </div>
              </Link>
            </Col>
            <Col
              className={`mob_menu_item_col ${
                activeItem === "adminlokanavbar" ? "active" : ""
              }`}
              onClick={handleLokaClick}
            >
              <Link to="/adminlokanavbar">
                <div className="mob_icon_container_div">
                  <PiBook className="mob_icon_img" />
                  <span className="mob_icon_text">Loka</span>
                </div>
              </Link>
            </Col>
            <Col
              className={`mob_menu_item_col ${
                activeItem === "aarnanavbar" ? "active" : ""
              }`}
              onClick={() => handleMenuItemClick("aarnanavbar")}
            >
              <Link to="/aarnanavbar">
                <div className="mob_icon_container_div">
                  <SlNote className="mob_icon_img" />
                  <span className="mob_icon_text">Aarna</span>
                </div>
              </Link>
            </Col>
            <Col
              className={`mob_menu_item_col ${
                activeItem === "eyora" ? "active" : ""
              }`}
              onClick={() => handleMenuItemClick("eyora")}
            >
              <div className="mob_icon_container_div">
                <TbScanEye className="mob_icon_img" />
                <span className="mob_icon_text">Eyora</span>
              </div>
            </Col>
            <Col
              className={`mob_menu_item_col ${
                activeItem === "settings" ? "active" : ""
              }`}
              onClick={() => handleMenuItemClick("settings")}
            >
              <div className="mob_icon_container_div">
                <SlSettings className="mob_icon_img" />
                <span className="mob_icon_text">Settings</span>
              </div>
            </Col>
            <div
              className={`mob_menu_item_col ${
                activeItem === "adminprofile" ? "active" : ""
              }`}
              onClick={() => handleMenuItemClick("adminprofile")}
              // style={{
              //   width: "100%",
              //   height: "100px",
              //   paddingTop: "10px",
              //   display: "flex",
              //   justifyContent: "flex-start",
              //   paddingLeft: "30px",
              //   border:'1px solid red'
              // }}
            >
              <div
                onClick={handleAdminProfileNavigate}
                style={{
                  cursor: "pointer",
                }}
                className="mob_pofile_container_div"
              >
                <img
                  src=""
                  alt="Profile"
                  style={{
                    width: "46px",
                    height: "46px",
                    borderRadius: "50%",
                  }}
                />
                <span className="mob_profile_text">Profile</span>
              </div>
            </div>
          </>
        )}
      </Row>
    </div>
  );
}

export default MobileSidebar;
