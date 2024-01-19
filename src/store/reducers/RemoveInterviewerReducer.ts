import {
    DELETE_INTERVIEWER_SUCCESS,
    DELETE_INTERVIEWER_ERROR,
  } from "src/store/constants";
  
  const initialState = {
    RemoveInterviewerResponse: {
      data: {},
    }
  };
  
  const RemoveInterviewerReducer = (state = initialState, action) => {
    switch (action.type) {
      case DELETE_INTERVIEWER_SUCCESS:
        return {
          ...state,
          RemoveInterviewerResponse: {
            ...state.RemoveInterviewerResponse,
            data: action.payload,
            success: true,
          },
        };
      case DELETE_INTERVIEWER_ERROR:
        return {
          ...state,
          RemoveInterviewerResponse: {
            ...state.RemoveInterviewerResponse,
            data: action.payload,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default RemoveInterviewerReducer;