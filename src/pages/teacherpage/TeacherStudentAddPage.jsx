import React from 'react'
import AddStudent from '../../components/teacher/addstudent/AddStudent'
import MainHeader from '../../components/menus/common/MainHeader/';
import TeacherHeader from '../../components/menus/common/TeacherHeader';

function TeacherStudentAddPage() {
  return (
    <div>
        <TeacherHeader/>
      <AddStudent/>
    </div>
  )
}

export default TeacherStudentAddPage