import React from 'react'
import TeacherSubject from '../../components/teacher/teachersubject/TeacherSubject'
import MainHeader from '../../components/menus/common/MainHeader/';
import TeacherHeader from '../../components/menus/common/TeacherHeader';
import NewTeacherSubject from '../../components/teacher/teachersubject/NewTeacherSubject';

function TeacherSubjectPage() {
  return (
    <div style={{backgroundColor:"#f9f9f9"}}>
        <TeacherHeader/>
        {/* <TeacherSubject/> */}
        <NewTeacherSubject/>
    </div>
  )
}

export default TeacherSubjectPage