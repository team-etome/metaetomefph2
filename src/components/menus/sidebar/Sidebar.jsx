import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { GoHome } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";
import { PiBook } from "react-icons/pi";
import { SlNote, SlSettings } from "react-icons/sl";
import { TbScanEye } from "react-icons/tb";
import "../sidebar/sidebar.css";
import etomelogo from "../../../assets/etomelogo.png";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("");

  const teacher = useSelector(state => state.teacherinfo);
  const teacher_token = teacher.teacherinfo?.teacher_token;
  const class_teacher_token = teacher.teacherinfo?.class_teacher_token;


  const activeRoutesMapping = {
    // "/teacherhome": ["/teacherhome","/teacherhome/dashboard","/teacherhome/profile","/teacherhome/otherchild"
    // ],
    // "/teachersubject": ["/teachersubject","/teachersubject/details","/teachersubject/edit","/teachersubject/childpage"
    // ],
    // "/teacherexamination": ["/teacherexamination","/teacherexamination/results","/teacherexamination/analysis","/teacherexamination/childpage"
    // ],
    // "/settings": ["/settings","/settings/account","/settings/preferences","/settings/childpage"
    // ],



    "/admindashboard": ["/admindashboard","/admindashboard/overview","/admindashboard/stats"
    ],
    "/institutionadding": ["/institutionadding","/facultyview","/facultyadding","/classadding","/curriculumadding","/classview"
    ],
    "/adminlokanavbar": ["/adminlokanavbar","/adminlokatextbook","/adminlokalibary"
    ],
    "/aarnanavbar": ["/aarnanavbar","/questionview","/questionadding","/seatview","/seatassigning","/evaluationview","/evaluationscheduling"
    ],




    "/teacherhome": ["/teacherhome"
    ],
    "/teacherstudentdashboard": ["/teacherstudentdashboard","/teacherstudentview","/teachertimetable","/teacherstudentadd",
    ],
    "/teachersubject": ["/teachersubject","/teacherclassview","/teacherassignment","/teacherassignmentadding","/teacherrefrencelist"
      ,"/teacherreferenceadd","/teachertestlist","/teachertestadd","/teachermcqlist","/teachermcqadd",
    ],
    "/teacherexamination": ["/teacherexamination","/teacherquestionview"
    ]
  };

  useEffect(() => {
    const currentPath = location.pathname;
    let foundParent = "";
    Object.keys(activeRoutesMapping).forEach((parent) => {
      // If the current path exactly matches or starts with one of the defined child paths,
      // we consider that parent as active.
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

  // useEffect(() => {
  //   setActiveItem(location.pathname);  Set the active path based on the URL
  // }, [location.pathname]);

  // useEffect(() => {
  //   const routes = {
  //     "/teacherhome": "home",
  //     "/teachersubject": "subjects",
  //     "/teacherexamination": "aarna",
  //     // "/settings": "settings",
  //     // Add specific routes for class teachers if needed
  //   };

  //   const found = Object.keys(routes).find(route => location.pathname.includes(route));
  //   setActiveItem(routes[found] || null);
  // }, [location.pathname]);

  // Items for class teachers specifically
  const classTeacherItems = [
    { path: "/teacherhome", icon: <GoHome />, label: "Home" },
    { path: "/teacherstudentdashboard", icon: <RxDashboard />, label: "My Class" },
    { path: "/teachersubject", icon: <PiBook />, label: "Subjects" },
    { path: "/teacherexamination", icon: <SlNote />, label: "Aarna" },
    // { path: "/settings", icon: <SlSettings />, label: "Settings" }
  ];

  // Items for general teachers
  const teacherItems = [
    { path: "/teacherhome", icon: <GoHome />, label: "Home" },
    { path: "/teachersubject", icon: <PiBook />, label: "Subjects" },
    { path: "/teacherexamination", icon: <SlNote />, label: "Aarna" },
    // { path: "/settings", icon: <SlSettings />, label: "Settings" }
  ];

  // Items for other roles (admins and others)
  const otherItems = [
    { path: "/admindashboard", icon: <GoHome />, label: "Home" },
    { path: "/institutionadding", icon: <RxDashboard />, label: "Institution" },
    { path: "/adminlokanavbar", icon: <PiBook />, label: "Loka" },
    { path: "/aarnanavbar", icon: <SlNote />, label: "Aarna" },
    // { path: "/eyora", icon: <TbScanEye />, label: "Eyora" },
    // { path: "/settings", icon: <SlSettings />, label: "Settings" }
  ];

  // Determine which items to display based on the token presence
  let itemsToDisplay = otherItems;
  if (class_teacher_token) {
    itemsToDisplay = classTeacherItems;
  } else if (teacher_token) {
    itemsToDisplay = teacherItems;
  }

  return (
    <div className="sidenav_fstdiv">
      <div className="sidebar_header">
        <img src={etomelogo} alt="Logo" style={{ width: "110px", height: "40px", display: "block" }} />
      </div>
      <Row style={{ display: "flex", flexDirection: "column", height: "60%", width: "112px", justifyContent: "space-between", marginTop: "10vh" }}>
        {itemsToDisplay.map((item, index) => (
          <Link key={index} to={item.path} style={{ textDecoration: "none", color: "inherit" }}>
            {/* <Col className={`menu_item_col ${activeItem === item.label.toLowerCase() ? "active" : ""}`}> */}
            <Col className={`menu_item_col ${activeItem.startsWith(item.path) ? "active" : ""}`}>
              <div className="icon_container_div">
                {/* <span className="icon_img "> {item.icon}</span> */}
                <span className={`icon_img ${activeItem === item.path ? "active_icon" : ""}`}>{item.icon}</span>
                <span className="icon-text">{item.label}</span>
              </div>
            </Col>
          </Link>
        ))}
      </Row>
    </div>
  );
}

export default Sidebar;
