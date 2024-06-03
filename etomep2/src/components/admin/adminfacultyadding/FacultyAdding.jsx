import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IoChevronBackSharp } from 'react-icons/io5';
import Select from 'react-select';
import '../adminfacultyadding/facultyadding.css';

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
        width: '100%',
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
        <div>
            <Container className='faculty_container'>
            <form className='faculty_form' >
              <div style={{display: 'flex', alignItems: 'center', marginBottom:'10px'}}>
                <Link to='/institutionadding'>
                    <IoChevronBackSharp className='faculty_back' />
                </Link>
                <h1 className='faculty_title'>Add Faculty</h1>
                </div>
                <div style={{ border: '0.5px solid #526D82' }}></div>

                    <Row style={{paddingTop:'20px'}}>
                        <Col md={6}>
                            <div className='faculty_group'>
                                <label htmlFor="first_name">First Name<span style={{color: 'red'}}>*</span></label>
                                <input type="text" id='first_name' name='first_name' />
                            </div>
                            <div className='faculty_group'>
                                <label htmlFor="last_name">Last Name<span style={{color: 'red'}}>*</span></label>
                                <input type="text" id='last_name' name='last_name' />
                            </div>
                            <div className='faculty_group'>
                                <label htmlFor="email_id">Email ID<span style={{color: 'red'}}>*</span></label>
                                <input type="email" id='email_id' name='email_id' />
                            </div>
                            <div className='faculty_group'>
                                <label htmlFor="employee_id">Employee Id</label>
                                <input type="text" id='employee_id' name='employee_id' />
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className='faculty_group'>
                                <label htmlFor="phone_no">Phone No:<span style={{color: 'red'}}>*</span></label>
                                <input type="text" id='phone_no' name='phone_no' />
                            </div>
                            <div className='faculty_group'>
                                <label htmlFor="gender" >Gender<span style={{color: 'red'}}>*</span></label>
                                <Select options={genderOptions} styles={customStyles} value={gender} onChange={setGender} placeholder=''/>
                            </div>
                            <div className='faculty_group'>
                                <label htmlFor="subject">Subject<span style={{color: 'red'}}>*</span></label>
                                <Select options={subjectOptions} styles={customStyles} value={subject} onChange={setSubject} placeholder=''/>
                            </div>
                            <div className='submit_faculty'>
                            <button type="submit" className='faculty_button'>Submit</button>
                            </div>
                        </Col>
                    </Row>
                </form>
            </Container>
        </div>
    )
}

export default FacultyAdding;