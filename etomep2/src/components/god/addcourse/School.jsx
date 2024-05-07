import React , { useState }from 'react'
import {Container, Row, Form,Col, Button} from "react-bootstrap";
import Select from "react-select";
import "../addcourse/school.css"
import { Link } from "react-router-dom";
import { FaArrowLeft} from "react-icons/fa";

function School() {
    const [eboard, setBoard] = useState("");

    const handleBoardofEducation = (selectedOptions) => {
        setBoard(selectedOptions);
      };
    const eeducationboard = [
        "CENTRAL BOARD OF SECONDARY EDUCATION (CBSE) ",
        "KERALA BOARD OF PUBLIC EXAMINATION , KERALA",
        "KERALA BOARD OF HIGHER SECONDARY EDUCATION",
        "BOARD OF VOCATIONAL HIGHER SECONDARY EDUCATION, KERALA",
        "BOARD OF SECONDARY EDUCATION, MADHYA PRADESH",
        "ICSE BOARD",
      ];
      const eboardOptions = eeducationboard.map((eboard) => ({
        value: eboard,
        label: eboard,
      }));
  return (
    <div style={{ backgroundColor: "#fff", border: "2px solid white ", borderRadius:'20px', marginTop:'30px',  }}>
    <Container style={{marginLeft:'20px', marginRight:'40px'}}>
        <Row>
        <div
          style={{
            display: "flex",
            paddingTop: "33px",
            paddingBottom: "16px",
            borderBottom: "3px solid #DDE6ED",
            marginBottom: "20px",
          }}>
            {/* <div style={{ marginLeft: "20px" }}>
                <Link to="" style={{ color: "black" }}>
                <FaArrowLeft style={{ height: "32px", width: "20px" }} />
                </Link>
            </div> */}
          <div style={{ marginLeft: "30px", color: "#526D82" }}>
            <h4>Add Courses</h4>
          </div>
        </div>
        </Row>
        <Row style={{marginTop:'20px'}}>
            <Col md={6}>
            <div className="school_input_select"style={{
                    // width: "500px",
                    border: "1px solid #526D82",
                    marginLeft: "15px",
                    borderRadius: "4px",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}>
                  <label for="eeducationBoard" style={{ fontWeight: "600" }}>
                    Board Of Education
                  </label>
                  <Select
                    type="text"
                    id="eeducationBoard"
                    name="eeducationBoard"
                    list="eboard-list"
                    options={eboardOptions}
                    value={eboard}
                    // onChange={(e) => setBoard(e.target.value)}
                    onChange={handleBoardofEducation}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        border: "none",
                        bottom:'1px',
                        boxShadow: state.isFocused ? "none" : "none",
                      }),
                      dropdownIndicator: (provided, state) => ({
                        ...provided,
                        color: 'black',
                    }),
                    indicatorSeparator: (provided, state) => ({
                        ...provided,
                        backgroundColor: 'none',
                    }),
                    }}
                  /> 
            </div>
            </Col>
            <Col md={6}>
            <div className="school_input_select"style={{
                    // width: "500px",
                    border: "1px solid #526D82",
                    marginLeft: "15px",
                    borderRadius: "4px",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}>
                  <label for="subjectsno" style={{ fontWeight: "600" }}>
                    No. of Subjects
                  </label>
                  <input
                    type="text"
                    id="subjectsno"
                    name="subjectsno"
                    style={{
                    border: "#526D82",
                    bottom: '1px',
                    boxShadow: "none",
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    outline:'none'
                    }}
                />
            </div>
            {/* <div style={{border:'1px solid gray', marginLeft:'15px', marginTop:'50px'}}></div> */}
            </Col>
        </Row>
        <Row style={{marginBottom:'50px'}}>
            <Col md={6}>
            <div style={{border:'0.5px solid #B5B5B5', marginLeft:'15px', marginTop:'50px'}}></div>
            </Col>
            <Col md={6} style={{}}>
            <div style={{border:'0.5px solid #B5B5B5', marginLeft:'15px', marginTop:'50px'}}></div>
            <div className="school_button" style={{display:'flex', justifyContent:'center'}}>
                <Button type="submit" value="submit" style={{ backgroundColor: '#526D82', color: 'white' ,}}>
                    Submit
                </Button>
            </div>
            </Col>
        </Row>
    </Container>
    </div>
  )
}

export default School