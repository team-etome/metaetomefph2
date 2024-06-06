import { combineReducers } from 'redux';
import ApiUrlReducer from './ApiUrlReducers'; 
import AdminInfoReducer from './AdminInfoReducer';



const rootReducer = combineReducers({
  APIURL          : ApiUrlReducer,
  admininfo       : AdminInfoReducer,


});

export default rootReducer;
