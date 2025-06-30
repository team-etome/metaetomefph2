import { TEACHER_SUBJECT_INFO } from "../Actions/Type";




const initialstate  = {
    teachersubjectinfo  : null ,
}


const TeacherSubjectInfoReducer = (state = initialstate , action)=>{
    switch(action.type){
        case TEACHER_SUBJECT_INFO:
            return {
                ...state,
                teachersubjectinfo  : action.payload
            }

            default:
                return state;
    }
}

export default TeacherSubjectInfoReducer