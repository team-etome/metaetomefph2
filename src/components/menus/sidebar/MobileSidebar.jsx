
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
import etome from "../../../assets/etomelogo.png";
import { FiBell } from "react-icons/fi";
import { useSelector } from "react-redux";

function MobileSidebar({ show, onClose }) {
  const [activeItem, setActiveItem] = useState(null);


  const location = useLocation();
  const navigate = useNavigate();

  const teacher = useSelector((state) => state.teacherinfo);
  const admin = useSelector((state) => state.admininfo);
  console.log(admin, "admin")

  console.log(teacher, "teacherrrrrrrrr data")
  const teacher_token = teacher.teacherinfo?.teacher_token;
  const class_teacher_token = teacher.teacherinfo?.class_teacher_token;
  const propicimage = teacher.teacherinfo?.image;
  const adminimage = admin.admininfo?.logo
  console.log(propicimage, "profilepicccc")


  console.log(class_teacher_token, "teacher token")



  const classTeacherItems = [
    { path: "/teacherhome", icon: <GoHome />, label: "Home" },
    { path: "/teacherstudentdashboard", icon: <RxDashboard />, label: "My Class" },
    { path: "/teachersubject", icon: <PiBook />, label: "Subjects" },
    { path: "/teacherexamination", icon: <SlNote />, label: "Aarna" },
    // { path: "/settings", icon: <SlSettings />, label: "Settings" },
  ];

  const teacherItems = [
    { path: "/teacherhome", icon: <GoHome />, label: "Home" },
    { path: "/teachersubject", icon: <PiBook />, label: "Subjects" },
    { path: "/teacherexamination", icon: <SlNote />, label: "Aarna" },
    // { path: "/settings", icon: <SlSettings />, label: "Settings" },
  ];

  const otherItems = [
    { path: "/admindashboard", icon: <GoHome />, label: "Home" },
    { path: "/institutionadding", icon: <RxDashboard />, label: "Institution" },
    { path: "/adminlokanavbar", icon: <PiBook />, label: "Loka" },
    { path: "/aarnanavbar", icon: <SlNote />, label: "Aarna" },
    // { path: "/settings", icon: <SlSettings />, label: "Settings" },
  ];


  let itemsToDisplay = otherItems;
  if (class_teacher_token) {
    itemsToDisplay = classTeacherItems;
  } else if (teacher_token) {
    itemsToDisplay = teacherItems;
  }


  // useEffect(() => {
  //   const currentPath = location.pathname;
  //   const active = itemsToDisplay.find((item) => currentPath.includes(item.path));
  //   setActiveItem(active ? active.label.toLowerCase() : null);
  // }, [location.pathname, itemsToDisplay]);

  // Define activeRoutesMapping for mobile (same as your desktop mapping)
  const activeRoutesMapping = {
    "/admindashboard": ["/admindashboard", "/admindashboard/overview", "/admindashboard/stats"],
    "/institutionadding": ["/institutionadding", "/facultyview", "/facultyadding", "/classadding", "/curriculumadding"],
    "/adminlokanavbar": ["/adminlokanavbar", "/adminlokatextbook", "/adminlokalibary"],
    "/aarnanavbar": ["/aarnanavbar", "/questionview", "/questionadding", "/seatview", "/seatassigning", "/evaluationview", "/evaluationscheduling"],
    "/teacherhome": ["/teacherhome"],
    "/teacherstudentdashboard": ["/teacherstudentdashboard", "/teacherstudentview", "/teachertimetable", "/teacherstudentadd"],
    "/teachersubject": ["/teachersubject", "/teacherclassview", "/teacherassignment", "/teacherassignmentadding", "/teacherrefrencelist", "/teacherreferenceadd", "/teachertestlist", "/teachertestadd", "/teachermcqlist", "/teachermcqadd"],
    "/teacherexamination": ["/teacherexamination", "/teacherquestionview"],
    "/settings": ["/settings"],
  };

  // useEffect to compute activeItem (active parent's path) based on current URL
  useEffect(() => {
    const currentPath = location.pathname;
    let foundParent = "";
    Object.keys(activeRoutesMapping).forEach((parent) => {
      const childPaths = activeRoutesMapping[parent];
      if (
        childPaths.some(
          (childPath) =>
            currentPath === childPath || currentPath.startsWith(childPath)
        )
      ) {
        foundParent = parent;
      }
    });
    setActiveItem(foundParent);
  }, [location.pathname]);

  const handleProfileNavigate = () => {
    const profilePath = (teacher_token || class_teacher_token)
      ? "/teacherprofile"
      : "/adminprofile";
    navigate(profilePath);
  };



  // useEffect(() => {
  //   const path = location.pathname;
  //   const routes = ["admindashboard", "eyora", "settings"];
  //   if (teacher_token) {
  //     routes.push(
  //       "teacherstudentdashboard",
  //       "teachersubject",
  //       "teacherexamination"
  //     ); 
  //   }
  //   const found = routes.find((route) => path.includes(route));
  //   setActiveItem(found || null);
  // }, [location.pathname, teacher_token]);

  // const handleLokaClick = () => {
  //   console.log("enteredsddddd");
  //   localStorage.setItem("activeTab", activeItem);
  //   navigate("/adminlokanavbar");
  // };
  // const handleMenuItemClick = (item) => {
  //   setActiveItem(item);
  // };

  // const handleAdminProfileNavigate = () => {
  //   navigate("/adminprofile");
  // };

  // const handleTeacherProfileNavigate = () => {
  //   navigate("/teacherprofile");
  // };
  // useEffect(() => {
  //   const currentPath = location.pathname;
  //   const active = itemsToDisplay.find((item) => currentPath.includes(item.path));
  //   setActiveItem(active ? active.label.toLowerCase() : null);
  // }, [location.pathname, itemsToDisplay]);

  // const handleNavigate = () => {
  //   const profilePath = teacher_token ? "/teacherprofile":"/adminprofile" ;
  //   navigate(profilePath);
  // };


  return (
    <div className={`mobile_sidebar ${show ? "show" : ""}`}>
      <div className="mobile_sidebar_header" >
        <MdOutlineClose onClick={onClose} style={{ width: "30px", height: "30px" }} />
      </div>
      <Row
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "60%",
          alignItems: "center",
          marginTop: "10%",
        }}
      >
        {itemsToDisplay.map((item, index) => (
          <Col
            key={index}
            className={`mob_menu_item_col ${activeItem === item.path ? "active" : ""}`}
          >
            <Link to={item.path}>
              <div className="mob_icon_container_div">
                {item.icon}
                <span className="mob_icon_text">{item.label}</span>
              </div>
            </Link>
          </Col>
        ))}
        <div className="mob_menu_item_col" onClick={handleProfileNavigate}>
          <div className="mob_pofile_container_div">
            <img
              src={propicimage || adminimage || ""}
              alt="Profile"
              style={{ width: "46px", height: "46px", borderRadius: "50%" }}
            />
            <span className="mob_profile_text">Profile</span>
          </div>
        </div>
      </Row>
    </div>
  );
}


export default MobileSidebar;
