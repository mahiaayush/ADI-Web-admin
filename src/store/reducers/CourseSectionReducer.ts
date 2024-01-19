import {
  GET_COURSE_SECTION_SUCCESS,
  GET_COURSE_SECTION_ERROR,
  POST_COURSE_SECTION_SUCCESS,
  POST_COURSE_SECTION_ERROR,
  PUT_COURSE_SECTION_SUCCESS,
  PUT_COURSE_SECTION_ERROR,
  GET_COURSE_SECTION_LIST_SUCCESS,
  GET_COURSE_SECTION_LIST_ERROR
} from "../constants";

const initialState = {
  CourseSectionResponse: {
    data: {},
  }
};
const initialListState = {
  CourseSectionListResponse: {
    data: {},
  }
};
const getCourseSectionListReducer = (state = initialListState, action) => {
  switch (action.type) {
    case GET_COURSE_SECTION_LIST_SUCCESS:
      return {
        ...state,
        CourseSectionListResponse: {
          ...state.CourseSectionListResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_COURSE_SECTION_LIST_ERROR:
      return {
        ...state,
        CourseSectionListResponse: {
          ...state.CourseSectionListResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
};
const getCourseSectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COURSE_SECTION_SUCCESS:
      return {
        ...state,
        CourseSectionResponse: {
          ...state.CourseSectionResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_COURSE_SECTION_ERROR:
      return {
        ...state,
        CourseSectionResponse: {
          ...state.CourseSectionResponse,
          data: { rows: [] },
          success: false,
        },
      };
    default:
      return state;
  }
};
const postCourseSectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_COURSE_SECTION_SUCCESS:
      return {
        ...state,
        CourseSectionResponse: {
          ...state.CourseSectionResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case POST_COURSE_SECTION_ERROR:
      return {
        ...state,
        CourseSectionResponse: {
          ...state.CourseSectionResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
}

const putCourseSectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUT_COURSE_SECTION_SUCCESS:
      return {
        ...state,
        CourseSectionResponse: {
          ...state.CourseSectionResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case PUT_COURSE_SECTION_ERROR:
      return {
        ...state,
        CourseSectionResponse: {
          ...state.CourseSectionResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
}
//
export { getCourseSectionListReducer, getCourseSectionReducer, postCourseSectionReducer, putCourseSectionReducer };