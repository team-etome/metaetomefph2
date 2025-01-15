import React, { useState, useEffect, useCallback, useRef } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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
import "../teachermocktest/teachermocktest.css";
import { useLocation } from "react-router-dom";
import pLimit from "p-limit";

function TeacherMockTest() {
  const [subsections, setSubsections] = useState([
    {
      name: "Main Section",
      questions: [
        { id: 1, question: "", answer: "", points: 0, showAnswer: false },
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
  const [lastQuestionId, setLastQuestionId] = useState(1);
  const navigate = useNavigate();

  const APIURL = useSelector((state) => state.APIURL.url);

  console.log(APIURL, "api");
  const teacher_subject = useSelector((state) => state?.teachersubjectinfo);

  console.log(teacher_subject, "teacher subject");

  const location = useLocation();
  const formData = location?.state || {};

  const duration = formData.duration;
  const examDate = formData.examDate;
  const examName = formData.examName;
  const outOfMarks = formData.outOfMarks;
  const teacherCode = formData.teacherCode;
  const topic = formData.topic;

  const className = teacher_subject.teachersubjectinfo?.class;
  const division = teacher_subject.teachersubjectinfo?.division;
  const subject = teacher_subject.teachersubjectinfo?.subject;
  const admin = teacher_subject.teachersubjectinfo?.admin;

  console.log(admin, "adminnnnn");

  console.log(outOfMarks, "outOfMarks");

  console.log(formData, "form dataaaaaa");

  useEffect(() => {
    if (triggerExport) {
      setTimeout(() => {
        setTriggerExport(false);
        exportQuestionsToJson();
      }, 500);
    }
  }, [triggerExport]);

  // const handlePointsChange = (subsectionIndex, questionIndex, event) => {
  //   const newSubsections = [...subsections];
  //   newSubsections[subsectionIndex].questions[questionIndex].points =
  //     event.target.value;
  //   setSubsections(newSubsections);
  // };

  const handlePointsChange = (subsectionIndex, questionIndex, event) => {
    const newPoints = parseInt(event.target.value, 10);

    if (isNaN(newPoints) && event.target.value !== "") {
      // Allow the user to enter valid numbers, or leave empty (backspace).
      return;
    }

    // If the user backspaces and the value becomes empty, we allow it.
    if (event.target.value === "") {
      const newSubsections = [...subsections];
      newSubsections[subsectionIndex].questions[questionIndex].points = 0;
      setSubsections(newSubsections);
      return;
    }

    // Temporarily update the question's points value
    const newSubsections = [...subsections];
    const currentQuestion =
      newSubsections[subsectionIndex].questions[questionIndex];
    currentQuestion.points = newPoints;

    // Calculate the total points for the subsection
    const totalPoints = newSubsections[subsectionIndex].questions.reduce(
      (sum, question) => sum + question.points,
      0
    );

    if (totalPoints > outOfMarks) {
      // If total points exceed outOfMarks, reset the question's points to the previous value
      currentQuestion.points = parseInt(event.target.defaultValue, 10); // use default value if the new value exceeds max
      Swal.fire({
        icon: "error",
        title: "Exceeds Maximum Marks!",
        text: `Total marks cannot exceed the maximum limit of ${outOfMarks}`,
        showConfirmButton: true,
      });
    } else {
      setSubsections(newSubsections); // Update state if within limit
    }
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
      const canvas = await html2canvas(element, { scale: 1 });
      const dataUrl = canvas.toDataURL("image/png");
      console.log("Capture successful", dataUrl);
      return dataUrl;
    } catch (error) {
      console.error("Error capturing element:", error);
      return "Error capturing element";
    }
  };

  // const exportQuestionsToJson = async () => {
  //   try {
  //     Swal.fire({
  //       title: "Exporting...",
  //       text: "Please wait while we export the questions.",
  //       allowOutsideClick: false,
  //       didOpen: () => {
  //         Swal.showLoading();
  //       },
  //     });

  //     console.log("Capturing questions and answers as images...");

  //     const sectionsWithImages = await Promise.all(
  //       subsections.map(async (subsection, sectionIndex) => {
  //         const questionsWithImages = await Promise.all(
  //           subsection.questions.map(async (q, questionIndex) => {
  //             const questionElement =
  //               questionRefs.current[sectionIndex]?.[
  //                 questionIndex
  //               ]?.getEditorRef();
  //             const answerElement =
  //               answerRefs.current[sectionIndex]?.[questionIndex]?.getEditorRef();

  //             const questionImage = questionElement
  //               ? await captureElement(questionElement)
  //               : "Image not captured";
  //             const answerImage = answerElement
  //               ? await captureElement(answerElement)
  //               : "Image not captured";

  //             return {
  //               question_number: q.id,
  //               question: questionImage,
  //               answer: answerImage,
  //               marks: q.points,
  //             };
  //           })
  //         );

  //         return {
  //           sectionName: subsection.name,
  //           questions: questionsWithImages,
  //         };
  //       })
  //     );

  //     console.log("Captured data: ", sectionsWithImages);
  //     setExportedData(sectionsWithImages);
  //     await sendToBackend(sectionsWithImages,APIURL);
  //   } catch (error) {
  //     console.error("Error during export:", error);
  //     Swal.close(); // Close the loader in case of any error
  //     Swal.fire({
  //       icon: "error",
  //       title: "Export failed!",
  //       text: "There was an issue during the export process.",
  //       showConfirmButton: true,
  //     });
  //   }
  // };

  const exportQuestionsToJson = async () => {
    const limit = pLimit(5); // Limit to 5 concurrent requests at a time

    try {
      let totalQuestions = subsections.reduce(
        (sum, subsection) => sum + subsection.questions.length,
        0
      );
      let completedQuestions = 0;

      Swal.fire({
        title: "Exporting...",
        html: '<div id="progress-bar-container" style="margin-top: 10px;"></div>',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
          const progressBarContainer = Swal.getHtmlContainer().querySelector(
            "#progress-bar-container"
          );
          if (progressBarContainer) {
            progressBarContainer.innerHTML = `
              <div style="width: 100%; background-color: #e0e0e0; border-radius: 5px;">
                <div id="progress-bar" style="width: 0%; background-color: #4caf50; height: 20px; border-radius: 5px;"></div>
              </div>
              <p id="progress-text" style="text-align: center; margin-top: 10px;">0 / ${totalQuestions} Questions Exported</p>
            `;
          }
        },
      });

      const updateProgressBar = () => {
        const progressBar =
          Swal.getHtmlContainer().querySelector("#progress-bar");
        const progressText =
          Swal.getHtmlContainer().querySelector("#progress-text");
        if (progressBar && progressText) {
          const progressPercentage = Math.round(
            (completedQuestions / totalQuestions) * 100
          );
          progressBar.style.width = `${progressPercentage}%`;
          progressText.innerText = `${completedQuestions} / ${totalQuestions} Questions Exported`;
        }
      };

      const sectionsWithImages = await Promise.all(
        subsections.map(async (subsection, sectionIndex) => {
          const questionsWithImages = await Promise.all(
            subsection.questions.map((q, questionIndex) => {
              return limit(async () => {
                const questionElement =
                  questionRefs.current[sectionIndex]?.[
                    questionIndex
                  ]?.getEditorRef();
                const answerElement =
                  answerRefs.current[sectionIndex]?.[
                    questionIndex
                  ]?.getEditorRef();

                const questionImage = questionElement
                  ? await captureElement(questionElement)
                  : "Image not captured";
                const answerImage = answerElement
                  ? await captureElement(answerElement)
                  : "Image not captured";

                completedQuestions++;
                updateProgressBar();

                return {
                  question_number: q.id,
                  question: questionImage,
                  answer: answerImage,
                  marks: q.points,
                };
              });
            })
          );

          return {
            sectionName: subsection.name,
            questions: questionsWithImages,
          };
        })
      );

      console.log("Captured data: ", sectionsWithImages);
      setExportedData(sectionsWithImages);
      await sendToBackend(sectionsWithImages, APIURL);

      Swal.fire({
        icon: "success",
        title: "Export successful!",
        text: "The questions were successfully exported.",
        showConfirmButton: true,
      });
    } catch (error) {
      console.error("Error during export:", error);
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Export failed!",
        text: "There was an issue during the export process.",
        showConfirmButton: true,
      });
    }
  };

  const sendToBackend = async (sectionsWithImages, APIURL) => {
    const data = {
      // question_id: exam_id,
      questions: sectionsWithImages,
      duration: duration || "default_duration",
      exam_date: examDate || "default_examDate",
      exam_name: examName || "default_examName",
      out_of_mark: outOfMarks || "default_outOfMarks",
      teacher_code: teacherCode || "default_teacherCode",
      topic: topic || "default_topic",
      class: className,
      division: division,
      subject: subject,
      admin: admin,
      test: "Mock Test",
    };

    try {
      const response = await axios.post(`${APIURL}/api/test`, data);
      console.log("Data successfully sent to the backend:", response.data);
      Swal.close();
      Swal.fire({
        icon: "success",
        title: "Export successful!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate("/teachertestlist");
      });
    } catch (error) {
      console.error("Error sending data to the backend:", error);
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Export failed!",
        text: "There was an issue exporting the questions.",
        showConfirmButton: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    setLoading(true); // Start loading as soon as export is initiated
    setTriggerExport(true); // Set the trigger to initiate the export
  };
  const handleBackClick = () => {
    navigate("/teachertestadd");
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="mock_question_generator">
        <Row xs={2} className="mock_test_generator_header">
          <Col className="mock_test_generator_header_title">
            {/* <h6>Subject Namerrrrrrrrr</h6> */}
          </Col>
          <Col className="mock_generator_header_submit">
            <button onClick={handleExport} disabled={loading}>
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Export Questions"
              )}
            </button>
          </Col>
        </Row>
        <Row className="tst_gen_bdy">
          <div className="mock_text_editor">
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
                    className="mock-subsection-container"
                  >
                    <div className="mock_subsection_header">
                      <textarea
                        className="mock_subsection_textarea"
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
                              className="mock-question-container"
                            >
                              <div className="mock_question_header">
                                <div className="mock_question_number">
                                  <h6 style={{ fontSize: "20px" }}>{q.id})</h6>
                                </div>
                                <div className="mock-editor-wrapper">
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

                              <div className="mock_question_footer">
                                <div
                                  className="mock-answer-key"
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
                                <div className="mk_answer_editor_container">
                                  <div className="mock-editor-wrapper">
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
                                  <div className="mk-points-input">
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

                              <div className="mk_question_actions">
                                <div
                                  {...provided.dragHandleProps}
                                  className="mk_drag_handle"
                                >
                                  <PiDotsSix className="mk_icon" />
                                </div>
                                <button
                                  className="mk_delete_question_button"
                                  onClick={() =>
                                    removeQuestion(
                                      subsectionIndex,
                                      questionIndex
                                    )
                                  }
                                >
                                  <MdOutlineDelete className="mk_icon" />
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
            <Row className="mk_action_buttons">
              <Col onClick={addQuestion}>
                <IoAddCircleOutline className="mk_icon" />
              </Col>
              <hr className="mk_divider"></hr>
              <Col onClick={addSubsection}>
                <TbSection className="mk_icon" />
              </Col>
            </Row>
          </div>
        </Row>
      </div>
    </DragDropContext>
  );
}

export default TeacherMockTest;
