import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import '../teacherquestioninstruction/questioninstruction.css'

function QuestionInstruction() {

  return (
    <div>
    <Container className="teacher_instruction_container">
      <form className="teacher_instruction_form">
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <Link to="/teacheraarna">
              <IoChevronBackSharp className="teacher_instruction_back" />
            </Link>
            <h1 className="teacher_instruction_title">Question Paper Creation</h1>
          </div>
          <div style={{ border: "0.5px solid #676767" }}></div>
        </div>
        <div className='teacher_instruction_scroll'>
        <Row style={{ paddingTop: "20px" }}>

        </Row>
        </div>
      </form>
    </Container>
  </div>
  )
}

export default QuestionInstruction