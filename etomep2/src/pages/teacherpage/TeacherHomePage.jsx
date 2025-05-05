import React from 'react'
import TeacherHome from '../../components/teacher/teacherhome/TeacherHome'

import TeacherHeader from '../../components/menus/common/TeacherHeader';
import NewTeacherHome from '../../components/teacher/teacherhome/NewTeacherHome';

function TeacherHomePage() {
  return (
    <div>
        <TeacherHeader/>
        {/* <TeacherHome/> */}
        <NewTeacherHome/>
    </div>
  )
}

export default TeacherHomePage