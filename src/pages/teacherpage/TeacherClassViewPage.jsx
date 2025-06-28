import React from 'react'
import MainHeader from '../../components/menus/common/MainHeader/';
import TeacherClassView from '../../components/teacher/teacherclassview/TeacherClassView';
import TeacherHeader from '../../components/menus/common/TeacherHeader';


function TeacherClassViewPage() {
  return (
    <div>
        <TeacherHeader/>
        <TeacherClassView/>
    </div>
  )
}

export default TeacherClassViewPage