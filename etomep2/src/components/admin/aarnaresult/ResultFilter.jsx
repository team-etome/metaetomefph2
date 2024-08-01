
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';
import { IoChevronBackSharp } from 'react-icons/io5';
import Select from 'react-select';
import '../aarnaresult/resultfilter.css'



function ResultFilter() {
    const [classNo, setClassNo] = useState('');
    const [division, setDivision] = useState('');
    const [year, setYear] = useState('');
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

    const yearOptions = [
        { value: '2021', label: '2021' },
        { value: '2022', label: '2021' },
        { value: '2023', label: '2023' },
        { value: '2021', label: '2021' },
        { value: '2022', label: '2021' },
        { value: '2023', label: '2023' },
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
      navigate('/adminresultview'); // Adjust the path as necessary
  }

  //  const customStyles = {
  //     control: (base, state) => ({
  //       ...base,
  //       width: '100%',
  //       minHeight: '40px',
  //       border: '1px solid #526D82',
  //       borderRadius: '8px',
  //       boxShadow: state.isFocused ? '0 0 0 1px #526D82' : 'none', 
  //       "&:hover": {
  //         borderColor: '#526D82' 
  //       },
  //       "&:focus": {
  //         borderColor: '#526D82', 
  //         outline: 'none' 
  //       }
  //     }),
  //     placeholder: (base) => ({
  //       ...base,
  //       color: '#526D82', 
  //     }),
  //     singleValue: (base) => ({
  //       ...base,
  //       color: '#000',
  //     }),
  //     option: (base) => ({
  //       ...base,
  //       color: '#000',
  //     }),
  //     valueContainer: (base) => ({
  //       ...base,
  //       padding: '0 10px',
  //     }),
  //     dropdownIndicator: (base) => ({
  //       ...base,
  //       color: '#526D82',
  //     }),
  //     indicatorsContainer: (base) => ({
  //       ...base,
  //       alignItems: 'center',
  //     }),
  //     menu: (base) => ({
  //       ...base,
  //       zIndex: 9999,
  //       position: 'absolute',
  //     })
  //   };
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
      maxHeight: '150px', // Set the max height for the dropdown list
      overflowY: 'auto' // Add vertical scrolling
    }),
    menuList: (base) => ({
      ...base,
      maxHeight: '150px', // Set the max height for the list items
      padding: '0'
    }),
  };
  
  return (
    <Container className='result_filter_container'>
    <form className='result_filter_form' >
      <div style={{display: 'flex', alignItems: 'center', marginBottom:'0px'}}>
        {/* <Link to='/aarnanavbar'>
            <IoChevronBackSharp onClick={handleBack} className='result_filter_back' />
        </Link> */}
        <h1 className='result_filter_title'>Result</h1>
        </div>
        <div style={{ border: '0.5px solid #526D82' }}></div>
        <div className="result_filter_scrollable">
            <Row style={{paddingTop:'20px', paddingLeft:'20px', paddingRight:'20px'}}>
                <Col md={3}>
                <div className='result_filter_group'>
                    <label htmlFor="class_no" >Class No.<span style={{color: 'red'}}>*</span></label>
                    <Select id="class_no" options={classnoOptions} styles={customStyles} value={classNo} onChange={setClassNo} placeholder=''/>
                </div>
                </Col>
                <Col md={3}>
                <div className='result_filter_group'>
                    <label htmlFor="division">Division<span style={{color: 'red'}}>*</span></label>
                    <Select options={divisionOptions} styles={customStyles} value={division} onChange={setDivision} placeholder=''/>
                </div>
                </Col>
                <Col md={3}>
                <div className='result_filter_group'>
                    <label htmlFor="year">Year<span style={{color: 'red'}}>*</span></label>
                    <Select options={yearOptions} styles={customStyles} value={year} onChange={setYear} placeholder=''/>
                </div>
                </Col>
                <Col md={3}>
                    <div className='result_filter_group'>
                        <label htmlFor="term">Term<span style={{color: 'red'}}>*</span></label>
                        <Select options={termOptions} styles={customStyles} value={term} onChange={setTerm} placeholder=''/>
                    </div>
                    <div className='submit_result_filter'>
                    <button type="submit" onClick={handleSubmit}>Search</button>
                </div>
                </Col>
            </Row>
            
            </div>
        </form>
    </Container>
  )
}

export default ResultFilter