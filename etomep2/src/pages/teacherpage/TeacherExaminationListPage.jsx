import React from 'react'
import ExaminationDashboard from '../../components/teacher/teacherexamination/ExaminationDashboard'
import MainHeader from '../../components/menus/common/MainHeader/';
import TeacherH from '../../components/menus/header/TeacherH';
import TeacherHeader from '../../components/menus/common/TeacherHeader';
import NewExaminationDashboard from '../../components/teacher/teacherexamination/NewExaminationDashboard';

function TeacherExaminationListPage() {
  return (
    <div style={{backgroundColor:"#f9f9f9"}}>
        <TeacherHeader/>
        {/* <ExaminationDashboard/> */}
        <NewExaminationDashboard/>
    </div>
  )
}

export default TeacherExaminationListPage