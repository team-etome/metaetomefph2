import React from 'react'
import StudentView from '../../components/admin/adminstudentview/StudentView'
import MainHeader from '../../components/menus/common/MainHeader/';


function AdminStudentViewPage() {
  return (
    <div>
        <MainHeader/>
        <StudentView/>
    </div>
  )
}

export default AdminStudentViewPage