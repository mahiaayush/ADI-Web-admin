import {
  GET_COURSE_TYPE_SUCCESS,
  GET_COURSE_TYPE_ERROR,
  POST_COURSE_TYPE_SUCCESS,
  POST_COURSE_TYPE_ERROR,
  PUT_COURSE_TYPE_SUCCESS,
  PUT_COURSE_TYPE_ERROR,
  GET_COURSE_TYPE_LIST_SUCCESS,
  GET_COURSE_TYPE_LIST_ERROR
  } from "../constants";

  const initialState = {
    CourseTypeResponse: {
      data: {},
    }
  };
  const CourseTypeListState = {
    CourseTypeListResponse: {
      data: {},
    }
  };
  const getCourseTypeListReducer = (state = CourseTypeListState, action) => {
    switch (action.type) {
      case GET_COURSE_TYPE_LIST_SUCCESS:
        return {
          ...state,
          CourseTypeListResponse: {
            ...state.CourseTypeListResponse,
            data: action.payload.data,
            success: true,
          },
        };
      case GET_COURSE_TYPE_LIST_ERROR:
        return {
          ...state,
          CourseTypeListResponse: {
            ...state.CourseTypeListResponse,
            data: { rows: [] },
            success: false,
          },
        };
      default:
        return state;
    }
  };
  const getCourseTypeReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_COURSE_TYPE_SUCCESS:
        return {
          ...state,
          CourseTypeResponse: {
            ...state.CourseTypeResponse,
            data: action.payload.data,
            success: true,
          },
        };
      case GET_COURSE_TYPE_ERROR:
        return {
          ...state,
          CourseTypeResponse: {
            ...state.CourseTypeResponse,
            data: { rows: [] },
            success: false,
          },
        };
      default:
        return state;
    }
  };
  const postCourseTypeReducer = (state = initialState, action) => {
    switch (action.type) {
     case POST_COURSE_TYPE_SUCCESS:
          return {
            ...state,
            CourseTypeResponse: {
              ...state.CourseTypeResponse,
              data: action.payload.data,
              success: true,
            },
          };
          case POST_COURSE_TYPE_ERROR:
            return {
              ...state,
              CourseTypeResponse: {
                ...state.CourseTypeResponse,
                data: action.payload.data,
                success: false,
              },
            };
      default:
        return state;
    }
  }

  const putCourseTypeReducer = (state = initialState, action) => {
    switch (action.type) {
     case PUT_COURSE_TYPE_SUCCESS:
          return {
            ...state,
            CourseTypeResponse: {
              ...state.CourseTypeResponse,
              data: action.payload.data,
              success: true,
            },
          };
          case PUT_COURSE_TYPE_ERROR:
            return {
              ...state,
              CourseTypeResponse: {
                ...state.CourseTypeResponse,
                data: action.payload.data,
                success: false,
              },
            };
      default:
        return state;
    }
  }

  export { getCourseTypeListReducer, getCourseTypeReducer, postCourseTypeReducer, putCourseTypeReducer };