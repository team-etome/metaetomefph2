import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, } from 'react-router-dom';
import { IoChevronBackSharp } from 'react-icons/io5';
import '../teacherresultview/teacherresultview.css'

function TeacherResultView() {
    const students = [
        { rollNo: 1, name: "aaaaaaaaa", scores: { English: 60, Malayalam: 60, SocialScience: 60, Physics: 60, Chemistry: 60, Biology: 60, IT: 60, Maths: 60 }, totalMark: 260, obtainedMark: 18, progress: "Failed" },
        { rollNo: 2, name: "vvvvvvvvvvvv", scores: { English: 50, Malayalam: 50, SocialScience: 50, Physics: 50, Chemistry: 60, Biology: 60, IT: 60, Maths: 60 }, totalMark: 260, obtainedMark: 60, progress: "Pass" },
        { rollNo: 2, name: "vvvvvvvvvvvv", scores: { English: 50, Malayalam: 50, SocialScience: 50, Physics: 50, Chemistry: 60, Biology: 60, IT: 60, Maths: 60 }, totalMark: 260, obtainedMark: 60, progress: "Pass" },
        { rollNo: 2, name: "vvvvvvvvvvvv", scores: { English: 50, Malayalam: 50, SocialScience: 50, Physics: 50, Chemistry: 60, Biology: 60, IT: 60, Maths: 60 }, totalMark: 260, obtainedMark: 60, progress: "Pass" },
        { rollNo: 2, name: "vvvvvvvvvvvv", scores: { English: 50, Malayalam: 50, SocialScience: 50, Physics: 50, Chemistry: 60, Biology: 60, IT: 60, Maths: 60 }, totalMark: 260, obtainedMark: 60, progress: "Pass" },
        { rollNo: 2, name: "vvvvvvvvvvvv", scores: { English: 50, Malayalam: 50, SocialScience: 50, Physics: 50, Chemistry: 60, Biology: 60, IT: 60, Maths: 60 }, totalMark: 260, obtainedMark: 60, progress: "Pass" },
        { rollNo: 2, name: "vvvvvvvvvvvv", scores: { English: 50, Malayalam: 50, SocialScience: 50, Physics: 50, Chemistry: 60, Biology: 60, IT: 60, Maths: 60 }, totalMark: 260, obtainedMark: 60, progress: "Pass" },
        { rollNo: 2, name: "vvvvvvvvvvvv", scores: { English: 50, Malayalam: 50, SocialScience: 50, Physics: 50, Chemistry: 60, Biology: 60, IT: 60, Maths: 60 }, totalMark: 260, obtainedMark: 60, progress: "Pass" },
        { rollNo: 2, name: "vvvvvvvvvvvv", scores: { English: 50, Malayalam: 50, SocialScience: 50, Physics: 50, Chemistry: 60, Biology: 60, IT: 60, Maths: 60 }, totalMark: 260, obtainedMark: 60, progress: "Pass" },
        { rollNo: 2, name: "vvvvvvvvvvvv", scores: { English: 50, Malayalam: 50, SocialScience: 50, Physics: 50, Chemistry: 60, Biology: 60, IT: 60, Maths: 60 }, totalMark: 260, obtainedMark: 60, progress: "Pass" },
        { rollNo: 2, name: "vvvvvvvvvvvv", scores: { English: 50, Malayalam: 50, SocialScience: 50, Physics: 50, Chemistry: 60, Biology: 60, IT: 60, Maths: 60 }, totalMark: 260, obtainedMark: 60, progress: "Pass" },
        { rollNo: 2, name: "vvvvvvvvvvvv", scores: { English: 50, Malayalam: 50, SocialScience: 50, Physics: 50, Chemistry: 60, Biology: 60, IT: 60, Maths: 60 }, totalMark: 260, obtainedMark: 60, progress: "Pass" },
        { rollNo: 2, name: "vvvvvvvvvvvv", scores: { English: 50, Malayalam: 50, SocialScience: 50, Physics: 50, Chemistry: 60, Biology: 60, IT: 60, Maths: 60 }, totalMark: 260, obtainedMark: 60, progress: "Pass" },
        { rollNo: 2, name: "vvvvvvvvvvvv", scores: { English: 50, Malayalam: 50, SocialScience: 50, Physics: 50, Chemistry: 60, Biology: 60, IT: 60, Maths: 60 }, totalMark: 260, obtainedMark: 60, progress: "Pass" },
        { rollNo: 2, name: "vvvvvvvvvvvv", scores: { English: 50, Malayalam: 50, SocialScience: 50, Physics: 50, Chemistry: 60, Biology: 60, IT: 60, Maths: 60 }, totalMark: 260, obtainedMark: 60, progress: "Pass" },
        { rollNo: 2, name: "vvvvvvvvvvvv", scores: { English: 50, Malayalam: 50, SocialScience: 50, Physics: 50, Chemistry: 60, Biology: 60, IT: 60, Maths: 60 }, totalMark: 260, obtainedMark: 60, progress: "Pass" },
        { rollNo: 2, name: "vvvvvvvvvvvv", scores: { English: 50, Malayalam: 50, SocialScience: 50, Physics: 50, Chemistry: 60, Biology: 60, IT: 60, Maths: 60 }, totalMark: 260, obtainedMark: 60, progress: "Pass" },
        { rollNo: 2, name: "vvvvvvvvvvvv", scores: { English: 50, Malayalam: 50, SocialScience: 50, Physics: 50, Chemistry: 60, Biology: 60, IT: 60, Maths: 60 }, totalMark: 260, obtainedMark: 60, progress: "Pass" },
        { rollNo: 2, name: "vvvvvvvvvvvv", scores: { English: 50, Malayalam: 50, SocialScience: 50, Physics: 50, Chemistry: 60, Biology: 60, IT: 60, Maths: 60 }, totalMark: 260, obtainedMark: 60, progress: "Pass" },
        { rollNo: 2, name: "vvvvvvvvvvvv", scores: { English: 50, Malayalam: 50, SocialScience: 50, Physics: 50, Chemistry: 60, Biology: 60, IT: 60, Maths: 60 }, totalMark: 260, obtainedMark: 60, progress: "Pass" },
        { rollNo: 2, name: "vvvvvvvvvvvv", scores: { English: 50, Malayalam: 50, SocialScience: 50, Physics: 50, Chemistry: 60, Biology: 60, IT: 60, Maths: 60 }, totalMark: 260, obtainedMark: 60, progress: "Pass" },
        { rollNo: 2, name: "vvvvvvvvvvvv", scores: { English: 50, Malayalam: 50, SocialScience: 50, Physics: 50, Chemistry: 60, Biology: 60, IT: 60, Maths: 60 }, totalMark: 260, obtainedMark: 60, progress: "Pass" },
    
      ];

  return (
    <Container className='teacher_result_view_container'>
        <div style={{display: 'flex', alignItems: 'center', marginBottom:'10px'}}>
            <Link to='/teacheraarna'>
                <IoChevronBackSharp className='teacher_result_view_back' />
            </Link>
            <h1 className='teacher_result_view_title'>Class : 10 B</h1>
        </div>
        <div className='teacher_result_view_scrollable'>
            <table className="table">
                <thead>
                    <tr>
                        <th>Roll No</th>
                        <th>Name</th>
                        <th className="teacher_vertical_text">English</th>
                        <th className="teacher_vertical_text">Malayalam</th>
                        <th className="teacher_vertical_text">Social Science</th>
                        <th className="teacher_vertical_text">Physics</th>
                        <th className="teacher_vertical_text">Chemistry</th>
                        <th className="teacher_vertical_text">Biology</th>
                        <th className="teacher_vertical_text">IT</th>
                        <th className="teacher_vertical_text">Maths</th>
                        <th>Total Mark</th>
                        <th>Obtained Mark</th>
                        <th>Progress</th>
                    </tr>
                </thead>
                <tbody >
                    {students.map(student => (
                        <tr key={student.rollNo}>
                            <td >{student.rollNo}</td>
                            <td>{student.name}</td>
                            <td className="teacherno-border-right">{student.scores.English}</td>
                            <td className="teacherno-border-right">{student.scores.Malayalam}</td>
                            <td className="teacherno-border-right">{student.scores.SocialScience}</td>
                            <td className="teacherno-border-right">{student.scores.Physics}</td>
                            <td className="teacherno-border-right">{student.scores.Chemistry}</td>
                            <td className="teacherno-border-right">{student.scores.Biology}</td>
                            <td className="teacherno-border-right">{student.scores.IT}</td>
                            <td className="teacherno-border-right">{student.scores.Maths}</td>
                            <td>{student.totalMark}</td>
                            <td>{student.obtainedMark}</td>
                            <td>{student.progress}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </Container>
  )
}

export default TeacherResultView