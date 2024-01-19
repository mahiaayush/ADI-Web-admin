import { GET_INTERVIEWER_SUCCESS, GET_INTERVIEWER_ERROR } from "../constants";

const initialState = {
  interviewerResponse: {
    data: [],
  },
};

const InterviewerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INTERVIEWER_SUCCESS:
      return {
        ...state,
        interviewerResponse: {
          ...state.interviewerResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_INTERVIEWER_ERROR:
      return {
        ...state,
        interviewerResponse: {
          ...state.interviewerResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
};
export default InterviewerReducer;
