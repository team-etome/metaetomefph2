import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { FaArrowLeft, FaSpinner, FaRedo } from "react-icons/fa";
import Select from "react-select";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import "../adminloka/lokatextbook.css";

function LokaTextbook() {
  const [selectedTab, setSelectedTab] = useState("frontPage");
  const [totalChaptersInput, setTotalChaptersInput] = useState("");
  const [chapters, setChapters] = useState([]);
  const [classValue, setClassValue] = useState("");
  const [textbookName, setTextbookName] = useState("");
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");

  const [mediumOptions, setMediumOptions] = useState([]);
  const [selectedMedium, setSelectedMedium] = useState(null);
  const [medium, setMedium] = useState("");
  const [m, setM] = useState("");
  const [volume, setVolume] = useState("");
  const [publisherName, setPublisherName] = useState("");
  const [p, setP] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [data, setData] = useState("");
  const [selectedPublisher, setSelectedPublisher] = useState("");

  const [showChapterDiv, setShowChapterDiv] = useState(false);

  console.log(pdfFile, "subjectttttt");

  console.log(publisherName, "publisher nameeeeeeeeeeeeeeeeeeeee");

  console.log(chapters, "chaptersssssssssssssss");

  const admininfo = useSelector((state) => state.admininfo);
  const admin_id = admininfo.admininfo?.admin_id;

  console.log(admininfo, " admininfo");

  console.log(subjectOptions, "fihgseioyfg");

  useEffect(() => {
    if (admininfo?.admininfo?.publisher_name) {
      const publishers = admininfo.admininfo.publisher_name.map(
        (publisher) => ({
          value: publisher,
          label: publisher,
        })
      );
      setPublisherName(publishers);
    }
  }, [admininfo]);

  const APIURL = useSelector((state) => state.APIURL.url);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(`${APIURL}/api/addsubject`);
        const allSubjects = response.data;

        // Filter subjects based on educational body in admininfo
        const filteredSubjects = allSubjects.filter(
          (subject) =>
            subject.educational_body === admininfo?.admininfo?.educational_body
        );

        // Map filtered subjects to Select options
        const subjectOptions = filteredSubjects.map((subject) => ({
          value: subject.subject,
          label: subject.subject,
        }));

        setSubjectOptions(subjectOptions);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, [APIURL, admininfo]);

  const handleMediumChange = (selectedOptions) => {
    setM(selectedOptions.value);
    setSelectedMedium(selectedOptions);
  };

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
      setClassValue(data[0].class_name || "");
      setTextbookName(data[0].text_name || "");
      setSelectedSubject(
        { value: data[0].subject, label: data[0].subject } || ""
      );
      setVolume(data[0].volume || "");
      setMedium({ value: data[0].medium, label: data[0].medium } || "");

      setSelectedPublisher({
        value: data[0]?.publisher_name,
        label: data[0]?.publisher_name,
      });

      setTotalChaptersInput(data[0].total_chapters);
      setImageFile(data[0]?.textbook_image);
      setPdfFile(data[0]?.textbook_pdf);

      setChapters(
        data[0].chapter_info.map((chapter) => ({
          name: chapter.name || "",
          pdfFile: chapter.pdf || null,
        })) || []
      );
    }
  }, [data]);

  const navigate = useNavigate();

  useEffect(() => {
    if (admininfo?.admininfo?.medium) {
      // Parse the medium if it's a JSON string
      const mediums = JSON.parse(admininfo.admininfo.medium);

      // Map mediums to Select options
      const mediumOptions = mediums.map((medium) => ({
        value: medium,
        label: medium,
      }));

      setMediumOptions(mediumOptions);
    }
  }, [admininfo]);

  const [loading, setLoading] = useState(false);

  const handlePublisherChange = (selectedOptions) => {
    setSelectedPublisher(selectedOptions);
    setP(selectedOptions.value);
  };

  const handleTabChange = (e, tab) => {
    e.preventDefault();
    setSelectedTab(tab);
  };
  const handleClassValueChange = (event) => {
    const inputValue = event.target.value;
    const numericValue = parseInt(inputValue, 10);
    if (numericValue > 0 && numericValue <= 12) {
      setClassValue(inputValue); // Only set the value if it is within the valid range
    } else if (inputValue === "") {
      setClassValue(""); // Allow clearing the input
    }
    // Do not update the state if the value is negative or zero
  };

  // const handleChapterInputChange = (index, field, value) => {
  //   const updatedChapters = [...chapters];
  //   updatedChapters[index][field] = value;
  //   setChapters(updatedChapters);
  // };

  const handleChapterInputChange = (index, field, value) => {
    const updatedChapters = [...chapters];
    updatedChapters[index][field] = value;

    // Optionally add inline validation feedback
    if (!value.trim()) {
        updatedChapters[index].error = "Chapter name is required";
    } else {
        updatedChapters[index].error = "";
    }

    setChapters(updatedChapters);
};

  const clearImageFile = () => {
    setImageFile(null);
  };



  const validateChapters = () => {
    let isValid = true;
    let errorMessage = "";

    for (let chapter of chapters) {
        if (!chapter.name.trim()) {
            errorMessage = "All chapters must have a name.";
            isValid = false;
            break;
        }
        if (!chapter.pdfFile) {
            errorMessage = "All chapters must have a PDF file uploaded.";
            isValid = false;
            break;
        }
    }

    return { isValid, errorMessage };
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
                width: "200px",
                outline: "none",
              }}
              maxLength={50}
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
              id={`pdf-upload-${index}`}
              type="file"
              accept=".pdf"
              style={{ border: "none", width: "180px", outline: "none" }}
              onChange={(e) => handleFileChange(index, e.target.files[0])}
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
      if (totalChapters > 50) {
        // Assuming 50 is the maximum allowed chapters
        Swal.fire({
          icon: "warning",
          title: "Limit Exceeded",
          text: `You can only enter up to 50 chapters.`,
        });
        setTotalChaptersInput(50);
        const updatedChapters = Array.from({ length: 50 }, (_, index) => ({
          name: "",
          pageNo: "",
        }));
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

  const handleFileChange = (index, file) => {
    const updatedChapters = [...chapters];
    updatedChapters[index].pdfFile = file;
    setChapters(updatedChapters);
  };

  const handleVolumeChange = (e) => {
    const value = e.target.value;
    // Prevent negative values
    if (/^[a-zA-Z0-9]*$/.test(value)) {
      setVolume(value);
    }
  };
  const toTitleCase = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setLoading(true); // Show the loading spinner

    // Validate required fields
    const { isValid, errorMessage } = validateChapters();

    if (
      !classValue ||
      !textbookName ||
      !selectedMedium ||
      !selectedSubject ||
      !publisherName ||
      !imageFile || // Ensure that an image file is selected
      !chapters.length // Ensure that chapters are added
    ) {
      let missingFields = [];

      if (!classValue) missingFields.push("class");
      if (!textbookName) missingFields.push("textbook name");
      if (!selectedSubject) missingFields.push("Subject");

      if (!selectedMedium) missingFields.push("selectedMedium");

      if (!publisherName) missingFields.push("publisher name");
      if (!imageFile) missingFields.push("image file");
      if (!chapters.length) missingFields.push("chapters");

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

    try {
      const formData = new FormData();
      formData.append("class_name", classValue);
      formData.append("text_name", textbookName);
      formData.append("subject", selectedSubject.label);
      formData.append("volume", volume);
      formData.append("textbook_front_page", imageFile);
      formData.append("medium", selectedMedium.value);
      formData.append("publisher_name", selectedPublisher.value);
      formData.append("admin", admin_id);

      chapters.forEach((chapter, index) => {
        formData.append(`chapters[${index}][name]`, chapter.name);
        if (chapter.pdfFile) {
          formData.append(`chapters[${index}][pdfFile]`, chapter.pdfFile);
        }
      });

      const response = await axios.post(
        `${APIURL}/api/admin-create-textbook/`,
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

  // const mediumbook = [
  //   "Malayalam",
  //   "english",
  //   "hindi",
  //   "kannada",
  //   "urudu",
  //   "telgu",
  //   "tamil",
  //   "konkani",
  // ];

  // const textbookMeium = mediumbook.map((bookmedium) => ({
  //   value: bookmedium,
  //   label: bookmedium,
  // }));

  const customStyles = {
    control: (base, state) => ({
      ...base,
      width: "100%",
      minHeight: "40px",
      height: "50px",
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
      paddingTop: "0px",
    }),
    indicatorSeparator: (base) => ({
      display: "none",
    }),
    indicatorsContainer: (base) => ({
      ...base,
      alignItems: "center",
    }),
    // menu: (base) => ({
    //   ...base,
    //   zIndex: 9999,
    //   position: "absolute",
    // }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
      position: "absolute",
      width: "89%",
      maxHeight: "150px",
      overflowY: "auto",
    }),
    menuList: (base) => ({
      ...base,
      maxHeight: "150px",
      overflowY: "auto",
      paddingRight: "10px",
    }),
  };

  return (
    <div>
      <Container className="loka_container">
        <form className="loka_form">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <h1 className="loka_title">Add Textbooks</h1>
          </div>
          <div style={{ border: "0.5px solid #526D82" }}></div>
          <div className="loka_form_scroll">
            <Row style={{ paddingTop: "20px" }}>
              <Col md={6}>
                <div className="loka_textbook_group">
                  <label htmlFor="class">Class</label>
                  <input
                    type="text"
                    id="class"
                    name="class"
                    value={classValue}
                    maxLength="2"
                    style={{}}
                    onChange={handleClassValueChange}
                  />
                </div>
                <div className="loka_textbook_group">
                  <label htmlFor="textbookName">Textbook Name</label>
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
                <div className="loka_textbook_group">
                  <label htmlFor="mediumbook">Medium</label>
                  <Select
                    type="text"
                    id="mediumbook"
                    name="mediumbook"
                    // list=''
                    options={mediumOptions}
                    value={selectedMedium}
                    style={{ textTransform: "capitalize" }}
                    onChange={handleMediumChange}
                    maxLength="100"
                    styles={customStyles}
                  />
                </div>
              </Col>

              <Col md={6}>
                <div className="loka_textbook_group">
                  <label htmlFor="volume">Volume</label>
                  <input
                    type="text"
                    id="volume"
                    name="volume"
                    value={volume}
                    maxLength="100"
                    style={{ textTransform: "capitalize" }}
                    onChange={handleVolumeChange}
                  />
                </div>
                <div className="loka_textbook_group">
                  <label htmlFor="subject">Subject</label>
                  <Select
                    id="subject"
                    name="subject"
                    options={subjectOptions}
                    value={selectedSubject}
                    onChange={(option) => setSelectedSubject(option)}
                    styles={customStyles}
                  />
                </div>
                <div className="loka_textbook_group">
                  <label htmlFor="publisherName">Publisher Name</label>

                  <Select
                    id="publisherName"
                    name="publisherName"
                    options={publisherName}
                    placeholder=""
                    // isMulti
                    value={selectedPublisher}
                    maxLength="100"
                    onChange={handlePublisherChange}
                    styles={customStyles}
                  />
                </div>
              </Col>
            </Row>
            <Row className="media_index">
              <Col md={6}>
                <div style={{}}>
                  <label htmlFor="mediaLibrary" className="loka_media_label">
                    Media Library
                  </label>
                </div>
                <div>
                  <div style={{ marginLeft: "0px" }}>
                    <div style={{ display: "flex" }}>
                      <div className="lokatb_textbutton_container" style={{}}>
                        <button
                          style={{
                            ...(selectedTab === "frontPage"
                              ? { border: "4px solid black" }
                              : {}),
                          }}
                          onClick={(e) => handleTabChange(e, "frontPage")}
                          className={
                            selectedTab === "frontPage" ? "active" : ""
                          }
                        >
                          Textbook Front Page
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="photo" style={{}}></label>
                    <div className="admin_textbook_image_upload_container">
                      <div className="admin_textbook_upload_placeholder">
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
                              className="admin_textbook_upload_label"
                            >
                              Upload Image
                            </label>
                            <input
                              id="image-upload"
                              type="file"
                              accept="image/*"
                              className="admin_textbook_upload_input"
                              onChange={handleImageUpload}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* )} */}
                </div>
              </Col>
              <Col md={6} className="loka_tb_media">
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
                <div className="loka_textbook_group index_field">
                  <label htmlFor="totalChapters">Total no of Chapters</label>
                  <input
                    type="number"
                    id="totalChapters"
                    name="totalChapters"
                    value={totalChaptersInput}
                    onChange={handleTotalChaptersChange}
                    max="50"
                  />
                </div>
                <div
                  className={`chapter_div ${
                    totalChaptersInput <= 5 ? "hidden_border" : ""
                  }`}
                >
                  {renderChapterInputs()}
                </div>
                <div
                  className="submit_loka"
                  //   style={{ marginBottom: "50px", marginTop: "30px" }}
                >
                  <button onClick={handleSubmit}>
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
  );
}

export default LokaTextbook;
