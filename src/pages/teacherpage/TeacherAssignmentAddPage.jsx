import React from 'react'
import MainHeader from '../../components/menus/common/MainHeader/';
import AssignmentAdding from '../../components/teacher/teacherassignmentadd/AssignmentAdding'
import TeacherHeader from '../../components/menus/common/TeacherHeader';

function TeacherAssignmentAddPage() {
  return (
    <div>
        <TeacherHeader/>
        <AssignmentAdding/>
    </div>
  )
}

export default TeacherAssignmentAddPage