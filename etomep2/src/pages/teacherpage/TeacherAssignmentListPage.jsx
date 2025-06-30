import React from 'react'
import AssignmentList from '../../components/teacher/teacherassignment/AssignmentList'
import MainHeader from '../../components/menus/common/MainHeader/';
import TeacherHeader from '../../components/menus/common/TeacherHeader';


function TeacherAssignmentListPage() {
  return (
    <div>
        <TeacherHeader/>
        <AssignmentList/>
    </div>
  )
}

export default TeacherAssignmentListPage