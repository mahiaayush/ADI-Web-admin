import {
  GET_COURSE_DETAILS_SUCCESS,
  GET_COURSE_DETAILS_ERROR,
  POST_COURSE_DETAILS_ERROR,
  POST_COURSE_DETAILS_SUCCESS,
  PUT_COURSE_DETAILS_SUCCESS,
  PUT_COURSE_DETAILS_ERROR,

  GET_PUBLISH_DETAILS_LIST_API,
  GET_PUBLISH_DETAILS_LIST_SUCCESS,
  GET_PUBLISH_DETAILS_LIST_ERROR,

  GET_ITEM_MASTER_LIST_API,
  GET_ITEM_MASTER_LIST_SUCCESS,
  GET_ITEM_MASTER_LIST_ERROR,

  GET_TOPIC_MASTER_LIST_API,
  GET_TOPIC_MASTER_LIST_SUCCESS,
  GET_TOPIC_MASTER_LIST_ERROR,

  GET_COURSE_TYPE_LIST_API,
  GET_COURSE_TYPE_LIST_SUCCESS,
  GET_COURSE_TYPE_LIST_ERROR,

  GET_COURSE_LEVEL_LIST_API,
  GET_COURSE_LEVEL_LIST_SUCCESS,
  GET_COURSE_LEVEL_LIST_ERROR
} from "../constants";

const initialState = {
  CourseDetailsResponse: {
    data: {},
  }
};
const TopicList = {
  TopicListResponse: {
    data: {},
  }
};

const getTopicListReducer = (state = TopicList, action) => {
  switch (action.type) {
    case GET_TOPIC_MASTER_LIST_SUCCESS:
      return {
        ...state,
        TopicListResponse: {
          ...state.TopicListResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_TOPIC_MASTER_LIST_ERROR:
      return {
        ...state,
        TopicListResponse: {
          ...state.TopicListResponse,
          data: { rows: [] },
          success: false,
        },
      };
    default:
      return state;
  }
}
const getCourseDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COURSE_DETAILS_SUCCESS:
      return {
        ...state,
        CourseDetailsResponse: {
          ...state.CourseDetailsResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_COURSE_DETAILS_ERROR:
      return {
        ...state,
        CourseDetailsResponse: {
          ...state.CourseDetailsResponse,
          data: { rows: [] },
          success: false,
        },
      };
    default:
      return state;
  }
};
const postCourseDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_COURSE_DETAILS_SUCCESS:
      return {
        ...state,
        CourseDetailsResponse: {
          ...state.CourseDetailsResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case POST_COURSE_DETAILS_ERROR:
      return {
        ...state,
        CourseDetailsResponse: {
          ...state.CourseDetailsResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
}

const putCourseDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUT_COURSE_DETAILS_SUCCESS:
      return {
        ...state,
        CourseDetailsResponse: {
          ...state.CourseDetailsResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case PUT_COURSE_DETAILS_ERROR:
      return {
        ...state,
        CourseDetailsResponse: {
          ...state.CourseDetailsResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
}
//
export { getCourseDetailsReducer, postCourseDetailsReducer, putCourseDetailsReducer, getTopicListReducer };