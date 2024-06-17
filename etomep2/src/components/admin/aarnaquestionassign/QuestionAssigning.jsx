import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IoChevronBackSharp } from 'react-icons/io5';
import Select from 'react-select';
import '../aarnaquestionassign/questionassigning.css'

function QuestionAssigning() {
    const [term, setTerm] = useState(null);
    const [subject, setSubject] = useState(null);
    const [examName, setExamName] = useState(null);
    const [examDate, setExamDate] = useState(null);
    const [classNo, setClassNo] = useState(null);
    const [category, setCategory] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [totalMark, setTotalMark] = useState(null);
    const [assignFaculty, setAssignFaculty] = useState(null);

    const termOptions = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
    ];

    const subjectOptions = [
        { value: '1', label: '1' },
        { value: ' 2', label: '2' },
        { value: '3', label: '3' },
    ];

    const customStyles = {
      control: (base, state) => ({
        ...base,
        width: '100%',
        minHeight: '40px', 
        height: '50px',
        border: '1px solid #526D82',
        borderRadius: '8px',
        boxShadow: state.isFocused ? 'none' : 'none',
        "&:hover": {
          borderColor: 'none' 
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
      indicatorSeparator: (base) => ({
        display: 'none',
      }),
      indicatorsContainer: (base) => ({
        ...base,
        alignItems: 'center',
      }),
      menu: (base) => ({
        ...base,
        zIndex: 9999,
        position: 'absolute',
      }),
    };
    


  return (
    <div>
    <Container className='qpaper_assign_container'>
    <form className='qpaper_form' >
      <div style={{display: 'flex', alignItems: 'center', marginBottom:'1px'}}>
        <Link to='/aarnanavbar'>
            <IoChevronBackSharp className='qpaper_back' />
        </Link>
        <h1 className='qpaper_title'>Question Setting</h1>
        </div>
        <div style={{ border: '0.5px solid #526D82' }}></div>
        <div className="qpaper_form_scrollable">

            <Row style={{paddingTop:'20px'}}>
                <Col md={6}>
                    <div className='qpaper_group'>
                        <label htmlFor="exam_name">Exam Name<span style={{color: 'red'}}>*</span></label>
                        <input type="text" id='exam_name' name='exam_name' />
                    </div>
                    <div className='qpaper_group'>
                        <label htmlFor="exam_date">Exam Date<span style={{color: 'red'}}>*</span></label>
                        <input type="text" id='exam_date' name='exam_date' />
                    </div>
                    <div className='qpaper_group'>
                        <label htmlFor="class">Class<span style={{color: 'red'}}>*</span></label>
                        <input type="text" id='class' name='class' />
                    </div>
                    <div className='qpaper_group'>
                        <label htmlFor="category">Category</label>
                        <input type="text" id='category' name='category' />
                    </div>
                    <div className='qpaper_group'>
                        <label htmlFor="subject">Subject<span style={{color: 'red'}}>*</span></label>
                        <input type="text" id='subject' name='subject' />
                    </div>
                    
                </Col>
                <Col md={6}>
                    <div className='qpaper_group'>
                        <label htmlFor="s_time">Start Time<span style={{color: 'red'}}>*</span></label>
                        <input type="text" id='s_time' name='s_time' />
                    </div>
                    <div className='qpaper_group'>
                        <label htmlFor="e_time" >End Time<span style={{color: 'red'}}>*</span></label>
                        <Select options={termOptions} styles={customStyles} value={term} onChange={setTerm} placeholder=''/>
                    </div>
                    <div className='qpaper_group'>
                        <label htmlFor="term">Term<span style={{color: 'red'}}>*</span></label>
                        <Select options={termOptions} styles={customStyles} value={term} onChange={setTerm} placeholder=''/>
                    </div>
                    <div className='qpaper_group'>
                        <label htmlFor="t_mark">Total Mark<span style={{color: 'red'}}>*</span></label>
                        <Select options={subjectOptions} styles={customStyles} value={subject} onChange={setSubject} placeholder=''/>
                    </div>
                    <div className='qpaper_group'>
                        <label htmlFor="assign_faculty">Assign Faculty<span style={{color: 'red'}}>*</span></label>
                        {/* <Select options={subjectOptions} styles={customStyles} value={subject} onChange={setSubject} placeholder=''/> */}
                        <input type="text" id='assign_faculty' name='assign_faculty' />
                    </div>
                    <div className='submit_qpaper'>
                    <button type="submit" className='qpaper_button'>Send</button>
                    </div>
                </Col>
            </Row>
            
            </div>
        </form>
    </Container>
</div>
  )
}

export default QuestionAssigning