

import { LOAD_EXAM_CLASSES } from './Type';

// action creator
export const loadExamClasses = (classes) => ({
  type: LOAD_EXAM_CLASSES,
  payload: classes,
});
