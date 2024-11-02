import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../adminclassdashboard/adminclassdashboard.css";
import { IoIosAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import amritha from "../../../assets/amritha.png";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { adminallclassinfo } from "../../../Redux/Actions/AdminAllClassInfoAction";

function AdminClassdashboard() {
  const [isActive, setIsActive] = useState(false);
  const [classDetails, setClassDetails] = useState([]);
  const admininfo = useSelector((state) => state.admininfo);
  const APIURL = useSelector((state) => state.APIURL.url);
  const admin_id = admininfo ? admininfo.admininfo?.admin_id : null;

  const [selected, setSelected] = useState(null);
  // const [isVisible, setIsVisible] = useState(false);
  // const [inVisible, setInVisible] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  console.log(classDetails, "detailsssssss");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const filteredClassDetails =
    selected === null
      ? classDetails
      : classDetails.filter((item) => item.class_name === String(selected));

  console.log(filteredClassDetails, "filtered classssss");

  const toggleClassSelection = (index) => {
    // Toggle the selection
    setSelected((prevSelected) =>
      prevSelected === index + 1 ? null : index + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsActive((prevState) => !prevState);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleButtonClick = () => {
    navigate("/classadding");
  };

  const handleclick = (classdata) => {
    navigate("/classview", { state: { class: classdata } });
  };

  useEffect(() => {
    const fetchclass = async () => {
      try {
        const response = await axios.get(
          `${APIURL}/api/addClassname/${admin_id}`
        );
        setClassDetails(response.data);
        dispatch(adminallclassinfo(response.data));
      } catch (error) {
        console.error("Failed to fetch class data");
      }
    };

    fetchclass();
  }, [APIURL]);

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "104.5%" }}>
      {/* <div>
      <div className="arrow-button" onClick={() => setIsVisible(!isVisible)}>
        <span>&lt;</span>
      </div>
      <div className="arrow-back-button" onClick={() => setInVisible(!inVisible)}>
        <span>&gt;</span>
      </div>
      <div className={`cls_vw_flt_dv ${isVisible ? 'visible' : ''}`}>
        <div className="title">Class</div>
        {[...Array(12)].map((_, index) => (
          <div
            key={index}
            className={`circle ${selected === index + 1 ? 'selected' : ''}`}
            onClick={() => setSelected(index + 1)}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div> */}
      {/* <div
        className={`arrow-button ${isSidebarVisible ? "hidden" : ""}`}
        onClick={() => setIsSidebarVisible(true)}
      >
        <span>&lt;</span>
      </div>
      <div
        className={`arrow-back-button ${isSidebarVisible ? "" : "hidden"}`}
        onClick={() => setIsSidebarVisible(false)}
      >
        <span>&gt;</span>
      </div> */}
      <div className={`cls_vw_flt_dv ${isSidebarVisible ? "visible" : ""}`}>
        <div className="title">Class</div>
        {[...Array(12)].map((_, index) => (
          <div
            key={index}
            className={`circle_one ${selected === index + 1 ? "selected" : ""}`}
            onClick={() => toggleClassSelection(index)}
          >
            {index + 1}
          </div>
        ))}
      </div>
      <Container
        fluid
        className="container-scroll"
        style={{ marginTop: "16px" }}
      >
        <Row>
          {filteredClassDetails.length > 0 ? (
            filteredClassDetails.map((item, index) => (
              <Col
                lg={3}
                md={4}
                sm={12}
                xs={12}
                key={index}
                className="class_list"
              >
                <div
                  onClick={() =>handleclick(item)}
                  className="border border-white class_rectangle"
                >
                  <div className="class_list_medium" style={{textTransform:'capitalize'}}>{item.medium}</div>
                <div className="class_profile_name">
                  <div>
                    <img
                      src={item.admin_logo}
                      alt="profile pic"
                      className="faculty_profile_photo"
                    />
                  </div>
                  <div className="class_list_facultyname"  style={{textTransform:'capitalize'}}>
                    {item.class_teacher}
                  </div>
                </div>
                <div className="class_lisit_circle">
                  <div className="class_number_div">
                    <h1 style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
                      {item.class_name}{item.division}
                    </h1>
                  </div>
                </div>
                  {/* <div className="class_list_medium">{item.medium}</div> */}
                  {/* <div className="class_list_medium">{item.medium}</div>
                  <div className="class_profile_name">
                    <div>
                      <img
                        src={item.admin_logo}
                        alt="profile pic"
                        className="faculty_profile_photo"
                      />
                    </div>
                    <div className="class_list_facultyname" >
                      {item.class_teacher}
                    </div>
                  </div> */}

                  {/* <div className="class_list_facultyname" style={{paddingLeft:'2vh',paddingTop:'1vh'}}>
                    {item.class_name} {item.division}
                  </div> */}
                </div>
                {/* <div className="class_lisit_circle">
                  <div className="class_number_div">
                    <h1 style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
                      {item.class_name}{item.division}
                    </h1>

                  </div>
                </div> */}
              </Col>
            ))
          ) : (
            <Col>
              <div className="no-classes-message">
                <h3>

                No classes available for the selected number.
                </h3>
              </div>
            </Col>
          )}
        </Row>
      </Container>
      {/* <div className="class_adding_button">
        <audio ref={audioRef} src={mp3File}></audio>
        <Link to="/classadding">
          <button
            className={`class_adding class_adding_my_button ${isActive ? "active" : ""}`}
          >
            <IoIosAdd
              style={{ height: "40px", width: "40px", color: "#ffff" }}
            />
          </button>
        </Link>
      </div> */}
      <div className="class_adding_button">
        {/* <audio ref={audioRef} src={mp3File}></audio> */}
        <button
          className={`class_adding class_adding_my_button ${
            isActive ? "active" : ""
          }`}
          onClick={handleButtonClick}
        >
          <IoIosAdd style={{ height: "40px", width: "40px", color: "#ffff" }} />
        </button>
      </div>
    </div>
  );
}

export default AdminClassdashboard;
