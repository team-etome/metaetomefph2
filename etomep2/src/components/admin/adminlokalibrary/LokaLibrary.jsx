import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { FaArrowLeft, FaSpinner, FaRedo } from "react-icons/fa";
import Select from "react-select";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2'; 
import '../adminlokalibrary/lokalibrary.css'

function LokaLibrary() {
    const [selectedTab, setSelectedTab] = useState("pdf");
    const [ totalChaptersInput, setTotalChaptersInput] = useState("");
    const [chapters, setChapters] = useState([]);
    const [textbookName, setTextbookName] = useState("");
    const [subjectOptions, setSubjectOptions] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState("");
    const [volume, setVolume] = useState("");
    const [publisherName, setPublisherName] = useState("");
    const [p, setP] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    const [data, setData] = useState("");
    
    const [showChapterDiv, setShowChapterDiv] = useState(false);

    console.log(selectedSubject, "subjectttttt");

    console.log(publisherName,"publisher nameeeeeee")
  
    const APIURL = useSelector((state) => state.APIURL.url);
    useEffect(() => {
        // Fetch subjects from the backend
        const fetchSubjects = async () => {
          try {
            const response = await axios.get(`${APIURL}/api/addsubject`);
            const subjectsData = response.data.map((subject) => subject.subject);
            const uniqueSubjects = [...new Set(subjectsData)].map((subject) => ({
              value: subject,
              label: subject,
            }));
            setSubjectOptions(uniqueSubjects);
          } catch (error) {
            console.error("Error fetching subjects:", error);
          }
        };
    
        fetchSubjects();
      }, [APIURL]);
    

    
      const { id } = useParams();
    
      useEffect(() => {
        if (id) {
          const fetchData = async () => {
            try {
              const response = await axios.get(
                `${APIURL}/api/detail-textbook/${id}`
              );
              setData(response.data);
              console.log(response.data, "newwwwwwww");
              setLoading(false);
            } catch (error) {
              setLoading(false);
              console.error("Error fetching textbook data:", error);
            }
          };
    
          fetchData();
        } else {
          setData(null);
        }
      }, [id]);
    
      useEffect(() => {
        if (data && data[0].chapter_info) {
          setTextbookName(data[0].text_name || "");
          setSelectedSubject({ value: data[0].subject, label: data[0].subject } || "");
          setVolume(data[0].volume || "");
          setPublisherName({
            value: data[0].publisher_name,
            label: data[0].publisher_name,
          });
         
          setTotalChaptersInput(data[0].total_chapters);
          setImageFile(data[0]?.textbook_image);
          setPdfFile(data[0]?.textbook_pdf);
    
          setChapters(
            data[0].chapter_info.map((chapter) => ({
              name: chapter.name || "",
              pageNo: chapter.page_no || "",
            })) || []
          );
        }
      }, [data]);
    
      const navigate = useNavigate();
    
      const [loading, setLoading] = useState(false);
    
      const handlePublisherChange = (selectedOptions) => {
        setPublisherName(selectedOptions);
        setP(selectedOptions.value);
      };
      const publishers = [
        "MADHUBAN",
        "GOYAL",
        "VIVA - EDUCATION",
        "ANAND",
        "UGS",
        "INDIANNICA",
        "BOSEM",
        "GLOBAL",
        "ANAND BOOKS",
        "APC",
        "BOARD",
        "NEW SARASWATI",
        "Cambridge",
        "Amenta",
        "Marina Publication",
        "Bharati Bhavan",
        "Inspiration Publication",
        "Saraswati Publication",
        "Goyal Brothers",
        "Jay Cee",
        "Kips",
        "Assam Book Dipo",
        "NEDSSS Publication",
        "ASTPPCL",
        "Assam Book depot",
        "NEDSSS Publi.",
        "CBSE/Dhanpat Raj & C",
        "TYCHEE",
        "Progress",
        "Headword Publishing Company",
        "Acevision Publisher Pvt Ltd",
        "Arya Publishing Company",
        "Edutree Publishers Pvt Ltd",
        "Evergreen Publications Ltd",
        "Orient BlackSwan",
        "Full Marks Pvt Ltd",
        "Langers International",
        "Vision Publications",
        "Avichal Publishing Co.",
        "Prachi India Pvt. Ltd.",
        "O. U. P.",
        "Black Pearl Publications",
        "Selina Publications",
        "Goyal Prakashan",
        "Dhanpat Rai & Co.",
        "Unisec Publications",
        "Morning Star",
        "Avichal Publishing Co.",
        "Huda Publications",
        "I. U. P.",
        "NCERT",
      ];
      const publisherOptions = publishers.map((publisher) => ({
        value: publisher,
        label: publisher,
      }));
    
      const handleTabChange= (e, tab) => {
        e.preventDefault(); 
        setSelectedTab(tab);
      };
    
      const handleChapterInputChange = (index, fieldName, value) => {
        const updatedChapters = [...chapters];
        updatedChapters[index][fieldName] = value;
        setChapters(updatedChapters);
      };
    
      const clearPdfFile = () => {
        setPdfFile(null);
      };
    
      const clearImageFile = () => {
        setImageFile(null);
      };
    
      const renderChapterInputs = () => {
        return chapters.map((chapter, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              padding: "0px",
              marginTop: index === 0 ? "0px" : "20px",
            }}
          >
            <div style={{ marginLeft: "0px" }}>
              <label>
                <input
                  type="text"
                  placeholder="Chapter Name"
                  style={{
                    border: "none",
                    borderBottom: "1px solid black",
                    width: "180px",
                    outline: "none",
                  }}
                  value={chapter.name}
                  onChange={(e) =>
                    handleChapterInputChange(index, "name", e.target.value)
                  }
                />
              </label>
            </div>
            <div>
              <label style={{ marginLeft: "20px" }}>
                <input
                  type="text"
                  placeholder="Page No:"
                  style={{
                    border: "none",
                    borderBottom: "1px solid black",
                    width: "180px",
                    outline: "none",
                  }}
                  value={chapter.pageNo}
                  onChange={(e) =>
                    handleChapterInputChange(index, "pageNo", e.target.value)
                  }
                />
              </label>
            </div>
          </div>
        ));
      };
    
    const handleTotalChaptersChange = (e) => {
        const totalChapters = parseInt(e.target.value, 10);
        // Set whether to show chapter inputs based on the number of chapters entered
        setShowChapterDiv(totalChapters > 5);
    
        if (!isNaN(totalChapters)) {
            if (totalChapters > 50) { // Assuming 50 is the maximum allowed chapters
                Swal.fire({
                    icon: 'warning',
                    title: 'Limit Exceeded',
                    text: `You can only enter up to 50 chapters.`,
                });
                setTotalChaptersInput(50);
                const updatedChapters = Array.from(
                    { length: 50 },
                    (_, index) => ({ name: "", pageNo: "" })
                );
                setChapters(updatedChapters);
            } else {
                setTotalChaptersInput(totalChapters);
                const updatedChapters = Array.from(
                    { length: totalChapters },
                    (_, index) => ({ name: "", pageNo: "" })
                );
                setChapters(updatedChapters);
            }
        } else {
            setTotalChaptersInput("");
            setChapters([]);
        }
    };
    
      
    
      const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
      };
    
      const handlePdfUpload = (e) => {
        const file = e.target.files[0];
        setPdfFile(file);
      };
    
      const handleVolumeChange = (e) => {
        const value = e.target.value;
        // Prevent negative values
        if (/^[a-zA-Z0-9]*$/.test(value)) {
          setVolume(value);
        }
      };
    
      const handleSubmit = async () => {
        if (
          !textbookName ||
          !selectedSubject ||
          // !volume ||
          !publisherName ||
          !pdfFile ||
          !imageFile
        ) {
          let missingFields = [];
          if (!textbookName) missingFields.push("textbook name");
          if (!selectedSubject) missingFields.push("Subject");
          if (!publisherName) missingFields.push("publisher name");
          if (!pdfFile) missingFields.push("PDF file");
          if (!imageFile) missingFields.push("image file");
    
          Swal.fire({
            icon: "error",
            title: "Missing Required Information",
            text: `Please complete the following fields: ${missingFields.join(
              ", "
            )}.`,
          });
          setLoading(false);
          return;
        }
    
        setLoading(true);
        try {
          const formData = new FormData();
          formData.append("text_name", textbookName);
          formData.append("subject", selectedSubject.value);
          formData.append("volume", volume);
          formData.append("textbook_pdf", pdfFile);
          formData.append("textbook_front_page", imageFile);
          formData.append("publisher_name", p);
    
          // publisherName.forEach((publisherValue, index) => {
          //   formData.append(`publisher_name[${index}]`, publisherValue.value);
          // });
    
          chapters.forEach((chapter, index) => {
            formData.append("chapter_name", chapter.name);
            formData.append("page_no", chapter.pageNo);
          });
    
          const response = await axios.post(
            `${APIURL}/api/create-textbook/`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
    
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Textbook created successfully!",
          });
    
          navigate("/adminlokanavbar");
        } catch (error) {
          console.error("Error creating textbook:", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        } finally {
          setLoading(false);
        }
      };
    

      const handleUpdate = async () => {
        if (
          !textbookName ||
          !selectedSubject ||
          !publisherName ||
          !pdfFile ||
          !imageFile
        ) {
          let missingFields = [];
    
          if (!textbookName) missingFields.push("textbook name");
          if (!selectedSubject) missingFields.push("Subject");
          if (!publisherName) missingFields.push("publisher name");
          if (!pdfFile) missingFields.push("PDF file");
          if (!imageFile) missingFields.push("image file");
    
          Swal.fire({
            icon: "error",
            title: "Missing Required Information",
            text: `Please complete the following fields: ${missingFields.join(
              ", "
            )}.`,
          });
          setLoading(false);
          return;
        }
    
        // const confirmResult = await Swal.fire({
        //   title: "Confirm Update",
        //   text: "Are you sure you want to update this textbook?",
        //   icon: "warning",
        //   showCancelButton: true,
        //   confirmButtonColor: "#3085d6",
        //   cancelButtonColor: "#d33",
        //   confirmButtonText: "Yes, update it!",
        // });
    
        // if (confirmResult.isConfirmed) {
        //   setLoading(true);
    
        //   try {
        //     const formData = new FormData();
        //     formData.append("id", id);
        //     formData.append("text_name", textbookName);
        //     formData.append("subject", selectedSubject.value);
        //     formData.append("volume", volume);
        //     formData.append("textbook_pdf", pdfFile);
        //     formData.append("textbook_front_page", imageFile);
    
        //     if (Array.isArray(publisherName)) {
        //       publisherName.forEach((publisher, index) => {
        //         formData.append(`publisher_name[${index}]`, publisher.value);
        //       });
        //     } else {
        //       formData.append("publisher_name", publisherName.value);
        //     }
    
        //     chapters.forEach((chapter, index) => {
        //       formData.append(`chapter_name[${index}]`, chapter.name);
        //       formData.append(`page_no[${index}]`, chapter.pageNo);
        //     });
    
        //     console.log("FormData:", formData);
    
        //     const response = await axios.put(
        //       `${APIURL}/api/update-textbook`,
        //       formData,
        //       {
        //         headers: {
        //           "Content-Type": "multipart/form-data",
        //         },
        //       }
        //     );
    
        //     Swal.fire({
        //       icon: "success",
        //       title: "Success!",
        //       text: "Textbook updated successfully!",
        //     });
    
        //     navigate("/GodHeader");
        //   } catch (error) {
        //     console.error("Error updating textbook:", error);
        //     Swal.fire({
        //       icon: "error",
        //       title: "Oops...",
        //       text: "Something went wrong!",
        //     });
        //   } finally {
        //     setLoading(false);
        //   }
        // }
      };

      const customStyles = {
        control: (base, state) => ({
          ...base,
          width: "100%",
          minHeight: "50px",
          border: "1px solid #526D82",
          borderRadius: "8px",
          boxShadow: state.isFocused ? "0 0 0 1px #526D82" : "none",
          "&:hover": {
            borderColor: "none",
          },
          "&:focus": {
            borderColor: "#526D82",
            outline: "none",
          },
        }),
        placeholder: (base) => ({
          ...base,
          color: "#526D82",
        }),
        singleValue: (base) => ({
          ...base,
          color: "#000",
        }),
        option: (base) => ({
          ...base,
          color: "#000",
        }),
        valueContainer: (base) => ({
          ...base,
          padding: "0 10px",
        }),
        dropdownIndicator: (base) => ({
          ...base,
          color: "#526D82",
        }),
        indicatorsContainer: (base) => ({
          ...base,
          alignItems: "center",
        }),
        menu: (base) => ({
          ...base,
          zIndex: 9999,
          position: "absolute",
        }),
      };

  return (
    <div>
      <Container className="loka_lib_container">
        <form className="loka_lib_form">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <Link to="/adminlokanavbar">
              <IoChevronBackSharp className="loka_lib_back" />
            </Link>
            <h1 className="loka_lib_title">Add Books</h1>
          </div>
          <div style={{ border: "0.5px solid #526D82" }}></div>
          <div className="loka_lib_form_scroll">

          <Row style={{ paddingTop: "20px" }}>
            <Col md={6}>
                  <div className="loka_library_group">
                    <label htmlFor="textbookName">
                      Textbook Name
                    </label>
                    <input
                      type="text"
                      id="textbookName"
                      name="textbookName"
                      value={textbookName}
                      maxLength="100"
                      style={{ textTransform: "capitalize" }}
                      onChange={(e) => setTextbookName(e.target.value)}
                    />
                  </div>
                  <div
                    className="loka_library_group"
                  >
                    <label
                      htmlFor="subject"
                    >
                      Subject
                    </label>
                    <Select
                      id="subject"
                      name="subject"
                      options={subjectOptions}
                      value={selectedSubject}
                      onChange={(option) => setSelectedSubject(option)}
                      styles={customStyles}
                    />
                  </div>
            </Col>

            <Col md={6}>
            <div className="loka_library_group">
                    <label htmlFor="volume">
                      Volume
                    </label>
                    <input
                      type="text"
                      id="volume"
                      name="volume"
                      value={volume}
                      maxLength="100"
                      style={{ textTransform: "capitalize" }}
                      // onChange={(e) => setVolume(e.target.value)}
                      onChange={handleVolumeChange}
                    />
                  </div>

                  <div
                    className="loka_library_group"
                  >
                    <label
                      htmlFor="publisherName"
                    >
                      Publisher Name
                    </label>

                    <Select
                      id="publisherName"
                      name="publisherName"
                      options={publisherOptions}
                      placeholder=""
                      // isMulti
                      value={publisherName}
                      maxLength="100"
                      onChange={handlePublisherChange}
                      styles={customStyles}
                    />
                  </div>
            </Col>
          </Row>
          <Row className="lib_media_index">
            <Col md={6}>
            <div>
                    <label
                      htmlFor="indexAdding"
                      style={{
                        // marginLeft: "0px",
                        fontSize: "25px",
                        // marginBottom: "20px",
                        // marginTop: "20px",
                      }}
                    >
                      Index Adding
                    </label>
                  </div>
                  <div className="loka_library_group lib_index_field" >
                    <label
                      htmlFor="totalChapters"
                    >
                      Total no of Chapters
                    </label>
                    <input
                      type="number"
                      id="totalChapters"
                      name="totalChapters"
                      value={totalChaptersInput}
                      onChange={handleTotalChaptersChange}
                      max='50'
                    />
                  </div>
                  <div className={`lib_chapter_div ${totalChaptersInput <= 5 ? 'lib_hidden_border' : ''}`}>
            {renderChapterInputs()}
        </div>
                </Col>
                <Col md={6} className="loka_lib_media">
                <div style={{}}>
                      <label
                        htmlFor="mediaLibrary"
                        className="loka_lib_media_label"
                      >
                        Media Library
                      </label>
                    </div>
                    <div>
                      <div style={{ marginLeft: "10px" }}>
                        <div style={{ display: "flex" }}>
                          <div className="textbutton_lib_container" style={{}}>
                            <button
                              style={{
                                ...(selectedTab === "pdf"
                                  ? { border: "4px solid black" }
                                  : {}),
                              }}
                              onClick={(e) => handleTabChange(e,"pdf")}
                              className={selectedTab === "pdf" ? "active" : ""}
                            >
                              Textbook Pdf
                            </button>
                          </div>
                          <div className="textbutton_lib_container" style={{}}>
                            <button
                              style={{
                                ...(selectedTab === "frontPage"
                                  ? { border: "4px solid black" }
                                  : {}),
                              }}
                              onClick={(e) => handleTabChange(e,"frontPage")}
                              className={
                                selectedTab === "frontPage" ? "active" : ""
                              }
                            >
                              Textbook Front Page
                            </button>
                          </div>
                        </div>
                      </div>

                      {selectedTab === "pdf" && (
                        <div style={{ marginLeft: "10px" }}>
                          <label htmlFor="pdf" style={{}}></label>
                          <div className="library_image_upload_container">
                            <div className="library_upload_placeholder">
                              {pdfFile ? (
                                <>
                                  <embed
                                    src={URL.createObjectURL(pdfFile)}
                                    type="application/pdf"
                                    width="100%"
                                    height="200px"
                                  />
                                  <button
                                    onClick={clearPdfFile}
                                    style={{
                                      border: "none",
                                      background: "none",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <FaRedo
                                      style={{
                                        color: "blue",
                                        fontSize: "20px",
                                      }}
                                      title="Change PDF"
                                    />
                                  </button>
                                </>
                              ) : (
                                <>
                                  <label
                                    htmlFor="pdf-upload"
                                    className="textbook_upload_label"
                                  >
                                    Upload PDF
                                  </label>
                                  <input
                                    id="pdf-upload"
                                    type="file"
                                    accept=".pdf"
                                    className="textbook_upload_input"
                                    onChange={handlePdfUpload}
                                  />
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {selectedTab === "frontPage" && (
                        <div>
                          <label htmlFor="photo" style={{}}></label>
                          <div className="library_image_upload_container">
                            <div className="library_upload_placeholder">
                              {imageFile ? (
                                <>
                                  <img
                                    src={URL.createObjectURL(imageFile)}
                                    alt="Uploaded Image"
                                    className="uploaded_image"
                                    style={{
                                      width: "100%",
                                      height: "200px",
                                      marginLeft: "30px",
                                    }}
                                  />
                                  <button
                                    onClick={clearImageFile}
                                    style={{
                                      border: "none",
                                      background: "none",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <FaRedo
                                      style={{
                                        color: "blue",
                                        fontSize: "20px",
                                      }}
                                      title="Change Image"
                                    />
                                  </button>
                                </>
                              ) : (
                                <>
                                  <label
                                    htmlFor="image-upload"
                                    className="textbook_upload_label"
                                  >
                                    Upload Image
                                  </label>
                                  <input
                                    id="image-upload"
                                    type="file"
                                    accept="image/*"
                                    className="textbook_upload_input"
                                    onChange={handleImageUpload}
                                  />
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div
                      className="library_submit_loka"
                    //   style={{ marginBottom: "50px", marginTop: "30px" }}
                    >
                      <button
                        onClick={handleSubmit}
                        type="submit"
                        value="submit"
                      >
                        {loading ? (
                          <>
                            <FaSpinner
                              className="spinner"
                              style={{ animation: "spin 2s linear infinite" }}
                            />
                            &nbsp;Saving...
                          </>
                        ) : (
                          "Submit"
                        )}
                      </button>
                    </div>
            </Col>
          </Row>
        </div>

        </form>
      </Container>
    </div>
  )
}

export default LokaLibrary