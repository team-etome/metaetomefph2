import React from 'react';
import './newteacherassigntask.css';

const dummyTasks = [
  { type: 'Question Paper', class: 'Class 10A', due: '21-01-2025', status: 'Pending' },
  { type: 'Evaluation', class: 'Class 10B', due: '30-09-2025', status: 'Pending' },
  { type: 'Question Paper', class: 'Class 10C', due: 'Text', status: 'Pending' },
  { type: 'Evaluation', class: 'Text', due: 'Text', status: 'Pending' },
  { type: 'Question Paper', class: 'Text', due: 'Text', status: 'Completed' },
  { type: 'Evaluation', class: 'Text', due: 'Text', status: 'Completed' },
  { type: 'Evaluation', class: 'Text', due: 'Text', status: 'Completed' },
  { type: 'Question Paper', class: 'Class 10A', due: '21-01-2025', status: 'Pending' },
  { type: 'Evaluation', class: 'Class 10B', due: '30-09-2025', status: 'Pending' },
  { type: 'Question Paper', class: 'Class 10C', due: 'Text', status: 'Pending' },
  { type: 'Evaluation', class: 'Text', due: 'Text', status: 'Pending' },
  { type: 'Question Paper', class: 'Text', due: 'Text', status: 'Completed' },
  { type: 'Evaluation', class: 'Text', due: 'Text', status: 'Completed' },
  { type: 'Evaluation', class: 'Text', due: 'Text', status: 'Completed' },
  { type: 'Question Paper', class: 'Class 10A', due: '21-01-2025', status: 'Pending' },
  { type: 'Evaluation', class: 'Class 10B', due: '30-09-2025', status: 'Pending' },
  { type: 'Question Paper', class: 'Class 10C', due: 'Text', status: 'Pending' },
  { type: 'Evaluation', class: 'Text', due: 'Text', status: 'Pending' },
  { type: 'Question Paper', class: 'Text', due: 'Text', status: 'Completed' },
  { type: 'Evaluation', class: 'Text', due: 'Text', status: 'Completed' },
  { type: 'Evaluation', class: 'Text', due: 'Text', status: 'Completed' },
];

export default function NewTeacherAssignTask({ onClose }) {
  return (
    <div className="newteacherassigntasks-popup-overlay">
      <div className="newteacherassigntasks-popup">
        <div className="newteacherassigntasks-header-row">
          <span className="newteacherassigntasks-title">Assigned Tasks</span>
          <span className="newteacherassigntasks-close-btn" onClick={onClose}>&times;</span>
        </div>
        <div className="newteacherassigntasks-table-container">
          <table className="newteacherassigntasks-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Class</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {dummyTasks.map((task, idx) => (
                <tr key={idx}>
                  <td>{task.type}</td>
                  <td>{task.class}</td>
                  <td>{task.due}</td>
                  <td>
                    <span className={`newteacherassigntasks-status ${task.status === 'Completed' ? 'completed' : 'pending'}`}>{task.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
