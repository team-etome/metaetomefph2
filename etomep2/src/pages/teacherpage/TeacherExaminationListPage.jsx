import React from 'react'
import ExaminationDashboard from '../../components/teacher/teacherexamination/ExaminationDashboard'
import MainHeader from '../../components/menus/common/MainHeader/';
import TeacherH from '../../components/menus/header/TeacherH';
import TeacherHeader from '../../components/menus/common/TeacherHeader';

function TeacherExaminationListPage() {
  return (
    <div>
        <TeacherHeader/>
        <ExaminationDashboard/>
    </div>
  )
}

export default TeacherExaminationListPage