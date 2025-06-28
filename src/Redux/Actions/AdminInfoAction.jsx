import { ADMIN_INFO } from "./Type";


export const admininfo = (formdata)=>{
    return{
        type     : ADMIN_INFO,
        payload  : formdata
    }
}