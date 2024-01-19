import {
    GET_RBAC_ALLOWED_APIS_SUCCESS,
    GET_RBAC_ALLOWED_APIS_ERROR,
  } from "src/store/constants";
  
  const initialState = {
    getAlllowedApisResponse: {
      data: [],
    },
  };
  
  const getRBACAllowedApisReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_RBAC_ALLOWED_APIS_SUCCESS:
        return {
          ...state,
          getAlllowedApisResponse: {
            ...state.getAlllowedApisResponse,
            data: action.payload,
            success: true,
          },
        };
      case GET_RBAC_ALLOWED_APIS_ERROR:
        return {
          ...state,
          getAlllowedApisResponse: {
            ...state.getAlllowedApisResponse,
            error: action.payload,
            data: [],
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default getRBACAllowedApisReducer;