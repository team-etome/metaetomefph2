import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { IoIosArrowDown, IoIosArrowUp, IoIosAdd } from 'react-icons/io';
import { useNavigate } from "react-router-dom";
import '../teachertestlist/teacherlisting.css';
import axios from 'axios';  // Don't forget to import Axios
import { MdDelete } from 'react-icons/md';
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

function TestListing() {
    const [showThisMonth, setShowThisMonth] = useState(true);
    const [showPreviousMonth, setShowPreviousMonth] = useState(true);
    const [tests, setTests] = useState([]);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [showModal, setShowModal] = useState(false);
    console.log(tests, "test list")

    const APIURL = useSelector((state) => state.APIURL.url);
    const navigate = useNavigate();
    const teacherinfo = useSelector((state) => state.teacherinfo || {});
    const teacher_subject = useSelector((state) => state?.teachersubjectinfo);

    const teacher_id = teacherinfo.teacherinfo?.teacher_id;
    const className = teacher_subject.teachersubjectinfo?.class;
    const division = teacher_subject.teachersubjectinfo?.division;
    const subject = teacher_subject.teachersubjectinfo?.subject;

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const response = await axios.get(`${APIURL}/api/test`, {
                    params: {
                        teacher_id: teacher_id,
                        class_name: className,
                        division: division,
                        subject: subject
                    }
                });
                setTests(response.data);
            } catch (error) {
                console.error('Error fetching test data:', error);
            }
        };

        fetchTests();
    }, [APIURL, teacher_id, className, division, subject]);

    // Organize tests by month
    // const thisMonthTests = tests.filter(test => new Date(test.created_date).getMonth() === new Date().getMonth());
    // const previousMonthTests = tests.filter(test => new Date(test.created_date).getMonth() === new Date().getMonth() - 1);

    // Get current date details
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Filter tests for the current month and current year
    const thisMonthTests = tests.filter(test => {
        const testDate = new Date(test.created_date);
        return !isNaN(testDate) &&
            testDate.getMonth() === currentMonth &&
            testDate.getFullYear() === currentYear;
    });

    // Group all tests that are not in the current month/year into "Previous Month"
    const previousMonthTests = tests.filter(test => {
        const testDate = new Date(test.created_date);
        return !isNaN(testDate) &&
            !(testDate.getMonth() === currentMonth && testDate.getFullYear() === currentYear);
    });


    const handleAddClick = () => {
        navigate('/teachertestadd');
    }

    // const handleAssignmentClick = (assignment) => {
    //     setSelectedAssignment(assignment);
    //     setShowModal(true);
    // }
    const handleAssignmentClick = (assignment) => {
        setSelectedAssignment(assignment);
        setShowModal(true);
    }

    // Delete handler for tests
    // const handleDeleteTest = async (id) => {
    //     if (window.confirm("Are you sure you want to delete this test?")) {
    //         try {
    //             await axios.delete(`${APIURL}/api/testdelete/${id}/`, {
    //                 params: { type: "mock" }
    //             });
    //             Update tests state by removing the deleted test
    //             setTests(prevTests => prevTests.filter(test => test.id !== id));
    //         } catch (error) {
    //             console.error("Error deleting test:", error);
    //             alert("Failed to delete test.");
    //         }
    //     }
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
                params: { type: "mock" }
              });
              // Remove the deleted test from state
              setTests(prevTests => prevTests.filter(test => test.id !== id));
              Swal.fire("Deleted!", "Your test has been deleted.", "success");
            } catch (error) {
              console.error("Error deleting test:", error);
              Swal.fire("Error!", "Failed to delete test.", "error");
            }
          }
          // If cancelled, nothing happens.
        });
      };
      
    return (
        <Container className='test_container'>
            <Row>
                <Col className='test_list'>
                    <div className='test_header'>
                        <h2>Mock Test</h2>
                        {/* <div className="test_search_filter_icon d-flex align-items-center">
                            <BsFilterRight className="bs-filter-right" />
                        </div> */}
                    </div>
                    <hr />
                    <div className='test_body'>
                        <div className="test_week" onClick={() => setShowThisMonth(!showThisMonth)}>
                            <span>This Month</span>
                            {showThisMonth ? <IoIosArrowUp className="test_icon" /> : <IoIosArrowDown className="test_icon" />}
                        </div>
                        {showThisMonth && thisMonthTests.map((test) => (
                            <div key={test.id} className="test_item mb-3 p-2" onClick={() => handleAssignmentClick(test)}>
                                <div
                                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                >
                                    <h5>{test.exam_name}</h5>
                                    <MdDelete
                                        className="delete-icon"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent opening modal when clicking delete
                                            handleDeleteTest(test.id);
                                        }}
                                    />
                                </div>
                                <p>Posted On: {new Date(test.exam_date).toLocaleDateString()}</p>
                            </div>
                        ))}

                        <div className="test_week" onClick={() => setShowPreviousMonth(!showPreviousMonth)}>
                            <span>Previous Month</span>
                            {showPreviousMonth ? <IoIosArrowUp className="test_icon" /> : <IoIosArrowDown className="test_icon" />}
                        </div>
                        {showPreviousMonth && previousMonthTests.map((test) => (
                            <div key={test.id} className="test_item mb-3 p-2" onClick={() => handleAssignmentClick(test)}>
                                <div
                                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                >
                                    <h4>{test.exam_name}</h4>
                                    <MdDelete
                                        className="delete-icon"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteTest(test.id);
                                        }}
                                    />
                                </div>
                                <p>Posted On: {new Date(test.exam_date).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                    <div className="test_teacher_button">
                        <Button className={`teacher_test teacher_test_my_button ${showModal ? 'active' : ''}`} onClick={handleAddClick}>
                            <IoIosAdd style={{ height: "40px", width: "40px", color: "#ffff" }} />
                        </Button>
                    </div>

                </Col>
            </Row>
            {selectedAssignment && (
                <Modal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    size="xl"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedAssignment.exam_name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ padding: 0, maxHeight: '80vh', overflowY: 'auto' }}>
                        {selectedAssignment.questions &&
                            selectedAssignment.questions.length > 0 &&
                            selectedAssignment.questions[0].questions &&
                            selectedAssignment.questions[0].questions.length > 0 ? (
                            selectedAssignment.questions[0].questions.map((imgObj, index) => (
                                <img
                                    key={index}
                                    src={imgObj.question}
                                    alt={`Test Image ${index + 1}`}
                                    style={{ width: "60%", marginBottom: "1rem", objectFit: "contain" }}
                                />
                            ))
                        ) : (
                            <p>No images available</p>
                        )}
                    </Modal.Body>
                </Modal>
            )}

        </Container>
    )
}

export default TestListing;
