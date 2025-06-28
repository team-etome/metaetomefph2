import { TEACHER_INFO,TEACHER_UPDATE } from "./Type";

export const teacherinfo = (formdata) => {
  return {
    type: TEACHER_INFO,
    payload: formdata,
  };
};

export const teacherUpdate = (updatedData) => {
    return {
      type: TEACHER_UPDATE,
      payload: updatedData,
    };
  };