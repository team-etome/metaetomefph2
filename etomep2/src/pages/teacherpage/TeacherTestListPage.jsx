import React from 'react'
import TestListing from '../../components/teacher/teachertestlist/TestListing'
import MainHeader from '../../components/menus/common/MainHeader/';
import TeacherHeader from '../../components/menus/common/TeacherHeader';

function TeacherTestListPage() {
  return (
    <div>
        <TeacherHeader/>
        <TestListing/>
    </div>
  )
}

export default TeacherTestListPage