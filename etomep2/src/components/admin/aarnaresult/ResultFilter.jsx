import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import Select from "react-select";
import "../aarnaresult/resultfilter.css";
import { useSelector } from "react-redux";
import axios from 'axios'

function ResultFilter() {
  const [classNo, setClassNo] = useState("");
  const [division, setDivision] = useState("");
  const [year, setYear] = useState("");
  const [term, setTerm] = useState(null);

  console.log(classNo,"class number")

  const navigate = useNavigate();

  const classinfo = useSelector((state) => state.adminallclassinfo || {});
  const class_name = classinfo.adminallclassinfo?.class_name;
  const APIURL = useSelector((state) => state.APIURL.url);

  console.log(APIURL,"api url")

  const [classNoOptions, setClassNoOptions] = useState([]);
  const [allDivisionOptions, setAllDivisionOptions] = useState({});
  const [filteredDivisionOptions, setFilteredDivisionOptions] = useState([]);
  const [classMap, setClassMap] = useState({});

  console.log(classinfo, "class nameeeeeeeee");

  useEffect(() => {
    if (Array.isArray(classinfo?.adminallclassinfo)) {
      const uniqueClassNoOptions = [];
      const divisionMap = {};
      const classMapping = {};

      classinfo.adminallclassinfo.forEach((item) => {
        // Unique class options
        if (
          !uniqueClassNoOptions.some(
            (option) => option.value === item.class_name
          )
        ) {
          uniqueClassNoOptions.push({
            value: item.class_name,
            label: item.class_name,
          });
        }

        // Division mapping for each class
        if (!divisionMap[item.class_name]) {
          divisionMap[item.class_name] = [];
        }
        if (!divisionMap[item.class_name].includes(item.division)) {
          divisionMap[item.class_name].push({
            value: item.division,
            label: item.division,
          });
        }

        // Map each class_name + division to the class (id)
        const key = `${item.class_name}-${item.division}`;
        classMapping[key] = item.class; // Assuming `item.class` is the class (id)
      });

      setClassNoOptions(uniqueClassNoOptions);
      setAllDivisionOptions(divisionMap);
      setClassMap(classMapping);
    }
  }, [classinfo]);

  const handleClassNoChange = (selectedClass) => {
    setClassNo(selectedClass);
    const divisionsForSelectedClass = (
      allDivisionOptions[selectedClass.value] || []
    ).sort((a, b) => a.label.localeCompare(b.label)); // Sort divisions alphabetically
    setFilteredDivisionOptions(divisionsForSelectedClass);
    setDivision(null); // Reset division when class changes
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const key = `${classNo.label}-${division.label}`;

    console.log(key,"key")
    const classId = classMap[key];

    console.log(classId,"class id")

    if (classId) {
      try {
        const response = await axios.get(`${APIURL}/api/evaluationmark/${classId}`)
        console.log("Response:", response.data);
        navigate("/adminresultview", { state: { resultData: response.data } });
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.error("Class ID not found for the selected class and division.");
    }
  };

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
        borderColor: "#526D82",
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
    menu: (base) => ({
      ...base,
      zIndex: 9999,
      position: "absolute",
      maxHeight: "150px", // Set the max height for the dropdown list
      overflowY: "auto", // Add vertical scrolling
    }),
    menuList: (base) => ({
      ...base,
      maxHeight: "150px", // Set the max height for the list items
      padding: "0",
    }),
  };

  return (
    <Container className="result_filter_container">
      <form className="result_filter_form">
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: "0px" }}
        >
          {/* <Link to='/aarnanavbar'>
            <IoChevronBackSharp onClick={handleBack} className='result_filter_back' />
        </Link> */}
          <h1 className="result_filter_title">Result</h1>
        </div>
        <div style={{ border: "0.5px solid #526D82" }}></div>
        <div className="result_filter_scrollable">
          <Row
            style={{
              paddingTop: "20px",
              paddingLeft: "20px",
              paddingRight: "20px",
            }}
          >
            <Col md={3}>
              <div className="result_filter_group">
                <label htmlFor="class_no">
                  Class No.<span style={{ color: "red" }}>*</span>
                </label>
                <Select
                  id="class_no"
                  options={classNoOptions}
                  styles={customStyles}
                  value={classNo}
                  onChange={handleClassNoChange}
                  placeholder=""
                />
              </div>
            </Col>
            <Col md={3}>
              <div className="result_filter_group">
                <label htmlFor="division">
                  Division<span style={{ color: "red" }}>*</span>
                </label>
                <Select
                  options={filteredDivisionOptions}
                  styles={customStyles}
                  value={division}
                  onChange={setDivision}
                  placeholder=""
                />
              </div>
            </Col>
            {/* <Col md={3}>
              <div className="result_filter_group">
                <label htmlFor="year">
                  Year<span style={{ color: "red" }}>*</span>
                </label>
                <Select
                  styles={customStyles}
                  value={year}
                  onChange={setYear}
                  placeholder=""
                />
              </div>
            </Col> */}
            <Col md={3}>
              {/* <div className="result_filter_group">
                <label htmlFor="term">
                  Term<span style={{ color: "red" }}>*</span>
                </label>
                <Select
                  styles={customStyles}
                  value={term}
                  onChange={setTerm}
                  placeholder=""
                />
              </div> */}
              <div className="submit_result_filter">
                <button type="submit" onClick={handleSubmit}>
                  Search
                </button>
              </div>
            </Col>
          </Row>
        </div>
      </form>
    </Container>
  );
}

export default ResultFilter;
