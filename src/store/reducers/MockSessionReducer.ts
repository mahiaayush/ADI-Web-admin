import {
    POST_MOCK_SESSION_SUCCESS,
    POST_MOCK_SESSION_ERROR,
  } from "../constants";
  
  const initialState = {
    mockSessionResponse: {
      data: {},
    }
  };
  
  const mockSessionReducer = (state = initialState, action) => {
    switch (action.type) {
      case POST_MOCK_SESSION_SUCCESS:
        return {
          ...state,
          mockSessionResponse: {
            ...state.mockSessionResponse,
            data: action.payload,
            success: true,
          },
        };
      case POST_MOCK_SESSION_ERROR:
        return {
          ...state,
          mockSessionResponse: {
            ...state.mockSessionResponse,
            data: action.payload,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default mockSessionReducer;