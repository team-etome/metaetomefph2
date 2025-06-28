import React from 'react'
import QuestionCreationView from '../../components/teacher/teacherquestioncreation/QuestionCreationView'
import MainHeader from '../../components/menus/common/MainHeader/';
import TeacherHeader from '../../components/menus/common/TeacherHeader';

function TeacherQuestionCreationPage() {
  return (
    <div>
        <TeacherHeader/>
        <QuestionCreationView/>
    </div>
  )
}

export default TeacherQuestionCreationPage