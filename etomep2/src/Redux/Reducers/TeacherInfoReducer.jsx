import { TEACHER_INFO, TEACHER_LOGOUT, TEACHER_UPDATE } from '../Actions/Type'


const initialstate = {
    teacherinfo: JSON.parse(localStorage.getItem("teacherinfo")) || null,
};


const TeacherInfoReducer = (state = initialstate, action) => {
    switch (action.type) {


        case TEACHER_LOGOUT:
            return initialstate


        case TEACHER_INFO:
            return {
                ...state,
                teacherinfo: action.payload
            }
        case TEACHER_UPDATE:
            // Merge new update with the existing teacher info
            const updatedTeacher = {
                ...state.teacherinfo,
                ...action.payload,
            };

            // Persist the updated teacher info in localStorage so it stays on refresh
            localStorage.setItem("teacherinfo", JSON.stringify(updatedTeacher));

            return {
                ...state,
                teacherinfo: updatedTeacher,
            };

        default:
            return state;
    }
}

export default TeacherInfoReducer