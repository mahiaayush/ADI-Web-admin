import {
    GET_COUNSELLOR_DETAILS_SUCCESS,
    GET_COUNSELLOR_DETAILS_ERROR,
  } from "src/store/constants";
  
  const initialState = {
    counsellorDetails: {
      data: {},
    }
  };
  
  const cousellorDetailReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_COUNSELLOR_DETAILS_SUCCESS:
        return {
          ...state,
          counsellorDetails: {
            ...state.counsellorDetails,
            data: action.payload,
            success: true,
          },
          
        };
      case GET_COUNSELLOR_DETAILS_ERROR:
        return {
          ...state,
          counsellorDetails: {
            ...state.counsellorDetails,
            data: action.payload,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default cousellorDetailReducer;