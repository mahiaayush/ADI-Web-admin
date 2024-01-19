import {
  GET_COURSE_EXAMINATION_SUCCESS,
  GET_COURSE_EXAMINATION_ERROR,
  POST_COURSE_EXAMINATION_SUCCESS,
  POST_COURSE_EXAMINATION_ERROR,
  PUT_COURSE_EXAMINATION_SUCCESS,
  PUT_COURSE_EXAMINATION_ERROR,
  GET_EXAMINATION_LIST_SUCCESS,
  GET_EXAMINATION_LIST_ERROR
} from "../constants";

const initialState = {
  CourseExaminationResponse: {
    data: {},
  }
};
const ListState = {
  ExaminationListResponse: {
    data: {},
  }
};
const getExaminationListReducer = (state = ListState, action) => {
  switch (action.type) {
    case GET_EXAMINATION_LIST_SUCCESS:
      return {
        ...state,
        ExaminationListResponse: {
          ...state.ExaminationListResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_EXAMINATION_LIST_ERROR:
      return {
        ...state,
        ExaminationListResponse: {
          ...state.ExaminationListResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
};
const getCourseExaminationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COURSE_EXAMINATION_SUCCESS:
      return {
        ...state,
        CourseExaminationResponse: {
          ...state.CourseExaminationResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_COURSE_EXAMINATION_ERROR:
      return {
        ...state,
        CourseExaminationResponse: {
          ...state.CourseExaminationResponse,
          data: { rows: [] },
          success: false,
        },
      };
    default:
      return state;
  }
};
const postCourseExaminationReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_COURSE_EXAMINATION_SUCCESS:
      return {
        ...state,
        CourseExaminationResponse: {
          ...state.CourseExaminationResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case POST_COURSE_EXAMINATION_ERROR:
      return {
        ...state,
        CourseExaminationResponse: {
          ...state.CourseExaminationResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
}

const putCourseExaminationReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUT_COURSE_EXAMINATION_SUCCESS:
      return {
        ...state,
        CourseExaminationResponse: {
          ...state.CourseExaminationResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case PUT_COURSE_EXAMINATION_ERROR:
      return {
        ...state,
        CourseExaminationResponse: {
          ...state.CourseExaminationResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
}
//
export { getExaminationListReducer, getCourseExaminationReducer, postCourseExaminationReducer, putCourseExaminationReducer };