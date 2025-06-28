import React, { useState, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-build-classic-mathtype";
import { Row, Col, Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toPng } from "html-to-image";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import "../teacherassignmentadd/assignmenteditor.css";
import { IoChevronBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


function AssignmentEditor({ placeholder }) {
  const [ckData, setCkData] = useState("");
  const editorRef = useRef();
  const [showToolbar, setShowToolbar] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const location = useLocation();
  const { state } = location;

  const { title, duedate, mark, teacher_id, class_name, division, subject } =
    state || {};

  const APIURL = useSelector((state) => state.APIURL.url);

  const handleExport = async () => {
    try {
      // Check if the editor content is empty (remove HTML tags and trim whitespace)
    const strippedContent = ckData.replace(/<[^>]*>/g, "").trim();
    if (!strippedContent) {
      Swal.fire({
        icon: "error",
        title: "Empty Content",
        text: "Please add some questions before exporting.",
      });
      return; // Stop further processing if content is empty
    }
      // Find the ck-editor__editable div where the actual content is stored
      const editorContent = editorRef.current.editor.ui.view.editable.element;

      if (!editorContent) {
        throw new Error("CKEditor content not found");
      }

      // Convert CKEditor content to Image
      const dataUrl = await toPng(editorContent, { backgroundColor: null });
      const blob = await (await fetch(dataUrl)).blob();

      const formData = new FormData();
      formData.append("title", title);
      formData.append("due_date", duedate);
      formData.append("mark", mark);
      formData.append("teacher", teacher_id);
      formData.append("class_name", class_name);
      formData.append("division", division);
      formData.append("subject", subject);
      formData.append("image", blob, "content.png"); // Add the blob image as a file

      // Show loading spinner using Swal
      Swal.fire({
        title: "Submitting Form",
        text: "Please wait...",
        allowOutsideClick: false,
        showConfirmButton: false, // This line hides the OK button
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await axios.post(`${APIURL}/api/assignment`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.close(); // Close loading spinner

      // Show success message using Swal
      Swal.fire({
        icon: "success",
        title: "Form Submitted Successfully!",
        text: "Your assignment has been submitted.",
      }).then(() => {
        navigate("/teacherassignment");
      });
      console.log("Form data submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting form data:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "There was an error submitting your assignment.",
      });
    }
  };
  const handleBackClick = () => {
    navigate('/teacherassignmentadding')
  }
  return (
    <Container className="assignment_editor">
      <div className="assignment_editor_div">
        <Row xs={2} className="assignment_editor_header">
          <Col className="assignment_editor_header_title">
            <div className="assign_back_title">
              <IoChevronBackSharp onClick={handleBackClick}className="teacher_question_back" />
              <h6> {title}</h6>
              </div>
              <p>Due Date: {duedate}</p>
            
          </Col>
          <Col className="assignment_editor_header_submit">
            <button onClick={handleExport}>Export Questions</button>
          </Col>
        </Row>
        <Row>
          <React.Fragment>
            <div
              className={`assignment_editor_container ${showToolbar ? "assignment_show_toolbar" : ""} `}
              // ref={editorRef}
            >
              <CKEditor
                // editor={ClassicEditor}
                ref={editorRef} // Set the ref directly on CKEditor
                editor={ClassicEditor}
                config={{
                  toolbar: {
                    shouldNotGroupWhenFull: true,
                    items: [
                      "heading",
                      "outdent",
                      "indent",
                      "|",
                      "bold",
                      "italic",
                      "link",
                      "bulletedList",
                      "numberedList",
                      "insertTable",
                      "blockQuote",
                      "undo",
                      "redo",
                      "|",
                      "MathType",
                      "ChemType",
                    ],
                  },
                  fontSize: {
                    options: [
                      'tiny',
                      'small',
                      'default',
                      'big',
                      'huge'
                    ],
                    supportAllValues: false
                  },
                  placeholder: "Type questions here.....",
                }}
                data={ckData}
                onReady={(editor) => {
                  editorRef.current.editor = editor;
                  setShowToolbar(isFocused);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setCkData(data);
                  
                }}

                // onReady={(editor) => {
                //   editorRef.current = editor;
                //   editor.ui.focusTracker.on('change:isFocused', (evt, name, isFocused) => {
                //     setShowToolbar(isFocused);
                //   });
    
                //   editor.model.document.on('change:data', () => {
                //     setShowToolbar(true);
                //   });
                // }}
                // onChange={(event, editor) => {
                //   const data = editor.getData();
                //   setCkData(data);
                //   setEditorData(data);
                // }}
              />
            </div>
          </React.Fragment>
        </Row>
      </div>
    </Container>
  );
}

export default AssignmentEditor;
