// src/Redux/Reducers/adminCategoryReducer.js

import { ADMIN_SET_CATEGORIES } from '../Actions/AdminLibraryCategoryActions';

const initialState = {
  list: [],
};

export default function adminCategoryReducer(state = initialState, action) {
  switch (action.type) {
    case ADMIN_SET_CATEGORIES:
      return { ...state, list: action.payload };
    default:
      return state;
  }
}
