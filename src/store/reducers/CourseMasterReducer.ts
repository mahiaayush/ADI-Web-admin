import {
  GET_COURSE_MASTER_SUCCESS,
  GET_COURSE_MASTER_ERROR,
  POST_COURSE_MASTER_SUCCESS,
  POST_COURSE_MASTER_ERROR,
  PUT_COURSE_MASTER_SUCCESS,
  PUT_COURSE_MASTER_ERROR,
  GET_COURSE_MASTER_LIST_SUCCESS,
  GET_COURSE_MASTER_LIST_ERROR
} from "../constants";

const initialState = {
  CourseMasterResponse: {
    data: {},
  }
};
const ListState = {
  CourseMasterListResponse: {
    data: {},
  }
};
const getCourseMasterListReducer = (state = ListState, action) => {
  switch (action.type) {
    case GET_COURSE_MASTER_LIST_SUCCESS:
      return {
        ...state,
        CourseMasterListResponse: {
          ...state.CourseMasterListResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_COURSE_MASTER_LIST_ERROR:
      return {
        ...state,
        CourseMasterListResponse: {
          ...state.CourseMasterListResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
};
const getCourseMasterReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COURSE_MASTER_SUCCESS:
      return {
        ...state,
        CourseMasterResponse: {
          ...state.CourseMasterResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_COURSE_MASTER_ERROR:
      return {
        ...state,
        CourseMasterResponse: {
          ...state.CourseMasterResponse,
          data: { rows: [] },
          success: false,
        },
      };
    default:
      return state;
  }
};
const postCourseMasterReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_COURSE_MASTER_SUCCESS:
      return {
        ...state,
        CourseMasterResponse: {
          ...state.CourseMasterResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case POST_COURSE_MASTER_ERROR:
      return {
        ...state,
        CourseMasterResponse: {
          ...state.CourseMasterResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
}

const putCourseMasterReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUT_COURSE_MASTER_SUCCESS:
      return {
        ...state,
        CourseMasterResponse: {
          ...state.CourseMasterResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case PUT_COURSE_MASTER_ERROR:
      return {
        ...state,
        CourseMasterResponse: {
          ...state.CourseMasterResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
}

export { getCourseMasterListReducer, getCourseMasterReducer, postCourseMasterReducer, putCourseMasterReducer };