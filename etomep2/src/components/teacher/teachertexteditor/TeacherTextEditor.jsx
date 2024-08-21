import "../teachertexteditor/teachertexteditor.css";
import React, { useState, forwardRef, useImperativeHandle } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-build-classic-mathtype";
import DOMPurify from "dompurify";


const TeacherTextEditor = forwardRef(({ placeholder, editorData, setEditorData }, ref) => {
  const [ckData, setCkData] = useState("");
  const [showToolbar, setShowToolbar] = useState(false);
  const editorRef = React.createRef();
  

  useImperativeHandle(ref, () => ({
    getEditorRef: () => {
      return editorRef.current;
    }
  }));

  const createMarkup = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  };

  return (
    <div  style={{ width: "100%" ,}} ref={editorRef}>
      <React.Fragment>
        <div  className={`editor-container ${showToolbar ? "show-toolbar" : ""}`}>
          <CKEditor
          
            editor={ClassicEditor}
            data={editorData}
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
              placeholder: placeholder,
            }}
            onReady={(editor) => {
              editor.ui.focusTracker.on('change:isFocused', (evt, name, isFocused) => {
                setShowToolbar(isFocused);
              });

              editor.model.document.on('change:data', () => {
                setShowToolbar(true);
              });
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setCkData(data);
              setEditorData(data);
            }}
        
          />
        </div>
      </React.Fragment>
    </div>
  );
});

export default TeacherTextEditor;
