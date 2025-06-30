import React, { useState, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp, IoIosAdd } from "react-icons/io";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import "./teachermcq.css";

function TeacherMcqList() {
  const [showThisMonth, setShowThisMonth] = useState(true);
  const [showPreviousMonth, setShowPreviousMonth] = useState(true);
  const [selectedTest, setSelectedTest] = useState(null);
  const [thisMonthTests, setThisMonthTests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [previousMonthTests, setPreviousMonthTests] = useState([]);

  const [mcqdata, setMcqData] = useState([]);

  console.log(mcqdata, "dattatttata");

  const navigate = useNavigate();

  const teacher = useSelector((state) => state.teacherinfo);
  const teacher_id = teacher.teacherinfo?.teacher_id;

  const APIURL = useSelector((state) => state.APIURL.url);

  console.log(teacher_id, "teacher id");

  useEffect(() => {
    if (teacher_id) {
      axios
        .get(`${APIURL}/api/mcqanswer/${teacher_id}`)
        .then((response) => {
          console.log(response.data, "API Response");
          // Assuming the API response separates tests by month
          setMcqData(response.data);
          setThisMonthTests(response.data.this_month_tests || []);
          setPreviousMonthTests(response.data.previous_month_tests || []);
        })
        .catch((error) => {
          console.error("Error fetching MCQ tests:", error);
        });
    }
  }, [teacher_id]);

  const handleAddClick = () => {
    navigate("/teachermcqadd");
  };
  // const handleDeleteTest = async (id) => {
  //   if (window.confirm("Are you sure you want to delete this test?")) {
  //     try {
  //       await axios.delete(`${APIURL}/api/testdelete/${id}/`, {
  //         params: { type: "mcq" },
  //       });
  //       Remove the deleted test from both arrays:
  //       setThisMonthTests((prev) => prev.filter((test) => test.id !== id));
  //       setPreviousMonthTests((prev) => prev.filter((test) => test.id !== id));
  //     } catch (error) {
  //       console.error("Error deleting MCQ test:", error);
  //       alert("Failed to delete MCQ test.");
  //     }
  //   }
  // };

  const handleDeleteTest = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this deletion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${APIURL}/api/testdelete/${id}/`, {
            params: { type: "mcq" },
          });
          // Remove the deleted test from both arrays:
          setThisMonthTests((prev) => prev.filter((test) => test.id !== id));
          setPreviousMonthTests((prev) => prev.filter((test) => test.id !== id));
          Swal.fire("Deleted!", "Your test has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting MCQ test:", error);
          Swal.fire("Error!", "Failed to delete MCQ test.", "error");
        }
      }
      // If cancelled, nothing happens.
    });
  };
  
  const handleTestClick = (test) => {
    if (test.pdf && test.pdf.trim() !== "") {
      setSelectedTest(test);
      setShowModal(true);
    } else if (test.image && test.image.trim() !== "") {
      setSelectedTest(test);
      setShowModal(true);
    } else if (
      test.questions &&
      test.questions.length > 0 &&
      test.questions[0].questions &&
      test.questions[0].questions.length > 0
    ) {
      setSelectedTest(test);
      setShowModal(true);
    } else {
      alert("No document available for this test.");
    }
  };

  return (
    <Container className="mcqlist_test_container">
      <Row>
        <Col className="mcqlist_test_list">
          <div className="mcqlist_test_header">
            <h2>Multiple choices Question</h2>
          </div>
          <hr />
          <div className="mcqlist_test_body">
            <div
              className="mcqlist_test_week"
              onClick={() => setShowThisMonth(!showThisMonth)}
            >
              <span>This Month</span>
              {showThisMonth ? (
                <IoIosArrowUp className="mcqlist_test_icon" />
              ) : (
                <IoIosArrowDown className="mcqlist_test_icon" />
              )}
            </div>

            {showThisMonth &&
              thisMonthTests.map((test) => (
                <div
                  key={test.id}
                  className="mcqlist_test_item mb-3 p-2"
                  onClick={() => handleTestClick(test)}
                >
                  <div
                    className="mcqlist_test_item-header"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h5>{test.exam_name}</h5>
                    <MdDelete
                      className="delete-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTest(test.id);
                      }}
                    />
                  </div>
                  <p>Posted On: {test.exam_date}</p>
                </div>
              ))}


            <div
              className="mcqlist_test_week"
              onClick={() => setShowPreviousMonth(!showPreviousMonth)}
            >
              <span>Previous Month</span>
              {showPreviousMonth ? (
                <IoIosArrowUp className="mcqlist_test_icon" />
              ) : (
                <IoIosArrowDown className="mcqlist_test_icon" />
              )}
            </div>

            {showPreviousMonth &&
              previousMonthTests.map((test) => (
                <div key={test.id} className="mcqlist_test_item mb-3 p-2">
                  <div
                    className="mcqlist_test_item-header"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h5>{test.exam_name}</h5>
                    <MdDelete
                      className="delete-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTest(test.id);
                      }}
                    />
                  </div>
                  <p>Posted On: {test.exam_date}</p>
                </div>
              ))}
          </div>
          <div className="mcqlist_test_teacher_button">
            <Button className="mcqlist_add_button" onClick={handleAddClick}>
              <IoIosAdd
                style={{ height: "40px", width: "40px", color: "#fff" }}
              />
            </Button>
          </div>
        </Col>
      </Row>
      {selectedTest && (
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          size="xl"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{selectedTest.exam_name}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ padding: "1rem", maxHeight: "80vh", overflowY: "auto" }}>
            <div className="mcq-section-title">
              <p>{selectedTest.questions[0].name}</p>
            </div>
            {selectedTest.questions &&
              selectedTest.questions.length > 0 &&
              selectedTest.questions[0].questions &&
              selectedTest.questions[0].questions.length > 0 ? (
              selectedTest.questions[0].questions.map((questionItem, index) => (
                <div key={index} style={{ marginBottom: "1rem", borderBottom: "1px solid #ddd", paddingBottom: "1rem" }}>
                  {/* Display the question image */}

                  <img
                    src={questionItem.questionImage}
                    alt={`Question ${index + 1}`}
                    style={{ width: "100%", height: "auto", objectFit: "contain" }}
                  />
                  {/* Display the options */}
                  {questionItem.options && questionItem.options.length > 0 && (
                    <div className="question-options" style={{ marginTop: "0.5rem" }}>
                      <h6>Options:</h6>
                      {questionItem.options.map((option, i) => (
                        <p key={i} style={{ margin: "0.25rem 0" }}>{option}</p>
                      ))}
                    </div>
                  )}
                  {/* Display the answer key */}
                  {questionItem.answerKey && (
                    <p style={{ fontWeight: "bold", marginTop: "0.5rem" }}>
                      Answer: {questionItem.answerKey}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p style={{ padding: "20px" }}>No document available for this test.</p>
            )}
          </Modal.Body>

        </Modal>
      )}

    </Container>
  );
}

export default TeacherMcqList;
