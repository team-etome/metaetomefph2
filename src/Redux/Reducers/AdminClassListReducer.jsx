

import { LOAD_EXAM_CLASSES } from '../Actions/Type';

const initialState = {
  list: [],    // will hold your { value,label,subjectList } items
};

export default function examClassesReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_EXAM_CLASSES:
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
}
