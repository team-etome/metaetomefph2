import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { IoIosArrowDown, IoIosArrowUp, IoIosAdd } from 'react-icons/io';
import { useNavigate } from "react-router-dom";


import "./teachermcq.css"

function TeacherMcqList() {
    const [showThisMonth, setShowThisMonth] = useState(true);
    const [showPreviousMonth, setShowPreviousMonth] = useState(true);
    const navigate = useNavigate();

   
    const thisMonthTests = [
        { id: 1, exam_name: 'maths', exam_date: '11/5/2024' },
        { id: 2, exam_name: 'new mock', exam_date: '11/5/2024' }
    ];

    const previousMonthTests = [
       
    ];

    const handleAddClick = () => {
        navigate('/teachermcqadd');
    }

    return (
        <Container className="mcqlist_test_container">
            <Row>
                <Col className="mcqlist_test_list">
                    <div className="mcqlist_test_header">
                        <h2>Multiple choices Question</h2>
                    </div>
                    <hr />
                    <div className="mcqlist_test_body">
                        <div className="mcqlist_test_week" onClick={() => setShowThisMonth(!showThisMonth)}>
                            <span>This Month</span>
                            {showThisMonth ? <IoIosArrowUp className="mcqlist_test_icon" /> : <IoIosArrowDown className="mcqlist_test_icon" />}
                        </div>
                        {showThisMonth && thisMonthTests.map((test) => (
                            <div key={test.id} className="mcqlist_test_item mb-3 p-2">
                                <h5>{test.exam_name}</h5>
                                <p>Posted On: {test.exam_date}</p>
                            </div>
                        ))}

                        <div className="mcqlist_test_week" onClick={() => setShowPreviousMonth(!showPreviousMonth)}>
                            <span>Previous Month</span>
                            {showPreviousMonth ? <IoIosArrowUp className="mcqlist_test_icon" /> : <IoIosArrowDown className="mcqlist_test_icon" />}
                        </div>
                        {showPreviousMonth && previousMonthTests.map((test) => (
                            <div key={test.id} className="mcqlist_test_item mb-3 p-2">
                                <h5>{test.exam_name}</h5>
                                <p>Posted On: {test.exam_date}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mcqlist_test_teacher_button">

                        <Button className="mcqlist_add_button"  onClick={handleAddClick}>
                            <IoIosAdd style={{ height: "40px", width: "40px", color: "#fff" }} />
                        </Button>

                    </div>
                
                </Col>
            </Row>
        </Container>
    );
}

export default TeacherMcqList;