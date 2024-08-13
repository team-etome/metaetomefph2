import React, { useState, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-build-classic-mathtype";
import { Row, Col, Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toPng } from "html-to-image";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import '../teachermocktest/teachermocktest.css'

function TeacherMockTest() {
    const [ckData, setCkData] = useState("");
    const editorRef = useRef();
  
    const location = useLocation();
    const { state } = location;
  
    const { title, duedate, mark, teacher_id, class_name, division, subject } =
      state || {};
  
    const APIURL = useSelector((state) => state.APIURL.url);
  
    const handleExport = async () => {
      try {
        
        const editorContent = editorRef.current.editor.ui.view.editable.element;
  
        if (!editorContent) {
          throw new Error("CKEditor content not found");
        }
  
        
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
        formData.append("image", blob, "content.png"); 
  
        
        Swal.fire({
          title: "Submitting Form",
          text: "Please wait...",
          allowOutsideClick: false,
          onBeforeOpen: () => {
            Swal.showLoading();
          },
        });
  
        // const response = await axios.post(`${APIURL}/api/assignment`, formData, {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // });
  
        Swal.close(); 
  
        
        Swal.fire({
          icon: "success",
          title: "Form Submitted Successfully!",
          text: "Your assignment has been submitted.",
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
  
  return (
    <Container className="tch_mock_editor">
      <div className="tch_mock_editor_div">
        <Row xs={2} className="tch_mock_editor_header">
          <Col className="tch_mock_editor_header_title">
            <div>
              <h6>{title}</h6>
              <p>Due Date: {duedate}</p>
            </div>
          </Col>
          <Col className="tch_mock_editor_header_submit">
            <button onClick={handleExport}>Export Questions</button>
          </Col>
        </Row>
        <Row>
          <React.Fragment>
            <div
              className={`tch_mock_editor_container tch_mock_show_toolbar`}
              ref={editorRef}
            >
              <CKEditor
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
                  placeholder: "Type questions here.....",
                }}
                data={ckData}
                onReady={(editor) => {
                  editorRef.current.editor = editor;
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setCkData(data);
                }}
              />
            </div>
          </React.Fragment>
        </Row>
      </div>
    </Container>
  )
}

export default TeacherMockTest