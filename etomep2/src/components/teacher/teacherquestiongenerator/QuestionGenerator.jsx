import React, { useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import '../teacherquestiongenerator/questiongenerator.css'
import { IoIosArrowBack } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";
import { TbSection } from "react-icons/tb";
import TeacherTextEditor from "../teachertexteditor/TeacherTextEditor"
import { MdOutlineDelete } from "react-icons/md";
import { VscTypeHierarchySub } from "react-icons/vsc";

function QuestionGenerator() {

  const [questions, setQuestions] = useState([{ question: '', answer: '' }]);
  const [editorVisible, setEditorVisible] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);

  const handleAnswerChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].answer = event.target.value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', answer: '' }]);
  };

  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const showEditor = (index) => {
    setCurrentQuestionIndex(index);
    setEditorVisible(true);
  };

  return (
    <div className='question_generator'>
      <Row xs={2} style={{
        backgroundColor: '#ffff',
        height: "10vh",
        width: "100%",
        zIndex: "10",
        position: "sticky",
        top: "0",
        left: "0",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        display: "flex",
        justifyContent: "space-bet"
      }}>
        <Col style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <IoIosArrowBack style={{ width: "32px", height: "32px", color: "#526D82", marginLeft: "68px" }} />
          <h6 style={{ marginLeft: "10px", color: "#526D82", fontWeight: "500", fontSize: "28px" }}>Subject Name</h6>
        </Col>
        <Col style={{ display: "flex", justifyContent: "end", paddingRight: "24px", alignItems: "center" }}>
          <button style={{ width: "180px", height: "48px", borderRadius: "8px", color: "#ffff", backgroundColor: "#526D82", fontSize: "18px" }}>Submit</button>
        </Col>
      </Row>
      <Row>
        <div className="text-editor">
          {questions.map((q, index) => (
            <div key={index} className="question-container">

              <h1></h1>
              <div style={{display:"flex",flexDirection:"row",justifyContent:"center",}}>
                <div style={{ backgroundColor: "#fff",
                  width:"110px",
                  height:"110px",
                  display:"flex",
                  justifyContent:"center",
                  alignItems:"center",
                  border: "0.5px solid #676767",
                  borderRadius:"8px",
                  marginRight:"5px"

                  }}>
                  <h6 style={{fontSize:"20px"}}>Q. {index + 1})</h6>
                </div>
                <TeacherTextEditor  placeholder="Type question here..." />
              </div>

              <div style={{display:"flex",justifyContent:"space-between",paddingLeft:"24px",paddingRight:"10px"}}>
                <div className="answer-key" onClick={() => document.getElementById(`answer-${index}`).classList.toggle('show')}>
                Answer Key 
              </div>
              <div>
              <button style={{backgroundColor:"white"}} onClick={() => removeQuestion(index)}><VscTypeHierarchySub style={{width:"28px",height:"28px"}}/></button>
              <button style={{backgroundColor:"white"}} onClick={() => removeQuestion(index)}>< MdOutlineDelete style={{width:"32px",height:"32px"}} /></button>
              </div>
                </div>
             
              
              <div style={{marginTop:"20px",paddingLeft:"10px"}} id={`answer-${index}`} className="answer-editor">
              <TeacherTextEditor  placeholder="Type answer here..." />
              </div>
            </div>
          ))}
          {editorVisible && (
            <div className="editor-overlay">
              {/* Add your overlay content here */}
            </div>
          )}
        </div>
        <Row style={{
          width: "64px",
          height: "152px",
          backgroundColor: "#ffff",
          position: "fixed",
          top: "15%",
          right: "2.5%",
          borderRadius: "8px", display: 'flex', justifyContent: "center", alignItems: "center", padding: "5px", flexDirection: "column", paddingTop: "20px"
        }}>
          <Col onClick={() => addQuestion()}><IoAddCircleOutline style={{ width: "32px", height: "32px" }} /></Col>
          <hr style={{ backgroundColor: "black", height: "2px", width: "50%" }}></hr>
          <Col><TbSection style={{ width: "32px", height: "32px" }} /></Col>
        </Row>
      </Row>
    </div>
  )
}

export default QuestionGenerator;