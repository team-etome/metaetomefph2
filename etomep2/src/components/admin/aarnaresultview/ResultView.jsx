import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import "../aarnaresultview/resultview.css";
import { useLocation } from "react-router-dom";

function ResultView() {
  const location = useLocation();
  const resultData = location.state?.resultData || [];

  console.log(resultData, "Received result data");

  const studentDataMap = {};

  resultData.student_marks.forEach((item) => {
    const key = `${item.roll_no}-${item.student_name}`;
    if (!studentDataMap[key]) {
      studentDataMap[key] = {
        roll_no: item.roll_no,
        name: item.student_name,
        scores: {},
        obtainedMark: 0,
        totalMark: 0,
      };
    }

    studentDataMap[key].scores[item.subject] =
      item.question_paper_total_marks || "Pending";

    if (!isNaN(parseFloat(item.question_paper_total_marks))) {
      studentDataMap[key].obtainedMark += parseFloat(
        item.question_paper_total_marks
      );
    }

    if (!isNaN(parseFloat(item.total_mark))) {
      studentDataMap[key].totalMark += parseFloat(item.total_mark);
    }

  });

  const students = Object.values(studentDataMap);

  console.log(students, "students");

  return (
    <Container className="result_view_container">
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <Link to="/aarnanavbar">
          <IoChevronBackSharp className="result_view_back" />
        </Link>
        <h1 className="result_view_title">Class : 9 A</h1>
      </div>
      <div className="result_view_scrollable">
        <table className="table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Name</th>
              {resultData.subjects.map((subject, index) => (
                <th key={index} className="vertical-text">
                  {subject}
                </th>
              ))}
              <th>Total Obtained Marks</th>
              <th>Maximum Total Marks</th>

              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{student.roll_no}</td>
                <td>{student.name}</td>
                {/* Display each subject mark dynamically */}
                {resultData.subjects.map((subject) => (
                  <td key={subject} className="no-border-right">
                    {student.scores[subject] || "Pending"}
                  </td>
                ))}
                {/* <td>{resultData.subjects.length * 100}</td>{" "} */}
                {/* Assuming each subject max score is 100 */}
                <td>{student.obtainedMark}</td>
                  <td>{student.totalMark}</td>

                <td>
                  {student.obtainedMark <= resultData.subjects.length * 30
                    ? "Pass"
                    : "Failed"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}

export default ResultView;
