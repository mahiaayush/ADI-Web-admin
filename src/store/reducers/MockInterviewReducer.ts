import {
    POST_MOCK_INTERVIEW_SUCCESS,
    POST_MOCK_INTERVIEW_ERROR,
  } from "../constants";
  
  const initialState = {
    mockInterviewResponse: {
      data: {},
    }
  };
  
  const mockInterviewReducer = (state = initialState, action) => {
    switch (action.type) {
      case POST_MOCK_INTERVIEW_SUCCESS:
        return {
          ...state,
          mockInterviewResponse: {
            ...state.mockInterviewResponse,
            data: action.payload,
            success: true,
          },
        };
      case POST_MOCK_INTERVIEW_ERROR:
        return {
          ...state,
          mockInterviewResponse: {
            ...state.mockInterviewResponse,
            data: action.payload,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default mockInterviewReducer;