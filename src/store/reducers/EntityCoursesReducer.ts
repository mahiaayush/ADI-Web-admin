import {
  GET_ENTITYCOURSES_SUCCESS,
  GET_ENTITYCOURSES_ERROR,
  GET_COURSEMODE_LIST_SUCCESS,
  GET_COURSEMODE_LIST_ERROR
} from "../constants";

const initialState = {
  entitycoursesResponse: {
    data: {},
  }
};

const EntityCoursesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ENTITYCOURSES_SUCCESS:
      return {
        ...state,
        entitycoursesResponse: {
          ...state.entitycoursesResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_ENTITYCOURSES_ERROR:
      return {
        ...state,
        entitycoursesResponse: {
          ...state.entitycoursesResponse,
          data: { rows: [] },
          success: false,
        },
      };
    default:
      return state;
  }
};
const courseModeState = {
  courseModeListResponse: {
    data: {},
  }
};

const CourseModeListReducer = (state = courseModeState, action) => {
  switch (action.type) {
    case GET_COURSEMODE_LIST_SUCCESS:
      return {
        ...state,
        courseModeListResponse: {
          ...state.courseModeListResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_COURSEMODE_LIST_ERROR:
      return {
        ...state,
        courseModeListResponse: {
          ...state.courseModeListResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
};
export {
  EntityCoursesReducer,
  CourseModeListReducer
}