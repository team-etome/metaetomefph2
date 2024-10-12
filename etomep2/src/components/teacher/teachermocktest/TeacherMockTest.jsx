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

function TeacherMockTest() {
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
  const [lastQuestionId, setLastQuestionId] = useState(1); 
  const navigate = useNavigate();

  const APIURL = useSelector((state) => state.APIURL.url);

  console.log(APIURL,"api")
  const teacher_subject = useSelector((state) => state?.teachersubjectinfo);

  console.log(teacher_subject, "teacher subject");

  const location = useLocation();
  const formData = location?.state || {};

  const duration     =  formData.duration
  const examDate     =  formData.examDate
  const examName     =  formData.examName
  const outOfMarks   =  formData.outOfMarks
  const teacherCode  =  formData.teacherCode
  const topic        =  formData.topic

  const className    = teacher_subject.teachersubjectinfo?.class
  const division     = teacher_subject.teachersubjectinfo?.division
  const subject      = teacher_subject.teachersubjectinfo?.subject
  const admin        = teacher_subject.teachersubjectinfo?.admin


  console.log(admin,"adminnnnn")

  console.log(className,"durationnnnn")


  console.log(formData, "form dataaaaaa");

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
      const canvas = await html2canvas(element, { scale: 1 });
      const dataUrl = canvas.toDataURL("image/png");
      console.log("Capture successful", dataUrl);
      return dataUrl;
    } catch (error) {
      console.error("Error capturing element:", error);
      return "Error capturing element";
    }
  };

  const exportQuestionsToJson = async () => {
    try {
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
  
      console.log("Captured data: ", sectionsWithImages);
      setExportedData(sectionsWithImages);
      await sendToBackend(sectionsWithImages,APIURL);
    } catch (error) {
      console.error("Error during export:", error);
      Swal.close(); // Close the loader in case of any error
      Swal.fire({
        icon: "error",
        title: "Export failed!",
        text: "There was an issue during the export process.",
        showConfirmButton: true,
      });
    }
  };




  const sendToBackend = async (sectionsWithImages,  APIURL) => {
    const data = {
      // question_id: exam_id,
      questions     : sectionsWithImages,
      duration      : duration || "default_duration",
      exam_date     : examDate || "default_examDate",
      exam_name     : examName || "default_examName",
      out_of_mark   : outOfMarks || "default_outOfMarks",
      teacher_code  : teacherCode || "default_teacherCode",
      topic         : topic || "default_topic",
      class         : className ,
      division      : division,
      subject       : subject ,
      admin         : admin,
      test          : "Mock Test",
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
