import React from 'react'
import MainHeader from '../../components/menus/common/MainHeader/';
import StudentListing from '../../components/admin/adminstudentlist/StudentListing';


function AdminStudentListPage() {
  return (
    <div>
        <MainHeader/>
        <StudentListing/>
    </div>
  )
}

export default AdminStudentListPage