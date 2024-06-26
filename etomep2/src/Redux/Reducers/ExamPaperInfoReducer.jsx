import { EXAM_PAPER_INFO } from "../Actions/Type";

const initialstate  = {

    exampaperinfo  : null ,

}

const ExamPaperInfoReducer = (state = initialstate , action)=>{
    switch(action.type){
        case EXAM_PAPER_INFO:
            return {
                ...state,
                exampaperinfo  : action.payload
            }

            default:
                return state;
    }
}

export default ExamPaperInfoReducer