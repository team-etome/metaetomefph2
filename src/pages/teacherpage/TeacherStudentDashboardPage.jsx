import React from 'react'
import MainHeader from '../../components/menus/common/MainHeader/';
import StudentDashboard from '../../components/teacher/studentdashboard/StudentDashboard'
import TeacherNavbar from '../../components/teacher/teachernavbar/TeacherNavbar';
import TeacherHeader from '../../components/menus/common/TeacherHeader';
import NewStudentDashboard from '../../components/teacher/studentdashboard/NewStudentDashboard';

function TeacherStudentDashboardPage() {
  return (
    <div style={{backgroundColor:"#f9f9f9"}}>
        <TeacherHeader/> 
        {/* <StudentDashboard/> */}
        <NewStudentDashboard/>

    </div>
  )
}

export default TeacherStudentDashboardPage