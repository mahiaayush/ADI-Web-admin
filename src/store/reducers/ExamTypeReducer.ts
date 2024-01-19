import {
  GET_EXAMTYPE_SUCCESS,
  GET_EXAMTYPE_ERROR,
  GET_EXAMTYPE_LIST_SUCCESS,
  GET_EXAMTYPE_LIST_ERROR
} from "../constants";

const initialState = {
  examTypeResponse: {
    data: {},
  }
};
const initialListState = {
  examTypeListResponse: {
    data: {},
  }
};
const getExamTypeListReducer = (state = initialListState, action) => {
  switch (action.type) {
    case GET_EXAMTYPE_LIST_SUCCESS:
      return {
        ...state,
        examTypeListResponse: {
          ...state.examTypeListResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_EXAMTYPE_LIST_ERROR:
      return {
        ...state,
        examTypeListResponse: {
          ...state.examTypeListResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
};

const ExamTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EXAMTYPE_SUCCESS:
      return {
        ...state,
        examTypeResponse: {
          ...state.examTypeResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_EXAMTYPE_ERROR:
      return {
        ...state,
        examTypeResponse: {
          ...state.examTypeResponse,
          data: { rows: [] },
          success: false,
        },
      };
    default:
      return state;
  }
};
export { ExamTypeReducer, getExamTypeListReducer };