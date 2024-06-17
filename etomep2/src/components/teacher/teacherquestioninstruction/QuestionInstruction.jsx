import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import '../teacherquestioninstruction/questioninstruction.css'
import TeacherTextEditor from '../teachertexteditor/TeacherTextEditor';

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
        <Row xs={1} style={{ paddingTop: "20px" }}>
<Col style={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center",padding:"8px"}}>
<h6  style={{fontSize:"18px",fontWeight:"500",paddingBottom:"10px"}} >MID TERM EXAMINATION, NOVEMBER 2023</h6>
<p  style={{fontSize:"16px",fontWeight:"700",paddingBottom:"10px"}}>Class 10</p>
<h6 style={{fontSize:"16px",fontWeight:"500"}}>FUNDAMENTALS OF DIGITAL SYSTEMS</h6>
</Col>
<Col style={{display:"flex", justifyContent:"space-between",padding:"20px"}}>
<p1 style={{paddingLeft:"55px"}} >Maximum Marks :80</p1>
<p1 style={{paddingRight:"55px"}}>Time: 3 Hours</p1>
</Col>
<Col style={{display:"flex",justifyContent:"center",marginTop:"20px",alignContent:"center",}}>
<TeacherTextEditor/>
</Col>
<Col  style={{display:"flex",justifyContent:"flex-end",paddingRight:"6%"}}>
<button style={{backgroundColor:"transparent",color:"#526D82",border:"1px solid #526D82",borderRadius:"8px",cursor:"pointer",marginTop:"30px",width:"200px",height:"40px" }}>Create Question</button>
</Col>
        </Row>
        </div>
      </form>
    </Container>
  </div>
  )
}

export default QuestionInstruction