import React, { useState } from "react";
import "../addtextbook/addbooks.css";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaSpinner, FaRedo } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import Select from "react-select";

function AddBooks() {
  const [selectedTab, setSelectedTab] = useState("pdf");
  const [totalChaptersInput, setTotalChaptersInput] = useState("");
  const [chapters, setChapters] = useState([]);
  const [classValue, setClassValue] = useState("");
  const [textbookName, setTextbookName] = useState("");
  const [medium, setMedium] = useState("");
  const [m, setM] = useState("");
  const [volume, setVolume] = useState("");
  const [publisherName, setPublisherName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  // console.log(classValue)

  console.log(publisherName, "publisher name");

  const [loading, setLoading] = useState(false);

  const handlePublisherChange = (selectedOptions) => {
    setPublisherName(selectedOptions);
  };

  console.log(medium, "medium");

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

  const APIURL = useSelector((state) => state.APIURL.url);

  console.log(APIURL, "aaaaaaaaaaaaaaaaaaaaa");

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    console.log("Selected Tab: ", tab);
  };
  const handleClassValueChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setClassValue(value);
    } else {
      setClassValue(""); // Reset to empty string if the input is not a positive number
    }
  };
  const handleMediumChange = (selectedOptions) => {
    setM(selectedOptions.value)
    setMedium(selectedOptions);
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
    const totalChapters = parseInt(e.target.value);
    setTotalChaptersInput(totalChapters);
    const updatedChapters = Array.from(
      { length: totalChapters },
      (_, index) => ({
        name: "",
        pageNo: "",
      })
    );
    setChapters(updatedChapters);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    setPdfFile(file);
  };

  const handleSubmit = async () => {
    // Check if all required fields are filled
    if (
      !classValue ||
      !textbookName ||
      !medium ||
      // !volume ||
      !publisherName ||
      !pdfFile ||
      !imageFile
    ) {
      let missingFields = [];
      if (!classValue) missingFields.push("class");
      if (!textbookName) missingFields.push("textbook name");
      if (!medium) missingFields.push("medium");
      // if (!volume) missingFields.push("volume");
      if (!publisherName) missingFields.push("publisher name");
      if (!pdfFile) missingFields.push("PDF file");
      if (!imageFile) missingFields.push("image file");

      // Notify user which fields are missing
      Swal.fire({
        icon: "error",
        title: "Missing Required Information",
        text: `Please complete the following fields: ${missingFields.join(
          ", "
        )}.`,
      });
      setLoading(false); // Ensure loading is reset even if submission does not proceed
      return; // Stop the function if there are missing fields
    }

    // All fields are filled, proceed with form submission
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("class_name", classValue);
      formData.append("text_name", textbookName);
      formData.append("volume", volume);
      formData.append("textbook_pdf", pdfFile);
      formData.append("textbook_front_page", imageFile);
      formData.append("medium", m);

      // medium.forEach((mediumValue, index) => {
      //   formData.append(`medium[${index}]`, mediumValue.value);
      // });

      publisherName.forEach((publisherValue, index) => {
        formData.append(`publisher_name[${index}]`, publisherValue.value);
      });

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
    } catch (error) {
      console.error("Error creating textbook:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    } finally {
      setLoading(false); // Ensure loading state is cleared
    }
  };
  const mediumbook = [
    "Malayalam",
    "english",
    "hindi",
    "kannada",
    "urudu",
    "telgu",
    "tamil",
    "konkani",
  ];

  const textbookMeium = mediumbook.map((bookmedium) => ({
    value: bookmedium,
    label: bookmedium,
  }));

  return (
    <div style={{ backgroundColor: "#DDE6ED", border: "2px solid white " }}>
      <div className="textbook">
        <div
          style={{
            display: "flex",
            paddingTop: "33px",
            paddingBottom: "16px",
            borderBottom: "1px solid #DDE6ED",
            marginBottom: "20px",
          }}
        >
          <div style={{ marginLeft: "20px" }}>
            <Link to="/header" style={{ color: "black" }}>
              <FaArrowLeft style={{ height: "20px", width: "30px" }} />
              {/* <IoIosArrowRoundBack style={{ height: "30px", width: "30px" }} /> */}
            </Link>
          </div>
          <div style={{ marginLeft: "30px", color: "#526D82" }}>
            <h3>Add Textbook</h3>
          </div>
          <div style={{ color: "2px solid black" }}></div>
        </div>

        <div
          className="textbook_container"
          style={{ paddingLeft: "50px", paddingRight: "50px" }}
        >
          <div>
            <div className="textbook_row">
              <div
                className="textbook_col"
                style={{ textTransform: "capitalize" }}
              >
                <div className="textbook_input_container">
                  <label htmlFor="class" style={{ fontWeight: "600" }}>
                    Class
                  </label>
                  <input
                    type="text"
                    id="class"
                    name="class"
                    value={classValue}
                    style={{}}
                    onChange={handleClassValueChange}
                  />
                </div>
                <div className="textbook_input_container">
                  <label htmlFor="textbookName" style={{ fontWeight: "600" }}>
                    Textbook Name
                  </label>
                  <input
                    type="text"
                    id="textbookName"
                    name="textbookName"
                    value={textbookName}
                    style={{ textTransform: "capitalize" }}
                    onChange={(e) => setTextbookName(e.target.value)}
                  />
                </div>
                <div
                  className="textbook_input_container_select"
                  style={{
                    width: "400px",
                    border: "1px solid #526D82",
                    borderRadius: "4px",
                    marginTop: "20px",
                    marginBottom: "10px",
                  }}
                >
                  <label htmlFor="mediumbook" style={{ fontWeight: "600" }}>
                    Medium
                  </label>
                  <Select
                    type="text"
                    id="mediumbook"
                    name="mediumbook"
                    // list=''
                    options={textbookMeium}
                    value={medium}
                    style={{ textTransform: "capitalize" }}
                    onChange={handleMediumChange}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        border: "none",
                        boxShadow: state.isFocused ? "none" : "none",
                      }),
                    }}
                  />
                </div>
              </div>
              <div className="textbook_col">
                <div className="textbook_input_container">
                  <label htmlFor="volume" style={{ fontWeight: "600" }}>
                    Volume
                  </label>
                  <input
                    type="text"
                    id="volume"
                    name="volume"
                    value={volume}
                    style={{ textTransform: "capitalize" }}
                    onChange={(e) => setVolume(e.target.value)}
                  />
                </div>
                <div
                  className="textbook_input_container_select"
                  style={{
                    width: "400px",
                    border: "1px solid #526D82",
                    borderRadius: "4px",
                    marginTop: "20px",
                    marginBottom: "10px",
                  }}
                >
                  <label htmlFor="publisherName" style={{ fontWeight: "600" }}>
                    Publisher Name
                  </label>
                
                  <Select
                    id="publisherName"
                    name="publisherName"
                    options={publisherOptions}
                    placeholder=""
                    isMulti
                    value={publisherName}
                    onChange={handlePublisherChange}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        border: "none",
                        boxShadow: state.isFocused ? "none" : "none",
                      }),
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="textbook_row">
              <div className="textbook_col">
                <div>
                  <label
                    htmlFor="indexAdding"
                    style={{
                      marginLeft: "20px",
                      fontSize: "25px",
                      marginBottom: "20px",
                      marginTop: "20px",
                    }}
                  >
                    Index Adding
                  </label>
                </div>
                <div className="textbook_input_container">
                  <label htmlFor="totalChapters" style={{ fontWeight: "600" }}>
                    Total no of Chapters
                  </label>
                  <input
                    type="number"
                    id="totalChapters"
                    name="totalChapters"
                    value={totalChaptersInput}
                    onChange={handleTotalChaptersChange}
                  />
                </div>
                <div
                  style={{
                    border: "1px solid black",
                    width: "390px",
                    marginLeft: "30px",
                  }}
                >
                  {renderChapterInputs()}
                </div>
              </div>
              <div className="textbook_col">
                <div className="bottom_right_col">
                  <div style={{ marginBottom: "100px", marginTop: "0px" }}>
                    <label
                      htmlFor="mediaLibrary"
                      style={{
                        marginLeft: "20px",
                        marginBottom: "10px",
                        fontSize: "25px",
                        padding: "0px",
                      }}
                    >
                      Media Library
                    </label>
                  </div>
                  <div>
                    <div style={{ marginLeft: "10px", marginTop: "-10px" }}>
                      <div style={{ display: "flex" }}>
                        <div
                          className="textbutton-container"
                          style={{ marginTop: "-80px" }}
                        >
                          <button
                            style={{
                              marginTop: "-80px",
                              ...(selectedTab === "pdf"
                                ? { border: "4px solid black" }
                                : {}),
                            }}
                            onClick={() => handleTabChange("pdf")}
                            className={selectedTab === "pdf" ? "active" : ""}
                          >
                            Textbook Pdf
                          </button>
                        </div>
                        <div
                          className="textbutton-container"
                          style={{ marginTop: "-80px" }}
                        >
                          <button
                            style={{
                              marginTop: "-80px",
                              ...(selectedTab === "frontPage"
                                ? { border: "4px solid black" }
                                : {}),
                            }}
                            onClick={() => handleTabChange("frontPage")}
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
                      <div style={{ marginLeft: "10px", marginTop: "-50px" }}>
                        <label htmlFor="pdf" style={{}}></label>
                        <div className="textbook_image_upload_container">
                          <div className="textbook_upload_placeholder">
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
                                    style={{ color: "blue", fontSize: "20px" }}
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
                      <div style={{ marginLeft: "10px", marginTop: "-50px" }}>
                        <label htmlFor="photo" style={{}}></label>
                        <div className="textbook_image_upload_container">
                          <div className="textbook_upload_placeholder">
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
                                    style={{ color: "blue", fontSize: "20px" }}
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
                    className="textbook_button_container"
                    style={{ marginBottom: "50px", marginTop: "30px" }}
                  >
                    <button onClick={handleSubmit} type="submit" value="submit">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBooks;
