import { combineReducers } from 'redux';
import ApiUrlReducer from './ApiUrlReducers'; 
import AdminInfoReducer from './AdminInfoReducer';
import AdminTeacherInfoReducer from './AdminTeacherInfoReduce';




const rootReducer = combineReducers({
  APIURL           : ApiUrlReducer,
  admininfo        : AdminInfoReducer,
  adminteacherinfo : AdminTeacherInfoReducer


});

export default rootReducer;
