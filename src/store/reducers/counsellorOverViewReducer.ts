import {
    GET_COUNSELLOR_OVERVIEW_SUCCESS,
    GET_COUNSELLOR_OVERVIEW_ERROR,
  } from "src/store/constants";
  
  const initialState = {
    counsellorDetails: {
      data: {},
    }
  };
  
  const cousellorOverviewReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_COUNSELLOR_OVERVIEW_SUCCESS:
        return {
          ...state,
          counsellorDetails: {
            ...state.counsellorDetails,
            data: action.payload,
            success: true,
          },
          
        };
      case GET_COUNSELLOR_OVERVIEW_ERROR:
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
  export default cousellorOverviewReducer;