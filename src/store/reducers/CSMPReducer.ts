import {
    GET_CSMP_SUCCESS,
    GET_CSMP_ERROR,
  } from "../constants";
  
  const initialState = {
    CSMPResponse: {
      data: {},
    }
  };
  
  const CSMPReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_CSMP_SUCCESS:
        return {
          ...state,
          CSMPResponse: {
            ...state.CSMPResponse,
            data: action.payload,
            success: true,
          },
        };
      case GET_CSMP_ERROR:
        return {
          ...state,
          CSMPResponse: {
            ...state.CSMPResponse,
            data: action.payload,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default CSMPReducer;