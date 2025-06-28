import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlinePentagon } from "react-icons/md";
import { TbPentagonFilled } from "react-icons/tb";
import { FaRegSquareFull } from "react-icons/fa6";
import { FaSquareFull } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import { RiTriangleLine } from "react-icons/ri";
import { BsFillTriangleFill } from "react-icons/bs";
import "./Newsidebar.css"
import etomelogo from "../../../assets/etomelogo.png" 
import { NavLink } from "react-router-dom";
import axios from "axios";
import { adminteacherinfo } from "../../../Redux/Actions/AdminTeacherInfoAction";

function Newsidebar({ setActiveItemLabel }) {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("");
  const teacher = useSelector(state => state.teacherinfo);
  const teacher_token = teacher.teacherinfo?.teacher_token;
  const class_teacher_token = teacher.teacherinfo?.class_teacher_token;
  const admininfo = useSelector(state => state.admininfo);
  const admin_id = admininfo?.admininfo?.admin_id;
  const APIURL = useSelector(state => state.APIURL.url);
  const dispatch = useDispatch();
  const activeRoutesMapping = {
    "/admindashboard": ["/admindashboard", "/admindashboard/overview", "/admindashboard/stats"
    ],
    "/institutionadding": ["/institutionadding", "/facultyview", "/facultyadding", "/classadding", "/curriculumadding", "/classview"
    ],
    "/adminlokanavbar": ["/adminlokanavbar", "/adminlokatextbook", "/adminlokalibary"
    ],
    "/aarnanavbar": ["/aarnanavbar", "/questionview", "/questionadding", "/seatview", "/seatassigning", "/evaluationview", "/evaluationscheduling"
    ],
    "/teacherhome": ["/teacherhome"
    ],
    "/teacherstudentdashboard": ["/teacherstudentdashboard", "/teacherstudentview", "/teachertimetable", "/teacherstudentadd",
    ],
    "/teachersubject": ["/teachersubject", "/teacherclassview", "/teacherassignment", "/teacherassignmentadding", "/teacherrefrencelist"
      , "/teacherreferenceadd", "/teachertestlist", "/teachertestadd", "/teachermcqlist", "/teachermcqadd",
    ],
    "/teacherexamination": ["/teacherexamination", "/teacherquestionview"
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
  useEffect(() => {
    const currentPath = location.pathname;
    let foundParent = "";
    itemsToDisplay.forEach(item => {
      if (currentPath.includes(item.path)) {
        foundParent = item.label; // Now capturing label instead of path
        setActiveItemLabel(foundParent); // Update the active item label in the parent state
      }
    });
    // setActiveItem(foundParent);
  }, [setActiveItemLabel]);
  // Items for class teachers specifically
  const classTeacherItems = [
    { path: "/teacherhome", icon: <MdOutlinePentagon />, activeIcon: <TbPentagonFilled />, label: "Home" },
    { path: "/teacherstudentdashboard", icon: <FaRegSquareFull />, activeIcon: <FaSquareFull />, label: "My Class" },
    { path: "/teachersubject", icon: <FaRegCircle />, activeIcon: <FaCircle />, label: "Subjects" },
    { path: "/teacherexamination", icon: <RiTriangleLine />, activeIcon: <BsFillTriangleFill />, label: "Aarna" },
    // { path: "/settings", icon: <SlSettings />, label: "Settings" }
  ];
  // Items for general teachers
  const teacherItems = [
    { path: "/teacherhome", icon: <MdOutlinePentagon />, activeIcon: <TbPentagonFilled />, label: "Home" },
    { path: "/teachersubject", icon: <FaRegCircle />, activeIcon: <FaCircle />, label: "Subjects" },
    { path: "/teacherexamination", icon: <RiTriangleLine />, activeIcon: <BsFillTriangleFill />, label: "Aarna" },
    // { path: "/settings", icon: <SlSettings />, label: "Settings" }
  ];
  // Items for other roles (admins and others)
  const otherItems = [
    { path: "/admindashboard", icon: <MdOutlinePentagon />, activeIcon: <TbPentagonFilled />, label: "Home" },
    { path: "/institutionadding", icon: <FaRegSquareFull />, activeIcon: <FaSquareFull />, label: "Institution" },
    { path: "/adminlokanavbar", icon: <FaRegCircle />, activeIcon: <FaCircle />, label: "Loka" },
    { path: "/aarnanavbar", icon: <RiTriangleLine />, activeIcon: <BsFillTriangleFill />, label: "Aarna" },
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

  // Function to fetch teacher details
  const fetchTeacherDetails = async () => {
    try {
      const response = await axios.get(`${APIURL}/api/teacherdetails/${admin_id}`);
      if (response.data && Array.isArray(response.data)) {
        dispatch(adminteacherinfo(response.data));
      } else {
        console.warn("Unexpected response structure", response.data);
      }
    } catch (error) {
      console.error("Error fetching faculty data:", error);
    }
  };

  return (
    <div className="newsidenav_fstdiv">
      <div  className="newsidebar_header">
        <img src={etomelogo} alt="Logo" style={{ width: "70px", height: "28px" }} />
      </div>
      <Row style={{ display: "flex",  height: "60%", justifyContent: "space-between", marginTop: "50px" }} >
        {itemsToDisplay.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            onClick={() => {
              // Clear loka tab state when going to Loka
              if (item.path === "/adminlokanavbar") {
                localStorage.removeItem("currentTab");
              }

              // Clear institution tab state when going to Institution
              if (item.path === "/institutionadding") {
                localStorage.removeItem("currentTab");
              }
              
              // Fetch teacher details when clicking on Aarna navbar
              if (item.path === "/aarnanavbar") {
                fetchTeacherDetails();
              }
            }}
            style={{ textDecoration: "none", color: "inherit" }}> 
            <Col className={`newsidebar_menu_item_col ${activeItem.startsWith(item.path) ? "active" : ""}`}>
              <div className="newsidebar_icon_container_div">
                <span className={`newsidebar_icon_img ${activeItem === item.path ? "active_icon" : ""}`}>
                  {activeItem === item.path && item.activeIcon ? item.activeIcon : item.icon}
                </span>
                <span className="newsidebar_icon-text">{item.label}</span>
              </div>
            </Col>
          </Link>
        ))}
      </Row>
    </div>
  );
}
export default Newsidebar;