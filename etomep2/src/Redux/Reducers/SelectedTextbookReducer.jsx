import { ADMIN_SELECTED_TEXTBOOK } from "../Actions/Type";

const initialState = {
  selectedTextbook: null
};

const SelectedTextbookReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_SELECTED_TEXTBOOK:
      return {
        ...state,
        selectedTextbook: action.payload
      };
    default:
      return state;
  }
};

export default SelectedTextbookReducer;
