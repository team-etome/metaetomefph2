import React, { useState } from 'react';
import '../admincurriculumadding/curriculumadding.css';
import { Container, Row, Col } from "react-bootstrap";
import { IoChevronBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import Select from "react-select";

function CurriculumAdding() {
  const [publisher, setPublisher] = useState(null);
  const [subject, setSubject] = useState(null);
  const [faculty, setFaculty] = useState(null);

  const publisherOptions = [
    { value: 'Publisher1', label: 'Publisher 1' },
    { value: 'Publisher2', label: 'Publisher 2' },
    { value: 'Publisher3', label: 'Publisher 3' },
  ];

  const subjectOptions = [
    { value: 'Math', label: 'Math' },
    { value: 'Science', label: 'Science' },
    { value: 'History', label: 'History' },
  ];

  const facultyOptions = [
    { value: 'Faculty1', label: 'Faculty 1' },
    { value: 'Faculty2', label: 'Faculty 2' },
    { value: 'Faculty3', label: 'Faculty 3' },
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
    })
  };
  
  
  return (
    <div className="curriculum_container">
      <Container className='curriculum_add'>
        <form className='curriculum_form' style={{ backgroundColor: '#ffff', borderRadius: '16px', height: '90%' }}>
          <Row>
            <Col>
              <div className="curriculum_header">
                <Link to='/classadding'>
                  <IoChevronBackSharp className='curriculum_back'/>
                </Link>
                <h1 className='curriculum_title'>Add Curriculum</h1>
              </div>
              <div style={{ border: '0.5px solid #526D82' }}></div>
            </Col>
          </Row>
          <Row>
            <div className='edit_delete'>
              <div className='curriculum_delete'>
                <button>
                  Delete
                </button>
              </div>
              <div className='curriculum_edit'>
                <button>
                  Edit
                </button>
              </div>
            </div>
          </Row>
          <Row>
            <Col md={4}>
              <div className='curriculum_inputfield'>
                <label htmlFor="publisher_name">Publisher Name<span style={{ color: 'red' }}>*</span></label>
                <Select
                  options={publisherOptions}
                  styles={customStyles}
                  placeholder=""
                  value={publisher}
                  onChange={setPublisher}
                />
              </div>
            </Col>
            <Col md={4}>
              <div className='curriculum_inputfield'>
                <label htmlFor="subject">Subject<span style={{ color: 'red' }}>*</span></label>
                <Select
                  options={subjectOptions}
                  styles={customStyles}
                  placeholder=""
                  value={subject}
                  onChange={setSubject}
                />
              </div>
            </Col>
            <Col md={4}>
              <div className='curriculum_inputfield'>
                <label htmlFor="faculty_name">Faculty Name<span style={{ color: 'red' }}>*</span></label>
                <Select
                  options={facultyOptions}
                  styles={customStyles}
                  placeholder=""
                  value={faculty}
                  onChange={setFaculty}
                />
              </div>
              <div className='curriculum_inputfield curriculum_addnew_button' style={{ textAlign: 'right' }}>
                <button type="button" className='curriculum_addnew'>
                  <IoIosAdd style={{ height: '20px', width: '20px' }} />Add New
                </button>
              </div>
            </Col>
          </Row>
          <Row>
            <div className='curriculum_listing'>
              Curriculum Listing
            </div>
            <div className='curriculum_submit_button' style={{ textAlign: 'right', marginRight: "10px" }}>
              <button type="submit" value="submit" className='curriculum_submit'>
                Submit
              </button>
            </div>
          </Row>
        </form>
      </Container>
    </div>
  );
}

export default CurriculumAdding;
