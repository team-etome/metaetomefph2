import React, { useState, useEffect, useCallback, useRef } from "react";
import { Container, Row, Col, Spinner, Alert, ProgressBar } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../teacherquestiongenerator/newquestiongenerator.css";
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

function NewQuestionGenerator({ onClose, selectedFile, selectedItem, onRefresh }) {
    console.log("NewQuestionGenerator received selectedFile:", selectedFile);
    console.log("NewQuestionGenerator received selectedItem:", selectedItem);
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

    const handleBackClick = () => {
        if (onClose) {
            onClose();
        } else {
            navigate("/teacherexamination");
        }
    };

    const exam_id = exampaperinfo.exampaperinfo?.id;

    // Use out_of_marks from selectedItem instead of total_marks from Redux
    const total_marks = selectedItem?.out_of_marks || 0;

    console.log(total_marks, "total marks from selectedItem")

    const [progress, setProgress] = useState(0); // Track export progress
    const [isExporting, setIsExporting] = useState(false); // Exporting status

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
        const newSubsections = [...subsections];
        const newPoints = parseInt(event.target.value, 10) || 0;
        
        // Calculate current total allocated marks (excluding the current question being edited)
        const currentTotalAllocatedMarks = newSubsections.reduce(
            (acc, subsection) =>
                acc +
                subsection.questions.reduce((sum, q, qIdx) => {
                    // Skip the current question being edited
                    if (subsection === newSubsections[subsectionIndex] && qIdx === questionIndex) {
                        return sum;
                    }
                    return sum + q.points;
                }, 0),
            0
        );

        // Calculate what the new total would be
        const newTotalAllocatedMarks = currentTotalAllocatedMarks + newPoints;

        if (newTotalAllocatedMarks > total_marks) {
            const remainingMarks = total_marks - currentTotalAllocatedMarks;
            Swal.fire({
                icon: "error",
                title: "Exceeds Total Marks",
                text: `Total allocated marks (${newTotalAllocatedMarks}) cannot exceed the exam total (${total_marks}). You have ${remainingMarks} marks remaining.`,
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

        newSubsections[subsectionIndex].questions[questionIndex].points = newPoints;
        setSubsections(newSubsections);
    };







    // Helper to calculate the next global ID
    const getNextGlobalId = (subsections) => {
        return (
            subsections.reduce(
                (total, subsection) => total + subsection.questions.length,
                0
            ) + 1
        );
    };

    // Helper to recalculate global IDs for all questions across subsections
    const recalculateGlobalIds = (subsections) => {
        let globalId = 1;
        subsections.forEach((subsection) => {
            subsection.questions.forEach((question) => {
                question.id = globalId++;
            });
        });
    };

    // const addQuestion = () => {
    //   const newSubsections = [...subsections];
    //   const newQuestionId = lastQuestionId + 1;

    //   newSubsections[currentSubsectionIndex].questions.push({
    //     id: newQuestionId,
    //     question: "",
    //     answer: "",
    //     points: 5,
    //     showAnswer: false,
    //   });
    //   setSubsections(newSubsections);
    //   setLastQuestionId(newQuestionId);
    // };

    const addQuestion = () => {
        const newSubsections = [...subsections];
        const currentQuestions = newSubsections[currentSubsectionIndex].questions;

        // Add the new question with the next global ID
        currentQuestions.push({
            id: getNextGlobalId(newSubsections), // Calculate the next global ID
            question: "",
            answer: "",
            points: 5,
            showAnswer: false,
        });

        setSubsections(newSubsections);
    };

    // const addSubsection = () => {
    //   setSubsections([...subsections, { name: "New Section", questions: [] }]);
    //   setCurrentSubsectionIndex(subsections.length);
    // };

    const addSubsection = () => {
        setSubsections((prevSubsections) => [
            ...prevSubsections,
            { name: "New Section", questions: [] },
        ]);
        setCurrentSubsectionIndex(subsections.length); // Set to the new subsection index
    };

    const removeSubsection = (index) => {
        const newSubsections = subsections.filter((_, i) => i !== index);
        setSubsections(newSubsections);
    };

    // const removeQuestion = (subsectionIndex, questionIndex) => {
    //   const newSubsections = [...subsections];
    //   newSubsections[subsectionIndex].questions = newSubsections[
    //     subsectionIndex
    //   ].questions.filter((_, i) => i !== questionIndex);
    //   setSubsections(newSubsections);
    // };

    const removeQuestion = (subsectionIndex, questionIndex) => {
        const newSubsections = [...subsections];
        const currentQuestions = newSubsections[subsectionIndex].questions;

        // Remove the question
        currentQuestions.splice(questionIndex, 1);

        // Recalculate global IDs for all questions
        recalculateGlobalIds(newSubsections);

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

        // If dragging within the same subsection
        if (sourceSubsectionIndex === destinationSubsectionIndex) {
            const newSubsections = [...subsections];
            const questions = Array.from(newSubsections[sourceSubsectionIndex].questions);
            const [removed] = questions.splice(source.index, 1);
            questions.splice(destination.index, 0, removed);
            newSubsections[sourceSubsectionIndex].questions = questions;
            
            // Recalculate global IDs after drag operation
            recalculateGlobalIds(newSubsections);
            setSubsections(newSubsections);
        } else {
            // If dragging between different subsections
            const newSubsections = [...subsections];
            const sourceQuestions = Array.from(
                newSubsections[sourceSubsectionIndex].questions
            );
            const destinationQuestions = Array.from(
                newSubsections[destinationSubsectionIndex].questions
            );
            
            // Remove from source
            const [removed] = sourceQuestions.splice(source.index, 1);
            // Add to destination
            destinationQuestions.splice(destination.index, 0, removed);
            
            // Update both subsections
            newSubsections[sourceSubsectionIndex].questions = sourceQuestions;
            newSubsections[destinationSubsectionIndex].questions = destinationQuestions;
            
            // Recalculate global IDs after drag operation
            recalculateGlobalIds(newSubsections);
            setSubsections(newSubsections);
        }
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
            const canvas = await html2canvas(element, { scale: 4 });
            const dataUrl = canvas.toDataURL("image/png");
            console.log("Capture successful", dataUrl);
            return dataUrl;
        } catch (error) {
            console.error("Error capturing element:", error);
            return "Error capturing element";
        }
    };

    const exportQuestionsToJson = async () => {
        setIsExporting(true);
        const totalQuestions = subsections.reduce(
            (acc, section) => acc + section.questions.length,
            0
        );
        let processedQuestions = 0;

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

                        processedQuestions++;
                        setProgress(
                            Math.floor((processedQuestions / totalQuestions) * 100)
                        ); // Update progress

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
        // Create FormData to handle file upload
        const formData = new FormData();
        formData.append('questionpaper', selectedItem.questionpaper);
        formData.append('data', JSON.stringify(sectionsWithImages));
 
        // Handle PDF file upload similar to NewTeacherAddAssignment
        if (selectedFile) {
            console.log("Selected file details:", {
                name: selectedFile.name,
                type: selectedFile.type,
                size: selectedFile.size,
                isExistingFile: selectedFile.isExistingFile
            });
            
            // Check if it's an existing file (from edit mode) or new file
            if (selectedFile.isExistingFile) {
                // If it's an existing file, we don't need to append it again
                // The backend should handle keeping the existing file
                formData.append('keep_existing_instruction', 'true');
                formData.append('existing_instruction_url', selectedFile.url);
                console.log("Appending existing instruction file info");
            } else {
                // New file selected - append it directly
                formData.append('instruction', selectedFile);
                console.log("Appending new instruction file:", selectedFile.name);
            }
        } else {
            console.log("No selected file found");
        }

        // Debug: Log FormData contents
        console.log("FormData contents:");
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        try {
            // Show loading spinner for submission
            Swal.fire({
                title: "Exporting Questions",
                text: "Please wait while we process your questions...",
                allowOutsideClick: false,
                showConfirmButton: false,
                onBeforeOpen: () => {
                    Swal.showLoading();
                },
            });

            const response = await axios.post(
                `${APIURL}/api/questionpapersetting`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
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
                // Call refresh callback if provided
                if (onRefresh) {
                    console.log("Calling refresh callback from NewQuestionGenerator");
                    onRefresh();
                }
                // Navigate back to examination page
                navigate("/teacherexamination");
            });
        } catch (error) {
            setSuccessMessage("Export failed!");
            console.error("Error sending data to the backend:", error);
            Swal.close(); // Close the loader
            
            // More detailed error message
            let errorMessage = "There was an issue exporting the questions.";
            if (error.response) {
                if (error.response.status === 413) {
                    errorMessage = "File size too large. Please use a smaller file.";
                } else if (error.response.status === 400) {
                    errorMessage = error.response.data?.message || "Invalid data provided.";
                } else if (error.response.status === 500) {
                    errorMessage = "Server error. Please try again later.";
                }
            }
            
            Swal.fire({
                icon: "error",
                title: "Export failed!",
                text: errorMessage,
                showConfirmButton: true,
            });
        } finally {
            setLoading(false);
            setIsExporting(false); // Stop exporting
            setProgress(0); // Reset progress// Stop loading
        }
    };

    // const handleExport = () => {
    //   setProgress(0); 
    //   setIsExporting(true);
    //   exportQuestionsToJson();
    // };


    const handleExport = async () => {
        // Validate that we have questions to export
        const totalQuestions = subsections.reduce(
            (acc, section) => acc + section.questions.length,
            0
        );

        if (totalQuestions === 0) {
            Swal.fire({
                icon: "error",
                title: "No Questions",
                text: "Please add at least one question before exporting.",
            });
            return;
        }

        // Validate marks allocation
        const totalAllocatedMarks = subsections.reduce(
            (acc, subsection) =>
                acc +
                subsection.questions.reduce((sum, q) => sum + q.points, 0),
            0
        );

        if (totalAllocatedMarks > total_marks) {
            const excessMarks = totalAllocatedMarks - total_marks;
            Swal.fire({
                icon: "error",
                title: "Cannot Export",
                text: `Total allocated marks (${totalAllocatedMarks}) exceed the exam total (${total_marks}) by ${excessMarks} marks. Please reduce the marks to continue.`,
                confirmButtonText: "OK"
            });
            return;
        }

        // Check if marks are under-allocated (optional warning)
        if (totalAllocatedMarks < total_marks) {
            const remainingMarks = total_marks - totalAllocatedMarks;
            const shouldContinue = await Swal.fire({
                icon: "warning",
                title: "Under-allocated Marks",
                text: `You have allocated ${totalAllocatedMarks} out of ${total_marks} total marks. ${remainingMarks} marks are unallocated. Do you want to continue?`,
                showCancelButton: true,
                confirmButtonText: "Continue",
                cancelButtonText: "Go Back"
            });
            
            if (!shouldContinue.isConfirmed) {
                return;
            }
        }

        // if (!selectedFile) {
        //     Swal.fire({
        //         icon: "warning",
        //         title: "PDF Required",
        //         text: "Please upload a PDF instruction file before creating questions.",
        //     });
        //     return;
        // }

        // if (selectedFile && !selectedFile.isExistingFile) {
        //     const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        //     if (!allowedTypes.includes(selectedFile.type)) {
        //         Swal.fire({
        //             icon: "error",
        //             title: "Invalid File Type",
        //             text: "Please upload a PDF, DOC, or DOCX file only.",
        //         });
        //         return;
        //     }
        //     const maxSize = 25 * 1024 * 1024; 
        //     if (selectedFile.size > maxSize) {
        //         Swal.fire({
        //             icon: "error",
        //             title: "File Too Large",
        //             text: "File size must be less than 25MB.",
        //         });
        //         return;
        //     }
        // }

        setProgress(0); // Reset progress
        setIsExporting(true); // Start exporting
        exportQuestionsToJson();
    };



    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="new-question_generator">
                {/* <Row xs={2} className="question_generator_header">
                    <Col className="question_generator_header_title">
                        <IoChevronBackSharp onClick={handleBackClick} className="teacher_question_back" />
                        <h6>Question Generator</h6>
                    </Col>
                </Row> */}

                {/* <Row className="new-qs_gn_bdy" style={{border:"2px solid green"}}> */}
                <div className="new-text-editor" >
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
                                    className="newsubsection-container"
                                >
                                    <div className="newsubsection_header" >
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
                                                        className="new-question-container"
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
                    <Row className="new-action_buttons">
                        <Col onClick={addQuestion}>
                            <IoAddCircleOutline className="teacher_icon" />
                        </Col>
                        <hr className="divider"></hr>
                        <Col onClick={addSubsection}>
                            <TbSection className="teacher_icon" />
                        </Col>
                    </Row>
                    
                </div>
                {/* </Row> */}
                
                {/* Fixed Footer */}
                <div className="newquestion_generator_footer">
                    <div className="footer_content">
                        <div className="footer_left">
                            <button className="newquestion_generator_back" onClick={handleBackClick}>
                                Back
                            </button>
                        </div>
                        <div className="marks_allocation_indicator">
                        {(() => {
                            const totalAllocatedMarks = subsections.reduce(
                                (acc, subsection) =>
                                    acc +
                                    subsection.questions.reduce((sum, q) => sum + q.points, 0),
                                0
                            );
                            const remainingMarks = total_marks - totalAllocatedMarks;
                            const isOverAllocated = totalAllocatedMarks > total_marks;
                            const isUnderAllocated = totalAllocatedMarks < total_marks;
                            
                            return (
                                <div className={`marks_status ${isOverAllocated ? 'over-allocated' : isUnderAllocated ? 'under-allocated' : 'perfect'}`}>
                                    <span className="marks_text">
                                        Marks: {totalAllocatedMarks} / {total_marks}
                                    </span>
                                    {isOverAllocated && (
                                        <span className="marks_warning">
                                            (Exceeds by {Math.abs(remainingMarks)})
                                        </span>
                                    )}
                                    {isUnderAllocated && (
                                        <span className="marks_info">
                                            ({remainingMarks} remaining)
                                        </span>
                                    )}
                                    {!isOverAllocated && !isUnderAllocated && (
                                        <span className="marks_success">
                                            (Perfect!)
                                        </span>
                                    )}
                                </div>
                            );
                        })()}
                    </div>
                        <div className="footer_right">
                            <button className="newquestion_generator_submit" onClick={handleExport} disabled={isExporting}>
                                {isExporting ? `Submit... ${progress}%` : "Submit"}
                            </button>
                        </div>
                    </div>
                    
                    {isExporting && (
                        <div className="progress_container">
                                <ProgressBar now={progress} label={`${progress}%`} />
                        </div>
                    )}
                    </div>
            </div>
        </DragDropContext>
    );
}

export default NewQuestionGenerator;
