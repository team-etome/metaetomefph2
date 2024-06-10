import React, { useState, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate  } from 'react-router-dom';
import { IoChevronBackSharp } from 'react-icons/io5';
import Select from 'react-select';
import { FaCalendarAlt } from 'react-icons/fa';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2'; 
import '../addstudent/addstudent.css';

function AddStudent() {
    const [studentName, setStudentName] = useState(null);
    const [studentRollno, setStudentRollno] = useState(null);
    const [studentClass, setStudentClass] = useState(null);
    const [studentDivision, setStudentDivision] = useState(null);
    const [studentEmail, setStudentEmail] = useState(null);
    const [studentPhone, setStudentPhone] = useState(null);
    const [studentDob, setStudentDob] = useState(null);
    const [studentGender, setStudentGender] = useState(null);
    const [studentJoined, setStudentJoined] = useState(null);
    const [studentCategory, setStudentCategory] = useState(null);
    const [studentAdmission, setStudentAdmission] = useState(null);
    const [studentGuardian, setstudentGuardian] = useState(null);
    const [studentFather, setStudentFather] = useState(null);
    const [studentMother, setStudentMother] = useState(null);
    const [studentAddress, setStudentAddress] = useState(null);

    // const admininfo = useSelector((state) => state.admininfo);
    const APIURL = useSelector((state) => state.APIURL.url);
    // const admin_id = admininfo ? admininfo.admininfo.admin_id : '1';

    const navigate = useNavigate()
    
    const [isDOBPickerOpen, setDOBPickerOpen] = useState(false);
    const [isJoinDatePickerOpen, setJoinDatePickerOpen] = useState(false);

    const dobRef = useRef(null);
    const joinDateRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = {
          first_name: studentName, // Using snake_case if your backend expects these keys
          last_name: studentRollno,
          email: studentClass,
          phone_number: studentDivision, // Assuming the backend expects phone_number
        //   gender: gender ? gender.value : null, 
          employee_id: studentEmail, // Using snake_case if that's what your backend expects
          password: studentPhone,
          password: studentDob,
          password: studentGender,
          password: studentJoined,
          password: studentCategory,
          password: studentAdmission,
          password: studentGuardian,
          password: studentFather,
          password: studentMother,
          password: studentAddress,

        //   admin_id: admin_id,
        };
    
        try {
          const response = await axios.post(`${APIURL}/api/addstudent`, formData);
          console.log("Success:", response.data);

          setStudentName("");
          setStudentRollno("");
          setStudentClass("");
          setStudentDivision("");
          setStudentEmail("");
          setStudentPhone("");
          setStudentDob("");
          setStudentGender("");
          setStudentJoined("");
          setStudentCategory("");
          setStudentAdmission("");
          setstudentGuardian("");
          setStudentFather("");
          setStudentMother("");
          setStudentAddress("");

    
          // Show success message
          Swal.fire({
            icon: 'success',
            title: 'Registration Successful',
            text: 'Student has been added successfully!',
          });
    
          navigate('/teachernavbar')
    
          
    
        } catch (error) {
          console.error("Error submitting form:", error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: 'Please check the data and try again.'
          });
          // Handle errors
        }
      };
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
                            <input type="text" id='student_name' name='student_name' value={studentName} onChange={(e) => setStudentName(e.target.value)}/>
                        </div>
                        <div className='teacher_studentadd_group'>
                            <label htmlFor="roll_no">Roll No.<span style={{color: 'red'}}>*</span></label>
                            <input type="text" id='exam_roll_nodate' name='roll_no' value={studentRollno} onChange={(e) => setStudentRollno(e.target.value)}/>
                        </div>
                        <div className='teacher_studentadd_group'>
                            <label htmlFor="student_class">Class<span style={{color: 'red'}}>*</span></label>
                            <input type="text" id='student_class' name='student_class'value={studentClass} onChange={(e) => setStudentClass(e.target.value)} />
                        </div>
                        <div className='teacher_studentadd_group'>
                            <label htmlFor="division">Division</label>
                            <input type="text" id='division' name='division' value={studentDivision} onChange={(e) => setStudentDivision(e.target.value)}/>
                        </div>
                        <div className='teacher_studentadd_group'>
                            <label htmlFor="email">Email Id<span style={{color: 'red'}}>*</span></label>
                            <input type="text" id='email' name='email'value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} />
                        </div>
                        <div className='teacher_studentadd_group'>
                            <label htmlFor="phone">Phone No.<span style={{color: 'red'}}>*</span></label>
                            <input type="text" id='suphonebject' name='phone' value={studentPhone} onChange={(e) => setStudentPhone(e.target.value)}/>
                        </div>
                        <div className='teacher_studentadd_group'>
                            <label htmlFor="dob">DOB<span style={{ color: 'red' }}>*</span></label>
                            <div className="teacher_studentadd_date_input">
                                <input type="text" id='dob' name='dob' ref={dobRef} 
                                    value={studentDob ? format(new Date(studentDob), 'yyyy-MM-dd') : ''}
                                    onClick={() => setDOBPickerOpen(!isDOBPickerOpen)}
                                    readOnly
                                />
                                <FaCalendarAlt className='teacher_studentadd_icon' onClick={() => setDOBPickerOpen(!isDOBPickerOpen)} />
                            </div>
                            {isDOBPickerOpen && (
                                <DayPicker
                                    onDayClick={(date) => {
                                    setStudentDob(date);
                                    setDOBPickerOpen(false);
                                    }}
                                    selected={studentDob}
                                    className='teacher_studentadd_calendar'
                                />
                            )}
                        </div>
                        <div className='teacher_studentadd_group'>
                            <label htmlFor="gender">Gender<span style={{color: 'red'}}>*</span></label>
                            <Select options={genderOptions} styles={customStyles} value={studentGender} onChange={setStudentGender} placeholder=''getOptionLabel={(option) => option.label} getOptionValue={(option) => option.value}/>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className='teacher_studentadd_group'>
                            <label htmlFor="join_date">Joining Date<span style={{color: 'red'}}>*</span></label>
                            <div className="teacher_studentadd_date_input">
                                <input type="text" id='join_date' name='join_date' ref={joinDateRef} 
                                    value={studentJoined ? format(new Date(studentJoined), 'yyyy-MM-dd') : ''}
                                    onClick={() => setJoinDatePickerOpen(!isJoinDatePickerOpen)}
                                    readOnly
                                />
                                <FaCalendarAlt className='teacher_studentadd_icon' onClick={() => setDOBPickerOpen(!isDOBPickerOpen)} />
                            </div>
                            {isJoinDatePickerOpen && (
                                <DayPicker
                                    onDayClick={(date) => {
                                    setStudentJoined(date);
                                    setJoinDatePickerOpen(false);
                                    }}
                                    selected={studentJoined}
                                    className='teacher_studentadd_calendar'
                                />
                            )}
                        </div>
                        <div className='teacher_studentadd_group'>
                            <label htmlFor="category" >Category<span style={{color: 'red'}}>*</span></label>
                            <input type="text" id='category' name='category' value={studentName} onChange={(e) => setStudentName(e.target.value)}/>
                        </div>
                        <div className='teacher_studentadd_group'>
                            <label htmlFor="term">Admission Number<span style={{color: 'red'}}>*</span></label>
                            <input type="text" id='s_time' name='s_time' value={studentAdmission} onChange={(e) => setStudentAdmission(e.target.value)}/>
                        </div>
                        <div className='teacher_studentadd_group'>
                            <label htmlFor="guardian_name">Gaurdian Name<span style={{color: 'red'}}>*</span></label>
                            <input type="text" id='guardian_name' name='guardian_name' value={studentGuardian} onChange={(e) => setstudentGuardian(e.target.value)}/>
                        </div>
                        <div className='teacher_studentadd_group'>
                            <label htmlFor="father_name">Father's Name<span style={{color: 'red'}}>*</span></label>
                            <input type="text" id='father_name' name='father_name'value={studentFather} onChange={(e) => setStudentFather(e.target.value)} />
                        </div>
                        <div className='teacher_studentadd_group'>
                            <label htmlFor="mother_name">Mother's Name<span style={{color: 'red'}}>*</span></label>
                            <input type="text" id='mother_name' name='mother_name' value={studentMother} onChange={(e) => setStudentMother(e.target.value)}/>
                        </div>
                        <div className='teacher_studentadd_group'>
                            <label htmlFor="address">Address<span style={{color: 'red'}}>*</span></label>
                            <input type="text" id='address' name='address'value={studentAddress} onChange={(e) => setStudentAddress(e.target.value)} />
                        </div>
                        {/* <div className='teacher_studentadd_group'>
                            <label htmlFor="upload_image">Upload Image<span style={{color: 'red'}}>*</span></label>
                            <input type="text" id='upload_image' name='assigupload_imagen_faculty' />
                        </div> */}
                        <div className='teacher_studentadd_submit'>
                        <button onClick={handleSubmit} type="submit">Submit</button>
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