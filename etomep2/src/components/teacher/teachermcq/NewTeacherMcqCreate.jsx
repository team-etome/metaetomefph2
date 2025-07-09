import React, { useState, useRef, useEffect } from "react";
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
import "./newteachermcqcreate.css";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

function NewTeacherMcqCreate({ formData, class_name, division, subject, onMcqAdded, editData, isEditMode }) {
    const teacher_subject = useSelector((state) => state?.teachersubjectinfo);
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

    // Load existing questions when in edit mode
    useEffect(() => {
        if (isEditMode && editData && editData.questions) {
            const existingSections = editData.questions.map((section, sectionIndex) => ({
                name: section.name || `Section ${sectionIndex + 1}`,
                questions: section.questions.map((q, questionIndex) => ({
                    id: q.id || questionIndex + 1,
                    question: q.question || "",
                    questionImage: q.questionImage || null,
                    answerKey: q.answerKey || null,
                    options: q.options || [],
                }))
            }));
            setSections(existingSections);
            setLastQuestionId(Math.max(...existingSections.flatMap(s => s.questions.map(q => q.id)), 1));
        }
    }, [isEditMode, editData]);

    const captureQuestionImage = async (sectionIndex, questionIndex) => {
        const questionElement = questionRefs.current[sectionIndex]?.[questionIndex];

        console.log(questionElement, "question element");
        if (!questionElement) {
            console.error("Question element not found");
            return null;
        }

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
            duration: formData.duration,
            exam_name: formData.examName,
            out_of_mark: formData.outOfMarks,
            teacher_code: formData.teacherCode,
            topic: formData.topic,
            negative_marks: formData.negativeMark,
            individual_mark: formData.individualMark,
            class: class_name || teacher_subject.teachersubjectinfo?.class,
            division: division || teacher_subject.teachersubjectinfo?.division,
            subject: subject || teacher_subject.teachersubjectinfo?.subject,
            admin: teacher_subject.teachersubjectinfo?.admin,
            questions: exportedData,
        };

        console.log(requestData, "requestData");

        try {
            // Send the data to the backend using Axios
            const response = await axios.post(`${APIURL}/api/test`, requestData);

            // Handle successful export
            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Export successful!",
                    timer: 1500,
                }).then(() => {
                    if (onMcqAdded) {
                        onMcqAdded(); // This will handle going back to the listing
                    }
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Export failed!",
                    text: "Failed to export questions.",
                    showConfirmButton: true,
                });
            }
        } catch (error) {
            console.error("Error exporting questions:", error);
            Swal.fire({
                icon: "error",
                title: "Export failed!",
                text: "Failed to export questions. Please try again.",
                showConfirmButton: true,
            });
        } finally {
            // Reset progress and exporting state
            setIsExporting(false);
            setProgress(0);
        }
    };

    const addQuestion = (sectionIndex) => {
        // In edit mode, don't allow adding questions
        if (isEditMode) return;

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
        // In edit mode, don't allow changes
        if (isEditMode) return;

        const updatedSections = [...sections];
        updatedSections[sectionIndex].questions[questionIndex].question = value;
        setSections(updatedSections);
    };

    const addSection = () => {
        // In edit mode, don't allow adding sections
        if (isEditMode) return;

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
        // In edit mode, don't allow removing sections
        if (isEditMode) return;

        const newSections = sections.filter((_, i) => i !== sectionIndex);
        setSections(newSections);
    };

    const removeQuestion = (sectionIndex, questionIndex) => {
        // In edit mode, don't allow removing questions
        if (isEditMode) return;

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
        // In edit mode, don't allow changes
        if (isEditMode) return;

        const newSections = [...sections];
        newSections[sectionIndex].questions[questionIndex].options[optionIndex] =
            value;
        setSections(newSections);
    };

    const handleNumberOfOptionsChange = (
        sectionIndex,
        questionIndex,
        numberOfOptions
    ) => {
        // In edit mode, don't allow changes
        if (isEditMode) return;

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
        // In edit mode, don't allow changes
        if (isEditMode) return;

        const newSections = [...sections];
        newSections[index].name = newName;
        setSections(newSections);
    };

    const onDragEnd = (result) => {
        // In edit mode, don't allow drag and drop
        if (isEditMode) return;

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
            <Container fluid className="new-mcq-generator">
                <Row className="new-mcq_gen_bdy">
                    <div className="new-mcq_text_editor">
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
                                        className="new-section-container"

                                    >
                                        <div className="mcq_subsection_header" >
                                            <textarea
                                                className="mcq_subsection_textarea"
                                                type="text"
                                                value={section.name}
                                                onChange={(e) =>
                                                    handleSectionNameChange(sectionIndex, e.target.value)
                                                }
                                                placeholder="Section Name"
                                                readOnly={isEditMode}
                                                style={isEditMode ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed' } : {}}
                                            />
                                            {!isEditMode && (
                                                <MdOutlineDelete
                                                    style={{ width: "32px", height: "32px" }}
                                                    onClick={() => removeSection(sectionIndex)}
                                                />
                                            )}
                                        </div>

                                        {section.questions.map((question, questionIndex) => (
                                            <Draggable
                                                key={question.id}
                                                draggableId={`question-${sectionIndex}-${question.id}`}
                                                index={questionIndex}
                                            >
                                                {(provided) => (
                                                    <div className="new-mcq-question-container">
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
                                                                {isEditMode && question.questionImage && question.questionImage.startsWith('data:image') ? (
                                                                    <img 
                                                                        src={question.questionImage} 
                                                                        alt={`Question ${question.id}`}
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
                                                                        readOnly={isEditMode}
                                                                    />
                                                                )}
                                                            </div>
                                                        </div>

                                                        <Row className="mt-3">
                                                            <Row>
                                                                <Col>
                                                                    <h6>Answer Key</h6>
                                                                </Col>
                                                                {!isEditMode && (
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
                                                                )}
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
                                                                                            // In edit mode, don't allow changes
                                                                                            if (isEditMode) return;
                                                                                            
                                                                                            const newSections = [...sections];
                                                                                            newSections[
                                                                                                sectionIndex
                                                                                            ].questions[
                                                                                                questionIndex
                                                                                            ].answerKey = option;
                                                                                            setSections(newSections);
                                                                                        }}
                                                                                        className="mcq-radio"
                                                                                        disabled={isEditMode}
                                                                                    />
                                                                                </div>
                                                                            )
                                                                        )}
                                                                    </div>
                                                                </Col>
                                                                {!isEditMode && (
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
                                                                )}
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

                        {!isEditMode && (
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
                        )}

                        {!isEditMode && (
                            <div className="new-mcq_test_generator_header">
                                <button
                                    className="new-mcq_test_generator_header-button"
                                    onClick={exportQuestions}
                                    disabled={isExporting}
                                >
                                    {isExporting ? `Exporting... ${progress}%` : "Export Questions"}
                                </button>{" "}
                            </div>
                        )}

                        {isExporting && (
                            <Row className="my-3">
                                <Col>
                                    <ProgressBar now={progress} label={`${progress}%`} />
                                </Col>
                            </Row>
                        )}
                    </div>
                </Row>
            </Container>
        </DragDropContext>
    );
}

export default NewTeacherMcqCreate;
