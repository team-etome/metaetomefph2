import { ADMIN_CLASS_INFO } from "../Actions/Type";


const initialstate = {

    adminclassinfo : null

}


const AdminclassInfoReducer = (state = initialstate , action)=>{

    switch(action.type){

        case ADMIN_CLASS_INFO:
            return {

                ...state,
                adminclassinfo : action.payload
            }

            default:
                return state;




    }

}

export default AdminclassInfoReducer