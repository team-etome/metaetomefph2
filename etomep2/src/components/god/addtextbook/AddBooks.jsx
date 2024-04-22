import React, { useState } from "react";
import "../addtextbook/addbooks.css";
import { FaArrowLeft } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Nav } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";


import { useSelector } from "react-redux";
import Swal from "sweetalert2";

function AddBooks() {
  const [selectedTab, setSelectedTab] = useState("pdf");
  const [totalChaptersInput, setTotalChaptersInput] = useState("");
  const [chapters, setChapters] = useState([]);

  const [classValue, setClassValue] = useState("");
  const [textbookName, setTextbookName] = useState("");
  const [phone, setPhone] = useState("");
  const [volume, setVolume] = useState("");
  const [publisherName, setPublisherName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  console.log("Class Value:", classValue);
  console.log("Textbook Name:", textbookName);
  console.log("Phone:", phone);
  console.log("Volume:", volume);
  console.log("Publisher Name:", publisherName);
  console.log("Image File:", imageFile);
  console.log("PDF File:", pdfFile);

  const APIURL = useSelector((state) => state.APIURL.url);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleChapterInputChange = (index, fieldName, value) => {
    const updatedChapters = [...chapters];
    updatedChapters[index][fieldName] = value;
    setChapters(updatedChapters);
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
    try {
      const formData = new FormData();
      formData.append("class_name", classValue);
      formData.append("text_name", textbookName);
      formData.append("medium", phone);
      formData.append("volume", volume);
      formData.append("publisher_name", publisherName);
      formData.append("textbook_pdf", pdfFile);
      formData.append("textbook_front_page", imageFile);

      chapters.forEach((chapter, index) => {
        formData.append(`chapters[${index}][chapter_name]`, chapter.name);
        formData.append(`chapters[${index}][page_no]`, chapter.pageNo);
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

      console.log(response.data);
    } catch (error) {
      console.error("Error creating textbook:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div style={{ backgroundColor: "#DDE6ED", border: "2px solid white" }}>
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
            <Link to='/header' style={{color:'black'}}>
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
              <div className="textbook_col">
                <div className="textbook_input_container">
                  <label htmlFor="class" style={{ fontWeight: "600" }}>
                    Class
                  </label>
                  <input
                    type="text"
                    id="class"
                    name="class"
                    value={classValue}
                    onChange={(e) => setClassValue(e.target.value)}
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
                    onChange={(e) => setTextbookName(e.target.value)}
                  />
                </div>
                <div className="textbook_input_container">
                  <label htmlFor="phone" style={{ fontWeight: "600" }}>
                    Phone No
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
                    onChange={(e) => setVolume(e.target.value)}
                  />
                </div>
                <div className="textbook_input_container">
                  <label htmlFor="publisherName" style={{ fontWeight: "600" }}>
                    Publisher Name
                  </label>
                  <input
                    type="text"
                    id="publisherName"
                    name="publisherName"
                    list="data"
                    value={publisherName}
                    onChange={(e) => setPublisherName(e.target.value)}
                  />
                  <datalist id="data">
                    <option>NCERT</option>
                    <option>S Chand</option>
                  </datalist>
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
                {renderChapterInputs()}
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
                            {pdfFile && (
                              <embed
                                src={URL.createObjectURL(pdfFile)}
                                type="application/pdf"
                                width="100%"
                                height="600px"
                              />
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

                            {imageFile && (
                              <img
                                src={URL.createObjectURL(imageFile)}
                                alt="Uploaded Image"
                                className="uploaded_image"
                                style={{ maxWidth: "100%", maxHeight: "600px" }}
                              />
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
                      Submit
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
