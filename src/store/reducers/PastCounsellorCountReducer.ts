import {
    GET_PAST_COUNSELLOR_COUNTS_SUCCESS,
    GET_PAST_COUNSELLOR_COUNTS_ERROR,
  } from "../constants";
  
  const initialState = {
    pastCounsellorCountsResponse: {
      data: {},
    }
  };
  
  const PastCounsellorCountsReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_PAST_COUNSELLOR_COUNTS_SUCCESS:
        return {
          ...state,
          pastCounsellorCountsResponse: {
            ...state.pastCounsellorCountsResponse,
            data: action.payload,
            success: true,
          },
        };
      case GET_PAST_COUNSELLOR_COUNTS_ERROR:
        return {
          ...state,
          pastCounsellorCountsResponse: {
            ...state.pastCounsellorCountsResponse,
            data: action.payload,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default PastCounsellorCountsReducer;