import { ADMIN_TEACHER_INFO } from "./Type"


export const adminteacherinfo = (formdata)=>{
    return{
        type     : ADMIN_TEACHER_INFO,
        payload  : formdata
    }
}