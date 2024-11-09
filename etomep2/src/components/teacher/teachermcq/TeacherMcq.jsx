import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import { TbSection } from "react-icons/tb";
import { PiDotsSix } from "react-icons/pi";
import TeacherTextEditor from "../teachertexteditor/TeacherTextEditor";
import "./teachermcqeditor.css";

function TeacherMcq() {
  const [sections, setSections] = useState([
    {
      name: "Main Section",
      questions: [
        {
          id: 1,
          question: "",
          answerKey: "",
          options: ["", "", "", ""],
        },
      ],
    },
  ]);

  const [lastQuestionId, setLastQuestionId] = useState(1);

  const addQuestion = () => {
    const newSections = [...sections];
    const newQuestionId = lastQuestionId + 1;
    const lastSectionIndex = newSections.length - 1;

    newSections[lastSectionIndex].questions.push({
      id: newQuestionId, // Use the global lastQuestionId for continuity
      question: "",
      answerKey: "",
      options: ["", "", "", ""],
    });

    setSections(newSections);
    setLastQuestionId(newQuestionId); // Update the lastQuestionId globally
  };

  const addSection = () => {
    setSections([
      ...sections,
      {
        name: `Section ${sections.length + 1}`,
        questions: [],
      },
    ]);
  };

  const removeSection = (sectionIndex) => {
    const newSections = sections.filter((_, i) => i !== sectionIndex);
    setSections(newSections);
  };

  const removeQuestion = (sectionIndex, questionIndex) => {
    const newSections = [...sections];

    // Remove the selected question
    newSections[sectionIndex].questions.splice(questionIndex, 1);

    // Rebuild all question IDs for continuity across sections
    let questionId = 1;
    newSections.forEach((section) => {
      section.questions.forEach((question) => {
        question.id = questionId++;
      });
    });

    setSections(newSections);
    setLastQuestionId(questionId - 1); // Update lastQuestionId to the highest used ID
  };

  const handleOptionChange = (sectionIndex, questionIndex, optionIndex, value) => {
    const newSections = [...sections];
    newSections[sectionIndex].questions[questionIndex].options[optionIndex] = value;
    setSections(newSections);
  };

  const handleNumberOfOptionsChange = (sectionIndex, questionIndex, numberOfOptions) => {
    const newSections = [...sections];
    const currentOptions = newSections[sectionIndex].questions[questionIndex].options;
    const updatedOptions = currentOptions.slice(0, numberOfOptions);
    while (updatedOptions.length < numberOfOptions) {
      updatedOptions.push("");
    }
    newSections[sectionIndex].questions[questionIndex].options = updatedOptions;
    setSections(newSections);
  };

  const handleSectionNameChange = (index, newName) => {
    const newSections = [...sections];
    newSections[index].name = newName;
    setSections(newSections);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    const sourceSectionIndex = parseInt(source.droppableId.split("-")[1]);
    const destinationSectionIndex = parseInt(destination.droppableId.split("-")[1]);

    const sourceQuestions = Array.from(sections[sourceSectionIndex].questions);
    const [removed] = sourceQuestions.splice(source.index, 1);
    const destinationQuestions = Array.from(sections[destinationSectionIndex].questions);
    destinationQuestions.splice(destination.index, 0, removed);

    const newSections = [...sections];
    newSections[sourceSectionIndex].questions = sourceQuestions;
    newSections[destinationSectionIndex].questions = destinationQuestions;

    setSections(newSections);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container fluid className="mcq-generator">
        <Row xs={2} className="mcq_header_row">
          <Col className="mcq_generator_header_title">
            <h6>Fundamentals of Digital Systems</h6>
          </Col>
          <Col className="mcq_generator_header_submit">
            <Button variant="primary">Export Questions</Button>
          </Col>
        </Row>

        <Row className="mcq_gen_bdy">
          <div className="mcq_text_editor">
            {sections.map((section, sectionIndex) => (
              <Droppable
                key={sectionIndex}
                droppableId={`section-${sectionIndex}`}
                type="QUESTION"
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="section-container p-3 mb-4"
                  >
                    <div className="mcq_subsection_header">
                      <textarea
                        className="mcq_subsection_textarea"
                        type="text"
                        value={section.name}
                        onChange={(e) => handleSectionNameChange(sectionIndex, e.target.value)}
                        placeholder="Section Name"
                      />
                      <MdOutlineDelete
                        style={{ width: "32px", height: "32px" }}
                        onClick={() => removeSection(sectionIndex)}
                      />
                    </div>

                    {section.questions.map((question, questionIndex) => (
                      <Draggable
                        key={question.id}
                        draggableId={`question-${sectionIndex}-${question.id}`}
                        index={questionIndex}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="mcq-question-container"
                          >
                            <div className="mock_question_header">
                              <div className="mock_question_number">
                                <h6 style={{ fontSize: "20px" }}>{question.id})</h6>
                              </div>
                              <div className="mock-editor-wrapper">
                                <TeacherTextEditor
                                  placeholder="Type question here..."
                                  editorData={question.question}
                                  setEditorData={(data) => {
                                    const newSections = [...sections];
                                    newSections[sectionIndex].questions[questionIndex].question = data;
                                    setSections(newSections);
                                  }}
                                />
                              </div>
                            </div>

                            <Row className="mt-3">
                              <Row>
                                <Col>
                                  <h6>Answer Key</h6>
                                </Col>
                                <Col xs={3}>
                                  <Form.Select
                                    onChange={(e) =>
                                      handleNumberOfOptionsChange(
                                        sectionIndex,
                                        questionIndex,
                                        parseInt(e.target.value)
                                      )
                                    }
                                    defaultValue={4}
                                  >
                                    <option value={2}>Add 2 options</option>
                                    <option value={3}>Add 3 options</option>
                                    <option value={4}>Add 4 options</option>
                                    <option value={5}>Add 5 options</option>
                                  </Form.Select>
                                </Col>
                              </Row>
                              <Row xs={2}>
                                <Col>
                                  <div className="options-container d-flex flex-wrap">
                                    {question.options.map((option, optionIndex) => (
                                      <div
                                        key={optionIndex}
                                        className="mcq-option-item d-flex align-items-center me-3"
                                      >
                                        <span className="me-1">{String.fromCharCode(97 + optionIndex)}.</span>
                                        <Form.Check
                                          type="radio"
                                          name={`answerKey-${sectionIndex}-${questionIndex}`}
                                          checked={question.answerKey === optionIndex}
                                          onChange={() => {
                                            const newSections = [...sections];
                                            newSections[sectionIndex].questions[questionIndex].answerKey = optionIndex;
                                            setSections(newSections);
                                          }}
                                          className="mcq-radio"
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </Col>
                                <Col style={{ display: "flex", justifyContent: "flex-end" }}>
                                  <button
                                    className="mk_delete_question_button"
                                    onClick={() => removeQuestion(sectionIndex, questionIndex)}
                                  >
                                    <MdOutlineDelete className="mk_icon" />
                                  </button>
                                </Col>
                              </Row>
                            </Row>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}

            <Row className="mk_action_buttons">
              <Col onClick={addQuestion}>
                <IoAddCircleOutline className="mk_icon" />
              </Col>
              <hr className="mk_divider" />
              <Col onClick={addSection}>
                <TbSection className="mk_icon" />
              </Col>
            </Row>
          </div>
        </Row>
      </Container>
    </DragDropContext>
  );
}

export default TeacherMcq;