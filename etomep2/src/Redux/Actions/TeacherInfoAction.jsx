import { TEACHER_INFO } from "./Type";


export const teacherinfo = (formdata)=>{
    return{
        type     : TEACHER_INFO,
        payload  : formdata
    }
}