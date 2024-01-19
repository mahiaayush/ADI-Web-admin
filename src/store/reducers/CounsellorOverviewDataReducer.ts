import {
    GET_COUNSELLOR_OVERVIEW_DATA_SUCCESS,
    GET_COUNSELLOR_OVERVIEW_DATA_ERROR,
  } from "src/store/constants";
  
  const initialState = {
    cousellorOverviewResponse: {
      data: {},
    }
  };
  
  const cousellorOverviewDataReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_COUNSELLOR_OVERVIEW_DATA_SUCCESS:
        return {
          ...state,
          cousellorOverviewResponse: {
            ...state.cousellorOverviewResponse,
            data: action.payload,
            success: true,
          },
          
        };
      case GET_COUNSELLOR_OVERVIEW_DATA_ERROR:
        return {
          ...state,
          cousellorOverviewResponse: {
            ...state.cousellorOverviewResponse,
            data: action.payload,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default cousellorOverviewDataReducer;