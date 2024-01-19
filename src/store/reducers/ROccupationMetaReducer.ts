import {
    GET_R_OCCUPATIONMETA_SUCCESS,
    GET_R_OCCUPATIONMETA_ERROR,
  } from "../constants";
  
  const initialState = {
    ROccupationMetaResponse: {
      data: {},
    }
  };
  
  const ROccupationMetaReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_R_OCCUPATIONMETA_SUCCESS:
        return {
          ...state,
          ROccupationMetaResponse: {
            ...state.ROccupationMetaResponse,
            data: action.payload.data,
            success: true,
          },
        };
      case GET_R_OCCUPATIONMETA_ERROR:
        return {
          ...state,
          ROccupationMetaResponse: {
            ...state.ROccupationMetaResponse,
            data: { rows: [] },
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default ROccupationMetaReducer;