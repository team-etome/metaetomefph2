import { LOAD_TIMETABLEDATA_QUESTIONPAPER } from './Type';

export const loadTimetableDataQuestionPaper = (items) => ({
  type: LOAD_TIMETABLEDATA_QUESTIONPAPER,
  payload: items,
});
