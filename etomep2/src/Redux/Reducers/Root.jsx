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


}); 

export default rootReducer;
