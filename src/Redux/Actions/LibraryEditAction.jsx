import { ADMIN_SELECTED_LIBRARY } from './Type';


export const setSelectedBook = (data) => {
    return {
      type: 'ADMIN_SELECTED_LIBRARY', // This should match the constant you've defined
      payload: data, // Make sure you're passing the correct data (the book object)
    };
  };
