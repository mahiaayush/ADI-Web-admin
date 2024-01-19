import {
    GET_INTERVIEWER_LIST_SUCCESS,
    GET_INTERVIEWER_LIST_ERROR,
  } from "../constants";
  
  const initialState = {
    interviewersListResponse: {
      data: {},
    }
  };
  
  const InterviewerListingReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_INTERVIEWER_LIST_SUCCESS:
        return {
          ...state,
          interviewersListResponse: {
            ...state.interviewersListResponse,
            data: action.payload,
            success: true,
          },
        };
      case GET_INTERVIEWER_LIST_ERROR:
        return {
          ...state,
          interviewersListResponse: {
            ...state.interviewersListResponse,
            data: action.payload,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default InterviewerListingReducer;