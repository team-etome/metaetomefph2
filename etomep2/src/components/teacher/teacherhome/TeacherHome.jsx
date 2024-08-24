import React, { useState } from "react";
import { Col, Container, Row, Tabs, Tab, Nav, Dropdown } from "react-bootstrap";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoPersonCircleOutline } from "react-icons/io5";
import { LuBellDot } from "react-icons/lu";
import { AiOutlineFilePdf } from "react-icons/ai";
import "../teacherhome/teacherhome.css";
import { RiDeleteBin6Line } from "react-icons/ri";
// import Dashimg1 from "../../../assets/dashimgone.png";
// import Dashimg from "../../../assets/dashimg.png";

function TeacherHome() {
  const [showThisDate, setShowThisDate] = useState(true);
  const [showPreviousDate, setShowPreviousDate] = useState(true);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [value, setValue] = useState(new Date());

  // const state = useSelector(state => state);
  // console.log(state);

  const handleAssignmentClick = (assignment) => {
    setSelectedAssignment(assignment);
    setShowModal(true);
  };
  const notifications = {
    thisDate: [
      { id: 1, title: "Reshma Shared the Question Paper" },
      { id: 3, title: "Angaha Completed the Evaluation" },
      { id: 1, title: "Reshma Shared the Question Paper" },
      { id: 3, title: "Angaha Completed the Evaluation" },
      { id: 1, title: "Reshma Shared the Question Paper" },
      { id: 3, title: "Angaha Completed the Evaluation" },
      { id: 1, title: "Reshma Shared the Question Paper" },
      { id: 3, title: "Angaha Completed the Evaluation" },
    ],
    previousDate: [
      { id: 2, title: "Reshma Shared the Question Paper" },
      { id: 4, title: "Reshma Shared the Question Paper" },
      { id: 5, title: "Angaha Completed the Evaluation" },
    ],
  };
  return (
    <div className="teacher_home">
      <Container className="teacher_home_container">
        <Row className="tchr_head">
          <h4>Welcome !</h4>
        </Row>
        <Row className="teacher_home_row">
          <Col className="dashboard_section" md={8}>
            <Row className="tchr_db_rsrce_sub">
              <Col md={6} className="tchr_rscr_mtr">
                <div className="tchr_rsr_title">
                  <h6>Resource Materials</h6>
                  <select name="" id="" className="tchr_drpdwn">
                    <option value="class1">Class 1A</option>
                    <option value="class2">Class 2B</option>
                  </select>
                </div>
                <div className="tchr_rscr_mat">
                  <div className="tchr_pdf">
                    <AiOutlineFilePdf className="tchr_icon" />
                    <p>titleeeetitleeeetitleeeetitleeeetitleeee</p>
                  </div>
                  <div className="tchr_pdf">
                    <AiOutlineFilePdf className="tchr_icon" />
                    <p>titleeee</p>
                  </div>
                </div>
              </Col>
              <Col md={6} className="tchr_sb_tchr">
                <div className="tchr_sb_list">
                  <div className="tchr_gp">
                    <h6>Subject Teachers</h6>
                    <hr className="heading-divider" />
                    <div className="sb_tchr_hd_list">
                      <div className="sb_tchr_list">
                        <div className="tchr_person_name">
                          <IoPersonCircleOutline className="tchr_person" />
                          <div className="tchr_sub">
                            <h6>Teacher Nameeee</h6>
                          </div>
                        </div>
                        <div className="tchr_sub_phn">
                          <p>Subject</p>
                          <p style={{paddingLeft:'30px'}}>Phone Number</p>
                        </div>
                      </div>
                      <div className="sb_tchr_list">
                        <div className="tchr_person_name">
                          <IoPersonCircleOutline className="tchr_person" />
                          <div className="tchr_sub">
                            <h6>Teacher Nameeee</h6>
                          </div>
                        </div>
                        <div className="tchr_sub_phn">
                          <p>Subject</p>
                          <p style={{paddingLeft:'30px'}}>Phone Number</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="tcrr_cal_notes">
              <Col md={6} className="tchr_cal">
              </Col>
              <Col md={6} className="tchr_notes">
                <div className="tchr_notes_list">
                  <h6>Notes</h6>
                  <div className="tchr_box">
                  <div className="tchr_note_gp">
                    <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search</p>
                    <RiDeleteBin6Line className="tchr_dlt_icon"/>
                  </div>
                  <div className="tchr_note_gp">
                    <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search</p>
                    <RiDeleteBin6Line className="tchr_dlt_icon"/>
                  </div>
                  <div className="tchr_note_gp">
                    <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search</p>
                    <RiDeleteBin6Line className="tchr_dlt_icon"/>
                  </div>
                  <div className="tchr_note_gp">
                    <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search</p>
                    <RiDeleteBin6Line className="tchr_dlt_icon"/>
                  </div>
                  <div className="tchr_note_gp">
                    <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search</p>
                    <RiDeleteBin6Line className="tchr_dlt_icon"/>
                  </div><div className="tchr_note_gp">
                    <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search</p>
                    <RiDeleteBin6Line className="tchr_dlt_icon"/>
                  </div>
                  <div className="tchr_note_gp">
                    <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search</p>
                    <RiDeleteBin6Line className="tchr_dlt_icon"/>
                  </div>
                  </div>
                  <div className="tchr_addnew">
                    <button>+ Add New</button>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col md={4} className="teacher_home_section">
            <div className="teacher_home_content">
              <div className="teacher_home_bar">
                <LuBellDot className="teacher_home_bell" />
                <h5>Notification</h5>
              </div>
              <hr />
              <div className="teacher_home_body">
                <div
                  className="teacher_home_day"
                  onClick={() => setShowThisDate(!showThisDate)}
                >
                  <span>Today</span>
                  {showThisDate ? (
                    <IoIosArrowUp className="teacher_home_day_icon" />
                  ) : (
                    <IoIosArrowDown className="teacher_home_day_icon" />
                  )}
                </div>
                {showThisDate &&
                  notifications.thisDate.map((notification) => (
                    <div
                      key={notification.id}
                      className="teacher_home_item mb-3 p-2"
                      onClick={() => handleAssignmentClick(notification)}
                    >
                      <h4>{notification.title}</h4>
                      <p>3.00 PM</p>
                    </div>
                  ))}

                <div
                  className="teacher_home_day"
                  onClick={() => setShowPreviousDate(!showPreviousDate)}
                >
                  <span>Yesterday</span>
                  {showPreviousDate ? (
                    <IoIosArrowUp className="teacher_home_day_icon" />
                  ) : (
                    <IoIosArrowDown className="teacher_home_day_icon" />
                  )}
                </div>
                {showPreviousDate &&
                  notifications.previousDate.map((notification) => (
                    <div
                      key={notification.id}
                      className="teacher_home_item mb-3 p-2"
                      onClick={() => handleAssignmentClick(notification)}
                    >
                      <h4>{notification.title}</h4>
                      <p>10.00 AM</p>
                    </div>
                  ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TeacherHome;
