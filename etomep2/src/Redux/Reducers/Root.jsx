import { combineReducers } from 'redux';
import ApiUrlReducer from './ApiUrlReducers'; 
import AdminInfoReducer from './AdminInfoReducer';
import AdminTeacherInfoReducer from './AdminTeacherInfoReduce';
import AdminclassInfoReducer from './AdminClassAddingReducer';
import TeacherInfoReducer from './TeacherInfoReducer';
import ExamPaperInfoReducer from './ExamPaperInfoReducer';




const rootReducer = combineReducers({


  APIURL           : ApiUrlReducer,
  admininfo        : AdminInfoReducer,
  adminteacherinfo : AdminTeacherInfoReducer,
  adminclassinfo   : AdminclassInfoReducer,
  teacherinfo      : TeacherInfoReducer,
  exampaperinfo    : ExamPaperInfoReducer,
  


}); 

export default rootReducer;
