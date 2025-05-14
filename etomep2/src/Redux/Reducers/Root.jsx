import { combineReducers } from 'redux';
import ApiUrlReducer from './ApiUrlReducers'; 
import AdminInfoReducer from './AdminInfoReducer';
import AdminTeacherInfoReducer from './AdminTeacherInfoReduce';
import AdminclassInfoReducer from './AdminClassAddingReducer';
import TeacherInfoReducer from './TeacherInfoReducer';
import ExamPaperInfoReducer from './ExamPaperInfoReducer';
import TeacherSubjectInfoReducer from './TeacherSubjectInfoReducer';
import AdminallclassInfoReducer from './AdminAllClassInfoReducer';
import SelectedTextbookReducer from './SelectedTextbookReducer';
import SelectedLibraryReducer from './SelectedLibraryReducer'
import AdminLibraryCategoryReducer    from './AdminLibraryCategoryReducer';
import ExamClassesReducer from './AdminClassListReducer';
import TimetableDataQuestionPaperReducer from './AdminTimetableDataQuestionPaperReducer';





const rootReducer = combineReducers({


  APIURL              : ApiUrlReducer,
  admininfo           : AdminInfoReducer,
  adminteacherinfo    : AdminTeacherInfoReducer,
  adminclassinfo      : AdminclassInfoReducer,
  teacherinfo         : TeacherInfoReducer,
  exampaperinfo       : ExamPaperInfoReducer,
  teachersubjectinfo  : TeacherSubjectInfoReducer,
  adminallclassinfo   : AdminallclassInfoReducer,
  selectedTextbook    : SelectedTextbookReducer,
  SelectedLibrary     : SelectedLibraryReducer,
  AdminLibraryCategories   : AdminLibraryCategoryReducer,
  examClasses          : ExamClassesReducer,
  timetabledataquestionpaper: TimetableDataQuestionPaperReducer,
}); 

export default rootReducer;
