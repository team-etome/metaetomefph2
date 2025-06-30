import { TEACHER_SUBJECT_INFO } from "./Type";



export const teachersubjectinfo = (formdata)=>{
    return{
        type     : TEACHER_SUBJECT_INFO,
        payload  : formdata
    }
}