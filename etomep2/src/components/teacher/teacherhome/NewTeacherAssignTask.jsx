import React from 'react';
import './newteacherassigntask.css';

export default function NewTeacherAssignTask({ onClose, assignedTasks = [] }) {
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
                <th>Subject</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {assignedTasks.length > 0 ? (
                assignedTasks.map((task, idx) => (
                  <tr key={idx}>
                    <td>{task.task_type || task.type}</td>
                    <td>{task.class_name || task.class}</td>
                    <td>{task.subject_name || task.subject}</td>
                    <td>{task.due_date || task.due}</td>
                    <td>
                      <span className={`newteacherassigntasks-status ${(task.status || 'Pending').toLowerCase() === 'completed' ? 'completed' : 'pending'}`}>
                        {task.status || 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
                    No assigned tasks found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
