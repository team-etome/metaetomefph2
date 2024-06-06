import React,{useState} from 'react';
import { Container, Row, Col } from "react-bootstrap";
import '../adminclassadding/classadding.css';
import { IoChevronBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import Select from "react-select";

function ClassAdding() {
  const [medium, setMedium] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [className, setClassName] = useState(false);
  const [stream, setStream] = useState(false);
  const [division, setDivision] = useState(false);


  const mediumOptions = [
    { value: 'medium 1', label: 'medium 1' },
    { value: 'medium 2', label: 'medium 2' },
    { value: 'medium 3', label: 'medium 3' },
  ];

  const teacherOptions = [
    { value: 'teacher 1', label: 'teacher 1' },
    { value: 'teacher 2', label: 'teacher 2' },
    { value: 'teacher 3', label: 'teacher 3' },
  ];
  const customStyles = {
    control: (base, state) => ({
      ...base,
      width: '90%',
      minHeight: '50px',
      border: '1px solid #526D82',
      borderRadius: '8px',
      boxShadow: state.isFocused ? '0 0 0 1px #526D82' : 'none', 
      "&:hover": {
        borderColor: 'none' // Darker border on hover
      },
      "&:focus": {
        borderColor: '#526D82', // Ensures the border color when the element is focused
        outline: 'none' // Removes the default outline when focused
      }
    }),
    placeholder: (base) => ({
      ...base,
      color: '#526D82', 
    }),
    singleValue: (base) => ({
      ...base,
      color: '#000',
    }),
    option: (base) => ({
      ...base,
      color: '#000',
    }),
    valueContainer: (base) => ({
      ...base,
      padding: '0 10px',
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: '#526D82',
    }),
    indicatorsContainer: (base) => ({
      ...base,
      alignItems: 'center',
    })
  };
  return (
    <div className="page_container" style={{}}>
      <Container className='class_add'>
        <form className='class_form' style={{backgroundColor:'#ffff', borderRadius:'16px'}}>
          <Row>
            <Col>
              <div className="header-container">
                <Link to='/institutionadding'>
                <IoChevronBackSharp style={{color:'#526D82', height: "32px", width: "32px", marginLeft:'20px' }} />
                </Link>
                <h1 style={{color:'#526D82', fontSize:'25px', marginLeft:'10px'}}>Class Adding</h1>
              </div>
              <div style={{border:'0.5px solid #526D82'}}></div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div className='form_group'>
                <input type="text" id="class_number" name='class_number' placeholder=" "/>
                <label htmlFor="class_number">Class Name<span style={{color: 'red'}}>*</span></label>
              </div>
              <div className='form_group'>
                <input type="text" id="class_category" name='class_category' placeholder=" "/>
                <label htmlFor="class_category">Stream</label>
              </div>
              <div className='class_select'>
                {/* <input type="text" id="class_teacher" name='class_teacher' placeholder=" "/> */}
                <Select
                  options={teacherOptions}
                  styles={customStyles}
                  placeholder=""
                  value={teacher}
                  onChange={setTeacher}
                />
                <label htmlFor="class_teacher">Class Teacher<span style={{color: 'red'}}>*</span></label>
              </div>
            </Col>
            <Col md={6} >
              <div className='form_group'>
                <input type="text" id="class_division" name='class_division' placeholder=" "/>
                <label htmlFor="class_division">Division<span style={{color: 'red'}}>*</span></label>
              </div>
              <div className='class_select'>
                {/* <input type="text" id="class_medium" name='class_medium' placeholder=" "/> */}
                <Select
                  options={mediumOptions}
                  styles={customStyles}
                  placeholder=""
                  value={medium}
                  onChange={setMedium}
                />
                <label htmlFor="class_medium">Medium</label>
              </div>
              <div className=' class_next_button' style={{textAlign:'right', marginRight: "80px"}}>
                <button type="submit" value="submit" className='class_next'>
                  Next
                </button>
              </div>
            </Col>
          </Row>
        </form>
      </Container>
    </div>
  );
}

export default ClassAdding;
