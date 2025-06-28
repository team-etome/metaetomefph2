import React, { useEffect, useState, useRef } from 'react';
import './newexaminationcompleted.css';
import { useSelector, useDispatch } from 'react-redux';
import { BsFillPersonFill } from "react-icons/bs";
import Select from 'react-select';


const  NewExaminationCompleted = ({ onSelectItem }) => {
    const APIURL = useSelector((state) => state.APIURL.url);
    const admin_id = useSelector((state) => state.admininfo.admininfo?.admin_id);
    const DummySeatingData = [
        { id: 1,  examName: 'Ankit', class: '10', examDate: '22/07/2025', subject: 'English' },
        { id: 2,  examName: 'ankit',       class: '9',  examDate: '01/09/2025', subject: 'Mathematics' },
        { id: 3,  examName: 'Annual Exam',          class: '12', examDate: '15/11/2025', subject: 'Science' },
        { id: 4,  examName: 'Midterm Exam',         class: '11', examDate: '10/10/2025', subject: 'Physics' },
        { id: 5,  examName: 'Weekly Quiz',          class: '8',  examDate: '05/08/2025', subject: 'Chemistry' },
        { id: 6,  examName: 'Pop Test',             class: '7',  examDate: '18/08/2025', subject: 'Biology' },
        { id: 7,  examName: 'Term Review',          class: '6',  examDate: '30/09/2025', subject: 'History' },
        { id: 8,  examName: 'Entrance Exam',        class: '5',  examDate: '12/06/2025', subject: 'Geography' },
        { id: 9,  examName: 'Progress Check',       class: '4',  examDate: '25/07/2025', subject: 'Computer Science' },
        { id: 10, examName: 'Chapter Test',         class: '3',  examDate: '08/08/2025', subject: 'Economics' },
        { id: 11, examName: 'Final Practical',      class: '2',  examDate: '20/11/2025', subject: 'Art' },
        { id: 12, examName: 'Oral Exam',            class: '1',  examDate: '05/12/2025', subject: 'Music' },
        { id: 13,  examName: 'Pop Test',             class: '7',  examDate: '18/08/2025', subject: 'Biology' },
        { id: 14,  examName: 'Term Review',          class: '6',  examDate: '30/09/2025', subject: 'History' },
        { id: 15,  examName: 'Entrance Exam',        class: '5',  examDate: '12/06/2025', subject: 'Geography' },
        { id: 16,  examName: 'Progress Check',       class: '4',  examDate: '25/07/2025', subject: 'Computer Science' },
        { id: 17, examName: 'Chapter Test',         class: '3',  examDate: '08/08/2025', subject: 'Economics' },
        { id: 18, examName: 'Final Practical',      class: '2',  examDate: '20/11/2025', subject: 'Art' },
        { id: 19, examName: 'Oral Exam',            class: '1',  examDate: '05/12/2025', subject: 'Music' },
      ];

      const [selectedItemCompleted, setSelectedItemCompleted] = useState(null);
      
        const handleBoxClick = (item) => {
            setSelectedItemCompleted(item);
        };
      

    const dashboardcustomStyles = {
        control: (base, state) => ({
            ...base,
            width: '300px',
            height: '40px',
            borderRadius: '8px',
            borderColor: state.isFocused ? '#86b7fe' : '#757575',
            boxShadow: state.isFocused ? '0 0 0 .25rem rgb(194, 218, 255)' : 0,
        }),

        dropdownIndicator: (base) => ({
            ...base,
            color: '#292D32',
            padding: '0 8px',
            alignItems: 'center',
            svg: {
                width: '24px',
                height: '24px',
            }
        }),

        indicatorSeparator: () => ({
            display: 'none'
        }),

        placeholder: (base) => ({
            ...base,
            color: '#526D82',
            fontSize: '16px'
        }),

        singleValue: (base) => ({
            ...base,
            color: '#526D82',
            fontSize: '16px'
        }),

        menu: (base) => ({
            ...base,
            zIndex: 1000,
            maxHeight: '200px',  // Limit the height of the dropdown list
            overflowY: 'auto',   // Enable scrolling when the options exceed the height
            fontSize: '14px',
        }),

        option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? '#2162B2' : '#fff',
            color: state.isFocused ? '#fff' : '#222222',
            '&:active': {
                backgroundColor: '#e6e6e6',
            }
        }),
    };
    const dashboardsmallcustomStyles = {
        control: (base, state) => ({
            ...base,
            width: '200px',
            height: '40px',
            borderRadius: '8px',
            borderColor: state.isFocused ? '#86b7fe' : '#757575',
            boxShadow: state.isFocused ? '0 0 0 .25rem rgb(194, 218, 255)' : 0,
        }),

        dropdownIndicator: (base) => ({
            ...base,
            color: '#292D32',
            padding: '0 8px',
            alignItems: 'center',
            svg: {
                width: '24px',
                height: '24px',
            }
        }),

        indicatorSeparator: () => ({
            display: 'none'
        }),

        placeholder: (base) => ({
            ...base,
            color: '#526D82',
            fontSize: '16px'
        }),

        singleValue: (base) => ({
            ...base,
            color: '#526D82',
            fontSize: '16px'
        }),

        menu: (base) => ({
            ...base,
            zIndex: 1000,
            maxHeight: '200px',  // Limit the height of the dropdown list
            overflowY: 'auto',   // Enable scrolling when the options exceed the height
            fontSize: '14px',
        }),

        option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? '#2162B2' : '#fff',
            color: state.isFocused ? '#fff' : '#222222',
            '&:active': {
                backgroundColor: '#e6e6e6',
            }
        }),
    };

    return (
        <>

            <div className="newexaminationcompleted_main_container">
                <div className="newexaminationcompleted_main_header_container">
                    <div className="newexaminationcompleted_header-controls d-flex justify-content-between align-items-center">
                        <div className="newexaminationcompleted_left-controls" >
                            <Select
                                styles={dashboardcustomStyles}
                                placeholder="Select Exam Name"
                            />
                           
                            <Select
                                styles={dashboardsmallcustomStyles}  
                                placeholder="Select Class"
                            />
                            <Select
                                styles={dashboardsmallcustomStyles}  
                                placeholder="Select Subject"
                            />
                            
                        </div>
                    </div>
                </div>
                <div className="newexaminationcompleted_classes_box" >
                    <div className="newexaminationcompleted_container" >
                    {DummySeatingData.map((item) => (
                            <div
                                className="newexaminationcompleted_classes_box_inner"
                                key={item.id}
                                onClick={() => onSelectItem(item)}
                                // style={{border:"2px solid red"}}

                            >
                                <div className="newexaminationcompleted_top_row" 
                                // style={{border:"2px solid red"}}
                                 >
                                    <div className="newexaminationcompleted_exam_details">
                                        <p className="newexaminationcompleted_examname">{item.examName}</p>
                                        <p className="newexaminationcompleted_subject">{item.subject}</p>
                                    </div>
                                </div>
                                <div className="newexaminationcompleted_bottom_row">
                                    <p className="newexaminationcompleted_class">
                                        Class:{item.class}</p>
                                    <div>
                                        <span className="newexaminationcompleted_date">Date: </span>
                                        <span className="newexaminationcompleted_date_input">{item.examDate}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


            </div >

        </>

    );
};

export default NewExaminationCompleted;
