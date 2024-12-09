import React, { useState, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  ProgressBar,
} from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import { TbSection } from "react-icons/tb";
import { PiDotsSix } from "react-icons/pi";
import TeacherTextEditor from "../teachertexteditor/TeacherTextEditor";
import "./teachermcqeditor.css";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

function TeacherMcq() {
  const location = useLocation();
  const formData = location.state;

  const teacher_subject = useSelector((state) => state?.teachersubjectinfo);

  console.log(teacher_subject, "teacher subjecttttttt");
  const APIURL = useSelector((state) => state.APIURL.url);

  console.log(formData, "formdat");

  const outOfMarks = formData?.outOfMarks;
  const individual_mark = formData?.individualMark;

  const maxQuestions = Math.floor(outOfMarks / individual_mark);

  console.log(outOfMarks, "asdasdsa");

  const navigate = useNavigate();

  const [sections, setSections] = useState([
    {
      name: "Main Section",
      questions: [
        {
          id: 1,
          question: "",
          answerKey: null,
          options: [],
        },
      ],
    },
  ]);

  const questionRefs = useRef([]);
  const [progress, setProgress] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  const [lastQuestionId, setLastQuestionId] = useState(1);

  const captureQuestionImage = async (sectionIndex, questionIndex) => {
    const questionElement = questionRefs.current[sectionIndex]?.[questionIndex];

    console.log(questionElement, "question element");
    if (!questionElement) {
      console.error("Question element not found");
      return null;
    }

    captureQuestionImage;

    try {
      const canvas = await html2canvas(questionElement, { scale: 1 });
      const imageData = canvas.toDataURL("image/png");
      return imageData;
    } catch (error) {
      console.error("Error capturing question:", error);
      return null;
    }
  };

  // Function to save the captured image in state
  const saveQuestionImage = async (sectionIndex, questionIndex) => {
    const imageData = await captureQuestionImage(sectionIndex, questionIndex);
    if (imageData) {
      const updatedSections = [...sections];
      updatedSections[sectionIndex].questions[questionIndex].questionImage =
        imageData;
      setSections(updatedSections);
    }
  };

  const exportQuestions = async () => {
    setIsExporting(true);
    let totalQuestions = 0;
    sections.forEach((section) => {
      totalQuestions += section.questions.length;
    });

    console.log("Total Questions:", totalQuestions);

    let completedQuestions = 0;
    let tempProgress = 0;
    const exportedData = [];

    // Loop through sections and questions
    for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex++) {
      const section = sections[sectionIndex];
      const exportedSection = { name: section.name, questions: [] };

      for (
        let questionIndex = 0;
        questionIndex < section.questions.length;
        questionIndex++
      ) {
        await saveQuestionImage(sectionIndex, questionIndex); // Ensure the image is saved
        const question = sections[sectionIndex].questions[questionIndex];

        exportedSection.questions.push({
          id: question.id,
          questionImage: question.questionImage, // Use the saved image
          answerKey: question.answerKey,
          options: question.options,
        });

        completedQuestions++;
        tempProgress = Math.round((completedQuestions / totalQuestions) * 100);
        setProgress(tempProgress); // Update progress locally
      }

      exportedData.push(exportedSection);
    }

    console.log("Exported Data:", exportedData);

    // Prepare the request data
    const requestData = {
      test: "MCQ", // You can adjust this value
      // formData: formData,
      duration: formData.duration,
      exam_name: formData.examName,
      out_of_mark: formData.outOfMarks,
      teacher_code: formData.teacherCode,
      topic: formData.topic,
      negative_marks: formData.negativeMark,
      individual_mark: formData.individualMark,
      class: teacher_subject.teachersubjectinfo?.class,
      division: teacher_subject.teachersubjectinfo?.division,
      subject: teacher_subject.teachersubjectinfo?.subject,
      admin: teacher_subject.teachersubjectinfo?.admin,
      questions: exportedData,
    };

    console.log(requestData, "requestData");

    try {
      // Send the data to the backend using Axios
      const response = await axios.post(`${APIURL}/api/test`, requestData);

      // Handle successful export
      if (response.status === 200) {
        alert("Export completed successfully!");
        navigate("/teachermcqlist");
      } else {
        alert("Failed to export questions.");
      }
    } catch (error) {
      console.error("Error exporting questions:", error);
      alert("Failed to export questions. Please try again.");
    } finally {
      // Reset progress and exporting state
      setIsExporting(false);
      setProgress(0);
    }
  };

  const addQuestion = (sectionIndex) => {
    const totalQuestions = sections.reduce(
      (acc, section) => acc + section.questions.length,
      0
    );

    if (totalQuestions >= maxQuestions) {
      Swal.fire({
        icon: "error",
        title: "Maximum Questions Limit Reached",
        text: `You can add a maximum of ${maxQuestions} questions.`,
      });
      return;
    }

    const defaultOptionCount = 4;
    const generateOptions = () =>
      Array.from(
        { length: defaultOptionCount },
        (_, i) => `Option ${String.fromCharCode(65 + i)}`
      );

    setSections((prev) => {
      const updatedSections = [...prev];

      // Ensure questions array exists for the section
      if (!updatedSections[sectionIndex].questions) {
        updatedSections[sectionIndex].questions = [];
      }

      const newQuestionId = lastQuestionId + 1; // Get the new question ID
      setLastQuestionId(newQuestionId); // Update the state for the last question ID

      updatedSections[sectionIndex].questions.push({
        id: newQuestionId, // Use the new question ID
        question: "",
        questionImage: null,
        answerKey: null,
        options: generateOptions(),
      });

      return updatedSections;
    });
  };
  // Function to update question text
  const updateQuestionText = (sectionIndex, questionIndex, value) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].questions[questionIndex].question = value;
    setSections(updatedSections);
  };

  const addSection = () => {
    const defaultOptionCount = 4;
    const generateOptions = () =>
      Array.from(
        { length: defaultOptionCount },
        (_, i) => `Option ${String.fromCharCode(65 + i)}`
      );

    setSections((prev) => [
      ...prev,
      {
        name: `Section ${prev.length + 1}`,
        questions: [
          {
            id: 1,
            question: "",
            questionImage: null,
            answerKey: null,
            options: generateOptions(),
          },
        ],
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
    setLastQuestionId(questionId - 1);
  };

  const handleOptionChange = (
    sectionIndex,
    questionIndex,
    optionIndex,
    value
  ) => {
    const newSections = [...sections];
    newSections[sectionIndex].questions[questionIndex].options[optionIndex] =
      value;
    setSections(newSections);
  };

  // const handleNumberOfOptionsChange = (
  //   sectionIndex,
  //   questionIndex,
  //   numberOfOptions
  // ) => {
  //   setSections((prev) => {
  //     const updatedSections = [...prev];
  //     const question = updatedSections[sectionIndex].questions[questionIndex];
  //     const currentOptions = question.options.slice(0, numberOfOptions);

  //     while (currentOptions.length < numberOfOptions) {
  //       currentOptions.push(
  //         `Option ${String.fromCharCode(65 + currentOptions.length)}`
  //       );
  //     }

  //     if (question.answerKey >= numberOfOptions) {
  //       question.answerKey = null;
  //     }

  //     question.options = currentOptions;
  //     return updatedSections;
  //   });
  // };

  const handleNumberOfOptionsChange = (
    sectionIndex,
    questionIndex,
    numberOfOptions
  ) => {
    setSections((prev) => {
      const updatedSections = [...prev];
      const question = updatedSections[sectionIndex].questions[questionIndex];

      // Slice the options to match the new number of options
      let currentOptions = question.options.slice(0, numberOfOptions);

      // If the options are fewer than the new number, add new options
      while (currentOptions.length < numberOfOptions) {
        currentOptions.push(
          `Option ${String.fromCharCode(65 + currentOptions.length)}`
        );
      }

      // Reset the answerKey if it's no longer valid
      if (question.answerKey >= numberOfOptions) {
        question.answerKey = null; // Reset answerKey if invalid
      }

      question.options = currentOptions;

      return updatedSections;
    });
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
    const destinationSectionIndex = parseInt(
      destination.droppableId.split("-")[1]
    );

    const sourceQuestions = Array.from(sections[sourceSectionIndex].questions);
    const [removed] = sourceQuestions.splice(source.index, 1);
    const destinationQuestions = Array.from(
      sections[destinationSectionIndex].questions
    );
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
            <Button
              variant="primary"
              onClick={exportQuestions}
              disabled={isExporting}
            >
              {isExporting ? `Exporting... ${progress}%` : "Export Questions"}
            </Button>{" "}
          </Col>
        </Row>

        {isExporting && (
          <Row className="my-3">
            <Col>
              <ProgressBar now={progress} label={`${progress}%`} />
            </Col>
          </Row>
        )}

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
                    ref={provided.innerRef} // Correctly assign ref for Droppable
                    {...provided.droppableProps}
                    className="section-container p-3 mb-4"
                  >
                    <div className="mcq_subsection_header">
                      <textarea
                        className="mcq_subsection_textarea"
                        type="text"
                        value={section.name}
                        onChange={(e) =>
                          handleSectionNameChange(sectionIndex, e.target.value)
                        }
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
                          <div className="mcq-question-container">
                            <div className="mock_question_header">
                              <div className="mock_question_number">
                                <h6 style={{ fontSize: "20px" }}>
                                  {question.id})
                                </h6>
                              </div>

                              <div
                                ref={(el) => {
                                  if (!questionRefs.current[sectionIndex]) {
                                    questionRefs.current[sectionIndex] = [];
                                  }
                                  questionRefs.current[sectionIndex][
                                    questionIndex
                                  ] = el;
                                }}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="mock-editor-wrapper"
                              >
                                <TeacherTextEditor
                                  placeholder="Type question here..."
                                  editorData={question.question}
                                  setEditorData={(data) => {
                                    const updatedSections = [...sections];
                                    updatedSections[sectionIndex].questions[
                                      questionIndex
                                    ].question = data;
                                    setSections(updatedSections);
                                  }}
                                  onBlur={() =>
                                    saveQuestionImage(
                                      sectionIndex,
                                      questionIndex
                                    )
                                  }
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
                                    value={question.options.length}
                                  >
                                    <option>Select Options</option>
                                    <option value={2}>Add 2 options</option>
                                    <option value={3}>Add 3 options</option>
                                    <option value={4}>Add 4 options</option>
                                    <option value={5}>Add 5 options</option>
                                    <option value={6}>Add 6 options</option>
                                    <option value={7}>Add 7 options</option>
                                    <option value={8}>Add 8 options</option>
                                  </Form.Select>
                                </Col>
                              </Row>
                              <Row xs={2}>
                                <Col>
                                  <div className="options-container d-flex flex-wrap">
                                    {question.options.map(
                                      (option, optionIndex) => (
                                        <div
                                          key={optionIndex}
                                          className="mcq-option-item d-flex align-items-center me-3"
                                        >
                                          <span className="me-1">
                                            {String.fromCharCode(
                                              65 + optionIndex
                                            )}
                                            .
                                          </span>
                                          <Form.Check
                                            type="radio"
                                            name={`answerKey-${sectionIndex}-${questionIndex}`}
                                            checked={
                                              question.answerKey === option
                                            }
                                            onChange={() => {
                                              const newSections = [...sections];
                                              newSections[
                                                sectionIndex
                                              ].questions[
                                                questionIndex
                                              ].answerKey = option;
                                              setSections(newSections);
                                            }}
                                            className="mcq-radio"
                                          />
                                        </div>
                                      )
                                    )}
                                  </div>
                                </Col>
                                <Col
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                  }}
                                >
                                  <button
                                    className="mk_delete_question_button"
                                    onClick={() =>
                                      removeQuestion(
                                        sectionIndex,
                                        questionIndex
                                      )
                                    }
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
              <Col onClick={() => addQuestion(sections.length - 1)}>
                {" "}
                {/* Pass the section index */}
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
