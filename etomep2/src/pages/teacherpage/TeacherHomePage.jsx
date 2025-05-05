import React from 'react'
import TeacherHome from '../../components/teacher/teacherhome/TeacherHome'

import TeacherHeader from '../../components/menus/common/TeacherHeader';
import NewTeacherHome from '../../components/teacher/teacherhome/NewTeacherHome';
import Practice from '../../components/teacher/teacherhome/Practice'

function TeacherHomePage() {
  return (
    <div>
        <TeacherHeader/>
        {/* <TeacherHome/> */}
        <NewTeacherHome/>
        {/* <Practice/> */}
    </div>
  )
}

export default TeacherHomePage