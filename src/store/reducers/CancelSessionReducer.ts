import {
    CANCEL_SESSION_SUCCESS,
    CANCEL_SESSION_ERROR,
  } from "../constants";
  
  const initialState = {
    cancelSessionResponse: {
      data: {},
    }
  };
  
  const CancelSessionReducer = (state = initialState, action) => {
    switch (action.type) {
      case CANCEL_SESSION_SUCCESS:
        return {
          ...state,
          cancelSessionResponse: {
            ...state.cancelSessionResponse,
            data: action.payload,
            success: true,
          },
        };
      case CANCEL_SESSION_ERROR:
        return {
          ...state,
          cancelSessionResponse: {
            ...state.cancelSessionResponse,
            data: action.payload,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default CancelSessionReducer;