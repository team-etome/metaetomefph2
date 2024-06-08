import React, { useState, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IoChevronBackSharp } from 'react-icons/io5';
import Select from 'react-select';
import { FaCalendarAlt } from 'react-icons/fa';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import '../addstudent/addstudent.css';

function AddStudent() {
    const [sname, setSName] = useState(null);
    const [srollNo, setSRollNo] = useState(null);
    const [sclass, setSClass] = useState(null);
    const [sdivision, setSDivision] = useState(null);
    const [semail, setSEmail] = useState(null);
    const [sphone, setSPhone] = useState(null);
    const [sdob, setSDOB] = useState(null);
    const [sgender, setSGender] = useState(null);
    const [sjoinDate, setSJoinDate] = useState(null);
    const [scategory, setSCategory] = useState(null);
    const [sadmissionNo, setSAdmissionNo] = useState(null);
    const [sguardian, setSGuardian] = useState(null);
    const [sfatherName, setSFatherName] = useState(null);
    const [smotherName, setSMotherName] = useState(null);
    const [saddress, setSAddress] = useState(null);



    const [isDOBPickerOpen, setDOBPickerOpen] = useState(false);
    const [isJoinDatePickerOpen, setJoinDatePickerOpen] = useState(false);

    const dobRef = useRef(null);
    const joinDateRef = useRef(null);


    const genderOptions = [
        { value: 'female', label: 'female' },
        { value: 'male', label: 'male' },
        { value: 'other', label: 'other' },
    ];

   const customStyles = {
      control: (base, state) => ({
        ...base,
        width: '100%',
        minHeight: '40px',
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
      }),
      menu: (base) => ({
        ...base,
        zIndex: 9999,
        position: 'absolute',
      })
    };

  return (
    <div>
        <Container className='teacher_studentadd_container'>
        <form className='teacher_studentadd_form' >
        {/* <div className="teacher_studentadd_scrollable"> */}
        <div style={{display: 'flex', alignItems: 'center', marginBottom:'10px'}}>
            <Link to='/aarnanavbar'>
                <IoChevronBackSharp className='teacher_studentadd_back' />
            </Link>
            <h1 className='teacher_studentadd_title'>Add Student</h1>
            </div>
            <div style={{ border: '0.5px solid #526D82' }}></div>
            <div className="teacher_studentadd_scrollable">
                <Row style={{paddingTop:'20px'}}>


                    <Col md={6}>
                        <div className='teacher_studentadd_group'>
                            <label htmlFor="student_name">Student Name<span style={{color: 'red'}}>*</span></label>
                            <input type="text" id='student_name' name='student_name' />
                        </div>
                        <div className='teacher_studentadd_group'>
                            <label htmlFor="roll_no">Roll No.<span style={{color: 'red'}}>*</span></label>
                            <input type="text" id='exam_roll_nodate' name='roll_no' />
                        </div>
                        <div className='teacher_studentadd_group'>
                            <label htmlFor="student_class">Class<span style={{color: 'red'}}>*</span></label>
                            <input type="text" id='student_class' name='student_class' />
                        </div>
                        <div className='teacher_studentadd_group'>
                            <label htmlFor="division">Division</label>
                            <input type="text" id='division' name='division' />
                        </div>
                        <div className='teacher_studentadd_group'>
                            <label htmlFor="email">Email Id<span style={{color: 'red'}}>*</span></label>
                            <input type="text" id='email' name='email' />
                        </div>
                        <div className='teacher_studentadd_group'>
                            <label htmlFor="phone">Phone No.<span style={{color: 'red'}}>*</span></label>
                            <input type="text" id='suphonebject' name='phone' />
                        </div>
                        <div className='teacher_studentadd_group'>
                            <label htmlFor="dob">DOB<span style={{ color: 'red' }}>*</span></label>
                            <div className="teacher_studentadd_date_input">
                                <input type="text" id='dob' name='dob' ref={dobRef} 
                                    value={sdob ? format(new Date(sdob), 'yyyy-MM-dd') : ''}
                                    onClick={() => setDOBPickerOpen(!isDOBPickerOpen)}
                                    readOnly
                                />
                                <FaCalendarAlt className='teacher_studentadd_icon' onClick={() => setDOBPickerOpen(!isDOBPickerOpen)} />
                            </div>
                            {isDOBPickerOpen && (
                                <DayPicker
                                    onDayClick={(date) => {
                                    setSDOB(date);
                                    setDOBPickerOpen(false);
                                    }}
                                    selected={sdob}
                                    className='teacher_studentadd_calendar'
                                />
                            )}
                        </div>
                        <div className='teacher_studentadd_group'>
                            <label htmlFor="gender">Gender<span style={{color: 'red'}}>*</span></label>
                            <Select options={genderOptions} styles={customStyles} value={sgender} onChange={setSGender} placeholder=''/>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className='teacher_studentadd_group'>
                            <label htmlFor="join_date">Joining Date<span style={{color: 'red'}}>*</span></label>
                            <div className="teacher_studentadd_date_input">
                                <input type="text" id='join_date' name='join_date' ref={joinDateRef} 
                                    value={sjoinDate ? format(new Date(sjoinDate), 'yyyy-MM-dd') : ''}
                                    onClick={() => setJoinDatePickerOpen(!isJoinDatePickerOpen)}
                                    readOnly
                                />
                                <FaCalendarAlt className='teacher_studentadd_icon' onClick={() => setDOBPickerOpen(!isDOBPickerOpen)} />
                            </div>
                            {isJoinDatePickerOpen && (
                                <DayPicker
                                    onDayClick={(date) => {
                                    setSJoinDate(date);
                                    setJoinDatePickerOpen(false);
                                    }}
                                    selected={sjoinDate}
                                    className='teacher_studentadd_calendar'
                                />
                            )}
                        </div>
                        <div className='teacher_studentadd_group'>
                            <label htmlFor="category" >Category<span style={{color: 'red'}}>*</span></label>
                            <input type="text" id='category' name='category' />
                        </div>
                        <div className='teacher_studentadd_group'>
                            <label htmlFor="term">Admission Number<span style={{color: 'red'}}>*</span></label>
                            <input type="text" id='s_time' name='s_time' />
                        </div>
                        <div className='teacher_studentadd_group'>
                            <label htmlFor="guardian_name">Gaurdian Name<span style={{color: 'red'}}>*</span></label>
                            <input type="text" id='guardian_name' name='guardian_name' />
                        </div>
                        <div className='teacher_studentadd_group'>
                            <label htmlFor="father_name">Father's Name<span style={{color: 'red'}}>*</span></label>
                            <input type="text" id='father_name' name='father_name' />
                        </div>
                        <div className='teacher_studentadd_group'>
                            <label htmlFor="mother_name">Mother's Name<span style={{color: 'red'}}>*</span></label>
                            <input type="text" id='mother_name' name='mother_name' />
                        </div>
                        <div className='teacher_studentadd_group'>
                            <label htmlFor="address">Address<span style={{color: 'red'}}>*</span></label>
                            <input type="text" id='address' name='address' />
                        </div>
                        {/* <div className='teacher_studentadd_group'>
                            <label htmlFor="upload_image">Upload Image<span style={{color: 'red'}}>*</span></label>
                            <input type="text" id='upload_image' name='assigupload_imagen_faculty' />
                        </div> */}
                        <div className='teacher_studentadd_submit'>
                        <button type="submit">Submit</button>
                        </div>
                    </Col>

                </Row>
                </div>

            </form>
        </Container>
    </div>
  )
}

export default AddStudent