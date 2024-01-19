import {
  GET_COURSE_ASSET_SUCCESS,
  GET_COURSE_ASSET_ERROR,
  POST_COURSE_ASSET_ERROR,
  POST_COURSE_ASSET_SUCCESS,
  PUT_COURSE_ASSET_SUCCESS,
  PUT_COURSE_ASSET_ERROR
} from "../constants";

const initialState = {
  CourseAssetResponse: {
    data: {},
  }
};

const getCourseAssetReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COURSE_ASSET_SUCCESS:
      return {
        ...state,
        CourseAssetResponse: {
          ...state.CourseAssetResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_COURSE_ASSET_ERROR:
      return {
        ...state,
        CourseAssetResponse: {
          ...state.CourseAssetResponse,
          data: { rows: [] },
          success: false,
        },
      };
    default:
      return state;
  }
};
const postCourseAssetReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_COURSE_ASSET_SUCCESS:
      return {
        ...state,
        CourseAssetResponse: {
          ...state.CourseAssetResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case POST_COURSE_ASSET_ERROR:
      return {
        ...state,
        CourseAssetResponse: {
          ...state.CourseAssetResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
}

const putCourseAssetReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUT_COURSE_ASSET_SUCCESS:
      return {
        ...state,
        CourseAssetResponse: {
          ...state.CourseAssetResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case PUT_COURSE_ASSET_ERROR:
      return {
        ...state,
        CourseAssetResponse: {
          ...state.CourseAssetResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
}

export { getCourseAssetReducer, postCourseAssetReducer, putCourseAssetReducer };