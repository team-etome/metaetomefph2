import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { IoIosArrowDown, IoIosArrowUp, IoIosAdd } from 'react-icons/io';
import { useNavigate } from "react-router-dom";
import '../teachertestlist/teacherlisting.css';
import { BsFilterRight } from "react-icons/bs";
import axios from 'axios';  // Don't forget to import Axios
import { useSelector } from "react-redux";

function TestListing() {
    const [showThisMonth, setShowThisMonth] = useState(true);
    const [showPreviousMonth, setShowPreviousMonth] = useState(true);
    const [tests, setTests] = useState([]);
    const [showModal, setShowModal] = useState(false);

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
    const thisMonthTests = tests.filter(test => new Date(test.exam_date).getMonth() === new Date().getMonth());
    const previousMonthTests = tests.filter(test => new Date(test.exam_date).getMonth() === new Date().getMonth() - 1);

    const handleAddClick = () => {
        navigate('/teachertestadd');
    }

    const handleAssignmentClick = (assignment) => {
        setSelectedAssignment(assignment);
        setShowModal(true);
    }

    return (
        <Container className='test_container'>
            <Row>
                <Col className='test_list'>
                    <div className='test_header'>
                        <h2>Test</h2>
                        <div className="test_search_filter_icon d-flex align-items-center">
                            <BsFilterRight className="bs-filter-right" />
                        </div>
                    </div>
                    <hr />
                    <div className='test_body'>
                        <div className="test_week" onClick={() => setShowThisMonth(!showThisMonth)}>
                            <span>This Month</span>
                            {showThisMonth ? <IoIosArrowUp className="test_icon" /> : <IoIosArrowDown className="test_icon" />}
                        </div>
                        {showThisMonth && thisMonthTests.map((test) => (
                            <div key={test.id} className="test_item mb-3 p-2" onClick={() => handleAssignmentClick(test)}>
                                <h5>{test.exam_name}</h5>
                                <p>Posted On: {new Date(test.exam_date).toLocaleDateString()}</p>
                            </div>
                        ))}

                        <div className="test_week" onClick={() => setShowPreviousMonth(!showPreviousMonth)}>
                            <span>Previous Month</span>
                            {showPreviousMonth ? <IoIosArrowUp className="test_icon" /> : <IoIosArrowDown className="test_icon" />}
                        </div>
                        {showPreviousMonth && previousMonthTests.map((test) => (
                            <div key={test.id} className="test_item mb-3 p-2" onClick={() => handleAssignmentClick(test)}>
                                <h4>{test.exam_name}</h4>
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
        </Container>
    )
}

export default TestListing;
