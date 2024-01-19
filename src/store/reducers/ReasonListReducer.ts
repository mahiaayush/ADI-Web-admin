import {
    GET_REASON_SUCCESS,
    GET_REASON_ERROR,
  } from "../constants";
  
  const initialState = {
    reasonListResponse: {
      data: {},
    }
  };
  
  const ReasonListReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_REASON_SUCCESS:
        return {
          ...state,
          reasonListResponse: {
            ...state.reasonListResponse,
            data: action.payload,
            success: true,
          },
        };
      case GET_REASON_ERROR:
        return {
          ...state,
          reasonListResponse: {
            ...state.reasonListResponse,
            data: action.payload,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default ReasonListReducer;