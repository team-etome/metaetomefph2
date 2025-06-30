import React from 'react'
import StudentView from '../../components/teacher/studentview/StudentView'
import MainHeader from '../../components/menus/common/MainHeader/';
import TeacherHeader from '../../components/menus/common/TeacherHeader';


function TeacherStudentViewPage() {
  return (
    <div>
        <TeacherHeader/>
        <StudentView/>
    </div>
  )
}

export default TeacherStudentViewPage