import "../teacherassignmentadd/assignmenteditor.css";
import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-build-classic-mathtype";
import DOMPurify from "dompurify";
import { Row, Col, Container } from "react-bootstrap";

function AssignmentEditor({ placeholder }) {
  const [ckData, setCkData] = useState("");
  const [showToolbar, setShowToolbar] = useState(false);
  const createMarkup = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  };
  return (
    <div style={{ width: "90%", minHeight: "150px" }}>
      <Row xs={2} className="assignment_editor_header">
        <Col className="assignment_editor_header_title">
          <h6>Subject Name</h6>
        </Col>
        <Col className="assignment_editor_header_submit">
            <button >Export Questions</button>
          </Col>
      </Row>
      <React.Fragment>
        <div
          className={`assignment-editor-container ${
            showToolbar ? "assignment_show_toolbar" : ""
          }`}
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
              placeholder: placeholder,
            }}
            data={ckData}
            onReady={(editor) => {
              // Show toolbar when editor gains focus
              editor.ui.focusTracker.on(
                "change:isFocused",
                (evt, name, isFocused) => {
                  setShowToolbar(isFocused);
                }
              );
              // Show toolbar when typing inside the editor
              editor.model.document.on("change:data", () => {
                setShowToolbar(true);
              });
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setCkData(data);
            }}
          />
        </div>
      </React.Fragment>
    </div>
  );
}

export default AssignmentEditor;
