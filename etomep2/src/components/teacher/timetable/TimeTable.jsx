import React, { useState } from "react";
import "../timetable/timetable.css";
import TimePicker from "rc-time-picker";
// import TimerangePicker from "@wojtekmaj/react-datetimerange-picker";
// import TimePicker from "react-time-picker";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import moment from "moment";

function TimeTable() {
  const [numPeriods, setNumPeriods] = useState(0);
  const [timeData, setTimeData] = useState({});
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalTime, setModalTime] = useState("");

  const [modalStartTime, setModalStartTime] = useState(moment("09:00", "HH:mm"));
  const [modalEndTime, setModalEndTime] = useState(moment("10:00", "HH:mm"));

  const handlePeriodChange = (e) => {
    setNumPeriods(parseInt(e.target.value, 10) || 0);
  };
  const handleTimeChange = (period, day, value) => {
    setTimeData((prev) => ({
      ...prev,
      [period]: {
        ...(prev[period] || {}),
        [day]: value,
      },
    }));
  };
  const handleModalTimeChange = (value) => {
    setModalTime(value);
  };

  // Save the selected time range from the modal into state
  const saveTimeRange = () => {
    const startStr = modalStartTime.format("HH:mm");
    const endStr = modalEndTime.format("HH:mm");
    setTimeData((prev) => ({
      ...prev,
      [selectedPeriod]: {
        ...(prev[selectedPeriod] || {}),
        [selectedDay]: { start: startStr, end: endStr },
      },
    }));
    setShowTimeModal(false);
  };

  // Open modal and prefill with existing time range if available
  const openTimeModal = (period, day) => {
    setSelectedPeriod(period);
    setSelectedDay(day);
    const existing = timeData[period] && timeData[period][day];
    if (existing) {
      setModalStartTime(moment(existing.start, "HH:mm"));
      setModalEndTime(moment(existing.end, "HH:mm"));
    } else {
      setModalStartTime(moment("09:00", "HH:mm"));
      setModalEndTime(moment("10:00", "HH:mm"));
    }
    setShowTimeModal(true);
  };


  // const renderRows = () => {
  //   let rows = [];
  //   for (let i = 1; i <= numPeriods; i++) {
  //     rows.push(
  //       <tr key={i}>
  //         <td>{`${i} Period`}</td>
  //         <td>
  //           <input type="text" placeholder="Time-Time" />
  //           <div className="separator"></div>
  //           <input type="text" placeholder="Subject" maxLength={50} />
  //         </td>
  //         <td>
  //           <input type="text" placeholder="Time-Time" />
  //           <div className="separator"></div>
  //           <input type="text" placeholder="Subject" maxLength={50} />
  //         </td>
  //         <td>
  //           <input type="text" placeholder="Time-Time" />
  //           <div className="separator"></div>
  //           <input type="text" placeholder="Subject" maxLength={50} />
  //         </td>
  //         <td>
  //           <input type="text" placeholder="Time-Time" />
  //           <div className="separator"></div>
  //           <input type="text" placeholder="Subject" maxLength={50} />
  //         </td>
  //         <td>
  //           <input type="text" placeholder="Time-Time" />
  //           <div className="separator"></div>
  //           <input type="text" placeholder="Subject" maxLength={50} />
  //         </td>
  //         <td>
  //           <input type="text" placeholder="Time-Time" />
  //           <div className="separator"></div>
  //           <input type="text" placeholder="Subject" maxLength={50} />
  //         </td>
  //       </tr>
  //     );
  //   }
  //   return rows;
  // };
  // Render table rows with clickable cells for setting the time range
  const renderRows = () => {
    let rows = [];
    for (let i = 1; i <= numPeriods; i++) {
      rows.push(
        <tr key={i}>
          <td>{`${i} Period`}</td>
          {days.map((day) => (
            <td key={day}>
              <div
                onClick={() => openTimeModal(i, day)}
                style={{
                  cursor: "pointer",
                  backgroundColor: "#fff",
                  padding: "5px",
                  borderRadius: "4px",
                  border: "1px solid #526D82",
                }}
              >
                {timeData[i] && timeData[i][day]
                  ? `${timeData[i][day].start} - ${timeData[i][day].end}`
                  : "Set time"}
              </div>
              <div className="separator"></div>
              <input type="text" placeholder="Subject" maxLength={50} />
            </td>
          ))}
        </tr>
      );
    }
    return rows;
  };

  return (
    <div className="timetable_page">
      <Container className="timetable_container">
        <h5> Time Table</h5>
        <Row style={{ width: '110%' }}>
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
                  {days.map((day) => (
                    <th key={day}>{day}</th>
                  ))}
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
      {/* Modal for setting time range */}
      <Modal show={showTimeModal} onHide={() => setShowTimeModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Set Time for Period {selectedPeriod} - {selectedDay}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ marginBottom: "1rem" }}>
            <label>Start Time:</label>
            <TimePicker
              showSecond={false}
              value={modalStartTime}
              onChange={setModalStartTime}
              format="HH:mm"
              use12Hours={false}
              inputReadOnly
            />
          </div>
          <div>
            <label>End Time:</label>
            <TimePicker
              showSecond={false}
              value={modalStartTime}
              onChange={setModalStartTime}
              format="HH:mm"
              use12Hours={false}
              inputReadOnly
              className="custom-timepicker"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTimeModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={saveTimeRange}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TimeTable;
