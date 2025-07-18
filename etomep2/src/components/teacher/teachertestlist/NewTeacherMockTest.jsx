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
import "./newteachermocktest.css";
import { useLocation } from "react-router-dom";

function NewTeacherMockTest({ formData, class_name, division, subject, onTestAdded, editData, isEditMode }) {
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
  const teacher_subject = useSelector((state) => state?.teachersubjectinfo);
  console.log(teacher_subject,"teacher_subjectteacher_subjectteacher_subjectteacher_subject")
  const admin = teacher_subject.teachersubjectinfo?.admin
  console.log(admin,"adminadminadminadminadmin  ")
  
  // Fallback: try to get admin from admininfo if not available in teachersubjectinfo
  const admininfo = useSelector((state) => state.admininfo);
  const admin_id = admininfo.admininfo?.admin_id;
  console.log(admin_id, "admin_id from admininfo")

  const navigate = useNavigate();

  const APIURL = useSelector((state) => state.APIURL.url);

  console.log(APIURL, "api")
  

  const duration = formData?.duration
  const examDate = formData?.examDate
  const examName = formData?.examName
  const outOfMarks = formData?.outOfMarks
  const teacherCode = formData?.teacherCode
  const topic = formData?.topic

  const className = class_name
  const divisionName = division
  const subjectName = subject

  // console.log(adminId, "adminnnnn")

  console.log(outOfMarks, "outOfMarks")

  console.log(formData, "form dataaaaaa");

  // Load existing questions when in edit mode
  useEffect(() => {
    if (isEditMode && editData && editData.questions) {
      const existingSubsections = editData.questions.map((section, sectionIndex) => ({
        name: section.sectionName || `Section ${sectionIndex + 1}`,
        questions: section.questions.map((q, questionIndex) => ({
          id: q.question_number || questionIndex + 1,
          question: q.question,
          answer: q.answer,
          points: q.marks || 0,
          showAnswer: q.answer && q.answer !== 'Image not captured',
        }))
      }));
      setSubsections(existingSubsections);
      setLastQuestionId(Math.max(...existingSubsections.flatMap(s => s.questions.map(q => q.id)), 1));
    }
  }, [isEditMode, editData]);

  useEffect(() => {
    if (triggerExport) {
      setTimeout(() => {
        setTriggerExport(false);
        exportQuestionsToJson();
      }, 500);
    }
  }, [triggerExport]);

  const handlePointsChange = (subsectionIndex, questionIndex, event) => {
    // In edit mode, don't allow changes
    if (isEditMode) return;

    const newPoints = parseInt(event.target.value, 10) || 0;
    
    // Calculate current total allocated marks (excluding the current question being edited)
    const currentTotalAllocatedMarks = subsections.reduce(
      (acc, subsection) =>
        acc +
        subsection.questions.reduce((sum, q, qIdx) => {
          // Skip the current question being edited
          if (subsection === subsections[subsectionIndex] && qIdx === questionIndex) {
            return sum;
          }
          return sum + q.points;
        }, 0),
      0
    );

    // Calculate what the new total would be
    const newTotalAllocatedMarks = currentTotalAllocatedMarks + newPoints;

    if (newTotalAllocatedMarks > outOfMarks) {
      const remainingMarks = outOfMarks - currentTotalAllocatedMarks;
      Swal.fire({
        icon: "error",
        title: "Exceeds Total Marks",
        text: `Total allocated marks (${newTotalAllocatedMarks}) cannot exceed the exam total (${outOfMarks}). You have ${remainingMarks} marks remaining.`,
        confirmButtonText: "OK"
      });
      return;
    }

    // Validate that points are not negative
    if (newPoints < 0) {
      Swal.fire({
        icon: "error",
        title: "Invalid Marks",
        text: "Marks cannot be negative. Please enter a valid number.",
        confirmButtonText: "OK"
      });
      return;
    }

    const newSubsections = [...subsections];
    newSubsections[subsectionIndex].questions[questionIndex].points = newPoints;
    setSubsections(newSubsections);
  };

  const addQuestion = () => {
    // In edit mode, don't allow adding questions
    if (isEditMode) return;

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
    // In edit mode, don't allow adding subsections
    if (isEditMode) return;

    setSubsections([...subsections, { name: "New Section", questions: [] }]);
    setCurrentSubsectionIndex(subsections.length);
  };

  const removeSubsection = (index) => {
    // In edit mode, don't allow removing subsections
    if (isEditMode) return;

    const newSubsections = subsections.filter((_, i) => i !== index);
    setSubsections(newSubsections);
  };

  const removeQuestion = (subsectionIndex, questionIndex) => {
    // In edit mode, don't allow removing questions
    if (isEditMode) return;

    const newSubsections = [...subsections];
    newSubsections[subsectionIndex].questions = newSubsections[
      subsectionIndex
    ].questions.filter((_, i) => i !== questionIndex);
    setSubsections(newSubsections);
  };

  const toggleAnswerKey = (subsectionIndex, questionIndex) => {
    // In edit mode, don't allow toggling answer key
    if (isEditMode) return;

    const newSubsections = [...subsections];
    newSubsections[subsectionIndex].questions[questionIndex].showAnswer =
      !newSubsections[subsectionIndex].questions[questionIndex].showAnswer;
    setSubsections(newSubsections);
  };

  const onDragEnd = (result) => {
    // In edit mode, don't allow drag and drop
    if (isEditMode) return;

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
      // In edit mode, don't allow editing
      if (isEditMode) return;

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
    [subsections, isEditMode]
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
      await sendToBackend(sectionsWithImages, APIURL);
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
      division: divisionName,
      subject: subjectName,
      admin: admin || admin_id, // Use admin from teachersubjectinfo or fallback to admin_id
      test: "Mock Test",
    };

    try {
      const response = await axios.post(`${APIURL}/api/test`, data);
      console.log("Data successfully sent to the backend:", response.data);
      Swal.close();
      Swal.fire({
        icon: "success",
        title: "Export successful!",
        // showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        if (onTestAdded) {
          onTestAdded(); // This will handle going back to the listing
        }
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
    // Calculate total allocated marks
    const totalAllocatedMarks = subsections.reduce(
      (acc, subsection) =>
        acc +
        subsection.questions.reduce((sum, q) => sum + q.points, 0),
      0
    );

    // Check if marks are properly allocated
    if (totalAllocatedMarks === 0) {
      Swal.fire({
        icon: "warning",
        title: "No Marks Allocated",
        text: "Please allocate marks to at least one question before submitting.",
        confirmButtonText: "OK",
        confirmButtonColor: "#d97706"
      });
      return;
    }

    if (totalAllocatedMarks < outOfMarks) {
      const remainingMarks = outOfMarks - totalAllocatedMarks;
      Swal.fire({
        icon: "warning",
        title: "Marks Not Fully Allocated",
        html: `
          <div style="text-align: left;">
            <p><strong>Total allocated:</strong> ${totalAllocatedMarks} marks</p>
            <p><strong>Exam total:</strong> ${outOfMarks} marks</p>
            <p><strong>Remaining:</strong> ${remainingMarks} marks</p>
            <br>
            <p>Do you want to submit with ${remainingMarks} marks unallocated?</p>
          </div>
        `,
        showCancelButton: true,
        confirmButtonText: "Yes, Submit",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#d97706",
        cancelButtonColor: "#6b7280"
      }).then((result) => {
        if (result.isConfirmed) {
          setLoading(true);
          setTriggerExport(true);
        }
      });
      return;
    }

    if (totalAllocatedMarks > outOfMarks) {
      const exceededMarks = totalAllocatedMarks - outOfMarks;
      Swal.fire({
        icon: "error",
        title: "Marks Exceeded",
        html: `
          <div style="text-align: left;">
            <p><strong>Total allocated:</strong> ${totalAllocatedMarks} marks</p>
            <p><strong>Exam total:</strong> ${outOfMarks} marks</p>
            <p><strong>Exceeded by:</strong> ${exceededMarks} marks</p>
            <br>
            <p>Please reduce the allocated marks before submitting.</p>
          </div>
        `,
        confirmButtonText: "OK",
        confirmButtonColor: "#dc2626"
      });
      return;
    }

    // If all validations pass, proceed with export
    Swal.fire({
      icon: "success",
      title: "Perfect Allocation!",
      text: "All marks are properly allocated. Submitting your test...",
      timer: 1500,
      showConfirmButton: false,
      confirmButtonColor: "#16a34a"
    }).then(() => {
      setLoading(true);
      setTriggerExport(true);
    });
  };
  const handleBackClick = () => {
    navigate("/teachertestadd");
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="new-mock_question_generator">
        {/* <Row xs={2} className="mock_test_generator_header">
          <Col className="mock_test_generator_header_title">
            <h6>Subject Namerrrrrrrrr</h6>
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
        </Row> */}
        <Row className="new-tst_gen_bdy">
          <div className="new-mock_text_editor">
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
                    className="new-mock-subsection-container"
                  >
                    <div className="mock_subsection_header">
                      <textarea
                        className="mock_subsection_textarea"
                        type="text"
                        value={subsection.name}
                        onChange={(e) => {
                          // In edit mode, don't allow changes
                          if (isEditMode) return;
                          
                          const newSubsections = [...subsections];
                          newSubsections[subsectionIndex].name = e.target.value;
                          setSubsections(newSubsections);
                        }}
                        placeholder="Subsection Name"
                        readOnly={isEditMode}
                        style={isEditMode ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed' } : {}}
                      />
                      {!isEditMode && (
                        <div onClick={() => removeSubsection(subsectionIndex)}>
                          <MdOutlineDelete
                            style={{ width: "32px", height: "32px" }}
                          />
                        </div>
                      )}
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
                              className="new-mock-question-container"
                            >
                              <div className="mock_question_header">
                                <div className="mock_question_number">
                                  <h6 style={{ fontSize: "20px" }}>{q.id})</h6>
                                </div>
                                <div className="mock-editor-wrapper">
                                  {isEditMode && q.question && q.question.startsWith('data:image') ? (
                                    <img 
                                      src={q.question} 
                                      alt={`Question ${q.id}`}
                                      style={{
                                        maxWidth: '100%',
                                        height: 'auto',
                                        border: '1px solid #ddd',
                                        borderRadius: '8px',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                      }}
                                    />
                                  ) : (
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
                                      readOnly={isEditMode}
                                    />
                                  )}
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
                                    {isEditMode && q.answer && q.answer.startsWith('data:image') ? (
                                      <img 
                                        src={q.answer} 
                                        alt={`Answer ${q.id}`}
                                        style={{
                                          maxWidth: '100%',
                                          height: 'auto',
                                          border: '1px solid #ddd',
                                          borderRadius: '8px',
                                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                        }}
                                      />
                                    ) : (
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
                                        readOnly={isEditMode}
                                      />
                                    )}
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
                                      readOnly={isEditMode}
                                      style={isEditMode ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed' } : {}}
                                    />
                                  </div>
                                </div>
                              )}

                              {!isEditMode && (
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
                              )}
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
            {!isEditMode && (
              <Row className="mk_action_buttons">
                <Col onClick={addQuestion}>
                  <IoAddCircleOutline className="mk_icon" />
                </Col>
                <hr className="mk_divider"></hr>
                <Col onClick={addSubsection}>
                  <TbSection className="mk_icon" />
                </Col>
              </Row>
            )}

                         {!isEditMode && (
               <div className="new-mock_test_generator_header">
                 <button className="new-mock_test_generator_header-button" onClick={handleExport} disabled={loading}>
                   {loading ? (
                     <Spinner animation="border" size="sm" />
                   ) : (
                     "Submit"
                   )}
                 </button>
               </div>
             )}
          </div>
        </Row>
      </div>
    </DragDropContext>
  );
}

export default NewTeacherMockTest;
