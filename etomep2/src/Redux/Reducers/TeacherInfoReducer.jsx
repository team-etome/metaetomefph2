import {TEACHER_INFO} from '../Actions/Type'


const initialstate  = {
    teacherinfo  : null ,
}


const TeacherInfoReducer = (state = initialstate , action)=>{
    switch(action.type){
        case TEACHER_INFO:
            return {
                ...state,
                teacherinfo  : action.payload
            }

            default:
                return state;
    }
}

export default TeacherInfoReducer