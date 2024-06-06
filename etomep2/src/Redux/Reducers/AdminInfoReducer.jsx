import {ADMIN_INFO} from '../Actions/Type'


const initialstate  = {
    admininfo  : null ,
}


const AdminInfoReducer = (state = initialstate , action)=>{
    switch(action.type){
        case ADMIN_INFO:
            console.log(action.payload,"payload")
            return {
                ...state,
                admininfo  : action.payload
            }

            default:
                return state;
    }
}

export default AdminInfoReducer