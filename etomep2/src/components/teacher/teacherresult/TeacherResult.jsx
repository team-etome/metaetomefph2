import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';
import { IoChevronBackSharp } from 'react-icons/io5';
import Select from 'react-select';
import '../teacherresult/teacherresult.css'

function TeacherResult() {
    const [classNo, setClassNo] = useState('');
    const [division, setDivision] = useState('');
    const [subject, setSubject] = useState('');
    const [term, setTerm] = useState(null);

    const navigate = useNavigate();

    const classnoOptions = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
    ];
    const divisionOptions = [
        { value: 'A', label: 'A' },
        { value: 'B', label: 'B' },
        { value: 'C', label: 'C' },
        { value: 'A', label: 'A' },
        { value: 'B', label: 'B' },
        { value: 'C', label: 'C' },
    ];

    const subjectOptions = [
        { value: 'English', label: 'English' },
        { value: 'Malayalam', label: 'Malayalam' },
        { value: 'Hindi', label: 'Hindi' },
        { value: 'Social Science', label: 'Social Science' },
        { value: 'Maths', label: 'Maths' },
        { value: 'Science', label: 'Science' },
    ];
    const termOptions = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
    ];


    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission
        navigate('/teacherresultview'); // Adjust the path as necessary
    }

   const customStyles = {
      control: (base, state) => ({
        ...base,
        width: '100%',
        minHeight: '40px',
        border: '1px solid #526D82',
        borderRadius: '8px',
        boxShadow: state.isFocused ? '0 0 0 1px #526D82' : 'none', 
        "&:hover": {
          borderColor: '#526D82' 
        },
        "&:focus": {
          borderColor: '#526D82', 
          outline: 'none' 
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
      }),
      menu: (base) => ({
        ...base,
        zIndex: 9999,
        position: 'absolute',
      })
    };


  return (
    <Container className='teacher_result_filter_container'>
    <form className='teacher_result_filter_form' >
    <div className="teacher_result_filter_scrollable">
      <div style={{display: 'flex', alignItems: 'center', marginBottom:'0px'}}>
        {/* <Link to='/aarnanavbar'>
            <IoChevronBackSharp onClick={handleBack} className='result_filter_back' />
        </Link> */}
        <h1 className='teacher_result_filter_title'>Result</h1>
        </div>
        <div style={{ border: '0.5px solid #526D82' }}></div>

            <Row style={{paddingTop:'20px', paddingLeft:'20px', paddingRight:'20px'}}>
                <Col md={3}>
                <div className='teacher_result_filter_group'>
                    <label htmlFor="class_no" >Class No.<span style={{color: 'red'}}>*</span></label>
                    <Select id="class_no" options={classnoOptions} styles={customStyles} value={classNo} onChange={setClassNo} placeholder=''/>
                </div>
                </Col>
                <Col md={3}>
                <div className='teacher_result_filter_group'>
                    <label htmlFor="division">Division<span style={{color: 'red'}}>*</span></label>
                    <Select options={divisionOptions} styles={customStyles} value={division} onChange={setDivision} placeholder=''/>
                </div>
                </Col>
                <Col md={3}>
                <div className='teacher_result_filter_group'>
                    <label htmlFor="exam_type">Subject<span style={{color: 'red'}}>*</span></label>
                    <Select options={subjectOptions} styles={customStyles} value={subject} onChange={setSubject} placeholder=''/>
                </div>
                </Col>
                <Col md={3}>
                    <div className='teacher_result_filter_group'>
                        <label htmlFor="term">Type of Exam<span style={{color: 'red'}}>*</span></label>
                        <Select options={termOptions} styles={customStyles} value={term} onChange={setTerm} placeholder=''/>
                    </div>
                    <div className='teacher_submit_result_filter'>
                    <button type="submit" onClick={handleSubmit}>Search</button>
                </div>
                </Col>
            </Row>
            
            </div>
        </form>
    </Container>
  )
}

export default TeacherResult