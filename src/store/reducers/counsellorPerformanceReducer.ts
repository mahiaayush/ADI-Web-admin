import {
    COUNSELLOR_PERFORMANCE_SUCCESS,
    COUNSELLOR_PERFORMANCE_ERROR,
  } from "../constants";
  
  const initialState = {
    counsellorPerformance: {
      data: {},
    }
  };
  
  const counsellorPerformanceReducer = (state = initialState, action) => {
    switch (action.type) {
      case COUNSELLOR_PERFORMANCE_SUCCESS:
        return {
          ...state,
          counsellorPerformance: {
            ...state.counsellorPerformance,
            data: action.payload,
            success: true,
          },
        };
      case COUNSELLOR_PERFORMANCE_ERROR:
        return {
          ...state,
          counsellorPerformance: {
            ...state.counsellorPerformance,
            data: action.payload,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default counsellorPerformanceReducer;