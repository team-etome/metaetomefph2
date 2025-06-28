import { ADMIN_TEACHER_INFO } from "../Actions/Type"


const initialstate  = {

    adminteacherinfo  : null ,

}


const AdminTeacherInfoReducer = (state = initialstate , action)=>{
    switch(action.type){
        case ADMIN_TEACHER_INFO:
            console.log(action.payload,"payload")
            return {
                ...state,
                adminteacherinfo  : action.payload
            }

            default:
                return state;
    }
}

export default AdminTeacherInfoReducer