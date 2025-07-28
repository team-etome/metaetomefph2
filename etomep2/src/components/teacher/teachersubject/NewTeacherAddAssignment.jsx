// src/components/newteacheraddassignment.jsx
import React, { useRef, useState, useEffect } from 'react';
import './newteacheraddassignment.css';
import { AiOutlineFilePdf } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';
import { BsCalendar3 } from 'react-icons/bs';
import { FaBold, FaItalic, FaUnderline, FaListUl } from 'react-icons/fa';
import {
    AiOutlineAlignLeft,
    AiOutlineAlignCenter,
    AiOutlineAlignRight,
} from 'react-icons/ai';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { toPng } from 'html-to-image';

const NewTeacherAddAssignment = ({ onClose, class_name, division, subject, editData, isEditMode }) => {
    const APIURL = useSelector((state) => state.APIURL.url);
    const teacher = useSelector((state) => state.teacherinfo);
    const teacher_id = teacher.teacherinfo?.teacher_id;
    const teacherInfo = useSelector((state) => state.teacherinfo.teacherinfo);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef();
    const textareaRef = useRef();
    const contentRef = useRef();
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [mark, setMark] = useState('');
    const [manualMode, setManualMode] = useState(false);
    
    // Rich text editing states
    const [textContent, setTextContent] = useState('');
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [textAlign, setTextAlign] = useState('left');
    const [isListMode, setIsListMode] = useState(false);
    const [showExistingImage, setShowExistingImage] = useState(false);

    // Populate form when in edit mode
    useEffect(() => {
        if (isEditMode && editData) {
            setTitle(editData.title || '');
            setDueDate(editData.due_date || editData.dueDate || '');
            setMark(editData.mark !== undefined && editData.mark !== null ? String(editData.mark) : '');
            
            // Handle content - could be PDF or manual text
            if (editData.pdf) {
                // If there's a PDF, we'll show the file info
                const fileName = editData.pdf.split('/').pop().split('?')[0]; // Remove query parameters
                setSelectedFile({ 
                    name: fileName,
                    isExistingFile: true,
                    url: editData.pdf 
                });
            } else if (editData.image) {
                // If there's an image (manual content converted to image), switch to manual mode
                setManualMode(true);
                setShowExistingImage(true);
                if (editData.manual_content) {
                    setTextContent(editData.manual_content);
                    setTextAlign(editData.text_alignment || 'left');
                } else {
                    setTextAlign('left');
                }
            }
        }
    }, [isEditMode, editData]);

    const handleFileChange = e => {
        const file = e.target.files[0];
        if (file) {
            // Check if manual content exists (either in manual mode or has existing image)
            const hasManualContent = manualMode || 
                                   (isEditMode && editData?.image && showExistingImage) ||
                                   (textContent && textContent.trim() !== '');
            
            if (hasManualContent) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Content Conflict',
                    text: 'You already have manual content. Please clear the manual content first before uploading a file, or choose one method only.',
                    confirmButtonText: 'OK'
                });
                // Clear the file input
                e.target.value = '';
                return;
            }
            setSelectedFile(file);
        }
    };

    const clearFile = () => {
        setSelectedFile(null);
        // reset the input so you can re-pick the same file if needed
        fileInputRef.current.value = "";
    };

    // Convert markdown-style formatting to HTML
    const convertToHTML = (text) => {
        if (!text || text.trim() === '') return '';
        
        let html = text
            // Convert bold
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            // Convert italic
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            // Convert underline
            .replace(/__(.*?)__/g, '<u>$1</u>')
            // Convert line breaks to paragraphs
            .split('\n')
            .map(line => {
                // Handle bullet points
                if (line.trim().startsWith('• ')) {
                    return `<li>${line.trim().substring(2)}</li>`;
                }
                // Handle empty lines
                if (line.trim() === '') {
                    return '<br>';
                }
                // Regular text
                return `<p>${line}</p>`;
            })
            .join('');
        
        // Wrap consecutive list items in ul tags
        html = html.replace(/(<li>.*?<\/li>)/gs, (match) => {
            return `<ul>${match}</ul>`;
        });
        
        return html;
    };

    // Rich text formatting functions
    const applyFormatting = (formatType) => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textContent.substring(start, end);
        let newText = textContent;

        switch (formatType) {
            case 'bold':
                if (selectedText) {
                    newText = textContent.substring(0, start) + `**${selectedText}**` + textContent.substring(end);
                } else {
                    newText = textContent.substring(0, start) + '**' + textContent.substring(start);
                    textarea.selectionStart = textarea.selectionEnd = start + 2;
                }
                setIsBold(!isBold);
                break;
            case 'italic':
                if (selectedText) {
                    newText = textContent.substring(0, start) + `*${selectedText}*` + textContent.substring(end);
                } else {
                    newText = textContent.substring(0, start) + '*' + textContent.substring(start);
                    textarea.selectionStart = textarea.selectionEnd = start + 1;
                }
                setIsItalic(!isItalic);
                break;
            case 'underline':
                if (selectedText) {
                    newText = textContent.substring(0, start) + `__${selectedText}__` + textContent.substring(end);
                } else {
                    newText = textContent.substring(0, start) + '__' + textContent.substring(start);
                    textarea.selectionStart = textarea.selectionEnd = start + 2;
                }
                setIsUnderline(!isUnderline);
                break;
            case 'list':
                const lines = textContent.split('\n');
                const currentLineIndex = textContent.substring(0, start).split('\n').length - 1;
                if (lines[currentLineIndex] && !lines[currentLineIndex].startsWith('• ')) {
                    lines[currentLineIndex] = '• ' + lines[currentLineIndex];
                    newText = lines.join('\n');
                    setIsListMode(true);
                }
                break;
            default:
                break;
        }

        setTextContent(newText);
        
        // Focus back to textarea after formatting
        setTimeout(() => {
            textarea.focus();
        }, 0);
    };

    const handleTextAlign = (alignment) => {
        setTextAlign(alignment);
        // Apply alignment to the textarea
        if (textareaRef.current) {
            textareaRef.current.style.textAlign = alignment;
        }
    };

    const clearManualText = () => {
        setTextContent('');
        setIsBold(false);
        setIsItalic(false);
        setIsUnderline(false);
        setTextAlign('left');
        setIsListMode(false);
    };

    const removeExistingImage = () => {
        setShowExistingImage(false);
        // Clear any existing text content when removing image
        setTextContent('');
        // Reset formatting states
        setIsBold(false);
        setIsItalic(false);
        setIsUnderline(false);
        setTextAlign('left');
        setIsListMode(false);
    };

    const switchToManualMode = () => {
        // Clear any selected file when switching to manual mode
        if (selectedFile) {
            clearFile();
        }
        setManualMode(true);
    };

    const switchToFileMode = () => {
        // Check if there's manual content that would be lost
        const hasManualContent = (textContent && textContent.trim() !== '') || 
                                (isEditMode && editData?.image && showExistingImage);
        
        if (hasManualContent) {
            Swal.fire({
                icon: 'warning',
                title: 'Unsaved Changes',
                text: 'Switching back will clear your manual content. Are you sure you want to continue?',
                showCancelButton: true,
                confirmButtonText: 'Yes, Continue',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Clear manual content when switching to file mode
                    if (manualMode) {
                        clearManualText();
                    }
                    setManualMode(false);
                    setShowExistingImage(false);
                }
            });
        } else {
            // No content to lose, switch immediately
            if (manualMode) {
                clearManualText();
            }
            setManualMode(false);
            setShowExistingImage(false);
        }
    };

    // Function to check if all required fields are filled
    const isFormComplete = () => {
        // Check basic required fields
        if (!title.trim()) return false;
        if (!dueDate) return false;
        if (!mark || mark.trim() === '') return false;
        
        // Check content requirement (either file or manual content)
        const hasFile = selectedFile !== null;
        const hasManualContent = (manualMode && textContent && textContent.trim() !== '') || 
                                (isEditMode && editData?.image && showExistingImage);
        
        // Must have either file or manual content
        if (!hasFile && !hasManualContent) return false;
        
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check if both PDF and manual content are present
        const hasFile = selectedFile !== null;
        const hasManualContent = (manualMode && textContent && textContent.trim() !== '') || 
                                (isEditMode && editData?.image && showExistingImage);
        
        if (hasFile && hasManualContent) {
            Swal.fire({
                icon: 'error',
                title: 'Content Conflict',
                text: 'You cannot submit both a PDF file and manual content. Please choose only one method.',
                confirmButtonText: 'OK'
            });
            return;
        }
        
        // Validation: Either PDF or manual text must be provided
        if (!selectedFile && (!textContent || textContent.trim() === '')) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Please either upload a PDF file or add manual text content. At least one is required.'
            });
            return;
        }

        // Basic form validation
        if (!title.trim() || !dueDate || !mark) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Please fill in all required fields (Title, Due Date, Mark).'
            });
            return;
        }

        try {
            const formData = new FormData();
            formData.append('class_name', class_name);
            formData.append('division', division);
            formData.append('teacher', teacher_id);
            formData.append('subject', subject);
            formData.append('title', title);
            formData.append('due_date', dueDate);
            formData.append('mark', mark);
            
            // Add ID for edit mode
            if (isEditMode && editData) {
                formData.append('id', editData.id);
            }
            
            if (selectedFile) {
                if (selectedFile.isExistingFile) {
                    // If it's an existing file, we don't need to append it again
                    // The backend should handle keeping the existing file
                    formData.append('keep_existing_pdf', 'true');
                    formData.append('existing_pdf_url', selectedFile.url);
                } else {
                    // New file selected
                    formData.append('pdf', selectedFile);
                }
            }
            
            // Handle existing image removal in edit mode
            if (isEditMode && editData?.image && !showExistingImage) {
                formData.append('remove_existing_image', 'true');
            }
            
            if (manualMode && textContent.trim()) {
                // Always send the original text content for future editing
                formData.append('manual_content', textContent);
                formData.append('text_alignment', textAlign);
                
                // Convert text content to HTML and then to PNG
                const htmlContent = convertToHTML(textContent);
                console.log('Original text:', textContent);
                console.log('Converted HTML:', htmlContent);
                
                // Create a temporary div to render the HTML content
                const tempDiv = document.createElement('div');
                tempDiv.style.cssText = `
                    position: absolute;
                    left: -9999px;
                    top: -9999px;
                    width: 800px;
                    padding: 20px;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    font-size: 16px;
                    line-height: 1.6;
                    text-align: ${textAlign};
                    background: white;
                    color: black;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                `;
                
                // Create the complete HTML with styles
                const completeHTML = `
                    <style>
                        p { margin: 0 0 10px 0; }
                        ul { margin: 10px 0; padding-left: 20px; }
                        li { margin: 5px 0; }
                        strong { font-weight: bold; }
                        em { font-style: italic; }
                        u { text-decoration: underline; }
                    </style>
                    <div style="width: 100%; height: 100%;">
                        ${htmlContent}
                    </div>
                `;
                
                tempDiv.innerHTML = completeHTML;
                
                document.body.appendChild(tempDiv);

                try {

                    // Wait a bit for the content to render properly
                    await new Promise(resolve => setTimeout(resolve, 200));

                    // Get the actual content div for conversion
                    const contentDiv = tempDiv.querySelector('div');
                    if (!contentDiv) {
                        throw new Error('Content div not found');
                    }

                    console.log('Content div:', contentDiv);
                    console.log('Content div innerHTML:', contentDiv.innerHTML);
                    console.log('Content div scrollHeight:', contentDiv.scrollHeight);

                    // Convert HTML to PNG
                    const dataUrl = await toPng(contentDiv, { 
                        backgroundColor: '#ffffff',
                        width: 800,
                        height: Math.max(contentDiv.scrollHeight + 40, 200),
                        style: {
                            transform: 'scale(1)',
                            transformOrigin: 'top left'
                        }
                    });
                    
                    const blob = await (await fetch(dataUrl)).blob();
                    formData.append('image', blob, 'assignment-content.png');
                    
                    // Remove temporary div
                    document.body.removeChild(tempDiv);
                    
                    Swal.close();
                } catch (conversionError) {
                    console.error('Error converting to image:', conversionError);
                    if (document.body.contains(tempDiv)) {
                        document.body.removeChild(tempDiv);
                    }
                    
                    // Try a simpler approach as fallback
                    try {
                        console.log('Trying fallback conversion method...');
                        
                        const fallbackDiv = document.createElement('div');
                        fallbackDiv.style.cssText = `
                            position: absolute;
                            left: -9999px;
                            top: -9999px;
                            width: 800px;
                            padding: 20px;
                            font-family: Arial, sans-serif;
                            font-size: 16px;
                            line-height: 1.5;
                            text-align: ${textAlign};
                            background: white;
                            color: black;
                            border: 1px solid #ccc;
                            border-radius: 8px;
                        `;
                        
                        // Simple text conversion without complex HTML
                        const simpleText = textContent
                            .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markers
                            .replace(/\*(.*?)\*/g, '$1') // Remove italic markers
                            .replace(/__(.*?)__/g, '$1') // Remove underline markers
                            .replace(/^•\s+/gm, '• ') // Keep bullet points simple
                            .split('\n')
                            .map(line => `<div style="margin: 5px 0;">${line}</div>`)
                            .join('');
                        
                        fallbackDiv.innerHTML = simpleText;
                        document.body.appendChild(fallbackDiv);
                        
                        await new Promise(resolve => setTimeout(resolve, 100));
                        
                        const fallbackDataUrl = await toPng(fallbackDiv, {
                            backgroundColor: '#ffffff',
                            width: 800,
                            height: Math.max(fallbackDiv.scrollHeight + 40, 200)
                        });
                        
                        const fallbackBlob = await (await fetch(fallbackDataUrl)).blob();
                        formData.append('image', fallbackBlob, 'assignment-content.png');
                        
                        document.body.removeChild(fallbackDiv);
                        console.log('Fallback conversion successful');
                        
                    } catch (fallbackError) {
                        console.error('Fallback conversion also failed:', fallbackError);
                        // If both methods fail, we still have the text content
                        // The backend can handle this case
                    }
                }
            }

            // Show loading spinner for submission
            Swal.fire({
                title: "Submitting Assignment",
                text: "Please wait...",
                allowOutsideClick: false,
                showConfirmButton: false,
                onBeforeOpen: () => {
                    Swal.showLoading();
                },
            });

            const requestMethod = isEditMode ? 'put' : 'post';
            const requestUrl = isEditMode ? `${APIURL}/api/assignment/${editData.id}` : `${APIURL}/api/assignment`;
            
            await axios[requestMethod](requestUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            Swal.close();
            
            Swal.fire({
                icon: 'success',
                title: isEditMode ? 'Assignment Updated' : 'Assignment Added',
                text: isEditMode ? 'The assignment was updated successfully!' : 'The assignment was added successfully!'
            });
            onClose();
        } catch (error) {
            console.error('Error adding assignment:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to add assignment.'
            });
        }
    };

    return (
        <div className="newteacheraddassignment-overlay">
            <div className="newteacheraddassignment-modal" >
                {/* Header */}
                <div className="newteacheraddassignment-header">
                    <p className="newteacheraddassignment-title">
                        {isEditMode ? 'Edit Assignment' : 'Add Assignment'}
                    </p>
                    <button className="newteacheraddassignment-close" onClick={onClose}>
                        <IoClose size={24} />
                    </button>
                </div>

                {/* Body (scrollable) */}
                {!manualMode ? (
                    <div className="newteacheraddassignment-body">
                        <div className="newteacheraddassignment-info-row">
                            <div className="newteacheraddassignment-field">
                                <label>Title <span className="newteacheraddassignment_required">*</span></label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    // placeholder="Enter title"
                                    className="newteacheraddassignment-input"
                                />
                            </div>

                            <div className="newteacheraddassignment-field">
                                <label>Due Date <span className="newteacheraddassignment_required">*</span></label>
                                <div className="newteacheraddassignment-datepicker">
                                    <input
                                        type="date"
                                        value={dueDate}
                                        onChange={e => setDueDate(e.target.value)}
                                        className="newteacheraddassignment-input"
                                    />
                                    <BsCalendar3 className="calendar-icon" />
                                </div>
                            </div>

                            <div className="newteacheraddassignment-field">
                                <label>Mark <span className="newteacheraddassignment_required">*</span></label>
                                <input
                                    type="number"
                                    value={mark}
                                    onChange={e => setMark(e.target.value)}
                                    // placeholder="0"
                                    className="newteacheraddassignment-input"
                                    onWheel={e => e.target.blur()}
                                />
                            </div>
                        </div>
                        <div className="newteacheraddassignment-add-question-row">
                            <p className="newteacheraddassignment-add-question-heading">
                                Add Question
                            </p>
                            <div className="newteacheraddassignment-btn-row">
                                <button
                                    type="button"
                                    className="newteacheraddassignment-upload-btn-primary"
                                >
                                    Upload File
                                </button>
                                <button
                                    type="button"
                                    className="newteacheraddassignment-manual-btn"
                                    onClick={() => {
                                        // Check if a file is already selected
                                        if (selectedFile) {
                                            Swal.fire({
                                                icon: 'warning',
                                                title: 'Content Conflict',
                                                text: 'You already have a file selected. Please remove the file first before creating manual content, or choose one method only.',
                                                confirmButtonText: 'OK'
                                            });
                                            return;
                                        }
                                        switchToManualMode();
                                    }}
                                >
                                    Create Manually &rarr;
                                </button>
                            </div>
                        </div>

                        {/* Upload area */}
                        <div className="newteacheraddassignment-upload">
                            <div
                                className="newteacheraddassignment-dropzone"
                                onClick={() => {
                                    // Check if manual content exists
                                    const hasManualContent = manualMode || 
                                                           (isEditMode && editData?.image && showExistingImage) ||
                                                           (textContent && textContent.trim() !== '');
                                    
                                    if (hasManualContent) {
                                        Swal.fire({
                                            icon: 'warning',
                                            title: 'Content Conflict',
                                            text: 'You already have manual content. Please clear the manual content first before uploading a file, or choose one method only.',
                                            confirmButtonText: 'OK'
                                        });
                                        return;
                                    }
                                    
                                    fileInputRef.current.click();
                                }}
                            >
                                <p className="newteacheraddassignment-dropzone_clickp">
                                    Click to Upload or Drag PDF/DOC here </p>
                                <p className="newteacheraddassignment-dropzone_maxp">Max. file size 25MB</p>

                                <button
                                    type="button"
                                    className="newteacheraddassignment-upload-btn"
                                    onClick={e => {
                                        e.stopPropagation();
                                        
                                        // Check if manual content exists
                                        const hasManualContent = manualMode || 
                                                               (isEditMode && editData?.image && showExistingImage) ||
                                                               (textContent && textContent.trim() !== '');
                                        
                                        if (hasManualContent) {
                                            Swal.fire({
                                                icon: 'warning',
                                                title: 'Content Conflict',
                                                text: 'You already have manual content. Please clear the manual content first before uploading a file, or choose one method only.',
                                                confirmButtonText: 'OK'
                                            });
                                            return;
                                        }
                                        
                                        fileInputRef.current.click();
                                    }}
                                >
                                    Upload File
                                </button>
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />

                            </div>



                            {/* <=== the new "chip" that appears once a file is selected=== */}
                            {selectedFile && (
                                <div className="newteacheraddassignment-file-info">

                                    <AiOutlineFilePdf
                                        className="newteacheraddassignment-file-icon"
                                        size={20}
                                    />

                                    <span className="newteacheraddassignment-file-name">
                                        {selectedFile.name}
                                        {selectedFile.isExistingFile && (
                                            <span style={{ color: '#666', fontSize: '12px', marginLeft: '8px' }}>
                                                (Existing file)
                                            </span>
                                        )}
                                    </span>
                                    <button
                                        className="newteacheraddassignment-file-remove"
                                        onClick={clearFile}
                                        aria-label="Remove file"
                                    >
                                        ×
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="newaddassignmentmanually-body">
                        {/* Show existing image in edit mode */}
                        {isEditMode && showExistingImage && editData?.image && (
                            <div style={{ 
                                marginBottom: '20px',
                                position: 'relative',
                                display: 'inline-block'
                            }}>
                                <img 
                                    src={editData.image} 
                                    alt="Existing assignment content"
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '300px',
                                        border: '1px solid #ddd',
                                        borderRadius: '8px',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                    }}
                                />
                                <button
                                    onClick={removeExistingImage}
                                    style={{
                                        position: 'absolute',
                                        top: '-10px',
                                        right: '-10px',
                                        width: '30px',
                                        height: '30px',
                                        borderRadius: '50%',
                                        backgroundColor: '#ff4444',
                                        color: 'white',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                    }}
                                    title="Remove existing image"
                                >
                                    ×
                                </button>
                            </div>
                        )}
                        
                        {/* Rich text editor with formatting toolbar - only show when image is removed */}
                        {(!showExistingImage || !isEditMode) && (
                            <>
                                <textarea
                                    ref={textareaRef}
                                    className="newaddassignmentmanually-textarea"
                                    placeholder="Type your Question here"
                                    value={textContent}
                                    onChange={(e) => setTextContent(e.target.value)}
                                    style={{ textAlign: textAlign }}
                                />
                                <div className="newaddassignmentmanually-toolbar">
                                    <button 
                                        type="button" 
                                        onClick={() => applyFormatting('bold')}
                                        className={isBold ? 'active' : ''}
                                        title="Bold"
                                    >
                                        <FaBold />
                                    </button>
                                    <button 
                                        type="button" 
                                        onClick={() => applyFormatting('italic')}
                                        className={isItalic ? 'active' : ''}
                                        title="Italic"
                                    >
                                        <FaItalic />
                                    </button>
                                    <button 
                                        type="button" 
                                        onClick={() => applyFormatting('underline')}
                                        className={isUnderline ? 'active' : ''}
                                        title="Underline"
                                    >
                                        <FaUnderline />
                                    </button>
                                    <button 
                                        type="button" 
                                        onClick={() => handleTextAlign('left')}
                                        className={textAlign === 'left' ? 'active' : ''}
                                        title="Align Left"
                                    >
                                        <AiOutlineAlignLeft />
                                    </button>
                                    <button 
                                        type="button" 
                                        onClick={() => handleTextAlign('center')}
                                        className={textAlign === 'center' ? 'active' : ''}
                                        title="Align Center"
                                    >
                                        <AiOutlineAlignCenter />
                                    </button>
                                    <button 
                                        type="button" 
                                        onClick={() => handleTextAlign('right')}
                                        className={textAlign === 'right' ? 'active' : ''}
                                        title="Align Right"
                                    >
                                        <AiOutlineAlignRight />
                                    </button>
                                    <button 
                                        type="button" 
                                        onClick={() => applyFormatting('list')}
                                        className={isListMode ? 'active' : ''}
                                        title="Bullet List"
                                    >
                                        <FaListUl />
                                    </button>
                                </div>
                            </>
                        )}
                        
                        {/* Preview area for formatted content - only show when image is removed */}
                        {textContent && (!showExistingImage || !isEditMode) && (
                            <div className="newaddassignmentmanually-preview">
                                <h6>Preview:</h6>
                                <div 
                                    ref={contentRef}
                                    className="newaddassignmentmanually-preview-content"
                                    style={{ textAlign: textAlign }}
                                    dangerouslySetInnerHTML={{ __html: convertToHTML(textContent) }}
                                />
                            </div>
                        )}
                        
                        
                        {/* Success message when original content is recovered */}
                        {isEditMode && editData?.image && editData?.manual_content && showExistingImage && (
                            <div style={{ 
                                marginTop: '12px', 
                                padding: '8px 12px', 
                                backgroundColor: '#d4edda', 
                                border: '1px solid #c3e6cb', 
                                borderRadius: '4px',
                                fontSize: '14px',
                                color: '#155724'
                            }}>
                                <strong>✓ Content Recovered:</strong> Your original text content has been restored for editing.
                            </div>
                        )}
                    </div>
                )}

                {/* Footer */}
                {!manualMode ? (
                    <div className="newteacheraddassignment-footer">
                        <button 
                            className="newaddassignmentmanually-submit-btn" 
                            style={{
                                backgroundColor: isFormComplete() ? '#2162B2' : '#bcbcbc',
                                color: '#fff',
                                border: isFormComplete() ? '1px solid #2162B2' : '1px solid #bcbcbc',
                                cursor: 'pointer'
                            }}
                            onClick={handleSubmit}
                        >
                            {isEditMode ? 'Update' : 'Submit'}
                        </button>
                    </div>
                ) : (
                    <div className="newaddassignmentmanually-footer">
                        {/* BACK BUTTON (left side) */}
                        <button
                            className="newaddassignmentmanually-back-btn"
                            onClick={() => setManualMode(false)}
                        >
                            Back
                        </button>

                        {/* CLEAR + SUBMIT (right side) */}
                        <div className="newaddassignmentmanually-footer-actions">
                            <button
                                className="newaddassignmentmanually-clear-btn"
                                onClick={clearManualText}
                            >
                                Clear
                            </button>
                            <button 
                                className="newaddassignmentmanually-submit-btn" 
                                style={{
                                    backgroundColor: isFormComplete() ? '#2162B2' : '#bcbcbc',
                                    color: '#fff',
                                    border: isFormComplete() ? '1px solid #2162B2' : '1px solid #bcbcbc',
                                    cursor: 'pointer'
                                }}
                                onClick={handleSubmit}
                            >
                                {isEditMode ? 'Update' : 'Submit'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewTeacherAddAssignment;
