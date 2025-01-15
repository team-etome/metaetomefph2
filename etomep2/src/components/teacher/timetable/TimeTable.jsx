import React, { useState, useEffect } from "react";
import "../timetable/timetable.css";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";

function TimeTable() {
  const [numPeriods, setNumPeriods] = useState(0);
  const [timetableData, setTimetableData] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
  });
  const APIURL = useSelector((state) => state.APIURL.url);
  const teacher = useSelector((state) => state.teacherinfo);
  const teacher_id = teacher.teacherinfo?.teacher_id;

  console.log(timetableData, "sdasdasdasd");

  // Fetch the timetable data on component mount
  useEffect(() => {
    if (teacher_id) {
      fetchTimetableData();
    }
  }, [teacher_id]);

  const fetchTimetableData = async () => {
    try {
      const response = await axios.get(`${APIURL}/api/timetable`, {
        params: { teacher_id },
      });

      if (response.status === 200) {
        const fetchedTimetable = response.data;
        if (fetchedTimetable.timetable) {
          setTimetableData(fetchedTimetable.timetable);
          setNumPeriods(fetchedTimetable.timetable.Monday?.length || 0); // assuming all days have the same number of periods
        }
      }
    } catch (error) {
      console.error("Error fetching timetable data:", error);
    }
  };

  const handlePeriodChange = (e) => {
    setNumPeriods(parseInt(e.target.value, 10) || 0);
  };

  const handleInputChange = (e, periodIndex, dayIndex, type) => {
    const { value } = e.target;
    const updatedTimetable = { ...timetableData }; // Copy state to update

    if (!updatedTimetable[dayIndex]) {
      updatedTimetable[dayIndex] = [];
    }

    // Update either time or subject based on 'type' (time or subject)
    updatedTimetable[dayIndex][periodIndex] =
      updatedTimetable[dayIndex][periodIndex] || {};
    updatedTimetable[dayIndex][periodIndex][type] = value;

    setTimetableData(updatedTimetable);
  };

  const renderRows = () => {
    let rows = [];
    for (let i = 0; i < numPeriods; i++) {
      rows.push(
        <tr key={i}>
          <td>{`${i + 1} Period`}</td>
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ].map((day, dayIndex) => (
            <td key={dayIndex}>
              <input
                type="text"
                placeholder="Time-Time"
                value={timetableData[day][i]?.time || ""}
                onChange={(e) => handleInputChange(e, i, dayIndex, "time")}
              />
              <div className="separator"></div>
              <input
                type="text"
                placeholder="Subject"
                value={timetableData[day][i]?.subject || ""}
                onChange={(e) => handleInputChange(e, i, dayIndex, "subject")}
              />
            </td>
          ))}
        </tr>
      );
    }
    return rows;
  };

  const handleSubmit = async () => {
    try {
      // Transform timetableData into the desired format
      const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const timetable = days.reduce((acc, day) => {
        acc[day] = timetableData[day]
          .map((period, periodIndex) => {
            if (period) {
              return {
                time: period.time || "",
                subject: period.subject || "",
                period: periodIndex + 1,
              };
            }
            return null;
          })
          .filter(Boolean); // Remove any null values
        return acc;
      }, {});

      const data = {
        teacher_id: teacher_id,
        timetable,
      };

      const response = await axios.post(`${APIURL}/api/timetable`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response.data);
      if (response.status === 201) {
        alert("Timetable Created Successfully!");
      } else if (response.status === 200) {
        alert("Timetable Updated Successfully!");
      }
    } catch (error) {
      console.error("Error submitting timetable:", error);
      alert("Error submitting timetable. Please try again.");
    }
  };

  return (
    <div className="timetable_page">
      <Container className="timetable_container">
        <h5> Time Table</h5>
        <Row style={{ width: "110%" }}>
          <div className="timetable_header">
            <div className="teacher_timetable_group">
              <label htmlFor="student_name">No. of Periods</label>
              <input
                type="text"
                id="num_periods"
                name="num_periods"
                value={numPeriods}
                onChange={handlePeriodChange}
                disabled={Object.values(timetableData).every(
                  (day) => day.length > 0
                )} // Disable if timetableData has values
              />
            </div>
            <div className="timetable_delete">
              <button>Delete</button>
            </div>
          </div>
        </Row>
        <Row className="timetable_section">
          <Col xs={12}>
            <table className="timetable_table">
              <thead>
                <tr>
                  <th>Days/ Periods</th>
                  <th>Monday</th>
                  <th>Tuesday</th>
                  <th>Wednesday</th>
                  <th>Thursday</th>
                  <th>Friday</th>
                  <th>Saturday</th>
                </tr>
              </thead>
              <tbody>{renderRows()}</tbody>
            </table>
          </Col>
        </Row>
        <Row>
          <Col md={6}></Col>
          <Col md={6} className="timetable_submit">
            <button
              onClick={handleSubmit}
              disabled={Object.values(timetableData).every(
                (day) => day.length > 0
              )} // Disable if timetableData has values
            >
              Submit
            </button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TimeTable;
