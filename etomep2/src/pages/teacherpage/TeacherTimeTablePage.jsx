import React from 'react'
import TimeTable from '../../components/teacher/timetable/TimeTable'
import MainHeader from '../../components/menus/common/MainHeader/';
import TeacherHeader from '../../components/menus/common/TeacherHeader';


function TeacherTimeTablePage() {
  return (
    <div>
        <TeacherHeader/>
        <TimeTable/>
    </div>
  )
}

export default TeacherTimeTablePage