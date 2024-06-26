import { EXAM_PAPER_INFO } from "../Actions/Type";


export const exampaperinfo = (formdata)=>{
    return{
        type    : EXAM_PAPER_INFO,
        payload : formdata
    }
}