import { ADMIN_SELECTED_LIBRARY } from '../Actions/Type';

// In your reducer (SelectedLibraryReducer.js)
const initialState = {
    selectedLibrary: null,
  };
  
  const LibraryBookReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADMIN_SELECTED_LIBRARY': // Ensure this matches the action type you are dispatching
        return {
          ...state,
          selectedLibrary: action.payload, // Ensure you're updating state with the book data correctly
        };
      default:
        return state;
    }
  };
  
  export default LibraryBookReducer;
  
