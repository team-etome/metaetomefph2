import { LOAD_TIMETABLEDATA_QUESTIONPAPER } from '../Actions/Type';

const initialState = {
  list: [],  // will hold your examsData array
};

export default function timetableDataQuestionPaperReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TIMETABLEDATA_QUESTIONPAPER:
      return { ...state, list: action.payload };
    default:
      return state;
  }
}
