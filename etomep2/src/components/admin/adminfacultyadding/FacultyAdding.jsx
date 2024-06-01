import React,{useState} from 'react'
import '../adminfacultyadding/facultyadding.css';
import { Container , Row,Col} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import Select from "react-select";


function FacultyAdding() {
    const [gender, setGender] = useState(null);
    const [subject, setSubject] = useState(null);
  
    const genderOptions = [
      { value: 'Female', label: 'Female' },
      { value: 'Male', label: 'Male' },
      { value: 'Other', label: 'Other' },
    ];
  
    const subjectOptions = [
      { value: 'subject 1', label: 'subject 1' },
      { value: 'subject 2', label: 'subject 2' },
      { value: 'subject 3', label: 'subject 3' },
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
      }),
      menu: (base) => ({
        ...base,
        zIndex: 9999,
        position: 'absolute',
      })
    };
  return (
    <div  className='faculty_adding' >
        <Container className='faculty_container'>
        <form className='faculty_form'>
        <Row>
            <Col>
              <div className="faculty_header">
                <Link to='/adminfacultydashboard'>
                  <IoChevronBackSharp className='faculty_back' style={{ color: '#526D82', height: "32px", width: "32px", marginLeft: '10px' }} />
                </Link>
                <h1 className='faculty_title'>Add Faculty</h1>
              </div>
              <div style={{ border: '0.5px solid #526D82' }}></div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
                <div className='faculty_form_field'>
                    <label htmlFor="first_name">First Name<span style={{color: 'red'}}>*</span></label>
                    <input type="text" id='first_name' name='first_name'placeholder=''/>
                </div>
                <div className='faculty_form_field'>
                    <label htmlFor="last_name">Last Name<span style={{color: 'red'}}>*</span></label>
                    <input type="text" id='last_name' name='last_name'placeholder=''/>
                </div>
                <div className='faculty_form_field'>
                    <label htmlFor="employee_id">Employee Id<span style={{color: 'red'}}>*</span></label>
                    <input type="text" id='employee_id' name='employee_id'placeholder=''/>
                </div>
                <div className='faculty_form_field'>
                    <label htmlFor="email_id">Email Id<span style={{color: 'red'}}>*</span></label>
                    <input type="text" id='email_id' name='email_id'placeholder=''/>
                </div>
            </Col>
            <Col md={6}>
                <div className='faculty_form_field_select'>
                    <label htmlFor="gender">Gender<span style={{color: 'red'}}>*</span></label>
                    {/* <input type="text" id='gender' name='gender'placeholder=''/> */}
                    <Select
                        options={genderOptions}
                        styles={customStyles}
                        placeholder=""
                        value={gender}
                        onChange={setGender}
                    />
                </div>
                <div className='faculty_form_field'>
                    <label htmlFor="phone_no">Phone No:<span style={{color: 'red'}}>*</span></label>
                    <input type="text" id='phone_no' name='phone_no'placeholder=''/>
                </div>
                <div className='faculty_form_field_select'>
                    <label htmlFor="subject">Subject<span style={{color: 'red'}}>*</span></label>
                    {/* <input type="text" id='subject' name='subject'placeholder=''/> */}
                    <Select
                        options={subjectOptions}
                        styles={customStyles}
                        placeholder=""
                        value={subject}
                        onChange={setSubject}
                    />
                </div>
            </Col>
          </Row>
            <div className='faculty_submit' style={{textAlign:'right', }}>
                <button type="submit" value="submit" className='submit_button'>
                  Submit
                </button>
            </div>
          </form>
        </Container>
    </div>
  )
}

export default FacultyAdding