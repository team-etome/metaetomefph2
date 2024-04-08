import React from "react";
import "../addtextbook/addbooks.css";

function AddBooks() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          paddingTop: "33px",
          paddingBottom: "16px",
        }}
      >
        <div style={{ marginLeft: "20px" }}>
          <button className="text-backButton">&#8592;</button>
        </div>
        <div className="text-headingline"></div>
        <div style={{ marginLeft: "30px", color: "#526D82" }}>
          <h3>Add Textbook</h3>
        </div>
      </div>
      <form action="">
        <div className="text-form">
          <div className="textbook-container">
            <div>
              <div className="textbook-row">
                <div className="textbook-col">
                  <div className="textbook-input-container">
                    <label for="institutionName" style={{ fontWeight: "600" }}>
                      Class
                    </label>
                    <input
                      type="text"
                      id="institutionName"
                      name="institutionName"
                    />
                  </div>
                  <div className="textbook-input-container">
                    <label for="institutionCode" style={{ fontWeight: "600" }}>
                      Textbook Name
                    </label>
                    <input
                      type="text"
                      id="institutionCode"
                      name="institutionCode"
                    />
                  </div>
                  <div className="textbook-input-container">
                    <label for="educationBoard" style={{ fontWeight: "600" }}>
                      Phone No
                    </label>
                    <input
                      type="text"
                      id="educationBoard"
                      name="educationBoard"
                    />
                  </div>
                </div>

                <div className="textbook-col">
                  <div className="textbook-input-container">
                    <label for="institutionCode" style={{ fontWeight: "600" }}>
                      Volume
                    </label>
                    <input
                      type="text"
                      id="institutionCode"
                      name="institutionCode"
                    />
                  </div>
                  <div className="textbook-input-container">
                    <label for="institutionCode" style={{ fontWeight: "600" }}>
                      Publisher Name
                    </label>
                    <input
                      type="text"
                      id="institutionCode"
                      name="institutionCode"
                    />
                  </div>
                </div>
              </div>

              <div className="textbook-row">
                <div className="textbook-col">
                  <div
                    style={{
                      fontWeight: "400px",
                      fontSize: "24px",
                      marginLeft: "20px",
                      marginBottom: "30px",
                      marginTop: "10px",
                    }}
                  >
                    Index Adding
                  </div>
                  <div className="textbook-input-container" style={{marginTop:'-30px'}}>
                    <label for="databaseCode" style={{ fontWeight: "600" }}>
                      Total No Of Chapters
                    </label>
                    <input type="text" id="databaseCode" name="databaseCode" />
                  </div>
                  <div>
                    <div>
                    <label for="databaseCode" style={{ fontWeight: "600", border:'1px solid black' }}>
                      Chapter Name
                    </label>
                    <input type="text" id="databaseCode" name="databaseCode" />
                    </div>
                  </div>
                </div>
                <div
                  className="textbook-col"
                  style={{  display: "flex",marginLeft:'20px',}} 
                >
                  <div
                    style={{
                      fontWeight: "400px",
                      fontSize: "24px",
                      //   marginLeft: "20px",
                    }}
                  >
                    Media Library
                  </div>
                  <div style={{ marginTop: "30px", marginLeft: '-170px',display:'flex' }}>
                    <div className="textbutton-container">
                      <button type="submit" value="submit">
                        Textbook Pdf
                      </button>
                    </div>
                    <div className="textbutton-container">
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
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddBooks;
