import {
  GET_COURSE_ELIGIBILITY_MASTER_SUCCESS,
  GET_COURSE_ELIGIBILITY_MASTER_ERROR,
  POST_COURSE_ELIGIBILITY_MASTER_SUCCESS,
  POST_COURSE_ELIGIBILITY_MASTER_ERROR,
  PUT_COURSE_ELIGIBILITY_MASTER_SUCCESS,
  PUT_COURSE_ELIGIBILITY_MASTER_ERROR
} from "../constants";

const initialState = {
  CourseEligibilityMasterResponse: {
    data: {},
  }
};

const getCourseEligibilityMasterReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COURSE_ELIGIBILITY_MASTER_SUCCESS:
      return {
        ...state,
        CourseEligibilityMasterResponse: {
          ...state.CourseEligibilityMasterResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_COURSE_ELIGIBILITY_MASTER_ERROR:
      return {
        ...state,
        CourseEligibilityMasterResponse: {
          ...state.CourseEligibilityMasterResponse,
          data: { rows: [] },
          success: false,
        },
      };
    default:
      return state;
  }
};
const postCourseEligibilityMasterReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_COURSE_ELIGIBILITY_MASTER_SUCCESS:
      return {
        ...state,
        CourseEligibilityMasterResponse: {
          ...state.CourseEligibilityMasterResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case POST_COURSE_ELIGIBILITY_MASTER_ERROR:
      return {
        ...state,
        CourseEligibilityMasterResponse: {
          ...state.CourseEligibilityMasterResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
}

const putCourseEligibilityMasterReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUT_COURSE_ELIGIBILITY_MASTER_SUCCESS:
      return {
        ...state,
        CourseEligibilityMasterResponse: {
          ...state.CourseEligibilityMasterResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case PUT_COURSE_ELIGIBILITY_MASTER_ERROR:
      return {
        ...state,
        CourseEligibilityMasterResponse: {
          ...state.CourseEligibilityMasterResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
}

//
export { getCourseEligibilityMasterReducer, postCourseEligibilityMasterReducer, putCourseEligibilityMasterReducer };