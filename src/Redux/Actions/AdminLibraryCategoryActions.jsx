// src/Redux/Actions/adminCategoryActions.js

export const ADMIN_SET_CATEGORIES = 'ADMIN_SET_CATEGORIES';

export const setAdminCategories = (categories) => ({
  type: ADMIN_SET_CATEGORIES,
  payload: categories,
});
