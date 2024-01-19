import {
    GET_ALLOWED_ROUTES_SUCCESS,
    GET_ALLOWED_ROUTES_ERROR,
  } from "src/store/constants";
  
  const initialState = {
    getAlllowedRoutesResponse: {
      data: [],
    },
  };
  
  const getAllowedRoutesReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALLOWED_ROUTES_SUCCESS:
        return {
          ...state,
          getAlllowedRoutesResponse: {
            ...state.getAlllowedRoutesResponse,
            data: action.payload,
            success: true,
          },
        };
      case GET_ALLOWED_ROUTES_ERROR:
        return {
          ...state,
          getAlllowedRoutesResponse: {
            ...state.getAlllowedRoutesResponse,
            error: action.payload,
            data: [],
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default getAllowedRoutesReducer;