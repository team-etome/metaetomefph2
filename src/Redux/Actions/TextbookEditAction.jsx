import { ADMIN_SELECTED_TEXTBOOK } from "./Type";

export const setSelectedTextbook = (data) => ({
  type: ADMIN_SELECTED_TEXTBOOK,
  payload: data
});
