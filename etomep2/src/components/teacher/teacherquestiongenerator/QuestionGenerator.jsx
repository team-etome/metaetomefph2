import React, { useState, useEffect, useCallback, useRef } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../teacherquestiongenerator/questiongenerator.css";
import { IoAddCircleOutline } from "react-icons/io5";
import { TbSection } from "react-icons/tb";
import TeacherTextEditor from "../teachertexteditor/TeacherTextEditor";
import { MdOutlineDelete } from "react-icons/md";
import { PiDotsSix } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { IoChevronBackSharp } from "react-icons/io5";


function QuestionGenerator() {
  const [subsections, setSubsections] = useState([
    {
      name: "Main Section",
      questions: [
        { id: 1, question: "", answer: "", points: 5, showAnswer: false },
      ],
    },
  ]);

  const [currentSubsectionIndex, setCurrentSubsectionIndex] = useState(0);
  const [exportedData, setExportedData] = useState([]);
  const questionRefs = useRef([]);
  const answerRefs = useRef([]);
  const [triggerExport, setTriggerExport] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [lastQuestionId, setLastQuestionId] = useState(1); // State to track last question ID
  const navigate = useNavigate();

  const APIURL = useSelector((state) => state.APIURL.url);
  const exampaperinfo = useSelector((state) => state.exampaperinfo);

  const exam_id = exampaperinfo.exampaperinfo?.id;
  console.log(exam_id, "exam id");
  console.log(exampaperinfo, "exampaperinfo reducer");

  useEffect(() => {
    if (triggerExport) {
      setTimeout(() => {
        setTriggerExport(false);
        exportQuestionsToJson();
      }, 500);
    }
  }, [triggerExport]);

  const handlePointsChange = (subsectionIndex, questionIndex, event) => {
    const newSubsections = [...subsections];
    newSubsections[subsectionIndex].questions[questionIndex].points =
      event.target.value;
    setSubsections(newSubsections);
  };

  const addQuestion = () => {
    const newSubsections = [...subsections];
    const newQuestionId = lastQuestionId + 1;
    newSubsections[currentSubsectionIndex].questions.push({
      id: newQuestionId,
      question: "",
      answer: "",
      points: 5,
      showAnswer: false,
    });
    setSubsections(newSubsections);
    setLastQuestionId(newQuestionId);
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

  const handleEditorData = useCallback(
    (subsectionIndex, questionIndex, key, data) => {
      const updatedSubsections = subsections.map((sub, idx) => {
        if (idx === subsectionIndex) {
          const updatedQuestions = sub.questions.map((q, qIdx) => {
            if (qIdx === questionIndex) {
              return { ...q, [key]: data };
            }
            return q;
          });
          return { ...sub, questions: updatedQuestions };
        }
        return sub;
      });
      setSubsections(updatedSubsections);
    },
    [subsections]
  );

  const captureElement = async (element) => {
    if (!element) {
      console.error("Element not found");
      return "Element not captured";
    }
    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const dataUrl = canvas.toDataURL("image/png");
      console.log("Capture successful", dataUrl);
      return dataUrl;
    } catch (error) {
      console.error("Error capturing element:", error);
      return "Error capturing element";
    }
  };

  const exportQuestionsToJson = async () => {
    Swal.fire({
      title: "Exporting...",
      text: "Please wait while we export the questions.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    console.log("Capturing questions and answers as images...");

    const sectionsWithImages = await Promise.all(
      subsections.map(async (subsection, sectionIndex) => {
        const questionsWithImages = await Promise.all(
          subsection.questions.map(async (q, questionIndex) => {
            const questionElement =
              questionRefs.current[sectionIndex]?.[
                questionIndex
              ]?.getEditorRef();
            const answerElement =
              answerRefs.current[sectionIndex]?.[questionIndex]?.getEditorRef();

            console.log(questionElement, "question Element "); // Debug log
            console.log(answerElement, "answer Element "); // Debug log

            const questionImage = questionElement
              ? await captureElement(questionElement)
              : "Image not captured";
            const answerImage = answerElement
              ? await captureElement(answerElement)
              : "Image not captured";

            return {
              question_number: q.id,
              question: questionImage,
              answer: answerImage,
              marks: q.points,
            };
          })
        );

        return {
          sectionName: subsection.name,
          questions: questionsWithImages,
        };
      })
    );

    setExportedData(sectionsWithImages);
    console.log("dataaaaaassssss", JSON.stringify(sectionsWithImages, null, 2));
    sendToBackend(sectionsWithImages);
  };

  const sendToBackend = async (sectionsWithImages) => {
    const data = {
      question_id: exam_id,
      data: sectionsWithImages,
    };

    try {
      const response = await axios.post(
        `${APIURL}/api/questionpapersetting`,
        data
      );
      setSuccessMessage("Export successful!");
      console.log("Data successfully sent to the backend:", response.data);
      Swal.close(); // Close the loader
      Swal.fire({
        icon: "success",
        title: "Export successful!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate("/teacherexamination");
      });
    } catch (error) {
      setSuccessMessage("Export failed!");
      console.error("Error sending data to the backend:", error);
      Swal.close(); // Close the loader
      Swal.fire({
        icon: "error",
        title: "Export failed!",
        text: "There was an issue exporting the questions.",
        showConfirmButton: true,
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleExport = () => {
    setLoading(true); // Start loading as soon as export is initiated
    setTriggerExport(true); // Set the trigger to initiate the export
  };
const handleBackClick = () => {
  navigate('/teacherquestionview')
}
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="question_generator">
        <Row xs={2} className="question_generator_header">
          <Col className="question_generator_header_title">
          <IoChevronBackSharp onClick={handleBackClick}className="teacher_question_back" />
            <h6>Subject Namerrrrrrrrr</h6>
          </Col>
          <Col className="question_generator_header_submit">
            <button onClick={handleExport} disabled={loading}>
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Export Questions"
              )}
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
                        placeholder="Subsection Name"
                      />
                      <div onClick={() => removeSubsection(subsectionIndex)}>
                        <MdOutlineDelete
                          style={{ width: "32px", height: "32px" }}
                        />
                      </div>
                    </div>
                    {subsection.questions.map((q, questionIndex) => {
                      // Initialize refs array for the subsection if not already initialized
                      if (!questionRefs.current[subsectionIndex]) {
                        questionRefs.current[subsectionIndex] = [];
                      }
                      if (!answerRefs.current[subsectionIndex]) {
                        answerRefs.current[subsectionIndex] = [];
                      }

                      return (
                        <Draggable
                          key={q.id}
                          draggableId={`draggable-${subsectionIndex}-${q.id}`}
                          index={questionIndex}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="question-container"
                            >
                              <div className="teacher_question_header">
                                <div className="teacher_question_number">
                                  <h6 style={{ fontSize: "20px" }}>{q.id})</h6>
                                </div>
                                <div className="editor-wrapper">
                                  <TeacherTextEditor
                                    ref={(el) =>
                                    (questionRefs.current[subsectionIndex][
                                      questionIndex
                                    ] = el)
                                    }
                                    placeholder="Type question here..."
                                    // style={{textTransform: "capitalize"}}
                                    editorData={q.question}
                                    setEditorData={(data) =>
                                      handleEditorData(
                                        subsectionIndex,
                                        questionIndex,
                                        "question",
                                        data
                                      )
                                    }

                                  />
                                </div>
                              </div>

                              <div className="teacher_question_footer">
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

                              </div>

                              {q.showAnswer && (
                                <div className="answer_editor_container">
                                  <div className="editor-wrapper">
                                    <TeacherTextEditor
                                      ref={(el) =>
                                      (answerRefs.current[subsectionIndex][
                                        questionIndex
                                      ] = el)
                                      }
                                      placeholder="Type answer here..."
                                      editorData={q.answer}
                                      setEditorData={(data) =>
                                        handleEditorData(
                                          subsectionIndex,
                                          questionIndex,
                                          "answer",
                                          data
                                        )
                                      }

                                    />
                                  </div>
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
                                  <PiDotsSix className="teacher_icon" />
                                </div>
                                <button
                                  className="delete_question_button"
                                  onClick={() =>
                                    removeQuestion(
                                      subsectionIndex,
                                      questionIndex
                                    )
                                  }
                                >
                                  <MdOutlineDelete className="teacher_icon" />
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
            <Row className="action_buttons">
              <Col onClick={addQuestion}>
                <IoAddCircleOutline className="teacher_icon" />
              </Col>
              <hr className="divider"></hr>
              <Col onClick={addSubsection}>
                <TbSection className="teacher_icon" />
              </Col>
            </Row>
          </div>
        </Row>
      </div>
    </DragDropContext>
  );
}

export default QuestionGenerator;