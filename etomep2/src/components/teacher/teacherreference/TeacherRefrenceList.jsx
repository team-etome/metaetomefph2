import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { IoIosArrowDown, IoIosArrowUp, IoIosAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "../teacherreference/teacherrefrencelist.css";
import { BsFilterRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function TeacherRefrenceList() {
  const [showThisMonth, setShowThisMonth] = useState(true);
  const [showPreviousMonth, setShowPreviousMonth] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [loading, setLoading] = useState(false);

  
  const [references, setReferences] = useState({
    thisMonth: [],
    previousMonth: [],
  });

  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/teacherreferenceadd");

    
  };


  const APIURL = useSelector((state) => state.APIURL.url);
  const teacher = useSelector((state) => state.teacherinfo);
  const teacher_subject = useSelector((state) => state.teachersubjectinfo);

  console.log(references,"referenceeee")


  const handleAssignmentClick = (assignment) => {
    setSelectedAssignment(assignment);
    setShowModal(true);
  };

  useEffect(() => {
    const fetchReferences = async () => {
      const standard = teacher_subject.teachersubjectinfo?.class;
      const division = teacher_subject.teachersubjectinfo?.division;
      const subject = teacher_subject.teachersubjectinfo?.subject;
      const teacher_id = teacher.teacherinfo?.teacher_id;
      try {
        const response = await axios.get(`${APIURL}/api/reference`, {
          params: {
            teacher_id,
            standard,
            division,
            subject,
          },
        });
        const fetchedReferences = response.data;

        // Group the references by month
        const groupedReferences = groupByMonth(fetchedReferences);
        setReferences(groupedReferences);
      } catch (error) {
        console.error("Error fetching references:", error);
      }
    };

    fetchReferences();
  }, [APIURL, teacher, teacher_subject]);

  // const refrences = {
  //   thisMonth: [
  //     {
  //       id: 1,
  //       title: "Environmental impacts",
  //       description: "Details about environmental impacts",
  //     },
  //     {
  //       id: 3,
  //       title: "Today's Model Examination is Vector Graphics",
  //       description: "Details about the model examination",
  //     },
  //   ],
  //   previousMonth: [
  //     {
  //       id: 2,
  //       title: "Deforestation and Its Effects on Biodiversity",
  //       description: "Details about deforestation",
  //     },
  //     {
  //       id: 4,
  //       title: "Soil Erosion",
  //       description: "Details about soil erosion",
  //       studentclass: "A",
  //     },
  //     {
  //       id: 5,
  //       title: "Water Conservation",
  //       description: "Details about water conservation",
  //       studentclass: "A",
  //     },
  //   ],
  // };
  const groupByMonth = (references) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const thisMonth = [];
    const previousMonth = [];

    references.forEach((reference) => {
      const assignedDate = new Date(reference.assigned_date);
      if (
        assignedDate.getMonth() === currentMonth &&
        assignedDate.getFullYear() === currentYear
      ) {
        thisMonth.push(reference);
      } else {
        previousMonth.push(reference);
      }
    });

    return { thisMonth, previousMonth };
  };

  const { thisMonth, previousMonth } = references;

  return (
    <Container className="refrence_container">
      <Row>
        <Col className="refrence_list">
          <div className="refrence_header">
            <h2>References</h2>
            <div className="refrence_search_filter_icon d-flex align-items-center">
              <BsFilterRight className="bs-filter-right" />
            </div>
          </div>
          <hr />
          <div className="refrence_body">
            <div
              className="refrence_week"
              onClick={() => setShowThisMonth(!showThisMonth)}
            >
              <span>This Month</span>
              {showThisMonth ? (
                <IoIosArrowUp className="week_icon" />
              ) : (
                <IoIosArrowDown className="week_icon" />
              )}
            </div>
            {showThisMonth &&
              thisMonth.map((refrences) => (
                <div
                  key={refrences.id}
                  className="refrence_item mb-3 p-2"
                  onClick={() => handleAssignmentClick(refrences)}
                >
                  <h5>{refrences.title}</h5>
                  <p>
                    Posted On:{" "}
                    {new Date(reference.assigned_date).toLocaleDateString()}
                  </p>
                </div>
              ))}

            <div
              className="refrence_week"
              onClick={() => setShowPreviousMonth(!showPreviousMonth)}
            >
              <span>Previous Month</span>
              {showPreviousMonth ? (
                <IoIosArrowUp className="week_icon" />
              ) : (
                <IoIosArrowDown className="week_icon" />
              )}
            </div>
            {showPreviousMonth &&
              previousMonth.map((refrences) => (
                <div
                  key={refrences.id}
                  className="refrence_item mb-3 p-2"
                  onClick={() => handleAssignmentClick(refrences)}
                >
                  <h4>{refrences.title}</h4>
                  <p>Posted On: {new Date(reference.assigned_date).toLocaleDateString()}</p>
                </div>
              ))}
          </div>
          <div className="refrence_teacher_button">
            <Link to="/teacherreferenceadd">
              <Button
                className={`teacher_refrence teacher_refrence_my_button ${
                  showModal ? "active" : ""
                }`}
                onClick={handleAddClick}
              >
                <IoIosAdd
                  style={{ height: "40px", width: "40px", color: "#ffff" }}
                />
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default TeacherRefrenceList;
