import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import '../teacherquestiongenerator/questiongenerator.css';
import { IoIosArrowBack } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";
import { TbSection } from "react-icons/tb";
import TeacherTextEditor from "../teachertexteditor/TeacherTextEditor";
import { MdOutlineDelete } from "react-icons/md";
import { PiDotsSix } from "react-icons/pi";
import { Link } from "react-router-dom";

function QuestionGenerator() {
  const [subsections, setSubsections] = useState([
    {
      name: "Main Section",
      questions: [{ question: "", answer: "", points: 5, showAnswer: false }],
    },
  ]);
  const [currentSubsectionIndex, setCurrentSubsectionIndex] = useState(0);
  const [finalizedQuestions, setFinalizedQuestions] = useState([]);

  const finalizeQuestion = (subsectionIndex, questionIndex) => {
    const question = subsections[subsectionIndex].questions[questionIndex];
    setFinalizedQuestions([...finalizedQuestions, question]);
    const newSubsections = [...subsections];
    newSubsections[subsectionIndex].questions.splice(questionIndex, 1);
    setSubsections(newSubsections);
  };

  const handleAnswerChange = (subsectionIndex, questionIndex, event) => {
    const newSubsections = [...subsections];
    newSubsections[subsectionIndex].questions[questionIndex].answer =
      event.target.value;
    setSubsections(newSubsections);
  };

  const handlePointsChange = (subsectionIndex, questionIndex, event) => {
    const newSubsections = [...subsections];
    newSubsections[subsectionIndex].questions[questionIndex].points =
      event.target.value;
    setSubsections(newSubsections);
  };

  const addQuestion = () => {
    const newSubsections = [...subsections];
    newSubsections[currentSubsectionIndex].questions.push({
      question: "",
      answer: "",
      points: 5,
      showAnswer: false,
    });
    setSubsections(newSubsections);
  };

  const addSubsection = () => {
    setSubsections([...subsections, { name: "New Section", questions: [] }]);
    setCurrentSubsectionIndex(subsections.length); 
  };

  const removeSubsection = (index) => {
    const newSubsections = subsections.filter((_, i) => i !== index);
    setSubsections(newSubsections);
  };

  const removeQuestion = (subsectionIndex, questionIndex) => {
    const newSubsections = [...subsections];
    newSubsections[subsectionIndex].questions = newSubsections[
      subsectionIndex
    ].questions.filter((_, i) => i !== questionIndex);
    setSubsections(newSubsections);
  };

  const toggleAnswerKey = (subsectionIndex, questionIndex) => {
    const newSubsections = [...subsections];
    newSubsections[subsectionIndex].questions[questionIndex].showAnswer =
      !newSubsections[subsectionIndex].questions[questionIndex].showAnswer;
    setSubsections(newSubsections);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceSubsectionIndex = parseInt(source.droppableId.split("-")[1]);
    const destinationSubsectionIndex = parseInt(
      destination.droppableId.split("-")[1]
    );

    const sourceQuestions = Array.from(
      subsections[sourceSubsectionIndex].questions
    );
    const [removed] = sourceQuestions.splice(source.index, 1);
    const destinationQuestions = Array.from(
      subsections[destinationSubsectionIndex].questions
    );
    destinationQuestions.splice(destination.index, 0, removed);

    const newSubsections = [...subsections];
    newSubsections[sourceSubsectionIndex].questions = sourceQuestions;
    newSubsections[destinationSubsectionIndex].questions = destinationQuestions;

    setSubsections(newSubsections);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>

      <div className="question_generator">
        <Row
          xs={2}
          className="question_generator_header">
          <Col className="question_generator_header_title">
           
            <h6>
              Subject Name
            </h6>

   
          </Col>
          <Col
          className="question_generator_header_submit">
            <button>
              Submit
            </button>
          </Col>
        </Row>
        <Row>
          <div className="text-editor">
            {subsections.map((subsection, subsectionIndex) => (
              <Droppable
                key={subsectionIndex}
                droppableId={`droppable-${subsectionIndex}`}
                type="QUESTION"
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="subsection-container"
                  >
                    <div className="subsection_header">
                      <textarea
                        className="subsection_textarea"
                        type="text"
                        value={subsection.name}
                        onChange={(e) => {
                          const newSubsections = [...subsections];
                          newSubsections[subsectionIndex].name = e.target.value;
                          setSubsections(newSubsections);
                        }}
                        placeholder="Subsection Name"/>
                      <button onClick={() => removeSubsection(subsectionIndex)} >
                        <MdOutlineDelete
                          style={{ width: "32px", height: "32px" }}
                        />
                      </button>
                    </div>
                    {subsection.questions.map((q, questionIndex) => (
                      <Draggable
                        key={questionIndex}
                        draggableId={`draggable-${subsectionIndex}-${questionIndex}`}
                        index={questionIndex}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="question-container"
                          >
                            <div
                            className="teacher_question_header">
                              <div className="teacher_question_number">
                                <h6 style={{ fontSize: "20px" }}>
                                  Q. {questionIndex + 1})
                                </h6>
                              </div>
                              <TeacherTextEditor placeholder="Type question here..." />
                            </div>

                            <div className="teacher_question_footer"
                            >
                              <div
                                className="answer-key"
                                onClick={() =>
                                  toggleAnswerKey(
                                    subsectionIndex,
                                    questionIndex
                                  )
                                }
                              >
                                Answer Key
                              </div>
                              <div></div>
                            </div>

                            {q.showAnswer && (
                              <div className="answer_editor_container">
                                <TeacherTextEditor placeholder="Type answer here..." />
                                <div className="points-input">
                                  <span>Mark</span>
                                  <input
                                    type="number"
                                    value={q.points}
                                    onChange={(e) =>
                                      handlePointsChange(
                                        subsectionIndex,
                                        questionIndex,
                                        e
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            )}

                            <div className="question_actions">
                              <div
                                {...provided.dragHandleProps}
                                className="drag_handle"
                              >
                                <PiDotsSix className="teacher_icon"/>
                              </div>
                              <button
                              className="delete_question_button"
                                onClick={() =>
                                  removeQuestion(subsectionIndex, questionIndex)
                                }
                              >
                                <MdOutlineDelete className="teacher_icon"/>
                              </button>
                              <button className="done_button">
                                Done
                              </button>
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
            <Row className="action_buttons">
              <Col onClick={addQuestion}>
                <IoAddCircleOutline  className="teacher_icon" />
              </Col>
              <hr className="divider"
              ></hr>
              <Col onClick={addSubsection}>
                <TbSection 
                className="teacher_icon" />
              </Col>
            </Row>
          </div>
        </Row>
      </div>
    </DragDropContext>
  );
}

export default QuestionGenerator;
