import {
  GET_COLLEGE_EVENT_SUCCESS,
  GET_COLLEGE_EVENT_ERROR,
  GET_COLLEGE_EVENT_LIST_SUCCESS,
  GET_COLLEGE_EVENT_LIST_ERROR,
} from "../constants";

const initialState = {
  collegeEventResponse: {
    data: {},
  }
};

const listState = {
  collegeEventListResponse: {
    data: {},
  }
};
const getCollegeEventListReducer = (state = listState, action) => {
  switch (action.type) {
    case GET_COLLEGE_EVENT_LIST_SUCCESS:
      return {
        ...state,
        collegeEventListResponse: {
          ...state.collegeEventListResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_COLLEGE_EVENT_LIST_ERROR:
      return {
        ...state,
        collegeEventListResponse: {
          ...state.collegeEventListResponse,
          data: { rows: [] },
          success: false,
        },
      };
    default:
      return state;
  }
};
const CollegeEventReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COLLEGE_EVENT_SUCCESS:
      return {
        ...state,
        collegeEventResponse: {
          ...state.collegeEventResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_COLLEGE_EVENT_ERROR:
      return {
        ...state,
        collegeEventResponse: {
          ...state.collegeEventResponse,
          data: { rows: [] },
          success: false,
        },
      };
    default:
      return state;
  }
};
export {
  CollegeEventReducer,
  getCollegeEventListReducer
};