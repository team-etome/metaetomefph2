import React from 'react';
import './newteacherranklist.css';
import medal1 from "../../../assets/Award1.png";
import medal2 from "../../../assets/Award2.png";
import medal3 from "../../../assets/Award3.png";

export default function NewTeacherRankList({ onClose, rankList = [] }) {
    return (
        <div className="teacherranklist-popup-overlay">
            <div className="teacherranklist-popup">
                <div className="teacherranklist-header-row">
                    <span className="teacherranklist-title">Class Performance</span>
                    <span className="teacherranklist-close-btn" onClick={onClose}>&times;</span>
                </div>
                <div className="teacherranklist-table-container">
                    <table className="teacherranklist-table">
                        <tbody>
                            {rankList.length > 0 ? (
                                rankList.map((student, idx) => (
                                    <tr key={idx}>
                                        <td>
                                            <div className="teacherranklist-student">
                                                <span className="teacherranklist-avatar" />
                                                <span className="teacherranklist-name">
                                                    {student.student_name || student.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="teacherranklist-rank-container">
                                                {idx < 3 ? (
                                                    <>
                                                        <span className="teacherranklist-arrow" >&gt;</span>
                                                        <img
                                                            src={idx === 0 ? medal1 : idx === 1 ? medal2 : medal3}
                                                            alt={`Rank ${idx + 1}`}
                                                            className={`teacherranklist-medal rank${idx + 1}`}
                                                        />
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="teacherranklist-arrow">&gt;</span>
                                                        <span className="teacherranklist-text-rank">
                                                            {student.rank || `${idx + 1}th Rank in class ${student.class || '10'}`}
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2" style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
                                        No rank list data available
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
