import React from "react";
import "../addtextbook/addbooks.css";
import { FaArrowLeft } from "react-icons/fa";
import { Nav } from "react-bootstrap";

function AddBooks() {
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
            <FaArrowLeft style={{ height: "32px", width: "20px" }} />
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
                  <label for="class" style={{ fontWeight: "600" }}>
                    Class
                  </label>
                  <input type="text" id="class" name="class" />
                </div>
                <div className="textbook_input_container">
                  <label for="textbookName" style={{ fontWeight: "600" }}>
                    Textbook Name
                  </label>
                  <input type="text" id="textbookName" name="textbookName" />
                </div>
                <div className="textbook_input_container">
                  <label for="phone" style={{ fontWeight: "600" }}>
                    Phone No
                  </label>
                  <input type="text" id="phone" name="phone" />
                </div>
              </div>
              <div className="textbook_col">
                <div className="textbook_input_container">
                  <label for="volume" style={{ fontWeight: "600" }}>
                    Volume
                  </label>
                  <input type="text" id="volume" name="volume" />
                </div>
                <div className="textbook_input_container">
                  <label for="publisherName" style={{ fontWeight: "600" }}>
                    Publisher Name
                  </label>
                  <input
                    type="text"
                    id="publisherName"
                    name="publisherName"
                    list="data"
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
                    for="indexAdding"
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
                  <label for="totalChapters" style={{ fontWeight: "600" }}>
                    Total no of Chapters
                  </label>
                  <input type="text" id="totalChapters" name="totalChapters" />
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      padding: "30px",
                      marginTop: "0px",
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
                        />
                      </label>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      padding: "0px",
                      marginTop: "0px",
                      marginBottom: "20px",
                      marginLeft: "20px",
                    }}
                  >
                    <div style={{ marginLeft: "10px" }}>
                      <label>
                        <input
                          type="text"
                          placeholder="Chapter Name"
                          style={{
                            border: "none",
                            borderBottom: "1px solid black",
                            width: "180px",
                          }}
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
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="textbook_col">
                <div className="bottom_right_col">
                  <div style={{ marginBottom: "100px", marginTop: "0px" }}>
                    <label
                      for="mediaLibrary"
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
                        <button type="submit" value="submit">
                          Textbook Pdf
                        </button>
                      </div>
                      <div
                        className="textbutton-container"
                        style={{ marginTop: "-80px" }}
                      >
                        <button
                          type="submit"
                          value="submit"
                          style={{
                            background: "#FFFFFF",
                            border: "1px solid #C3D6FC",
                          }}
                        >
                          Textbook Front Page
                        </button>
                      </div>

                      </div>
                    </div>

                    <div style={{ marginLeft: "10px", marginTop: "-50px" }}>
                      <label for="photo" style={{}}></label>
                      <div className="textbook_image_upload_container">
                        <div className="textbook_upload_placeholder">
                          <label
                            htmlFor="image-upload"
                            className="textbook_upload_label"
                          >
                            Select File
                          </label>
                          <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            className="textbook_upload_input"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="textbook_button_container"
                    style={{ marginBottom: "50px", marginTop: "30px" }}
                  >
                    <button type="submit" value="submit">
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
