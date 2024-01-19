import {
  GET_CAREER_COURSE_LEVEL_SUCCESS,
  GET_CAREER_COURSE_LEVEL_ERROR,
  POST_CAREER_COURSE_LEVEL_SUCCESS,
  POST_CAREER_COURSE_LEVEL_ERROR,
  PUT_CAREER_COURSE_LEVEL_SUCCESS,
  PUT_CAREER_COURSE_LEVEL_ERROR,
  GET_CAREER_COURSE_LEVEL_LIST_SUCCESS,
  GET_CAREER_COURSE_LEVEL_LIST_ERROR
} from "../constants";

const initialState = {
  CareerCourseLevelResponse: {
    data: {},
  }
};
const listState = {
  CareerCourseLevelListResponse: {
    data: {},
  }
};
const getCareerCourseLevelListReducer = (state = listState, action) => {
  switch (action.type) {
    case GET_CAREER_COURSE_LEVEL_LIST_SUCCESS:
      return {
        ...state,
        CareerCourseLevelListResponse: {
          ...state.CareerCourseLevelListResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_CAREER_COURSE_LEVEL_LIST_ERROR:
      return {
        ...state,
        CareerCourseLevelListResponse: {
          ...state.CareerCourseLevelListResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
};
const getCareerCourseLevelReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CAREER_COURSE_LEVEL_SUCCESS:
      return {
        ...state,
        CareerCourseLevelResponse: {
          ...state.CareerCourseLevelResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_CAREER_COURSE_LEVEL_ERROR:
      return {
        ...state,
        CareerCourseLevelResponse: {
          ...state.CareerCourseLevelResponse,
          data: { rows: [] },
          success: false,
        },
      };
    default:
      return state;
  }
};
const postCareerCourseLevelReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_CAREER_COURSE_LEVEL_SUCCESS:
      return {
        ...state,
        CareerCourseLevelResponse: {
          ...state.CareerCourseLevelResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case POST_CAREER_COURSE_LEVEL_ERROR:
      return {
        ...state,
        CareerCourseLevelResponse: {
          ...state.CareerCourseLevelResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
}

const putCareerCourseLevelReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUT_CAREER_COURSE_LEVEL_SUCCESS:
      return {
        ...state,
        CareerCourseLevelResponse: {
          ...state.CareerCourseLevelResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case PUT_CAREER_COURSE_LEVEL_ERROR:
      return {
        ...state,
        CareerCourseLevelResponse: {
          ...state.CareerCourseLevelResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
}

export { getCareerCourseLevelListReducer, getCareerCourseLevelReducer, postCareerCourseLevelReducer, putCareerCourseLevelReducer };