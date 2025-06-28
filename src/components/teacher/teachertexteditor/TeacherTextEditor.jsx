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
    getEditorRef: () => editorRef.current,
  }));

  const createMarkup = (html) => ({
    __html: DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ["img", "p", "div", "br"], // Allow <br> for line breaks
      ALLOWED_ATTR: ["src", "alt", "style", "width", "height"],
    }),
  });

  return (
    <div style={{ width: "100%" }} ref={editorRef}>
      <div className={`editor-container ${showToolbar ? "show-toolbar" : ""}`}>
        <CKEditor
          editor={ClassicEditor}
          data={editorData}
          config={{
            toolbar: {
              shouldNotGroupWhenFull: true,
              items: [
                "heading", "outdent", "indent", "|",
                "bold", "italic", "link",
                "bulletedList", "numberedList",
                "insertTable", "blockQuote",
                "undo", "redo", "|",
                "MathType", "ChemType", "imageUpload",
              ],
            },
            image: {
              toolbar: [
                "imageTextAlternative",
                "imageStyle:full",
                "imageStyle:side",
              ],
              styles: ["full", "side"],
              insert: { type: "block" }, // Ensure image is a block element
            },
            placeholder: placeholder,
            typing: {
              enterMode: "paragraph", // Press Enter to create a new paragraph
              shiftEnterMode: "lineBreak", // Shift + Enter creates a line break
            },
          }}
          onReady={(editor) => {
            editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
              return {
                upload: () => {
                  return new Promise((resolve, reject) => {
                    loader.file.then((file) => {
                      const reader = new FileReader();
                      reader.onload = () => resolve({ default: reader.result });
                      reader.onerror = (error) => reject(error);
                      reader.readAsDataURL(file); // Convert to Base64
                    });
                  });
                },
              };
            };

            editor.ui.focusTracker.on("change:isFocused", (evt, name, isFocused) => {
              setShowToolbar(isFocused);
            });

            editor.model.document.on("change:data", () => {
              setShowToolbar(true);
            });
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log("Editor Data:", data); // For debugging
            setCkData(data);
            setEditorData(data);
          }}
        />
      </div>
    </div>
  );
});

export default TeacherTextEditor;
