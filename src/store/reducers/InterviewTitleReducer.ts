import { INTERVIEW_TITLE_SUCCESS, INTERVIEW_TITLE_ERROR } from "../constants";

const initialState = {
  interviewTitleResponse: {
    data: [],
  },
};

const InterviewTitleReducer = (state = initialState, action) => {
  switch (action.type) {
    case INTERVIEW_TITLE_SUCCESS:
      return {
        ...state,
        interviewTitleResponse: {
          ...state.interviewTitleResponse,
          data: action.payload,
          success: true,
        },
      };
    case INTERVIEW_TITLE_ERROR:
      return {
        ...state,
        interviewTitleResponse: {
          ...state.interviewTitleResponse,
          data: action.payload,
          success: false,
        },
      };
    default:
      return state;
  }
};
export default InterviewTitleReducer;
