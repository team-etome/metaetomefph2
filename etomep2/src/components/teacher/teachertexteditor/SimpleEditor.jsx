import React, { useState } from 'react';
import { MdFormatBold, MdFormatItalic, MdFormatUnderlined, MdFormatStrikethrough} from "react-icons/md";
import { CiTextAlignLeft, CiTextAlignCenter, CiTextAlignRight, CiImageOn } from "react-icons/ci";

function SimpleEditor() {
  const [editorValue, changeEditorValue] = useState('');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [fontSize, setFontSize] = useState('16px');


  const handleBoldClick = () => {
    document.execCommand('bold');
    setIsBold(!isBold);
  };

  const handleItalicClick = () => {
    document.execCommand('italic');
    setIsItalic(!isItalic);
  };

  const handleUnderlineClick = () => {
    document.execCommand('underline');
    setIsUnderline(!isUnderline);
  };

  const handleStrikethroughClick = () => {
    document.execCommand('strikethrough');
    setIsStrikethrough(!isStrikethrough);
  };

  const handleAlignmentLeft = () => {
    document.execCommand('justifyLeft');
  };

  const handleAlignmentCenter = () => {
    document.execCommand('justifyCenter');
  };

  const handleAlignmentRight = () => {
    document.execCommand('justifyRight');
  };

  const handleFontSizeChange = (event) => {
    const size = event.target.value;
    document.execCommand('fontSize', false, size);
    setFontSize(size);
  };



  const handleInsertImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target.result;
      document.execCommand('insertImage', false, imageUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleEditorChange = (event) => {
    changeEditorValue(event.target.innerHTML);
  };

  return (
    <div style={{width:"90%"}}>
      
      <div
        contentEditable
        dangerouslySetInnerHTML={{ __html: editorValue }}
        onInput={handleEditorChange}
        style={{ border: "1px solid black", padding: "10px", minHeight: "100px" }}
      />
      <div>
        <button onClick={handleBoldClick}><MdFormatBold /></button>
        <button onClick={handleItalicClick}><MdFormatItalic /></button>
        <button onClick={handleUnderlineClick}><MdFormatUnderlined /></button>
        <button onClick={handleStrikethroughClick}><MdFormatStrikethrough /></button>
        <button onClick={handleAlignmentLeft}><CiTextAlignLeft /></button>
        <button onClick={handleAlignmentCenter}><CiTextAlignCenter /></button>
        <button onClick={handleAlignmentRight}><CiTextAlignRight /></button>
        <button htmlFor="image-upload" style={{ cursor: "pointer" }}>
          <CiImageOn />
          <input id="image-upload" type="file" accept="image/*" style={{ display: "none" }} onChange={handleInsertImage} />
        </button >
        <button htmlFor="font-size">Font Size:
        <select style={{border:"none"}} id="font-size" value={fontSize} onChange={handleFontSizeChange} >
          <option value="1">10px</option>
          <option value="2">13px</option>
          <option value="3">16px</option>
          <option value="4">18px</option>
          <option value="5">24px</option>
          <option value="6">32px</option>
          <option value="7">48px</option>
        </select>
        </button>
        
        
      </div>
    </div>
  );
}

export default SimpleEditor;