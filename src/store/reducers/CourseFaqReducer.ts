import {
  GET_COURSE_FAQ_SUCCESS,
  GET_COURSE_FAQ_ERROR,
  POST_COURSE_FAQ_ERROR,
  POST_COURSE_FAQ_SUCCESS,
  PUT_COURSE_FAQ_SUCCESS,
  PUT_COURSE_FAQ_ERROR,
  GET_COURSE_LIST_ERROR,
  GET_COURSE_LIST_SUCCESS
  } from "../constants";

  const initialState = {
    CourseFaqResponse: {
      data: {},
    }
  };
  
  const startState = {
    CourseListResponse: {
      data: {},
     },
  }
  const getCourseFaqReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_COURSE_FAQ_SUCCESS:
        return {
          ...state,
          CourseFaqResponse: {
            ...state.CourseFaqResponse,
            data: action.payload.data,
            success: true,
          },
        };
      case GET_COURSE_FAQ_ERROR:
        return {
          ...state,
          CourseFaqResponse: {
            ...state.CourseFaqResponse,
            data: action.payload.data,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  const postCourseFaqReducer = (state = initialState, action) => {
    switch (action.type) {
     case POST_COURSE_FAQ_SUCCESS:
          return {
            ...state,
            CourseFaqResponse: {
              ...state.CourseFaqResponse,
              data: action.payload.data,
              success: true,
            },
          };
          case POST_COURSE_FAQ_ERROR:
            return {
              ...state,
              collegeMasterResponse: {
                ...state.CourseFaqResponse,
                data: action.payload.data,
                success: false,
              },
            };
      default:
        return state;
    }
  }

  const putCourseFaqReducer = (state = initialState, action) => {
    switch (action.type) {
     case PUT_COURSE_FAQ_SUCCESS:
          return {
            ...state,
            CourseFaqResponse: {
              ...state.CourseFaqResponse,
              data: action.payload.data,
              success: true,
            },
          };
          case PUT_COURSE_FAQ_ERROR:
            return {
              ...state,
              CourseFaqResponse: {
                ...state.CourseFaqResponse,
                data: action.payload.data,
                success: false,
              },
            };
      default:
        return state;
    }
  }
  const getCourseListReducer = (state = startState, action) => {
    switch (action.type) {
      case GET_COURSE_LIST_SUCCESS:
        return {
          ...state,
          CourseListResponse: {
            ...state.CourseListResponse,
            data: action.payload.data,
            success: true,
          },
        };
      case GET_COURSE_LIST_ERROR:
        return {
          ...state,
          CourseListResponse: {
            ...state.CourseListResponse,
            data: action.payload.data,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  //
  export { getCourseFaqReducer, postCourseFaqReducer, putCourseFaqReducer, getCourseListReducer };