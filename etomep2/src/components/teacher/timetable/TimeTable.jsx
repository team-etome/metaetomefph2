import React, { useState } from "react";
import "../timetable/timetable.css";
import { Container, Row, Col } from "react-bootstrap";

function TimeTable() {
  const [numPeriods, setNumPeriods] = useState(0);

  const handlePeriodChange = (e) => {
    setNumPeriods(parseInt(e.target.value, 10) || 0);
  };

  const renderRows = () => {
    let rows = [];
    for (let i = 1; i <= numPeriods; i++) {
      rows.push(
        <tr key={i}>
          <td>{`${i} Period`}</td>
          <td>
            <input type="text" placeholder="Time-Time" />
            <div className="separator"></div>
            <input type="text" placeholder="Subject" maxLength={50} />
          </td>
          <td>
            <input type="text" placeholder="Time-Time" />
            <div className="separator"></div>
            <input type="text" placeholder="Subject" maxLength={50} />
          </td>
          <td>
            <input type="text" placeholder="Time-Time" />
            <div className="separator"></div>
            <input type="text" placeholder="Subject" maxLength={50} />
          </td>
          <td>
            <input type="text" placeholder="Time-Time" />
            <div className="separator"></div>
            <input type="text" placeholder="Subject" maxLength={50} />
          </td>
          <td>
            <input type="text" placeholder="Time-Time" />
            <div className="separator"></div>
            <input type="text" placeholder="Subject" maxLength={50} />
          </td>
          <td>
            <input type="text" placeholder="Time-Time" />
            <div className="separator"></div>
            <input type="text" placeholder="Subject" maxLength={50} />
          </td>
        </tr>
      );
    }
    return rows;
  };
  return (
    <div className="timetable_page">
      <Container className="timetable_container">
        <h5> Time Table</h5>
        <Row style={{ width:'110%'}}>
          <div
            className="timetable_header"
            // style={{ border: "1px solid green" }}
          >
            <div
              className="teacher_timetable_group"
              // style={{ border: "1px solid blue" }}
            >
              <label htmlFor="student_name" style={{}}>
                No. of Periods
              </label>
              <input
                type="text"
                id="num_periods"
                name="num_periods"
                style={{
                  textTransform: "capitalize",
                  // border: "1px solid purple",
                }}
                maxLength="50"
                value={numPeriods}
                onChange={handlePeriodChange}
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
              <tbody>
                {/* <tr>
                  <td>1st Period</td>
                  <td><input type="text" placeholder="Time-Time" /><input type="text" placeholder="Subject" maxLength={50}/></td>
                  <td><input type="text" placeholder="Time-Time" /><input type="text" placeholder="Subject" maxLength={50}/></td>
                  <td><input type="text" placeholder="Time-Time" /><input type="text" placeholder="Subject" maxLength={50}/></td>
                  <td><input type="text" placeholder="Time-Time" /><input type="text" placeholder="Subject" maxLength={50}/></td>
                  <td><input type="text" placeholder="Time-Time" /><input type="text" placeholder="Subject" maxLength={50}/></td>
                  <td><input type="text" placeholder="Time-Time" /><input type="text" placeholder="Subject" maxLength={50}/></td>
                </tr> */}
                <tbody>{renderRows()}</tbody>
              </tbody>
            </table>
          </Col>
        </Row>
        <Row>
          <Col md={6}></Col>
          <Col md={6} className="timetable_submit">
            <button>Submit</button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TimeTable;
