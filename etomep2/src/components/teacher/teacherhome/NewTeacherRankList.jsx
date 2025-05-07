import React from 'react';
import './newteacherranklist.css';
import medal1 from "../../../assets/Award1.png";
import medal2 from "../../../assets/Award2.png";
import medal3 from "../../../assets/Award3.png";


const dummyRankList = [
    { name: 'Liam', avatar: '', rank: '1st Rank in class 10' },
    { name: 'Liam', avatar: '', rank: '2nd Rank in class 10' },
    { name: 'Liam', avatar: '', rank: '3rd Rank in class 10' },
    { name: 'Liam', avatar: '', rank: '5th Rank in class 10' },
    { name: 'Liam', avatar: '', rank: '5th Rank in class 10' },
    { name: 'Liam', avatar: '', rank: '5th Rank in class 10' },
    { name: 'Liam', avatar: '', rank: '5th Rank in class 10' },
    { name: 'Liam', avatar: '', rank: '5th Rank in class 10' },
    { name: 'Liam', avatar: '', rank: '5th Rank in class 10' },
    { name: 'Liam', avatar: '', rank: '5th Rank in class 10' },
];

export default function NewTeacherRankList({ onClose }) {
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
                            {dummyRankList.map((student, idx) => (
                                <tr key={idx}>
                                    <td>
                                        <div className="teacherranklist-student">
                                            <span className="teacherranklist-avatar" />
                                            <span className="teacherranklist-name">{student.name}</span>
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
                                                    <span className="teacherranklist-text-rank">{student.rank}</span>

                                                </>

                                            )}
                                        </div>
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
