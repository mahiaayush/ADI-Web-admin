import {
    GET_COUNSELLOR_COUNTS_SUCCESS,
    GET_COUNSELLOR_COUNTS_ERROR,
  } from "../constants";
  
  const initialState = {
    counsellorCountsResponse: {
      data: {},
    }
  };
  
  const CounsellorCountsReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_COUNSELLOR_COUNTS_SUCCESS:
        return {
          ...state,
          counsellorCountsResponse: {
            ...state.counsellorCountsResponse,
            data: action.payload,
            success: true,
          },
        };
      case GET_COUNSELLOR_COUNTS_ERROR:
        return {
          ...state,
          counsellorCountsResponse: {
            ...state.counsellorCountsResponse,
            data: action.payload,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default CounsellorCountsReducer;