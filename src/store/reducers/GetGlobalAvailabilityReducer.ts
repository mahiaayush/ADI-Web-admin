import {
    GET_GLOBAL_AVAILABILITY_SUCCESS,
    GET_GLOBAL_AVAILABILITY_ERROR,
  } from "src/store/constants";
  
  const initialState = {
    getGlobalAvailabiliyResponse: {
      data: {},
    },
  };
  
  const getGlobalAvailabilityReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_GLOBAL_AVAILABILITY_SUCCESS:
        return {
          ...state,
          getGlobalAvailabiliyResponse: {
            ...state.getGlobalAvailabiliyResponse,
            data: action.payload,
            success: true,
          },
        };
      case GET_GLOBAL_AVAILABILITY_ERROR:
        return {
          ...state,
          getGlobalAvailabiliyResponse: {
            ...state.getGlobalAvailabiliyResponse,
            data: action.payload,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default getGlobalAvailabilityReducer;