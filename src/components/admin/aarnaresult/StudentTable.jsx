import React from "react";
import "./StudentTable.css";

const students = [
        {
            rollNo: '1',
            name: 'Siddharth jdghfldfighvejfhulfdhuih',
            marks: {
                english: 78,
                malayalam: 63,
                socialScience: 70,
                physics: 30,
                chemistry: 79,
                mathematics: 26,
                biology: 82,
                art: 33,
                math: 33,
                bio: 33,
            },
            obtainedMarks: 650,
            percentage: '92%',
        },
        {
            rollNo: '2',
            name: 'Vihaan',
            marks: {
                english: 85,
                malayalam: 70,
                socialScience: 65,
                physics: 79,
                chemistry: 28,
                mathematics: 63,
                biology: 180,
                art: 33,
                math: 33,
                bio: 33,
            },
            obtainedMarks: 620,
            percentage: '87%',
        },
        {
            rollNo: '3',
            name: 'Aarav',
            marks: {
                english: 73,
                malayalam: 67,
                socialScience: 72,
                physics: 81,
                chemistry: 65,
                mathematics: 90,
                biology: 88,
                art: 33,
                math: 33,
                bio: 33,
            },
            obtainedMarks: 650,
            percentage: '90%',
        },
        {
            rollNo: '1',
            name: 'Siddharth jdghfldfighvejfhulfdhuih',
            marks: {
                english: 78,
                malayalam: 63,
                socialScience: 70,
                physics: 30,
                chemistry: 79,
                mathematics: 26,
                biology: 82,
                art: 33,
                math: 33,
                bio: 33,
            },
            obtainedMarks: 650,
            percentage: '92%',
        },
        {
            rollNo: '2',
            name: 'Vihaan',
            marks: {
                english: 85,
                malayalam: 70,
                socialScience: 65,
                physics: 79,
                chemistry: 28,
                mathematics: 63,
                biology: 180,
                art: 33,
                math: 33,
                bio: 33,
            },
            obtainedMarks: 620,
            percentage: '87%',
        },
        {
            rollNo: '3',
            name: 'Aarav',
            marks: {
                english: 73,
                malayalam: 67,
                socialScience: 72,
                physics: 81,
                chemistry: 65,
                mathematics: 90,
                biology: 88,
                art: 33,
                math: 33,
                bio: 33,
            },
            obtainedMarks: 650,
            percentage: '90%',
        },
        {
            rollNo: '1',
            name: 'Siddharth',
            marks: {
                english: 78,
                malayalam: 63,
                socialScience: 70,
                physics: 30,
                chemistry: 79,
                mathematics: 26,
                biology: 82,
                art: 33,
                math: 33,
                bio: 33,
            },
            obtainedMarks: 650,
            percentage: '92%',
        },
        {
            rollNo: '2',
            name: 'Vihaan',
            marks: {
                english: 85,
                malayalam: 70,
                socialScience: 65,
                physics: 79,
                chemistry: 28,
                mathematics: 63,
                biology: 180,
                art: 33,
                math: 33,
                bio: 33,
            },
            obtainedMarks: 620,
            percentage: '87%',
        },
        {
            rollNo: '3',
            name: 'Aarav',
            marks: {
                english: 73,
                malayalam: 67,
                socialScience: 72,
                physics: 81,
                chemistry: 65,
                mathematics: 90,
                biology: 88,
                art: 33,
                math: 33,
                bio: 33,
            },
            obtainedMarks: 650,
            percentage: '90%',
        },
        {
            rollNo: '1',
            name: 'Siddharth jdghfldfighvejfhulfdhuih',
            marks: {
                english: 78,
                malayalam: 63,
                socialScience: 70,
                physics: 30,
                chemistry: 79,
                mathematics: 26,
                biology: 82,
                art: 33,
                math: 33,
                bio: 33,
            },
            obtainedMarks: 650,
            percentage: '92%',
        },
        {
            rollNo: '2',
            name: 'Vihaan',
            marks: {
                english: 85,
                malayalam: 70,
                socialScience: 65,
                physics: 79,
                chemistry: 28,
                mathematics: 63,
                biology: 180,
                art: 33,
                math: 33,
                bio: 33,
            },
            obtainedMarks: 620,
            percentage: '87%',
        },
        {
            rollNo: '3',
            name: 'Aarav',
            marks: {
                english: 73,
                malayalam: 67,
                socialScience: 72,
                physics: 81,
                chemistry: 65,
                mathematics: 90,
                biology: 88,
                art: 33,
                math: 33,
                bio: 33,
            },
            obtainedMarks: 650,
            percentage: '90%',
        },
    ];

const subjectList = [
  { key: "english", name: "English", total: 100 },
  { key: "malayalam", name: "Malayalam", total: 100 },
  { key: "socialScience", name: "Social Science", total: 100 },
  { key: "physics", name: "Physics", total: 100 },
  { key: "chemistry", name: "Chemistry", total: 100 },
  { key: "mathematics", name: "Mathematics", total: 100 },
  { key: "biology", name: "Biology", total: 100 },
  { key: "art", name: "Art", total: 100 },
  { key: "math", name: "Math", total: 100 },
  { key: "bio", name: "Bio", total: 100 },
];

export default function StudentTable() {
  return (
    <div className="student-table-flex-wrapper">
      {/* Fixed columns */}
      <table className="student-table fixed-table">
        <thead>
          <tr>
            <th className="col-roll">Roll No</th>
            <th className="col-name">Name</th>
            <th className="col-obtained">Obtained Marks<br /><span className="subject-total">Total: 1000</span></th>
            <th className="col-percentage">Percentage</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, idx) => (
            <tr key={s.rollNo + s.name} className={idx % 2 === 0 ? "even-row" : ""}>
              <td className="col-roll">{s.rollNo}</td>
              <td className="col-name">{s.name}</td>
              <td className="col-obtained">{s.obtainedMarks}</td>
              <td className="col-percentage">{s.percentage}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Scrollable subject columns */}
      <div className="subject-scroll-wrapper">
        <table className="student-table subject-table">
          <thead>
            <tr>
              {subjectList.map((sub) => (
                <th key={sub.key} className="subject-header">
                  <div>
                    {sub.name}
                    <div className="subject-total">Total: {sub.total}</div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((s, idx) => (
              <tr key={s.rollNo + s.name} className={idx % 2 === 0 ? "even-row" : ""}>
                {subjectList.map((sub) => (
                  <td
                    key={sub.key}
                    className={`subject-col${s.marks[sub.key] < 35 ? " low-mark" : ""}`}
                  >
                    {s.marks[sub.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 