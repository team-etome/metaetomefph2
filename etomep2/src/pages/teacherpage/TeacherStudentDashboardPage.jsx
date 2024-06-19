import React from 'react'
import MainHeader from '../../components/menus/common/MainHeader/';
import StudentDashboard from '../../components/teacher/studentdashboard/StudentDashboard'
import TeacherNavbar from '../../components/teacher/teachernavbar/TeacherNavbar';

function TeacherStudentDashboardPage() {
  return (
    <div>
        <MainHeader/>
        {/* <TeacherNavbar/> */}
        <StudentDashboard/>
    </div>
  )
}

export default TeacherStudentDashboardPage