import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-build-classic-mathtype";
import DOMPurify from "dompurify";

import { MdFormatBold, MdFormatItalic } from "react-icons/md";
import { CiTextAlignLeft,CiTextAlignCenter, CiTextAlignRight,CiImageOn } from "react-icons/ci";

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

  return (
    <React.Fragment>
   
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
      />
       
      <div
        style={{ whiteSpace: 'pre-wrap' }}
        dangerouslySetInnerHTML={createMarkup(ckData)}
      ></div>
    </React.Fragment>
  );
}