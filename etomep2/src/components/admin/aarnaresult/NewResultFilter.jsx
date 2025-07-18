import React, { useEffect, useState, useRef } from 'react';
import './newresultfilter.css';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import axios from 'axios';

const NewResultFilter = () => {
    const APIURL = useSelector((state) => state.APIURL.url);
    const admin_id = useSelector((state) => state.admininfo.admininfo?.admin_id);

    const rawData = useSelector(state => state.exampaperinfo.exampaperinfo);

    console.log(rawData, "rawDatarawDatarawData")

    const [parsedKeys, setParsedKeys] = useState([])        // [{ full, exam, year }, …]
    const [examOptions, setExamOptions] = useState([])        // [ "Annual Examination", … ]
    const [yearOptions, setYearOptions] = useState([])        // [ "2024", "2025", … ]
    const [classOptions, setClassOptions] = useState([])        // [ "9", "10", … ]
    const [divisionOptions, setDivisionOptions] = useState([])  // [ "A", "B", … ]

    const [selectedExam, setSelectedExam] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedDivision, setSelectedDivision] = useState('');

    // New state for API response data
    const [allApiData, setAllApiData] = useState([]); // Store all data from initial API call
    const [filteredData, setFilteredData] = useState(null); // Store filtered data for display
    const [subjects, setSubjects] = useState([]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true); // For initial API call

    // Initial API call when component mounts
    useEffect(() => {
        const fetchInitialData = async () => {
            setInitialLoading(true);
            try {
                const payload = {
                    admin_id,
                };

                console.log('Initial API call payload:', payload);

                const response = await axios.post(
                    `${APIURL}/api/resultarna`,
                    payload,
                    {
                        headers: { 'Content-Type': 'application/json' }
                    }
                );

                console.log('Initial API response:', response.data);

                // Check if response has data directly or in a nested structure
                if (response.data && (response.data.datas || response.data.data)) {
                    const data = response.data.datas || response.data.data;
                    console.log(data, "Initial data coming in response");
                    setAllApiData(Array.isArray(data) ? data : []); // Store all data
                } else if (response.data && Array.isArray(response.data)) {
                    // If response.data is directly an array
                    console.log(response.data, "Initial data is directly an array");
                    setAllApiData(response.data);
                } else {
                    console.error('Initial API returned error:', response.data);
                }

            } catch (err) {
                console.error('Initial API call error:', err);
            } finally {
                setInitialLoading(false);
            }
        };

        if (admin_id) {
            fetchInitialData();
        }
    }, [admin_id, APIURL]);

    useEffect(() => {
        if (!rawData || Object.keys(rawData).length === 0) return;

        // Parse each key into { name, year }
        const parsed = Object.keys(rawData)
            .map(fullKey => {
                const m = fullKey.match(/^(.*)\s+(\d{4})$/);
                return m ? { name: m[1].trim(), year: m[2] } : null;
            })
            .filter(Boolean);

        console.log(parsed, "parsedparsedparsedparsedparsed")

        setParsedKeys(parsed);
        setExamOptions(Array.from(new Set(parsed.map(p => p.name))));
        setYearOptions(Array.from(new Set(parsed.map(p => p.year))));
    }, [rawData]);

    useEffect(() => {
        if (!selectedExam) return;
        const years = parsedKeys
            .filter(e => e.name === selectedExam)
            .map(e => e.year);
        setYearOptions(Array.from(new Set(years)));

        // wipe
        setSelectedYear('');
        setClassOptions([]);
        setSelectedClass('');
        setDivisionOptions([]);
        setSelectedDivision('');
    }, [selectedExam, parsedKeys]);

    useEffect(() => {
        if (!selectedExam || !selectedYear) {
            setClassOptions([]);
            return;
        }
        const fullKey = `${selectedExam} ${selectedYear}`;
        const papers = rawData[fullKey] || [];

        const classes = papers.map(p => p.class_name);
        setClassOptions(Array.from(new Set(classes)));

        // wipe
        setSelectedClass('');
        setDivisionOptions([]);
        setSelectedDivision('');
    }, [selectedExam, selectedYear, rawData]);

    useEffect(() => {
        if (!selectedExam || !selectedYear || !selectedClass) {
            setDivisionOptions([]);
            return;
        }
        const fullKey = `${selectedExam} ${selectedYear}`;
        const papers = rawData[fullKey] || [];

        const divisions = papers
            .filter(p => p.class_name === selectedClass)
            .map(p => p.division);
        setDivisionOptions(Array.from(new Set(divisions)));

        // wipe
        setSelectedDivision('');
    }, [selectedExam, selectedYear, selectedClass, rawData]);

    // Refs for horizontal scroll synchronization (header and body)
    const headerRef = useRef(null);
    const bodyRef = useRef(null);
    const isSyncingRef = useRef(false);
    const scrollbarRef = useRef(null);

    const handleHeaderScroll = (e) => {
        if (isSyncingRef.current) return;
        isSyncingRef.current = true;
        if (bodyRef.current) {
            bodyRef.current.scrollLeft = e.target.scrollLeft;
        }
        if (scrollbarRef.current) {
            scrollbarRef.current.scrollLeft = e.target.scrollLeft;
        }
        window.requestAnimationFrame(() => { isSyncingRef.current = false; });
    };

    const handleBodyScroll = (e) => {
        if (isSyncingRef.current) return;
        isSyncingRef.current = true;
        if (headerRef.current) {
            headerRef.current.scrollLeft = e.target.scrollLeft;
        }
        if (scrollbarRef.current) {
            scrollbarRef.current.scrollLeft = e.target.scrollLeft;
        }
        window.requestAnimationFrame(() => { isSyncingRef.current = false; });
    };

    const handleScrollbarScroll = (e) => {
        if (isSyncingRef.current) return;
        isSyncingRef.current = true;
        if (headerRef.current) headerRef.current.scrollLeft = e.target.scrollLeft;
        if (bodyRef.current) bodyRef.current.scrollLeft = e.target.scrollLeft;
        window.requestAnimationFrame(() => { isSyncingRef.current = false; });
    };

    const handleSearch = () => {
        if (!selectedExam || !selectedYear || !selectedClass || !selectedDivision) {
            return window.alert('Please select Exam, Year, Class and Division before searching.');
        }

        setLoading(true);
        try {
            // Filter data from the stored allApiData
            const filteredResult = allApiData.find(data =>
                data.exam === selectedExam &&
                data.year === parseInt(selectedYear) &&
                data.class === `${selectedClass} ${selectedDivision}`
            );

            console.log('Filtered result:', filteredResult);

            if (filteredResult) {
                setFilteredData(filteredResult);

                // Set subjects from filtered data
                setSubjects(filteredResult.subjects.map(subject => ({
                    key: subject.id,
                    name: subject.name,
                    total: subject.total_mark
                })));

                // Set students from filtered data
                setStudents(filteredResult.results);
            } else {
                console.log('No matching data found');
                setFilteredData(null);
                setSubjects([]);
                setStudents([]);
                window.alert('No data found for the selected criteria.');
            }

        } catch (err) {
            console.error('Search error:', err);
            window.alert('Search failed. Please try again.');
        } finally {
            setLoading(false);
        }
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

    const handleExamChange = (selectedOption) => {
        setSelectedExam(selectedOption ? selectedOption.value : '');
    };

    const handleYearChange = (selectedOption) => {
        setSelectedYear(selectedOption ? selectedOption.value : '');
    };

    const handleClassChange = (selectedOption) => {
        setSelectedClass(selectedOption ? selectedOption.value : '');
    };

    const handleDivisionChange = (selectedOption) => {
        setSelectedDivision(selectedOption ? selectedOption.value : '');
    };


    return (
        <div className="result_main_container">
            <div className="result_main_header_container">
                <div className="result_main-header-controls d-flex justify-content-between align-items-center">
                    <div className="result_main-left-controls">
                        {/* Exam Type Dropdown */}
                        <Select
                            value={selectedExam ? { label: selectedExam, value: selectedExam } : null}
                            onChange={opt => setSelectedExam(opt.value)}
                            options={examOptions.map(name => ({ label: name, value: name }))}
                            placeholder="Select Examination"
                            styles={dashboardcustomStyles}

                        />

                        {/* Year Dropdown */}
                        <Select
                            value={selectedYear ? { label: selectedYear, value: selectedYear } : null}
                            onChange={opt => setSelectedYear(opt.value)}
                            options={yearOptions.map(year => ({ label: year, value: year }))}
                            styles={dashboardsmallcustomStyles}
                            placeholder="Select Year"
                        />


                        {/* Class Dropdown */}
                        <Select
                            value={selectedClass ? { label: selectedClass, value: selectedClass } : null}
                            onChange={opt => setSelectedClass(opt?.value || '')}
                            options={classOptions.map(c => ({ label: c, value: c }))}
                            styles={dashboardsmallcustomStyles}
                            placeholder="Select Class"
                        />

                        {/* Division Dropdown */}
                        <Select
                            value={selectedDivision ? { label: selectedDivision, value: selectedDivision } : null}
                            onChange={opt => setSelectedDivision(opt?.value || '')}
                            options={divisionOptions.map(d => ({ label: d, value: d }))}
                            styles={dashboardsmallcustomStyles}
                            placeholder="Select Division"
                        />
                        <button
                            className="btn-primary btn-sm search_button"
                            onClick={handleSearch}
                            disabled={loading || initialLoading || !selectedExam || !selectedYear || !selectedClass || !selectedDivision}
                        >
                            {loading ? 'Searching...' : initialLoading ? 'Loading...' : 'Search'}
                        </button>
                    </div>
                </div>
            </div>
            {initialLoading ? (
                <div style={{
                    padding: '40px',
                    textAlign: 'center',
                    color: '#666',
                    fontSize: '16px'
                }}>
                    Loading initial data...
                </div>
            ) : students.length > 0 ? (
                <>

                    <div className="class-result-container">
                        {filteredData && (
                            <span>
                                {filteredData.class} - {filteredData.exam} {filteredData.year}
                            </span>
                        )}
                    </div>
                    {/* Wrapper for both the header table and body table */}
                    <div className="result_classes_table" style={{ border: "1px solid #CECECE" }} >

                        <div className="result_table_wrapper">
                            {/* Header Table: only thead */}
                            <div
                                className="result-table-header-container"
                                ref={headerRef}
                                onScroll={handleHeaderScroll}
                            >
                                <table className="result-table">
                                    <thead>
                                        <tr>
                                            <th className="result-th sticky-left" rowSpan="2">Roll No</th>
                                            <th className="result-th sticky-left-2" rowSpan="2">
                                                <div className="name-scroll-container">Name</div>
                                            </th>
                                            <th className="result-th-subjectlist_subjectheading" colSpan={subjects.length}>Subjects</th>
                                            <th className="result-th-marks sticky-right-1" rowSpan="2">Obtained Marks</th>
                                            <th className="result-th-percentage sticky-right-2" rowSpan="2">Percentage</th>
                                        </tr>
                                        <tr>
                                            {subjects.map((subject) => (
                                                <th className="result-th-subjectlist_heading" key={subject.key}>
                                                    <div className="subject-container">
                                                        <div className="subject-name">{subject.name}</div>
                                                        <div className="subject-total">
                                                            <span className="total-label">Total: </span>
                                                            <span className="total-value">{subject.total}</span>
                                                        </div>
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            {/* Body Table: only tbody with vertical scrolling */}
                            <div
                                className="result-table-body-container"
                                ref={bodyRef}
                                onScroll={handleBodyScroll}
                            >
                                <table className="result-table">
                                    <tbody>
                                        {students.map((student, index) => (
                                            <tr className="result-tr" key={index}>
                                                <td className="result-td sticky-left">{student.roll_no}</td>
                                                <td className="result-td sticky-left-2">
                                                    <div className="name-scroll-container">{student.name}</div>
                                                </td>
                                                {subjects.map((subject) => {
                                                    const subjectMarks = student.subjects[subject.name];
                                                    return (
                                                        <td className="result-th-subjectlist" key={subject.key}>
                                                            {subjectMarks ? subjectMarks.obtained : '-'}
                                                        </td>
                                                    );
                                                })}
                                                <td className="result-td-marks sticky-right-1">{student.obtained_marks}</td>
                                                <td className="result-td-percentage sticky-right-2">{student.percentage}%</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </>
            ) : (
                <div style={{
                    padding: '40px',
                    textAlign: 'center',
                    color: '#666',
                    fontSize: '16px'
                }}>
                    {loading ? 'Searching...' : 'No results found. Please select criteria and click Search.'}
                </div>
            )}
            <div
                className="result-table-scrollbar-container"
                ref={scrollbarRef}
                onScroll={handleScrollbarScroll}
            >
                <div style={{ width: headerRef.current ? headerRef.current.firstChild.scrollWidth : 0, height: 1 }} />
            </div>
        </div>
    );
};

export default NewResultFilter;
