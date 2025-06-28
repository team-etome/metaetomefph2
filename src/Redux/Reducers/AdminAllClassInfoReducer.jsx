import { ADMIN_ALL_CLASS_INFO } from "../Actions/Type";


const initialstate = {

    adminallclassinfo : null

}


const AdminallclassInfoReducer = (state = initialstate , action)=>{

    switch(action.type){

        case ADMIN_ALL_CLASS_INFO:
            return {

                ...state,
                adminallclassinfo : action.payload
            }

            default:
                return state;




    }

}

export default AdminallclassInfoReducer