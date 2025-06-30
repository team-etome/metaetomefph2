import React from 'react'
import TeacherRefrenceList from '../../components/teacher/teacherreference/TeacherRefrenceList'
import MainHeader from '../../components/menus/common/MainHeader/';
import TeacherHeader from '../../components/menus/common/TeacherHeader';

function TeacherRefrenceListPage() {
  return (
    <div>
        <TeacherHeader/>
        <TeacherRefrenceList/>
    </div>
  )
}

export default TeacherRefrenceListPage