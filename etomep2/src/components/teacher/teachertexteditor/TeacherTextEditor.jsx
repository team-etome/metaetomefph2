import "../teachertexteditor/teachertexteditor.css"

import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-build-classic-mathtype";
import DOMPurify from "dompurify";



export default function TeacherTextEditor() {
  const [ckData, setCkData] = useState("");

  const createMarkup = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  };

  const [editorValue, changeEditorValue] = useState('');
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);

  const handleAlignmentLeft = () => {
    document.execCommand('justifyLeft');
  };

  const handleAlignmentCenter = () => {
    document.execCommand('justifyCenter');
  };

  const handleAlignmentRight = () => {
    document.execCommand('justifyRight');
  };

  const handleInsertImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target.result;
      const img = `<img src="${imageUrl}" alt="inserted image" />`;
      changeEditorValue(editorValue + img);
    };
    reader.readAsDataURL(file);
  };

  const handleEditorChange = (event) => {
    changeEditorValue(event.target.value);
  };

  const handleSelectionChange = () => {
    const selection = window.getSelection();
    setSelectionStart(selection.anchorOffset);
    setSelectionEnd(selection.focusOffset);
  };

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          const toolbar = document.querySelector(".ck-toolbar");
          const editable = document.querySelector(".ck-editor__editable");
          if (toolbar && editable) {
            editable.parentNode.insertBefore(toolbar, editable.nextSibling);
          }
        }
      });
    });

    const config = { childList: true, subtree: true };
    const targetNode = document.querySelector(".ck-editor");

    if (targetNode) {
      observer.observe(targetNode, config);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div style={{width:"90%" ,minHeight:"150px"}}>
    <React.Fragment    >
  
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
        }}
        data={ckData}
        onReady={(editor) => {
          // Editor is ready to use
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setCkData(data);
        }}
        className="custom-editor"
      />
       
      {/* <div
        style={{ whiteSpace: 'pre-wrap' }}
        dangerouslySetInnerHTML={createMarkup(ckData)}
      ></div> */}
    </React.Fragment>
    </div>
  );
}