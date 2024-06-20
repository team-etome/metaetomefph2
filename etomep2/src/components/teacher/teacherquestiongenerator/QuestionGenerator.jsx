import React, { useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Link} from "react-router-dom";
import '../teacherquestiongenerator/questiongenerator.css';
import { IoIosArrowBack } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";
import { TbSection } from "react-icons/tb";
import TeacherTextEditor from "../teachertexteditor/TeacherTextEditor";
import { MdOutlineDelete } from "react-icons/md";
import { PiDotsSix } from "react-icons/pi";

function QuestionGenerator() {
  const [subsections, setSubsections] = useState([{ name: 'Main Section', questions: [{ question: '', answer: '', points: 5, showAnswer: false }] }]);
  const [currentSubsectionIndex, setCurrentSubsectionIndex] = useState(0);

  const handleAnswerChange = (subsectionIndex, questionIndex, event) => {
    const newSubsections = [...subsections];
    newSubsections[subsectionIndex].questions[questionIndex].answer = event.target.value;
    setSubsections(newSubsections);
  };

  const handlePointsChange = (subsectionIndex, questionIndex, event) => {
    const newSubsections = [...subsections];
    newSubsections[subsectionIndex].questions[questionIndex].points = event.target.value;
    setSubsections(newSubsections);
  };

  const addQuestion = () => {
    const newSubsections = [...subsections];
    newSubsections[currentSubsectionIndex].questions.push({ question: '', answer: '', points: 5, showAnswer: false });
    setSubsections(newSubsections);
  };

  const addSubsection = () => {
    setSubsections([...subsections, { name: 'New Section', questions: [] }]);
    setCurrentSubsectionIndex(subsections.length); // Set current index to the newly added subsection
  };

  const removeSubsection = (index) => {
    const newSubsections = subsections.filter((_, i) => i !== index);
    setSubsections(newSubsections);
  };

  const removeQuestion = (subsectionIndex, questionIndex) => {
    const newSubsections = [...subsections];
    newSubsections[subsectionIndex].questions = newSubsections[subsectionIndex].questions.filter((_, i) => i !== questionIndex);
    setSubsections(newSubsections);
  };

  const toggleAnswerKey = (subsectionIndex, questionIndex) => {
    const newSubsections = [...subsections];
    newSubsections[subsectionIndex].questions[questionIndex].showAnswer = !newSubsections[subsectionIndex].questions[questionIndex].showAnswer;
    setSubsections(newSubsections);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceSubsectionIndex = parseInt(source.droppableId.split('-')[1]);
    const destinationSubsectionIndex = parseInt(destination.droppableId.split('-')[1]);

    const sourceQuestions = Array.from(subsections[sourceSubsectionIndex].questions);
    const [removed] = sourceQuestions.splice(source.index, 1);
    const destinationQuestions = Array.from(subsections[destinationSubsectionIndex].questions);
    destinationQuestions.splice(destination.index, 0, removed);

    const newSubsections = [...subsections];
    newSubsections[sourceSubsectionIndex].questions = sourceQuestions;
    newSubsections[destinationSubsectionIndex].questions = destinationQuestions;

    setSubsections(newSubsections);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
          <Link to="/teacherquestioninstruction">
            <IoIosArrowBack style={{ width: "32px", height: "32px", color: "#526D82", marginLeft: "68px" }} />
          </Link>
            <h6 style={{ marginLeft: "10px", color: "#526D82", fontWeight: "500", fontSize: "28px" }}>Subject Name</h6>
          </Col>
          <Col style={{ display: "flex", justifyContent: "end", paddingRight: "24px", alignItems: "center" }}>
            <button style={{ width: "180px", height: "48px", borderRadius: "8px", color: "#ffff", backgroundColor: "#526D82", fontSize: "18px" }}>Submit</button>
          </Col>
        </Row>
        <Row>
          <div className="text-editor">
            {subsections.map((subsection, subsectionIndex) => (
              <Droppable key={subsectionIndex} droppableId={`droppable-${subsectionIndex}`} type="QUESTION">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="subsection-container"
                  >
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                      <textarea className='subsection_textarea'
                        type="text"
                        value={subsection.name}
                        onChange={(e) => {
                          const newSubsections = [...subsections];
                          newSubsections[subsectionIndex].name = e.target.value;
                          setSubsections(newSubsections);
                        }}
                        placeholder="Subsection Name"
                        style={{ width: '96%', height: "auto", minHeight: "50px", marginBottom: '10px', padding: '8px', borderRadius: '8px', border: "0.5px solid #676767" }}
                      />
                      <button style={{ backgroundColor: "white", border: "1px solid #ccc", borderRadius: "8px", height: "50px", marginBottom: "10px" }} onClick={() => removeSubsection(subsectionIndex)}>
                        <MdOutlineDelete style={{ width: "32px", height: "32px" }} />
                      </button>
                    </div>
                    {subsection.questions.map((q, questionIndex) => (
                      <Draggable key={questionIndex} draggableId={`draggable-${subsectionIndex}-${questionIndex}`} index={questionIndex}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="question-container"
                          >
                            <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                              <div style={{ backgroundColor: "#fff",
                                width: "110px",
                                height: "110px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                border: "0.5px solid #676767",
                                borderRadius: "8px",
                                marginRight: "5px"
                              }}>
                                <h6 style={{fontSize: "20px"}}>Q. {questionIndex + 1})</h6>
                              </div>
                              <TeacherTextEditor placeholder="Type question here..." />
                            </div>

                            <div style={{display: "flex", justifyContent: "space-between", paddingLeft: "24px", paddingRight: "10px"}}>
                              <div className="answer-key" onClick={() => toggleAnswerKey(subsectionIndex, questionIndex)}>
                                Answer Key 
                              </div>
                              <div></div>
                            </div>

                            {q.showAnswer && (
                              <div style={{marginTop: "20px", paddingLeft: "10px", display: "flex"}} className="answer-editor">
                                <TeacherTextEditor placeholder="Type answer here..." />
                                <div className="points-input">
                                  <span>Mark</span>
                                  <input
                                    type="number"
                                    value={q.points}
                                    onChange={(e) => handlePointsChange(subsectionIndex, questionIndex, e)}
                                  />
                                </div>
                              </div>
                            )}
                            <div style={{display: "flex", justifyContent: "end", paddingRight: "15px"}}>

                            <div {...provided.dragHandleProps} style={{marginRight:"34%"}}>
                                <PiDotsSix style={{width: "32px", height: "32px", cursor: "grab"}} />
                              </div>
                              <button style={{backgroundColor: "white"}} onClick={() => removeQuestion(subsectionIndex, questionIndex)}><MdOutlineDelete style={{width: "32px", height: "32px"}} /></button>
                              <button style={{width: "160px", height: "42px", backgroundColor: "#526D82", color: "white", borderRadius: "8px", marginRight: "10px"}}>Done</button>
                             
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
            <Row style={{
              width: "64px",
              height: "152px",
              backgroundColor: "#ffff",
              position: "fixed",
              top: "15%",
              right: "2.5%",
              borderRadius: "8px", display: 'flex', justifyContent: "center", alignItems: "center", padding: "5px", flexDirection: "column", paddingTop: "20px"
            }}>
              <Col onClick={addQuestion}><IoAddCircleOutline style={{ width: "32px", height: "32px" }} /></Col>
              <hr style={{ backgroundColor: "black", height: "2px", width: "50%" }}></hr>
              <Col onClick={addSubsection}><TbSection style={{ width: "32px", height: "32px" }} /></Col>
            </Row>
          </div>
        </Row>
      </div>
    </DragDropContext>
  );
}

export default QuestionGenerator;