import React from 'react'
import MainHeader from '../../components/menus/common/MainHeader/';
import StudentDashboard from '../../components/teacher/studentdashboard/StudentDashboard'
import TeacherNavbar from '../../components/teacher/teachernavbar/TeacherNavbar';
import TeacherHeader from '../../components/menus/common/TeacherHeader';

function TeacherStudentDashboardPage() {
  return (
    <div>
        <TeacherHeader/> 
        <StudentDashboard/>
    </div>
  )
}

export default TeacherStudentDashboardPage