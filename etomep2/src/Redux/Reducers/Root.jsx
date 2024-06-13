import { combineReducers } from 'redux';
import ApiUrlReducer from './ApiUrlReducers'; 
import AdminInfoReducer from './AdminInfoReducer';
import AdminTeacherInfoReducer from './AdminTeacherInfoReduce';
import AdminclassInfoReducer from './AdminClassAddingReducer';
import TeacherInfoReducer from './TeacherInfoReducer';




const rootReducer = combineReducers({


  APIURL           : ApiUrlReducer,
  admininfo        : AdminInfoReducer,
  adminteacherinfo : AdminTeacherInfoReducer,
  adminclassinfo   : AdminclassInfoReducer,
  teacherinfo      : TeacherInfoReducer,
  


}); 

export default rootReducer;
